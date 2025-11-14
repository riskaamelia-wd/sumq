import React from "react";
import type { TemplateProps, ComparisonSlide } from "../types";

/**
 * Comparison Template Component
 * Displays side-by-side comparison of two concepts
 */
export const Comparison: React.FC<TemplateProps<ComparisonSlide>> = ({
  slide,
}) => {
  return (
    <div className={`relative h-full bg-gradient-to-br ${slide.bgColor} p-8`}>
      <div className="relative h-full flex flex-col">
        {/* * Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          {slide.title}
        </h1>

        {/* * Two-column comparison grid */}
        <div className="flex-1 grid grid-cols-2 gap-4">
          {/* * Left side */}
          <div className="bg-white bg-opacity-60 backdrop-blur-sm p-4 rounded-xl">
            <h2 className="text-sm font-bold text-gray-900 mb-3 text-center">
              {slide.leftTitle}
            </h2>
            <ul className="space-y-2">
              {slide.leftItems.map((item, i) => (
                <li
                  key={i}
                  className="text-xs text-gray-800 flex items-start gap-2"
                >
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* * Right side */}
          <div className="bg-white bg-opacity-60 backdrop-blur-sm p-4 rounded-xl">
            <h2 className="text-sm font-bold text-gray-900 mb-3 text-center">
              {slide.rightTitle}
            </h2>
            <ul className="space-y-2">
              {slide.rightItems.map((item, i) => (
                <li
                  key={i}
                  className="text-xs text-gray-800 flex items-start gap-2"
                >
                  <span className="text-blue-600 mt-0.5">✓</span>
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
