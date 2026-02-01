import React from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  light?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ 
  title, 
  subtitle, 
  align = 'center',
  light = false 
}) => {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';
  const titleColor = light ? 'text-white' : 'text-gray-900';
  const subtitleColor = light ? 'text-brand-100' : 'text-gray-500';

  return (
    <div className={`max-w-3xl mb-12 ${alignClass}`}>
      <h2 className={`text-3xl md:text-4xl font-bold tracking-tight mb-4 ${titleColor}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg md:text-xl ${subtitleColor}`}>
          {subtitle}
        </p>
      )}
      <div className={`mt-4 h-1 w-20 bg-accent-500 rounded ${align === 'center' ? 'mx-auto' : ''}`}></div>
    </div>
  );
};