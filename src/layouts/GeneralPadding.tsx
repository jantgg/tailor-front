// src/layouts/GeneralPadding.tsx

import React, { ReactNode } from 'react';

interface GeneralPaddingProps {
  children: ReactNode;
}

const GeneralPadding: React.FC<GeneralPaddingProps> = ({ children }) => {
  return (
    <div className="h-screen w-screen overflow-hidden flex p-1 md:p-5">
      {children}
    </div>
  );
};

export default GeneralPadding;
