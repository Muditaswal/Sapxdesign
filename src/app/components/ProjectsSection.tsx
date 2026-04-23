import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ScrollReveal } from "./ScrollReveal";
import { X, ArrowUpRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  image: string;
  description: string;
  role: string;
  process: string;
  outcome: string;
  span: "normal" | "tall" | "wide";
}

const projects: Project[] = [
  {
    id: "1",
    title: "Haus am See",
    category: "Architecture",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1693901103311-18a38b30a99e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwYXJjaGl0ZWN0dXJlJTIwY29uY3JldGUlMjBidWlsZGluZ3xlbnwxfHx8fDE3NzE2NTgzODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description:
      "A lakeside residence that merges concrete minimalism with the natural landscape. The building emerges from the terrain as if carved by water and wind, creating a dialogue between built form and environment.",
    role: "Architecture, Landscape Integration, Interior Concept",
    process:
      "Beginning with extensive site analysis, we mapped seasonal light patterns and water levels over 18 months. The resulting form responds to these natural rhythms, with living spaces oriented toward winter sun and bedrooms sheltered from summer heat.",
    outcome:
      "A 320m² residence that achieved passive house certification while maintaining an uncompromising architectural vision. Featured in Dezeen and nominated for the EU Mies Award.",
    span: "tall",
  },
  {
    id: "6",
    title: "Atelier Workspace",
    category: "UI/UX Design",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1658232190602-be6cd5b976f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGFic3RyYWN0JTIwZ3JhZGllbnQlMjBkZXNpZ24lMjBkaWdpdGFsJTIwYXJ0fGVufDF8fHx8MTc3MTY2MjIyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description:
      "A digital workspace platform designed with architectural sensibility. The interface uses spatial metaphors — rooms, thresholds, and views — to organize creative collaboration.",
    role: "UI/UX Design, Design System, Prototyping",
    process:
      "We conducted extensive research into how architects and designers actually work. The interface was designed through a series of spatial prototypes — physical models that mapped digital interactions to bodily experience.",
    outcome:
      "Launched with 12,000 beta users and a 94% retention rate. The design system now serves as the foundation for all the client's digital products.",
    span: "tall",
  },
  {
    id: "2",
    title: "Maison Lumiere",
    category: "Interior Design",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1768488314310-3742b3c75579?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb2xvcmZ1bCUyMGludGVyaW9yJTIwZGVzaWduJTIwbGl2aW5nJTIwcm9vbXxlbnwxfHx8fDE3NzE1ODE2MDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description:
      "A Parisian apartment transformed through material restraint and spatial generosity. Every surface, from the lime-washed walls to the oiled oak floors, was selected to age with grace.",
    role: "Interior Design, Furniture Curation, Lighting",
    process:
      "We stripped the apartment to its bones, revealing original stone walls and ceiling beams. The new intervention is deliberately minimal — a palette of three materials that creates warmth through proportion rather than decoration.",
    outcome:
      "A residence that feels both ancient and contemporary, where natural light becomes the primary ornament. Published in Elle Décoration and Architectural Digest.",
    span: "normal",
  },
  {
    id: "3",
    title: "Forma Chair",
    category: "Product Design",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1551907234-fb773fb08a2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwcHJvZHVjdCUyMGRlc2lnbiUyMGZ1cm5pdHVyZXxlbnwxfHx8fDE3NzE2NTgzODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description:
      "A dining chair that expresses its construction. Solid ash joinery meets hand-woven Danish cord in a form that is simultaneously structural and sculptural.",
    role: "Product Design, Prototyping, Manufacturing",
    process:
      "Over 14 prototypes, we refined the geometry until the structure was self-bracing — eliminating the need for hidden hardware. Each joint was designed to be assembled by hand without glue.",
    outcome:
      "Now in production with a Scandinavian manufacturer. Winner of the IF Design Award 2023. Available in ash, walnut, and oak.",
    span: "normal",
  },
  {
    id: "4",
    title: "Kulturhaus Wien",
    category: "Architecture",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1767620511201-752fa2fdc989?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMG1vZGVybiUyMGFyY2hpdGVjdHVyZSUyMGdlb21ldHJpYyUyMGJ1aWxkaW5nfGVufDF8fHx8MTc3MTY2MjIyMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description:
      "A cultural centre in Vienna that reimagines the civic institution. The building is organized around a central void — a covered public space that belongs to neither inside nor outside.",
    role: "Architecture, Urban Planning, Exhibition Design",
    process:
      "Competition-winning design developed through extensive public consultation. The building's form emerged from the urban context: a series of shifted volumes that create covered passages connecting two formerly disconnected streets.",
    outcome:
      "A 4,200m² cultural centre serving 120,000 visitors annually. Shortlisted for the Stirling Prize and featured at the Venice Biennale.",
    span: "wide",
  },
  {
    id: "5",
    title: "Stille Wohnen",
    category: "Interior Design",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1571164860029-856acbc24b4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2FuZGluYXZpYW4lMjBpbnRlcmlvciUyMGxpdmluZyUyMHJvb218ZW58MXx8fHwxNzcxNjU4Mzg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description:
      "A Nordic-inspired apartment where silence is a design material. Acoustic engineering meets spatial design in a home built for deep focus and restorative rest.",
    role: "Interior Design, Acoustic Engineering, Custom Millwork",
    process:
      "Working with acoustic consultants, we developed wall assemblies and ceiling treatments that reduce ambient noise to below 25 dB. Natural materials — wool, timber, and linen — absorb sound while creating sensory warmth.",
    outcome:
      "A prototype for residential acoustic design, now informing our approach to all interior projects. Featured in Monocle and Kinfolk.",
    span: "normal",
  },
];

