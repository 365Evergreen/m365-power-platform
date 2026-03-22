import { signSession } from "../_shared/session.js";

export default async function (request, env) {
  const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, REPO_OWNER, REPO_NAME, SESSION_SECRET } = env;
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  if (!code) return new Response("Missing code", { status: 400 });

  // Exchange code for access token
  const tokenResp = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { "Accept": "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({ client_id: GITHUB_CLIENT_ID, client_secret: GITHUB_CLIENT_SECRET, code }),
  });
  const tokenJson = await tokenResp.json();
  if (!tokenJson.access_token) return new Response("Failed to obtain access token", { status: 500 });
  const accessToken = tokenJson.access_token;

  // Get user
  const userResp = await fetch("https://api.github.com/user", { headers: { Authorization: `token ${accessToken}`, Accept: "application/vnd.github.v3+json" } });
  if (!userResp.ok) return new Response("Failed to fetch user", { status: 500 });
  const user = await userResp.json();
  const username = user.login;

  // Check collaborator status for the configured repo
  let isContributor = false;
  try {
    const collResp = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/collaborators/${username}`, {
      method: "GET",
      headers: { Authorization: `token ${accessToken}`, Accept: "application/vnd.github.v3+json" },
    });
    if (collResp.status === 204 || collResp.status === 200) isContributor = true;
  } catch (e) {
    // silence and leave isContributor false
  }

  // Create a short session token
  const payload = { username, isContributor, iat: Date.now() };
  const token = await signSession(payload, SESSION_SECRET || "dev_secret");

  const resp = new Response("", { status: 302, headers: { Location: "/" } });
  // set cookie
  const cookie = `cf_session=${token}; HttpOnly; Path=/; Max-Age=3600; Secure; SameSite=Lax`;
  resp.headers.set("Set-Cookie", cookie);
  return resp;
}
