import React from "react";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";
import type { QuizTemplateProps } from "../types";

/**
 * Quiz Template Component
 * Displays multiple choice question with answer validation
 */
export const Quiz: React.FC<QuizTemplateProps> = ({
  slide,
  selectedAnswer,
  showAnswer,
  onAnswerSelect,
}) => {
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
        {/* * Quiz header */}
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">🎯</div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">
            {slide.title}
          </h1>
          <p className="text-sm text-gray-700 leading-snug">{slide.question}</p>
        </div>

        {/* * Answer options */}
        <div className="space-y-3 flex-1">
          {slide.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === slide.correctAnswer;
            const showCorrect = showAnswer && isCorrect;
            const showWrong = showAnswer && isSelected && !isCorrect;

            return (
              <button
                key={index}
                onClick={() => onAnswerSelect(index)}
                disabled={showAnswer}
                className={`w-full p-3 rounded-xl text-left text-sm transition-all ${
                  showCorrect
                    ? "bg-green-100 border-2 border-green-500"
                    : showWrong
                    ? "bg-red-100 border-2 border-red-500"
                    : isSelected
                    ? "bg-gray-200 border-2 border-gray-400"
                    : "bg-white border-2 border-gray-200 hover:border-gray-400"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">
                    {String.fromCharCode(65 + index)}. {option}
                  </span>
                  {showCorrect && (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  )}
                  {showWrong && <XCircle className="w-5 h-5 text-red-600" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* * Explanation section (shown after answer) */}
        {showAnswer && (
          <div className="mt-4 bg-white bg-opacity-80 backdrop-blur-sm p-4 rounded-xl">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-gray-900 mb-1">
                  Penjelasan:
                </p>
                <p className="text-xs text-gray-700 leading-snug">
                  {slide.explanation}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
