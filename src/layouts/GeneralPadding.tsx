// src/layouts/GeneralPadding.tsx

import React, { ReactNode } from 'react';

interface GeneralPaddingProps {
  children: ReactNode;
  overflow?: 'hidden' | 'auto' | 'scroll' | 'visible';
}

const GeneralPadding: React.FC<GeneralPaddingProps> = ({ children, overflow = 'hidden' }) => {
  return (
    <div className={`h-screen w-screen flex p-1 md:p-5 overflow-y-${overflow} overflow-x-hidden`}>
      {children}
    </div>
  );
};

export default GeneralPadding;
