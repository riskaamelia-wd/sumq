"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Dashboard from "@/components/Dashboard";
import Sidebar from "@/components/elements/Sidebar";
import TopicManagement from "@/components/TopicManagement";
import { SubtopicManagement } from "@/components/SubTopicManagement";
import { TemplateBrowser } from "@/components/TemplateBrowser";
import { SlideEditor } from "@/components/SlideEditor";
import { SlideViewer } from "@/components/SlideViewer";

export default function App() {
  const [activeView, setActiveView] = useState("dashboard");

  const renderView = () => {
    switch (activeView) {
      case "dashboard":
        return <Dashboard onNavigate={setActiveView} />;
      case "topics":
        return <TopicManagement />;
      case "subtopics":
        return <SubtopicManagement />;
      case "templates":
        return <TemplateBrowser />;
      case "slides":
        return <SlideEditor onViewSlides={() => setActiveView("viewer")} />;
      case "viewer":
        return <SlideViewer />;
      default:
        return <Dashboard onNavigate={setActiveView} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0F14] flex">
      {/* Sidebar Navigation */}
      <Sidebar activeView={activeView} onViewChange={setActiveView} />

      {/* Main Content */}
      <motion.main
        key={activeView}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex-1 overflow-auto"
      >
        {renderView()}
      </motion.main>

      {/* Background Decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
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
      </div>
    </div>
  );
}
