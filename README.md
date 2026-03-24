# 365 Evergreen Knowledge Base

A comprehensive knowledge base for curating and discovering Microsoft 365 and Power Platform articles. This Progressive Web App (PWA) provides an organized, searchable repository where repository contributors can add and manage technical content.

## Features

- 🔐 **GitHub Authentication** - Sign in with GitHub to access the knowledge base
- 👥 **Repository Contributor Management** - Only repository contributors can add and edit articles
- 📱 **Progressive Web App** - Install on any device and work offline
- 🔔 **Push Notifications** - Get notified when new articles are added
- 🔍 **Advanced Search & Filtering** - Find articles by title, description, tags, or category
- 📊 **Multiple Categories** - Organize articles across M365 and Power Platform technologies
- 🎨 **Clean, Professional UI** - Microsoft-inspired design with Fluent principles

## Setup Instructions

### GitHub OAuth Application

To enable authentication, you need to create a GitHub OAuth App:

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in the details:
   - **Application name**: `365 Evergreen Knowledge Base` (or your preferred name)
   - **Homepage URL**: Your deployment URL (e.g., `https://your-app.pages.dev`)
   - **Authorization callback URL**: `https://your-app.pages.dev/api/auth/callback`
4. Click "Register application"
5. Note the **Client ID** and generate a **Client Secret**

### Environment Variables

Configure these environment variables in your deployment platform (e.g., Cloudflare Pages):

```
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
REPO_OWNER=your_github_username_or_org
REPO_NAME=your_repository_name
SESSION_SECRET=a_random_secure_string_min_32_chars
```

**Important**: 
- `REPO_OWNER` and `REPO_NAME` define which GitHub repository's contributors can manage articles
- Only users who are collaborators on that repository will have edit permissions
- All authenticated users can view articles, but only contributors can add/edit/delete

### Generating a Session Secret

Generate a secure session secret using:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Repository Contributor Access

To grant someone the ability to add and edit articles:

1. Go to your repository on GitHub
2. Navigate to Settings → Collaborators
3. Add the user as a collaborator
4. They will now have "Contributor" status in the app

## Development

```bash
npm install
npm run dev
```

## Deployment

This app is designed to be deployed on Cloudflare Pages. See [CLOUDFLARE_AUTH.md](./CLOUDFLARE_AUTH.md) for detailed deployment instructions.

## Technologies

- React 19 + TypeScript
- Tailwind CSS v4
- Shadcn UI Components
- Framer Motion
- Vite
- Cloudflare Pages Functions

## License

The Spark Template files and resources from GitHub are licensed under the terms of the MIT license, Copyright GitHub, Inc.
