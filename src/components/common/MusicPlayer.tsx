"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Music2 } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/content";

export const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(siteConfig.music.src);
    audioRef.current.loop = true;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((e) => console.log("Audio play failed:", e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.div
      className="fixed bottom-4 left-4 z-50 pointer-events-auto"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <button
        onClick={togglePlay}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-full glass-card hover:bg-white/50 transition-colors",
          isPlaying ? "bg-rose-100/50" : "bg-white/30"
        )}
      >
        <span className="relative">
          <Music2 size={18} className={isPlaying ? "animate-spin-slow" : ""} />
          {isPlaying && (
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
          )}
        </span>
        <span className="text-sm font-medium hidden sm:block">
          {isPlaying ? "Playing..." : "Our Song"}
        </span>
        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
      </button>
    </motion.div>
  );
};
