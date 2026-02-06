"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

export const MouseParticles = () => {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Only fire occasionally to prevent performance issues
      if (Math.random() > 0.9) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        confetti({
          particleCount: 1,
          startVelocity: 0,
          ticks: 100,
          origin: { x, y },
          colors: ["#fda4af", "#e11d48", "#ffffff"],
          shapes: ["circle", "square"], // simplified shapes for cursor
          gravity: 0.5,
          scalar: 0.5,
          drift: 0,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return null;
};
