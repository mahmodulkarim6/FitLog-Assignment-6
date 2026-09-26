"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
const PlanContext = createContext(null);
const PLAN_CAP = 5;
const STORAGE_KEY = "fitlog-data-v1";
export function PlanProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [hydrated, setHydrated] = useState(false);

useEffect(() => {
  try {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    const parsed = JSON.parse(raw);
    setPlan(parsed.plan || []);
    setSaved(parsed.saved || []);
}
  } catch (e) {
      // ignore corrupt storage
    }
  setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ plan, saved }));
    } catch (e) {
      // ignore quota errors
    }
  }, [plan, saved, hydrated]);

  function pushToast(message, type = "success") {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => {
    setToasts((t) => t.filter((toast) => toast.id !== id));
    }, 2600);
  }

  function addToPlan(workout) {
    if (plan.some((w) => w.id === workout.id)) {
      pushToast("Already in today's plan", "warn");
      return;
    }
    if (plan.length >= PLAN_CAP) {
      pushToast("Today's plan is full (5 lifts max)", "warn");
      return;
    }
    setPlan((prev) => [...prev, { ...workout, done: false }]);
    pushToast("Added to today's plan");
  }

  function addToSaved(workout) {
    if (saved.some((w) => w.id === workout.id)) {
      pushToast("Already saved", "warn");
      return;
    }
    setSaved((prev) => [...prev, workout]);
    pushToast("Saved for later");
  }

  function removeFromPlan(id) {
    setPlan((prev) => prev.filter((w) => w.id !== id));
    pushToast("Removed from today's plan");
  }

  function removeFromSaved(id) {
    setSaved((prev) => prev.filter((w) => w.id !== id));
    pushToast("Removed from saved");
  }

  function toggleDone(id) {
    setPlan((prev) =>
    prev.map((w) => (w.id === id ? { ...w, done: !w.done } : w))
    );
    pushToast("Updated workout status");
  }

const isPlanFull = plan.length >= PLAN_CAP;
const value = useMemo(
  () => ({
    plan,
    saved,
    toasts,
    hydrated,
    isPlanFull,
    planCap: PLAN_CAP,
    addToPlan,
    addToSaved,
    removeFromPlan,
    removeFromSaved,
    toggleDone,
    pushToast,
  }),

  [plan,
  saved,
  toasts,
  hydrated,
  isPlanFull,
  addToPlan,
  addToSaved,
  removeFromPlan,
  removeFromSaved,
  toggleDone,
  pushToast]
);

return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan() {
const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used within PlanProvider");
  return ctx;
}