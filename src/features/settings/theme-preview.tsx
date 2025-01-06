import { cn } from "@/lib/utils";

export interface ThemePreviewProps {
  disabled?: boolean;
  variant?: "light" | "dark" | "system";
}

export function ThemePreview({
  disabled,
  variant = "light",
}: ThemePreviewProps) {
  const isDark = variant !== "light";

  return (
    <div
      className={cn(
        "relative flex h-20 w-full flex-col overflow-hidden rounded-lg border shadow-sm md:w-32",
        isDark ? "bg-[#201e1d]/90" : "bg-background",
        isDark ? "border border-[#201e1d]/10" : "border-[#d1d5db]/10",
        disabled && "cursor-not-allowed opacity-60",
      )}
    >
      <div
        className={cn(
          "h-4 border-b",
          isDark
            ? "border-[#201e1d]/10 bg-[#201e1d]/80"
            : "border-[#d1d5db] bg-background",
        )}
      />
      <div className="space-y-1.5 p-2">
        <div
          className={cn(
            "h-1.5 w-3/4 rounded",
            isDark ? "bg-[#201e1d]/60" : "bg-[#d1d5db]/80",
          )}
        />
        <div
          className={cn(
            "h-1.5 w-1/2 rounded",
            isDark ? "bg-[#201e1d]/60" : "bg-[#d1d5db]/80",
          )}
        />
        <div
          className={cn(
            "h-1.5 w-2/3 rounded",
            isDark ? "bg-[#201e1d]/60" : "bg-[#d1d5db]/80",
          )}
        />
      </div>
      <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-primary/20" />
    </div>
  );
}
