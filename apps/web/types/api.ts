// API response types

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface HealthResponse {
  status: string;
  timestamp?: string;
}

// Add more types as you build your API
// Example:
// export interface User {
//   id: string;
//   email: string;
//   name: string;
//   createdAt: string;
// }
