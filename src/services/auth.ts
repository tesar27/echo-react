import { apiClient } from './api'
import type {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  EmailVerificationRequest,
} from '../types/auth'

export class AuthService {
  private static readonly TOKEN_KEY = 'auth_token'
  private static readonly USER_KEY = 'auth_user'

  static async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/register', credentials)
    return response
  }

  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials)
    
    if (response.token) {
      this.setToken(response.token)
      this.setUser(response.user)
    }
    
    return response
  }

  static async verifyEmail(token: string): Promise<{ message: string }> {
    const response = await apiClient.get<{ message: string }>(`/auth/verify-email?token=${token}`)
    return response
  }

  static async resendVerification(data: EmailVerificationRequest): Promise<{ message: string }> {
    const response = await apiClient.post<{ message: string }>('/auth/resend-verification', data)
    return response
  }

  static logout(): void {
    localStorage.removeItem(this.TOKEN_KEY)
    localStorage.removeItem(this.USER_KEY)
  }

  static getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY)
  }

  static setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token)
  }

  static getUser(): any | null {
    const user = localStorage.getItem(this.USER_KEY)
    return user ? JSON.parse(user) : null
  }

  static setUser(user: any): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user))
  }

  static isAuthenticated(): boolean {
    return this.getToken() !== null
  }
}

export const authService = AuthService
