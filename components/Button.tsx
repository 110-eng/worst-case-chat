import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  href?: string;         // もしhrefがあればLinkとして振る舞う
  onClick?: () => void;  // なければbutton用
  children: ReactNode;
};

export default function Button({ href, onClick, children }: Props) {
  const className =
    "rounded bg-white/10 px-4 py-2 hover:bg-white/20";

  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
}
