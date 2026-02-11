import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs uppercase tracking-[0.2em]",
        variant === "default"
          ? "bg-accent/20 text-accent"
          : "border border-border/60 text-muted",
        className
      )}
      {...props}
    />
  );
}
