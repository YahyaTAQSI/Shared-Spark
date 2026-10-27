import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.brand.name}: ${site.hero.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "linear-gradient(135deg, #fbf9ff 0%, #efe6ff 55%, #c9a8ff 100%)",
          color: "#29144e",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="72" height="72" viewBox="0 0 32 32">
            <path d="M16 3 30 28H2L16 3Z" fill="#29144e" />
            <path d="M16 13.5 22.5 25h-13L16 13.5Z" fill="#8442ee" />
          </svg>
          <div style={{ fontSize: 44, fontWeight: 700 }}>{site.brand.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", flexWrap: "wrap", fontSize: 84, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>
            <span style={{ whiteSpace: "pre" }}>{site.hero.headline.replace(site.hero.highlight, "")}</span>
            <span style={{ color: "#8442ee" }}>{site.hero.highlight}</span>
          </div>
          <div style={{ fontSize: 32, color: "#5b4a7a", maxWidth: 900 }}>{site.hero.subtext}</div>
        </div>
      </div>
    ),
    size,
  );
}
