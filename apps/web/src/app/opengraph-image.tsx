import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ShapeSoup — SVG Pattern Engine";
export const size = { width: 1200, height: 630 };

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fdfbf7",
          backgroundImage: "radial-gradient(#e5e0d8 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          padding: 60,
          position: "relative",
        }}
      >
        {/* Main card */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#ffffff",
            border: "4px solid #2d2d2d",
            borderRadius: "15px 225px 15px 255px / 255px 15px 225px 15px",
            boxShadow: "8px 8px 0px 0px #2d2d2d",
            padding: "48px 64px",
            maxWidth: 900,
            textAlign: "center",
          }}
        >
          {/* Title */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "#2d2d2d",
              fontFamily: "Kalam, cursive",
              marginBottom: 16,
              transform: "rotate(-1deg)",
            }}
          >
            ShapeSoup
          </div>

          {/* Accent underline */}
          <div
            style={{
              width: 200,
              height: 6,
              backgroundColor: "#ff4d4d",
              borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
              marginBottom: 24,
            }}
          />

          {/* Subtitle */}
          <div
            style={{
              fontSize: 32,
              color: "#2d2d2d",
              fontFamily: "Patrick Hand, cursive",
              lineHeight: 1.4,
              maxWidth: 600,
            }}
          >
            A seed-based SVG generative pattern engine
          </div>

          {/* Tags */}
          <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
            {["SVG", "Deterministic", "TypeScript", "Open Source"].map((tag) => (
              <div
                key={tag}
                style={{
                  padding: "8px 20px",
                  backgroundColor: "#ffffff",
                  border: "3px solid #2d2d2d",
                  borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
                  boxShadow: "3px 3px 0px 0px #2d2d2d",
                  fontSize: 20,
                  color: "#2d2d2d",
                  fontFamily: "Patrick Hand, cursive",
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>

        {/* Decorative elements */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            right: 60,
            width: 40,
            height: 40,
            backgroundColor: "#ff4d4d",
            border: "3px solid #2d2d2d",
            borderRadius: "50%",
            boxShadow: "3px 3px 0px 0px #2d2d2d",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 50,
            left: 50,
            width: 20,
            height: 20,
            backgroundColor: "#2d5da1",
            border: "2px solid #2d2d2d",
            borderRadius: "50%",
            boxShadow: "2px 2px 0px 0px #2d2d2d",
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Kalam",
          data: await fetch(
            "https://fonts.gstatic.com/s/kalam/v16/YA9Qr0Wd4kDdMtDqHTLMkiQ0.woff2"
          ).then((res) => res.arrayBuffer()),
          style: "normal",
          weight: 700,
        },
        {
          name: "Patrick Hand",
          data: await fetch(
            "https://fonts.gstatic.com/s/patrickhand/v23/LDI1apSQOAYtSuYWp8ZhfYe8UcLLq7s.woff2"
          ).then((res) => res.arrayBuffer()),
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
