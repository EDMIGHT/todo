import { FC, useEffect, useState } from 'react';

import { Icons } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/use-debounce';

export const Search: FC = () => {
  const initialTitle = new URLSearchParams(window.location.search).get('title') || '';

  const [inputValue, setInputValue] = useState(initialTitle);
  const [isChanged, setIsChanged] = useState(false);
  const debouncedValue = useDebounce(inputValue);

  useEffect(() => {
    if (isChanged) {
      const queryParams = new URLSearchParams(window.location.search);
      queryParams.set('title', debouncedValue.toString().trim());

      window.history.replaceState(null, '', `?${queryParams.toString()}`);
      window.dispatchEvent(new Event('searchparamschange'));
    }
  }, [debouncedValue, isChanged]);

  return (
    <div className='relative w-full'>
      <Icons.search className='absolute left-2 top-1/2 -translate-y-1/2' />
      <Input
        type='text'
        placeholder='todo title..'
        className='py-2 pl-10 w-full'
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          !isChanged && setIsChanged(true);
        }}
      />
    </div>
  );
};
