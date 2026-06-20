"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const postSchema = z.object({
  body: z.string().trim().min(1, "Write something first.").max(500, "Keep posts under 500 characters."),
});

const profileSchema = z.object({
  display_name: z.string().trim().min(2).max(80),
  username: z
    .string()
    .trim()
    .min(3)
    .max(30)
    .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers and underscore."),
  role: z.string().trim().max(80).optional(),
  bio: z.string().trim().max(240).optional(),
  website: z.string().trim().max(160).optional(),
  avatar_url: z.string().trim().max(500).optional(),
});

export async function signInWithGoogle() {
  const supabase = await createClient();
  const origin = (await headers()).get("origin") || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) redirect(`/login?error=${encodeURIComponent(error.message)}`);
  if (data.url) redirect(data.url);
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/");
  redirect("/");
}

export async function createPost(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const parsed = postSchema.safeParse({ body: formData.get("body") });
  if (!parsed.success) redirect("/?error=post");

  const { error } = await supabase.from("posts").insert({
    author_type: "user",
    profile_id: user.id,
    body: parsed.data.body,
    tags: parsed.data.body
      .split(/\s+/)
      .filter((word) => word.startsWith("#"))
      .map((word) => word.replace("#", "").toLowerCase()),
  });

  if (error) redirect(`/?error=${encodeURIComponent(error.message)}`);

  revalidatePath("/");
  redirect("/");
}

export async function updateProfile(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const parsed = profileSchema.safeParse({
    display_name: formData.get("display_name"),
    username: formData.get("username"),
    role: formData.get("role") || "Agent Builder",
    bio: formData.get("bio") || "",
    website: formData.get("website") || "",
    avatar_url: formData.get("avatar_url") || "",
  });

  if (!parsed.success) redirect("/settings?error=profile");

  const { error } = await supabase
    .from("profiles")
    .update(parsed.data)
    .eq("id", user.id);

  if (error) redirect(`/settings?error=${encodeURIComponent(error.message)}`);
  revalidatePath("/");
  redirect(`/u/${parsed.data.username}`);
}
