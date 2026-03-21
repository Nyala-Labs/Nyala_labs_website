import { getPayloadClient } from "@/lib/payload";
import { headers as getHeaders } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const payload = await getPayloadClient();
    const headersList = await getHeaders();
    const authHeader = headersList.get("authorization");
    const cookieHeader = headersList.get("cookie");

    const hasCookie = cookieHeader?.includes("payload-token");
    const hasAuth = Boolean(authHeader);

    // Try to get the user from payload's auth
    let user = null;
    try {
      const result = await payload.auth({
        headers: new Headers({
          ...(authHeader ? { authorization: authHeader } : {}),
          ...(cookieHeader ? { cookie: cookieHeader } : {}),
        }),
      });
      user = result.user;
    } catch (e: unknown) {
      return Response.json({
        error: "auth failed",
        message: e instanceof Error ? e.message : String(e),
        hasCookie,
        hasAuth,
      });
    }

    if (!user) {
      return Response.json({ error: "no user in token", hasCookie, hasAuth });
    }

    return Response.json({
      id: user.id,
      email: (user as any).email,
      roles: (user as any).roles,
      rolesType: typeof (user as any).roles,
      rolesIsArray: Array.isArray((user as any).roles),
      allKeys: Object.keys(user),
    });
  } catch (e: unknown) {
    return Response.json(
      { error: e instanceof Error ? e.message : String(e) },
      { status: 500 },
    );
  }
}
