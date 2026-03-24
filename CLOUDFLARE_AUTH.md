# Cloudflare Pages Deployment with GitHub OAuth

This guide covers deploying the 365 Evergreen Knowledge Base to Cloudflare Pages with GitHub authentication.

## Prerequisites

- A GitHub account
- A Cloudflare account
- The repository code ready to deploy

## Step 1: Create a GitHub OAuth App

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Navigate to **OAuth Apps** → **New OAuth App**
3. Fill in the application details:
   - **Application name**: `365 Evergreen Knowledge Base` (or your preferred name)
   - **Homepage URL**: Your Cloudflare Pages URL (e.g., `https://your-project.pages.dev`)
   - **Authorization callback URL**: `https://your-project.pages.dev/api/auth/callback`
   
   > **Note**: If you don't know your Pages URL yet, you can use a placeholder and update it after deployment

4. Click **Register application**
5. Copy the **Client ID**
6. Click **Generate a new client secret** and copy it immediately (you won't see it again!)

## Step 2: Deploy to Cloudflare Pages

### Via Cloudflare Dashboard (Recommended)

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Pages** → **Create a project**
3. Select **Connect to Git**
4. Choose your GitHub repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/` (or leave empty)
6. Click **Save and Deploy**

### Via Wrangler CLI

```bash
npm install -g wrangler
wrangler login
wrangler pages deploy dist --project-name=your-project-name
```

## Step 3: Configure Environment Variables

1. In Cloudflare Dashboard, go to your Pages project
2. Navigate to **Settings** → **Environment variables**
3. Add the following variables for **Production**:

   | Variable Name | Value | Description |
   |---------------|-------|-------------|
   | `GITHUB_CLIENT_ID` | `your_client_id` | From GitHub OAuth App |
   | `GITHUB_CLIENT_SECRET` | `your_client_secret` | From GitHub OAuth App |
   | `REPO_OWNER` | `your_username_or_org` | GitHub repo owner |
   | `REPO_NAME` | `your_repo_name` | GitHub repo name |
   | `SESSION_SECRET` | `generate_random_string` | Random 32+ char string |

4. **Optionally** add the same for **Preview** environments if you want auth in preview deployments

### Generating SESSION_SECRET

Use one of these methods to generate a secure secret:

```bash
# Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# OpenSSL
openssl rand -hex 32

# Python
python3 -c "import secrets; print(secrets.token_hex(32))"
```

## Step 4: Update GitHub OAuth Callback URL

If you used a placeholder earlier, now update your GitHub OAuth App:

1. Go to your OAuth App settings
2. Update **Authorization callback URL** to match your actual Pages URL
3. Click **Update application**

## Step 5: Trigger Redeployment

After setting environment variables:

1. Go to **Deployments** in your Pages project
2. Click **Retry deployment** on the latest deployment
   
   OR
   
3. Push a new commit to your repository to trigger automatic deployment

## How It Works

### Authentication Flow

1. **User clicks "Sign in with GitHub"** → Redirects to `/api/auth/start`
2. **`/api/auth/start`** → Redirects user to GitHub OAuth authorization page
3. **User authorizes app on GitHub** → GitHub redirects to `/api/auth/callback?code=...`
4. **`/api/auth/callback`** → 
   - Exchanges code for access token
   - Fetches user's GitHub username
   - Checks if user is a collaborator on the specified repository
   - Creates a signed session cookie
   - Redirects user back to the app
5. **App loads** → Calls `/api/auth/me` to check auth status
6. **`/api/auth/me`** → Verifies session cookie and returns user info
7. **App renders** → Shows appropriate UI based on contributor status

### Session Management

- Sessions are stored in HTTP-only cookies for security
- Sessions expire after 1 hour (3600 seconds)
- Session tokens are signed with `SESSION_SECRET` to prevent tampering
- **`/api/auth/logout`** → Clears the session cookie

### Contributor Access Control

- User must be authenticated (signed in with GitHub)
- User must be a **collaborator** on the repository defined by `REPO_OWNER`/`REPO_NAME`
- Contributor status is checked via GitHub's Collaborators API
- Only contributors see:
  - "Add Article" button
  - "Load Samples" button  
  - Edit/Delete buttons on articles
  - "Contributor" badge in header

## Local Development

For local testing with authentication:

1. Create a `.dev.vars` file in the project root (gitignored):

   ```env
   GITHUB_CLIENT_ID=your_dev_client_id
   GITHUB_CLIENT_SECRET=your_dev_client_secret
   REPO_OWNER=your_username_or_org
   REPO_NAME=your_repo_name
   SESSION_SECRET=your_dev_secret
   ```

2. **Important**: Create a separate GitHub OAuth App for development with callback URL:
   ```
   http://localhost:5173/api/auth/callback
   ```

3. Run the dev server:
   ```bash
   npm run dev
   ```

4. Test authentication at `http://localhost:5173`

## Troubleshooting

### "redirect_uri_mismatch" error
- Verify the callback URL in your GitHub OAuth App exactly matches your deployment URL
- Check for trailing slashes or http vs https mismatches
- Local dev should use `http://localhost:5173/api/auth/callback`

### "Failed to obtain access token"
- Double-check `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` are correct
- Ensure there are no extra spaces or quotes in environment variables
- Verify the OAuth App hasn't been deleted or regenerated

### Contributor badge not showing
- Confirm you're actually a collaborator on the repo specified in `REPO_OWNER`/`REPO_NAME`
- Repository and owner names are case-sensitive
- Try removing and re-adding yourself as a collaborator
- Check the browser console for API errors

### Session expires immediately
- Ensure `SESSION_SECRET` is at least 32 characters
- Check browser allows cookies (especially in incognito/private mode)
- Verify cookies are being set (DevTools → Application → Cookies)

### Changes not appearing after environment variable updates
- Trigger a new deployment after changing environment variables
- Clear browser cache and cookies
- Check the build logs for any errors

## Security Best Practices

- ✅ Never commit `.dev.vars` or secrets to Git
- ✅ Use different OAuth Apps for development and production
- ✅ Rotate secrets periodically (especially if exposed)
- ✅ Use strong, random `SESSION_SECRET` (32+ characters)
- ✅ Keep dependencies updated for security patches
- ✅ Monitor OAuth App usage in GitHub settings

## Additional Resources

- [GitHub OAuth Documentation](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps)
- [Cloudflare Pages Functions](https://developers.cloudflare.com/pages/functions/)
- [Repository Collaborators API](https://docs.github.com/en/rest/collaborators/collaborators)
- [Cloudflare Environment Variables](https://developers.cloudflare.com/pages/configuration/build-configuration/#environment-variables)
