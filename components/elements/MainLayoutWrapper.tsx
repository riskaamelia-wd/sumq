"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/elements/Sidebar";
import { viewGradients, viewColors } from "@/lib/viewConfig";
import {
  AnimatedStar,
  getStarConfigs,
} from "@/components/elements/AnimatedStars";

interface MainLayoutProps {
  children: React.ReactNode;
  /**
   * * If true, only shows sidebar and decorations on root page ("/")
   * * If false, always shows sidebar and decorations (for (main) route group)
   */
  onlyOnRoot?: boolean;
}

export default function MainLayout({
  children,
  onlyOnRoot = false,
}: MainLayoutProps) {
  const pathname = usePathname();

  // * Get current view from pathname
  const getActiveView = () => {
    if (pathname.startsWith("/dashboard")) return "dashboard";
    if (pathname.startsWith("/topics")) return "topics";
    if (pathname.startsWith("/subtopics")) return "subtopics";
    if (pathname.startsWith("/templates")) return "templates";
    if (pathname.startsWith("/slides")) return "slides";
    if (pathname.startsWith("/viewer")) return "viewer";
    if (pathname.startsWith("/photos")) return "photos";
    return "dashboard";
  };

  // * Only show sidebar and decorations on root page if onlyOnRoot is true
  if (onlyOnRoot && pathname !== "/") {
    return <>{children}</>;
  }

  const activeView = getActiveView();
  const currentGradient =
    viewGradients[activeView] ||
    "from-blue-950/30 via-indigo-950/20 to-transparent";
  const currentColor = viewColors[activeView] || "text-[#4BD5FF]";

  // * Star configurations for various positions and animations
  const starConfigs = getStarConfigs();

  return (
    <div className="min-h-screen bg-[#0D0F14] flex relative overflow-hidden">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content with Template-Inspired Design */}
      <motion.main
        key={activeView}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex-1 overflow-auto relative"
      >
        {/* * Template-style gradient background wrapper */}
        <div
          className={`min-h-full bg-gradient-to-br ${currentGradient} transition-all duration-500 relative`}
        >
          {/* * Grid background pattern (inspired by template design) */}
          <div
            className="absolute inset-0 opacity-[0.15] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(75, 213, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(75, 213, 255, 0.1) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />

          {/* * Animated Stars Layer */}
          <div className="absolute inset-0 pointer-events-none z-10">
            {starConfigs.map((config, index) => (
              <AnimatedStar
                key={`star-${index}`}
                symbol={config.symbol}
                color={currentColor}
                size={config.size}
                position={config.position}
                animationType={config.animationType}
                duration={config.duration}
                delay={config.delay}
              />
            ))}
          </div>

          {/* * Content wrapper with glass effect */}
          <div className="relative min-h-screen z-20">{children}</div>
        </div>
      </motion.main>

      {/* * Enhanced Background Decorations (template-inspired) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* * Primary gradient orb */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-1/2 -right-1/2 w-full h-full rounded-full bg-gradient-to-br from-[#4BD5FF]/20 to-transparent blur-3xl"
        />
        {/* * Secondary gradient orb */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute -bottom-1/2 -left-1/2 w-full h-full rounded-full bg-gradient-to-tr from-[#B388FF]/20 to-transparent blur-3xl"
        />
        {/* * Additional accent orb */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
          className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full bg-gradient-to-r from-[#4BFFB5]/15 to-transparent blur-3xl"
        />
      </div>
    </div>
  );
}
