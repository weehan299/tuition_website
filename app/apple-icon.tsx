import { ImageResponse } from "next/og";
import { Logo } from "@/components/Logo";

// iOS home-screen icon, baked at build time. Full-bleed paper — iOS applies
// its own corner mask and would fill transparency with black.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fbf9f3",
        }}
      >
        <Logo size={140} />
      </div>
    ),
    size,
  );
}
