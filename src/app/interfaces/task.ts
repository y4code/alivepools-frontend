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
