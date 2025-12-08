"use client";

import { motion } from "motion/react";

// * Star symbols for decorative elements
export const starSymbols = [
  "✺",
  "★",
  "✦",
  "✧",
  "✩",
  "✪",
  "✫",
  "✬",
  "✭",
  "✮",
  "✯",
  "✰",
  "⟶",
  "⟷",
  "⟸",
];

// * Animated Star Component with various animation patterns
export interface AnimatedStarProps {
  symbol: string;
  color: string;
  size: string;
  position: string;
  animationType: "rotate" | "scale" | "float" | "pulse" | "drift" | "twinkle";
  duration: number;
  delay?: number;
}

export const AnimatedStar = ({
  symbol,
  color,
  size,
  position,
  animationType,
  duration,
  delay = 0,
}: AnimatedStarProps) => {
  const getAnimation = () => {
    switch (animationType) {
      case "rotate":
        return {
          rotate: [0, 360],
          opacity: [0.15, 0.35, 0.15],
        };
      case "scale":
        return {
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        };
      case "float":
        return {
          y: [0, -15, 0],
          x: [0, 5, 0],
          opacity: [0.2, 0.35, 0.2],
        };
      case "pulse":
        return {
          scale: [1, 1.4, 1],
          opacity: [0.15, 0.3, 0.15],
        };
      case "drift":
        return {
          x: [0, 20, -10, 0],
          y: [0, 10, -5, 0],
          rotate: [0, 180, 360],
          opacity: [0.2, 0.3, 0.25, 0.2],
        };
      case "twinkle":
        return {
          opacity: [0.1, 0.5, 0.1, 0.4, 0.1],
          scale: [1, 1.2, 1, 1.1, 1],
        };
      default:
        return {
          opacity: [0.2, 0.3, 0.2],
        };
    }
  };

  const getEase = () => {
    if (animationType === "rotate" || animationType === "drift") {
      return "linear";
    }
    return "easeInOut";
  };

  return (
    <div className={`absolute ${position} pointer-events-none z-0`}>
      <motion.div
        animate={getAnimation()}
        transition={{
          duration,
          repeat: Infinity,
          ease: getEase(),
          delay,
        }}
        className={`${color} ${size}`}
      >
        {symbol}
      </motion.div>
    </div>
  );
};

// * Star configurations for various positions and animations
export const getStarConfigs = (): Array<{
  symbol: string;
  position: string;
  size: string;
  animationType: AnimatedStarProps["animationType"];
  duration: number;
  delay?: number;
}> => [
  // * Corner stars
  {
    symbol: starSymbols[0],
    position: "top-8 left-8",
    size: "text-3xl",
    animationType: "rotate",
    duration: 20,
  },
  {
    symbol: starSymbols[1],
    position: "top-8 right-8",
    size: "text-2xl",
    animationType: "scale",
    duration: 2,
  },
  {
    symbol: starSymbols[2],
    position: "bottom-8 left-8",
    size: "text-2xl",
    animationType: "rotate",
    duration: 25,
  },
  {
    symbol: starSymbols[3],
    position: "bottom-8 right-8",
    size: "text-3xl",
    animationType: "pulse",
    duration: 4,
  },

  // * Top edge stars
  {
    symbol: starSymbols[4],
    position: "top-16 left-1/4",
    size: "text-xl",
    animationType: "float",
    duration: 3,
    delay: 0.5,
  },
  {
    symbol: starSymbols[5],
    position: "top-20 right-1/3",
    size: "text-lg",
    animationType: "twinkle",
    duration: 2.5,
  },
  {
    symbol: starSymbols[12],
    position: "top-12 left-1/2",
    size: "text-2xl",
    animationType: "drift",
    duration: 5,
  },

  // * Left edge stars
  {
    symbol: starSymbols[6],
    position: "top-1/3 left-6",
    size: "text-xl",
    animationType: "float",
    duration: 4,
  },
  {
    symbol: starSymbols[7],
    position: "top-1/2 left-10",
    size: "text-lg",
    animationType: "pulse",
    duration: 3.5,
  },
  {
    symbol: starSymbols[8],
    position: "bottom-1/3 left-8",
    size: "text-xl",
    animationType: "rotate",
    duration: 18,
  },

  // * Right edge stars
  {
    symbol: starSymbols[9],
    position: "top-1/4 right-6",
    size: "text-lg",
    animationType: "twinkle",
    duration: 2,
  },
  {
    symbol: starSymbols[10],
    position: "top-2/3 right-10",
    size: "text-xl",
    animationType: "drift",
    duration: 6,
  },
  {
    symbol: starSymbols[11],
    position: "bottom-1/4 right-8",
    size: "text-lg",
    animationType: "float",
    duration: 3.5,
  },

  // * Bottom edge stars
  {
    symbol: starSymbols[13],
    position: "bottom-16 left-1/3",
    size: "text-xl",
    animationType: "scale",
    duration: 2.5,
  },
  {
    symbol: starSymbols[14],
    position: "bottom-20 right-1/4",
    size: "text-lg",
    animationType: "twinkle",
    duration: 3,
  },
  {
    symbol: starSymbols[0],
    position: "bottom-12 left-1/2",
    size: "text-2xl",
    animationType: "rotate",
    duration: 22,
  },

  // * Center area stars (scattered)
  {
    symbol: starSymbols[1],
    position: "top-1/4 left-1/3",
    size: "text-sm",
    animationType: "pulse",
    duration: 2.2,
  },
  {
    symbol: starSymbols[2],
    position: "top-1/3 right-1/4",
    size: "text-sm",
    animationType: "float",
    duration: 3.8,
  },
  {
    symbol: starSymbols[3],
    position: "top-1/2 left-1/4",
    size: "text-xs",
    animationType: "twinkle",
    duration: 2.8,
  },
  {
    symbol: starSymbols[4],
    position: "top-2/3 right-1/3",
    size: "text-sm",
    animationType: "drift",
    duration: 4.5,
  },
  {
    symbol: starSymbols[5],
    position: "bottom-1/3 left-1/3",
    size: "text-xs",
    animationType: "pulse",
    duration: 3.2,
  },
  {
    symbol: starSymbols[6],
    position: "bottom-1/4 right-1/4",
    size: "text-sm",
    animationType: "float",
    duration: 3.6,
  },
];
