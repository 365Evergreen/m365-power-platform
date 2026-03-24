# GitHub Authentication Setup Guide

This guide will help you set up GitHub OAuth authentication for the 365 Evergreen Knowledge Base.

## Overview

The app uses GitHub OAuth to authenticate users and check if they are contributors to a specified repository. Only repository contributors can add, edit, and delete articles.

## Step 1: Create a GitHub OAuth App

1. Navigate to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click **"OAuth Apps"** in the left sidebar
3. Click **"New OAuth App"**
4. Fill in the application details:

   ```
   Application name: 365 Evergreen Knowledge Base
   Homepage URL: https://your-app.pages.dev
   Application description: (optional) Knowledge base for M365 and Power Platform
   Authorization callback URL: https://your-app.pages.dev/api/auth/callback
   ```

5. Click **"Register application"**
6. On the application page:
   - Copy the **Client ID**
   - Click **"Generate a new client secret"**
   - Copy the **Client Secret** (you won't be able to see it again!)

## Step 2: Choose Your Repository

Decide which GitHub repository will control contributor access. Users who are collaborators on this repository will be able to manage articles.

Example:
- `REPO_OWNER`: `365Evergreen` (organization or username)
- `REPO_NAME`: `m365-power-platform` (repository name)

## Step 3: Generate a Session Secret

The session secret is used to sign authentication tokens. Generate a secure random string:

### Using Node.js:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Using OpenSSL:
```bash
openssl rand -hex 32
```

### Using Python:
```bash
python3 -c "import secrets; print(secrets.token_hex(32))"
```

Copy the output - this is your `SESSION_SECRET`.

## Step 4: Configure Environment Variables

### For Cloudflare Pages:

1. Go to your Cloudflare Pages project
2. Navigate to **Settings** → **Environment variables**
3. Add the following variables for **Production** (and **Preview** if needed):

   ```
   GITHUB_CLIENT_ID=your_client_id_from_step_1
   GITHUB_CLIENT_SECRET=your_client_secret_from_step_1
   REPO_OWNER=your_github_username_or_org
   REPO_NAME=your_repository_name
   SESSION_SECRET=your_generated_secret_from_step_3
   ```

4. Click **"Save"**

### For Local Development:

Create a `.dev.vars` file in your project root (this file is gitignored):

```env
GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_client_secret
REPO_OWNER=your_github_username_or_org
REPO_NAME=your_repository_name
SESSION_SECRET=your_session_secret
```

**Note**: For local development, you may need to update your OAuth app's callback URL to include `http://localhost:5173/api/auth/callback`

## Step 5: Managing Contributors

To grant someone the ability to add and edit articles:

1. Go to your repository on GitHub (the one specified in `REPO_OWNER`/`REPO_NAME`)
2. Navigate to **Settings** → **Collaborators and teams**
3. Click **"Add people"** (for user repos) or **"Invite teams"** (for org repos)
4. Search for and add the user
5. They will receive an invitation email
6. Once they accept, they will have contributor access in the app

### Checking Contributor Status

In the app, contributors will see:
- A "Contributor" badge next to their username in the header
- "Add Article" and "Load Samples" buttons
- Edit and delete buttons on article cards

Regular authenticated users will see:
- Their username in the header
- No contributor badge
- No add/edit/delete capabilities
- A message explaining contributor-only access in empty states

## Step 6: Testing

1. Deploy your app with the environment variables configured
2. Visit your app URL
3. Click **"Sign in with GitHub"**
4. Authorize the OAuth app
5. You should be redirected back to the app
6. Check the header:
   - Your username should appear
   - If you're a contributor to the specified repo, you'll see the "Contributor" badge

## Troubleshooting

### "Failed to obtain access token"
- Verify your `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` are correct
- Ensure there are no extra spaces or quotes around the values

### "Contributor" badge not showing
- Confirm you're a collaborator on the repository specified in `REPO_OWNER`/`REPO_NAME`
- Check that both values exactly match your repository (case-sensitive)
- Try removing and re-adding yourself as a collaborator

### Redirect loop or 404 on callback
- Verify the callback URL in your OAuth app settings matches your deployment URL
- For local dev: `http://localhost:5173/api/auth/callback`
- For production: `https://your-app.pages.dev/api/auth/callback`

### Session expires immediately
- Ensure `SESSION_SECRET` is at least 32 characters
- Check that cookies are enabled in your browser
- Verify the cookie is being set (check browser DevTools → Application → Cookies)

## Security Best Practices

- ✅ **Never commit** `.dev.vars` or any file containing secrets to Git
- ✅ **Rotate** your `GITHUB_CLIENT_SECRET` and `SESSION_SECRET` periodically
- ✅ **Use different** OAuth apps for development and production
- ✅ **Restrict** OAuth app access to only necessary scopes (currently `read:user`)
- ✅ **Monitor** your OAuth app usage in GitHub settings

## Additional Resources

- [GitHub OAuth Documentation](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps)
- [Cloudflare Pages Functions](https://developers.cloudflare.com/pages/functions/)
- [Repository Collaborators API](https://docs.github.com/en/rest/collaborators/collaborators)
