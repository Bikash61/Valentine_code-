"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HeroSection } from "@/components/sections/HeroSection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { MemoryLane } from "@/components/sections/MemoryLane";
import { ReasonsSection } from "@/components/sections/ReasonsSection";
import { LetterSection } from "@/components/sections/LetterSection";
import { FloatingHearts } from "@/components/effects/FloatingHearts";
import { MouseParticles } from "@/components/effects/MouseParticles";
import { MusicPlayer } from "@/components/common/MusicPlayer";
import { ScrollProgress } from "@/components/common/ScrollProgress";

export default function Home() {
  const [isStarted, setIsStarted] = useState(false);
  const [showSecret, setShowSecret] = useState(false);

  return (
    <main className="min-h-screen relative">
      <ScrollProgress />
      <FloatingHearts />
      <MouseParticles />


      {/* Hero Section - Always visible initially */}
      <HeroSection onStart={() => setIsStarted(true)} />

      {/* Main Content - Revealed after start */}
      <AnimatePresence>
        {isStarted && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 1 }}
          >
            <MusicPlayer />
            
            <TimelineSection />
            <MemoryLane />
            <ReasonsSection />
            <LetterSection />

            {/* Footer */}
            <footer className="py-8 text-center text-stone-500 text-sm bg-white/30 backdrop-blur-md">
              <p>Made with ❤️ for my Valentine</p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Secret Message Trigger */}
      <div 
        className="fixed bottom-4 right-4 z-50 opacity-20 hover:opacity-100 transition-opacity cursor-help"
        onClick={() => setShowSecret(true)}
      >
        ❤️
      </div>

      {/* Secret Message Modal */}
      <AnimatePresence>
        {showSecret && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
                onClick={() => setShowSecret(false)}
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="bg-white p-8 rounded-lg max-w-md text-center shadow-2xl border-2 border-rose-500"
                >
                    <h3 className="text-2xl font-serif text-rose-600 mb-4">You found the secret!</h3>
                    <p className="text-stone-700">
                        Psst... I also bought those chocolates you like. Check the bottom drawer! 😉
                    </p>
                    <button 
                        className="mt-6 px-4 py-2 bg-rose-500 text-white rounded-full text-sm"
                        onClick={() => setShowSecret(false)}
                    >
                        Close Secret
                    </button>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}
