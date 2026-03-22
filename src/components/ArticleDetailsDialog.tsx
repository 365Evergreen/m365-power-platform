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
  onOpenChange: (open: boolean) => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function ArticleDetailsDialog({
  article,
  open,
  onOpenChange,
  onEdit,
  onDelete,
}: ArticleDetailsDialogProps) {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  if (!article) return null;

  const handleDelete = () => {
    onDelete();
    setShowDeleteAlert(false);
    toast.success("Article deleted successfully");
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <Badge variant="secondary" className="text-[13px] font-medium mb-3">
                  {article.category}
                </Badge>
                <DialogTitle className="text-[24px] leading-tight mb-2">
                  {article.title}
                </DialogTitle>
                <DialogDescription className="text-[13px]">
                  Added {format(new Date(article.dateAdded), "MMMM d, yyyy")}
                </DialogDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={onEdit}
                  className="h-9 w-9"
                >
                  <PencilSimple size={16} />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setShowDeleteAlert(true)}
                  className="h-9 w-9 text-destructive hover:text-destructive"
                >
                  <Trash size={16} />
                </Button>
              </div>
            </div>
          </DialogHeader>

          <Separator className="my-4" />

          <div className="space-y-6">
            <div>
              <h3 className="text-[14px] font-semibold mb-2">Description</h3>
              <p className="text-[15px] text-muted-foreground leading-relaxed">
                {article.description}
              </p>
            </div>

            {article.tags.length > 0 && (
              <div>
                <h3 className="text-[14px] font-semibold mb-2">Tags</h3>
                <div className="flex flex-wrap gap-1.5">
                  {article.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="text-[13px] bg-secondary/50"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="text-[14px] font-semibold mb-2">Source URL</h3>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[15px] text-accent hover:underline break-all inline-flex items-center gap-1"
              >
                {article.url}
                <ArrowSquareOut size={14} weight="bold" className="flex-shrink-0" />
              </a>
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button
              onClick={() => window.open(article.url, "_blank")}
              className="gap-2"
            >
              Visit Source
              <ArrowSquareOut size={16} weight="bold" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Article?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{article.title}"? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
