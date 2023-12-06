import { useEffect, useState } from 'react';

type IHookValue = string | number;

export const useDebounce = (value: IHookValue, delay: number = 500): IHookValue => {
  const [debouncedValue, setDebouncedValue] = useState<IHookValue>(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);

  return debouncedValue;
};
