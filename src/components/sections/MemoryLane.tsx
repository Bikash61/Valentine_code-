"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/content";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

// Import images directly
import img1 from "@/images/image1.jpeg";
import img2 from "@/images/image2.jpeg";
import img3 from "@/images/image3.jpeg";
import img4 from "@/images/image4.jpeg";
import img5 from "@/images/image5.jpeg";

const MEMORIES = [
  { id: 1, src: img1, caption: "Where it all began", date: "2025" },
  { id: 2, src: img2, caption: "Adventures with you", date: "2025" },
  { id: 3, src: img3, caption: "My favorite smile", date: "2024" },
  { id: 4, src: img4, caption: "Simple moments", date: "2024" },
  { id: 5, src: img5, caption: "Growing together", date: "2025" },
];

export const MemoryLane = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [5, -5]);

  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <section className="py-20 relative overflow-hidden bg-rose-50/30" id="memories" ref={containerRef}>
      
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div style={{ y, rotate }} className="absolute top-10 right-10 w-64 h-64 bg-rose-200/20 rounded-full blur-3xl" />
        <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }} className="absolute bottom-10 left-10 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl" />
      </div>

      {/* Journey Timeline */}
      <div className="max-w-4xl mx-auto px-4 mb-24 relative z-10">
        <h2 className="text-5xl font-serif text-center text-rose-800 mb-16 drop-shadow-sm">Our Journey</h2>
        <div className="relative border-l-2 border-rose-200 ml-4 md:ml-0 md:pl-0 md:border-none space-y-12">
          {siteConfig.journey.map((milestone, index) => (
            <TimelineItem key={index} milestone={milestone} index={index} />
          ))}
        </div>
      </div>

      {/* Dynamic Photo Gallery */}
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <h2 className="text-4xl font-serif text-center text-rose-800 mb-12">Captured Moments</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-[300px] lg:auto-rows-[400px]">
             {MEMORIES.map((memory, i) => (
                <motion.div 
                    key={memory.id}
                    layoutId={`card-container-${memory.id}`}
                    onClick={() => setSelectedId(memory.id)}
                    className={cn(
                        "relative group rounded-3xl overflow-hidden shadow-xl cursor-pointer bg-white",
                        i === 0 || i === 3 ? "md:col-span-2" : "md:col-span-1"
                    )}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    whileHover={{ scale: 1.02, rotate: i % 2 === 0 ? 1 : -1 }}
                >
                    <motion.div layoutId={`card-image-container-${memory.id}`} className="relative w-full h-full">
                       <Image 
                            src={memory.src}
                            alt={memory.caption}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            placeholder="blur"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-rose-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <motion.div 
                            className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                        >
                            <p className="text-white font-serif text-2xl">{memory.date}</p>
                            <p className="text-rose-100 font-medium">{memory.caption}</p>
                        </motion.div>
                    </motion.div>
                </motion.div>
            ))}
        </div>
      </div>

      {/* Expanded View Modal */}
      <AnimatePresence>
        {selectedId && (
            <motion.div 
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedId(null)}
            >
                {MEMORIES.find(m => m.id === selectedId) && (
                    <motion.div 
                        layoutId={`card-container-${selectedId}`}
                        className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] shadow-2xl relative flex flex-col md:flex-row"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <motion.div layoutId={`card-image-container-${selectedId}`} className="relative w-full md:w-2/3 h-[50vh] md:h-auto min-h-[400px]">
                             <Image 
                                src={MEMORIES.find(m => m.id === selectedId)!.src}
                                alt="Memory"
                                fill
                                className="object-cover"
                            />
                        </motion.div>
                        
                        <div className="p-8 md:w-1/3 flex flex-col justify-center bg-rose-50/50">
                            <motion.h3 
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-3xl font-serif text-rose-800 mb-4"
                            >
                                {MEMORIES.find(m => m.id === selectedId)!.caption}
                            </motion.h3>
                            <motion.p 
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-stone-600 leading-relaxed"
                            >
                                Every moment with you is a treasure I keep locked in my heart. This day was special, just like you.
                            </motion.p>
                            <div className="mt-8 flex gap-2">
                                <span className="px-3 py-1 bg-rose-200 text-rose-800 rounded-full text-sm">Love</span>
                                <span className="px-3 py-1 bg-rose-200 text-rose-800 rounded-full text-sm">Memories</span>
                            </div>
                        </div>

                        <button 
                            onClick={() => setSelectedId(null)}
                            className="absolute top-4 right-4 bg-white/50 hover:bg-white p-2 rounded-full transition-colors z-10"
                        >
                            <X className="text-rose-800" />
                        </button>
                    </motion.div>
                )}
            </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const TimelineItem = ({ milestone, index }: { milestone: any; index: number }) => {
  const isEven = index % 2 === 0;

  return (
    <div className={cn(
      "md:flex items-center justify-between w-full relative",
      isEven ? "flex-row-reverse" : ""
    )}>
       {/* Dot */}
       <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-rose-500 border-4 border-white shadow-md z-10" />
       
       {/* Content */}
       <motion.div 
         className={cn("w-full md:w-[45%] pl-8 md:pl-0", isEven ? "md:text-left" : "md:text-right")}
         initial={{ opacity: 0, x: isEven ? 50 : -50 }}
         whileInView={{ opacity: 1, x: 0 }}
         viewport={{ once: true }}
       >
          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-rose-100 hover:shadow-md transition-shadow">
             <span className="text-rose-500 font-bold block mb-1">{milestone.year}</span>
             <h3 className="text-xl font-serif text-stone-800 font-bold mb-2">{milestone.title}</h3>
             <p className="text-stone-600">{milestone.description}</p>
          </div>
       </motion.div>
       
       <div className="hidden md:block w-full md:w-[45%]" /> 
    </div>
  );
};

