// src/components/UI/Logo.tsx
import React from "react";

interface LogoProps {
  className?: string;
  fill?: string;
}

const Logo: React.FC<LogoProps> = ({ className = 'w-20 h-20', fill = 'black' }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <svg
        className="h-auto w-full"
        viewBox="0 0 123 112"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M122.534 111.771V93.1421H94.798C91.9002 93.1421 88.5885 91.4863 86.1047 88.5885L74.0997 74.5137H122.534V55.8853H88.5885L112.599 27.3217L98.1097 15.3167L70.3741 48.0199V0H51.7456V48.0199L24.4239 15.3167L9.93516 27.3217L33.9451 55.8853H0V74.5137H48.4339L36.4289 88.5885C33.9451 91.4863 30.6334 93.1421 27.7357 93.1421H0V111.771H28.9776C36.4289 111.771 43.8803 108.873 48.0199 103.905L61.2668 88.1746L74.5137 103.905C78.6534 108.459 86.1047 111.771 93.5561 111.771H122.534Z"
          fill={fill}
        />
      </svg>
    </div>
  );
};

export default Logo;
