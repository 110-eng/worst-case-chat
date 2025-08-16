// /lib/prompt.ts
import type { WorstCaseInput } from "./schema";

export const buildPrompt = (input: WorstCaseInput) => {
  const tone = input.tone === "horror" ? "ホラー" : "ダークコメディ";
  const domain = input.mode==="love"?"恋愛":input.mode==="work"?"仕事":input.mode==="life"?"生活":input.mode==="hobby"?"趣味":"お金";
  return `
あなたは「最悪シナリオ生成器」です。ユーザーの願望/計画から、現実的かつドラマチックな最悪の結末を日本語で生成します。
出力は**必ず**次のJSONだけを返し、説明文は一切書かないでください。

トーン: ${tone}
テーマ領域: ${domain}
文字数: 400〜700字（story）
禁止: ヘイト、差別、自傷・自殺の助長、違法行為の具体的指示、過度な暴力描写
焦点: 心理的・社会的・時間的損失を中心に描写。露骨な表現は比喩で置換。

# 入力
${JSON.stringify(input)}

# 出力JSONの型
{
 "title": "string",
 "summary": "string",
 "story": "string",
 "doomScore": 0-100,
 "axes": {"regret":0-100,"loss":0-100,"isolation":0-100,"timeWaste":0-100,"credit":0-100},
 "contentWarnings": ["string", "..."],
 "safe": true,
 "seed": "string"
}
`.trim();
};
