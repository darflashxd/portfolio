import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

// Brief: personal cat mark; calm, alert; silhouette first; readable at 16px;
// charcoal/off-white; no fine detail; fixed geometry; no motion.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#101214",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "7px",
        }}
      >
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <path fill="#f2f3f5" d="M6 6 13 10Q16 9 19 10L26 6 25 18Q25 26 16 27 7 26 7 18Z" />
          <path fill="#101214" d="M10 16 14 17 14 19 10 18ZM22 16 18 17 18 19 22 18Z" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
