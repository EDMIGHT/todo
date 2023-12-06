import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { isErrorDataWithDetails, isErrorDataWithMessage } from '@/lib/type-guards';
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

export const handlerQueryValidationError = (err: unknown) => {
  if (err instanceof AxiosError && err.response?.data) {
    if (isErrorDataWithDetails(err.response.data) && err.response.data.details.length > 0) {
      return toast.error('Validation Error', {
        description: err.response.data.details[0].msg,
      });
    }

    if (isErrorDataWithMessage(err.response.data)) {
      return toast.error('Something went wrong', {
        description:
          (err.response.data as IErrorResponse).message ||
          'please refresh the page and try again',
      });
    }
  }

  return toast.error('Something went wrong', {
    description: 'please refresh the page and try again',
  });
};
