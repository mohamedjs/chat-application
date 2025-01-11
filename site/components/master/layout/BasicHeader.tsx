import React from 'react';
import { cn } from '@/lib/utils';

interface BasicHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

const BasicHeader: React.FC<BasicHeaderProps> = ({
  title,
  subtitle,
  className = '',
  titleClassName = '',
  subtitleClassName = '',
  level = 1
}) => {
  const HeaderTag = `h${level}` as keyof JSX.IntrinsicElements;
  return (
    <div className={cn("text-center", className)}>
      <HeaderTag className={cn(
        "text-foreground font-semibold",
        titleClassName
      )}>
        {title}
      </HeaderTag>
      {subtitle && (
        <p className={cn(
          "text-muted-foreground text-sm",
          subtitleClassName
        )}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default BasicHeader;
