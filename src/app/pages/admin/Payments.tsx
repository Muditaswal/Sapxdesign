import { useState, useEffect } from "react";
import { Plus, CreditCard, ChevronRight, TrendingUp, Sparkles, Receipt, Trash2 } from "lucide-react";
import { api } from "../../services/api";
import { Payment, Project } from "../../types/crm";

export default function Payments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Form / Modal States
  const [isRecordOpen, setIsRecordOpen] = useState(false);
  const [projectId, setProjectId] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentType, setPaymentType] = useState<Payment["payment_type"]>("advance");
  const [paymentDate, setPaymentDate] = useState("");
  const [notes, setNotes] = useState("");

  const fetchPayments = () => {
    setLoading(true);
    api.get<Payment[]>("/admin/payments")
      .then((data) => {
        setPayments(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load payments:", err);
        setLoading(false);
      });
  };

  const fetchProjects = () => {
    api.get<Project[]>("/admin/projects").then(setProjects).catch(console.error);
  };

  useEffect(() => {
    fetchPayments();
    fetchProjects();
  }, []);

  const handleRecordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectId || !amount || !paymentDate) return;

    api.post<Payment>("/admin/payments", {
      project_id: projectId,
      amount: parseFloat(amount),
      payment_type: paymentType,
      payment_date: paymentDate,
      notes
    })
      .then(() => {
        setIsRecordOpen(false);
        resetForm();
        fetchPayments();
      })
      .catch((err) => console.error("Error logging payment:", err));
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to remove this payment record?")) return;
    api.delete(`/admin/payments/${id}`)
      .then(() => fetchPayments())
      .catch((err) => console.error("Error deleting payment:", err));
  };

  const resetForm = () => {
    setProjectId("");
    setAmount("");
    setPaymentType("advance");
    setPaymentDate("");
    setNotes("");
  };

  // Stats Calculations
  const grossRevenue = payments.reduce((acc, curr) => {
    if (curr.payment_type === "refund") return acc;
    return acc + Number(curr.amount);
  }, 0);

  const totalRefunds = payments.reduce((acc, curr) => {
    if (curr.payment_type === "refund") return acc + Number(curr.amount);
    return acc;
  }, 0);

  const netRevenue = grossRevenue - totalRefunds;

  const getPaymentTypeBadge = (t: Payment["payment_type"]) => {
    const base = "px-2 py-0.5 text-[9px] uppercase font-bold rounded ";
    switch (t) {
      case "advance": return base + "bg-blue-500/10 text-blue-400 border border-blue-500/10";
      case "milestone": return base + "bg-purple-500/10 text-purple-400 border border-purple-500/10";
      case "final": return base + "bg-emerald-500/10 text-emerald-400 border border-emerald-500/10";
      case "refund": return base + "bg-red-500/10 text-red-400 border border-red-500/10";
      default: return base + "bg-white/10 text-white/50";
    }
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold uppercase tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>Payments Ledger</h1>
          <p className="text-white/40 text-sm mt-1">Track advance deposits, contract milestones, refunds, and totals.</p>
        </div>
        <button
          onClick={() => { resetForm(); setIsRecordOpen(true); }}
          className="px-5 py-2.5 bg-[#FFFF00] text-[#0A0A0B] uppercase tracking-widest text-[10px] font-black rounded-lg hover:bg-white transition-colors flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Record Payment
        </button>
      </div>

      {/* Financial Analytics Summary widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-[#141416] p-6 rounded-[24px] border border-white/5">
          <p className="text-xs uppercase tracking-wider text-white/40 font-bold">Gross Revenue</p>
          <h3 className="text-3xl font-extrabold mt-3 text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
            ${grossRevenue.toLocaleString()}
          </h3>
          <p className="text-[10px] text-white/30 mt-1">Sum of advances & milestones</p>
        </div>

        <div className="bg-[#141416] p-6 rounded-[24px] border border-white/5">
          <p className="text-xs uppercase tracking-wider text-white/40 font-bold">Total Refunds</p>
          <h3 className="text-3xl font-extrabold mt-3 text-red-400" style={{ fontFamily: "'Syne', sans-serif" }}>
            ${totalRefunds.toLocaleString()}
          </h3>
          <p className="text-[10px] text-red-400/30 mt-1">Reversed milestones/cancellations</p>
        </div>

        <div className="bg-[#141416] p-6 rounded-[24px] border border-white/5 relative overflow-hidden">
          {/* Subtle gradient flash */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#FFFF00]/5 via-transparent to-transparent pointer-events-none" />
          <p className="text-xs uppercase tracking-wider text-white/40 font-bold">Net Earnings</p>
          <h3 className="text-3xl font-extrabold mt-3 text-[#FFFF00]" style={{ fontFamily: "'Syne', sans-serif" }}>
            ${netRevenue.toLocaleString()}
          </h3>
          <p className="text-[10px] text-[#FFFF00]/30 mt-1">Studio cash net inflow</p>
        </div>
      </div>

      {/* Ledger Log Table */}
      <div className="bg-[#141416] rounded-3xl border border-white/5 overflow-hidden">
        <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-white/40 p-6 border-b border-white/5 bg-[#141416]">Transaction History Log</h3>
        
        {loading ? (
          <div className="flex py-20 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#FFFF00] border-t-transparent"></div>
          </div>
        ) : payments.length === 0 ? (
          <div className="text-center py-20 text-white/30 italic">No payments logged yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/5 text-white/40 uppercase tracking-widest text-[9px] font-black bg-[#141416]">
                  <th className="py-4 px-6">Associated Project</th>
                  <th className="py-4 px-6">Payment Category</th>
                  <th className="py-4 px-6">Date Recorded</th>
                  <th className="py-4 px-6">Note Description</th>
                  <th className="py-4 px-6">Total Amount</th>
                  <th className="py-4 px-6 text-right">Delete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/80">
                {payments.map((pay) => (
                  <tr key={pay.id} className="hover:bg-white/[0.01] transition-colors">
                    <td className="py-4 px-6">
                      <p className="font-bold text-white">{pay.project?.name || "N/A"}</p>
                    </td>
                    <td className="py-4 px-6">{getPaymentTypeBadge(pay.payment_type)}</td>
                    <td className="py-4 px-6 text-xs text-white/40">{new Date(pay.payment_date).toLocaleDateString()}</td>
                    <td className="py-4 px-6 text-xs text-white/50 italic max-w-[200px] truncate">{pay.notes || "None"}</td>
                    <td className={`py-4 px-6 font-bold ${pay.payment_type === "refund" ? "text-red-400" : "text-[#FFFF00]"}`}>
                      {pay.payment_type === "refund" ? "-" : ""}${pay.amount.toLocaleString()}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => handleDelete(pay.id)}
                        className="p-1 text-white/20 hover:text-red-400 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* RECORD PAYMENT MODAL */}
      {isRecordOpen && (
        <div className="fixed inset-0 z-50 bg-[#0A0A0B]/80 backdrop-blur-md flex items-center justify-center p-6">
          <div className="bg-[#141416] border border-white/10 rounded-[30px] w-full max-w-md p-8 space-y-6 relative">
            <h3 className="text-xl font-bold uppercase tracking-wide" style={{ fontFamily: "'Syne', sans-serif" }}>Record Transaction</h3>
            <form onSubmit={handleRecordSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Select Project</label>
                <select required value={projectId} onChange={(e) => setProjectId(e.target.value)} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white">
                  <option value="">Choose Project</option>
                  {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Transaction Type</label>
                  <select value={paymentType} onChange={(e) => setPaymentType(e.target.value as any)} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white">
                    <option value="advance">Advance Deposit</option>
                    <option value="milestone">Milestone Payment</option>
                    <option value="final">Final Settlement</option>
                    <option value="refund">Refund / Credit</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Date</label>
                  <input type="date" required value={paymentDate} onChange={(e) => setPaymentDate(e.target.value)} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Payment Amount (USD)</label>
                <input type="number" required value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g. 5000" className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Notes / Description</label>
                <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="e.g. Final milestone for foundation completion" className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white" />
              </div>
              <div className="flex gap-3 pt-4 justify-end">
                <button type="button" onClick={() => setIsRecordOpen(false)} className="px-4 py-2 bg-transparent text-white/60 border border-white/10 text-xs rounded-xl hover:bg-white/5">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-[#FFFF00] text-[#0A0A0B] uppercase font-bold tracking-widest text-[10px] rounded-xl">Record Ledger</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
