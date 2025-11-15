import {
  Clock,
  FolderTree,
  Layers,
  Layout,
  Plus,
  Presentation,
  TrendingUp,
} from "lucide-react";
import React from "react";
import { motion } from "motion/react";
import { GlassButton } from "./elements/GlassButton";
import { StatsCard } from "./elements/StatsCard";

interface DashboardProps {
  onNavigate: (view: string) => void;
}

const Dashboard = ({ onNavigate }: DashboardProps) => {
  const stats = [
    {
      title: "Topics",
      value: 24,
      icon: FolderTree,
      gradient: "bg-gradient-to-br from-[#4BD5FF] to-[#3B9FD9]",
    },
    {
      title: "Subtopics",
      value: 156,
      icon: Layers,
      gradient: "bg-gradient-to-br from-[#B388FF] to-[#8B5FD9]",
    },
    {
      title: "Slides",
      value: 892,
      icon: Presentation,
      gradient: "bg-gradient-to-br from-[#FF6B9D] to-[#D94B7D]",
    },
    {
      title: "Templates",
      value: 18,
      icon: Layout,
      gradient: "bg-gradient-to-br from-[#4BFFB5] to-[#3BD99F]",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      action: "Created new slide",
      item: "Introduction to AI",
      time: "5 mins ago",
      type: "create",
    },
    {
      id: 2,
      action: "Updated topic",
      item: "Machine Learning",
      time: "12 mins ago",
      type: "update",
    },
    {
      id: 3,
      action: "Generated quiz",
      item: "Python Basics",
      time: "1 hour ago",
      type: "ai",
    },
    {
      id: 4,
      action: "Added template",
      item: "Modern Card Layout",
      time: "2 hours ago",
      type: "create",
    },
    {
      id: 5,
      action: "Exported slides",
      item: "Data Science Series",
      time: "3 hours ago",
      type: "export",
    },
  ];

  return (
    <div className="flex-1 p-8">
      {/* header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <h1 className="mb-2">Welcome back! 👋</h1>
        <p className="text-[#A0A0A0]">
          Manage your content and create stunning slides with AI
        </p>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <GlassButton icon={Plus} onClick={() => onNavigate("topics")}>
          Create New Topic
        </GlassButton>{" "}
        <GlassButton
          variant="secondary"
          icon={Presentation}
          onClick={() => onNavigate("slides")}
        >
          New Slide
        </GlassButton>
        <GlassButton
          variant="secondary"
          icon={Layout}
          onClick={() => onNavigate("templates")}
        >
          Browse Templates
        </GlassButton>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            gradient={stat.gradient}
            delay={index * 0.1}
          />
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 glass-panel p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#4BD5FF]" />
              <h3>Recent Activity</h3>
            </div>
            <button className="text-sm text-[#A0A0A0] hover:text-white transition-colors">
              View All
            </button>
          </div>

          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                className="glass-card p-4 hover:bg-white/10 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        activity.type === "create"
                          ? "bg-green-400"
                          : activity.type === "update"
                          ? "bg-blue-400"
                          : activity.type === "ai"
                          ? "bg-purple-400"
                          : "bg-pink-400"
                      }`}
                    />
                    <div>
                      <p className="group-hover:text-[#4BD5FF] transition-colors">
                        {activity.action}
                      </p>
                      <p className="text-sm text-[#A0A0A0]">{activity.item}</p>
                    </div>
                  </div>
                  <span className="text-sm text-[#A0A0A0]">
                    {activity.time}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          {/* Performance */}
          <div className="glass-panel p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-[#4BFFB5]" />
              <h4>This Week</h4>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#A0A0A0]">Slides Created</span>
                  <span>47</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "78%" }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="h-full bg-gradient-to-r from-[#4BD5FF] to-[#B388FF]"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#A0A0A0]">AI Generations</span>
                  <span>23</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "45%" }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="h-full bg-gradient-to-r from-[#B388FF] to-[#FF6B9D]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Tip */}
          <div className="glass-panel p-6 border-l-4 border-[#4BD5FF]">
            <h4 className="mb-2">💡 Quick Tip</h4>
            <p className="text-sm text-[#A0A0A0]">
              Use the AI generate button to automatically create quiz questions
              from your content summaries!
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
