import { Article } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PencilSimple, Trash, ArrowSquareOut, FileText } from "@phosphor-icons/react";
import { format } from "date-fns";

interface ArticleCardProps {
  article: Article;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function ArticleCard({
  article,
  onView,
  onEdit,
  onDelete,
}: ArticleCardProps) {
  const maxVisibleTags = 3;
  const visibleTags = article.tags.slice(0, maxVisibleTags);
  const remainingTagsCount = article.tags.length - maxVisibleTags;
  const isInternalPage = article.sourceType === "internal";

  return (
    <Card
      className="p-4 sm:p-5 hover:shadow-lg hover:border-accent/50 transition-all duration-200 cursor-pointer group"
      onClick={onView}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-start justify-between mb-3">
          <Badge variant="secondary" className="text-[11px] sm:text-[12px] md:text-[13px] font-medium">
            {article.category}
          </Badge>
          <div className="flex gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 sm:h-8 sm:w-8"
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
              className="h-7 w-7 sm:h-8 sm:w-8 text-destructive hover:text-destructive"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
            >
              <Trash size={16} />
            </Button>
          </div>
        </div>

        <h3 className="text-[16px] sm:text-[17px] md:text-[18px] font-medium leading-[1.4] mb-2 group-hover:text-accent transition-colors">
          {article.title}
        </h3>

        <p className="text-[13px] sm:text-[14px] md:text-[15px] text-muted-foreground leading-relaxed mb-4 line-clamp-3 flex-1">
          {article.description}
        </p>

        <div className="space-y-3">
          {article.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {visibleTags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="text-[11px] sm:text-[12px] bg-secondary/50"
                >
                  {tag}
                </Badge>
              ))}
              {remainingTagsCount > 0 && (
                <Badge variant="outline" className="text-[11px] sm:text-[12px] bg-secondary/50">
                  +{remainingTagsCount} more
                </Badge>
              )}
            </div>
          )}

          <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2 text-[12px] sm:text-[13px] text-muted-foreground">
            <span>{format(new Date(article.dateAdded), "MMM d, yyyy")}</span>
            {isInternalPage ? (
              <button
                type="button"
                className="flex items-center gap-1 text-accent hover:underline"
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
                className="flex items-center gap-1 text-accent hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                Visit Source
                <ArrowSquareOut size={14} weight="bold" />
              </a>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
