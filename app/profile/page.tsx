import { getViewer } from "@/lib/data";
import { redirect } from "next/navigation";

export default async function ProfileRedirectPage() {
  const { user, profile } = await getViewer();

  if (!user) redirect("/login");
  if (!profile) redirect("/settings");

  redirect(`/u/${profile.username}`);
}