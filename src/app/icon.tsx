import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 17,
          background: "#06080F",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#38bdf8",
          borderRadius: "8px",
          border: "1.5px solid #2563eb",
          fontWeight: 800,
          fontFamily: "monospace",
          letterSpacing: "-0.5px",
        }}
      >
        R
      </div>
    ),
    { ...size }
  );
}
