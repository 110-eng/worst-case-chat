import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  href?: string;
  onClick?: () => void | Promise<void>;
  children: ReactNode;
  className?: string;
};

export default function Button({ href, onClick, children, className }: Props) {
  const base = "rounded bg-white/10 px-4 py-2 hover:bg-white/20";
  const cls = className ? `${base} ${className}` : base;

  if (href) return <Link href={href} className={cls}>{children}</Link>;
  return <button onClick={onClick} className={cls}>{children}</button>;
}
