import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Download, Share2, X } from "lucide-react";
import { GlassButton } from "@/components/elements/GlassButton";

interface Slide {
  id: string;
  template_id: string;
  title: string;
  subtitle?: string;
  data: Record<string, string | string[]>;
  bgColor: string;
  decorColor: string;
  order_index: number;
}

export function SlideViewer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const slides: Slide[] = [
    {
      id: "1",
      template_id: "title_slide",
      title: "Introduction to AI",
      subtitle: "A comprehensive overview of artificial intelligence",
      data: {},
      bgColor: "#4BD5FF",
      decorColor: "#B388FF",
      order_index: 0,
    },
    {
      id: "2",
      template_id: "content_slide",
      title: "Key Concepts",
      data: {
        points: [
          "Machine Learning algorithms",
          "Neural Networks architecture",
          "Deep Learning frameworks",
          "Natural Language Processing",
        ],
      },
      bgColor: "#B388FF",
      decorColor: "#4BD5FF",
      order_index: 1,
    },
    {
      id: "3",
      template_id: "quiz_slide",
      title: "Quiz Time!",
      data: {
        question: "What is the primary goal of supervised learning?",
        options: [
          "To classify data into predefined categories",
          "To find hidden patterns in data",
          "To reduce dimensionality",
          "To generate new data",
        ],
      },
      bgColor: "#FF6B9D",
      decorColor: "#4BFFB5",
      order_index: 2,
    },
    {
      id: "4",
      template_id: "title_slide",
      title: "Thank You!",
      subtitle: "Questions?",
      data: {},
      bgColor: "#4BFFB5",
      decorColor: "#4BD5FF",
      order_index: 3,
    },
  ];

  const currentSlide = slides[currentIndex];

  const nextSlide = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleExport = () => {
    alert(
      "Export functionality coming soon! Slides will be saved as social media content."
    );
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Header (when not fullscreen) */}
      {!isFullscreen && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="p-8 pb-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="mb-2">Slide Viewer</h1>
              <p className="text-[#A0A0A0]">
                Preview your slides in presentation mode
              </p>
            </div>
            <div className="flex gap-3">
              <GlassButton variant="secondary" icon={Share2}>
                Share
              </GlassButton>
              <GlassButton icon={Download} onClick={handleExport}>
                Export
              </GlassButton>
            </div>
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <div className={`flex-1 ${isFullscreen ? "p-0" : "p-8 pt-4"}`}>
        <div className="h-full flex flex-col">
          {/* Slide Display */}
          <div className="flex-1 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.id}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className={`w-full h-full rounded-2xl relative overflow-hidden flex items-center justify-center ${
                  isFullscreen ? "rounded-none" : ""
                }`}
                style={{
                  background: `linear-gradient(135deg, ${currentSlide.bgColor}, ${currentSlide.decorColor})`,
                  boxShadow: isFullscreen
                    ? "none"
                    : "0 0 60px rgba(75, 213, 255, 0.2)",
                }}
              >
                {/* Decorative elements */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.3 }}
                  className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl"
                  style={{ background: currentSlide.decorColor }}
                />
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.3 }}
                  transition={{ delay: 0.1 }}
                  className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-3xl"
                  style={{ background: currentSlide.bgColor }}
                />

                {/* Content */}
                <div className="relative z-10 text-center text-white max-w-4xl px-8">
                  <motion.h1
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mb-6"
                  >
                    {currentSlide.title}
                  </motion.h1>

                  {currentSlide.subtitle && (
                    <motion.p
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-2xl text-white/90"
                    >
                      {currentSlide.subtitle}
                    </motion.p>
                  )}

                  {currentSlide.data.points && (
                    <motion.ul
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="mt-8 space-y-4 text-left max-w-2xl mx-auto text-xl"
                    >
                      {Array.isArray(currentSlide.data.points) &&
                        currentSlide.data.points.length > 0 &&
                        currentSlide.data.points.map(
                          (point: string, index: number) => (
                            <motion.li
                              key={index}
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: 0.4 + index * 0.1 }}
                              className="text-white/90 flex items-center gap-4"
                            >
                              <div className="w-3 h-3 rounded-full bg-white/80 flex-shrink-0" />
                              {point}
                            </motion.li>
                          )
                        )}
                    </motion.ul>
                  )}

                  {currentSlide.data.question && (
                    <motion.div
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="mt-8 text-left max-w-2xl mx-auto"
                    >
                      <p className="mb-6 text-2xl">
                        {currentSlide.data.question}
                      </p>
                      <div className="space-y-3">
                        {Array.isArray(currentSlide.data.options) &&
                          currentSlide.data.options.length > 0 &&
                          currentSlide.data.options.map(
                            (option: string, index: number) => (
                              <motion.button
                                key={index}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.4 + index * 0.1 }}
                                className="w-full glass-panel p-4 rounded-xl text-lg text-white hover:bg-white/20 transition-all text-left"
                                whileHover={{ scale: 1.02, x: 10 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <span className="inline-block w-8 h-8 rounded-lg bg-white/20 text-center leading-8 mr-3">
                                  {String.fromCharCode(65 + index)}
                                </span>
                                {option}
                              </motion.button>
                            )
                          )}
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Navigation Arrows */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-between px-8 pointer-events-none">
                  <motion.button
                    onClick={prevSlide}
                    disabled={currentIndex === 0}
                    className={`w-14 h-14 rounded-full glass-panel flex items-center justify-center pointer-events-auto transition-all ${
                      currentIndex === 0
                        ? "opacity-30 cursor-not-allowed"
                        : "hover:bg-white/20 hover:scale-110"
                    }`}
                    whileHover={currentIndex !== 0 ? { scale: 1.1 } : {}}
                    whileTap={currentIndex !== 0 ? { scale: 0.9 } : {}}
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </motion.button>

                  <motion.button
                    onClick={nextSlide}
                    disabled={currentIndex === slides.length - 1}
                    className={`w-14 h-14 rounded-full glass-panel flex items-center justify-center pointer-events-auto transition-all ${
                      currentIndex === slides.length - 1
                        ? "opacity-30 cursor-not-allowed"
                        : "hover:bg-white/20 hover:scale-110"
                    }`}
                    whileHover={
                      currentIndex !== slides.length - 1 ? { scale: 1.1 } : {}
                    }
                    whileTap={
                      currentIndex !== slides.length - 1 ? { scale: 0.9 } : {}
                    }
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </motion.button>
                </div>

                {/* Slide Counter */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 glass-panel px-6 py-3 rounded-full text-white">
                  {currentIndex + 1} / {slides.length}
                </div>

                {/* Fullscreen Toggle */}
                <div className="absolute top-8 right-8 flex gap-3">
                  <motion.button
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="glass-panel px-4 py-2 rounded-full text-white text-sm hover:bg-white/20 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isFullscreen ? (
                      <>
                        <X className="w-4 h-4 inline mr-2" />
                        Exit Fullscreen
                      </>
                    ) : (
                      "Fullscreen"
                    )}
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress Bar */}
          {!isFullscreen && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mt-6 glass-panel p-6"
            >
              <div className="flex items-center gap-4">
                <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#4BD5FF] to-[#B388FF]"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${((currentIndex + 1) / slides.length) * 100}%`,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <span className="text-[#A0A0A0] text-sm">
                  {Math.round(((currentIndex + 1) / slides.length) * 100)}%
                </span>
              </div>

              {/* Thumbnail Navigation */}
              <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                {slides.map((slide, index) => (
                  <motion.button
                    key={slide.id}
                    onClick={() => setCurrentIndex(index)}
                    className={`flex-shrink-0 w-32 h-20 rounded-lg overflow-hidden transition-all ${
                      index === currentIndex
                        ? "ring-2 ring-[#4BD5FF] ring-offset-2 ring-offset-[#0D0F14]"
                        : "opacity-40 hover:opacity-100"
                    }`}
                    style={{
                      background: `linear-gradient(135deg, ${slide.bgColor}, ${slide.decorColor})`,
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="w-full h-full flex items-center justify-center text-white text-xs p-2">
                      <p className="truncate">{slide.title}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
