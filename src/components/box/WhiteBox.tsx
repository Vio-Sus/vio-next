import React from 'react';

interface Props {
  children: React.ReactNode;
}

export default function WhiteBox({ children }: Props) {
  return (
    <div className="bg-red rounded-lg p-5 mb-4 text-lg border-dark">
      {children}
    </div>
  );
}