export interface Email {
  email: string;
}

export interface EmailWithOtp {
  email: string;
  otp: string;
}

export interface CheckDomainPayload {
  website: string;
}
export interface Message {
  message: string;
}

export interface Token {
  token: string;
}

export enum EmailStatus {
  Verified = 'verified',
  Unverified = 'unverified',
}

export interface User {
  id: number;
  email: string;
  email_status: EmailStatus;
  created_at: string;
}

export interface Task {
  id: number;
  user_id: number;
  domain: string;
  email: string;
  send_frequency: string;
  created_at: string;
  status: string;
  last_run_time: string;
  next_run_time: string;
}


export interface Res<T> {
  code: string;
  data: T;
  is_success: boolean;
  message: string;
}

export enum ErrorCode {
  OK = "20000",
  ERROR = 'ERROR',
  WEBSITE_NOT_AVAILABLE = 'WEBSITE_NOT_AVAILABLE',
  WEBSITE_NOT_FOUND = 'WEBSITE_NOT_FOUND',
  TASK_NOT_FOUND = 'TASK_NOT_FOUND',
  EMAIL_AND_PASSWORD_REQUIRED = 'EMAIL_AND_PASSWORD_REQUIRED',
  INVALID_EMAIL = 'INVALID_EMAIL',
  INVALID_PASSWORD = 'INVALID_PASSWORD',
  EMAIL_ALREADY_EXISTS = 'EMAIL_ALREADY_EXISTS',
  INCORRECT_EMAIL_OR_VERIFICATION_CODE = 'INCORRECT_EMAIL_OR_VERIFICATION_CODE',
  INCORRECT_EMAIL_OR_PASSWORD = 'INCORRECT_EMAIL_OR_PASSWORD',
}

export const errorMessageMap: Record<ErrorCode, string> = {
  [ErrorCode.OK]: 'Success',
  [ErrorCode.ERROR]: 'An error occurred',
  [ErrorCode.WEBSITE_NOT_AVAILABLE]: 'Website is not available',
  [ErrorCode.WEBSITE_NOT_FOUND]: 'Website not found',
  [ErrorCode.TASK_NOT_FOUND]: 'Task not found',
  [ErrorCode.EMAIL_AND_PASSWORD_REQUIRED]: 'Email and password are required',
  [ErrorCode.INVALID_EMAIL]: 'Invalid email',
  [ErrorCode.INVALID_PASSWORD]: 'Invalid password',
  [ErrorCode.EMAIL_ALREADY_EXISTS]: 'Email already exists',
  [ErrorCode.INCORRECT_EMAIL_OR_VERIFICATION_CODE]: 'Incorrect email or verification code',
  [ErrorCode.INCORRECT_EMAIL_OR_PASSWORD]: 'Incorrect email or password',
};

export function getErrorMessage(errorCode: string): string {
  return errorMessageMap[errorCode as ErrorCode] || 'Unknown error';
}
