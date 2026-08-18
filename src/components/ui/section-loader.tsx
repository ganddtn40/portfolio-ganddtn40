import { cn } from "@/lib/utils";

export function SectionLoader({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex min-h-[50vh] items-center justify-center bg-black",
        className,
      )}
    >
      <div className="flex items-center gap-3 font-mono text-xs text-neutral-600">
        <span className="inline-block h-3 w-3 animate-spin rounded-full border border-neutral-600 border-t-white" />
        loading...
      </div>
    </div>
  );
}