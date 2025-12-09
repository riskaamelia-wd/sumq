"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  Layout,
  FileText,
  HelpCircle,
  List,
  Grid,
  Image,
  Code,
  LucideIcon,
} from "lucide-react";
import { Modal } from "@/components/elements/Modal";
import { SearchInput } from "@/components/elements/SearchInput";

interface Template {
  id: string;
  name: string;
  display_name: string;
  preview_image: string;
  category: string;
  icon: string;
  default_style: {
    bgColor: string;
    decorColor: string;
  };
  schema: Record<string, string>;
}

export function TemplateBrowser() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);

  const templates: Template[] = [
    {
      id: "1",
      name: "title_slide",
      display_name: "Title Slide",
      preview_image: "title",
      category: "basic",
      icon: "FileText",
      default_style: { bgColor: "#4BD5FF", decorColor: "#B388FF" },
      schema: { title: "string", subtitle: "string" },
    },
    {
      id: "2",
      name: "content_slide",
      display_name: "Content Slide",
      preview_image: "content",
      category: "basic",
      icon: "List",
      default_style: { bgColor: "#B388FF", decorColor: "#4BD5FF" },
      schema: { title: "string", points: "array" },
    },
    {
      id: "3",
      name: "quiz_slide",
      display_name: "Quiz Question",
      preview_image: "quiz",
      category: "interactive",
      icon: "HelpCircle",
      default_style: { bgColor: "#FF6B9D", decorColor: "#4BFFB5" },
      schema: { question: "string", options: "array", correctAnswer: "number" },
    },
    {
      id: "4",
      name: "image_slide",
      display_name: "Image Slide",
      preview_image: "image",
      category: "media",
      icon: "Image",
      default_style: { bgColor: "#4BFFB5", decorColor: "#4BD5FF" },
      schema: { title: "string", imageUrl: "string", caption: "string" },
    },
    {
      id: "5",
      name: "code_slide",
      display_name: "Code Block",
      preview_image: "code",
      category: "technical",
      icon: "Code",
      default_style: { bgColor: "#151820", decorColor: "#4BD5FF" },
      schema: { title: "string", code: "string", language: "string" },
    },
    {
      id: "6",
      name: "grid_slide",
      display_name: "Grid Layout",
      preview_image: "grid",
      category: "layout",
      icon: "Grid",
      default_style: { bgColor: "#B388FF", decorColor: "#FF6B9D" },
      schema: { title: "string", items: "array" },
    },
  ];

  const categories = [
    { id: "all", name: "All Templates", count: templates.length },
    {
      id: "basic",
      name: "Basic",
      count: templates.filter((t) => t.category === "basic").length,
    },
    {
      id: "interactive",
      name: "Interactive",
      count: templates.filter((t) => t.category === "interactive").length,
    },
    {
      id: "media",
      name: "Media",
      count: templates.filter((t) => t.category === "media").length,
    },
    {
      id: "technical",
      name: "Technical",
      count: templates.filter((t) => t.category === "technical").length,
    },
    {
      id: "layout",
      name: "Layout",
      count: templates.filter((t) => t.category === "layout").length,
    },
  ];

  const iconMap: Record<string, LucideIcon> = {
    FileText,
    List,
    HelpCircle,
    Image,
    Code,
    Grid,
  };

  const filteredTemplates = templates.filter((template) => {
    const matchesCategory =
      selectedCategory === "all" || template.category === selectedCategory;
    const matchesSearch = template.display_name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex-1 !p-8">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="!mb-8"
      >
        <h1 className="!mb-2">Template Browser</h1>
        <p className="text-[#A0A0A0]">
          Choose from our collection of professionally designed templates
        </p>
      </motion.div>

      {/* Search Bar */}
      <SearchInput
        placeholder="Search templates..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Category Filters */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="!mb-8 flex gap-3 overflow-x-auto pb-2"
      >
        {categories.map((category) => (
          <motion.button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`!px-4 !py-2 rounded-xl whitespace-nowrap transition-all ${
              selectedCategory === category.id
                ? "bg-gradient-to-r from-[#4BD5FF]/20 to-[#B388FF]/20 text-white border border-[#4BD5FF]/30"
                : "glass-card text-[#A0A0A0] hover:text-white hover:bg-white/10"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.name}{" "}
            <span className="text-xs opacity-60">({category.count})</span>
          </motion.button>
        ))}
      </motion.div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template, index) => {
          const Icon = iconMap[template.icon] || Layout;

          return (
            <motion.div
              key={template.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              onClick={() => setPreviewTemplate(template)}
              className="glass-panel overflow-hidden hover:border-white/20 transition-all cursor-pointer group"
            >
              {/* Preview */}
              <div
                className="h-48 flex items-center justify-center relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${template.default_style.bgColor}20, ${template.default_style.decorColor}20)`,
                }}
              >
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    background: `radial-gradient(circle at 30% 50%, ${template.default_style.bgColor}, transparent 70%)`,
                  }}
                />
                <Icon className="w-16 h-16 text-white/40 group-hover:scale-110 transition-transform" />
              </div>

              {/* Info */}
              <div className="!p-4">
                <div className="flex items-start justify-between !mb-2">
                  <h4>{template.display_name}</h4>
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{
                      background: template.default_style.bgColor + "40",
                    }}
                  >
                    <Icon
                      className="w-4 h-4"
                      style={{ color: template.default_style.bgColor }}
                    />
                  </div>
                </div>
                <p className="text-sm text-[#A0A0A0] capitalize">
                  {template.category}
                </p>

                {/* Color dots */}
                <div className="flex gap-2 !mt-3">
                  <div
                    className="w-6 h-6 rounded-full border-2 border-white/20"
                    style={{ background: template.default_style.bgColor }}
                  />
                  <div
                    className="w-6 h-6 rounded-full border-2 border-white/20"
                    style={{ background: template.default_style.decorColor }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="glass-panel !p-12 text-center">
          <Layout className="w-16 h-16 mx-auto mb-4 text-[#A0A0A0]" />
          <p className="text-[#A0A0A0]">No templates found</p>
        </div>
      )}

      {/* Preview Modal */}
      {previewTemplate && (
        <Modal
          isOpen={!!previewTemplate}
          onClose={() => setPreviewTemplate(null)}
          title={previewTemplate.display_name}
          size="lg"
        >
          <div className="space-y-6">
            {/* Preview */}
            <div
              className="h-96 rounded-xl flex items-center justify-center relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${previewTemplate.default_style.bgColor}, ${previewTemplate.default_style.decorColor})`,
              }}
            >
              <div className="text-center text-white">
                <h2 className="mb-4">Preview Mode</h2>
                <p className="text-white/80">Slide content will appear here</p>
              </div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card p-4">
                <p className="text-sm text-[#A0A0A0] mb-1">Category</p>
                <p className="capitalize">{previewTemplate.category}</p>
              </div>
              <div className="glass-card p-4">
                <p className="text-sm text-[#A0A0A0] mb-1">Template ID</p>
                <p className="font-mono text-sm">{previewTemplate.name}</p>
              </div>
            </div>

            {/* Schema */}
            <div className="glass-card p-4">
              <p className="text-sm text-[#A0A0A0] mb-3">Available Fields</p>
              <div className="space-y-2">
                {Object.entries(previewTemplate.schema).map(([key, type]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between text-sm"
                  >
                    <span>{key}</span>
                    <span className="text-[#A0A0A0]">{String(type)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
