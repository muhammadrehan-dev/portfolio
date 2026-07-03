"use client";

import { motion } from "framer-motion";
import { Panel } from "../Panel";

export function AboutPanel() {
  return (
    <Panel id="about" index={1} bgImage="/media/about-bg.jpg">
      <div className="max-w-5xl">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-4xl md:text-6xl font-black mb-4 md:mb-8"
        >
          Developer by day, <br className="hidden md:block" />
          <span className="text-white/50">Security analyst by instinct.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-base sm:text-xl md:text-2xl text-white/80 mb-8 md:mb-16 max-w-3xl leading-relaxed"
        >
          Cyber Security student at Dawood University of Engineering and Technology (DUET), Karachi. 
          Blending web development with a security mindset to build and protect digital products. 
          <br /><br />
          Also known in the developer and security community by my alias, <strong className="text-white">CH4 Ezio</strong>.
        </motion.p>

        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] -mx-5 px-5 md:mx-0 md:px-0">
          <div className="animate-marquee gap-4 md:gap-8">
            {[
              {
                title: "Web Development",
                desc: "WordPress, custom HTML/CSS/JS, React, WooCommerce, clean fast mobile-first builds.",
              },
              {
                title: "Cybersecurity",
                desc: "VAPT, bug bounty hunting, IDOR exploitation, OS hardening, basic networking.",
              },
              {
                title: "Tools & Other",
                desc: "Canva, FTP/hosting management, SEO/Analytics, cPanel, Vercel/Netlify, WhatsApp API integrations.",
              },
              {
                title: "Web Development",
                desc: "WordPress, custom HTML/CSS/JS, React, WooCommerce, clean fast mobile-first builds.",
              },
              {
                title: "Cybersecurity",
                desc: "VAPT, bug bounty hunting, IDOR exploitation, OS hardening, basic networking.",
              },
              {
                title: "Tools & Other",
                desc: "Canva, FTP/hosting management, SEO/Analytics, cPanel, Vercel/Netlify, WhatsApp API integrations.",
              }
            ].map((item, i) => (
              <div
                key={i}
                className="w-[280px] md:w-[320px] shrink-0 p-4 md:p-6 border border-white/20 bg-black/40"
              >
                <h3 className="text-base md:text-xl font-bold mb-2 md:mb-3">{item.title}</h3>
                <p className="text-white/60 text-xs md:text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  );
}
