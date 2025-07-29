import { apiClient } from './api'
import type { UserProfile } from '../types/user'

export class UserService {
  static async getUserProfile(userId: number): Promise<UserProfile> {
    const response = await apiClient.get<{ user: UserProfile }>(`/users/${userId}`)
    return response.user
  }

  static async followUser(userId: number): Promise<{ message: string }> {
    const response = await apiClient.post<{ message: string }>(`/users/${userId}/follow`)
    return response
  }

  static async unfollowUser(userId: number): Promise<{ message: string }> {
    const response = await apiClient.delete<{ message: string }>(`/users/${userId}/follow`)
    return response
  }

  static async getFollowers(userId: number, page = 1, limit = 20): Promise<UserProfile[]> {
    const response = await apiClient.get<{ users: UserProfile[] }>(`/users/${userId}/followers?page=${page}&limit=${limit}`)
    return response.users || []
  }

  static async getFollowing(userId: number, page = 1, limit = 20): Promise<UserProfile[]> {
    const response = await apiClient.get<{ users: UserProfile[] }>(`/users/${userId}/following?page=${page}&limit=${limit}`)
    return response.users || []
  }

  static async getSuggestedUsers(limit = 5): Promise<UserProfile[]> {
    const response = await apiClient.get<{ users: UserProfile[] }>(`/users/suggestions?limit=${limit}`)
    return response.users || []
  }

  static async searchUsers(query: string, page = 1, limit = 20): Promise<UserProfile[]> {
    const response = await apiClient.get<{ users: UserProfile[] }>(`/users/search?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`)
    return response.users || []
  }

  static async updateProfile(data: Partial<UserProfile>): Promise<UserProfile> {
    const response = await apiClient.put<{ user: UserProfile }>('/users/profile', data)
    return response.user
  }
}

export const userService = UserService
