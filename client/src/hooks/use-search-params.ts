import { useEffect, useState } from 'react';

type HookResult = string | undefined;

export const useSearchParams = (key: string): HookResult => {
  const [value, setValue] = useState<HookResult>();

  useEffect(() => {
    const handleLocationChange = () => {
      const queryParams = new URLSearchParams(window.location.search);
      console.log(queryParams);
      setValue(queryParams.get(key) || undefined);
    };

    handleLocationChange();

    window.addEventListener('searchparamschange', handleLocationChange);

    return () => {
      window.removeEventListener('searchparamschange', handleLocationChange);
    };
  }, [key]);

  return value;
};
