import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "ShoreDay Nassau Concierge — secure checkout";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logo = await readFile(join(process.cwd(), "public/logo_transparent.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

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
          background: "linear-gradient(160deg, #0b3d4f 0%, #0e7c86 55%, #1aa7a1 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            width: 300,
            height: 300,
            borderRadius: 150,
            background: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={logoSrc} height={230} alt="" />
        </div>
        <div style={{ marginTop: 34, fontSize: 60, fontWeight: 700 }}>
          ShoreDay Nassau Concierge
        </div>
        <div style={{ marginTop: 10, fontSize: 32, opacity: 0.9 }}>
          Secure payment · $15 one time for your whole group
        </div>
      </div>
    ),
    size,
  );
}
