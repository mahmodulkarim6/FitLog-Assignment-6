import Link from "next/link";
export default function NotFound() {
  return (
  <div className="container-px max-w-xl mx-auto py-32 text-center flex flex-col items-center gap-4">
  <p className="text-accent font-display text-7xl">404</p>
  <h1 className="font-display text-3xl uppercase">Page not found</h1>
  <p className="text-muted"> This lift doesn&apos;t exist in the library. Let&apos;s get you back on track.</p>

<Link href="/" className="bg-accent text-black font-semibold px-6 py-3 rounded-full mt-2">
    Go to workouts </Link>
</div>
);
}
