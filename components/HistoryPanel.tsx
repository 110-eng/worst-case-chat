"use client";
import { useEffect, useState } from "react";
import { History } from "@/lib/history";
import type { WorstCaseOutput, WorstCaseInput } from "@/lib/schema";

export default function HistoryPanel({ onPick, onClose }:{
  onPick:(i:WorstCaseInput,o:WorstCaseOutput)=>void; onClose:()=>void;
}) {
  const [items,setItems]=useState<{at:number,input:WorstCaseInput,output:WorstCaseOutput}[]>([]);
  useEffect(()=>{ setItems(History.read()); },[]);
  return (
    <div className="fixed inset-0 z-50 bg-black/70 p-6">
      <div className="mx-auto max-w-2xl rounded-lg bg-[#0B0B0F] border border-white/10 p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg">履歴</h3>
          <button onClick={onClose} className="px-2 py-1 bg-white/10 rounded">閉じる</button>
        </div>
        <div className="grid gap-2 max-h-[60vh] overflow-auto">
          {items.map((it,idx)=>(
            <button key={idx} onClick={()=>onPick(it.input,it.output)}
              className="text-left rounded border border-white/10 p-3 hover:bg-white/5">
              <div className="text-xs text-white/50">{new Date(it.at).toLocaleString()}</div>
              <div className="text-sm">{it.input.text}</div>
              <div className="text-xs text-white/60">破滅度 {it.output.doomScore}% / {it.output.title}</div>
            </button>
          ))}
          {items.length===0 && <div className="text-white/60 text-sm">まだ履歴はありません。</div>}
        </div>
      </div>
    </div>
  );
}
