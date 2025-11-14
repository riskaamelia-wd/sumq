import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Slide } from "./types";
import { slides as defaultSlides } from "./data";
import {
  InfoCard,
  Quiz,
  LongText,
  ImageFocus,
  Comparison,
  TipCard,
  Definition,
} from "./templates";

/**
 * Multi-Template Carousel Component
 *
 * A versatile carousel component that supports multiple slide templates:
 * - info-card: Standard info card with learning objectives
 * - quiz: Multiple choice questions with validation
 * - long-text: Long-form explanations
 * - image-focus: Large image/emoji with notes
 * - comparison: Side-by-side comparisons
 * - tip-card: Tips and tricks cards
 * - definition: Term definitions with examples
 */

interface MultiTemplateCarouselProps {
  /** Array of slides to display. Uses default slides if not provided */
  slides?: Slide[];
  /** Initial slide index to display */
  initialSlide?: number;
}

export const MultiTemplateCarousel: React.FC<MultiTemplateCarouselProps> = ({
  slides = defaultSlides,
  initialSlide = 0,
}) => {
  const [currentSlide, setCurrentSlide] = useState(initialSlide);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  /**
   * Navigate to next slide
   */
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    resetQuizState();
  };

  /**
   * Navigate to previous slide
   */
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    resetQuizState();
  };

  /**
   * Jump to specific slide
   */
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    resetQuizState();
  };

  /**
   * Handle quiz answer selection
   */
  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
    setShowAnswer(true);
  };

  /**
   * Reset quiz state when changing slides
   */
  const resetQuizState = () => {
    setSelectedAnswer(null);
    setShowAnswer(false);
  };

  const slide = slides[currentSlide];

  /**
   * Render appropriate template based on slide type
   */
  const renderTemplate = () => {
    switch (slide.template) {
      case "info-card":
        return <InfoCard slide={slide} />;

      case "quiz":
        return (
          <Quiz
            slide={slide}
            selectedAnswer={selectedAnswer}
            showAnswer={showAnswer}
            onAnswerSelect={handleAnswerSelect}
          />
        );

      case "long-text":
        return <LongText slide={slide} />;

      case "image-focus":
        return <ImageFocus slide={slide} />;

      case "comparison":
        return <Comparison slide={slide} />;

      case "tip-card":
        return <TipCard slide={slide} />;

      case "definition":
        return <Definition slide={slide} />;

      default:
        return (
          <div className="flex items-center justify-center h-full">
            <p className="text-red-600">Template tidak ditemukan</p>
          </div>
        );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="relative w-full max-w-md">
        {/* * Main slide container */}
        <div
          className="rounded-3xl shadow-2xl overflow-hidden"
          style={{ aspectRatio: "4/5" }}
        >
          {renderTemplate()}
        </div>

        {/* * Previous slide button */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-white hover:bg-gray-100 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Slide sebelumnya"
        >
          <ChevronLeft className="w-6 h-6 text-slate-900" />
        </button>

        {/* * Next slide button */}
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-white hover:bg-gray-100 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Slide berikutnya"
        >
          <ChevronRight className="w-6 h-6 text-slate-900" />
        </button>

        {/* * Slide indicators */}
        <div className="flex justify-center gap-2 mt-6 flex-wrap">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "w-8 bg-slate-900"
                  : "w-2 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Ke slide ${index + 1}`}
            />
          ))}
        </div>

        {/* * Slide info footer */}
        <div className="mt-4 text-center text-xs text-gray-600">
          Template: <span className="font-semibold">{slide.template}</span> |
          Slide {currentSlide + 1}/{slides.length}
        </div>
      </div>
    </div>
  );
};

export default MultiTemplateCarousel;
