import { useState } from "react";
import { useKV } from "@github/spark/hooks";
import { Article, Category } from "@/lib/types";
import { sampleArticles } from "@/lib/seedData";
import { ArticleCard } from "@/components/ArticleCard";
import { ArticleDialog } from "@/components/ArticleDialog";
import { ArticleDetailsDialog } from "@/components/ArticleDetailsDialog";
import { SearchBar } from "@/components/SearchBar";
import { FilterBar } from "@/components/FilterBar";
import { EmptyState } from "@/components/EmptyState";
import { PWAUpdatePrompt } from "@/components/PWAUpdatePrompt";
import { OfflineIndicator } from "@/components/OfflineIndicator";
import { Button } from "@/components/ui/button";
import { Plus, Database } from "@phosphor-icons/react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const [articles, setArticles] = useKV<Article[]>("articles", []);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [viewingArticle, setViewingArticle] = useState<Article | null>(null);

  const filteredArticles = (articles || []).filter((article) => {
    const matchesSearch =
      searchQuery === "" ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(article.category);

    return matchesSearch && matchesCategory;
  });

  const handleAddArticle = (article: Omit<Article, "id" | "dateAdded">) => {
    const newArticle: Article = {
      ...article,
      id: crypto.randomUUID(),
      dateAdded: new Date().toISOString(),
    };
    setArticles((current) => [newArticle, ...(current || [])]);
  };

  const handleEditArticle = (article: Omit<Article, "id" | "dateAdded"> | Article) => {
    if ('id' in article) {
      setArticles((current) =>
        (current || []).map((a) =>
          a.id === article.id ? article : a
        )
      );
    }
  };

  const handleDeleteArticle = (id: string) => {
    setArticles((current) => (current || []).filter((article) => article.id !== id));
  };

  const handleLoadSampleArticles = () => {
    const newArticles: Article[] = sampleArticles.map((article) => ({
      ...article,
      id: crypto.randomUUID(),
      dateAdded: new Date().toISOString(),
    }));
    
    setArticles((current) => {
      const existingUrls = new Set((current || []).map(a => a.url));
      const uniqueNewArticles = newArticles.filter(a => !existingUrls.has(a.url));
      
      if (uniqueNewArticles.length === 0) {
        toast.info("All sample articles are already in your knowledge base");
        return current || [];
      }
      
      toast.success(`Added ${uniqueNewArticles.length} sample article${uniqueNewArticles.length === 1 ? '' : 's'}`);
      return [...uniqueNewArticles, ...(current || [])];
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      <PWAUpdatePrompt />
      <OfflineIndicator />
      
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6 md:px-6 md:py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-[24px] sm:text-[28px] md:text-[32px] font-semibold tracking-[-0.02em] text-foreground mb-1">
                M365 Knowledge Base
              </h1>
              <p className="text-[14px] sm:text-[15px] text-muted-foreground leading-relaxed">
                Curated articles for Microsoft 365 and Power Platform
              </p>
            </div>
            <div className="flex gap-2 flex-wrap sm:flex-nowrap">
              <Button
                onClick={handleLoadSampleArticles}
                variant="outline"
                className="gap-2 flex-1 sm:flex-initial"
                size="default"
              >
                <Database size={16} weight="bold" />
                <span className="hidden xs:inline">Load Samples</span>
                <span className="xs:hidden">Samples</span>
              </Button>
              <Button
                onClick={() => setIsAddDialogOpen(true)}
                className="gap-2 flex-1 sm:flex-initial"
                size="default"
              >
                <Plus size={16} weight="bold" />
                <span className="hidden xs:inline">Add Article</span>
                <span className="xs:hidden">Add</span>
              </Button>
            </div>
          </div>

          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <FilterBar
            selectedCategories={selectedCategories}
            onCategoriesChange={setSelectedCategories}
            totalCount={(articles || []).length}
            filteredCount={filteredArticles.length}
          />
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 md:px-6 md:py-8">
        {(articles || []).length === 0 ? (
          <EmptyState 
            onAddClick={() => setIsAddDialogOpen(true)} 
            onLoadSamples={handleLoadSampleArticles}
          />
        ) : filteredArticles.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[15px] text-muted-foreground mb-2">
              No articles match your search or filters
            </p>
            <p className="text-[13px] text-muted-foreground">
              Try adjusting your search terms or clearing filters
            </p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
            layout
          >
            <AnimatePresence mode="popLayout">
              {filteredArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  layout
                >
                  <ArticleCard
                    article={article}
                    onView={() => setViewingArticle(article)}
                    onEdit={() => setEditingArticle(article)}
                    onDelete={() => handleDeleteArticle(article.id)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      <ArticleDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSubmit={handleAddArticle}
        existingUrls={(articles || []).map((a) => a.url)}
      />

      <ArticleDialog
        open={!!editingArticle}
        onOpenChange={(open: boolean) => !open && setEditingArticle(null)}
        onSubmit={handleEditArticle}
        editingArticle={editingArticle || undefined}
        existingUrls={(articles || [])
          .filter((a) => a.id !== editingArticle?.id)
          .map((a) => a.url)}
      />

      <ArticleDetailsDialog
        article={viewingArticle}
        open={!!viewingArticle}
        onOpenChange={(open: boolean) => !open && setViewingArticle(null)}
        onEdit={() => {
          setEditingArticle(viewingArticle);
          setViewingArticle(null);
        }}
        onDelete={() => {
          if (viewingArticle) {
            handleDeleteArticle(viewingArticle.id);
            setViewingArticle(null);
          }
        }}
      />
    </div>
  );
}

export default App;
