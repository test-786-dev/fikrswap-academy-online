
import { motion } from "framer-motion";

interface FloralPatternProps {
  className?: string;
  animate?: boolean;
}

export function FloralPattern({ className = "", animate = true }: FloralPatternProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {animate ? (
        <motion.div 
          className="bg-pattern w-full h-full opacity-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 1 }}
        />
      ) : (
        <div className="bg-pattern w-full h-full opacity-20" />
      )}
    </div>
  );
}
