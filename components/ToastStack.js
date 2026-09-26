"use client";
import { usePlan } from "@/lib/PlanContext";
export default function ToastStack() {
const { toasts } = usePlan();

  if (!toasts.length) return null;

  return (
  <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 items-end">
  {toasts.map((t) => (
  <div key={t.id}
  className="animate-toast-in bg-surface2 border border-border text-sm text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2">
  <span className={`w-2 h-2 rounded-full shrink-0 ${t.type === "warn" ? "bg-red-500" : "bg-accent"}`} />{t.message}</div>
))}
</div>
);
}
