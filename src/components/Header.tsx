import { NotificationSettings } from "@/components/NotificationSettings";
import { SignInButton } from "@/components/SignInButton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Database, Plus, User, SignOut } from "@phosphor-icons/react";

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
  const handleLogout = () => {
    window.location.href = "/api/auth/logout";
  };

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
          
          {authLoading ? (
            <div className="h-9 w-32 animate-pulse rounded-md bg-muted" />
          ) : isAuthenticated ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <User size={14} weight="bold" />
                    <span className="text-[13px] font-medium">{username}</span>
                    {canManageArticles && (
                      <Badge variant="secondary" className="ml-0.5 text-[11px] font-semibold">
                        Contributor
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{username}</p>
                      <p className="text-xs text-muted-foreground">
                        {canManageArticles ? "Repository Contributor" : "Viewer"}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="gap-2 cursor-pointer">
                    <SignOut size={16} weight="bold" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              {canManageArticles && (
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
              )}
            </>
          ) : (
            <SignInButton />
          )}
        </div>
      </div>
    </header>
  );
}