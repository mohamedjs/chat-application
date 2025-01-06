import React from 'react';

interface BasicHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  isDarkTheme?: boolean;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

const BasicHeader: React.FC<BasicHeaderProps> = ({
  title,
  subtitle,
  className = '',
  titleClassName = '',
  subtitleClassName = '',
  isDarkTheme = true,
  level = 1
}) => {
  const HeaderTag = `h${level}` as keyof JSX.IntrinsicElements;
  
  const defaultTitleClasses = `${isDarkTheme ? 'text-white' : 'text-black'} font-semibold`;
  const defaultSubtitleClasses = `${isDarkTheme ? 'text-gray-400' : 'text-gray-600'} text-sm`;

  return (
    <div className={`text-center ${className}`}>
      <HeaderTag className={`${defaultTitleClasses} ${titleClassName}`}>
        {title}
      </HeaderTag>
      {subtitle && (
        <p className={`${defaultSubtitleClasses} ${subtitleClassName}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default BasicHeader;
