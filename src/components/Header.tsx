import { NotificationSettings } from "@/components/NotificationSettings";
import { SignInButton } from "@/components/SignInButton";
import { Button } from "@/components/ui/button";
import { Database, Plus } from "@phosphor-icons/react";

interface HeaderProps {
  canManageArticles: boolean;
  authLoading: boolean;
  isAuthenticated: boolean;
  username?: string;
  onAddArticle: () => void;
  onLoadSamples: () => void;
}

export function Header({
  canManageArticles,
  authLoading,
  isAuthenticated,
  username,
  onAddArticle,
  onLoadSamples,
}: HeaderProps) {
  return (
    <header className="w-full border-b border-border bg-card/95 backdrop-blur">
      <div className="container mx-auto flex flex-col gap-4 px-4 py-5 md:px-6 md:py-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <img
              src="https://raw.githubusercontent.com/365Evergreen/m365-power-platform/main/public/assets/Evergreen_Logo__100px.png"
              alt="365 Evergreen logo"
              className="h-9 w-auto shrink-0 sm:h-10"
            />
            <div className="min-w-0">
              <h1 className="truncate text-[22px] font-semibold tracking-[-0.03em] text-foreground sm:text-[26px] md:text-[30px]">
                365 Evergreen knowledge
              </h1>
              <p className="text-[13px] leading-relaxed text-muted-foreground sm:text-[14px]">
                Curated articles for Microsoft 365 and Power Platform
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 lg:justify-end">
          <NotificationSettings />
          {canManageArticles ? (
            <>
              <Button
                onClick={onLoadSamples}
                variant="outline"
                className="gap-2"
                size="default"
              >
                <Database size={16} weight="bold" />
                <span className="hidden xs:inline">Load Samples</span>
                <span className="xs:hidden">Samples</span>
              </Button>
              <Button
                onClick={onAddArticle}
                className="gap-2"
                size="default"
              >
                <Plus size={16} weight="bold" />
                <span className="hidden xs:inline">Add Article</span>
                <span className="xs:hidden">Add</span>
              </Button>
            </>
          ) : authLoading ? (
            <p className="text-[13px] text-muted-foreground">Checking editor access...</p>
          ) : (
            <div className="flex flex-col items-start gap-2 sm:items-end">
              <SignInButton />
              <p className="text-[12px] text-muted-foreground text-left sm:text-right">
                {isAuthenticated
                  ? `Signed in as ${username || "GitHub user"}, but editing is restricted.`
                  : "Sign in with GitHub to create and manage articles."}
              </p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}