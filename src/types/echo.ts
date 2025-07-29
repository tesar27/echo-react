export interface Echo {
  id: number
  user_id: number
  content: string
  created_at: string
  updated_at: string
  user: {
    id: number
    username: string
    display_name: string
    avatar_url?: string
    bio?: string
  }
  likes_count: number
  is_liked: boolean
}

export interface CreateEchoRequest {
  content: string
}

export interface LikeRequest {
  echo_id: number
}
