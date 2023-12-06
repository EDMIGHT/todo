export type IErrorResponse = {
  message: string;
};

export type IValidationErrorDetail = {
  type: string;
  value: string;
  msg: string;
  path: string;
  location: string;
};

export type IValidationErrorResponse = IErrorResponse & {
  details: IValidationErrorDetail[];
};
