import React from "react";
import type { TemplateProps, DefinitionSlide } from "../types";

/**
 * Definition Template Component
 * Displays term definition with connectors and examples
 */
export const Definition: React.FC<TemplateProps<DefinitionSlide>> = ({
  slide,
}) => {
  return (
    <div className={`relative h-full bg-gradient-to-br ${slide.bgColor} p-8`}>
      <div className="relative h-full flex flex-col">
        {/* * Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">
          {slide.title}
        </h1>

        {/* * Term and definition */}
        <div className="bg-white bg-opacity-70 backdrop-blur-sm p-4 rounded-xl mb-4">
          <h2 className="text-sm font-bold text-gray-900 mb-2">{slide.term}</h2>
          <p className="text-xs text-gray-700 leading-relaxed">
            {slide.definition}
          </p>
        </div>

        {/* * Connectors section */}
        <div className="mb-4">
          <h3 className="text-xs font-semibold text-gray-900 mb-2">
            Connectors:
          </h3>
          <div className="flex flex-wrap gap-2">
            {slide.connectors.map((conn, i) => (
              <span
                key={i}
                className="px-2.5 py-1 bg-white bg-opacity-70 text-xs rounded-full font-medium text-gray-800"
              >
                {conn}
              </span>
            ))}
          </div>
        </div>

        {/* * Examples section */}
        <div className="bg-white bg-opacity-60 backdrop-blur-sm p-4 rounded-xl flex-1 overflow-y-auto">
          <h3 className="text-xs font-semibold text-gray-900 mb-2">Contoh:</h3>
          <ul className="space-y-1.5">
            {slide.examples.map((ex, i) => (
              <li key={i} className="text-xs text-gray-800 italic">
                &quot;<span className="font-medium">{ex}</span>&quot;
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
