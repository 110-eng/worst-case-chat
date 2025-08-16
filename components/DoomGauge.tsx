// /components/DoomGauge.tsx
"use client";

import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

export default function DoomGauge({ value }: { value: number }) {
  const v = Math.max(0, Math.min(100, Math.round(value)));
  const data = [{ name: "doom", value: v }];

  return (
    <div className="relative h-44 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          innerRadius="70%"
          outerRadius="100%"
          startAngle={90}
          endAngle={-270}
          data={data}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            dataKey="value"
            tick={false}
          />
          <RadialBar
            background
            dataKey="value"
            cornerRadius={8}
            className="fill-red-600"
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <div className="text-center">
          <div className="text-xs text-white/60">破滅度</div>
          <div className="text-2xl font-semibold">{v}%</div>
        </div>
      </div>
    </div>
  );
}
