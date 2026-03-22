import { Button } from "@/components/ui/button";
import { Article as ArticleIcon, Plus, Database } from "@phosphor-icons/react";

interface EmptyStateProps {
  onAddClick: () => void;
  onLoadSamples: () => void;
}

export function EmptyState({ onAddClick, onLoadSamples }: EmptyStateProps) {
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
