import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { inputSchema, outputSchema, type WorstCaseInput } from "@/lib/schema";
import { buildPrompt } from "@/lib/prompt";

export const runtime = "edge";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const input = inputSchema.parse(body) as WorstCaseInput;

    const banned = /(自殺|殺害|テロ|差別用語)/;
    if (banned.test(input.text)) {
      return NextResponse.json(
        { error: "この内容は生成できませんでした。別の表現で試してください。" },
        { status: 400 }
      );
    }

    const prompt = buildPrompt(input);
    const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

    // Chat Completions + JSONモード
    const completion = await client.chat.completions.create({
      model,
      response_format: { type: "json_object" } as any, // 型の警告回避
      messages: [
        { role: "system", content: "あなたは『最悪シナリオ生成器』です。指示されたJSONのみを返してください。" },
        { role: "user", content: prompt },
      ],
      temperature: 0.8,
    });

    const jsonText = completion.choices[0]?.message?.content ?? "";
    const cleaned = jsonText.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);

    const output = outputSchema.parse(parsed);
    return NextResponse.json(output, { status: 200 });
  } catch (e: any) {
    console.error(e);
    const message = e?.issues?.[0]?.message || e?.message || "generation_failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}