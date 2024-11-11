// src/components/Auth/AuthCard.tsx

import React from "react";
import Link from "next/link";
import LogoName from "../UI/LogoName";
import LoginForm from "./LoginForm";

const AuthCard: React.FC = () => {
  return (
    <div className="relative w-full flex flex-col items-start justify-center bg-tailor-blue p-8 rounded-3xl shadow-lg text-white">
      <LogoName className="w-[200px] mb-8" fill="white" />
      <p className="mb-8 text-xl">
        ¿No tienes cuenta?{' '}
        <Link href="/register" className="underline">Regístrate</Link>
      </p>
      <LoginForm />
    </div>
  );
};

export default AuthCard;
