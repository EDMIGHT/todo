import { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...rest }, ref) => {
    return <input ref={ref} className={cn('border-b border-border', className)} {...rest} />;
  }
);

Input.displayName = 'Input';
