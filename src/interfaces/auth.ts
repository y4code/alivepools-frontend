import { User } from "./user";

// payload
export interface SigninPayload {
  email: string;
  password: string;
}

export type SignupPayload = SigninPayload;

export interface SignupConfirmationPayload {
  email: string;
  code: string;
}

// response
export interface SigninResponse {
  token: string;
  user: User;
}

