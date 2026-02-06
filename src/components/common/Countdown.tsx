"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Current year's Valentine's Day
    const currentYear = new Date().getFullYear();
    const targetDate = new Date(`${currentYear}-02-14T00:00:00`);

    // If passed, aim for next year (or keep at 0 if you prefer showing "It's today!")
    if (new Date() > targetDate) {
        // Just show all zeros if passed for the week context, or next year
        // For this specific request (Feb 2025 context), let's just stick to the calculation.
    }

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center mx-2">
      <motion.div
        key={value}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-16 h-16 sm:w-20 sm:h-20 bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-rose-200 shadow-lg text-rose-600 font-bold text-2xl sm:text-3xl relative"
      >
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-rose-300">♥</div>
        {value}
      </motion.div>
      <span className="text-xs sm:text-sm font-medium text-rose-700 mt-2 uppercase tracking-wide">{label}</span>
    </div>
  );

  return (
    <div className="flex justify-center flex-wrap pt-10 pb-4">
      <TimeUnit value={timeLeft.days} label="Days" />
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <TimeUnit value={timeLeft.minutes} label="Mins" />
      <TimeUnit value={timeLeft.seconds} label="Secs" />
    </div>
  );
};
