// src/components/UI/InputPassword.tsx
import React, { useState } from 'react';

interface InputPasswordProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  additionalClasses?: string;
  name: string;
}

const InputPassword: React.FC<InputPasswordProps> = ({ label, placeholder = '', value, onChange, additionalClasses = '', name }) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const baseClasses = 'w-full ps-6 py-2 max-w-[600px] border border-white rounded-full bg-transparent text-3xl focus:outline-none focus:ring-2 focus:ring-tailor-blue';
  const classes = `${baseClasses} ${additionalClasses}`;

  return (
    <div className="relative flex flex-col space-y-2 max-w-[600px]">
      <label className="text-white">{label}</label>
      <div className="relative">
        <input
          type={isPasswordVisible ? 'text' : 'password'}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          className={classes}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white"
        >
          {isPasswordVisible ? '🙈' : '👁️'}
        </button>
      </div>
    </div>
  );
};

export default InputPassword;
