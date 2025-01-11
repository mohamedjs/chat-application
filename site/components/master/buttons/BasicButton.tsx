import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { ButtonProps } from '@/components/ui/button';

interface BasicButtonProps extends ButtonProps {
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  loading?: boolean;
}

const BasicButton = React.forwardRef<HTMLButtonElement, BasicButtonProps>(
  (
    {
      children,
      variant = 'default',
      size = 'default',
      icon,
      iconPosition = 'right',
      fullWidth = false,
      loading = false,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const baseClasses = cn(
      'transition-colors duration-200',
      {
        'w-full': fullWidth,
        'opacity-50 cursor-not-allowed': disabled || loading,
        'bg-primary text-primary-foreground hover:bg-primary-hover': variant === 'default',
        'bg-secondary text-secondary-foreground hover:bg-secondary-hover': variant === 'secondary',
        'bg-destructive text-destructive-foreground hover:opacity-90': variant === 'destructive',
        'bg-background hover:bg-accent hover:text-accent-foreground': variant === 'ghost',
        'border border-input bg-background hover:bg-accent hover:text-accent-foreground': variant === 'outline',
      },
      className
    );

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={baseClasses}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <>
            {icon && iconPosition === 'left' && (
              <span className={cn("", { "mr-2": children })}>{icon}</span>
            )}
            {children}
            {icon && iconPosition === 'right' && (
              <span className={cn("", { "ml-2": children })}>{icon}</span>
            )}
          </>
        )}
      </Button>
    );
  }
);

BasicButton.displayName = 'BasicButton';

export default BasicButton;
