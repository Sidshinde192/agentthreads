import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import crypto from "crypto";

function getEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

function getS3Client() {
  const region = getEnv("AWS_REGION");
  const accessKeyId = getEnv("AWS_ACCESS_KEY_ID");
  const secretAccessKey = getEnv("AWS_SECRET_ACCESS_KEY");

  return new S3Client({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
}

export async function uploadPostImage(file: File, userId: string) {
  const region = getEnv("AWS_REGION");
  const bucket = getEnv("AWS_S3_BUCKET");

  if (!file || file.size === 0) {
    return null;
  }

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

  const s3 = getS3Client();

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