export interface Item {
  name: string;
}

export interface ApiResponse {
  success: boolean;
  message?: string;
  items: string[];
}