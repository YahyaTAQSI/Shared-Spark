"use client";

import * as React from "react";
import { Pencil, Trash2, X } from "lucide-react";
import type { TrackingTag } from "@/db/schema";
import { deleteTag, toggleTag } from "@/app/actions/admin";
import { cn } from "@/lib/utils";
import { TagForm, placementOptions, scopeOptions } from "./TagForm";

export function TagCard({ tag }: { tag: TrackingTag }) {
  const [editing, setEditing] = React.useState(false);
  const done = React.useCallback(() => setEditing(false), []);
  const placement = placementOptions.find((o) => o.value === tag.placement)?.label;
  const scope = scopeOptions.find((o) => o.value === tag.scope)?.label;

  return (
    <li className={cn("rounded-2xl border bg-surface p-5", tag.enabled ? "border-border" : "border-dashed border-border opacity-75")}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate font-semibold">{tag.name}</p>
          <p className="mt-1 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full bg-surface-muted px-2 py-0.5">{placement}</span>
            <span className={cn("rounded-full px-2 py-0.5", tag.scope === "thank_you" ? "bg-accent-soft" : "bg-surface-muted")}>{scope}</span>
          </p>
        </div>
        <div className="flex items-center gap-1">
          <form action={toggleTag}>
            <input type="hidden" name="id" value={tag.id} />
            <input type="hidden" name="enabled" value={String(!tag.enabled)} />
            <button
              type="submit"
              role="switch"
              aria-checked={tag.enabled}
              aria-label={`${tag.enabled ? "Turn off" : "Turn on"} ${tag.name}`}
              className={cn(
                "relative mr-2 inline-flex h-6 w-11 items-center rounded-full transition-colors",
                tag.enabled ? "bg-accent" : "bg-foreground/20",
              )}
            >
              <span className={cn("size-5 rounded-full bg-white shadow transition-transform", tag.enabled ? "translate-x-5.5" : "translate-x-0.5")} />
            </button>
          </form>
          <button
            type="button"
            onClick={() => setEditing((v) => !v)}
            aria-expanded={editing}
            aria-label={editing ? "Cancel editing" : `Edit ${tag.name}`}
            className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-surface-muted hover:text-foreground"
          >
            {editing ? <X className="size-4" aria-hidden="true" /> : <Pencil className="size-4" aria-hidden="true" />}
          </button>
          <form
            action={deleteTag}
            onSubmit={(e) => {
              if (!window.confirm(`Delete "${tag.name}"? This cannot be undone.`)) e.preventDefault();
            }}
          >
            <input type="hidden" name="id" value={tag.id} />
            <button
              type="submit"
              aria-label={`Delete ${tag.name}`}
              className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="size-4" aria-hidden="true" />
            </button>
          </form>
        </div>
      </div>
      {editing && (
        <div className="mt-5 border-t border-border pt-5">
          <TagForm tag={tag} onDone={done} />
        </div>
      )}
    </li>
  );
}
