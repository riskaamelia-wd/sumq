/**
 * Multi-Template Carousel Module
 *
 * A modular carousel component supporting multiple slide templates
 */

// * Main component export
export { MultiTemplateCarousel, default } from "./MultiTemplateCarousel";

// * Type exports
export type {
  TemplateType,
  InfoCardSlide,
  QuizSlide,
  LongTextSlide,
  ImageFocusSlide,
  ComparisonSlide,
  TipCardSlide,
  DefinitionSlide,
  Slide,
  TemplateProps,
  QuizTemplateProps,
} from "./types";

// * Data export
export { slides } from "./data";

// * Template component exports (for custom usage)
export {
  InfoCard,
  Quiz,
  LongText,
  ImageFocus,
  Comparison,
  TipCard,
  Definition,
} from "./templates";
