import React from "react";
import { motion } from "motion/react";
import {
  FolderTree,
  Home,
  Layers,
  Layout,
  Presentation,
  Sparkles,
} from "lucide-react";

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const Sidebar = ({ activeView, onViewChange }: SidebarProps) => {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "topics", label: "Topics", icon: FolderTree },
    { id: "subtopics", label: "Subtopics", icon: Layers },
    { id: "templates", label: "Templates", icon: Layout },
    { id: "slides", label: "Slide Editor", icon: Presentation },
  ];
  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -20, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="w-64 min-h-screen glass-panel border-r border-[#2A2D3A] p-6 flex flex-col"
    >
      {/* Logo */}
      <div className="mb-8 flex items-center gap-2">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4BD5FF] to-[#B388FF] flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl bg-gradient-to-r from-[#4BD5FF] to-[#B388FF] bg-clip-text text-transparent">
            SumQ
          </h2>
          <p className="text-xs text-[#A0A0A0]">AI Content Studio</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;

          return (
            <motion.button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? "bg-gradient-to-r from-[#4BD5FF]/20 to-[#B388FF]/20 text-white border border-[#4BD5FF]/30"
                  : "text-[#A0A0A0] hover:text-white hover:bg-white/5"
              }`}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </motion.button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="pt-6 border-t border-[#2A2D3A]">
        <div className="glass-card p-4">
          <p className="text-xs text-[#A0A0A0] mb-1">Riska Amelia</p>
          <p className="text-sm">2025</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
