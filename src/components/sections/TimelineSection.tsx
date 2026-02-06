"use client";

import { motion } from "framer-motion";
import { timelineEvents, siteConfig } from "@/lib/content";
import { GlassCard } from "../ui/GlassCard";

const messages = siteConfig.messages;

export const TimelineSection = () => {
  return (
    <section className="py-20 px-4 max-w-7xl mx-auto" id="timeline">
      <motion.h2 
        className="text-4xl font-serif text-center text-rose-800 mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Our Seven Days of Love
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {timelineEvents.map((event, index) => {
          // Map day string to message key safely
          const messageKey = event.day.split(" ")[0].toLowerCase() as keyof typeof messages;
          const message = messages[messageKey] || "I love you!";

          return (
            <GlassCard 
              key={event.id}
              className="flex flex-col items-center text-center h-64 justify-center relative group preserve-3d perspective-1000 cursor-pointer"
            >
                <div className="absolute inset-0 bg-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                
                <div className={`w-16 h-16 ${event.color} rounded-full flex items-center justify-center text-3xl shadow-lg mb-4 z-10 group-hover:scale-110 transition-transform`}>
                    {event.icon}
                </div>
                
                <h3 className="font-serif text-xl text-stone-800 font-bold mb-2 z-10">{event.day}</h3>
                <span className="text-rose-500 font-medium z-10">{event.date}</span>
                
                {/* Reveal message on hover/click */}
                <div className="absolute inset-0 bg-white/90 backdrop-blur-md rounded-2xl p-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <p className="font-serif text-rose-900 italic">{message}</p>
                </div>
            </GlassCard>
          );
        })}
      </div>
    </section>
  );
};
