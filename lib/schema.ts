// /lib/schema.ts
import { z } from "zod";

export const inputSchema = z.object({
  text: z.string().min(1, "1文字以上で入力してください").max(120, "120文字までです"),
  mode: z.enum(["love","work","life","hobby","money"]),
  tone: z.enum(["horror", "dark_comedy"]),
});

export type WorstCaseInput = z.infer<typeof inputSchema>;

export const outputSchema = z.object({
  title: z.string(),
  summary: z.string(),
  story: z.string().min(50),
  doomScore: z.number().min(0).max(100),
  axes: z.object({
    regret: z.number().min(0).max(100),
    loss: z.number().min(0).max(100),
    isolation: z.number().min(0).max(100),
    timeWaste: z.number().min(0).max(100),
    credit: z.number().min(0).max(100),
  }),
  contentWarnings: z.array(z.string()).default([]),
  safe: z.boolean(),
  seed: z.string().optional(),
});
export type WorstCaseOutput = z.infer<typeof outputSchema>;