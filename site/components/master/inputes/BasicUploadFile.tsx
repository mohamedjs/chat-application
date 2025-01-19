import React, { ChangeEvent, forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { FormStatus } from './FormStatus';
import Image  from 'next/image';
import BasicInput from './BasicInput';

interface BasicUploadFileProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  success?: string;
  fullWidth?: boolean;
  containerClassName?: string;
  size?: 'default' | 'sm' | 'lg';
  name?: string;
  onChange?: (file: File | null) => void;
  setPreview?: any;
}

const BasicUploadFile = forwardRef<HTMLInputElement, BasicUploadFileProps>(
  (
    {
      label,
      error,
      success,
      fullWidth = true,
      className = '',
      containerClassName = '',
      size = 'md',
      name,
      onChange,
      setPreview,
      ...props
    },
    ref
  ) => {
    const status = error ? 'error' : success ? 'success' : undefined;

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
        onChange?.(file);
      } else {
        setPreview(null);
        onChange?.(null);
      }
    };

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
        <BasicInput
          ref={ref}
          type="file"
          name={name}
          accept="image/*"
          onChange={handleFileChange}
          className={className}
          size={size}
          error={error}
          success={success}
          {...props}
        />
        <FormStatus 
          message={error || success} 
          type={status as 'error' | 'success'} 
        />
      </div>
    );
  }
);

BasicUploadFile.displayName = 'BasicUploadFile';

export default BasicUploadFile;
