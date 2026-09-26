"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePlan } from "@/lib/PlanContext";

const SORT_OPTIONS = [
  { value: "duration", label: "Duration" },
  { value: "caloriesBurned", label: "Calories" },
  { value: "rating", label: "Rating" },
];

export default function MyPlanPage() {
  const { plan, saved, hydrated, removeFromPlan, removeFromSaved, toggleDone } =
    usePlan();
  const [tab, setTab] = useState("plan");
  const [sortBy, setSortBy] = useState("duration");

  const rawList = tab === "plan" ? plan : saved;

  const list = useMemo(() => {
    return [...rawList].sort((a, b) => (b[sortBy] || 0) - (a[sortBy] || 0));
  }, [rawList, sortBy]);

  const metrics = useMemo(() => {
    const exercises = rawList.length;
    const minutes = rawList.reduce((sum, w) => sum + (w.duration || 0), 0);
    const calories = rawList.reduce((sum, w) => sum + (w.caloriesBurned || 0), 0);
    return { exercises, minutes, calories };
  }, [rawList]);

  return (
    <div className="container-px max-w-5xl mx-auto py-12">
      <h1 className="font-display text-4xl uppercase mb-2">My Plan</h1>
      <p className="text-muted mb-8">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      {/* Metrics — single card, left-aligned columns */}
      <div className="bg-surface2 border border-border rounded-xl2 p-6 mb-6 grid grid-cols-3 gap-6">
        {[
          { label: "Exercises", value: metrics.exercises, accent: true },
          { label: "Minutes", value: metrics.minutes },
          { label: "Calories", value: metrics.calories },
        ].map((m) => (
          <div key={m.label}>
            <div className="text-muted text-xs mb-1">{m.label}</div>
            <div
              className={`font-display text-3xl font-bold ${
                m.accent ? "text-accent" : "text-white"
              }`}
            >
              {m.value}
            </div>
          </div>
        ))}
      </div>

      {/* Tabs (segmented control) + Sort By */}
      <div className="flex items-center justify-between mb-6">
        <div className="inline-flex items-center gap-1 bg-surface border border-border rounded-full p-1">
          {[
            { key: "plan", label: "Today's Plan" },
            { key: "saved", label: "Saved" },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
                tab === t.key
                  ? "bg-surface2 text-white font-semibold"
                  : "text-muted hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-2 text-sm">
          <span className="text-muted hidden sm:inline">Sort By</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-surface border border-border rounded-full pl-4 pr-9 py-2 text-white text-sm focus:outline-none focus:border-accent"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted text-xs">
              ▾
            </span>
          </div>
        </label>
      </div>

      {/* Loading / empty states live inside a bordered card */}
      {!hydrated && (
        <div className="bg-surface2/60 border border-border rounded-xl2 min-h-[300px] flex flex-col items-center justify-center text-muted gap-3">
          <span className="w-8 h-8 border-2 border-border border-t-accent rounded-full animate-spin-slow" />
          Loading workouts…
        </div>
      )}

      {hydrated && list.length === 0 && (
        <div className="bg-surface2/60 border border-border rounded-xl2 min-h-[300px] flex flex-col items-center justify-center text-center gap-4">
          <h2 className="font-display text-2xl uppercase">Nothing here yet</h2>
          <p className="text-muted max-w-sm">
            Browse the library and add a lift to get today moving.
          </p>
          <Link
            href="/"
            className="bg-accent text-black font-semibold px-6 py-3 rounded-full"
          >
            Go to workouts
          </Link>
        </div>
      )}

      {/* Each workout is its own bordered card */}
      {hydrated && list.length > 0 && (
        <ul className="flex flex-col gap-3">
          {list.map((w) => (
            <li
              key={w.id}
              className={`flex items-center gap-4 bg-surface2/60 border border-border rounded-xl2 p-4 ${
                w.done ? "opacity-50" : ""
              }`}
            >
              <div className="relative w-36 h-20 rounded-xl overflow-hidden shrink-0 bg-surface">
                <Image
                  src={w.image}
                  alt={w.name}
                  fill
                  sizes="144px"
                  className="object-cover"
                  unoptimized
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-display uppercase text-sm md:text-base truncate">
                  {w.name}
                </h3>
                <p className="text-muted text-xs">{w.equipment}</p>
                <div className="flex items-center gap-3 text-xs text-muted mt-1">
                  <span>⏱ {w.duration} min</span>
                  <span>🔥 {w.caloriesBurned} kcal</span>
                  <span>⭐ {w.rating}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href={`/workout/${w.id}`}
                  className="text-xs font-semibold border border-border rounded-full px-3 py-1.5 hover:border-accent/60"
                >
                  View Details
                </Link>
                {tab === "plan" && (
                  <button
                    onClick={() => toggleDone(w.id)}
                    className="text-xs font-bold bg-accent text-black rounded-full px-3 py-1.5"
                    title="Mark as Done"
                  >
                    ✓ Mark as Done
                  </button>
                )}
                <button
                  onClick={() =>
                    tab === "plan" ? removeFromPlan(w.id) : removeFromSaved(w.id)
                  }
                  className="text-xs font-semibold text-muted border border-border rounded-full w-7 h-7 flex items-center justify-center hover:text-white hover:border-white/40"
                  title="Remove"
                >
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}