"use client";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { getAllWorkouts } from "@/lib/api";
import WorkoutCard from "@/components/WorkoutCard";

const SORT_OPTIONS = [
  { value: "duration", label: "Duration" },
  { value: "caloriesBurned", label: "Calories" },
  { value: "rating", label: "Rating" },
];

export default function HomePage() {
const [workouts, setWorkouts] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [sortBy, setSortBy] = useState("duration");

useEffect(() => {
  let active = true;
  setLoading(true);
  getAllWorkouts()
  .then((data) => {
    if (active) setWorkouts(data);
})
  .catch(() => {
    if (active) setError("Could not load workouts. Please try again.");
})
  .finally(() => {
    if (active) setLoading(false);
});
    return () => {
    active = false;
  };
}, []);

const sorted = useMemo(() => {
    return [...workouts].sort((a, b) => b[sortBy] - a[sortBy]);
}, [workouts, sortBy]);

return (
  <>
<section className="container-px max-w-7xl mx-auto pt-8 pb-14">
  <div className="bg-surface border border-border rounded-xl2 px-8 md:px-14 py-10 md:py-12 grid md:grid-cols-2 gap-8 items-center min-h-[280px] md:min-h-[400px]">
  <div>
  <p className="text-accent font-semibold text-xs uppercase tracking-[0.2em] mb-3">
  Workout Library</p>
  <h1 className="font-display text-3xl md:text-4xl lg:text-5xl uppercase leading-[1.05] mb-5 font-bold"> Train with intent. Log
    <br />
    every set.</h1>
  <p className="text-muted max-w-lg mb-8 text-pretty">FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.</p>
    
  <a href="#library" className="inline-flex items-center bg-accent text-black font-bold uppercase text-xs md:text-sm tracking-wide px-6 py-3 rounded-lg hover:brightness-95 transition"> Browse Workouts</a>
</div>

<div className="relative w-full h-64 md:h-80 self-end">
<Image src="/banner.png" alt="Gym training illustration" fill
  className="object-contain object-right-bottom" priority/></div>
</div>
</section>

<section id="library" className="container-px max-w-7xl mx-auto pb-24">
  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
  <div>
  <h2 className="font-display text-3xl uppercase">The Library</h2>
  <p className="text-muted text-sm mt-1"> Twelve lifts covering every major muscle group.</p>
</div>

  <label className="flex items-center gap-2 text-sm">
  <span className="text-muted">Sort By</span>
  <div className="relative">
  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
  className="appearance-none bg-surface border border-border rounded-full pl-4 pr-9 py-2 text-white text-sm focus:outline-none focus:border-accent">
{SORT_OPTIONS.map((opt) => (
<option key={opt.value} value={opt.value}>
{opt.label}</option>
))}
</select>

<span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted text-xs">▾</span>
  </div>
  </label>
  </div>

  {loading && (
  <div className="flex flex-col items-center justify-center py-20 text-muted gap-3">
  <span className="w-8 h-8 border-2 border-border border-t-accent rounded-full animate-spin-slow" /> Loading workouts…</div>
)}

{!loading && error && (
<p className="text-center text-muted py-20">{error}</p>
)}

{!loading && !error && (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
    {sorted.map((workout) => (
<WorkoutCard key={workout.id} workout={workout} />
))}</div>
)}
</section></>
);
}