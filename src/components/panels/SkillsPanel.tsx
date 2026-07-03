"use client";

import { motion } from "framer-motion";
import { Panel } from "../Panel";

export function SkillsPanel() {


  return (
    <Panel id="skills" index={3} bgImage="/media/skills-bg.jpg">
      <div className="max-w-6xl w-full">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-5xl md:text-7xl font-black mb-8 md:mb-16"
        >
          SKILLS & EXPERTISE
        </motion.h2>

        <div className="flex flex-wrap justify-center items-center gap-3 md:gap-6 mt-6 md:mt-10">
          {[
            "Next.js", "Node.js", "React", "Flutter", "Dart", ".NET", "Java",
            "SQL", "Firebase", "Supabase", "FTP", "WordPress", "WooCommerce",
            "VAPT", "Bug Bounty", "IDOR", "Linux", "Networking", "Recon"
          ].map((skill, i) => {
            const rotation = (i % 2 === 0 ? 1 : -1) * (i % 4) * 3;
            return (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.5, rotate: rotation }}
                whileInView={{ opacity: 1, scale: 1, rotate: rotation }}
                whileHover={{ scale: 1.25, rotate: 0, zIndex: 20, color: "#ffffff" }}
                whileTap={{ scale: 1.25, rotate: 0, zIndex: 20, color: "#ffffff" }}
                transition={{ 
                  duration: 0.4, 
                  delay: i * 0.05,
                  scale: { type: "spring", stiffness: 400, damping: 20 }
                }}
                className="text-white/40 text-lg sm:text-2xl md:text-4xl lg:text-5xl font-black cursor-pointer uppercase tracking-wider transition-colors"
                style={{
                  transformOrigin: "center"
                }}
              >
                {skill}
              </motion.div>
            );
          })}
        </div>
      </div>
    </Panel>
  );
}
