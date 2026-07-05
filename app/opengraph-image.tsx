import { ImageResponse } from "next/og";
import { site } from "@/content/site";

// Rich WhatsApp/social preview, baked at build time (brief §7).
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.brandName} — diagnostic-led 1-to-1 math coaching`;

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
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 7,
              background: "#1e4a3c",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 13 l4 4 l10 -11"
                stroke="#fbf9f3"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
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
          Diagnostic-led 1-to-1 math coaching · Secondary · Singapore
        </div>
      </div>
    ),
    size,
  );
}
