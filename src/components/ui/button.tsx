import * as React from "react";
import { Button as BaseButton } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-[transform,background-color,color,box-shadow,border-color] duration-200 select-none outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-60 data-disabled:pointer-events-none data-disabled:opacity-60 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-[0_8px_24px_-8px] shadow-primary/40 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-10px] hover:shadow-primary/50 active:translate-y-0",
        accent:
          "bg-accent text-accent-foreground shadow-[0_8px_24px_-8px] shadow-accent/50 hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0",
        outline:
          "border border-foreground/15 bg-surface text-foreground hover:-translate-y-0.5 hover:border-foreground/30 active:translate-y-0",
        ghost: "text-foreground hover:bg-surface-muted",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-14 px-8 text-base",
        icon: "size-11",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonVariants = VariantProps<typeof buttonVariants>;

export function Button({
  className,
  variant,
  size,
  ...props
}: Omit<React.ComponentProps<typeof BaseButton>, "className"> & ButtonVariants & { className?: string }) {
  return <BaseButton className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export function ButtonLink({ className, variant, size, ...props }: React.ComponentProps<"a"> & ButtonVariants) {
  return <a className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
