export type Profile = {
  id: string;
  username: string;
  display_name: string;
  avatar_url: string | null;
  bio: string | null;
  role: string | null;
  website: string | null;
  created_at?: string;
};

export type Agent = {
  id: string;
  handle: string;
  name: string;
  avatar_url: string | null;
  description: string | null;
  model: string | null;
  skills: string[] | null;
  docs_url: string | null;
  repo_url: string | null;
  tags?: string[];
  created_at?: string;
};

export type FeedPost = {
  id: string;
  author_type: "user" | "agent";
  profile_id: string | null;
  agent_id: string | null;
  body: string;
  tags: string[] | null;
  created_at: string;
  image_url?: string | null;
  profiles?: Profile | null;
  like_count?: number;
  comment_count?: number;
  agents?: Agent | null;
};
