"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import {
  FolderTree,
  Home,
  Layers,
  Layout,
  Presentation,
  Sparkles,
  Image,
} from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, href: "/dashboard" },
    { id: "topics", label: "Topics", icon: FolderTree, href: "/topics" },
    { id: "subtopics", label: "Subtopics", icon: Layers, href: "/subtopics" },
    { id: "templates", label: "Templates", icon: Layout, href: "/templates" },
    {
      id: "slides",
      label: "Slide Editor",
      icon: Presentation,
      href: "/slides",
    },
    { id: "photos", label: "Photos", icon: Image, href: "/photos" },
  ];

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -20, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="w-64 h-screen glass-panel border-r border-[#2A2D3A] !p-6 flex flex-col"
    >
      {/* Logo */}
      <Link href="/dashboard" className="!mb-8 flex items-center gap-2">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4BD5FF] to-[#B388FF] flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl bg-gradient-to-r from-[#4BD5FF] to-[#B388FF] bg-clip-text text-transparent">
            SumQ
          </h2>
          <p className="text-xs text-[#A0A0A0]">AI Content Studio</p>
        </div>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 !space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          // * Check if current path matches the item href
          const isActive =
            pathname === item.href ||
            (item.href === "/dashboard" && pathname === "/");

          return (
            <Link key={item.id} href={item.href}>
              <motion.div
                className={`w-full flex items-center gap-3 !px-4 !py-3 rounded-xl transition-all cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-[#4BD5FF]/20 to-[#B388FF]/20 text-white border border-[#4BD5FF]/30"
                    : "text-[#A0A0A0] hover:text-white hover:bg-white/5"
                }`}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="!pt-6 border-t border-[#2A2D3A]">
        <div className="glass-card !p-4">
          <p className="text-xs text-[#A0A0A0] mb-1">Riska Amelia</p>
          <p className="text-sm">2025</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
