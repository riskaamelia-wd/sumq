import React from "react";
import type { TemplateProps, TipCardSlide } from "../types";

/**
 * Tip Card Template Component
 * Displays tips and tricks in card format
 */
export const TipCard: React.FC<TemplateProps<TipCardSlide>> = ({ slide }) => {
  return (
    <div className={`relative h-full bg-gradient-to-br ${slide.bgColor} p-8`}>
      <div className="relative h-full flex flex-col">
        {/* * Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          {slide.title}
        </h1>

        {/* * Tips list */}
        <div className="space-y-4 flex-1">
          {slide.tips.map((tip, i) => (
            <div
              key={i}
              className="bg-white bg-opacity-70 backdrop-blur-sm p-4 rounded-xl"
            >
              <div className="flex items-start gap-3">
                <div className="text-3xl flex-shrink-0">{tip.emoji}</div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-1">
                    {tip.title}
                  </h3>
                  <p className="text-xs text-gray-700 leading-snug">
                    {tip.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
