export interface Res<T> {
    code: string;
    data: T;
    is_success: boolean;
    message: string;
}
