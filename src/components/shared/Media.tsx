import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MediaSlot } from "@/content/site";

const tones: Record<MediaSlot["tone"], string> = {
  warm: "from-[oklch(0.78_0.14_320)] via-[oklch(0.62_0.22_305)] to-[oklch(0.45_0.2_290)]",
  cool: "from-[oklch(0.85_0.07_280)] via-[oklch(0.64_0.14_275)] to-[oklch(0.4_0.13_280)]",
  ink: "from-[oklch(0.42_0.12_295)] via-[oklch(0.3_0.1_295)] to-[oklch(0.18_0.06_295)]",
  sand: "from-[oklch(0.96_0.03_310)] via-[oklch(0.86_0.07_310)] to-[oklch(0.7_0.12_305)]",
};

type MediaProps = {
  src?: string;
  alt: string;
  tone: MediaSlot["tone"];
  className?: string;
  sizes?: string;
  priority?: boolean;
  showLabel?: boolean;
};

export function Media({ src, alt, tone, className, sizes = "50vw", priority, showLabel = true }: MediaProps) {
  return (
    <div className={cn("relative overflow-hidden bg-linear-to-br", tones[tone], className)}>
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        <div role="img" aria-label={alt} className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgb(255_255_255/0.35),transparent_55%)]" />
          <div className="absolute inset-0 opacity-25 bg-[radial-gradient(rgb(255_255_255/0.6)_1px,transparent_1px)] bg-size-[18px_18px]" />
          {showLabel && (
            <div className="absolute inset-x-4 bottom-4 flex items-center gap-2 text-xs font-medium text-white/85">
              <ImageIcon className="size-3.5" aria-hidden="true" />
              <span className="truncate">{alt}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
