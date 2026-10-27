"use client";

import * as React from "react";
import { Select as BaseSelect } from "@base-ui/react/select";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { fieldControlClass } from "./input";

type SelectProps = {
  id?: string;
  name?: string;
  value: string | null;
  onValueChange: (value: string | null) => void;
  onBlur?: () => void;
  options: string[];
  placeholder: string;
  invalid?: boolean;
  describedBy?: string;
  disabled?: boolean;
};

export function Select({
  id,
  name,
  value,
  onValueChange,
  onBlur,
  options,
  placeholder,
  invalid,
  describedBy,
  disabled,
}: SelectProps) {
  return (
    <BaseSelect.Root
      id={id}
      name={name}
      value={value}
      onValueChange={(next) => onValueChange((next as string | null) ?? null)}
      onOpenChange={(open) => {
        if (!open) onBlur?.();
      }}
      disabled={disabled}
      modal={false}
    >
      <BaseSelect.Trigger
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        className={cn(
          fieldControlClass,
          "group/select flex h-12 items-center justify-between gap-3 text-left data-popup-open:border-accent",
        )}
      >
        <BaseSelect.Value className="truncate data-placeholder:text-muted-foreground/70" placeholder={placeholder} />
        <BaseSelect.Icon className="text-muted-foreground transition-transform duration-200 group-data-popup-open/select:rotate-180">
          <ChevronDown className="size-4" />
        </BaseSelect.Icon>
      </BaseSelect.Trigger>
      <BaseSelect.Portal>
        <BaseSelect.Positioner className="z-50 outline-none" sideOffset={6} alignItemWithTrigger={false}>
          <BaseSelect.Popup className="min-w-(--anchor-width) origin-(--transform-origin) rounded-xl border border-border bg-surface p-1.5 shadow-xl shadow-black/10 outline-none transition-[scale,opacity] duration-150 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0">
            <BaseSelect.List className="max-h-(--available-height) overflow-y-auto">
              {options.map((option) => (
                <BaseSelect.Item
                  key={option}
                  value={option}
                  className="flex cursor-default items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm outline-none select-none data-highlighted:bg-surface-muted"
                >
                  <BaseSelect.ItemText>{option}</BaseSelect.ItemText>
                  <BaseSelect.ItemIndicator>
                    <Check className="size-4 text-accent" />
                  </BaseSelect.ItemIndicator>
                </BaseSelect.Item>
              ))}
            </BaseSelect.List>
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  );
}
