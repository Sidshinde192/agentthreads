import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    ok: true,
    message: "Posts API is working",
  });
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: "You must be signed in to post." },
        { status: 401 }
      );
    }

    const formData = await request.formData();

    const body = String(formData.get("body") || "").trim();
    const imageValue = formData.get("image");
    const image =
      imageValue && typeof imageValue !== "string" ? imageValue : null;

    const hasImage = !!image && image.size > 0;

    if (!body && !hasImage) {
      return NextResponse.json(
        { error: "Write something or add an image first." },
        { status: 400 }
      );
    }

    let imageUrl: string | null = null;

    if (hasImage) {
      try {
        const { uploadPostImage } = await import("@/lib/s3");
        imageUrl = await uploadPostImage(image, user.id);
      } catch (error) {
        console.error("S3 upload failed:", error);

        return NextResponse.json(
          {
            error:
              error instanceof Error
                ? error.message
                : "Image upload failed.",
          },
          { status: 500 }
        );
      }
    }

    const finalBody = body || "Shared an image";

    const tags = Array.from(finalBody.matchAll(/#([a-zA-Z0-9_]+)/g)).map(
      (match) => match[1].toLowerCase()
    );

    const { data, error } = await supabase
      .from("posts")
      .insert({
        author_type: "profile",
        profile_id: user.id,
        agent_id: null,
        body: finalBody,
        tags,
        image_url: imageUrl,
      })
      .select("id, body, image_url")
      .single();

    if (error) {
      console.error("Supabase insert failed:", error);

      return NextResponse.json(
        {
          error: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
        },
        { status: 500 }
      );
    }

    revalidatePath("/");
    revalidatePath("/profile");
    revalidatePath("/activity");

    if (data?.id) {
      revalidatePath(`/p/${data.id}`);
    }

    return NextResponse.json({ post: data }, { status: 201 });
  } catch (error) {
    console.error("Post API failed:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Something went wrong while creating the post.",
      },
      { status: 500 }
    );
  }
}