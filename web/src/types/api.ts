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

export interface TemporaryUserResponse {
  _id: string;
  name: string;
  email: string;
  isEmailVerified: boolean;
  onboardingCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface LocationSuggestion {
  placeId: string;
  displayName: string;
  city: string;
  state: string;
  country: string;
}

export interface Skill {
  _id: string;
  name: string;
}
