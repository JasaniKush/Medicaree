import React from 'react';

export const Logo = () => {
  return (
    <div className="flex items-center gap-2" >
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary"
      >
        <path
          d="M12 2L12 2C17.5228 2 22 6.47715 22 12V12C22 17.5228 17.5228 22 12 22V22C6.47715 22 2 17.5228 2 12V12C2 6.47715 6.47715 2 12 2V2Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M12 7L12 17"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7 12H17"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-bold text-xl text-foreground">MediCare</span>
    </div>
  );
};
