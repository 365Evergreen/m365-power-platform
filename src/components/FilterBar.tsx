import { useState } from "react";
import { Category } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Funnel, X, CaretDown } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { SortControl, SortOption } from "@/components/SortControl";

interface FilterBarProps {
  selectedCategories: Category[];
  onCategoriesChange: (categories: Category[]) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  totalCount: number;
  filteredCount: number;
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

export function FilterBar({
  selectedCategories,
  onCategoriesChange,
  sortBy,
  onSortChange,
  totalCount,
  filteredCount,
}: FilterBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleCategory = (category: Category) => {
    if (selectedCategories.includes(category)) {
      onCategoriesChange(selectedCategories.filter((c) => c !== category));
    } else {
      onCategoriesChange([...selectedCategories, category]);
    }
  };

  const clearFilters = () => {
    onCategoriesChange([]);
  };

  if (!isMobile) {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Funnel size={16} className="text-muted-foreground" />
            <span className="text-[13px] font-medium text-muted-foreground">
              Filter by Category
            </span>
          </div>
          <div className="flex items-center gap-2">
            {selectedCategories.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="h-7 text-[13px] gap-1"
              >
                <X size={14} />
                Clear
              </Button>
            )}
            <SortControl value={sortBy} onChange={onSortChange} />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const isSelected = selectedCategories.includes(category);
            return (
              <Badge
                key={category}
                variant={isSelected ? "default" : "outline"}
                className={cn(
                  "cursor-pointer text-[13px] transition-all duration-150 hover:scale-105 whitespace-nowrap",
                  isSelected
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "hover:bg-secondary"
                )}
                onClick={() => toggleCategory(category)}
              >
                {category}
              </Badge>
            );
          })}
        </div>

        {selectedCategories.length > 0 && (
          <p className="text-[13px] text-muted-foreground">
            Showing {filteredCount} of {totalCount} articles
          </p>
        )}
      </div>
    );
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 gap-2 hover:bg-secondary"
            >
              <Funnel size={16} className="text-muted-foreground" />
              <span className="text-[13px] font-medium text-foreground">
                Filters
                {selectedCategories.length > 0 && (
                  <span className="ml-1 text-primary">({selectedCategories.length})</span>
                )}
              </span>
              <CaretDown
                size={14}
                className={cn(
                  "text-muted-foreground transition-transform duration-200",
                  isOpen && "rotate-180"
                )}
              />
            </Button>
          </CollapsibleTrigger>
          {selectedCategories.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="h-7 text-[12px] gap-1"
            >
              <X size={14} />
              Clear
            </Button>
          )}
        </div>
        <SortControl value={sortBy} onChange={onSortChange} />
      </div>

      <CollapsibleContent className="space-y-3">
        <div className="flex flex-wrap gap-1.5">
          {categories.map((category) => {
            const isSelected = selectedCategories.includes(category);
            return (
              <Badge
                key={category}
                variant={isSelected ? "default" : "outline"}
                className={cn(
                  "cursor-pointer text-[11px] transition-all duration-150 hover:scale-105 whitespace-nowrap",
                  isSelected
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "hover:bg-secondary"
                )}
                onClick={() => toggleCategory(category)}
              >
                {category}
              </Badge>
            );
          })}
        </div>

        {selectedCategories.length > 0 && (
          <p className="text-[12px] text-muted-foreground">
            Showing {filteredCount} of {totalCount} articles
          </p>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}
