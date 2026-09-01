import { ImageResponse } from "next/og";

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
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0e1113",
          color: "#f6f2ea",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#3db4d3",
            marginBottom: 28,
          }}
        >
          Automated Retail, Engineered
        </div>
        <div style={{ fontSize: 120, fontWeight: 600, letterSpacing: -2 }}>
          STACKD
        </div>
        <div
          style={{
            fontSize: 32,
            color: "rgba(246, 242, 234, 0.7)",
            marginTop: 24,
          }}
        >
          Smart Vending Machines for Hospitality Venues
        </div>
      </div>
    ),
    { ...size },
  );
}
