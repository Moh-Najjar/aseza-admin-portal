export interface ApiResponse<T> {
    success: true;
    statusCode: number;
    message: string;
    data: T;
    timestamp: string;
}
export interface ApiErrorResponse {
    success: false;
    statusCode: number;
    message: string | string[];
    error: string;
    path: string;
    timestamp: string;
}
export interface Paginated<T> {
    items: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}
