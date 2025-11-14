/**
 * Type definitions for Multi-Template Carousel
 */

// * Base template type
export type TemplateType =
  | "info-card"
  | "quiz"
  | "long-text"
  | "image-focus"
  | "comparison"
  | "tip-card"
  | "definition";

// * Common properties for all slides
interface BaseSlide {
  template: TemplateType;
  bgColor: string;
  decorColor?: string;
}

// * Info Card template
export interface InfoCardSlide extends BaseSlide {
  template: "info-card";
  title: string;
  subtitle: string;
  visual: string;
  duration: string;
  whatYouLearn: string[];
  keywords: string[];
  example?: string;
}

// * Quiz template
export interface QuizSlide extends BaseSlide {
  template: "quiz";
  title: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

// * Long Text template
export interface LongTextSlide extends BaseSlide {
  template: "long-text";
  title: string;
  subtitle: string;
  content: string;
  icon: string;
}

// * Image Focus template
export interface ImageFocusSlide extends BaseSlide {
  template: "image-focus";
  title: string;
  image: string;
  imageSize: string;
  notes: string[];
  example?: string;
}

// * Comparison template
export interface ComparisonSlide extends BaseSlide {
  template: "comparison";
  title: string;
  leftTitle: string;
  leftItems: string[];
  rightTitle: string;
  rightItems: string[];
}

// * Tip Card template
export interface TipCardSlide extends BaseSlide {
  template: "tip-card";
  title: string;
  tips: Array<{
    emoji: string;
    title: string;
    description: string;
  }>;
}

// * Definition template
export interface DefinitionSlide extends BaseSlide {
  template: "definition";
  title: string;
  term: string;
  definition: string;
  connectors: string[];
  examples: string[];
}

// * Union type for all slides
export type Slide =
  | InfoCardSlide
  | QuizSlide
  | LongTextSlide
  | ImageFocusSlide
  | ComparisonSlide
  | TipCardSlide
  | DefinitionSlide;

// * Template component props
export interface TemplateProps<T extends Slide = Slide> {
  slide: T;
}

// * Quiz specific props
export interface QuizTemplateProps extends TemplateProps<QuizSlide> {
  selectedAnswer: number | null;
  showAnswer: boolean;
  onAnswerSelect: (index: number) => void;
}
