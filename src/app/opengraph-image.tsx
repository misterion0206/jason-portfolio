import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};
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
          justifyContent: "center",
          padding: "80px",
          background: "#0a0a0a",
          color: "#f5f5f5",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#60a5fa",
          }}
        >
          Software Engineer · Full-Stack · Cloud
        </div>
        <div style={{ fontSize: 72, fontWeight: 700, marginTop: 24 }}>
          Yu-Chien (Jason) Chen
        </div>
        <div style={{ fontSize: 32, color: "#a3a3a3", marginTop: 24 }}>
          ASP.NET Core · Angular · Next.js · Azure DevOps
        </div>
      </div>
    ),
    { ...size }
  );
}
