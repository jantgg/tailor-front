import React from "react";

type ArrowProps = {
  direction: "right" | "left" | "up" | "down";
  className?: string;
  color?: string;
};

const Arrow: React.FC<ArrowProps> = ({ direction, className = "", color = "white" }) => {
  // Definimos la rotación según la dirección
  const getRotation = () => {
    switch (direction) {
      case "up":
        return "-90";
      case "down":
        return "90";
      case "right":
        return "180";
      case "left":
      default:
        return "0";
    }
  };

  return (
    <div
      className={`flex items-center justify-center transition-transform duration-300 ease-in-out ${className}`}
      style={{ transform: `rotate(${getRotation()}deg)` }}
    >
      {/* Flecha */}
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.165 21.0815L4.08337 13.9999L11.165 6.91821"
          stroke={color}
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M23.9167 14L4.28175 14"
          stroke={color}
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default Arrow;
