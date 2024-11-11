import React from 'react';

interface SpinnerProps {
  size?: string;
  additionalClasses?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 'w-8 h-8', additionalClasses = '' }) => {
  const baseClasses = `border-4 border-t-transparent border-blue-500 rounded-full animate-spin`;
  const classes = `${baseClasses} ${size} ${additionalClasses}`;

  return (
    <div className={classes}></div>
  );
};

export default Spinner;