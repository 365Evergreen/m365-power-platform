import { Button } from "@/components/ui/button";
import { Article as ArticleIcon, Plus } from "@phosphor-icons/react";

interface EmptyStateProps {
  onAddClick: () => void;
}

export function EmptyState({ onAddClick }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-6">
        <ArticleIcon size={40} className="text-muted-foreground" />
      </div>
      <h2 className="text-[24px] font-semibold mb-2">No articles yet</h2>
      <p className="text-[15px] text-muted-foreground mb-6 text-center max-w-md leading-relaxed">
        Start building your M365 and Power Platform knowledge base by adding
        your first article
      </p>
      <Button onClick={onAddClick} size="lg" className="gap-2">
        <Plus size={18} weight="bold" />
        Add Your First Article
      </Button>
    </div>
  );
}
