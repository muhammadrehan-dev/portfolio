"use client";

import { motion } from "framer-motion";
import { Panel } from "../Panel";

export function EducationPanel() {
  const education = [
    {
      title: "BS Information Technology / Cybersecurity",
      inst: "Dawood University of Engineering & Technology (DUET)",
      year: "2025–2029",
      details: "Currently pursuing a degree focused on network security, web application vulnerabilities, and modern software development. Blending academic theory with practical bug bounty hunting and real-world web development.",
    }
  ];

  return (
    <Panel id="education" index={2} bgImage="/media/education-bg.jpg">
      <div className="max-w-4xl">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl lg:text-6xl font-black mb-8"
        >
          EDUCATION & CERTIFICATION
        </motion.h2>

        <div className="flex flex-col gap-6">
          {education.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="relative flex items-center group is-active"
            >
              <div className="w-full p-8 bg-white/5 border border-white/10 rounded">
                <div className="text-white/50 text-sm font-bold tracking-widest mb-3 uppercase">{item.year}</div>
                <h3 className="text-3xl font-black mb-2">{item.title}</h3>
                <p className="text-white font-bold text-xl mb-4">{item.inst}</p>
                <p className="text-white/70 leading-relaxed max-w-2xl">{item.details}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Panel>
  );
}
