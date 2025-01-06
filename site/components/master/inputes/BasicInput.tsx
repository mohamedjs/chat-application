import React, { InputHTMLAttributes, ReactNode } from 'react';

interface BasicInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  isDarkTheme?: boolean;
  label?: string;
  error?: string;
  fullWidth?: boolean;
  containerClassName?: string;
}

const BasicInput = React.forwardRef<HTMLInputElement, BasicInputProps>(
  (
    {
      icon,
      isDarkTheme = true,
      label,
      error,
      fullWidth = true,
      className = '',
      containerClassName = '',
      ...props
    },
    ref
  ) => {
    const baseInputStyles = `
      p-3 
      rounded-lg 
      outline-none 
      focus:ring-2 
      focus:ring-[#8e68b4]
      ${isDarkTheme ? 'bg-[#0d0c22] text-white' : 'bg-[#e0e0e0] text-black'}
      ${fullWidth ? 'w-full' : ''}
      ${error ? 'border border-red-500' : ''}
    `;

    return (
      <div className={`relative ${containerClassName}`}>
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
          <input
            ref={ref}
            className={`${baseInputStyles} ${icon ? 'pr-10' : ''} ${className}`}
            {...props}
          />
          {icon && (
            <span className={`absolute top-1/2 right-3 transform -translate-y-1/2 ${
              isDarkTheme ? 'text-[#8e68b4]' : 'text-black'
            }`}>
              {icon}
            </span>
          )}
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

BasicInput.displayName = 'BasicInput';

export default BasicInput;