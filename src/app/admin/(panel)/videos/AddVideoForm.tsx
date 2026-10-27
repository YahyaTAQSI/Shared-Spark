"use client";

import * as React from "react";
import { useActionState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Plus } from "lucide-react";
import { addVideo } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

type ServiceOption = { slug: string; name: string };

export function AddVideoForm({ services }: { services: ServiceOption[] }) {
  const [state, action, pending] = useActionState(addVideo, undefined);
  const [service, setService] = React.useState<string | null>(null);
  const [url, setUrl] = React.useState("");
  const [title, setTitle] = React.useState("");
  const names = services.map((s) => s.name);
  const slugFor = (name: string | null) => services.find((s) => s.name === name)?.slug ?? "";

  const [handled, setHandled] = React.useState(state);
  if (state !== handled) {
    setHandled(state);
    if (state?.ok) {
      setUrl("");
      setTitle("");
    }
  }

  return (
    <form action={action} className="mt-8 rounded-2xl border border-border bg-surface p-5 sm:p-6">
      <h2 className="font-semibold">Add a video</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-[14rem_1fr_1fr_auto] md:items-end">
        <div className="flex flex-col gap-2">
          <Label htmlFor="service">Service</Label>
          <Select id="service" value={service} onValueChange={setService} options={names} placeholder="Choose a service" />
          <input type="hidden" name="serviceSlug" value={slugFor(service)} />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="url">YouTube link</Label>
          <Input id="url" name="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://www.youtube.com/watch?v=..." required />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="title">
            Title <span className="font-normal text-muted-foreground">(optional)</span>
          </Label>
          <Input id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Shown on the video" />
        </div>
        <Button type="submit" disabled={pending} className="h-12">
          {pending ? <Loader2 className="animate-spin" aria-hidden="true" /> : <Plus aria-hidden="true" />}
          Add video
        </Button>
      </div>
      <div aria-live="polite" className="mt-3 min-h-5 text-sm">
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
    </form>
  );
}
