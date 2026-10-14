import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { Logo } from "@/components/Logo";

// Rich WhatsApp/social preview, baked at build time (brief §7).
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.brandName} — diagnostic-led math coaching`;

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
          background: "#fbf9f3",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            color: "#57534a",
            fontSize: 26,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          <Logo size={64} />
          {site.brandName}
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            color: "#1a1917",
            fontSize: 68,
            lineHeight: 1.08,
            fontWeight: 600,
            letterSpacing: -1.5,
          }}
        >
          <span>The&nbsp;</span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 78,
              height: 78,
              border: "4px solid #bb3b2c",
              borderRadius: "50%",
              color: "#bb3b2c",
            }}
          >
            B
          </span>
          <span>
            &nbsp;that won&apos;t move? We find the exact reason — and&nbsp;
          </span>
          <span style={{ borderBottom: "6px solid #1e4a3c", paddingBottom: 4 }}>
            fix it
          </span>
          <span>.</span>
        </div>

        <div style={{ color: "#57534a", fontSize: 30 }}>
          Diagnostic-led math coaching · Secondary · Singapore
        </div>
      </div>
    ),
    size,
  );
}
