import React from 'react';

export const Card = ({ children, className }) => (
  <div className={`bg-white shadow-md rounded-lg p-4 ${className}`}>
    {children}
  </div>
);

export const CardHeader = ({ children, className }) => (
  <div className={`border-b p-4 ${className}`}>
    {children}
  </div>
);

export const CardTitle = ({ children, className }) => (
  <h2 className={`text-xl font-bold ${className}`}>
    {children}
  </h2>
);

export const CardContent = ({ children, className }) => (
  <div className={`p-4 ${className}`}>
    {children}
  </div>
);

export const CardFooter = ({ children, className }) => (
  <div className={`border-t p-4 ${className}`}>
    {children}
  </div>
);

export const CardDescription = ({ children, className }) => (
  <p className={`text-gray-600 ${className}`}>
    {children}
  </p>
);
