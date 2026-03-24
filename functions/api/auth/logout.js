export default async function (request, env) {
  const resp = new Response("", { status: 302, headers: { Location: "/" } });
  const cookie = `cf_session=; HttpOnly; Path=/; Max-Age=0; Secure; SameSite=Lax`;
  resp.headers.set("Set-Cookie", cookie);
  return resp;
}
