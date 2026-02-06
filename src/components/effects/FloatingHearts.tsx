"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const FloatingHearts = () => {
  const [hearts, setHearts] = useState<{ id: number; x: number; delay: number; scale: number }[]>([]);

  useEffect(() => {
    // Generate static hearts on client side only to avoid hydration mismatch
    const newHearts = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      delay: Math.random() * 10,
      scale: Math.random() * 0.5 + 0.5,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute bottom-0 text-red-300 opacity-30"
          initial={{ y: 100, x: `${heart.x}vw`, rotate: 0 }}
          animate={{
            y: "-120vh",
            rotate: 360,
            x: [`${heart.x}vw`, `${heart.x + (heart.id % 2 === 0 ? 5 : -5)}vw`],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            delay: heart.delay,
            ease: "linear",
          }}
          style={{
            fontSize: `${heart.scale * 2}rem`,
            left: 0,
          }}

        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
};
