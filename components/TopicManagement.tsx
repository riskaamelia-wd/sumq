"use client";

import React, { useState } from "react";
import { GlassButton } from "./elements/GlassButton";
import { Edit2, Trash2, Search, Plus } from "lucide-react";
import { Modal } from "@/components/elements/Modal";
import { motion } from "motion/react";

interface Topic {
  id: string;
  name: string;
  active: boolean;
  created_at: string;
}

const TopicManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTopic, setEditingTopic] = useState<Topic | null>(null);
  const [formData, setFormData] = useState<Topic>({
    id: "",
    name: "",
    active: true,
    created_at: new Date().toISOString().split("T")[0],
  });

  const [topics, setTopics] = useState<Topic[]>([
    {
      id: "1",
      name: "Artificial Intelligence",
      active: true,
      created_at: "2025-01-15",
    },
    {
      id: "2",
      name: "Machine Learning",
      active: true,
      created_at: "2025-01-14",
    },
    { id: "3", name: "Data Science", active: true, created_at: "2025-01-13" },
    {
      id: "4",
      name: "Python Programming",
      active: true,
      created_at: "2025-01-12",
    },
    {
      id: "5",
      name: "Web Development",
      active: false,
      created_at: "2025-01-10",
    },
    {
      id: "6",
      name: "Cloud Computing",
      active: true,
      created_at: "2025-01-09",
    },
  ]);

  const filteredTopics = topics.filter((topic) =>
    topic.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenModal = (topic?: Topic) => {
    if (topic) {
      setEditingTopic(topic);
      setFormData({
        id: topic.id,
        name: topic.name,
        active: topic.active,
        created_at: topic.created_at,
      });
    } else {
      setEditingTopic(null);
      setFormData({
        id: "",
        name: "",
        active: true,
        created_at: new Date().toISOString().split("T")[0],
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTopic) {
      setTopics(
        topics.map((t) =>
          t.id === editingTopic.id ? { ...t, ...formData } : t
        )
      );
    } else {
      const newTopic: Topic = {
        id: Date.now().toString(),
        name: formData.name,
        active: formData.active,
        created_at: new Date().toISOString().split("T")[0],
      };
      setTopics([newTopic, ...topics]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setTopics(topics.filter((t) => t.id !== id));
  };

  const toggleActive = (id: string) => {
    setTopics(
      topics.map((t) => (t.id === id ? { ...t, active: !t.active } : t))
    );
  };

  return (
    <div className="flex-1 p-8">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8"
      >
        <h1 className="mb-2">Topic Management</h1>
        <p className="text-[#A0A0A0]">
          Organize and manage your content topics
        </p>
      </motion.div>

      {/* Actions Bar */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-6 flex flex-col sm:flex-row gap-4 justify-between"
      >
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A0A0A0]" />
          <input
            type="text"
            placeholder="Search topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full glass-card pl-12 pr-4 py-3 rounded-xl border border-white/10 focus:border-[#4BD5FF]/50 focus:outline-none transition-colors"
          />
        </div>

        {/* Add Button */}
        <GlassButton icon={Plus} onClick={() => handleOpenModal()}>
          Add Topic
        </GlassButton>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="glass-panel overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-[#A0A0A0]">Name</th>
                <th className="text-left p-4 text-[#A0A0A0]">Status</th>
                <th className="text-left p-4 text-[#A0A0A0]">Created</th>
                <th className="text-right p-4 text-[#A0A0A0]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTopics.map((topic, index) => (
                <motion.tr
                  key={topic.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="p-4">
                    <span className="text-white">{topic.name}</span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => toggleActive(topic.id)}
                      className={`px-3 py-1 rounded-full text-xs border transition-all ${
                        topic.active
                          ? "bg-green-500/20 text-green-400 border-green-500/30"
                          : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                      }`}
                    >
                      {topic.active ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="p-4 text-[#A0A0A0]">
                    {new Date(topic.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <motion.button
                        onClick={() => handleOpenModal(topic)}
                        className="w-8 h-8 rounded-lg glass-card flex items-center justify-center hover:bg-[#4BD5FF]/20 hover:text-[#4BD5FF] transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Edit2 className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        onClick={() => handleDelete(topic.id)}
                        className="w-8 h-8 rounded-lg glass-card flex items-center justify-center hover:bg-[#FF6B9D]/20 hover:text-[#FF6B9D] transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTopics.length === 0 && (
          <div className="p-12 text-center text-[#A0A0A0]">
            <p>No topics found</p>
          </div>
        )}
      </motion.div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingTopic ? "Edit Topic" : "Add New Topic"}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm text-[#A0A0A0] mb-2">
              Topic Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full glass-card px-4 py-3 rounded-xl border border-white/10 focus:border-[#4BD5FF]/50 focus:outline-none transition-colors"
              placeholder="Enter topic name..."
              required
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="active"
              checked={formData.active}
              onChange={(e) =>
                setFormData({ ...formData, active: e.target.checked })
              }
              className="w-5 h-5 rounded border-white/20 bg-white/10"
            />
            <label htmlFor="active" className="text-sm">
              Active Status
            </label>
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t border-white/10">
            <GlassButton
              variant="secondary"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </GlassButton>
            <GlassButton type="submit">
              {editingTopic ? "Update" : "Create"}
            </GlassButton>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default TopicManagement;
