"use client";

import { motion } from "framer-motion";
import { Panel } from "../Panel";
import { ShieldCheck, Bug, Award } from "lucide-react";

export function SecurityPanel() {
  const highlights = [
    {
      icon: <Bug size={48} className="mb-6 opacity-80" />,
      title: "Responsible Disclosure",
      desc: "Discovered and reported a critical IDOR vulnerability in a university portal, formally recognized by the university administration."
    },
    {
      icon: <Award size={48} className="mb-6 opacity-80" />,
      title: "Recognition Award",
      desc: "Received the University Cybersecurity Recognition Award for proactive vulnerability hunting and securing campus systems."
    },
    {
      icon: <ShieldCheck size={48} className="mb-6 opacity-80" />,
      title: "System Hardening",
      desc: "Experienced in OS hardening, basic networking, and securing automated billing systems like WhatsApp API integrations."
    }
  ];

  return (
    <Panel id="security" index={5} bgImage="/media/security-bg.jpg">
      <div className="max-w-6xl w-full">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-black mb-16"
        >
          HUNTING BUGS. <br />
          <span className="text-white/50">SECURING SYSTEMS.</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.map((h, i) => (
            <motion.div
              key={h.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              viewport={{ once: true }}
              className="p-8 border-l border-white/20"
            >
              {h.icon}
              <h3 className="text-2xl font-bold mb-4">{h.title}</h3>
              <p className="text-white/70 leading-relaxed text-sm md:text-base">{h.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Panel>
  );
}
