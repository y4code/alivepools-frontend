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