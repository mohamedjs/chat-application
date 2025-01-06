import React, { ButtonHTMLAttributes, ReactNode } from 'react';

interface BasicButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'icon';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  isDarkTheme?: boolean;
  loading?: boolean;
}

const BasicButton = React.forwardRef<HTMLButtonElement, BasicButtonProps>(
  (
    {
      children,
      variant = 'primary',
      icon,
      iconPosition = 'right',
      fullWidth = false,
      isDarkTheme = true,
      loading = false,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const getVariantClasses = () => {
      switch (variant) {
        case 'primary':
          return 'bg-[#8e68b4] hover:bg-[#6b4f8e] text-white font-semibold';
        case 'secondary':
          return `${isDarkTheme ? 'text-white' : 'text-black'} hover:text-[#8e68b4]`;
        case 'icon':
          return `text-[#8e68b4] hover:text-white ${
            isDarkTheme ? 'text-white' : 'text-black'
          }`;
        default:
          return '';
      }
    };

    const baseClasses = `
      ${variant !== 'icon' ? 'py-3 px-4' : 'p-2'}
      rounded-lg
      transition
      duration-200
      flex
      items-center
      justify-center
      ${fullWidth ? 'w-full' : ''}
      ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''}
      ${getVariantClasses()}
      ${className}
    `;

    return (
      <button
        ref={ref}
        className={baseClasses}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <span className="animate-spin mr-2">⌛</span>
        ) : (
          <>
            {icon && iconPosition === 'left' && (
              <span className={`${children ? 'mr-2' : ''}`}>{icon}</span>
            )}
            {children}
            {icon && iconPosition === 'right' && (
              <span className={`${children ? 'ml-2' : ''}`}>{icon}</span>
            )}
          </>
        )}
      </button>
    );
  }
);

BasicButton.displayName = 'BasicButton';

export default BasicButton;
