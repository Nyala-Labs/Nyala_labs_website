import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const path = searchParams.get("path");
  const previewSecret = searchParams.get("previewSecret");

  if (previewSecret !== process.env.PREVIEW_SECRET) {
    return new Response("You are not allowed to preview this page", {
      status: 403,
    });
  }

  if (!path || !path.startsWith("/")) {
    return new Response("Invalid path", { status: 400 });
  }

  const draft = await draftMode();
  draft.enable();

  redirect(path);
}
