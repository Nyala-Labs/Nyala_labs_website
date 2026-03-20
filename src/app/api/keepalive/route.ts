import { getPayloadClient } from "@/lib/payload";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const payload = await getPayloadClient();
    await payload.find({ collection: "users", limit: 1, depth: 0 });
    return Response.json({ status: "ok", ts: Date.now() });
  } catch {
    return Response.json({ status: "error" }, { status: 500 });
  }
}
