// /lib/history.ts
import type { WorstCaseInput, WorstCaseOutput } from "./schema";
const KEY = "wcc_history_v1";
type Item = { at: number; input: WorstCaseInput; output: WorstCaseOutput };

export const History = {
  read(): Item[] {
    try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
  },
  add(input: WorstCaseInput, output: WorstCaseOutput) {
    const list = [ { at: Date.now(), input, output }, ...History.read() ].slice(0,20);
    localStorage.setItem(KEY, JSON.stringify(list));
  },
};
