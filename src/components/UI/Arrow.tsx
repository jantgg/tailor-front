import React from "react";

type ArrowProps = {
  direction: "right" | "left" | "up" | "down";
};

const Arrow: React.FC<ArrowProps> = ({ direction }) => {
  // Definimos la rotación según la dirección
  const getRotation = () => {
    switch (direction) {
      case "up":
        return "-90";
      case "down":
        return "90";
      case "left":
        return "180";
      case "right":
      default:
        return "0";
    }
  };

  return (
    <div
      className={`flex items-center transition-transform duration-300 ease-in-out`}
      style={{ transform: `rotate(${getRotation()}deg)` }}
    >
      {/* Flecha */}
      <svg
        width="20"
        height="2"
        viewBox="0 0 20 2"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.5 1H18.33"
          stroke="#292D32"
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
