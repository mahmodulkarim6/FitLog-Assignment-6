import Image from "next/image";
export default function Footer() {
  return (
  <footer className="border-t border-border bg-surface mt-16">
    <div className="container-px max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 py-8">

<div className="flex items-center gap-2 font-display text-lg tracking-wide">
  <span className="relative w-7 h-7 shrink-0">
  <Image src="/logo.png" alt="FitLog logo" fill className="object-contain" /></span>
    FITLOG</div>
<p className="text-muted text-sm text-center md:text-right">
  © 2026 FitLog — Workout Library. Train hard, log honest.</p></div>
</footer>
);
}