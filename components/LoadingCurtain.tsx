// /components/LoadingCurtain.tsx
export default function LoadingCurtain() {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/80 backdrop-blur-sm">
      <div className="w-48 h-1 overflow-hidden rounded bg-white/10">
        <div className="h-full w-1/3 animate-[load_1s_infinite] bg-red-700" />
      </div>
      <style jsx global>{`
        @keyframes load { 0% {transform: translateX(-100%)} 100% {transform: translateX(300%)} }
      `}</style>
    </div>
  );
}