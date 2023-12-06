import { useEffect } from 'react';

export const useClickOutside = (
  ref: React.RefObject<HTMLElement>,
  callback: () => void,
  dependencies: readonly unknown[] = []
) => {
  const handleClick = (e: MouseEvent) => {
    if (ref && ref.current && !e.composedPath().includes(ref.current)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
};
