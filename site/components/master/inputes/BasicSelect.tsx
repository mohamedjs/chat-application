import React, { SelectHTMLAttributes, useState } from 'react';
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
import BasicInput from './BasicInput';
import { Search } from 'lucide-react';

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
  placeholder?: string;
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
      placeholder = '',
      ...props
    },
    ref
  ) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleValueChange = (newValue: string) => {
      onChange?.(newValue);
      setSearchTerm('')
    };

    const status = error ? 'error' : success ? 'success' : undefined;

    const filteredOptions = options.filter(option =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
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
        <Select value={value} onValueChange={handleValueChange}>
          <SelectTrigger
            className={className}
            variant={status as 'default' | 'error' | 'success'}
            size={size}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            <BasicInput
              placeholder="Search..."
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 border-b border-gray-300"
              size="sm"
            />
            {filteredOptions.map((option) => (
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