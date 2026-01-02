"use client";

import { useState, useEffect, useCallback } from "react";
import Card from "./Card";

interface MemoryGameProps {
  difficulty: "easy" | "medium" | "hard";
  theme: "animals" | "fruits" | "symbols";
  onBackToMenu: () => void;
}

interface CardType {
  id: number;
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const themes = {
  animals: ["🦁", "🐼", "🐯", "🦊", "🐨", "🐸", "🦉", "🐧", "🦄", "🐝"],
  fruits: ["🍎", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🍑", "🍒", "🥝"],
  symbols: ["❤️", "⭐", "🎵", "🎨", "🎭", "🎪", "🎯", "🎲", "🎸", "🎺"],
};

const difficultySettings = {
  easy: 6,    // 12 cards total (6 pairs)
  medium: 8,  // 16 cards total (8 pairs)
  hard: 10,   // 20 cards total (10 pairs)
};

export default function MemoryGame({ difficulty, theme, onBackToMenu }: MemoryGameProps) {
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [isWon, setIsWon] = useState(false);

  // Initialize game
  const initializeGame = useCallback(() => {
    const pairCount = difficultySettings[difficulty];
    const selectedEmojis = themes[theme].slice(0, pairCount);
    const gameCards = [...selectedEmojis, ...selectedEmojis]
      .sort(() => Math.random() - 0.5)
      .map((content, index) => ({
        id: index,
        content,
        isFlipped: false,
        isMatched: false,
      }));

    setCards(gameCards);
    setFlippedCards([]);
    setMoves(0);
    setTime(0);
    setIsGameActive(true);
    setIsWon(false);
  }, [difficulty, theme]);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isGameActive && !isWon) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isGameActive, isWon]);

  // Handle card click
  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2 || cards[id].isFlipped || cards[id].isMatched) {
      return;
    }

    const newCards = [...cards];
    newCards[id].isFlipped = true;
    setCards(newCards);

    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves((prev) => prev + 1);
      const [firstId, secondId] = newFlippedCards;

      if (cards[firstId].content === cards[secondId].content) {
        // Match found
        setTimeout(() => {
          const updatedCards = [...newCards];
          updatedCards[firstId].isMatched = true;
          updatedCards[secondId].isMatched = true;
          setCards(updatedCards);
          setFlippedCards([]);

          // Check if game is won
          if (updatedCards.every((card) => card.isMatched)) {
            setIsWon(true);
            setIsGameActive(false);
          }
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          const updatedCards = [...newCards];
          updatedCards[firstId].isFlipped = false;
          updatedCards[secondId].isFlipped = false;
          setCards(updatedCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const gridCols = difficulty === "easy" ? "grid-cols-4" : difficulty === "medium" ? "grid-cols-4" : "grid-cols-5";

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-purple-600">記憶配對遊戲</h1>
        <button
          onClick={onBackToMenu}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
        >
          返回主選單
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg text-center">
          <div className="text-sm opacity-90">時間</div>
          <div className="text-2xl font-bold">{formatTime(time)}</div>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-lg text-center">
          <div className="text-sm opacity-90">步數</div>
          <div className="text-2xl font-bold">{moves}</div>
        </div>
      </div>

      {/* Game Board */}
      <div className={`grid ${gridCols} gap-3 mb-6`}>
        {cards.map((card) => (
          <Card
            key={card.id}
            content={card.content}
            isFlipped={card.isFlipped}
            isMatched={card.isMatched}
            onClick={() => handleCardClick(card.id)}
          />
        ))}
      </div>

      {/* Win Modal */}
      {isWon && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md text-center shadow-2xl">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-purple-600 mb-4">恭喜你贏了！</h2>
            <div className="text-gray-600 space-y-2 mb-6">
              <p className="text-xl">時間：<span className="font-bold text-blue-600">{formatTime(time)}</span></p>
              <p className="text-xl">步數：<span className="font-bold text-purple-600">{moves}</span></p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={initializeGame}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition"
              >
                再玩一次
              </button>
              <button
                onClick={onBackToMenu}
                className="flex-1 px-6 py-3 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition"
              >
                返回主選單
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Button */}
      <button
        onClick={initializeGame}
        className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition"
      >
        重新開始
      </button>
    </div>
  );
}
