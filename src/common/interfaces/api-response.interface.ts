/** Standard envelope for every successful API response */
export interface ApiResponse<T> {
  success: true;
  statusCode: number;
  message: string;
  data: T;
  timestamp: string;
}

/** Standard envelope for every error API response */
export interface ApiErrorResponse {
  success: false;
  statusCode: number;
  message: string | string[];
  error: string;
  path: string;
  timestamp: string;
}

/**
 * Standard shape for paginated list endpoints.
 * Returned inside ApiResponse.data so the outer wrapper stays consistent.
 */
export interface Paginated<T> {
  /** The records for the current page */
  items: T[];
  /** Total number of records matching the filter (across all pages) */
  total: number;
  /** Current 1-based page number */
  page: number;
  /** Number of items per page */
  pageSize: number;
  /** Total number of pages */
  totalPages: number;
}
