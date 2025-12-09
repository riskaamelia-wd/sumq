import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Save,
  Copy,
  Trash2,
  Sparkles,
  ChevronUp,
  ChevronDown,
  Eye,
  Plus,
  FolderTree,
  Layers,
  ChevronRight,
} from "lucide-react";
import { GlassButton } from "@/components/elements/GlassButton";

interface Topic {
  id: string;
  name: string;
  active: boolean;
}

interface Subtopic {
  id: string;
  topic_id: string;
  name: string;
  active: boolean;
}

interface Slide {
  id: string;
  subtopic_id: string;
  template_id: string;
  title: string;
  subtitle?: string;
  data: Record<string, string | string[]>;
  bgColor: string;
  decorColor: string;
  order_index: number;
}

interface SlideEditorProps {
  onViewSlides: () => void;
}

export function SlideEditor({ onViewSlides }: SlideEditorProps) {
  // Mock data
  const [topics] = useState<Topic[]>([
    { id: "1", name: "Artificial Intelligence", active: true },
    { id: "2", name: "Machine Learning", active: true },
    { id: "3", name: "Data Science", active: true },
  ]);

  const [subtopics] = useState<Subtopic[]>([
    { id: "1", topic_id: "1", name: "Neural Networks", active: true },
    { id: "2", topic_id: "1", name: "Deep Learning", active: true },
    { id: "3", topic_id: "1", name: "Computer Vision", active: true },
    { id: "4", topic_id: "2", name: "Supervised Learning", active: true },
    { id: "5", topic_id: "2", name: "Unsupervised Learning", active: true },
    { id: "6", topic_id: "3", name: "Data Visualization", active: true },
  ]);

  const [slides, setSlides] = useState<Slide[]>([
    {
      id: "1",
      subtopic_id: "1",
      template_id: "title_slide",
      title: "Neural Networks Introduction",
      subtitle: "Understanding the basics",
      data: {},
      bgColor: "#4BD5FF",
      decorColor: "#B388FF",
      order_index: 0,
    },
    {
      id: "2",
      subtopic_id: "1",
      template_id: "content_slide",
      title: "Key Components",
      data: {
        points: ["Neurons", "Layers", "Weights", "Activation Functions"],
      },
      bgColor: "#B388FF",
      decorColor: "#4BD5FF",
      order_index: 1,
    },
    {
      id: "3",
      subtopic_id: "1",
      template_id: "quiz_slide",
      title: "Quick Quiz",
      data: {
        question: "What is a neuron in neural networks?",
        options: [
          "Basic processing unit",
          "A layer",
          "An algorithm",
          "A dataset",
        ],
      },
      bgColor: "#FF6B9D",
      decorColor: "#4BFFB5",
      order_index: 2,
    },
    {
      id: "4",
      subtopic_id: "2",
      template_id: "title_slide",
      title: "Deep Learning Fundamentals",
      subtitle: "Going deeper into AI",
      data: {},
      bgColor: "#4BFFB5",
      decorColor: "#4BD5FF",
      order_index: 0,
    },
  ]);

  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [selectedSubtopicId, setSelectedSubtopicId] = useState<string | null>(
    null
  );
  const [editingSlideId, setEditingSlideId] = useState<string | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const templates = [
    { id: "title_slide", name: "Title Slide", fields: ["title", "subtitle"] },
    { id: "content_slide", name: "Content Slide", fields: ["title", "points"] },
    {
      id: "quiz_slide",
      name: "Quiz Question",
      fields: ["question", "options"],
    },
  ];

  const filteredSubtopics = selectedTopicId
    ? subtopics.filter((st) => st.topic_id === selectedTopicId)
    : [];

  const filteredSlides = selectedSubtopicId
    ? slides.filter((s) => s.subtopic_id === selectedSubtopicId)
    : [];

  const editingSlide = editingSlideId
    ? slides.find((s) => s.id === editingSlideId)
    : null;

  const handleTopicSelect = (topicId: string) => {
    setSelectedTopicId(topicId);
    setSelectedSubtopicId(null);
    setEditingSlideId(null);
    setIsEditorOpen(false);
  };

  const handleSubtopicSelect = (subtopicId: string) => {
    setSelectedSubtopicId(subtopicId);
    setEditingSlideId(null);
    setIsEditorOpen(false);
  };

  const handleSlideSelect = (slideId: string) => {
    setEditingSlideId(slideId);
    setIsEditorOpen(true);
  };

  const handleAddNewSlide = () => {
    if (!selectedSubtopicId) return;

    const newSlide: Slide = {
      id: Date.now().toString(),
      subtopic_id: selectedSubtopicId,
      template_id: "title_slide",
      title: "New Slide",
      subtitle: "",
      data: {},
      bgColor: "#4BD5FF",
      decorColor: "#B388FF",
      order_index: filteredSlides.length,
    };

    setSlides([...slides, newSlide]);
    setEditingSlideId(newSlide.id);
    setIsEditorOpen(true);
  };

  const updateSlide = (updates: Partial<Slide>) => {
    if (!editingSlideId) return;
    setSlides(
      slides.map((s) => (s.id === editingSlideId ? { ...s, ...updates } : s))
    );
  };

  const duplicateSlide = () => {
    if (!editingSlide) return;
    const newSlide: Slide = {
      ...editingSlide,
      id: Date.now().toString(),
      order_index: filteredSlides.length,
    };
    setSlides([...slides, newSlide]);
    setEditingSlideId(newSlide.id);
  };

  const deleteSlide = () => {
    if (!editingSlideId) return;
    const newSlides = slides.filter((s) => s.id !== editingSlideId);
    setSlides(newSlides);
    setEditingSlideId(null);
    setIsEditorOpen(false);
  };

  const moveSlide = (direction: "up" | "down") => {
    if (!editingSlide) return;
    const currentIndex = filteredSlides.findIndex(
      (s) => s.id === editingSlideId
    );
    if (
      (direction === "up" && currentIndex === 0) ||
      (direction === "down" && currentIndex === filteredSlides.length - 1)
    ) {
      return;
    }

    const targetIndex =
      direction === "up" ? currentIndex - 1 : currentIndex + 1;
    const newFilteredSlides = [...filteredSlides];
    [newFilteredSlides[currentIndex], newFilteredSlides[targetIndex]] = [
      newFilteredSlides[targetIndex],
      newFilteredSlides[currentIndex],
    ];

    newFilteredSlides.forEach((slide, index) => {
      slide.order_index = index;
    });

    setSlides(
      slides.map((s) => {
        const updated = newFilteredSlides.find((fs) => fs.id === s.id);
        return updated || s;
      })
    );
  };

  const generateQuestions = () => {
    if (!selectedSubtopicId) return;
    const newSlide: Slide = {
      id: Date.now().toString(),
      subtopic_id: selectedSubtopicId,
      template_id: "quiz_slide",
      title: "AI Generated Quiz",
      data: {
        question:
          "What is the main advantage of deep learning over traditional ML?",
        options: [
          "Automatic feature extraction",
          "Lower computational cost",
          "Simpler implementation",
          "Less data required",
        ],
      },
      bgColor: "#FF6B9D",
      decorColor: "#4BFFB5",
      order_index: filteredSlides.length,
    };
    setSlides([...slides, newSlide]);
    setEditingSlideId(newSlide.id);
    setIsEditorOpen(true);
  };

  return (
    <div className="flex-1 !p-8">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="!mb-6 flex items-center justify-between"
      >
        <div>
          <h1 className="!mb-2">Slide Editor</h1>
          <p className="text-[#A0A0A0]">
            Select topic → subtopic → create slides
          </p>
        </div>
        <div className="flex gap-3">
          {selectedSubtopicId && (
            <>
              <GlassButton
                variant="secondary"
                icon={Eye}
                onClick={onViewSlides}
              >
                Preview All
              </GlassButton>
              <GlassButton icon={Sparkles} onClick={generateQuestions}>
                AI Generate Quiz
              </GlassButton>
            </>
          )}
        </div>
      </motion.div>

      {/* Three Column Layout */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left: Topics */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="col-span-3 glass-panel !p-6"
        >
          <div className="flex items-center gap-2 !mb-4">
            <FolderTree className="w-5 h-5 text-[#4BD5FF]" />
            <h3>Topics</h3>
          </div>
          <div className="!space-y-2">
            {topics.map((topic) => (
              <motion.button
                key={topic.id}
                onClick={() => handleTopicSelect(topic.id)}
                className={`w-full text-left !px-4 !py-3 rounded-xl transition-all flex items-center justify-between ${
                  selectedTopicId === topic.id
                    ? "bg-gradient-to-r from-[#4BD5FF]/20 to-[#B388FF]/20 border border-[#4BD5FF]/30"
                    : "glass-card hover:bg-white/10"
                }`}
                whileHover={{ x: 4 }}
              >
                <div>
                  <p className="text-sm">{topic.name}</p>
                  <p className="text-xs text-[#A0A0A0] !mt-1">
                    {subtopics.filter((st) => st.topic_id === topic.id).length}{" "}
                    subtopics
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-[#A0A0A0]" />
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Middle: Subtopics */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="col-span-3 glass-panel !p-6"
        >
          <div className="flex items-center gap-2 !mb-4">
            <Layers className="w-5 h-5 text-[#B388FF]" />
            <h3>Subtopics</h3>
          </div>
          {selectedTopicId ? (
            <div className="!space-y-2">
              {filteredSubtopics.map((subtopic) => {
                const slideCount = slides.filter(
                  (s) => s.subtopic_id === subtopic.id
                ).length;
                return (
                  <motion.button
                    key={subtopic.id}
                    onClick={() => handleSubtopicSelect(subtopic.id)}
                    className={`w-full text-left !px-4 !py-3 rounded-xl transition-all flex items-center justify-between ${
                      selectedSubtopicId === subtopic.id
                        ? "bg-gradient-to-r from-[#B388FF]/20 to-[#FF6B9D]/20 border border-[#B388FF]/30"
                        : "glass-card hover:bg-white/10"
                    }`}
                    whileHover={{ x: 4 }}
                  >
                    <div>
                      <p className="text-sm">{subtopic.name}</p>
                      <p className="text-xs text-[#A0A0A0] !mt-1">
                        {slideCount} slides
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#A0A0A0]" />
                  </motion.button>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 text-[#A0A0A0] text-sm">
              ← Select a topic first
            </div>
          )}
        </motion.div>

        {/* Right: Slides */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="col-span-6"
        >
          {selectedSubtopicId ? (
            <div className="glass-panel !p-6">
              <div className="flex items-center justify-between mb-4">
                <h3>Slides ({filteredSlides.length})</h3>
                <GlassButton icon={Plus} onClick={handleAddNewSlide}>
                  Add Slide
                </GlassButton>
              </div>

              {/* Slides Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {filteredSlides.map((slide, index) => (
                  <motion.button
                    key={slide.id}
                    onClick={() => handleSlideSelect(slide.id)}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    className={`aspect-video rounded-xl overflow-hidden relative group transition-all ${
                      editingSlideId === slide.id
                        ? "ring-2 ring-[#4BD5FF] ring-offset-2 ring-offset-[#0D0F14]"
                        : "opacity-80 hover:opacity-100"
                    }`}
                    style={{
                      background: `linear-gradient(135deg, ${slide.bgColor}, ${slide.decorColor})`,
                    }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center text-white p-4 text-center">
                      <div>
                        <p className="text-sm mb-1 line-clamp-2">
                          {slide.title}
                        </p>
                        <p className="text-xs opacity-60">
                          {
                            templates.find((t) => t.id === slide.template_id)
                              ?.name
                          }
                        </p>
                      </div>
                    </div>
                    <div className="absolute bottom-2 left-2 glass-card px-2 py-1 rounded text-xs text-white">
                      #{index + 1}
                    </div>
                  </motion.button>
                ))}
              </div>

              {filteredSlides.length === 0 && (
                <div className="text-center py-12 text-[#A0A0A0]">
                  <p className="mb-4">No slides yet for this subtopic</p>
                  <GlassButton icon={Plus} onClick={handleAddNewSlide}>
                    Create First Slide
                  </GlassButton>
                </div>
              )}
            </div>
          ) : (
            <div className="glass-panel !p-6 text-center py-12 text-[#A0A0A0]">
              ← Select a subtopic to view slides
            </div>
          )}
        </motion.div>
      </div>

      {/* Editor Modal */}
      <AnimatePresence>
        {isEditorOpen && editingSlide && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditorOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />

            <div className="fixed inset-0 flex items-center justify-center z-50 !p-4">
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="glass-panel w-full max-w-7xl max-h-[90vh] overflow-y-auto !p-6"
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between !mb-6 !pb-4 border-b border-white/10">
                  <h3>Edit Slide</h3>
                  <div className="flex gap-2">
                    <motion.button
                      onClick={() => moveSlide("up")}
                      className="w-8 h-8 rounded-lg glass-card flex items-center justify-center hover:bg-white/10 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      disabled={
                        filteredSlides.findIndex(
                          (s) => s.id === editingSlideId
                        ) === 0
                      }
                    >
                      <ChevronUp className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      onClick={() => moveSlide("down")}
                      className="w-8 h-8 rounded-lg glass-card flex items-center justify-center hover:bg-white/10 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      disabled={
                        filteredSlides.findIndex(
                          (s) => s.id === editingSlideId
                        ) ===
                        filteredSlides.length - 1
                      }
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      onClick={() => setIsEditorOpen(false)}
                      className="w-8 h-8 rounded-lg glass-card flex items-center justify-center hover:bg-white/10 transition-colors ml-2"
                      whileHover={{ rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      ✕
                    </motion.button>
                  </div>
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left: Preview */}
                  <div>
                    <h4 className="!mb-4">Live Preview</h4>
                    <motion.div
                      key={editingSlide.id}
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="aspect-video rounded-2xl !p-12 relative overflow-hidden flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${editingSlide.bgColor}, ${editingSlide.decorColor})`,
                      }}
                    >
                      <div
                        className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-30"
                        style={{ background: editingSlide.decorColor }}
                      />
                      <div
                        className="absolute bottom-0 left-0 w-48 h-48 rounded-full blur-3xl opacity-30"
                        style={{ background: editingSlide.bgColor }}
                      />

                      <div className="relative z-10 text-center text-white">
                        <h3 className="!mb-4">{editingSlide.title}</h3>
                        {editingSlide.subtitle && (
                          <p className="text-white/90">
                            {editingSlide.subtitle}
                          </p>
                        )}
                        {Array.isArray(editingSlide.data.points) &&
                          editingSlide.data.points.length > 0 && (
                            <ul className="!mt-6 !space-y-2 text-left max-w-md mx-auto text-sm">
                              {editingSlide.data.points.map(
                                (point: string, index: number) => (
                                  <li
                                    key={index}
                                    className="text-white/90 flex items-center gap-2"
                                  >
                                    <div className="w-2 h-2 rounded-full bg-white/60" />
                                    {point}
                                  </li>
                                )
                              )}
                            </ul>
                          )}
                        {editingSlide.data.question && (
                          <div className="!mt-6 text-left max-w-md mx-auto text-sm">
                            <p className="!mb-4">
                              {editingSlide.data.question}
                            </p>
                            <div className="space-y-2">
                              {Array.isArray(editingSlide.data.options) &&
                                editingSlide.data.options.map(
                                  (option: string, index: number) => (
                                    <div
                                      key={index}
                                      className="glass-card !p-2 rounded-lg text-xs"
                                    >
                                      {String.fromCharCode(65 + index)}.{" "}
                                      {option}
                                    </div>
                                  )
                                )}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </div>

                  {/* Right: Form */}
                  <div>
                    <h4 className="!mb-4">Slide Properties</h4>
                    <div className="!space-y-4">
                      {/* Template Selection */}
                      <div>
                        <label className="block text-sm text-[#A0A0A0] !mb-2">
                          Template
                        </label>
                        <select
                          value={editingSlide.template_id}
                          onChange={(e) =>
                            updateSlide({ template_id: e.target.value })
                          }
                          className="w-full glass-card !px-4 !py-3 rounded-xl border border-white/10 focus:border-[#4BD5FF]/50 focus:outline-none transition-colors"
                        >
                          {templates.map((template) => (
                            <option key={template.id} value={template.id}>
                              {template.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Title */}
                      <div>
                        <label className="block text-sm text-[#A0A0A0] !mb-2">
                          Title
                        </label>
                        <input
                          type="text"
                          value={editingSlide.title}
                          onChange={(e) =>
                            updateSlide({ title: e.target.value })
                          }
                          className="w-full glass-card !px-4 !py-3 rounded-xl border border-white/10 focus:border-[#4BD5FF]/50 focus:outline-none transition-colors"
                          placeholder="Enter slide title..."
                        />
                      </div>

                      {/* Subtitle (conditional) */}
                      {editingSlide.template_id === "title_slide" && (
                        <div>
                          <label className="block text-sm text-[#A0A0A0] !mb-2">
                            Subtitle
                          </label>
                          <input
                            type="text"
                            value={editingSlide.subtitle || ""}
                            onChange={(e) =>
                              updateSlide({ subtitle: e.target.value })
                            }
                            className="w-full glass-card !px-4 !py-3 rounded-xl border border-white/10 focus:border-[#4BD5FF]/50 focus:outline-none transition-colors"
                            placeholder="Enter subtitle..."
                          />
                        </div>
                      )}

                      {/* Dynamic Data Fields */}
                      {editingSlide.template_id === "content_slide" && (
                        <div>
                          <label className="block text-sm text-[#A0A0A0] !mb-2">
                            Content Points
                          </label>
                          <textarea
                            value={
                              Array.isArray(editingSlide.data.points)
                                ? editingSlide.data.points.join("\n")
                                : ""
                            }
                            onChange={(e) =>
                              updateSlide({
                                data: {
                                  ...editingSlide.data,
                                  points: e.target.value
                                    .split("\n")
                                    .filter(Boolean),
                                },
                              })
                            }
                            className="w-full glass-card !px-4 !py-3 rounded-xl border border-white/10 focus:border-[#4BD5FF]/50 focus:outline-none transition-colors resize-none"
                            rows={5}
                            placeholder="Enter one point per line..."
                          />
                        </div>
                      )}

                      {editingSlide.template_id === "quiz_slide" && (
                        <>
                          <div>
                            <label className="block text-sm text-[#A0A0A0] !mb-2">
                              Question
                            </label>
                            <input
                              type="text"
                              value={editingSlide.data.question || ""}
                              onChange={(e) =>
                                updateSlide({
                                  data: {
                                    ...editingSlide.data,
                                    question: e.target.value,
                                  },
                                })
                              }
                              className="w-full glass-card !px-4 !py-3 rounded-xl border border-white/10 focus:border-[#4BD5FF]/50 focus:outline-none transition-colors"
                              placeholder="Enter question..."
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-[#A0A0A0] !mb-2">
                              Options
                            </label>
                            <textarea
                              value={
                                Array.isArray(editingSlide.data.options)
                                  ? editingSlide.data.options.join("\n")
                                  : ""
                              }
                              onChange={(e) =>
                                updateSlide({
                                  data: {
                                    ...editingSlide.data,
                                    options: e.target.value
                                      .split("\n")
                                      .filter(Boolean),
                                  },
                                })
                              }
                              className="w-full glass-card !px-4 !py-3 rounded-xl border border-white/10 focus:border-[#4BD5FF]/50 focus:outline-none transition-colors resize-none"
                              rows={4}
                              placeholder="Enter one option per line..."
                            />
                          </div>
                        </>
                      )}

                      {/* Color Pickers */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-[#A0A0A0] !mb-2">
                            Background
                          </label>
                          <div className="flex gap-2 items-center">
                            <input
                              type="color"
                              value={editingSlide.bgColor}
                              onChange={(e) =>
                                updateSlide({ bgColor: e.target.value })
                              }
                              className="w-12 h-12 rounded-xl border-2 border-white/20 cursor-pointer"
                            />
                            <input
                              type="text"
                              value={editingSlide.bgColor}
                              onChange={(e) =>
                                updateSlide({ bgColor: e.target.value })
                              }
                              className="flex-1 glass-card !px-3 !py-2 rounded-lg border border-white/10 focus:border-[#4BD5FF]/50 focus:outline-none transition-colors text-sm font-mono"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm text-[#A0A0A0] !mb-2">
                            Decoration
                          </label>
                          <div className="flex gap-2 items-center">
                            <input
                              type="color"
                              value={editingSlide.decorColor}
                              onChange={(e) =>
                                updateSlide({ decorColor: e.target.value })
                              }
                              className="w-12 h-12 rounded-xl border-2 border-white/20 cursor-pointer"
                            />
                            <input
                              type="text"
                              value={editingSlide.decorColor}
                              onChange={(e) =>
                                updateSlide({ decorColor: e.target.value })
                              }
                              className="flex-1 glass-card !px-3 !py-2 rounded-lg border border-white/10 focus:border-[#4BD5FF]/50 focus:outline-none transition-colors text-sm font-mono"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="!pt-4 border-t border-white/10 flex gap-3">
                        <GlassButton
                          icon={Save}
                          className="flex-1"
                          onClick={() => setIsEditorOpen(false)}
                        >
                          Save
                        </GlassButton>
                        <GlassButton
                          variant="secondary"
                          icon={Copy}
                          onClick={duplicateSlide}
                        >
                          Duplicate
                        </GlassButton>
                        <GlassButton
                          variant="danger"
                          icon={Trash2}
                          onClick={deleteSlide}
                        >
                          Delete
                        </GlassButton>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
