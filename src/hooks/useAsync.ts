import { useState, useCallback } from 'react'

interface UseAsyncState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

interface UseAsyncReturn<T> extends UseAsyncState<T> {
  execute: (...args: any[]) => Promise<T | undefined>
  reset: () => void
}

export function useAsync<T>(
  asyncFunction: (...args: any[]) => Promise<T>
): UseAsyncReturn<T> {
  const [state, setState] = useState<UseAsyncState<T>>({
    data: null,
    loading: false,
    error: null,
  })

  const execute = useCallback(
    async (...args: any[]): Promise<T | undefined> => {
      setState(prev => ({ ...prev, loading: true, error: null }))
      
      try {
        const response = await asyncFunction(...args)
        setState({ data: response, loading: false, error: null })
        return response
      } catch (error) {
        setState({ 
          data: null, 
          loading: false, 
          error: error instanceof Error ? error.message : 'An error occurred' 
        })
        throw error
      }
    },
    [asyncFunction]
  )

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null })
  }, [])

  return {
    ...state,
    execute,
    reset,
  }
}
