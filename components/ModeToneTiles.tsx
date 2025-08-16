// /components/ModeToneTiles.tsx
"use client";
import type { WorstCaseInput } from "@/lib/schema";

type Mode = WorstCaseInput["mode"]; // ← ここがポイント（常にschemaと同期）
type Tone = WorstCaseInput["tone"];

export function ModeTiles({
  value, onChange,
}: { value: Mode; onChange: (v: Mode) => void }) {
  const opts: { v: Mode; l: string }[] = [
    { v: "love",  l: "恋愛" },
    { v: "work",  l: "仕事" },
    { v: "life",  l: "生活" },
    { v: "hobby", l: "趣味" },
    { v: "money", l: "お金" },
  ];
  return (
    <div className="grid grid-cols-3 gap-2">
      {opts.map(o => (
        <button
          key={o.v}
          onClick={() => onChange(o.v)}
          className={`rounded p-3 border ${
            value === o.v ? "bg-white/15 border-white/30"
                          : "bg-black/40 border-white/10 hover:bg-white/5"
          }`}
        >
          {o.l}
        </button>
      ))}
    </div>
  );
}

export function ToneTiles({
  value, onChange,
}: { value: Tone; onChange: (v: Tone) => void }) {
  const opts: { v: Tone; l: string }[] = [
    { v: "dark_comedy", l: "ダークコメディ" },
    { v: "horror",      l: "ホラー" },
  ];
  return (
    <div className="grid grid-cols-2 gap-2">
      {opts.map(o => (
        <button
          key={o.v}
          onClick={() => onChange(o.v)}
          className={`rounded p-3 border ${
            value === o.v ? "bg-white/15 border-white/30"
                          : "bg-black/40 border-white/10 hover:bg-white/5"
          }`}
        >
          {o.l}
        </button>
      ))}
    </div>
  );
}