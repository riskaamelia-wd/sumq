import React from "react";
import type { TemplateProps, ImageFocusSlide } from "../types";

/**
 * Image Focus Template Component
 * Displays large image/emoji with focused notes
 */
export const ImageFocus: React.FC<TemplateProps<ImageFocusSlide>> = ({
  slide,
}) => {
  return (
    <div className={`relative h-full bg-gradient-to-br ${slide.bgColor} p-8`}>
      <div className="relative h-full flex flex-col items-center justify-center text-center">
        {/* * Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-6">{slide.title}</h1>

        {/* * Large focal image/emoji */}
        <div className="text-9xl mb-8">{slide.image}</div>

        {/* * Key notes */}
        <div className="bg-white bg-opacity-80 backdrop-blur-sm p-4 rounded-xl mb-4 w-full">
          <ul className="space-y-2">
            {slide.notes.map((note, i) => (
              <li key={i} className="text-sm font-mono text-gray-900">
                {note}
              </li>
            ))}
          </ul>
        </div>

        {/* * Example section (optional) */}
        {slide.example && (
          <div className="bg-white bg-opacity-60 backdrop-blur-sm p-3 rounded-xl w-full">
            <p className="text-xs text-gray-700 whitespace-pre-line italic">
              {slide.example}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
