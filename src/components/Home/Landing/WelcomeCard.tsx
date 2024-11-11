import React from "react";
import Button from "../../UI/Button";
import LogoName from "../../UI/LogoName";

const WelcomeCard: React.FC = () => {
  return (
    <div className="relative w-full flex flex-col items-start justify-center bg-gray-100 p-6 rounded-3xl shadow-md">
      <LogoName className="w-[200px] mb-8"/>
      <h1 className="mb-2">Hola,</h1>
      <p className="mb-10">
        Bienvenido a la prueba de Tailor hub, en ella has de añadir los
        restaurantes favoritos donde te gustaría ir en tu onboarding.
      </p>
      <Button
        text="Entrar"
        href="/login"
        additionalClasses="text-gray-800 font-semibold"
      />
    </div>
  );
};

export default WelcomeCard;
