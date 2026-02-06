"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1.5 bg-rose-500 origin-left z-[100]"
      style={{ scaleX }}
    >
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
            <div className="relative">
                 <div className="absolute inset-0 bg-rose-400 blur-sm rounded-full animate-pulse" />
                 <span className="text-xl">💖</span>
            </div>
        </div>
    </motion.div>
  );
};
