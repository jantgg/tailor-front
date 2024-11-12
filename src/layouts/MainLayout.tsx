// src/layouts/MainLayout.tsx

import React, { ReactNode } from 'react';

interface MainLayoutProps {
  left: ReactNode;
  right: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ left, right }) => {
  return (
    <div className="h-screen w-full grid grid-cols-1 md:grid-cols-2 gap-x-4 pt-20 px-2 md:px-4">
      {/* Contenedor del mapa */}
      <div className="flex w-full min-h-[350px] h-[90%] rounded-xl overflow-hidden mb-10 align-start">
        {left}
      </div>
      {/* Contenedor de la lista de restaurantes */}
      <div className="flex flex-col w-full h-full overflow-y-auto no-scrollbar">
        {right}
      </div>
    </div>
  );
};

export default MainLayout;
