import { ImageIcon } from "lucide-react";

interface ScreenshotPlaceholderProps {
  label: string;
}

export function ScreenshotPlaceholder({ label }: ScreenshotPlaceholderProps) {
  return (
    <div className="flex aspect-video flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/20">
      <ImageIcon className="h-8 w-8 text-muted-foreground/40" strokeWidth={1.5} />
      <p className="mt-3 text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 text-xs text-muted-foreground/60">Screenshot placeholder</p>
    </div>
  );
}
