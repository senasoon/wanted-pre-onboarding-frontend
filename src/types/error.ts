export interface CustomError extends Error {
  response?: {
    data: {
      statusCode?: number;
      message?: string;
      error?: string;
    };
    status: number;
    headers: string;
  };
}
