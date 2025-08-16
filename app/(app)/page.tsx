"use client";

import { useState } from "react";
import { inputSchema, WorstCaseInput } from "@/lib/schema";
import { useRouter } from "next/navigation";
import LoadingCurtain from "@/components/LoadingCurtain";
import { ModeTiles, ToneTiles } from "@/components/ModeToneTiles";
import HistoryPanel from "@/components/HistoryPanel";
import { History } from "@/lib/history";

export default function Page() {
  const [form, setForm] = useState<WorstCaseInput>({
    text: "",
    mode: "love",
    tone: "dark_comedy",
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const router = useRouter();
  const [showHistory,setShowHistory]=useState(false);

  const submit = async () => {
    setErr(null);
    const parsed = inputSchema.safeParse(form);
    if (!parsed.success) {
      setErr(parsed.error.issues[0]?.message ?? "入力エラーです");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "生成に失敗しました");
      sessionStorage.setItem("lastResult", JSON.stringify(data));
      History.add(form, data);
      router.push("/result");
    } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e ?? "");
        setErr(msg || "生成に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // IME 変換中の Enter を無視（TS的にも安全）
    const ime = (e.nativeEvent as unknown as { isComposing?: boolean }).isComposing;
    if (ime) return;
  
    if (loading) return;
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };
  
  
  return (
    <main className="min-h-dvh grid place-items-center bg-[#0B0B0F] p-6 text-white">
      {loading && <LoadingCurtain />}
      <div className="w-full max-w-xl space-y-4">
        <h1 className="font-serif text-3xl">望みを語れ、破滅を見よ。</h1>

        <textarea
          className="h-28 w-full rounded border border-white/10 bg-black/40 p-3"
          placeholder="例：夏に彼女がほしい（Enterで送信／改行はShift+Enter）"
          maxLength={120}
          value={form.text}
          onChange={(e) => setForm({ ...form, text: e.target.value })}
          onKeyDown={onKeyDown}
        />

        <ModeTiles value={form.mode} onChange={(v)=>setForm({...form, mode:v})} />
        <ToneTiles value={form.tone} onChange={(v)=>setForm({...form, tone:v})} />
        
        <div>
          <button
            onClick={()=>setShowHistory(true)}
            className="rounded border border-white/10 px-3 py-2 hover:bg-white/5"
          >
            履歴
          </button>
        </div>

        {showHistory && (
          <HistoryPanel
            onPick={(i,o)=>{ sessionStorage.setItem("lastResult", JSON.stringify(o)); setForm(i); setShowHistory(false); router.push("/result"); }}
            onClose={()=>setShowHistory(false)}
          />
        )}
        {err && (
          <div className="rounded border border-red-500/40 bg-red-900/20 px-3 py-2 text-sm text-red-300">
            {err}
          </div>
        )}

        <button
          onClick={submit}
          disabled={loading}
          className="w-full rounded bg-red-700 py-3 hover:bg-red-600 disabled:opacity-50"
        >
          最悪を生成
        </button>

        <p className="text-xs text-white/50">
          これはフィクションです。現実の意思決定には使わないでください。
        </p>
      </div>
    </main>
  );
}
