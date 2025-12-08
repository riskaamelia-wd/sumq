"use client";

import { motion } from "motion/react";

interface ShootingStarProps {
  delay?: number;
  duration?: number;
  startX?: string;
  startY?: string;
  endX?: string;
  endY?: string;
}

export const ShootingStar = ({
  delay = 0,
  duration = 2,
  startX = "0%",
  startY = "0%",
  endX = "100%",
  endY = "100%",
}: ShootingStarProps) => {
  return (
    <motion.div
      className="absolute pointer-events-none z-[5]"
      initial={{
        x: startX,
        y: startY,
        opacity: 0,
      }}
      animate={{
        x: endX,
        y: endY,
        opacity: [0, 1, 0.8, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 5 + 3,
        ease: "easeOut",
      }}
    >
      <div className="relative">
        {/* * Main star trail */}
        <div className="absolute w-1 h-20 bg-gradient-to-b from-white via-cyan-300 to-transparent rounded-full blur-sm" />
        {/* * Bright core */}
        <div className="absolute w-2 h-2 bg-white rounded-full blur-md -top-1 -left-0.5" />
        {/* * Glow effect */}
        <div className="absolute w-4 h-4 bg-cyan-400/50 rounded-full blur-lg -top-2 -left-1.5" />
      </div>
    </motion.div>
  );
};

// * Generate multiple shooting stars with random configurations
export const generateShootingStars = (count: number = 3) => {
  const stars = [];
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * 60 + 15; // * Angle between 15-75 degrees
    const startX = Math.random() * 100;
    const startY = -10 - Math.random() * 20;
    const distance = 120 + Math.random() * 80;

    stars.push({
      delay: Math.random() * 8,
      duration: 1.5 + Math.random() * 1.5,
      startX: `${startX}%`,
      startY: `${startY}%`,
      endX: `${startX + Math.cos((angle * Math.PI) / 180) * distance}%`,
      endY: `${startY + Math.sin((angle * Math.PI) / 180) * distance}%`,
    });
  }
  return stars;
};
