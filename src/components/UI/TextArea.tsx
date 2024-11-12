// components/TextArea.tsx
import React from 'react';

interface TextAreaProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const TextArea: React.FC<TextAreaProps> = ({ label, placeholder = '', value, onChange, className = '' }) => {
  return (
    <div className={`flex flex-col gap-y-4${className}`}>
      <label className="text-3xl">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full px-6 py-3 max-w-[600px] border border-black rounded-3xl bg-transparent text-3xl focus:outline-none focus:ring-2 focus:ring-tailor-blue"
      />
    </div>
  );
};

export default TextArea;
