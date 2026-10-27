const idPattern = /^[A-Za-z0-9_-]{11}$/;

export function parseYouTubeUrl(input: string): { id: string; isShort: boolean } | null {
  const raw = input.trim();
  if (idPattern.test(raw)) return { id: raw, isShort: false };

  let url: URL;
  try {
    url = new URL(raw.startsWith("http") ? raw : `https://${raw}`);
  } catch {
    return null;
  }

  const host = url.hostname.replace(/^(www\.|m\.|music\.)/, "");
  const parts = url.pathname.split("/").filter(Boolean);
  let id: string | null = null;
  let isShort = false;

  if (host === "youtu.be") {
    id = parts[0] ?? null;
  } else if (host === "youtube.com" || host === "youtube-nocookie.com") {
    if (parts[0] === "watch") id = url.searchParams.get("v");
    else if (parts[0] === "shorts") {
      id = parts[1] ?? null;
      isShort = true;
    } else if (["embed", "live", "v"].includes(parts[0] ?? "")) id = parts[1] ?? null;
  }

  return id && idPattern.test(id) ? { id, isShort } : null;
}

export const youTubeThumbnail = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
export const youTubeWatchUrl = (id: string, isShort: boolean) =>
  isShort ? `https://www.youtube.com/shorts/${id}` : `https://www.youtube.com/watch?v=${id}`;
