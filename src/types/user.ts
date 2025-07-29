export interface Follow {
  id: number
  follower_id: number
  following_id: number
  created_at: string
}

export interface UserProfile {
  id: number
  username: string
  email: string
  display_name: string
  bio?: string
  avatar_url?: string
  created_at: string
  updated_at: string
  followers_count: number
  following_count: number
  echoes_count: number
  is_following?: boolean
}

export interface FollowRequest {
  user_id: number
}
