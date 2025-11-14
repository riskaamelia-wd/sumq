export interface topic {
  id: number;
  name: string;
  active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface subtopic {
  id: number;
  topic_id: number;
  name: string;
  active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface template {
  id: number;
  name: string;
  display_name: string;
  schema: JSON;
  default_style: JSON;
  preview_image: string;
  category: string;
  icon: string;
  active: boolean;
  created_at: Date;
  updated_at: Date;
}

// template:
// | "info-card"
// | "quiz"
// | "comparison"
// | "image-focus"
// | "comparison"
// | "tip-card"
// | "definition";

export interface Slide {
  id: number;
  subtopic_id: number;
  template_id: number;
  title: string;
  subtitle: string;
  data: DataSlide;
  bgColor: string;
  decorColor: string;
  order_index: number;
  active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface DataSlide {
  //infocard
  title?: string;
  subtitle?: string;
  visual?: string;
  visualType?: string;
  duration?: string;
  whatYouLearn?: string[];
  keywords?: string[];
  example?: string;
  cta?: string;
  //quiz
  // title?: string;
  question?: string;
  option?: string[];
  correctAnswer?: number;
  explaination?: string;

  //long-text
  // title?: string
  // subtitle?:string
  icon?: string;
  content?: string;

  // image-focus
  // title?: string;
  image?: string;
  imageType?: string;
  imageSize?: string;
  notes?: string[];
  // example?: string

  //comparison
  // title?: string;
  leftTitle?: string;
  leftItems?: string[];
  rightTitle?: string;
  rightItems?: string[];

  //tip-card
  // title?: string;
  tips?: tipCard[];

  //definition
  // title?: string;
  term?: string;
  definition?: string;
  connectors?: string[];
  examples?: string[];
}

export interface tipCard {
  emoji?: string;
  title?: string;
  description?: string;
}
