import { Button } from "@/components/ui/button";
import { GithubLogo } from "@phosphor-icons/react";

export function SignInButton() {
  return (
    <Button asChild size="default">
      <a href="/api/auth/start" className="gap-2">
        <GithubLogo size={16} weight="bold" />
        Sign in with GitHub
      </a>
    </Button>
  );
}
