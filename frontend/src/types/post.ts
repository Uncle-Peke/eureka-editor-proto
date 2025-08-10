export interface Post {
  id: string;
  content: string;
  username: string;
  userHandle: string;
  timestamp: string;
  likes: number;
  reposts: number;
  replies: number;
}

export interface User {
  username: string;
  userHandle: string;
  avatar?: string;
}
