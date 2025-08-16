"use client";

import Button from "./Button";

export default function ShareButton({ title, doom }: { title: string; doom: number }) {
  const handleShare = async () => {
    const url = `${window.location.origin}/result?title=${encodeURIComponent(title)}&doom=${doom}`;
    if (navigator.share) {
      await navigator.share({ title: "Worst Case Chat", text: title, url });
    } else {
      await navigator.clipboard.writeText(url);
      alert("URLをコピーしました！");
    }
  };

  return (
    <Button onClick={handleShare}>シェア</Button>
  );
}
