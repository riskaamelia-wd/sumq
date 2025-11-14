import type { Slide } from "./types";

/**
 * Slide data for Multi-Template Carousel
 */

export const slides: Slide[] = [
  // * TEMPLATE 1: INFO CARD (Standard)
  {
    template: "info-card",
    title: "Subject & Verb",
    subtitle: "Grammar Dasar",
    visual: "📝",
    duration: "5 min",
    whatYouLearn: [
      "Noun (kata benda)",
      "Pronoun (kata ganti)",
      "Noun phrase (frasa)",
      "Gerund (verb+ing)",
    ],
    keywords: ["Grammar", "Subject"],
    bgColor: "from-blue-50 to-indigo-50",
    decorColor: "text-blue-600",
    example: "Tom is singing",
  },

  // * TEMPLATE 2: QUIZ/LATIHAN SOAL
  {
    template: "quiz",
    title: "Latihan: Coordinate Connector",
    question: "Pilih kalimat yang BENAR menggunakan FANBOYS:",
    options: [
      "I was tired so I went home",
      "I was tired, so I went home",
      "I was tired so, I went home",
      "I was tired, so, I went home",
    ],
    correctAnswer: 1,
    explanation:
      "FANBOYS harus pakai koma SEBELUM connector. Jadi: 'I was tired, so I went home'",
    bgColor: "from-purple-50 to-pink-50",
    decorColor: "text-purple-600",
  },

  // * TEMPLATE 3: LONG TEXT/EXPLANATION
  {
    template: "long-text",
    title: "Apa itu Adverb Clause?",
    subtitle: "Penjelasan Lengkap",
    content: `Adverb clause adalah klausa yang berfungsi sebagai adverb (kata keterangan). Klausa ini memberikan informasi tambahan tentang KAPAN, DIMANA, MENGAPA, atau BAGAIMANA sesuatu terjadi.

Ciri-ciri Adverb Clause:
• Dimulai dengan subordinating conjunction (when, because, if, although, dll)
• Bisa ditempatkan di awal atau tengah kalimat
• Jika di awal, harus pakai koma
• Jika di tengah, biasanya tanpa koma (kecuali contrast)

Adverb clause sangat penting karena membuat kalimat lebih informatif dan natural.`,
    bgColor: "from-teal-50 to-emerald-50",
    decorColor: "text-teal-600",
    icon: "📖",
  },

  // * TEMPLATE 4: IMAGE FOCUS
  {
    template: "image-focus",
    title: "Modus Ponens",
    image: "⚡",
    imageSize: "huge",
    notes: ["Jika P → Q", "P benar", "∴ Q benar"],
    example: "Jika rajin → sukses\nBudi rajin\n∴ Budi sukses ✅",
    bgColor: "from-amber-50 to-orange-50",
    decorColor: "text-amber-600",
  },

  // * TEMPLATE 5: COMPARISON (Side by Side)
  {
    template: "comparison",
    title: "FANBOYS vs Adverb Clause",
    leftTitle: "FANBOYS",
    leftItems: [
      "Di tengah kalimat",
      "Wajib pakai koma",
      "Menghubungkan 2 klausa setara",
      "Contoh: and, but, so",
    ],
    rightTitle: "Adverb Clause",
    rightItems: [
      "Fleksibel (awal/tengah)",
      "Koma jika di awal",
      "Menghubungkan klausa utama & bawahan",
      "Contoh: when, because, if",
    ],
    bgColor: "from-green-50 to-lime-50",
    decorColor: "text-green-600",
  },

  // * TEMPLATE 6: TIP CARD
  {
    template: "tip-card",
    title: "💡 Tips Mengingat FANBOYS",
    tips: [
      {
        emoji: "🎯",
        title: "Gunakan Akronim",
        description:
          "F-A-N-B-O-Y-S mudah diingat karena membentuk kata 'fanboys'",
      },
      {
        emoji: "✍️",
        title: "Latihan Rutin",
        description: "Buat 1 kalimat setiap hari menggunakan FANBOYS berbeda",
      },
      {
        emoji: "📝",
        title: "Cek Koma",
        description: "Selalu ingat: FANBOYS = koma wajib!",
      },
    ],
    bgColor: "from-yellow-50 to-amber-50",
    decorColor: "text-yellow-700",
  },

  // * TEMPLATE 7: DEFINITION CARD
  {
    template: "definition",
    title: "Noun Clause",
    term: "Noun Clause Connector",
    definition:
      "Kata penghubung yang membuat sebuah klausa berfungsi sebagai noun (kata benda) dalam kalimat.",
    examples: [
      "I know what you mean",
      "Tell me where you live",
      "I wonder whether he'll come",
    ],
    connectors: [
      "when",
      "what",
      "where",
      "why",
      "how",
      "whatever",
      "whether",
      "if",
      "that",
    ],
    bgColor: "from-rose-50 to-pink-50",
    decorColor: "text-rose-600",
  },
];
