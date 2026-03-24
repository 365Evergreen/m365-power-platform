import { Article } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PencilSimple, Trash, ArrowSquareOut } from "@phosphor-icons/react";
import { format } from "date-fns";
import { useState } from "react";
import { toast } from "sonner";

interface ArticleDetailsDialogProps {
  article: Article | null;
  open: boolean;
  canManageArticles: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function ArticleDetailsDialog({
  article,
  open,
  canManageArticles,
  onOpenChange,
  onEdit,
  onDelete,
}: ArticleDetailsDialogProps) {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  if (!article) return null;
  const isInternalPage = article.sourceType === "internal";

  const handleDelete = () => {
    onDelete();
    setShowDeleteAlert(false);
    toast.success("Article deleted successfully");
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto w-[calc(100vw-2rem)] sm:w-full">
          <DialogHeader>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="flex-1">
                <Badge variant="secondary" className="text-[11px] sm:text-[12px] md:text-[13px] font-medium mb-3">
                  {article.category}
                </Badge>
                <DialogTitle className="text-[20px] sm:text-[22px] md:text-[24px] leading-tight mb-2 pr-0 sm:pr-16">
                  {article.title}
                </DialogTitle>
                <DialogDescription className="text-[12px] sm:text-[13px]">
                  Added {format(new Date(article.dateAdded), "MMMM d, yyyy")}
                </DialogDescription>
              </div>
              {canManageArticles && (
                <div className="flex gap-2 self-end sm:self-auto">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={onEdit}
                    className="h-8 w-8 sm:h-9 sm:w-9"
                  >
                    <PencilSimple size={16} />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setShowDeleteAlert(true)}
                    className="h-8 w-8 sm:h-9 sm:w-9 text-destructive hover:text-destructive"
                  >
                    <Trash size={16} />
                  </Button>
                </div>
              )}
            </div>
          </DialogHeader>

          <Separator className="my-4" />

          <div className="space-y-6">
            <div>
              <h3 className="text-[13px] sm:text-[14px] font-semibold mb-2">Description</h3>
              <p className="text-[13px] sm:text-[14px] md:text-[15px] text-muted-foreground leading-relaxed">
                {article.description}
              </p>
            </div>

            {article.tags.length > 0 && (
              <div>
                <h3 className="text-[13px] sm:text-[14px] font-semibold mb-2">Tags</h3>
                <div className="flex flex-wrap gap-1.5">
                  {article.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="text-[11px] sm:text-[12px] md:text-[13px] bg-secondary/50"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {isInternalPage ? (
              <div>
                <h3 className="text-[13px] sm:text-[14px] font-semibold mb-2">Article Page</h3>
                <div className="text-[13px] sm:text-[14px] md:text-[15px] text-muted-foreground leading-relaxed whitespace-pre-wrap rounded-lg border border-border/70 bg-muted/20 p-4">
                  {article.content?.trim() || "This page does not have content yet."}
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-[13px] sm:text-[14px] font-semibold mb-2">Source URL</h3>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] sm:text-[14px] md:text-[15px] text-accent hover:underline break-all inline-flex items-center gap-1"
                >
                  {article.url}
                  <ArrowSquareOut size={14} weight="bold" className="flex-shrink-0" />
                </a>
              </div>
            )}
          </div>

          {!isInternalPage && (
            <DialogFooter className="mt-6">
              <Button
                onClick={() => window.open(article.url, "_blank")}
                className="gap-2 w-full sm:w-auto"
              >
                Visit Source
                <ArrowSquareOut size={16} weight="bold" />
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent className="w-[calc(100vw-2rem)] sm:w-full">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[18px] sm:text-[20px]">Delete Article?</AlertDialogTitle>
            <AlertDialogDescription className="text-[13px] sm:text-[14px]">
              Are you sure you want to delete "{article.title}"? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2">
            <AlertDialogCancel className="w-full sm:w-auto">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 w-full sm:w-auto"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
