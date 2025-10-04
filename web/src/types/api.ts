export interface ApiResponse<T = unknown> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export interface ApiError {
  success: boolean;
  statusCode: number;
  message: string;
  errors: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
}
