import React, { SelectHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FormStatus } from './FormStatus';

export interface Option {
  value: string;
  label: string;
  icon?: string;
  additionalInfo?: string;
}

interface BasicSelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange' | 'size'> {
  label?: string;
  options: Option[];
  error?: string;
  success?: string;
  fullWidth?: boolean;
  containerClassName?: string;
  onChange?: (value: string) => void;
  value?: string;
  size?: 'default' | 'sm' | 'lg';
}

const BasicSelect = React.forwardRef<HTMLSelectElement, BasicSelectProps>(
  (
    {
      label,
      options,
      error,
      success,
      fullWidth = true,
      className = '',
      containerClassName = '',
      onChange,
      value,
      size = 'default',
      ...props
    },
    ref
  ) => {
    const handleValueChange = (newValue: string) => {
      onChange?.(newValue);
    };

    const status = error ? 'error' : success ? 'success' : undefined;

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
        <Select value={value} onValueChange={handleValueChange}>
          <SelectTrigger
            className={className}
            variant={status as 'default' | 'error' | 'success'}
            size={size}
          >
            <SelectValue placeholder={props.placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem 
                key={option.value} 
                value={option.value}
                className={cn(
                  size === 'sm' && "py-1 text-xs",
                  size === 'lg' && "py-2 text-base"
                )}
              >
                {option.icon && `${option.icon} `}
                {option.label}
                {option.additionalInfo && ` ${option.additionalInfo}`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FormStatus 
          message={error || success} 
          type={status as 'error' | 'success'} 
        />
      </div>
    );
  }
);

BasicSelect.displayName = 'BasicSelect';

export default BasicSelect;