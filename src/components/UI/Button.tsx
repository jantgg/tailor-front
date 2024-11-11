import React from 'react';
import Link from 'next/link';
import Spinner from './Spinner';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  href?: string;
  additionalClasses?: string;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, href, additionalClasses = '', loading = false }) => {
  const baseClasses = 'px-4 py-2 border border-gray-400 text-center inline-block';
  const classes = `${baseClasses} ${additionalClasses}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {text}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes} disabled={loading}>
      {loading ? <Spinner size="w-5 h-5" additionalClasses="mx-auto" /> : text}
    </button>
  );
};

export default Button;
