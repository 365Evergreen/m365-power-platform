Cloudflare GitHub OAuth setup

1) Create a GitHub OAuth App
   - Go to https://github.com/settings/developers -> OAuth Apps -> New OAuth App
   - Set the "Authorization callback URL" to: `https://<your-pages-domain>/api/auth/callback`
   - Copy the Client ID and Client Secret.

2) Set Pages environment variables
   - In Cloudflare Pages (or Wrangler), set the following environment variables for your site:
     - `GITHUB_CLIENT_ID` = your OAuth app client id
     - `GITHUB_CLIENT_SECRET` = your OAuth app client secret
     - `REPO_OWNER` = repo owner (e.g. your GitHub username or org)
     - `REPO_NAME` = repo name
     - `SESSION_SECRET` = a random secret used to sign session cookies

3) How it works
   - `/api/auth/start` redirects users to GitHub's OAuth authorize page.
   - GitHub redirects back to `/api/auth/callback` where the function exchanges the code for an access token,
     fetches the user's username and checks collaborator status for the configured repo, then creates a signed cookie.
   - `/api/auth/me` reads the signed cookie and returns `{ authenticated, user }` so the client can show/hide editing controls.

4) Local testing
   - You can use `wrangler dev` or deploy to Pages. Ensure environment variables are provided to the preview or Pages.
