"use client";

import { useState } from "react";
import MemoryGame from "@/components/MemoryGame";

export default function Home() {
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard" | null>(null);
  const [theme, setTheme] = useState<"animals" | "fruits" | "symbols">("animals");

  if (!difficulty) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-8">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full">
          <h1 className="text-4xl font-bold text-center mb-2 text-purple-600">
            記憶配對遊戲
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Memory Match Game
          </p>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">選擇主題：</h2>
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: "animals", label: "🐾 動物", emoji: "🦁🐼🐯" },
                { value: "fruits", label: "🍎 水果", emoji: "🍉🍊🍇" },
                { value: "symbols", label: "⭐ 符號", emoji: "❤️⭐🎵" },
              ].map((t) => (
                <button
                  key={t.value}
                  onClick={() => setTheme(t.value as typeof theme)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    theme === t.value
                      ? "border-purple-500 bg-purple-50 shadow-md"
                      : "border-gray-300 hover:border-purple-300"
                  }`}
                >
                  <div className="text-2xl mb-1">{t.emoji}</div>
                  <div className="text-sm font-medium">{t.label}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">選擇難度：</h2>
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: "easy", label: "簡單", cards: "12 張卡片" },
                { value: "medium", label: "中等", cards: "16 張卡片" },
                { value: "hard", label: "困難", cards: "20 張卡片" },
              ].map((d) => (
                <button
                  key={d.value}
                  onClick={() => setDifficulty(d.value as "easy" | "medium" | "hard")}
                  className="p-6 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 text-white font-semibold hover:from-purple-600 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <div className="text-lg">{d.label}</div>
                  <div className="text-sm opacity-90 mt-1">{d.cards}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <MemoryGame
        difficulty={difficulty}
        theme={theme}
        onBackToMenu={() => setDifficulty(null)}
      />
    </main>
  );
}
