"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/content";
import { X, Heart, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

export const LetterSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#fb7185', '#f472b6', '#e11d48']
    });
  };

  const handleVirtualHug = () => {
    // Trigger confetti rain
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ffe4e6', '#fda4af'] // soft pinks
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ffe4e6', '#fda4af']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  return (
    <section className="py-24 px-4 min-h-screen flex flex-col items-center justify-center relative" id="letter">
      
      {/* Floating Elements Background */}
      <div className="absolute inset-0 pointer-events-none">
         <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-1/4 left-1/4">💌</motion.div>
         <motion.div animate={{ y: [0, 20, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute bottom-1/3 right-1/4">🌹</motion.div>
      </div>

      <div className="text-center mb-12">
        <h2 className="text-4xl font-serif text-rose-800 mb-6">One Last Surprise</h2>
        <p className="text-stone-600 mb-8">I wrote something special for you to keep forever.</p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            {/* Bottle Trigger */}
            <motion.button
            onClick={handleOpen}
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="group relative w-32 h-32 md:w-40 md:h-40"
            >
                <div className="absolute inset-0 bg-blue-100 rounded-full opacity-20 group-hover:opacity-40 transition-opacity blur-xl" />
                <span className="text-6xl md:text-7xl drop-shadow-lg filter">🍾</span>
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-rose-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Open Me
                </span>
            </motion.button>

             {/* Virtual Hug Trigger */}
             <motion.button
                onClick={handleVirtualHug}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center"
            >
                <div className="absolute inset-0 bg-pink-100 rounded-full opacity-20 group-hover:opacity-40 transition-opacity blur-xl" />
                <div className="bg-rose-500 text-white p-4 rounded-full shadow-lg group-hover:bg-rose-600 transition-colors">
                    <Heart size={32} fill="currentColor" />
                </div>
                 <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-rose-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Send Hug
                </span>
            </motion.button>
        </div>
      </div>

      {/* Letter Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50, rotateX: -10 }}
              animate={{ scale: 1, y: 0, rotateX: 0 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              className="bg-[#fffcf9] w-full max-w-2xl p-8 md:p-12 rounded-lg shadow-2xl relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundImage: "linear-gradient(#e5e5f7 1px, transparent 1px), linear-gradient(90deg, #e5e5f7 1px, transparent 1px)",
                backgroundSize: "20px 20px",
                backgroundBlendMode: "multiply"
              }}
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-stone-400 hover:text-stone-600"
              >
                <X />
              </button>

              <div className="font-serif leading-relaxed text-stone-800 space-y-4">
                {siteConfig.letter.body.map((paragraph, i) => (
                    <p key={i} className="text-lg md:text-xl">
                        {paragraph}
                    </p>
                ))}
                <div className="mt-8 text-right font-bold text-rose-600 text-xl">
                    {siteConfig.letter.signature}
                    <br />
                    {siteConfig.couple.names}
                </div>
              </div>

              <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-yellow-200 rounded-full opacity-20 blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-32 h-32 bg-rose-200 rounded-full opacity-20 blur-2xl pointer-events-none" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
