"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type PillOption = string | { value: string; label: string };

type PillGroupProps = {
  name: string;
  legend: React.ReactNode;
  options: PillOption[];
  value: string[];
  onChange: (value: string[]) => void;
  onBlur?: () => void;
  multiple?: boolean;
  invalid?: boolean;
  describedBy?: string;
  className?: string;
};

export function PillGroup({
  name,
  legend,
  options,
  value,
  onChange,
  onBlur,
  multiple = false,
  invalid,
  describedBy,
  className,
}: PillGroupProps) {
  const toggle = (option: string) => {
    if (!multiple) return onChange([option]);
    onChange(value.includes(option) ? value.filter((v) => v !== option) : [...value, option]);
  };

  return (
    <fieldset
      className={cn("flex flex-col gap-3", className)}
      aria-invalid={invalid || undefined}
      aria-describedby={describedBy}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) onBlur?.();
      }}
    >
      <legend className="mb-3 text-sm font-medium text-foreground">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((raw) => {
          const option = typeof raw === "string" ? raw : raw.value;
          const label = typeof raw === "string" ? raw : raw.label;
          const selected = value.includes(option);
          return (
            <label
              key={option}
              className={cn(
                "inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-[background-color,border-color,color,transform] duration-200 select-none active:scale-[0.97] has-focus-visible:ring-2 has-focus-visible:ring-ring has-focus-visible:ring-offset-2 has-focus-visible:ring-offset-background",
                selected
                  ? "border-primary bg-primary text-primary-foreground"
                  : cn(
                      "bg-surface text-foreground hover:border-foreground/30",
                      invalid ? "border-destructive/60" : "border-border",
                    ),
              )}
            >
              <input
                type={multiple ? "checkbox" : "radio"}
                name={name}
                value={option}
                checked={selected}
                onChange={() => toggle(option)}
                className="sr-only"
              />
              {selected && <Check className="size-3.5" aria-hidden="true" />}
              {label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
