import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { IErrorResponse } from '@/types/response';

export const handlerQueryError = (err: unknown) => {
  if (err instanceof AxiosError && err.response?.data) {
    return toast.error('Something went wrong', {
      description:
        (err.response.data as IErrorResponse).message ||
        'please refresh the page and try again',
    });
  }

  return toast.error('Something went wrong', {
    description: 'please refresh the page and try again',
  });
};
