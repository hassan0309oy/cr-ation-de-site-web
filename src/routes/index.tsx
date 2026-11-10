import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { LANG_KEY, LOGO_URL, type Lang } from "@/config/site";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Délices Maison — Choisissez votre langue / Choose your language" },
    { name: "description", content: "E-books de recettes gourmandes Délices Maison. Delicious recipe e-books." },
    { property: "og:title", content: "Délices Maison" },
    { property: "og:description", content: "Des recettes délicieuses à portée de clic ! Delicious recipes just a click away!" },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: LanguagePage,
});

function LanguagePage() {
  const navigate = useNavigate();
  useEffect(() => {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved === "fr" || saved === "en") navigate({ to: saved === "fr" ? "/fr" : "/en", replace: true });
  }, [navigate]);
  const pick = (l: Lang) => { localStorage.setItem(LANG_KEY, l); navigate({ to: l === "fr" ? "/fr" : "/en" }); };
  const btn = "group flex w-full items-center justify-center gap-4 rounded-3xl bg-card px-8 py-6 text-xl font-bold text-primary shadow-soft ring-1 ring-border transition duration-300 hover:-translate-y-1 hover:ring-2 hover:ring-gold";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-12 text-center">
      <img src={LOGO_URL} alt="Délices Maison" className="animate-floaty h-40 w-40 rounded-full shadow-cover md:h-52 md:w-52" />
      <h1 className="mt-6 font-script text-5xl font-normal text-primary md:text-7xl">Délices Maison</h1>
      <p className="mt-2 text-muted-foreground">Recettes faciles & gourmandes · Easy & delicious recipes</p>
      <p className="mt-10 font-display text-xl text-primary">Choisissez votre langue · Choose your language</p>
      <div className="mt-6 flex w-full max-w-sm flex-col gap-4">
        <button className={btn} onClick={() => pick("fr")}><span className="text-3xl transition group-hover:scale-125">🇫🇷</span> Français</button>
        <button className={btn} onClick={() => pick("en")}><span className="text-3xl transition group-hover:scale-125">🇬🇧</span> English</button>
      </div>
    </main>
  );
}
