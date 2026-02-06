"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/content";
import { Heart } from "lucide-react";

export const ReasonsSection = () => {
  return (
    <section className="py-20 px-4 max-w-6xl mx-auto" id="reasons">
      <h2 className="text-4xl font-serif text-center text-rose-800 mb-12">Reasons I Love You</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {siteConfig.reasons.map((reason, index) => (
          <FlipCard key={index} reason={reason} index={index} />
        ))}
      </div>
    </section>
  );
};

const FlipCard = ({ reason, index }: { reason: string; index: number }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      className="h-64 cursor-pointer perspective-1000"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full relative preserve-3d transition-all duration-700 w-[100%] h-[100%]"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-rose-100 to-pink-200 rounded-2xl shadow-lg flex flex-col items-center justify-center p-6 border border-white/40">
          <Heart className="w-12 h-12 text-rose-500 fill-rose-500 mb-4 animate-pulse-slow" />
          <p className="font-serif text-rose-800 font-bold text-lg">Reason #{index + 1}</p>
          <p className="text-rose-600 text-sm mt-2">Tap to reveal</p>
        </div>

        {/* Back */}
        <div className="absolute inset-0 backface-hidden bg-white/90 rounded-2xl shadow-xl flex items-center justify-center p-6 border border-rose-100"
             style={{ transform: "rotateY(180deg)" }}>
          <p className="text-stone-700 font-medium text-center text-lg italic font-serif leading-relaxed">
            "{reason}"
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};
