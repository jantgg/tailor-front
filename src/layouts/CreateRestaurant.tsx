// src/layouts/CreateRestaurant.tsx

import React, { ReactNode } from 'react';
import Logo from '../components/UI/Logo';

interface CreateRestaurantProps {
  children: ReactNode;
}

const CreateRestaurant: React.FC<CreateRestaurantProps> = ({ children }) => {
  return (
    <div className="h-screen w-full relative flex flex-col justify-center items-center pt-14 gap-y-6 px-4">
        <Logo className="w-20 h-20" fill="blue" />
        {children}
        <Logo className="w-20 h-20" fill="blue" />
    </div>
  );
};

export default CreateRestaurant;
