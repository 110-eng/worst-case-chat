# Worst Case Chat

「あなたの望み」を入力すると、AIが最悪の未来を生成して返してくれるアプリです。  
Next.js (App Router) + OpenAI API + Vercel で開発し、ポートフォリオ用に公開しています。  

🔗 **デモサイト**: https://your-vercel-app-url.vercel.app

---

## 📌 プロジェクト概要
- 転職活動向けポートフォリオとして開発  
- LLM（大規模言語モデル）を活用し、遊び感覚で使える対話型アプリ  
- 即デプロイできるアジャイル開発を意識して構築  

---

## ⚙️ 技術スタック

- **Framework**: Next.js 15 (App Router, TypeScript)
- **UI**: Tailwind CSS, Framer Motion, Recharts
- **State Management**: React Hooks, Zustand
- **Validation**: Zod
- **API / AI**: OpenAI API (gpt-4o-mini)
- **Hosting**: Vercel

---

## ✨ 主な機能

- フォーム入力（Enter送信・IME対応）
- AI応答（OpenAI API連携）
- 結果画面
  - Doomスコアをゲージで可視化
  - Axes（軸ごと）の分析をレーダーチャート表示
- ローディング演出（Framer Motionで暗転/フェードイン）
- エラーメッセージの画面内表示（alertは不使用）
- 履歴保存（sessionStorage）
- シェアボタン（OGP対応）

---

## 🚀 セットアップ

### 1. Clone & Install
```bash
git clone https://github.com/110-eng/worst-case-chat.git
cd worst-case-chat
pnpm install
