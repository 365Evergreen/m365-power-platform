import { useEffect, useState } from "react";
import { Article, ArticleSourceType, Category } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface ArticleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (article: Article) => void;
  editingArticle?: Article | null;
  existingUrls?: string[];
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
  existingUrls = [],
}: ArticleDialogProps) {
  const [url, setUrl] = useState("");
  const [sourceType, setSourceType] = useState<ArticleSourceType>("external");
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Category>("Microsoft 365");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (editingArticle) {
      setUrl(editingArticle.url || "");
      setSourceType(editingArticle.sourceType || "external");
      setContent(editingArticle.content || "");
      setTitle(editingArticle.title || "");
      setDescription(editingArticle.description || "");
      setCategory(editingArticle.category || ("Microsoft 365" as Category));
      setTags(editingArticle.tags || []);
      setErrors({});
    } else {
      setUrl("");
      setSourceType("external");
      setContent("");
      setTitle("");
      setDescription("");
      setCategory("Microsoft 365");
      setTags([]);
      setTagInput("");
      setErrors({});
    }
  }, [editingArticle, open]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (sourceType === "external" && !url.trim()) e.url = "URL is required";
    if (sourceType === "internal" && !content.trim()) e.content = "Page content is required";
    if (!title.trim()) e.title = "Title is required";
    if (!description.trim()) e.description = "Description is required";
    if (
      sourceType === "external" &&
      existingUrls.includes(url.trim()) &&
      (!editingArticle || editingArticle.url !== url.trim())
    ) {
      e.url = "This URL already exists";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const article: Article = {
      id: editingArticle?.id || Date.now().toString(),
      url: sourceType === "external" ? url.trim() : "",
      sourceType,
      content: sourceType === "internal" ? content.trim() : "",
      title: title.trim(),
      description: description.trim(),
      category,
      tags,
      dateAdded: editingArticle?.dateAdded || new Date().toISOString(),
    };
    onSubmit(article);
    toast.success(editingArticle ? "Article updated successfully" : "Article added successfully");
    onOpenChange(false);
  };

  const addTag = (raw?: string) => {
    const value = (raw ?? tagInput).trim();
    if (!value) return;
    if (tags.includes(value)) {
      setTagInput("");
      return;
    }
    setTags((s) => [...s, value]);
    setTagInput("");
  };

  const removeTag = (t: string) => setTags((s) => s.filter((x) => x !== t));

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl w-full">
        <DialogHeader>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex-1">
              <Badge variant="secondary" className="text-[11px] sm:text-[12px] md:text-[13px] font-medium mb-3">
                {category}
              </Badge>
              <DialogTitle className="text-[20px] sm:text-[22px] md:text-[24px] leading-tight mb-2">
                {editingArticle ? "Edit Article" : "Add Article"}
              </DialogTitle>
              <DialogDescription className="text-[12px] sm:text-[13px]">Add or edit a shared article</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="sourceType">Page Type</Label>
            <Select value={sourceType} onValueChange={(val) => setSourceType(val as ArticleSourceType)}>
              <SelectTrigger className="w-full" id="sourceType">
                <SelectValue placeholder="Select page type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="external">External source link</SelectItem>
                <SelectItem value="internal">Custom article page</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="url">Source URL {sourceType === "external" ? "*" : "(optional)"}</Label>
            <Input
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              disabled={sourceType === "internal"}
            />
            {errors.url && <p className="text-destructive text-sm mt-1">{errors.url}</p>}
          </div>

          <div>
            <Label htmlFor="title">Title *</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Article title" />
            {errors.title && <p className="text-destructive text-sm mt-1">{errors.title}</p>}
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Short description" />
            {errors.description && <p className="text-destructive text-sm mt-1">{errors.description}</p>}
          </div>

          {sourceType === "internal" && (
            <div>
              <Label htmlFor="content">Article Page Content *</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your article content here"
                className="min-h-44"
              />
              {errors.content && <p className="text-destructive text-sm mt-1">{errors.content}</p>}
            </div>
          )}

          <div>
            <Label htmlFor="category">Category</Label>
            <Select onValueChange={(val) => setCategory(val as Category)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category" />
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

          <div>
            <Label htmlFor="tags">Tags</Label>
            <div className="flex gap-2 items-center">
              <Input
                id="tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                placeholder="Add a tag and press Enter"
              />
              <Button onClick={() => addTag()} variant="outline">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((t) => (
                <Badge key={t} variant="outline" className="cursor-pointer" onClick={() => removeTag(t)}>
                  {t}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="mt-6">
          <div className="flex gap-2 w-full sm:w-auto">
            <Button onClick={() => onOpenChange(false)} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="ml-auto">
              {editingArticle ? "Update Article" : "Add Article"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
