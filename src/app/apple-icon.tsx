import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#fbf9ff" }}>
        <svg width="128" height="128" viewBox="0 0 32 32">
          <path d="M16 3 30 28H2L16 3Z" fill="#29144e" />
          <path d="M16 13.5 22.5 25h-13L16 13.5Z" fill="#8442ee" />
        </svg>
      </div>
    ),
    size,
  );
}
