"use client";
import Button from "./Button";

export default function ShareButton({ title, doom }: { title: string; doom: number }) {
  const handleShare = async () => {
    const url = `${location.origin}/?utm=share`;
    const text = `「${title}」 破滅度${doom}% - 最悪シナリオメーカー`;
    if (navigator.share) {
      await navigator.share({ title: "Worst Case Chat", text, url });
    } else {
      await navigator.clipboard.writeText(`${text}\n${url}`);
      alert("共有用テキストをコピーしました");
    }
  };

  return <Button onClick={handleShare}>シェア</Button>;
}
