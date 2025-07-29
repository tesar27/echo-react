import { useState, useCallback, useEffect } from 'react'
import { userService } from '../services/user'
import type { UserProfile } from '../types/user'

export function useUsers() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [suggestedUsers, setSuggestedUsers] = useState<UserProfile[]>([])

  useEffect(() => {
    loadSuggestedUsers()
  }, [])

  const loadSuggestedUsers = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const users = await userService.getSuggestedUsers(5)
      setSuggestedUsers(users)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load suggestions')
    } finally {
      setLoading(false)
    }
  }, [])

  const followUser = useCallback(async (userId: number) => {
    try {
      setError(null)
      await userService.followUser(userId)
      // Update the local state
      setSuggestedUsers(prev => 
        prev.map(user => 
          user.id === userId 
            ? { ...user, is_following: true, followers_count: user.followers_count + 1 }
            : user
        )
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to follow user')
      throw err
    }
  }, [])

  const unfollowUser = useCallback(async (userId: number) => {
    try {
      setError(null)
      await userService.unfollowUser(userId)
      // Update the local state
      setSuggestedUsers(prev => 
        prev.map(user => 
          user.id === userId 
            ? { ...user, is_following: false, followers_count: Math.max(0, user.followers_count - 1) }
            : user
        )
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to unfollow user')
      throw err
    }
  }, [])

  const getSuggestedUsers = useCallback(async (limit = 5): Promise<UserProfile[]> => {
    try {
      setLoading(true)
      setError(null)
      const users = await userService.getSuggestedUsers(limit)
      return users
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get suggestions')
      return []
    } finally {
      setLoading(false)
    }
  }, [])

  const searchUsers = useCallback(async (query: string): Promise<UserProfile[]> => {
    try {
      setLoading(true)
      setError(null)
      const users = await userService.searchUsers(query)
      return users
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search users')
      return []
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    loading,
    error,
    suggestedUsers,
    followUser,
    unfollowUser,
    getSuggestedUsers,
    searchUsers
  }
}
