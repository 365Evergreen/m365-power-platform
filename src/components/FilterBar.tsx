import { Category } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Funnel, X } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  selectedCategories: Category[];
  onCategoriesChange: (categories: Category[]) => void;
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
  totalCount,
  filteredCount,
}: FilterBarProps) {
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

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Funnel size={16} className="text-muted-foreground" />
          <span className="text-[12px] sm:text-[13px] font-medium text-muted-foreground">
            Filter by Category
          </span>
        </div>
        {selectedCategories.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-7 text-[12px] sm:text-[13px] gap-1"
          >
            <X size={14} />
            Clear
          </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {categories.map((category) => {
          const isSelected = selectedCategories.includes(category);
          return (
            <Badge
              key={category}
              variant={isSelected ? "default" : "outline"}
              className={cn(
                "cursor-pointer text-[11px] sm:text-[12px] md:text-[13px] transition-all duration-150 hover:scale-105 whitespace-nowrap",
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
        <p className="text-[12px] sm:text-[13px] text-muted-foreground">
          Showing {filteredCount} of {totalCount} articles
        </p>
      )}
    </div>
  );
}
