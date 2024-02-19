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

enum EmailStatus {
  Verified = 'verified',
  Unverified = 'unverified',
}

interface User {
  id: number;
  email: string;
  emailStatus: EmailStatus;
  password: string;
}

interface Task {
  id: number;
  userId: number;
  domain: string;
  email: string;
  sendFrequency: string;
  createAt: Date;
}
