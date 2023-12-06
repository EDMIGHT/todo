import { IErrorResponse, IValidationErrorResponse } from '@/types/response';

export const isErrorDataWithMessage = (obj: unknown): obj is IErrorResponse => {
  return obj !== null && typeof obj === 'object' && 'message' in obj;
};

export const isErrorDataWithDetails = (obj: unknown): obj is IValidationErrorResponse => {
  return obj !== null && typeof obj === 'object' && 'details' in obj;
};
