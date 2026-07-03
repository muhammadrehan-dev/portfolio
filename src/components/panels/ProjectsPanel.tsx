"use client";

import { motion } from "framer-motion";
import { Panel } from "../Panel";
import { ArrowUpRight, Smartphone } from "lucide-react";

// ── Project Data ────────────────────────────────────────────────────────────────

const topRowProjects = [
  {
    category: "Education · Community",
    name: "DuetHub",
    desc: "Centralized prep repo for DUET Cyber 2025-F batch",
    tags: ["Next.js", "Tailwind"],
    link: "https://duet-hub.vercel.app",
  },
  {
    category: "Social · University",
    name: "Duetology",
    desc: "Anonymous teacher rating & confession hub",
    tags: ["React", "Firebase"],
    link: "https://duetology.vercel.app",
  },
  {
    category: "Satire · Cybersecurity",
    name: "TrustUs PK",
    desc: "Satirical cybersecurity firm site",
    tags: ["HTML/CSS", "JS"],
    link: "https://trustuspk.vercel.app",
  },
  {
    category: "Android · Agency",
    name: "7 Experts App",
    desc: "Customer-facing app for professional services",
    tags: ["Flutter", "Supabase"],
    link: null,
  },
];

const bottomRowProjects = [
  {
    category: "Agency · Corporate",
    name: "7 Experts PK",
    desc: "Agency website for professional services",
    tags: ["Web Design", "Agency"],
    link: "https://7expertspk.com",
  },
  {
    category: "B2B · Medical",
    name: "Peaceful Dental",
    desc: "B2B international site for dental equipment",
    tags: ["React", "B2B"],
    link: "https://peaceful-dental.vercel.app",
  },
  {
    category: "Corporate · Energy",
    name: "Sunlink Corporation",
    desc: "Corporate website for solar energy solutions",
    tags: ["Web", "Corporate"],
    link: "https://sunlink-solar.vercel.app",
  },
  {
    category: "Android · E-Commerce",
    name: "High Spice",
    desc: "E-commerce app with WooCommerce backend",
    tags: ["Flutter", "WooCommerce"],
    link: null,
  },
];

// ── Marquee Row ─────────────────────────────────────────────────────────────────

function MarqueeRow({
  projects,
  direction,
}: {
  projects: typeof topRowProjects;
  direction: "left" | "right";
}) {
  // Duplicate the list so the loop looks seamless
  const items = [...projects, ...projects];
  const isLeft = direction === "left";

  return (
    <div className="relative overflow-hidden w-full">
      {/* Fade masks on sides */}
      <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-r from-black/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-l from-black/80 to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-4 md:gap-6 w-max"
        animate={{
          x: isLeft ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          x: {
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      >
        {items.map((p, i) => {
          const CardWrapper = p.link ? "a" : "div";
          const linkProps = p.link
            ? { href: p.link, target: "_blank" as const, rel: "noopener noreferrer" }
            : {};

          return (
            <CardWrapper
              key={`${p.name}-${i}`}
              {...linkProps}
              className="group border border-white/20 bg-black/50 flex flex-col w-[260px] sm:w-[300px] md:w-[340px] shrink-0 hover:bg-white/5 transition-colors p-4 md:p-6 cursor-pointer"
            >
              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] md:text-xs font-bold tracking-widest text-white/50 uppercase">
                  {p.category}
                </span>
                <span className="text-white/50 group-hover:text-white transition-colors">
                  {p.link ? (
                    <ArrowUpRight size={16} />
                  ) : (
                    <Smartphone size={16} />
                  )}
                </span>
              </div>
              <h3 className="text-base md:text-xl font-bold mb-1 group-hover:text-white transition-colors">
                {p.name}
              </h3>
              <p className="text-white/70 mb-4 flex-grow text-xs md:text-sm">
                {p.desc}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] md:text-xs border border-white/30 px-2 py-0.5 rounded-sm text-white/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </CardWrapper>
          );
        })}
      </motion.div>
    </div>
  );
}

// ── Projects Panel ──────────────────────────────────────────────────────────────

export function ProjectsPanel() {
  return (
    <Panel id="projects" index={4} bgImage="/media/projects-bg.jpg">
      <div className="w-full max-w-none">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-5xl md:text-7xl font-black mb-6 md:mb-10 px-0"
        >
          SELECTED WORK
        </motion.h2>

        {/* Two-row infinite marquee */}
        <div className="flex flex-col gap-4 md:gap-6 mb-6 md:mb-8 -mx-5 md:-mx-24">
          <MarqueeRow projects={topRowProjects} direction="left" />
          <MarqueeRow projects={bottomRowProjects} direction="right" />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center text-white/50 text-xs md:text-sm tracking-widest font-bold uppercase"
        >
          ...and more on{" "}
          <a
            href="https://github.com/muhammadrehan-dev"
            target="_blank"
            className="text-white hover:underline"
          >
            GitHub
          </a>{" "}
          or at{" "}
          <a
            href="https://7expertspk.com"
            target="_blank"
            className="text-white hover:underline"
          >
            7ExpertsPK.com
          </a>
        </motion.div>
      </div>
    </Panel>
  );
}
