import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { topic } = await req.json();

  const response = await fetch(`${process.env.GROQ_API_URL}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: `${process.env.GROQ_MODEL}`,
      messages: [
        {
          role: "system",
          content:
            "You are a test generator AI that creates quiz questions for students.",
        },
        {
          role: "user",
          content: `Buat 3 soal pilihan ganda tentang topik: ${topic}.`,
        },
      ],
    }),
  });

  const data = await response.json();
  console.log(data);
  return NextResponse.json({ result: data.choices[0].message.content });
}
