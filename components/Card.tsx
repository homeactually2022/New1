"use client";

interface CardProps {
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
}

export default function Card({ content, isFlipped, isMatched, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`relative aspect-square cursor-pointer transition-all duration-300 transform hover:scale-105 ${
        isMatched ? "opacity-50" : ""
      }`}
      style={{ perspective: "1000px" }}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
          isFlipped || isMatched ? "rotate-y-180" : ""
        }`}
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped || isMatched ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Card Back */}
        <div
          className="absolute w-full h-full bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg"
          style={{
            backfaceVisibility: "hidden",
          }}
        >
          <div className="text-4xl">❓</div>
        </div>

        {/* Card Front */}
        <div
          className={`absolute w-full h-full ${
            isMatched
              ? "bg-gradient-to-br from-green-400 to-green-500"
              : "bg-gradient-to-br from-white to-gray-50"
          } rounded-xl flex items-center justify-center shadow-lg`}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="text-5xl">{content}</div>
        </div>
      </div>
    </div>
  );
}
