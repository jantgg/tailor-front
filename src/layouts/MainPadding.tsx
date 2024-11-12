// src/layouts/MainPadding.tsx

import React, { ReactNode } from 'react';

interface MainPaddingProps {
  children: ReactNode;
}

const MainPadding: React.FC<MainPaddingProps> = ({ children }) => {
  return (
    <div className="h-screen w-screen overflow-hidden flex px-1 md:px-5 pb-0 pt-16">
      {children}
    </div>
  );
};

export default MainPadding;
