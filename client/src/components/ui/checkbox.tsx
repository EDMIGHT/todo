import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';

import { Icons } from '@/components/ui/icons';

type CheckboxProps = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'type'
>;

export const Checkbox: FC<CheckboxProps> = ({ id = 'check', ...rest }) => {
  return (
    <div className='inline-flex items-center'>
      <label className='relative flex items-center rounded-full cursor-pointer' htmlFor={id}>
        <input
          id={id}
          type='checkbox'
          className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-border transition-all checked:border-primary checked:bg-primary"
          {...rest}
        />
        <span className='absolute text-primary-foreground transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100'>
          <Icons.check className='w-4 h-4' />
        </span>
      </label>
    </div>
  );
};
