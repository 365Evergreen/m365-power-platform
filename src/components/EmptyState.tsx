import { Button } from "@/components/ui/button";
import { SignInButton } from "@/components/SignInButton";
import { Article as ArticleIcon, Plus, Database, Lock } from "@phosphor-icons/react";

interface EmptyStateProps {
  canManageArticles: boolean;
  authLoading?: boolean;
  isAuthenticated?: boolean;
  username?: string;
  onAddClick: () => void;
  onLoadSamples: () => void;
}

export function EmptyState({
  canManageArticles,
  authLoading = false,
  isAuthenticated = false,
  username,
  onAddClick,
  onLoadSamples,
}: EmptyStateProps) {
  if (authLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 sm:py-16 md:py-20 px-4">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-secondary flex items-center justify-center mb-4 sm:mb-6 animate-pulse">
          <ArticleIcon size={32} className="text-muted-foreground sm:w-10 sm:h-10" />
        </div>
        <div className="h-7 w-40 bg-muted animate-pulse rounded-md mb-2"></div>
        <div className="h-5 w-80 bg-muted animate-pulse rounded-md"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center py-12 sm:py-16 md:py-20 px-4">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-secondary flex items-center justify-center mb-4 sm:mb-6">
          <Lock size={32} className="text-muted-foreground sm:w-10 sm:h-10" />
        </div>
        <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-semibold mb-2">No articles yet</h2>
        <p className="text-[13px] sm:text-[14px] md:text-[15px] text-muted-foreground mb-4 sm:mb-6 text-center max-w-md leading-relaxed px-4">
          Sign in with your GitHub account to view and manage the knowledge base
        </p>
        <SignInButton />
      </div>
    );
  }

  if (isAuthenticated && !canManageArticles) {
    return (
      <div className="flex flex-col items-center justify-center py-12 sm:py-16 md:py-20 px-4">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-secondary flex items-center justify-center mb-4 sm:mb-6">
          <ArticleIcon size={32} className="text-muted-foreground sm:w-10 sm:h-10" />
        </div>
        <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-semibold mb-2">No articles yet</h2>
        <p className="text-[13px] sm:text-[14px] md:text-[15px] text-muted-foreground mb-2 text-center max-w-md leading-relaxed px-4">
          Welcome, <span className="font-semibold text-foreground">{username}</span>!
        </p>
        <p className="text-[13px] sm:text-[14px] md:text-[15px] text-muted-foreground mb-4 sm:mb-6 text-center max-w-md leading-relaxed px-4">
          You're viewing as a guest. Repository contributors can add and manage articles.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 sm:py-16 md:py-20 px-4">
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-secondary flex items-center justify-center mb-4 sm:mb-6">
        <ArticleIcon size={32} className="text-muted-foreground sm:w-10 sm:h-10" />
      </div>
      <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-semibold mb-2">No articles yet</h2>
      <p className="text-[13px] sm:text-[14px] md:text-[15px] text-muted-foreground mb-4 sm:mb-6 text-center max-w-md leading-relaxed px-4">
        Start building your M365 and Power Platform knowledge base by adding
        articles or load sample content to get started
      </p>
      <div className="flex flex-col xs:flex-row gap-3 w-full xs:w-auto px-4 xs:px-0">
        <Button onClick={onLoadSamples} size="lg" variant="outline" className="gap-2 w-full xs:w-auto">
          <Database size={18} weight="bold" />
          <span className="hidden xs:inline">Load Sample Articles</span>
          <span className="xs:hidden">Load Samples</span>
        </Button>
        <Button onClick={onAddClick} size="lg" className="gap-2 w-full xs:w-auto">
          <Plus size={18} weight="bold" />
          Add Article
        </Button>
      </div>
    </div>
  );
}
