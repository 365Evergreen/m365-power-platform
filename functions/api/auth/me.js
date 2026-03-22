import { verifySession } from "../_shared/session.js";

export default async function (request, env) {
  const { SESSION_SECRET } = env;
  const cookie = request.headers.get("cookie") || "";
  const m = cookie.match(/(?:^|; )cf_session=([^;]+)/);
  const token = m ? decodeURIComponent(m[1]) : null;
  const session = await verifySession(token, SESSION_SECRET || "dev_secret");
  if (!session) return new Response(JSON.stringify({ authenticated: false }), { status: 200, headers: { "Content-Type": "application/json" } });
  return new Response(JSON.stringify({ authenticated: true, user: session }), { status: 200, headers: { "Content-Type": "application/json" } });
}
