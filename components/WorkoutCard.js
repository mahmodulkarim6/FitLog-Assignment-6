import Link from "next/link";
import Image from "next/image";
export default function WorkoutCard({ workout }) {
  return (
  <Link href={`/workout/${workout.id}`} className="group bg-surface border border-border rounded-xl2 overflow-hidden hover:border-accent/60 transition-colors flex flex-col">
  
  <div className="relative w-full aspect-[4/3] bg-surface2">
  <Image src={workout.image} alt={workout.name} fill sizes="(max-width: 768px) 100vw, 25vw"
    className="object-cover group-hover:scale-105 transition-transform duration-300"
  unoptimized/></div>

<div className="p-4 flex flex-col gap-2 flex-1">
  <div className="flex gap-1.5 flex-wrap">
    {workout.muscleGroups?.slice(0, 2).map((tag) => (
  <span key={tag} className="text-[10px] uppercase tracking-wide font-bold bg-accent text-black rounded-full px-2 py-0.5">{tag}</span>
))}
</div>

<h3 className="font-display text-lg uppercase leading-tight">{workout.name}</h3>
  <p className="text-muted text-xs">{workout.equipment}</p>
    <div className="mt-auto flex items-center gap-3 text-xs text-muted pt-2 border-t border-border/60">
    <span>⏱ {workout.duration} min</span>
    <span>🔥 {workout.caloriesBurned} kcal</span>
    <span>⭐ {workout.rating}</span>
  </div>
  </div>
  </Link>
  );
}