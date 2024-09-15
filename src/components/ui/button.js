import React from 'react';

export const Button = ({ children, className, ...props }) => (
  <button className={`px-4 py-2 bg-emerald-500 text-white rounded hover:bg-slate-600 ${className}`} {...props}>
    {children}
  </button>
);
