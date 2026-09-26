"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { getWorkoutById } from "@/lib/api";
import { usePlan } from "@/lib/PlanContext";
export default function WorkoutDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToPlan, addToSaved, isPlanFull } = usePlan();
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

useEffect(() => {
    let active = true;
    setLoading(true);
    getWorkoutById(id)
    .then((data) => {
      if (!active) return;
      if (!data || data.error || (Array.isArray(data) && data.length === 0)) {
      setNotFound(true);
  } else {
  setWorkout(Array.isArray(data) ? data[0] : data);
}
})
  .catch(() => {
    if (active) setNotFound(true);
})
  .finally(() => {
    if (active) setLoading(false);
  });
  return () => {
  active = false;
};
}, [id]);

  if (loading) {
    return (
  <div className="flex flex-col items-center justify-center py-32 text-muted gap-3">
  <span className="w-8 h-8 border-2 border-border border-t-accent rounded-full animate-spin-slow" />
  Loading workout…
</div>
  );
}

  if (notFound || !workout){
    return (
    <div className="flex flex-col items-center justify-center py-32 text-center gap-4">
    <h1 className="font-display text-3xl uppercase">Workout not found</h1>
  <button onClick={() => router.push("/")} className="bg-accent text-black font-semibold px-6 py-3 rounded-full">
  Go to workouts
  </button>
</div>
);
}

  const specs =[
    { label: "Equipment", value: workout.equipment },
    { label: "Difficulty", value: workout.difficulty },
    { label: "Sets", value: workout.sets },
    { label: "Reps", value: workout.reps },
    { label: "Duration", value: `${workout.duration} min` },
    { label: "Calories", value: `${workout.caloriesBurned} kcal` },
    { label: "Rating", value: workout.rating },
  ];

  return (
    <div className="container-px max-w-7xl mx-auto py-12 grid md:grid-cols-2 gap-10">
    <div className="relative w-full aspect-square md:aspect-auto md:h-full rounded-xl2 overflow-hidden bg-surface border border-border">
  <Image src={workout.image} alt={workout.name} fill className="object-cover" unoptimized
      priority/>
</div>

  <div>
  <h1 className="font-display text-3xl md:text-4xl uppercase mb-3">
    {workout.name}</h1>
  <p className="text-muted mb-4">{workout.description}</p>

  <div className="flex gap-2 mb-6 flex-wrap">
  {workout.muscleGroups?.map((tag) => (
  <span key={tag} className="text-[10px] uppercase tracking-wide font-bold bg-accent text-black rounded-full px-2 py-0.5">{tag}</span>
))}
</div>

  <div className="bg-surface border border-border rounded-xl2 divide-y divide-border mb-6">
  {specs.map((spec) => (
  <div key={spec.label} className="flex items-center justify-between px-4 py-2.5 text-sm">
  <span className="text-muted uppercase text-xs tracking-wide">
  {spec.label}</span>
  
  <span className="font-medium">{spec.value}</span></div>
  ))}
</div>

  <h2 className="font-display uppercase text-lg mb-3">Instructions</h2>
  <ol className="space-y-3 mb-8">
  {workout.instructions?.map((step, i) => (
  <li key={i} className="flex gap-3 text-sm text-muted">
  <span className="shrink-0 w-6 h-6 rounded-full bg-surface2 border border-border flex items-center justify-center text-xs text-white font-semibold">{i + 1}</span>
  
  <span className="pt-0.5">{step}</span></li>
  ))}
</ol>

<div className="flex flex-wrap gap-3">
  <button onClick={() => addToPlan(workout)} disabled={isPlanFull} className="inline-flex items-center gap-2 bg-accent text-black font-semibold px-6 py-3 rounded-full disabled:opacity-40 disabled:cursor-not-allowed">
  + Add to today&apos;s plan</button>

<button onClick={() => addToSaved(workout)} className="inline-flex items-center gap-2 border border-border font-semibold px-6 py-3 rounded-full hover:border-accent/60">
  ☆ Save for later</button>
</div>
</div>
</div>
);
}