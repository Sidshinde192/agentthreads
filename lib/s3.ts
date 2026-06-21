import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import crypto from "crypto";

const region = process.env.AWS_REGION!;
const bucket = process.env.AWS_S3_BUCKET!;

const s3 = new S3Client({
  region,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function uploadPostImage(file: File, userId: string) {
  if (!file || file.size === 0) return null;

  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];

  if (!allowedTypes.includes(file.type)) {
    throw new Error("Only JPG, PNG, WEBP, and GIF images are allowed.");
  }

  const maxSize = 5 * 1024 * 1024;

  if (file.size > maxSize) {
    throw new Error("Image must be less than 5MB.");
  }

  const extension =
    file.type === "image/jpeg" ? "jpg" : file.type.replace("image/", "");

  const key = `posts/${userId}/${crypto.randomUUID()}.${extension}`;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: buffer,
      ContentType: file.type,
      CacheControl: "public, max-age=31536000, immutable",
    })
  );

  return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
}