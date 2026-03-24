# GitHub Authentication Setup Guide

## Overview

## Step 1: 

3. Click **"New OAuth App"**

   Application name: 365 Evergreen K

   ```
5. Click **"Register application"**
   - Copy the **Client ID**
   - Copy the **Client Secret** (yo

Decide
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


   GITHUB_CLIENT_ID=your_client_id_from_step_1
   REPO_OWNER=your_github_username_or_org





GITHUB_CLIENT_ID=y
REPO_OW
SESSION_SECRET=your_session_secret




2. Navigate to **Set
4. 

### Checking Cont
In the 
- "Add Article" and "Load Samples" buttons


- No add/edit/delete capabilities



4. Authorize the OAuth ap

   - If you're a contributor to the sp
## Troubleshooting
### "Failed to obtain access token"

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













































































