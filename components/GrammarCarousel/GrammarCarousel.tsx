"use client";

import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, BookOpen, Type } from "lucide-react";
import * as LucideIcons from "lucide-react";
// import { slides } from "./data";
import { getSlide } from "../api/slide";
import { Slide } from "../../lib/types";

const VisualRenderer = ({
  type,
  value,
  size = "large",
}: {
  type: "emoji" | "icon" | "image" | "url";
  value: string;
  size?: "small" | "medium" | "large";
}) => {
  const sizeClasses = {
    small: "text-3xl w-8 h-8",
    medium: "text-5xl w-12 h-12",
    large: "text-7xl w-20 h-20",
  };

  switch (type) {
    case "emoji":
      return <div className={sizeClasses[size]}>{value}</div>;

    case "icon":
      // Dynamically get icon component from lucide-react
      const IconComponent = (
        LucideIcons as unknown as Record<
          string,
          React.ComponentType<{ className?: string }>
        >
      )[value];
      return IconComponent ? (
        <IconComponent className={`${sizeClasses[size]} text-gray-900`} />
      ) : (
        <div className={sizeClasses[size]}>📝</div>
      );

    case "image":
    case "url":
      return (
        <img
          src={value}
          alt="visual"
          className={`${sizeClasses[size]} object-contain`}
        />
      );

    default:
      return <div className={sizeClasses[size]}>📝</div>;
  }
};

/**
 * Grammar Carousel Component
 * Displays interactive carousel for grammar learning content
 */
const GrammarCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const slides = await getSlide();
        console.log("Fetched slides:", slides);

        if (slides && slides.length > 0) {
          setSlides(slides as Slide[]);
        } else {
          console.warn("No slides data received from API");
        }
      } catch (error) {
        console.error("Failed to fetch slides:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSlides();
  }, []);

  // Navigation handlers
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // * Show loading state while fetching data
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat konten...</p>
        </div>
      </div>
    );
  }

  // * Show message if no slides available
  if (slides.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600">Tidak ada slide tersedia.</p>
        </div>
      </div>
    );
  }

  const slide = slides[currentSlide];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="relative w-full max-w-md">
        {/* Carousel Container */}
        <div
          className="rounded-3xl shadow-2xl overflow-hidden"
          style={{ aspectRatio: "4/5" }}
        >
          {/* INFO CARD STYLE */}
          <div
            className={`relative h-full bg-gradient-to-br ${slide.bgColor} p-8`}
          >
            {/* Grid Pattern Background */}
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage:
                  "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />

            {/* Content */}
            <div className="relative h-full flex flex-col">
              {/* Header with decorative elements */}
              <div className="flex justify-between items-start mb-4">
                <div className={`${slide.decorColor} text-2xl`}>✺</div>
                <div className="flex gap-2">
                  <div className={`${slide.decorColor} text-xl`}>⟶</div>
                  <div className={slide.decorColor}>★</div>
                </div>
              </div>

              {/* Main Title */}
              <h1 className="text-2xl font-bold text-gray-900 mb-1.5 leading-tight">
                {slide.title}
              </h1>
              <p className="text-sm text-gray-700 mb-4 italic">
                {slide.subtitle}
              </p>

              {/* Center Visual Element - UPDATED */}
              <div className="flex items-center justify-center my-3">
                <div className="relative">
                  <VisualRenderer
                    type={
                      (slide.data.visualType as
                        | "emoji"
                        | "icon"
                        | "image"
                        | "url") || "emoji"
                    }
                    value={slide.data.visual || ""}
                    size="large"
                  />
                  <div className="absolute -top-2 -right-2 bg-gray-900 text-white px-2 py-0.5 rounded-full text-xs font-bold rotate-12">
                    {slide.data.duration}
                  </div>
                </div>
              </div>

              {/* What You'll Learn */}
              <div className="mb-3 flex-1 overflow-y-auto">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-4 h-4 text-gray-800" />
                  <h3 className="font-semibold text-gray-900 text-sm">
                    Yang Dipelajari:
                  </h3>
                </div>
                <ul className="space-y-1">
                  {slide.data.whatYouLearn &&
                    slide.data.whatYouLearn.length > 0 &&
                    slide.data.whatYouLearn.map((item, i) => (
                      <li
                        key={i}
                        className="text-gray-800 text-xs flex items-start gap-2"
                      >
                        <span
                          className={`${slide.decorColor} mt-0.5 text-xs flex-shrink-0`}
                        >
                          ✦
                        </span>
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                </ul>
              </div>

              {/* Example (if exists) */}
              {slide.data.example && (
                <div className="mb-3 bg-white bg-opacity-60 backdrop-blur-sm px-3 py-2 rounded-xl">
                  <p className="text-xs font-semibold text-gray-700 mb-1">
                    Contoh:
                  </p>
                  <p className="text-xs text-gray-900 italic leading-snug">
                    &quot;{slide.data.example}&quot;
                  </p>
                </div>
              )}

              {/* Keywords - OPTIONAL */}
              {slide.data.keywords && slide.data.keywords.length > 0 && (
                <div className="border-t border-gray-300 pt-2.5 mt-auto">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Type className="w-3.5 h-3.5 text-gray-800" />
                    <h3 className="font-semibold text-gray-900 text-xs">
                      Kata Kunci:
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {slide.data.keywords.map((keyword, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-0.5 bg-gray-900 text-white text-xs rounded-full font-medium"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA Button (if exists) */}
              {slide.data.cta && (
                <div className="mt-4 text-center">
                  <button className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-2.5 px-6 rounded-full transition-all duration-300 transform hover:scale-105 text-sm">
                    Save this post 🔖
                  </button>
                </div>
              )}

              {/* Decorative corner */}
              <div
                className={`absolute bottom-6 right-6 ${slide.decorColor} text-xl opacity-30`}
              >
                ⟲
              </div>

              {/* Slide counter */}
              <div className="absolute top-6 right-6 text-gray-500 text-xs font-medium">
                {currentSlide + 1}/{slides.length}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-white hover:bg-gray-100 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-slate-900" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-white hover:bg-gray-100 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-slate-900" />
        </button>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-2 mt-6 flex-wrap max-w-md mx-auto">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "w-8 bg-slate-900"
                  : "w-2 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Hashtags */}
        <div className="mt-6 text-center text-sm text-gray-600">
          #NoteInProgress #EnglishGrammar #Connector
        </div>
      </div>
    </div>
  );
};

export default GrammarCarousel;
