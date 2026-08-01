import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "AICY – AI & Web Solutions";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#000000",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Inter, sans-serif",
          color: "white",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-50%",
            left: "10%",
            width: "1000px",
            height: "1000px",
            background: "linear-gradient(to top right, rgba(59, 130, 246, 0.4), rgba(249, 115, 22, 0.4))",
            filter: "blur(180px)",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            background: "rgba(255, 255, 255, 0.05)",
            padding: "60px 80px",
            borderRadius: "40px",
          }}
        >
          <h1
            style={{
              fontSize: 100,
              fontWeight: 800,
              letterSpacing: "-0.05em",
              margin: 0,
              color: "#ffffff",
              display: "flex",
              gap: "8px",
            }}
          >
            AICY<span style={{ color: "#f97316" }} className="text-orange-500">
              .
            </span>
          </h1>
          <p
            style={{
              fontSize: 36,
              fontWeight: 400,
              color: "#9ca3af",
              marginTop: 20,
              textAlign: "center",
              maxWidth: "800px",
            }}
          >
            Building the Future of Web & AI
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
