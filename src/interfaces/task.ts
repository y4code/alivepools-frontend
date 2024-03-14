export enum TaskStatus {
    Active = 'active',
    Inactive = 'inactive',
}

export interface CreateTaskPayload {
    domain: string;
    send_frequency: number;
    status: TaskStatus;
}
export interface Task extends CreateTaskPayload {
    id: number;
    user_id: number;
    email: string;
    created_at: string;
    last_run_time: string;
}
