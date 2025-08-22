export class ApiResponseDto<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;

  static success<T>(data: T, message?: string): ApiResponseDto<T> {
    return {
      success: true,
      data,
      message,
    };
  }

  static error(message: string, error?: string): ApiResponseDto<never> {
    return {
      success: false,
      message,
      error,
    };
  }
}
