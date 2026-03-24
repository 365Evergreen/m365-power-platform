import { useEffect, useState } from "react";
import { useKV } from "@github/spark/hooks";
import { Article, Category } from "@/lib/types";
import { sampleArticles } from "@/lib/seedData";
import { ArticleCard } from "@/components/ArticleCard";
import { ArticleDialog } from "@/components/ArticleDialog";
import { ArticleDetailsDialog } from "@/components/ArticleDetailsDialog";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { SearchBar } from "@/components/SearchBar";
import { FilterBar } from "@/components/FilterBar";
import { EmptyState } from "@/components/EmptyState";
import { PWAUpdatePrompt } from "@/components/PWAUpdatePrompt";
import { OfflineIndicator } from "@/components/OfflineIndicator";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { showArticleNotification } from "@/lib/notifications";
import { getAuth } from "@/lib/auth";
import { SortOption } from "@/components/SortControl";

type AuthState = {
  loading: boolean;
  authenticated: boolean;
  isContributor: boolean;
  username?: string;
};

function App() {
  const [articles, setArticles] = useKV<Article[]>("articles", []);
  const [notificationsEnabled] = useKV<boolean>('notifications-enabled', false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [sortBy, setSortBy] = useKV<SortOption>("article-sort", "date-desc");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [viewingArticle, setViewingArticle] = useState<Article | null>(null);
  const [authState, setAuthState] = useState<AuthState>({
    loading: true,
    authenticated: false,
    isContributor: false,
  });

  const handleSortChange = (sort: SortOption) => {
    setSortBy(sort);
  };

  useEffect(() => {
    let isMounted = true;

    async function loadAuthState() {
      const auth = await getAuth();
      if (!isMounted) return;

      setAuthState({
        loading: false,
        authenticated: !!auth?.authenticated,
        isContributor: !!auth?.user?.isContributor,
        username: auth?.user?.username,
      });
    }

    void loadAuthState();

    return () => {
      isMounted = false;
    };
  }, []);

  const canManageArticles = authState.authenticated && authState.isContributor;
  const articleCount = (articles || []).length;
  const categoryCount = new Set((articles || []).map((article) => article.category)).size;

  const showPermissionToast = () => {
    if (!authState.authenticated) {
      toast.error("Sign in with GitHub to create or edit articles");
      return;
    }

    toast.error("Your GitHub account is not approved to manage articles");
  };

  const sortArticles = (articlesToSort: Article[], sortOption: SortOption): Article[] => {
    const sorted = [...articlesToSort];
    
    switch (sortOption) {
      case "date-desc":
        return sorted.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
      case "date-asc":
        return sorted.sort((a, b) => new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime());
      case "title-asc":
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case "title-desc":
        return sorted.sort((a, b) => b.title.localeCompare(a.title));
      case "category-asc":
        return sorted.sort((a, b) => a.category.localeCompare(b.category));
      case "category-desc":
        return sorted.sort((a, b) => b.category.localeCompare(a.category));
      default:
        return sorted;
    }
  };

  const filteredAndSortedArticles = sortArticles(
    (articles || []).filter((article) => {
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
    }),
    sortBy || "date-desc"
  );

  const handleAddArticle = (article: Omit<Article, "id" | "dateAdded">) => {
    if (!canManageArticles) {
      showPermissionToast();
      return;
    }

    const newArticle: Article = {
      ...article,
      id: crypto.randomUUID(),
      dateAdded: new Date().toISOString(),
    };
    setArticles((current) => [newArticle, ...(current || [])]);
    
    if (notificationsEnabled) {
      showArticleNotification(article.title, article.category);
    }
  };

  const handleEditArticle = (article: Omit<Article, "id" | "dateAdded"> | Article) => {
    if (!canManageArticles) {
      showPermissionToast();
      return;
    }

    if ('id' in article) {
      setArticles((current) =>
        (current || []).map((a) =>
          a.id === article.id ? article : a
        )
      );
    }
  };

  const handleDeleteArticle = (id: string) => {
    if (!canManageArticles) {
      showPermissionToast();
      return;
    }

    setArticles((current) => (current || []).filter((article) => article.id !== id));
  };

  const handleLoadSampleArticles = () => {
    if (!canManageArticles) {
      showPermissionToast();
      return;
    }

    const newArticles: Article[] = sampleArticles.map((article) => ({
      ...article,
      sourceType: "external",
      content: "",
      id: crypto.randomUUID(),
      dateAdded: new Date().toISOString(),
    }));
    
    setArticles((current) => {
      const existingUrls = new Set((current || []).map((a) => a.url).filter(Boolean));
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

      <Header
        canManageArticles={canManageArticles}
        authLoading={authState.loading}
        isAuthenticated={authState.authenticated}
        username={authState.username}
        onAddArticle={() => setIsAddDialogOpen(true)}
        onLoadSamples={handleLoadSampleArticles}
      />

      <div className="container mx-auto px-4 py-6 md:px-6 md:py-8">
          <HeroSection
            articleCount={articleCount}
            filteredCount={filteredAndSortedArticles.length}
            categoryCount={categoryCount}
          />

          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <FilterBar
            selectedCategories={selectedCategories}
            onCategoriesChange={setSelectedCategories}
            sortBy={sortBy || "date-desc"}
            onSortChange={handleSortChange}
            totalCount={(articles || []).length}
            filteredCount={filteredAndSortedArticles.length}
          />
      </div>

      <div className="container mx-auto px-4 py-6 md:px-6 md:py-8">
        {(articles || []).length === 0 ? (
          <EmptyState 
            canManageArticles={canManageArticles}
            authLoading={authState.loading}
            isAuthenticated={authState.authenticated}
            username={authState.username}
            onAddClick={() => setIsAddDialogOpen(true)} 
            onLoadSamples={handleLoadSampleArticles}
          />
        ) : filteredAndSortedArticles.length === 0 ? (
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
              {filteredAndSortedArticles.map((article, index) => (
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
                    canManageArticles={canManageArticles}
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
        open={canManageArticles && isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSubmit={handleAddArticle}
        existingUrls={(articles || []).map((a) => a.url).filter(Boolean)}
      />

      <ArticleDialog
        open={canManageArticles && !!editingArticle}
        onOpenChange={(open: boolean) => !open && setEditingArticle(null)}
        onSubmit={handleEditArticle}
        editingArticle={editingArticle || undefined}
        existingUrls={(articles || [])
          .filter((a) => a.id !== editingArticle?.id)
          .map((a) => a.url)
          .filter(Boolean)}
      />

      <ArticleDetailsDialog
        article={viewingArticle}
        open={!!viewingArticle}
        canManageArticles={canManageArticles}
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
