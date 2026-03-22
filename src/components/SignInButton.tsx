import React from 'react';

export function SignInButton() {
  return (
    <a href="/api/auth/start" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-primary text-primary-foreground">
      Sign in with GitHub
    </a>
  );
}

export default SignInButton;
