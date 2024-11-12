// src/components/UI/Input.tsx
import React from 'react';

interface InputProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  additionalClasses?: string;
  name: string;
}

const Input: React.FC<InputProps> = ({ label, placeholder = '', value, onChange, additionalClasses = '', name }) => {
  const baseClasses = 'w-full ps-6 py-2 max-w-[600px] border rounded-full bg-transparent text-3xl focus:outline-none focus:ring-2 focus:ring-tailor-blue';
  const classes = `${baseClasses} ${additionalClasses}`;

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-3xl">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        className={classes}
      />
    </div>
  );
};

export default Input;
