"use client";

import { motion } from "framer-motion";
import { Panel } from "../Panel";
import { usePresentationContext } from "../PresentationProvider";

export function HeroPanel() {
  const { goTo } = usePresentationContext();

  return (
    <Panel id="hero" index={0} bgImage="/media/hero-bg.jpg">
      <div className="max-w-4xl">
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-6xl md:text-8xl font-black mb-6 leading-none"
        >
          HI, I&apos;M MUHAMMAD REHAN
        </motion.h1>
        
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-2xl md:text-4xl text-white/80 font-medium mb-8"
        >
          Web Developer & Cybersecurity Analyst <br />
          <span className="font-caveat text-4xl text-white/60 block mt-2">based in Karachi, Pakistan.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-xl max-w-2xl text-white/70 mb-12"
        >
          Building clean, performant websites and hunting vulnerabilities.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-4 mb-12"
        >
          <div className="border border-white/20 px-4 py-2 rounded-full text-sm">3+ Years Experience</div>
          <div className="border border-white/20 px-4 py-2 rounded-full text-sm">10+ Projects Delivered</div>
          <div className="border border-white/20 px-4 py-2 rounded-full text-sm">VAPT Certified Skill</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="flex gap-6"
        >
          <button 
            onClick={() => goTo(4)}
            className="relative overflow-hidden bg-white px-8 py-4 font-bold tracking-wider uppercase group"
          >
            <span className="absolute inset-0 bg-black origin-right scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100" />
            <span className="relative z-10 text-black group-hover:text-white transition-colors duration-500">
              View Projects
            </span>
          </button>
          
          <button 
            onClick={() => goTo(6)}
            className="relative overflow-hidden border border-white px-8 py-4 font-bold tracking-wider uppercase group"
          >
            <span className="absolute inset-0 bg-white origin-right scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100" />
            <span className="relative z-10 text-white group-hover:text-black transition-colors duration-500">
              Let&apos;s Talk
            </span>
          </button>
        </motion.div>
      </div>
    </Panel>
  );
}
