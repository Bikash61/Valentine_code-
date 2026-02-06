import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const GlassCard = ({ children, className, hoverEffect = true, ...props }: GlassCardProps) => {
  return (
    <motion.div
      className={cn(
        "glass-card p-6 border border-white/20 bg-white/30 backdrop-blur-md shadow-xl",
        hoverEffect && "hover:shadow-2xl hover:border-white/40 transition-shadow duration-300",
        className
      )}
      whileHover={hoverEffect ? { y: -5, scale: 1.02 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};
