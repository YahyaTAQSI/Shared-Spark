import * as React from "react";
import { Input as BaseInput } from "@base-ui/react/input";
import { cn } from "@/lib/utils";

export const fieldControlClass =
  "w-full rounded-xl border border-border bg-surface px-4 text-[15px] text-foreground transition-[border-color,box-shadow] outline-none placeholder:text-muted-foreground/70 hover:border-foreground/25 focus-visible:border-accent focus-visible:ring-4 focus-visible:ring-accent/15 aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive/15 disabled:opacity-60";

export function Input({
  className,
  ...props
}: Omit<React.ComponentProps<typeof BaseInput>, "className"> & { className?: string }) {
  return <BaseInput className={cn(fieldControlClass, "h-12", className)} {...props} />;
}
