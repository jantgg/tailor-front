// src/components/Auth/RegisterCard.tsx

import React from "react";
import LogoName from "../UI/LogoName";
import RegisterForm from "./RegisterForm";

const RegisterCard: React.FC = () => {
  return (
    <div className="relative w-full flex flex-col items-start justify-center bg-tailor-blue p-8 rounded-3xl shadow-lg text-white">
        <LogoName className="w-[200px] mb-8" fill="white" />
        <RegisterForm />
    </div>
  );
};

export default RegisterCard;
