"use client";

import * as React from "react";
import { useActionState } from "react";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import type { TagPlacement, TagScope, TrackingTag } from "@/db/schema";
import { saveTag } from "@/app/actions/admin";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const placementOptions: { value: TagPlacement; label: string; hint: string }[] = [
  { value: "head", label: "Header", hint: "Inside <head>. Most tags go here." },
  { value: "body_start", label: "Top of page", hint: "Right after <body> opens, e.g. GTM noscript." },
  { value: "body_end", label: "Footer", hint: "Just before </body> closes." },
];

export const scopeOptions: { value: TagScope; label: string; hint: string }[] = [
  { value: "all", label: "All pages", hint: "Site-wide tracking and remarketing." },
  { value: "thank_you", label: "Thank-you page only", hint: "Conversion events, fires after a form fill." },
];

function ChoiceGroup<T extends string>({
  legend,
  name,
  options,
  value,
  onChange,
}: {
  legend: string;
  name: string;
  options: { value: T; label: string; hint: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="mb-2 text-sm font-medium">{legend}</legend>
      <div className="grid gap-2 sm:grid-cols-[repeat(auto-fit,minmax(10rem,1fr))]">
        {options.map((option) => (
          <label
            key={option.value}
            className={cn(
              "flex cursor-pointer flex-col gap-0.5 rounded-xl border p-3 transition-colors has-focus-visible:ring-2 has-focus-visible:ring-ring",
              value === option.value ? "border-accent bg-accent-soft" : "border-border hover:border-foreground/25",
            )}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            <span className="text-sm font-semibold">{option.label}</span>
            <span className="text-xs text-muted-foreground">{option.hint}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function TagForm({ tag, onDone }: { tag?: TrackingTag; onDone?: () => void }) {
  const [state, action, pending] = useActionState(saveTag, undefined);
  const [name, setName] = React.useState(tag?.name ?? "");
  const [code, setCode] = React.useState(tag?.code ?? "");
  const [placement, setPlacement] = React.useState<TagPlacement>(tag?.placement ?? "head");
  const [scope, setScope] = React.useState<TagScope>(tag?.scope ?? "all");
  const prefix = tag ? `tag-${tag.id}` : "tag-new";

  const [handled, setHandled] = React.useState(state);
  if (state !== handled) {
    setHandled(state);
    if (state?.ok && !tag) {
      setName("");
      setCode("");
      setPlacement("head");
      setScope("all");
    }
  }

  React.useEffect(() => {
    if (state?.ok) onDone?.();
  }, [state, onDone]);

  return (
    <form action={action} className="flex flex-col gap-5">
      {tag && <input type="hidden" name="id" value={tag.id} />}
      <div className="flex flex-col gap-2">
        <Label htmlFor={`${prefix}-name`}>Name</Label>
        <Input
          id={`${prefix}-name`}
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Google Ads global tag"
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor={`${prefix}-code`}>Tag code</Label>
        <Textarea
          id={`${prefix}-code`}
          name="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={"<!-- Paste the full snippet here -->\n<script async src=\"https://www.googletagmanager.com/gtag/js?id=AW-XXXXXXX\"></script>"}
          spellCheck={false}
          required
          className="min-h-44 font-mono text-[13px]"
        />
      </div>
      <ChoiceGroup legend="Where on the page" name="placement" options={placementOptions} value={placement} onChange={setPlacement} />
      <ChoiceGroup legend="Which pages" name="scope" options={scopeOptions} value={scope} onChange={setScope} />
      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={pending}>
          {pending && <Loader2 className="animate-spin" aria-hidden="true" />}
          {tag ? "Save changes" : "Add tag"}
        </Button>
        <div aria-live="polite" className="text-sm">
          {state?.error && (
            <p className="flex items-center gap-2 text-destructive">
              <AlertCircle className="size-4" aria-hidden="true" />
              {state.error}
            </p>
          )}
          {state?.ok && (
            <p className="flex items-center gap-2 text-success">
              <CheckCircle2 className="size-4" aria-hidden="true" />
              {state.message}
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
