"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/content";
import { Countdown } from "../common/Countdown";
import Image from "next/image";
import img1 from "@/images/image1.jpeg"; // Intro background

export const HeroSection = ({ onStart }: { onStart: () => void }) => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden text-center px-4">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image 
            src={img1} 
            alt="Background" 
            fill 
            className="object-cover opacity-20 blur-sm scale-105" 
            priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/40 to-white/90" />
      </div>

      {/* Floating Blobs Decor */}
      <motion.div 
        className="absolute top-20 left-10 w-32 h-32 bg-rose-400 rounded-full mix-blend-multiply filter blur-xl opacity-60" 
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-32 h-32 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-60"
        animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <motion.h1 
        className="font-serif text-5xl md:text-7xl text-rose-800 mb-6 relative z-10 drop-shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {siteConfig.intro.title}
      </motion.h1>

      <motion.p 
        className="text-lg md:text-xl text-stone-700 mb-8 max-w-lg relative z-10 font-sans font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        {siteConfig.intro.subtitle}
      </motion.p>


      <motion.button
        onClick={onStart}
        className="bg-gradient-to-r from-rose-400 to-pink-500 text-white px-8 py-3 rounded-full text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 relative z-20 group"
        whileTap={{ scale: 0.95 }}
      >
        <span className="flex items-center gap-2">
          {siteConfig.intro.buttonText}
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </span>
      </motion.button>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="mt-12 relative z-10"
      >
        <Countdown />
      </motion.div>
    </section>
  );
};
