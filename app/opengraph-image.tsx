import { ImageResponse } from "next/og";
export const alt = "ShoreDay — Your Nassau day, in one WhatsApp chat";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "65px 80px",
          background: "#f6f1e7",
          color: "#173d44",
        }}
      >
        <div style={{ display: "flex", fontSize: 36, fontWeight: 700 }}>
          ShoreDay{" "}
          <span style={{ marginLeft: 22, fontWeight: 400, color: "#4f7375" }}>
            Nassau concierge
          </span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 76,
            lineHeight: 1.07,
            maxWidth: 920,
            letterSpacing: -3,
          }}
        >
          Your Nassau day, in one WhatsApp chat.
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 27,
          }}
        >
          <span>Plan. Offline PDF. Photo &amp; voice answers.</span>
          <span
            style={{
              background: "#d8ebdf",
              padding: "16px 25px",
              borderRadius: 30,
            }}
          >
            $9.99 for your group
          </span>
        </div>
      </div>
    ),
    size,
  );
}
