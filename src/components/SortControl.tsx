import { SortAscending, Calendar, Folder, Check } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export type SortOption = "date-desc" | "date-asc" | "title-asc" | "title-desc" | "category-asc" | "category-desc";

interface SortControlProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const sortOptions = [
  { value: "date-desc" as SortOption, label: "Newest First", icon: Calendar },
  { value: "date-asc" as SortOption, label: "Oldest First", icon: Calendar },
  { value: "title-asc" as SortOption, label: "Title A-Z", icon: SortAscending },
  { value: "title-desc" as SortOption, label: "Title Z-A", icon: SortAscending },
  { value: "category-asc" as SortOption, label: "Category A-Z", icon: Folder },
  { value: "category-desc" as SortOption, label: "Category Z-A", icon: Folder },
];

export function SortControl({ value, onChange }: SortControlProps) {
  const currentOption = sortOptions.find((opt) => opt.value === value);
  const Icon = currentOption?.icon || SortAscending;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Icon className="text-muted-foreground" />
          <span className="hidden sm:inline">{currentOption?.label || "Sort"}</span>
          <span className="sm:hidden">Sort</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[180px]">
        {sortOptions.map((option) => {
          const OptionIcon = option.icon;
          const isActive = value === option.value;
          return (
            <DropdownMenuItem
              key={option.value}
              onClick={() => onChange(option.value)}
              className="gap-2 justify-between"
            >
              <div className="flex items-center gap-2">
                <OptionIcon className="text-muted-foreground" />
                <span className={cn(isActive && "font-medium")}>
                  {option.label}
                </span>
              </div>
              {isActive && (
                <Check className="text-primary" weight="bold" />
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
