import React from "react";
import type { TemplateProps, LongTextSlide } from "../types";

/**
 * Long Text Template Component
 * Displays long-form explanation or article content
 */
export const LongText: React.FC<TemplateProps<LongTextSlide>> = ({ slide }) => {
  return (
    <div
      className={`relative h-full bg-gradient-to-br ${slide.bgColor} p-8 overflow-hidden`}
    >
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
        {/* * Header section */}
        <div className="text-center mb-4">
          <div className="text-4xl mb-2">{slide.icon}</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            {slide.title}
          </h1>
          <p className="text-sm text-gray-700 italic">{slide.subtitle}</p>
        </div>

        {/* * Main content with scroll */}
        <div className="flex-1 overflow-y-auto pr-2 text-gray-800 text-xs leading-relaxed whitespace-pre-line">
          {slide.content}
        </div>
      </div>
    </div>
  );
};
