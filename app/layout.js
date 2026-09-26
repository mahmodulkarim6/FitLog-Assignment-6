import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import { PlanProvider } from "@/lib/PlanContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToastStack from "@/components/ToastStack";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-oswald",
});

const inter = Inter({
subsets: ["latin"],
variable: "--font-inter",
});

export const metadata = {
  title: "FitLog — Workout Library",
  description:"FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.",
};

export default function RootLayout({ children }) {
  return (
<html lang="en">
  <body className={`${oswald.variable} ${inter.variable} font-body flex flex-col min-h-screen`}>
  <PlanProvider>
<Navbar />

<main className="flex-1">{children}</main>
<Footer />
<ToastStack />
</PlanProvider>
</body>
</html>
  );
}
