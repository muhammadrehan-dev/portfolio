"use client";

import { motion } from "framer-motion";
import { Panel } from "../Panel";
import { Mail } from "lucide-react";
import { FaLinkedin, FaGithub, FaInstagram, FaWhatsapp, FaTelegram } from "react-icons/fa";

export function ContactPanel() {
  const links = [
    { name: "Email", icon: <Mail className="w-5 h-5 md:w-6 md:h-6" />, href: "mailto:ch4_ezio@proton.me" },
    { name: "WhatsApp", icon: <FaWhatsapp className="w-5 h-5 md:w-6 md:h-6" />, href: "https://wa.me/923229680603" },
    { name: "Telegram", icon: <FaTelegram className="w-5 h-5 md:w-6 md:h-6" />, href: "https://t.me/923229680603" },
    { name: "LinkedIn", icon: <FaLinkedin className="w-5 h-5 md:w-6 md:h-6" />, href: "https://www.linkedin.com/in/muhammad-rehanriaz/" },
    { name: "GitHub", icon: <FaGithub className="w-5 h-5 md:w-6 md:h-6" />, href: "https://github.com/muhammadrehan-dev" },
    { name: "Instagram", icon: <FaInstagram className="w-5 h-5 md:w-6 md:h-6" />, href: "https://instagram.com/its.rehan.riaz" },
  ];

  return (
    <Panel id="contact" index={6} bgImage="/media/contact-bg.jpg" bgPosition="bg-left md:bg-center">
      <div className="max-w-4xl flex flex-col h-full justify-center">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-6xl md:text-8xl font-black mb-4 md:mb-6"
        >
          LET&apos;S BUILD <br /> SOMETHING.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-base sm:text-xl md:text-2xl text-white/70 mb-8 md:mb-16"
        >
          Ready to start your next project or need a security audit? <br className="hidden md:block" />
          I respond within 24 hours.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-3 md:gap-6 mb-12 md:mb-24"
        >
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative overflow-hidden group border border-white/20 px-4 py-3 md:px-6 md:py-4"
            >
              <span className="absolute inset-0 bg-white origin-right scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100" />
              <span className="relative z-10 flex items-center gap-2 md:gap-3 text-white group-hover:text-black transition-colors duration-500">
                {link.icon}
                <span className="font-bold tracking-widest uppercase text-xs md:text-sm">{link.name}</span>
              </span>
            </a>
          ))}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-white/40 text-sm tracking-widest font-bold uppercase mt-auto"
        >
          Muhammad Rehan · Karachi, Pakistan
        </motion.div>
      </div>
    </Panel>
  );
}
