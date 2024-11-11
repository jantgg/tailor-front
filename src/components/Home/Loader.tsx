// src/components/Home/Loader.tsx

import React from 'react';
import LogoName from '../UI/LogoName';

const Loader: React.FC = () => {
  return (
    <div className="flex w-full h-full items-center justify-center bg-gray-100 rounded-md">
      <LogoName className="w-30" />
    </div>
  );
};

export default Loader;
