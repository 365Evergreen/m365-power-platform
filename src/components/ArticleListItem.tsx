import { Article } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PencilSimple, Trash, ArrowSquareOut, FileText } from "@phosphor-icons/react";
import { format } from "date-fns";

interface ArticleListItemProps {
  article: Article;
  canManageArticles: boolean;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function ArticleListItem({
  article,
  canManageArticles,
  onView,
  onEdit,
  onDelete,
}: ArticleListItemProps) {
  const maxVisibleTags = 5;
  const visibleTags = article.tags.slice(0, maxVisibleTags);
  const remainingTagsCount = article.tags.length - maxVisibleTags;
  const isInternalPage = article.sourceType === "internal";

  return (
    <Card
      className="p-4 md:p-5 hover:shadow-lg hover:border-accent/50 transition-all duration-200 cursor-pointer group"
      onClick={onView}
    >
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-3 mb-2">
            <Badge variant="secondary" className="text-[12px] font-medium whitespace-nowrap">
              {article.category}
            </Badge>
            <h3 className="text-[16px] md:text-[17px] font-medium leading-[1.4] group-hover:text-accent transition-colors flex-1">
              {article.title}
            </h3>
          </div>

          <p className="text-[14px] md:text-[15px] text-muted-foreground leading-relaxed mb-3 line-clamp-2">
            {article.description}
          </p>

          <div className="flex flex-wrap items-center gap-3 text-[13px] text-muted-foreground">
            <span>{format(new Date(article.dateAdded), "MMM d, yyyy")}</span>
            
            {article.tags.length > 0 && (
              <>
                <span className="text-border">•</span>
                <div className="flex flex-wrap gap-1.5">
                  {visibleTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="text-[11px] bg-secondary/50"
                    >
                      {tag}
                    </Badge>
                  ))}
                  {remainingTagsCount > 0 && (
                    <Badge variant="outline" className="text-[11px] bg-secondary/50">
                      +{remainingTagsCount} more
                    </Badge>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="flex sm:flex-col gap-2 items-start justify-between sm:justify-start">
          {isInternalPage ? (
            <button
              type="button"
              className="flex items-center gap-1.5 text-[13px] text-accent hover:underline whitespace-nowrap"
              onClick={(e) => {
                e.stopPropagation();
                onView();
              }}
            >
              Open Page
              <FileText size={14} weight="bold" />
            </button>
          ) : (
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[13px] text-accent hover:underline whitespace-nowrap"
              onClick={(e) => e.stopPropagation()}
            >
              Visit Source
              <ArrowSquareOut size={14} weight="bold" />
            </a>
          )}

          {canManageArticles && (
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit();
                }}
              >
                <PencilSimple size={16} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive hover:text-destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
              >
                <Trash size={16} />
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
