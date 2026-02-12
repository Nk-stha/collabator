export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly fieldErrors?: Record<string, string[]>
  ) {
    super(message);
    this.name = 'ApiError';
  }

  get isNetworkError(): boolean {
    return this.status === 0;
  }

  get isAuthError(): boolean {
    return this.status === 401 || this.status === 403;
  }

  get isServerError(): boolean {
    return this.status >= 500;
  }

  get isValidationError(): boolean {
    return this.status === 422 || this.status === 400;
  }

  get isNotFound(): boolean {
    return this.status === 404;
  }

  static networkError(detail?: string): ApiError {
    return new ApiError(
      0,
      detail || 'Unable to connect to the server. Please check your internet connection.'
    );
  }
}
