"use client";

import * as React from "react";
import { useActionState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Plus, Star } from "lucide-react";
import { addReview } from "@/app/actions/admin";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PillGroup } from "@/components/ui/pill-group";

type ServiceOption = { value: string; label: string };

export function AddReviewForm({ services }: { services: ServiceOption[] }) {
  const [state, action, pending] = useActionState(addReview, undefined);
  const [authorName, setAuthorName] = React.useState("");
  const [rating, setRating] = React.useState(5);
  const [text, setText] = React.useState("");
  const [reviewUrl, setReviewUrl] = React.useState("");
  const [reviewedAt, setReviewedAt] = React.useState("");
  const [tags, setTags] = React.useState<string[]>([]);

  const [handled, setHandled] = React.useState(state);
  if (state !== handled) {
    setHandled(state);
    if (state?.ok) {
      setAuthorName("");
      setRating(5);
      setText("");
      setReviewUrl("");
      setReviewedAt("");
      setTags([]);
    }
  }

  return (
    <form action={action} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="authorName">Reviewer name</Label>
          <Input id="authorName" name="authorName" value={authorName} onChange={(e) => setAuthorName(e.target.value)} required />
        </div>
        <fieldset className="flex flex-col gap-2">
          <legend className="mb-2 text-sm font-medium">Stars</legend>
          <div className="flex h-12 items-center gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <label key={n} className="cursor-pointer rounded-md p-1 has-focus-visible:ring-2 has-focus-visible:ring-ring">
                <input type="radio" name="rating" value={n} checked={rating === n} onChange={() => setRating(n)} className="sr-only" />
                <span className="sr-only">{n} stars</span>
                <Star
                  aria-hidden="true"
                  className={cn("size-7 transition-colors", n <= rating ? "fill-amber-400 text-amber-400" : "text-foreground/20")}
                />
              </label>
            ))}
          </div>
        </fieldset>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="text">Review text</Label>
        <Textarea id="text" name="text" value={text} onChange={(e) => setText(e.target.value)} required className="min-h-28" />
      </div>
      <div className="grid gap-4 sm:grid-cols-[1fr_12rem]">
        <div className="flex flex-col gap-2">
          <Label htmlFor="reviewUrl">
            Link to the review <span className="font-normal text-muted-foreground">(optional)</span>
          </Label>
          <Input
            id="reviewUrl"
            name="reviewUrl"
            type="url"
            value={reviewUrl}
            onChange={(e) => setReviewUrl(e.target.value)}
            placeholder="https://maps.app.goo.gl/..."
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="reviewedAt">
            Date <span className="font-normal text-muted-foreground">(optional)</span>
          </Label>
          <Input id="reviewedAt" name="reviewedAt" type="date" value={reviewedAt} onChange={(e) => setReviewedAt(e.target.value)} />
        </div>
      </div>
      <PillGroup
        name="services"
        legend={
          <>
            Show on service pages <span className="font-normal text-muted-foreground">(optional, pick any)</span>
          </>
        }
        options={services}
        value={tags}
        onChange={setTags}
        multiple
      />
      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={pending}>
          {pending ? <Loader2 className="animate-spin" aria-hidden="true" /> : <Plus aria-hidden="true" />}
          Add review
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
