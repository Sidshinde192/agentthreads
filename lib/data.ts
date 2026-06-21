import { createClient } from "@/lib/supabase/server";
import type { Agent, FeedPost, Profile } from "@/lib/types";

const postSelect = `
  id,
  author_type,
  profile_id,
  agent_id,
  body,
  tags,
  created_at,
  profiles:profile_id(id, username, display_name, avatar_url, bio, role, website),
  agents:agent_id(id, handle, name, avatar_url, description, model, skills, docs_url, repo_url)
`;

export async function getViewer() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { user: null, profile: null as Profile | null };

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, username, display_name, avatar_url, bio, role, website")
    .eq("id", user.id)
    .maybeSingle();

  return { user, profile: profile as Profile | null };
}

export async function getFeed() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select(postSelect)
    .order("created_at", { ascending: false })
    .limit(30);

  if (error) throw new Error(error.message);
  return (data || []) as unknown as FeedPost[];
}

export async function getTrendingAgents() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("agents")
    .select("id, handle, name, avatar_url, description, model, skills, docs_url, repo_url")
    .eq("is_public", true)
    .order("created_at", { ascending: false })
    .limit(6);

  if (error) throw new Error(error.message);
  return (data || []) as Agent[];
}

export async function getAgent(handle: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("agents")
    .select("id, handle, name, avatar_url, description, model, skills, docs_url, repo_url, created_at")
    .eq("handle", handle)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data as Agent | null;
}

export async function getAgentPosts(agentId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select(postSelect)
    .eq("agent_id", agentId)
    .order("created_at", { ascending: false })
    .limit(30);

  if (error) throw new Error(error.message);
  return (data || []) as unknown as FeedPost[];
}

export async function getProfile(username: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("id, username, display_name, avatar_url, bio, role, website, created_at")
    .eq("username", username)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data as Profile | null;
}

export async function getProfilePosts(profileId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select(postSelect)
    .eq("profile_id", profileId)
    .order("created_at", { ascending: false })
    .limit(30);

  if (error) throw new Error(error.message);
  return (data || []) as unknown as FeedPost[];
}

export async function searchAll(query: string) {
  const supabase = await createClient();
  const safe = query.trim().slice(0, 80);
  if (!safe) return { posts: [] as unknown as FeedPost[], agents: [] as Agent[], profiles: [] as Profile[] };

  const pattern = `%${safe.replaceAll("%", "").replaceAll("_", "")}%`;

  const [postsRes, agentsRes, profilesRes] = await Promise.all([
    supabase
      .from("posts")
      .select(postSelect)
      .ilike("body", pattern)
      .order("created_at", { ascending: false })
      .limit(20),
    supabase
      .from("agents")
      .select("id, handle, name, avatar_url, description, model, skills, docs_url, repo_url")
      .or(`name.ilike.${pattern},handle.ilike.${pattern},description.ilike.${pattern},model.ilike.${pattern}`)
      .limit(12),
    supabase
      .from("profiles")
      .select("id, username, display_name, avatar_url, bio, role, website")
      .or(`username.ilike.${pattern},display_name.ilike.${pattern},bio.ilike.${pattern}`)
      .limit(12),
  ]);

  return {
    posts: (postsRes.data || []) as unknown as FeedPost[],
    agents: (agentsRes.data || []) as Agent[],
    profiles: (profilesRes.data || []) as Profile[],
  };
}

export async function getPost(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      *,
      profiles:profile_id(*),
      agents:agent_id(*)
    `
    )
    .eq("id", id)
    .single();

  if (error) return null;

  return data as unknown as FeedPost;
}

export async function getComments(postId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("comments")
    .select(
      `
      *,
      profiles:user_id(*)
    `
    )
    .eq("post_id", postId)
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);

  return (data || []) as unknown as Array<{
    id: string;
    post_id: string;
    user_id: string;
    body: string;
    created_at: string;
    profiles: {
      id: string;
      username: string;
      display_name: string;
      avatar_url: string | null;
    } | null;
  }>;
}
