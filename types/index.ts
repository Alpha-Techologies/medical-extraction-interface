export interface SignupCredentials {
  email: string;
  password: string;
  user_Type?: string;
}
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupApiResponse {
  id: string;
  message: string;
  success: boolean;
  error?: string[];
  statusCode: number;
}
export interface LoginApiResponse {
  success: boolean;
  message: string;
  id: string;
  email: string;
  isVerified: boolean;
  accessToken: string;
  refresh_Token: string;
  refresh_Token_Expiry_Date: string;
  access_Token_Expiry_Date: string;
}
