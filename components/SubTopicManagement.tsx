import { useState } from "react";
import { motion } from "motion/react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { GlassButton } from "@/components/elements/GlassButton";
import { Modal } from "@/components/elements/Modal";

interface Subtopic {
  id: string;
  topic_id: string;
  name: string;
  active: boolean;
}

export function SubtopicManagement() {
  const topics = [
    { id: "1", name: "Artificial Intelligence" },
    { id: "2", name: "Machine Learning" },
    { id: "3", name: "Data Science" },
  ];

  const [selectedTopic, setSelectedTopic] = useState(topics[0].id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubtopic, setEditingSubtopic] = useState<Subtopic | null>(null);
  const [formData, setFormData] = useState({ name: "", active: true });

  const [subtopics, setSubtopics] = useState<Subtopic[]>([
    { id: "1", topic_id: "1", name: "Neural Networks", active: true },
    { id: "2", topic_id: "1", name: "Deep Learning", active: true },
    {
      id: "3",
      topic_id: "1",
      name: "Natural Language Processing",
      active: true,
    },
    { id: "4", topic_id: "1", name: "Computer Vision", active: false },
    { id: "5", topic_id: "2", name: "Supervised Learning", active: true },
    { id: "6", topic_id: "2", name: "Unsupervised Learning", active: true },
    { id: "7", topic_id: "3", name: "Data Visualization", active: true },
    { id: "8", topic_id: "3", name: "Statistical Analysis", active: true },
  ]);

  const filteredSubtopics = subtopics.filter(
    (st) => st.topic_id === selectedTopic
  );

  const handleOpenModal = (subtopic?: Subtopic) => {
    if (subtopic) {
      setEditingSubtopic(subtopic);
      setFormData({ name: subtopic.name, active: subtopic.active });
    } else {
      setEditingSubtopic(null);
      setFormData({ name: "", active: true });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSubtopic) {
      setSubtopics(
        subtopics.map((st) =>
          st.id === editingSubtopic.id ? { ...st, ...formData } : st
        )
      );
    } else {
      const newSubtopic: Subtopic = {
        id: Date.now().toString(),
        topic_id: selectedTopic,
        name: formData.name,
        active: formData.active,
      };
      setSubtopics([...subtopics, newSubtopic]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setSubtopics(subtopics.filter((st) => st.id !== id));
  };

  const toggleActive = (id: string) => {
    setSubtopics(
      subtopics.map((st) => (st.id === id ? { ...st, active: !st.active } : st))
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
        <h1 className="mb-2">Subtopic Management</h1>
        <p className="text-[#A0A0A0]">Organize subtopics within each topic</p>
      </motion.div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Topic Selection */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-4 glass-panel p-6"
        >
          <h3 className="mb-4">Select Topic</h3>
          <div className="space-y-2">
            {topics.map((topic) => (
              <motion.button
                key={topic.id}
                onClick={() => setSelectedTopic(topic.id)}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                  selectedTopic === topic.id
                    ? "bg-gradient-to-r from-[#4BD5FF]/20 to-[#B388FF]/20 border border-[#4BD5FF]/30"
                    : "glass-card hover:bg-white/10"
                }`}
                whileHover={{ x: 4 }}
              >
                <p>{topic.name}</p>
                <p className="text-xs text-[#A0A0A0] mt-1">
                  {subtopics.filter((st) => st.topic_id === topic.id).length}{" "}
                  subtopics
                </p>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Right: Subtopics Table */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-8"
        >
          {/* Action Bar */}
          <div className="mb-4 flex justify-between items-center">
            <h3>Subtopics ({filteredSubtopics.length})</h3>
            <GlassButton icon={Plus} onClick={() => handleOpenModal()}>
              Add Subtopic
            </GlassButton>
          </div>

          {/* Subtopics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSubtopics.map((subtopic, index) => (
              <motion.div
                key={subtopic.id}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="glass-panel p-4 hover:border-white/20 transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="mb-1">{subtopic.name}</h4>
                    <button
                      onClick={() => toggleActive(subtopic.id)}
                      className={`px-2 py-1 rounded-full text-xs border transition-all ${
                        subtopic.active
                          ? "bg-green-500/20 text-green-400 border-green-500/30"
                          : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                      }`}
                    >
                      {subtopic.active ? "Active" : "Inactive"}
                    </button>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <motion.button
                      onClick={() => handleOpenModal(subtopic)}
                      className="w-8 h-8 rounded-lg glass-card flex items-center justify-center hover:bg-[#4BD5FF]/20 hover:text-[#4BD5FF] transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Edit2 className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      onClick={() => handleDelete(subtopic.id)}
                      className="w-8 h-8 rounded-lg glass-card flex items-center justify-center hover:bg-[#FF6B9D]/20 hover:text-[#FF6B9D] transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredSubtopics.length === 0 && (
            <div className="glass-panel p-12 text-center">
              <p className="text-[#A0A0A0]">
                No subtopics found for this topic
              </p>
              <GlassButton
                className="mt-4"
                icon={Plus}
                onClick={() => handleOpenModal()}
              >
                Create First Subtopic
              </GlassButton>
            </div>
          )}
        </motion.div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingSubtopic ? "Edit Subtopic" : "Add New Subtopic"}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm text-[#A0A0A0] mb-2">
              Subtopic Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full glass-card px-4 py-3 rounded-xl border border-white/10 focus:border-[#4BD5FF]/50 focus:outline-none transition-colors"
              placeholder="Enter subtopic name..."
              required
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="subtopic-active"
              checked={formData.active}
              onChange={(e) =>
                setFormData({ ...formData, active: e.target.checked })
              }
              className="w-5 h-5 rounded border-white/20 bg-white/10"
            />
            <label htmlFor="subtopic-active" className="text-sm">
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
              {editingSubtopic ? "Update" : "Create"}
            </GlassButton>
          </div>
        </form>
      </Modal>
    </div>
  );
}
