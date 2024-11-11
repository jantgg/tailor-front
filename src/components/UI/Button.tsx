// src/components/UI/Button.tsx

import React from 'react';
import Link from 'next/link';
import Spinner from './Spinner';

interface ButtonProps {
  text?: string; // Hacer `text` opcional para permitir usar solo `children`
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void | Promise<void>;
  href?: string;
  additionalClasses?: string;
  loading?: boolean;
  children?: React.ReactNode; // Permitir que se pase cualquier tipo de contenido
}

const Button: React.FC<ButtonProps> = ({ text, onClick, href, additionalClasses = '', loading = false, children }) => {
  const baseClasses = 'px-4 py-2 border border-gray-400 text-center inline-block flex justify-center items-center';
  const classes = `${baseClasses} ${additionalClasses}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children || text} {/* Renderizar children si existe, de lo contrario renderizar text */}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes} disabled={loading}>
      {loading ? <Spinner size="w-5 h-5" additionalClasses="mx-auto" /> : children || text}
      {/* Renderizar children si existe, de lo contrario renderizar text */}
    </button>
  );
};

export default Button;
