import React, { useState } from "react";

export default function InteractiveAnatomy({ onPartClick }) {
  const [hovered, setHovered] = useState(null);

  const handleMouseEnter = (part) => setHovered(part);
  const handleMouseLeave = () => setHovered(null);
  const handleClick = (part) => {
    onPartClick(part);
  };

  const baseStyle = {
    fill: "#312e81", // Deep indigo (matching their image)
    stroke: "#ffffff",
    strokeWidth: 2,
    transition: "all 0.3s ease",
    cursor: "pointer",
  };

  const getStyle = (partName) => ({
    ...baseStyle,
    fill: hovered === partName ? "#3b82f6" : "#312e81",
    filter: hovered === partName ? "drop-shadow(0 0 8px rgba(59, 130, 246, 0.8))" : "none",
  });

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <div className="relative w-full max-w-[300px] aspect-[1/2] mx-auto">
        <svg
          viewBox="0 0 200 400"
          className="w-full h-full drop-shadow-2xl"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Head */}
          <path
            d="M85 30 C 85 10, 115 10, 115 30 C 115 50, 105 60, 100 60 C 95 60, 85 50, 85 30 Z"
            style={getStyle("Head")}
            onMouseEnter={() => handleMouseEnter("Head")}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick("Head")}
          />
          {/* Neck */}
          <path
            d="M90 55 L 110 55 L 115 75 L 85 75 Z"
            style={getStyle("Neck")}
            onMouseEnter={() => handleMouseEnter("Neck")}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick("Neck")}
          />
          
          {/* Chest */}
          <path
            d="M70 75 C 100 70, 100 70, 130 75 C 140 100, 130 130, 100 140 C 70 130, 60 100, 70 75 Z"
            style={getStyle("Chest")}
            onMouseEnter={() => handleMouseEnter("Chest")}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick("Chest")}
          />
          
          {/* Abdomen */}
          <path
            d="M75 140 C 100 135, 100 135, 125 140 C 120 180, 115 200, 100 210 C 85 200, 80 180, 75 140 Z"
            style={getStyle("Abdomen")}
            onMouseEnter={() => handleMouseEnter("Abdomen")}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick("Abdomen")}
          />

          {/* Left Shoulder & Arm */}
          <path
            d="M70 75 C 50 80, 40 100, 45 130 C 50 160, 55 170, 55 170 C 60 170, 65 140, 75 100 Z"
            style={getStyle("Left Arm")}
            onMouseEnter={() => handleMouseEnter("Left Arm")}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick("Left Arm")}
          />
          {/* Left Forearm & Hand */}
          <path
            d="M45 130 C 35 170, 30 190, 25 210 C 20 230, 30 230, 35 210 C 40 190, 45 170, 55 170 Z"
            style={getStyle("Left Hand")}
            onMouseEnter={() => handleMouseEnter("Left Hand")}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick("Left Hand")}
          />

          {/* Right Shoulder & Arm */}
          <path
            d="M130 75 C 150 80, 160 100, 155 130 C 150 160, 145 170, 145 170 C 140 170, 135 140, 125 100 Z"
            style={getStyle("Right Arm")}
            onMouseEnter={() => handleMouseEnter("Right Arm")}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick("Right Arm")}
          />
          {/* Right Forearm & Hand */}
          <path
            d="M155 130 C 165 170, 170 190, 175 210 C 180 230, 170 230, 165 210 C 160 190, 155 170, 145 170 Z"
            style={getStyle("Right Hand")}
            onMouseEnter={() => handleMouseEnter("Right Hand")}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick("Right Hand")}
          />

          {/* Left Thigh */}
          <path
            d="M75 200 C 60 250, 65 280, 75 300 C 85 300, 95 280, 95 210 Z"
            style={getStyle("Left Leg")}
            onMouseEnter={() => handleMouseEnter("Left Leg")}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick("Left Leg")}
          />
          {/* Left Calf & Foot */}
          <path
            d="M75 300 C 65 340, 70 370, 75 390 C 80 395, 90 395, 90 390 C 95 370, 90 340, 90 300 Z"
            style={getStyle("Left Foot")}
            onMouseEnter={() => handleMouseEnter("Left Foot")}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick("Left Foot")}
          />

          {/* Right Thigh */}
          <path
            d="M125 200 C 140 250, 135 280, 125 300 C 115 300, 105 280, 105 210 Z"
            style={getStyle("Right Leg")}
            onMouseEnter={() => handleMouseEnter("Right Leg")}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick("Right Leg")}
          />
          {/* Right Calf & Foot */}
          <path
            d="M125 300 C 135 340, 130 370, 125 390 C 120 395, 110 395, 110 390 C 105 370, 110 340, 110 300 Z"
            style={getStyle("Right Foot")}
            onMouseEnter={() => handleMouseEnter("Right Foot")}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick("Right Foot")}
          />
        </svg>
      </div>
    </div>
  );
}
