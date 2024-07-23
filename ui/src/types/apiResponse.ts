export interface ApiResponse<T> {
  status: boolean;
  message: string;
  entity: T | null;
}
