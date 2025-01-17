import React, { InputHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormStatus } from './FormStatus';

interface BasicInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  label?: string;
  error?: string;
  success?: string;
  fullWidth?: boolean;
  containerClassName?: string;
  size?: 'default' | 'sm' | 'lg';
  name?: string;
}

const BasicInput = React.forwardRef<HTMLInputElement, BasicInputProps>(
  (
    {
      icon,
      iconPosition = 'left',
      label,
      error,
      success,
      fullWidth = true,
      className = '',
      containerClassName = '',
      size = 'default',
      name,
      ...props
    },
    ref
  ) => {
    const status = error ? 'error' : success ? 'success' : undefined;
    
    const getIconPosition = () => {
      switch (size) {
        case 'sm':
          return iconPosition === 'left' ? 'left-2' : 'right-2';
        case 'lg':
          return iconPosition === 'left' ? 'left-4' : 'right-4';
        default:
          return iconPosition === 'left' ? 'left-3' : 'right-3';
      }
    };

    const getInputPadding = () => {
      if (!icon) return '';
      
      const padding = {
        sm: '8',
        default: '10',
        lg: '12'
      }[size];

      return iconPosition === 'left' ? `pl-${padding}` : `pr-${padding}`;
    };

    const IconWrapper = () => (
      <div className={cn(
        "absolute inset-y-0 flex items-center pointer-events-none text-muted-foreground",
        getIconPosition()
      )}>
        {icon}
      </div>
    );

    return (
      <div className={cn(
        'flex flex-col gap-1.5',
        fullWidth && 'w-full',
        containerClassName
      )}>
        {label && (
          <Label className="text-sm font-medium text-left">
            {label}
          </Label>
        )}
        <div className="relative">
          {icon && iconPosition === 'left' && <IconWrapper />}
          <Input
            ref={ref}
            className={cn(
              getInputPadding(),
              className
            )}
            variant={status as 'default' | 'error' | 'success'}
            inputSize={size}
            name={name}
            {...props}
          />
          {icon && iconPosition === 'right' && <IconWrapper />}
        </div>
        <FormStatus 
          message={error || success} 
          type={status as 'error' | 'success'} 
        />
      </div>
    );
  }
);

BasicInput.displayName = 'BasicInput';

export default BasicInput;