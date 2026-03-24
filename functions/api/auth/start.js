export default async function (request, env) {
  const { GITHUB_CLIENT_ID } = env;
  const url = new URL(request.url);
  const isSilent = url.searchParams.get('silent') === 'true';
  const redirectUri = `${url.origin}/api/auth/callback`;
  
  const params = new URLSearchParams({
    client_id: GITHUB_CLIENT_ID,
    redirect_uri: redirectUri,
    scope: "read:user",
    allow_signup: "false",
  });

  // prompt=none: auto-authenticate if already logged in + app authorized
  if (isSilent) {
    params.append('prompt', 'none');
  }

  return Response.redirect(
    `https://github.com/login/oauth/authorize?${params.toString()}`,
    302
  );
}
