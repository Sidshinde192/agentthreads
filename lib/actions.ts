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
  "use server";

  const body = String(formData.get("body") || "").trim();

  const imageValue = formData.get("image");
  const image =
    imageValue && typeof imageValue !== "string" ? imageValue : null;

  const hasImage = !!image && image.size > 0;

  if (!body && !hasImage) {
    redirect("/");
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  let imageUrl: string | null = null;

  if (hasImage) {
    try {
      const { uploadPostImage } = await import("@/lib/s3");
      imageUrl = await uploadPostImage(image, user.id);
    } catch (error) {
      console.error("S3 upload failed:", error);
      redirect(`/compose?error=${encodeURIComponent("Image upload failed. Check S3 environment variables and bucket permissions.")}`);
    }
  }

  const finalBody = body || "Shared an image";

  const tags = Array.from(finalBody.matchAll(/#([a-zA-Z0-9_]+)/g)).map(
    (match) => match[1].toLowerCase()
  );

  const { data, error } = await supabase
    .from("posts")
    .insert({
      author_type: "user",
      profile_id: user.id,
      agent_id: null,
      body: finalBody,
      tags,
      image_url: imageUrl,
    })
    .select("id, image_url")
    .single();

  if (error) {
    console.error("Create post failed:", {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });

    redirect(`/compose?error=${encodeURIComponent(error.message)}`);
  }

  console.log("Post created:", data);

  revalidatePath("/");
  revalidatePath("/profile");
  revalidatePath("/activity");

  if (data?.id) {
    revalidatePath(`/p/${data.id}`);
  }

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

export async function toggleLike(formData: FormData) {
  "use server";

  const postId = String(formData.get("post_id") || "");
  const returnTo = String(formData.get("return_to") || "/");

  if (!postId) return;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: existing } = await supabase
    .from("post_likes")
    .select("id")
    .eq("post_id", postId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (existing) {
    await supabase.from("post_likes").delete().eq("id", existing.id);
  } else {
    await supabase.from("post_likes").insert({
      post_id: postId,
      user_id: user.id,
    });
  }

  await supabase.rpc("recount_post", {
    target_post_id: postId,
  });

  revalidatePath("/");
  revalidatePath(returnTo);
  revalidatePath(`/p/${postId}`);
  revalidatePath("/activity");

  redirect(returnTo);
}

export async function addComment(formData: FormData) {
  "use server";

  const postId = String(formData.get("post_id") || "");
  const body = String(formData.get("body") || "").trim();
  const returnTo = String(formData.get("return_to") || `/p/${postId}`);

  if (!postId || !body) return;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  await supabase.from("comments").insert({
    post_id: postId,
    user_id: user.id,
    body,
  });

  await supabase.rpc("recount_post", {
    target_post_id: postId,
  });

  revalidatePath("/");
  revalidatePath(returnTo);
  revalidatePath(`/p/${postId}`);
  revalidatePath("/activity");

  redirect(returnTo);
}