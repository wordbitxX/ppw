import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

/**
 * Shared social card for the pages whose pitch is a number (PKR, USD, pricing).
 *
 * Audit 30 Oct 2026 (P2): /pk and /usa were sharing the generic "Building
 * Digital Products…" card, so a WhatsApp or Slack share of the price page
 * showed no price. These cards lead with the figure a buyer came for.
 *
 * Kept in one file so every price card has the same layout and the brand mark
 * only lives in one place. Each route folder supplies its own opengraph-image
 * file that calls this with its own words.
 */

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

export type OgCard = {
  eyebrow: string;
  title: string;
  sub: string;
  /** Big figure printed under the title, e.g. "Rs. 20,000" or "$150". */
  figure?: string;
  /** Small print beside the figure, e.g. "fixed package · 2–3 weeks". */
  figureNote?: string;
};

export function renderOgCard({ eyebrow, title, sub, figure, figureNote }: OgCard) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "68px 72px",
          background: "linear-gradient(135deg, #061229 0%, #050d21 55%, #030814 100%)",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -170,
            right: -130,
            width: 540,
            height: 540,
            borderRadius: 9999,
            background: "rgba(28,168,48,0.30)",
            filter: "blur(120px)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -190,
            left: -110,
            width: 470,
            height: 470,
            borderRadius: 9999,
            background: "rgba(42,111,214,0.28)",
            filter: "blur(120px)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 62,
                height: 62,
                borderRadius: 18,
                background: "#0a1c3f",
                border: "2px solid #1ca830",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                fontSize: 28,
                fontWeight: 700,
              }}
            >
              W
            </div>
            <div style={{ display: "flex", fontSize: 34, fontWeight: 700, color: "#ffffff", letterSpacing: -1 }}>
              Wordbit<span style={{ color: "#1ca830" }}>X</span>
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "#2ec243", fontWeight: 600 }}>{siteConfig.domain}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#7fd4ff",
              fontWeight: 600,
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: title.length > 46 ? 58 : 66,
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.08,
              letterSpacing: -2,
              maxWidth: 960,
            }}
          >
            {title}
          </div>
          {figure ? (
            <div style={{ display: "flex", alignItems: "baseline", gap: 18 }}>
              <div style={{ display: "flex", fontSize: 64, fontWeight: 700, color: "#2ec243", letterSpacing: -2 }}>
                {figure}
              </div>
              {figureNote ? (
                <div style={{ display: "flex", fontSize: 26, color: "#93a8c6" }}>{figureNote}</div>
              ) : null}
            </div>
          ) : null}
        </div>

        <div style={{ display: "flex", fontSize: 25, color: "#cbd6e6", lineHeight: 1.4, maxWidth: 1000 }}>{sub}</div>
      </div>
    ),
    ogSize,
  );
}
