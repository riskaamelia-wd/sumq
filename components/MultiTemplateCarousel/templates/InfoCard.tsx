import React from "react";
import { BookOpen, Type } from "lucide-react";
import type { TemplateProps, InfoCardSlide } from "../types";

/**
 * Info Card Template Component
 * Displays standard information card with learning objectives and keywords
 */
export const InfoCard: React.FC<TemplateProps<InfoCardSlide>> = ({ slide }) => {
  return (
    <div className={`relative h-full bg-gradient-to-br ${slide.bgColor} p-8`}>
      {/* * Grid background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative h-full flex flex-col">
        {/* * Decorative elements */}
        <div className="flex justify-between items-start !mb-4">
          <div className={`${slide.decorColor} text-2xl`}>✺</div>
          <div className="flex gap-2">
            <div className={`${slide.decorColor} text-xl`}>⟶</div>
            <div className={slide.decorColor}>★</div>
          </div>
        </div>

        {/* * Title and subtitle */}
        <h1 className="text-2xl font-bold text-gray-900 mb-1.5 leading-tight">
          {slide.title}
        </h1>
        <p className="text-sm text-gray-700 mb-4 italic">{slide.subtitle}</p>

        {/* * Visual icon with duration badge */}
        <div className="flex items-center justify-center my-3">
          <div className="relative">
            <div className="text-5xl">{slide.visual}</div>
            <div className="absolute -top-2 -right-2 bg-gray-900 text-white px-2 py-0.5 rounded-full text-xs font-bold rotate-12">
              {slide.duration}
            </div>
          </div>
        </div>

        {/* * Learning objectives list */}
        <div className="mb-3 flex-1 overflow-y-auto">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-4 h-4 text-gray-800" />
            <h3 className="font-semibold text-gray-900 text-sm">
              Yang Dipelajari:
            </h3>
          </div>
          <ul className="space-y-1">
            {slide.whatYouLearn.map((item, i) => (
              <li
                key={i}
                className="text-gray-800 text-xs flex items-start gap-2"
              >
                <span className={`${slide.decorColor} mt-0.5 text-xs`}>✦</span>
                <span className="leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* * Example section (optional) */}
        {slide.example && (
          <div className="mb-3 bg-white bg-opacity-60 backdrop-blur-sm px-3 py-2 rounded-xl">
            <p className="text-xs font-semibold text-gray-700 mb-1">Contoh:</p>
            <p className="text-xs text-gray-900 italic">
              &ldquo;{slide.example}&rdquo;
            </p>
          </div>
        )}

        {/* * Keywords section */}
        {slide.keywords && (
          <div className="border-t border-gray-300 pt-2.5 mt-auto">
            <div className="flex items-center gap-2 mb-1.5">
              <Type className="w-3.5 h-3.5 text-gray-800" />
              <h3 className="font-semibold text-gray-900 text-xs">
                Kata Kunci:
              </h3>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {slide.keywords.map((keyword, i) => (
                <span
                  key={i}
                  className="px-2.5 py-0.5 bg-gray-900 text-white text-xs rounded-full"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
