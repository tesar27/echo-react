import { useState, useEffect, useCallback } from 'react'
import { echoService } from '../services/echo'
import type { Echo, CreateEchoRequest } from '../types/echo'

export function useEchoes() {
  const [echoes, setEchoes] = useState<Echo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchEchoes = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await echoService.getFeed()
      setEchoes(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch echoes')
    } finally {
      setLoading(false)
    }
  }, [])

  const createEcho = useCallback(async (data: CreateEchoRequest) => {
    try {
      const newEcho = await echoService.createEcho(data)
      setEchoes(prev => [newEcho, ...prev])
      return newEcho
    } catch (err) {
      throw err
    }
  }, [])

  const likeEcho = useCallback(async (echoId: number) => {
    try {
      await echoService.likeEcho(echoId)
      setEchoes(prev => prev.map(echo => 
        echo.id === echoId 
          ? { 
              ...echo, 
              is_liked: true, 
              likes_count: echo.likes_count + 1 
            }
          : echo
      ))
    } catch (err) {
      throw err
    }
  }, [])

  const unlikeEcho = useCallback(async (echoId: number) => {
    try {
      await echoService.unlikeEcho(echoId)
      setEchoes(prev => prev.map(echo => 
        echo.id === echoId 
          ? { 
              ...echo, 
              is_liked: false, 
              likes_count: Math.max(0, echo.likes_count - 1) 
            }
          : echo
      ))
    } catch (err) {
      throw err
    }
  }, [])

  const deleteEcho = useCallback(async (echoId: number) => {
    try {
      await echoService.deleteEcho(echoId)
      setEchoes(prev => prev.filter(echo => echo.id !== echoId))
    } catch (err) {
      throw err
    }
  }, [])

  useEffect(() => {
    fetchEchoes()
  }, [fetchEchoes])

  return {
    echoes,
    loading,
    error,
    fetchEchoes,
    createEcho,
    likeEcho,
    unlikeEcho,
    deleteEcho
  }
}
