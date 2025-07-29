import { apiClient } from './api'
import type { Echo, CreateEchoRequest } from '../types/echo'

export class EchoService {
  static async getFeed(page = 1, limit = 20): Promise<Echo[]> {
    const response = await apiClient.get<{ echoes: Echo[] }>(`/echoes/feed?page=${page}&limit=${limit}`)
    return response.echoes || []
  }

  static async createEcho(data: CreateEchoRequest): Promise<Echo> {
    const response = await apiClient.post<{ echo: Echo }>('/echoes', data)
    return response.echo
  }

  static async likeEcho(echoId: number): Promise<{ message: string }> {
    const response = await apiClient.post<{ message: string }>(`/echoes/${echoId}/like`)
    return response
  }

  static async unlikeEcho(echoId: number): Promise<{ message: string }> {
    const response = await apiClient.delete<{ message: string }>(`/echoes/${echoId}/like`)
    return response
  }

  static async getEchoById(id: number): Promise<Echo> {
    const response = await apiClient.get<{ echo: Echo }>(`/echoes/${id}`)
    return response.echo
  }

  static async deleteEcho(id: number): Promise<{ message: string }> {
    const response = await apiClient.delete<{ message: string }>(`/echoes/${id}`)
    return response
  }

  static async getUserEchoes(userId: number, page = 1, limit = 20): Promise<Echo[]> {
    const response = await apiClient.get<{ echoes: Echo[] }>(`/users/${userId}/echoes?page=${page}&limit=${limit}`)
    return response.echoes || []
  }
}

export const echoService = EchoService
