// src/layouts/Double.tsx

import React, { ReactNode } from 'react';

interface DoubleProps {
  left: ReactNode;
  right: ReactNode;
}

const Double: React.FC<DoubleProps> = ({ left, right }) => {
  return (
    <div className="h-full w-full relative grid grid-cols-1 md:grid-cols-2 gap-5 lg:text-4xl text-2xl">
      <div className="flex flex-col justify-end w-full h-full z-10 p-4 md:p-0">
        {left}
      </div>
      <div className="flex md:hidden absolute inset-0 flex-col justify-center bg-opacity-75">
        {right}
      </div>
      <div className="hidden md:flex flex-col justify-end">
        {right}
      </div>
    </div>
  );
};

export default Double;
