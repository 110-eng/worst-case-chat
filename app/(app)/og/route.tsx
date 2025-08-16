import { ImageResponse } from "next/og";
export const runtime = "edge";
export const alt = "Worst Case Chat";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "Worst Case Chat";
  const doom = Number(searchParams.get("doom") || "0");

  return new ImageResponse(
    (
      <div style={{ height: 630, width: 1200, display: "flex", background: "#0B0B0F", color: "white", padding: 48, gap: 24, fontSize: 32 }}>
        <div style={{ display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
          <div style={{ fontSize: 56, fontWeight: 700 }}>{title}</div>
          <div style={{ opacity:.7 }}>破滅度: {doom}%</div>
          <div style={{ fontSize: 24, opacity:.6 }}>望みを語れ、破滅を見よ。</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
