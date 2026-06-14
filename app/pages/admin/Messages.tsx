import { useState, useEffect } from "react";
import { Mail, MailOpen, Trash2, Send, CheckCircle2, UserCheck } from "lucide-react";
import { api } from "../../services/api";
import { Message } from "../../types/crm";

export default function Messages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const fetchMessages = () => {
    setLoading(true);
    api.get<Message[]>("/admin/messages")
      .then((data) => {
        setMessages(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load messages:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleMarkRead = (id: string, read: boolean) => {
    api.put<Message>(`/admin/messages/${id}/read`, { is_read: read })
      .then((updated) => {
        if (selectedMessage?.id === id) {
          setSelectedMessage(updated);
        }
        fetchMessages();
      })
      .catch((err) => console.error("Failed to mark read status:", err));
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    api.delete(`/admin/messages/${id}`)
      .then(() => {
        if (selectedMessage?.id === id) setSelectedMessage(null);
        fetchMessages();
      })
      .catch((err) => console.error("Error deleting message:", err));
  };

  const handleConvertToLead = (id: string) => {
    if (!confirm("Convert this contact submission into a CRM Lead?")) return;
    api.post<any>(`/admin/messages/${id}/convert`, {})
      .then(() => {
        alert("Message successfully converted to Lead!");
        fetchMessages();
        setSelectedMessage(null);
      })
      .catch((err) => console.error("Failed to convert message to lead:", err));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* ── MESSAGES INBOX COLUMN ── */}
      <div className={`${selectedMessage ? "lg:col-span-5" : "lg:col-span-12"} space-y-8`}>
        <div>
          <h1 className="text-3xl font-extrabold uppercase tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>Messages Inbox</h1>
          <p className="text-white/40 text-sm mt-1">Review public contact inquiry submissions and convert to leads.</p>
        </div>

        <div className="bg-[#141416] rounded-3xl border border-white/5 overflow-hidden">
          {loading ? (
            <div className="flex py-20 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#FFFF00] border-t-transparent"></div>
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center py-20 text-white/40">No contact forms submitted yet.</div>
          ) : (
            <div className="divide-y divide-white/5">
              {messages.map((msg) => (
                <div 
                  key={msg.id}
                  onClick={() => {
                    setSelectedMessage(msg);
                    if (!msg.is_read) handleMarkRead(msg.id, true);
                  }}
                  className={`p-5 cursor-pointer transition-colors text-left flex items-start gap-4 relative ${
                    selectedMessage?.id === msg.id ? "bg-[#FFFF00]/5 hover:bg-[#FFFF00]/10" : "hover:bg-white/[0.01]"
                  }`}
                >
                  {/* Unread indicator bar */}
                  {!msg.is_read && (
                    <div className="absolute top-0 bottom-0 left-0 w-[3px] bg-[#FFFF00]" />
                  )}

                  <div className="mt-1 flex-shrink-0">
                    {msg.is_read ? (
                      <MailOpen className="w-4 h-4 text-white/20" />
                    ) : (
                      <Mail className="w-4 h-4 text-[#FFFF00]" />
                    )}
                  </div>
                  <div className="min-w-0 flex-grow">
                    <div className="flex justify-between items-start gap-2">
                      <p className={`text-xs truncate ${msg.is_read ? "text-white/50" : "font-bold text-white"}`}>
                        {msg.name}
                      </p>
                      <span className="text-[10px] text-white/30 flex-shrink-0">
                        {new Date(msg.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className={`text-sm truncate mt-1 ${msg.is_read ? "text-white/40" : "font-bold text-white/80"}`}>
                      {msg.subject || "No Subject"}
                    </p>
                    <p className="text-xs text-white/30 truncate mt-1">{msg.message}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── MESSAGE DETAIL COLUMN ── */}
      {selectedMessage && (
        <div className="lg:col-span-7 bg-[#141416] p-8 rounded-[30px] border border-white/5 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-start border-b border-white/5 pb-6">
            <div>
              <h2 className="text-xl font-bold uppercase tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
                {selectedMessage.subject || "General Inquiry"}
              </h2>
              <p className="text-xs text-white/30 mt-1">From: <span className="text-white/70 font-semibold">{selectedMessage.name}</span> &bull; {selectedMessage.email}</p>
              {selectedMessage.phone && <p className="text-xs text-white/30 mt-0.5">Phone: <span className="text-white/60">{selectedMessage.phone}</span></p>}
            </div>
            <button 
              onClick={() => setSelectedMessage(null)}
              className="px-3 py-1 bg-[#0A0A0B] border border-white/10 text-white/40 rounded-lg text-xs cursor-pointer"
            >
              Close
            </button>
          </div>

          {/* Action Operations */}
          <div className="flex flex-wrap gap-2 pb-6 border-b border-white/5">
            <button
              onClick={() => handleConvertToLead(selectedMessage.id)}
              className="px-4 py-2 bg-[#FFFF00] text-[#0A0A0B] uppercase font-bold tracking-widest text-[9px] rounded-lg hover:bg-white transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <UserCheck className="w-3.5 h-3.5" /> Convert to Lead
            </button>
            <button
              onClick={() => handleMarkRead(selectedMessage.id, !selectedMessage.is_read)}
              className="px-4 py-2 bg-[#141416] border border-white/10 hover:border-white/20 text-white/60 hover:text-white rounded-lg text-[9px] uppercase tracking-wider font-bold cursor-pointer transition-colors"
            >
              {selectedMessage.is_read ? "Mark Unread" : "Mark Read"}
            </button>
            <button
              onClick={() => handleDelete(selectedMessage.id)}
              className="px-4 py-2 bg-red-500/10 border border-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 rounded-lg text-[9px] uppercase tracking-wider font-bold cursor-pointer transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" /> Delete
            </button>
          </div>

          {/* Message Body */}
          <div className="bg-[#0A0A0B]/50 p-6 rounded-2xl border border-white/5">
            <h4 className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-4 flex items-center gap-1.5">
              <Send className="w-3.5 h-3.5" /> Message Content
            </h4>
            <p className="text-xs md:text-sm leading-relaxed text-white/80 whitespace-pre-line">
              {selectedMessage.message}
            </p>
          </div>

          <div className="text-[10px] text-white/25 italic text-right">
            Received via site contact form on {new Date(selectedMessage.created_at).toLocaleString()}
          </div>
        </div>
      )}
    </div>
  );
}
