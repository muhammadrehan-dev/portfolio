"use client";

import { motion } from "framer-motion";
import { Panel } from "../Panel";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function ProjectsPanel() {
  const projects = [
    {
      category: "Education · Community",
      name: "DuetHub",
      desc: "Centralized prep repo for DUET Cyber 2025-F batch",
      tags: ["Next.js", "Tailwind"],
      link: "https://duet-hub.vercel.app"
    },
    {
      category: "Social · University",
      name: "Duetology",
      desc: "Anonymous teacher rating & confession hub",
      tags: ["React", "Firebase"],
      link: "https://duetology.vercel.app"
    },
    {
      category: "Satire · Cybersecurity",
      name: "TrustUs PK",
      desc: "Satirical cybersecurity firm site",
      tags: ["HTML/CSS", "JS"],
      link: "https://trustuspk.vercel.app"
    },
    {
      category: "Agency · Corporate",
      name: "7 Experts PK",
      desc: "Agency website for professional services",
      tags: ["Web Design", "Agency"],
      link: "https://7expertspk.com"
    },
    {
      category: "B2B · Medical",
      name: "Peaceful Dental",
      desc: "B2B international site for dental equipment",
      tags: ["React", "B2B"],
      link: "https://peaceful-dental.vercel.app"
    },
    {
      category: "Corporate · Energy",
      name: "Sunlink Corporation",
      desc: "Corporate website for solar energy solutions",
      tags: ["Web", "Corporate"],
      link: "https://sunlink-solar.vercel.app"
    }
  ];

  return (
    <Panel id="projects" index={4} bgImage="/media/projects-bg.jpg">
      <div className="max-w-6xl w-full">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-black mb-12"
        >
          SELECTED WORK
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {projects.map((p, i) => (
            <motion.a
              key={p.name}
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group border border-white/20 bg-black/50 backdrop-blur flex flex-col h-full hover:bg-white/5 transition-colors p-6 cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-bold tracking-widest text-white/50 uppercase">{p.category}</span>
                <span className="text-white/50 group-hover:text-white transition-colors">
                  <ArrowUpRight size={18} />
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-2 group-hover:text-white transition-colors">{p.name}</h3>
              <p className="text-white/70 mb-6 flex-grow text-sm">{p.desc}</p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {p.tags.map(tag => (
                  <span key={tag} className="text-xs border border-white/30 px-2 py-1 rounded-sm text-white/80">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center text-white/50 text-sm tracking-widest font-bold uppercase"
        >
          ...and more available on my <a href="https://github.com/muhammadrehan-dev" target="_blank" className="text-white hover:underline">GitHub</a> or at <a href="https://7expertspk.com" target="_blank" className="text-white hover:underline">7ExpertsPK.com</a>
        </motion.div>
      </div>
    </Panel>
  );
}
