import React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface FormStatusProps {
  message?: string;
  className?: string;
  type?: 'error' | 'success';
}

export const FormStatus: React.FC<FormStatusProps> = ({
  message,
  className,
  type = 'error'
}) => {
  if (!message) return null;

  const isError = type === 'error';
  const Icon = isError ? AlertCircle : CheckCircle2;
  
  return (
    <div
      className={cn(
        "flex items-center gap-x-2 text-left",
        isError ? "text-destructive" : "text-green-500",
        className
      )}
    >
      <Icon className="h-4 w-4" />
      <p className="text-sm">
        {message}
      </p>
    </div>
  );
};
