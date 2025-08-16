// /components/DoomRadar.tsx
"use client";

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";

type Axes = {
  regret: number;
  loss: number;
  isolation: number;
  timeWaste: number;
  credit: number;
};

const LABELS: Record<keyof Axes, string> = {
  regret: "後悔",
  loss: "損失",
  isolation: "孤独",
  timeWaste: "浪費",
  credit: "信用",
};

export default function DoomRadar({ axes }: { axes: Axes }) {
  const data = (Object.keys(axes) as (keyof Axes)[]).map((k) => ({
    key: k,
    label: LABELS[k],
    value: Math.max(0, Math.min(100, Math.round(axes[k]))),
  }));

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="label" />
          <Radar dataKey="value" className="fill-red-700 opacity-40" />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}