import React, { SelectHTMLAttributes } from 'react';

export interface Option {
  value: string;
  label: string;
  icon?: string;
  additionalInfo?: string;
}

interface BasicSelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  label?: string;
  options: Option[];
  error?: string;
  isDarkTheme?: boolean;
  fullWidth?: boolean;
  containerClassName?: string;
  onChange?: (value: string) => void;
}

const BasicSelect = React.forwardRef<HTMLSelectElement, BasicSelectProps>(
  (
    {
      label,
      options,
      error,
      isDarkTheme = true,
      fullWidth = true,
      className = '',
      containerClassName = '',
      onChange,
      ...props
    },
    ref
  ) => {
    const baseSelectStyles = `
      p-3 
      rounded-lg 
      outline-none 
      focus:ring-2 
      focus:ring-[#8e68b4]
      ${isDarkTheme ? 'bg-[#0d0c22] text-white' : 'bg-[#e0e0e0] text-black'}
      ${fullWidth ? 'w-full' : ''}
      ${error ? 'border border-red-500' : ''}
    `;

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange?.(e.target.value);
    };

    return (
      <div className={`${containerClassName}`}>
        {label && (
          <label
            htmlFor={props.id}
            className={`block text-left mb-2 ${
              isDarkTheme ? 'text-white' : 'text-black'
            } ${props['aria-hidden'] ? 'sr-only' : ''}`}
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={`${baseSelectStyles} ${className}`}
            onChange={handleChange}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.icon && `${option.icon} `}
                {option.label}
                {option.additionalInfo && ` ${option.additionalInfo}`}
              </option>
            ))}
          </select>
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

BasicSelect.displayName = 'BasicSelect';

export default BasicSelect;