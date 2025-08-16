"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { WorstCaseOutput } from "@/lib/schema";
import DoomGauge from "@/components/DoomGauge";
import DoomRadar from "@/components/DoomRadar";
import { motion } from "framer-motion";
import Button from "@/components/Button";
import ShareButton from "@/components/ShareButton";

export default function ResultPage() {
  const [data, setData] = useState<WorstCaseOutput | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("lastResult");
    if (raw) setData(JSON.parse(raw));
  }, []);

  if (!data) {
    return (
      <main className="min-h-dvh grid place-items-center bg-[#0B0B0F] text-white">
        <div className="space-y-2 text-center">
          <p>結果が見つかりませんでした。</p>
          <Link href="/" className="underline">
            戻る
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-dvh bg-[#0B0B0F] p-6 text-white">
      <div className="mx-auto grid max-w-4xl gap-6">
        {/* タイトル & ゲージ */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="grid gap-4 md:grid-cols-[1fr_220px]"
        >
          <div>
            <h2 className="font-serif text-2xl">{data.title}</h2>
            <p className="mt-1 text-sm text-white/60">{data.summary}</p>
          </div>
          <DoomGauge value={data.doomScore} />
        </motion.div>

        {/* レーダー */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.35 }}
          className="rounded-lg border border-white/10 bg-white/5 p-3"
        >
          <DoomRadar axes={data.axes} />
        </motion.div>

        {/* ストーリー */}
        <motion.article
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.03 } },
          }}
          className="leading-8"
        >
          {data.story.split("\n").map((line, i) => (
            <motion.p
              key={i}
              variants={{ hidden: { opacity: 0, y: 4 }, visible: { opacity: 1, y: 0 } }}
              className="whitespace-pre-wrap"
            >
              {line}
            </motion.p>
          ))}
        </motion.article>

        <div className="flex gap-2 pt-2">
          <Button href="/">もう一度</Button>
          <ShareButton title={data.title} doom={data.doomScore} />
        </div>
      </div>
    </main>
  );
}
