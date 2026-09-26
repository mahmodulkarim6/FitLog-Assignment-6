"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { usePlan } from "@/lib/PlanContext";
export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

const links = [
  { href: "/", label: "Workouts" },
  { href: "/my-plan", label: "My Plan" },
  ];

  return (
  <header className="sticky top-0 z-50 bg-base/95 backdrop-blur border-b border-border">
    <div className="container-px max-w-7xl mx-auto flex items-center justify-between h-16 md:h-20">
  <Link href="/" className="flex items-center gap-2 font-display text-xl md:text-2xl tracking-wide">
  <span className="relative w-8 h-8 shrink-0">

<Image src="/logo.png" alt="FitLog logo" fill className="object-contain" priority />
</span>
  FITLOG</Link>

<nav className="hidden md:flex items-center gap-2 font-body text-sm">
  {links.map((link) => {
  const active = pathname === link.href;
    return (
  <Link key={link.href} href={link.href}
className={`px-4 py-1.5 rounded-full transition-colors ${active? "bg-accent/15 text-accent font-semibold": "text-muted hover:text-white"}`}>{link.label}</Link>
);
})}</nav>

<div className="flex items-center gap-5 text-sm">
  <Link href="/my-plan" className="flex items-center gap-2 text-white">
  Plan
<span className="w-5 h-5 flex items-center justify-center rounded-full bg-accent text-black text-xs font-bold">{plan.length}</span></Link>

<Link href="/my-plan" className="flex items-center gap-2 text-muted">
  Saved
  <span className="w-5 h-5 flex items-center justify-center rounded-full border border-border text-xs font-semibold">{saved.length}</span></Link>
</div>
</div>

  <div className="md:hidden flex items-center justify-center gap-3 pb-3 font-body text-sm">
    {links.map((link) => {
    const active = pathname === link.href;
      return (
      
  <Link key={link.href} href={link.href} className={`px-4 py-1.5 rounded-full ${active ? "border border-accent text-accent font-semibold" : "text-muted"}`}>{link.label}</Link>
  );
  })}
</div>
  </header>
  );
}