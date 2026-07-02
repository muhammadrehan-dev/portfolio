"use client";

import { motion } from "framer-motion";
import { Panel } from "../Panel";

export function SkillsPanel() {
  const skillCategories = [
    {
      title: "Computer Skills",
      skills: ["MS Word/PowerPoint/Excel", "Internet Research", "Basic Programming"]
    },
    {
      title: "Web & Backend",
      skills: ["Next.js", "Node.js", "React", "Flutter/Dart", ".NET", "Java", "SQL (MySQL/SQLite)", "Firebase / Supabase", "FTP server-side setups", "WordPress / WooCommerce"]
    },
    {
      title: "Security Skills",
      skills: ["VAPT", "Bug Bounty", "IDOR", "Linux", "Networking", "Recon"]
    }
  ];

  return (
    <Panel id="skills" index={3} bgImage="/media/skills-bg.jpg">
      <div className="max-w-6xl w-full">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-black mb-16"
        >
          SKILLS & EXPERTISE
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6 pb-4 border-b border-white/20 uppercase tracking-widest">{cat.title}</h3>
              <ul className="space-y-4">
                {cat.skills.map((skill, j) => (
                  <motion.li 
                    key={skill}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: (i * 0.2) + (j * 0.05) }}
                    viewport={{ once: true }}
                    className="flex items-center text-white/70 before:content-[''] before:w-1.5 before:h-1.5 before:bg-white before:mr-3"
                  >
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </Panel>
  );
}