const categories = ["All", "Architecture", "Interior Design", "Product Design", "UI/UX Design"];

export function ProjectsSection() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState("All");

  const filteredProjects = projects.filter(
    (p) => filter === "All" || p.category === filter
  );

  const openProject = (project: Project) => {
    setActiveProject(project);
    document.body.style.overflow = "hidden";
  };

  const closeProject = () => {
    setActiveProject(null);
    document.body.style.overflow = "";
  };

  return (
    <>
      <section id="works" className="py-20 md:py-28 px-6 md:px-12 relative overflow-hidden bg-[#0A0A0B]">
        <div className="max-w-[1400px] mx-auto relative z-10">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-[3px] bg-[#FFFF00]" />
                <p
                  className="uppercase tracking-[0.3em] text-white/40 text-[12px]"
                  style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600 }}
                >
                  Selected Works
                </p>
              </div>
              
              {/* Category Filter — graphic tabs */}
              <div className="flex flex-wrap gap-x-2 gap-y-3">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className="text-[13px] tracking-[0.05em] transition-all duration-200 px-4 py-2 cursor-pointer rounded-full"
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: filter === cat ? 700 : 400,
                      color: filter === cat ? "#0A0A0B" : "rgba(255,255,255,0.4)",
                      backgroundColor: filter === cat ? "#FFFF00" : "transparent",
                      border: filter === cat ? "none" : "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Grid */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className={
                    project.span === "wide"
                      ? "md:col-span-2"
                      : ""
                  }
                >
                  <button
                    onClick={() => openProject(project)}
                    className="group w-full text-left cursor-pointer block"
                  >
                    {/* Red 4px border on hover — sharp, industrial */}
                    <div
                      className={`relative overflow-hidden rounded-3xl border-4 border-transparent group-hover:border-[#EC0606] transition-colors duration-300 ${
                        project.span === "tall"
                          ? "aspect-[3/4]"
                          : project.span === "wide"
                          ? "aspect-[16/7]"
                          : "aspect-[4/3]"
                      }`}
                    >
                      <ImageWithFallback
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-end p-6 md:p-8 rounded-3xl">
                        <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                          <div className="w-10 h-10 flex items-center justify-center bg-[#EC0606] rounded-full">
                            <ArrowUpRight className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex items-start justify-between">
                      <div>
                        <h3
                          className="text-[24px] md:text-[28px] tracking-[-0.02em] text-white uppercase"
                          style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700 }}
                        >
                          {project.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-2">
                          <span
                            className="inline-block px-3 py-1 text-[12px] uppercase tracking-[0.1em]"
                            style={{
                              fontFamily: "'Montserrat', sans-serif",
                              fontWeight: 600,
                              background: "#0A0A0B",
                              color: "#FFFF00",
                              border: "1px solid rgba(255,255,255,0.1)",
                            }}
                          >
                            {project.category}
                          </span>
                        </div>
                      </div>
                      <p
                        className="text-[14px] text-white/35 mt-1"
                        style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400 }}
                      >
                        {project.year}
                      </p>
                    </div>
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-[#0A0A0B] overflow-y-auto"
          >
            {/* Close button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              onClick={() => closeProject()}
              className="fixed top-6 right-6 md:top-8 md:right-12 z-50 w-10 h-10 flex items-center justify-center transition-colors cursor-pointer bg-white/10 backdrop-blur-sm hover:bg-[#EC0606] rounded-full"
            >
              <X className="w-5 h-5 text-white" />
            </motion.button>

            {/* Cover image */}
            <motion.div
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="w-full aspect-[16/9] md:aspect-[16/7] overflow-hidden relative rounded-b-[40px]"
            >
              <ImageWithFallback
                src={activeProject.image}
                alt={activeProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-transparent to-transparent" />
              {/* Red stripe accent */}
              <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-[#EC0606]" />
            </motion.div>

            {/* Content */}
            <div className="max-w-[1000px] mx-auto px-6 md:px-12 py-16 md:py-24">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className="inline-block px-4 py-1.5 text-[13px] uppercase tracking-[0.15em]"
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 700,
                      backgroundColor: "#FFFF00",
                      color: "#0A0A0B",
                    }}
                  >
                    {activeProject.category}
                  </span>
                  <span
                    className="text-[13px] tracking-[0.1em] text-white/35"
                    style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400 }}
                  >
                    {activeProject.year}
                  </span>
                </div>

                <h2
                  className="text-[clamp(40px,6vw,72px)] tracking-[-0.02em] mb-8 text-white uppercase"
                  style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}
                >
                  {activeProject.title}
                </h2>

                <p
                  className="text-[17px] md:text-[18px] leading-[1.8] text-white/50 max-w-[640px] mb-16"
                  style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400 }}
                >
                  {activeProject.description}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 pt-12 border-t-2 border-white/10"
              >
                {[
                  { label: "Role", content: activeProject.role },
                  { label: "Process", content: activeProject.process },
                  { label: "Outcome", content: activeProject.outcome },
                ].map((item) => (
                  <div key={item.label}>
                    <p
                      className="text-[13px] uppercase tracking-[0.2em] mb-4"
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 700,
                        color: "#EC0606",
                      }}
                    >
                      {item.label}
                    </p>
                    <p
                      className="text-[15px] leading-[1.7] text-white/45"
                      style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400 }}
                    >
                      {item.content}
                    </p>
                  </div>
                ))}
              </motion.div>

              {/* Back button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-16 pt-12 border-t-2 border-white/10"
              >
                <button
                  onClick={() => closeProject()}
                  className="inline-flex items-center gap-2 text-[14px] uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors cursor-pointer group"
                  style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}
                >
                  <span className="w-8 h-8 flex items-center justify-center border-2 border-white/15 group-hover:border-[#FFFF00] group-hover:bg-[#FFFF00] group-hover:text-[#0A0A0B] transition-all rounded-full">
                    &larr;
                  </span>
                  Back to Projects
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}