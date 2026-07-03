"use client";

import { motion } from "framer-motion";
import { Panel } from "../Panel";
import { ShieldCheck, Bug, ShieldAlert } from "lucide-react";

export function SecurityPanel() {
  const highlights = [
    {
      icon: <Bug className="mb-3 md:mb-6 opacity-80 w-8 h-8 md:w-12 md:h-12" />,
      title: "Responsible Disclosure",
      desc: "Discovered and reported a critical IDOR vulnerability in a university portal, formally recognized by the university administration."
    },
    {
      icon: <ShieldAlert className="mb-3 md:mb-6 opacity-80 w-8 h-8 md:w-12 md:h-12" />,
      title: "Site Recovery",
      desc: "Successfully recovered 2 compromised websites — identified the attack vectors, cleaned malicious payloads, and hardened the systems to prevent reoccurrence."
    },
    {
      icon: <ShieldCheck className="mb-3 md:mb-6 opacity-80 w-8 h-8 md:w-12 md:h-12" />,
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
          className="text-3xl sm:text-5xl md:text-7xl font-black mb-8 md:mb-16"
        >
          HUNTING BUGS. <br />
          <span className="text-white/50">SECURING SYSTEMS.</span>
        </motion.h2>

        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] -mx-5 px-5 md:mx-0 md:px-0 mt-8 md:mt-16">
          <div className="animate-marquee gap-4 md:gap-8">
            {[...highlights, ...highlights].map((h, i) => (
              <div
                key={i}
                className="w-[300px] md:w-[400px] shrink-0 p-5 md:p-8 border-l border-white/20 bg-black/40"
              >
                {h.icon}
                <h3 className="text-lg md:text-2xl font-bold mb-2 md:mb-4">{h.title}</h3>
                <p className="text-white/70 leading-relaxed text-xs md:text-base">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  );
}
