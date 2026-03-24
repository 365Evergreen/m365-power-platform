import { SquaresFour, List } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ViewMode = "grid" | "list";

interface ViewToggleProps {
  value: ViewMode;
  onChange: (value: ViewMode) => void;
}

export function ViewToggle({ value, onChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "h-7 w-7 transition-all duration-150",
          value === "grid"
            ? "bg-background shadow-sm"
            : "hover:bg-background/50"
        )}
        onClick={() => onChange("grid")}
        title="Grid view"
      >
        <SquaresFour size={16} weight={value === "grid" ? "fill" : "regular"} />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "h-7 w-7 transition-all duration-150",
          value === "list"
            ? "bg-background shadow-sm"
            : "hover:bg-background/50"
        )}
        onClick={() => onChange("list")}
        title="List view"
      >
        <List size={16} weight={value === "list" ? "fill" : "regular"} />
      </Button>
    </div>
  );
}
