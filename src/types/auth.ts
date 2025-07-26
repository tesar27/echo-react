export interface User {
  id: string
  username: string
  email: string
  display_name: string
  email_verified: boolean
  created_at: string
  updated_at: string
}

export interface AuthResponse {
  user: User
  token?: string
  message?: string
}

export interface LoginCredentials {
  username: string
  password: string
}

export interface RegisterCredentials {
  username: string
  email: string
  password: string
  display_name: string
}

export interface ApiError {
  message: string
  status?: number
}

export interface EmailVerificationRequest {
  email: string
}
