import { useState, useEffect } from "react";
import { Article, Category } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "@phosphor-icons/react";
import { toast } from "sonner";

interface ArticleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (article: Omit<Article, "id" | "dateAdded"> | Article) => void;
  editingArticle?: Article;
  existingUrls: string[];
}

const categories: Category[] = [
  "SharePoint",
  "Teams",
  "Power Apps",
  "Power Automate",
  "Power BI",
  "Power Pages",
  "Exchange",
  "OneDrive",
  "Microsoft 365",
  "Security & Compliance",
  "Other",
];

export function ArticleDialog({
  open,
  onOpenChange,
  onSubmit,
  editingArticle,
  existingUrls,
}: ArticleDialogProps) {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Category>("Microsoft 365");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (editingArticle) {
      setUrl(editingArticle.url);
      setTitle(editingArticle.title);
      setDescription(editingArticle.description);
      setCategory(editingArticle.category);
      setTags(editingArticle.tags);
    } else {
      resetForm();
    }
  }, [editingArticle, open]);

  const resetForm = () => {
    setUrl("");
    setTitle("");
    setDescription("");
    setCategory("Microsoft 365");
    setTags([]);
    setTagInput("");
    setErrors({});
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!url.trim()) {
      newErrors.url = "URL is required";
    } else if (!isValidUrl(url)) {
      newErrors.url = "Please enter a valid URL";
    } else if (existingUrls.includes(url.trim()) && !editingArticle) {
      newErrors.url = "This URL already exists in your knowledge base";
    }

    if (!title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!description.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (urlString: string) => {
    try {
      new URL(urlString);
      return true;
    } catch {
      return false;
    }
  };

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    const articleData: Omit<Article, "id" | "dateAdded"> = {
      url: url.trim(),
      title: title.trim(),
      description: description.trim(),
      category,
      tags,
    };

    if (editingArticle) {
      onSubmit({ ...articleData, id: editingArticle.id, dateAdded: editingArticle.dateAdded });
    } else {
      onSubmit(articleData);
    }

    toast.success(
      editingArticle ? "Article updated successfully" : "Article added successfully"
    );
    onOpenChange(false);
    resetForm();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[24px]">
            {editingArticle ? "Edit Article" : "Add New Article"}
          </DialogTitle>
          <DialogDescription className="text-[15px]">
            {editingArticle
              ? "Update the article details below"
              : "Add a new article to your knowledge base"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="url" className="text-[14px] font-semibold">
              URL *
            </Label>
            <Input
              id="url"
              placeholder="https://learn.microsoft.com/..."
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setErrors({ ...errors, url: "" });
              }}
              className={errors.url ? "border-destructive" : ""}
            />
            {errors.url && (
              <p className="text-[13px] text-destructive">{errors.url}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="title" className="text-[14px] font-semibold">
              Title *
            </Label>
            <Input
              id="title"
              placeholder="Article title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setErrors({ ...errors, title: "" });
              }}
              className={errors.title ? "border-destructive" : ""}
            />
            {errors.title && (
              <p className="text-[13px] text-destructive">{errors.title}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-[14px] font-semibold">
              Description *
            </Label>
            <Textarea
              id="description"
              placeholder="Brief description of the article..."
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setErrors({ ...errors, description: "" });
              }}
              className={`min-h-[100px] ${errors.description ? "border-destructive" : ""}`}
            />
            {errors.description && (
              <p className="text-[13px] text-destructive">
                {errors.description}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-[14px] font-semibold">
              Category *
            </Label>
            <Select value={category} onValueChange={(value) => setCategory(value as Category)}>
              <SelectTrigger id="category">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags" className="text-[14px] font-semibold">
              Tags
            </Label>
            <div className="flex gap-2">
              <Input
                id="tags"
                placeholder="Add a tag..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <Button type="button" variant="secondary" onClick={handleAddTag}>
                Add
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-[13px] gap-1 pr-1"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X size={14} />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {editingArticle ? "Update Article" : "Add Article"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
