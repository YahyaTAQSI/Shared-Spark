import * as React from "react";
import type { TrackingTag } from "@/db/schema";

type Node =
  | { kind: "script" | "noscript" | "style"; attrs: Record<string, string | true>; content: string }
  | { kind: "meta" | "link"; attrs: Record<string, string | true> };

const elementPattern = /<(script|noscript|style)\b([^>]*)>([\s\S]*?)<\/\1\s*>|<(meta|link)\b([^>]*?)\/?>/gi;
const attrPattern = /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g;

const attrNames: Record<string, string> = {
  class: "className",
  charset: "charSet",
  crossorigin: "crossOrigin",
  "http-equiv": "httpEquiv",
  referrerpolicy: "referrerPolicy",
  fetchpriority: "fetchPriority",
  nomodule: "noModule",
};

function parseAttrs(source: string) {
  const attrs: Record<string, string | true> = {};
  for (const match of source.matchAll(attrPattern)) {
    const name = match[1].toLowerCase();
    const value = match[2] ?? match[3] ?? match[4];
    attrs[attrNames[name] ?? name] = value ?? true;
  }
  return attrs;
}

export function parseSnippet(code: string): Node[] {
  const nodes: Node[] = [];
  for (const match of code.matchAll(elementPattern)) {
    if (match[1]) {
      nodes.push({ kind: match[1].toLowerCase() as "script", attrs: parseAttrs(match[2]), content: match[3].trim() });
    } else {
      nodes.push({ kind: match[4].toLowerCase() as "meta", attrs: parseAttrs(match[5]) });
    }
  }
  if (nodes.length === 0 && code.trim()) nodes.push({ kind: "script", attrs: {}, content: code.trim() });
  return nodes;
}

function renderNode(node: Node, key: string) {
  if (!("content" in node)) {
    return node.kind === "meta" ? <meta key={key} {...node.attrs} /> : <link key={key} {...node.attrs} />;
  }
  const { kind, attrs, content } = node;
  if (kind === "script") {
    return content ? (
      <script key={key} {...attrs} dangerouslySetInnerHTML={{ __html: content }} />
    ) : (
      <script key={key} {...attrs} />
    );
  }
  if (kind === "noscript") return <noscript key={key} {...attrs} dangerouslySetInnerHTML={{ __html: content }} />;
  return <style key={key} {...attrs} dangerouslySetInnerHTML={{ __html: content }} />;
}

export function TrackingTags({ tags }: { tags: TrackingTag[] }) {
  return <>{tags.flatMap((tag) => parseSnippet(tag.code).map((node, i) => renderNode(node, `${tag.id}-${i}`)))}</>;
}
