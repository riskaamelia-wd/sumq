"use client";
import { useState } from "react";

export default function TestPage() {
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState("");

  const handleGenerate = async () => {
    const res = await fetch("/api/generate-question", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic }),
    });
    const data = await res.json();
    console.log(data);
    setResult(data.result);
  };

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🎓 Generate AI Quiz</h1>
      <input
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Masukkan topik, misal: Tenses"
        className="border p-2 w-full mb-4"
      />
      <button
        onClick={handleGenerate}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Generate Soal
      </button>
      <pre className="bg-gray-100 p-4 mt-4 rounded whitespace-pre-wrap">
        {result}
      </pre>
    </main>
  );
}
