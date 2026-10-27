import * as React from "react";
import { cn } from "@/lib/utils";
import { fieldControlClass } from "./input";

export function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return <textarea className={cn(fieldControlClass, "min-h-36 resize-y py-3", className)} {...props} />;
}
