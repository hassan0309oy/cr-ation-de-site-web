import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { Mail, ShieldCheck, ChefHat, HeartHandshake, Star, Play } from "lucide-react";
import hero from "@/assets/hero-chicken.jpg";
import { LANG_KEY, LOGO_URL, PACKS, T, TESTIMONIALS, VIDEOS, type Lang } from "@/config/site";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const els = ref.current?.querySelectorAll(".reveal") ?? [];
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")), { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return ref;
}

export function Shop({ lang }: { lang: Lang }) {
  const t = T[lang];
  const ref = useReveal();
  const other: Lang = lang === "fr" ? "en" : "fr";
  useEffect(() => { localStorage.setItem(LANG_KEY, lang); document.documentElement.lang = lang; }, [lang]);
  const trustIcons = [Mail, ShieldCheck, ChefHat, HeartHandshake];

  return (
    <div ref={ref} className="overflow-x-hidden">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <div className="flex items-center gap-3">
          <img src={LOGO_URL} alt="Délices Maison" className="h-14 w-14 rounded-full shadow-soft" />
          <span className="font-script text-3xl text-primary">Délices Maison</span>
        </div>
        <Link to={other === "fr" ? "/fr" : "/en"} onClick={() => localStorage.setItem(LANG_KEY, other)}
          className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-primary transition hover:bg-secondary">
          {other === "fr" ? "🇫🇷" : "🇬🇧"} {t.change}
        </Link>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-16 pt-6 md:grid-cols-2 md:pt-12">
        <div className="reveal text-center md:text-left">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-accent">{t.tagline}</p>
          <h1 className="mt-4 text-4xl font-bold leading-tight text-primary md:text-6xl">{t.slogan}</h1>
          <p className="mt-5 text-lg text-muted-foreground">{t.sub}</p>
          <a href="#packs" className="mt-8 inline-block rounded-full bg-warm px-8 py-4 text-lg font-bold text-accent-foreground shadow-soft transition hover:-translate-y-1 hover:scale-105">
            {t.discover}
          </a>
        </div>
        <div className="reveal relative">
          <div className="absolute -inset-4 rotate-3 rounded-[2.5rem] bg-secondary" />
          <img src={hero} alt="" width={1600} height={1104} className="relative aspect-[4/3] w-full rounded-[2rem] object-cover shadow-cover" />
        </div>
      </section>

      {/* Trust */}
      <section className="mx-auto max-w-6xl px-5">
        <div className="reveal grid grid-cols-2 gap-4 rounded-3xl bg-card p-6 shadow-soft md:grid-cols-4">
          {t.trust.map((label, i) => { const I = trustIcons[i] ?? ChefHat; return (
            <div key={label} className="flex flex-col items-center gap-2 text-center">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-secondary text-primary"><I className="h-6 w-6" /></span>
              <span className="text-sm font-semibold">{label}</span>
            </div>); })}
        </div>
      </section>

      {/* Packs */}
      <section id="packs" className="scroll-mt-6 py-20">
        <div className="reveal mx-auto max-w-2xl px-5 text-center">
          <h2 className="text-3xl font-bold text-primary md:text-5xl">{t.packsTitle}</h2>
          <p className="mt-3 text-muted-foreground">{t.packsSub}</p>
        </div>
        <div className="no-scrollbar mx-auto mt-12 flex max-w-6xl snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-6 pt-4 md:grid md:grid-cols-3 md:overflow-visible">
          {PACKS.map((p) => (
            <article key={p.id} className={`reveal relative flex w-[82%] shrink-0 snap-center flex-col rounded-3xl bg-card p-6 shadow-soft transition duration-500 hover:-translate-y-2 sm:w-[60%] md:w-auto ${p.featured ? "ring-2 ring-gold" : ""}`}>
              {p.featured && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-warm px-4 py-1 text-xs font-bold text-accent-foreground">{t.popular}</span>}
              <div className="group mx-auto w-3/4 [perspective:1000px]">
                <img src={p.cover[lang]} alt={p.name[lang]} loading="lazy" className="w-full rounded-xl shadow-cover transition duration-500 group-hover:[transform:rotateY(-12deg)_scale(1.04)]" />
              </div>
              <h3 className="mt-6 text-2xl font-bold text-primary">{p.name[lang]}</h3>
              <p className="text-sm font-semibold text-accent">{p.count} {t.recipes}</p>
              <p className="mt-3 text-sm text-muted-foreground">{p.description[lang]}</p>
              <ul className="mt-4 space-y-1.5 text-sm">
                {p.benefits[lang].map((b) => <li key={b}>✓ {b}</li>)}
              </ul>
              <div className="mt-auto pt-6">
                <p className="font-display text-4xl font-bold text-primary">
                  {p.oldPrice && <s className="mr-2 text-lg text-muted-foreground">{p.oldPrice}</s>}{p.price}
                </p>
                <a href={p.link[lang]} target="_blank" rel="noopener noreferrer"
                  className="mt-4 block rounded-full bg-primary px-6 py-3.5 text-center font-bold text-primary-foreground transition hover:-translate-y-0.5 hover:bg-cocoa">
                  {p.cta[lang]}
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Videos */}
      <section className="py-16">
        <h2 className="reveal px-5 text-center text-3xl font-bold text-primary md:text-5xl">{t.videosTitle}</h2>
        {VIDEOS.length ? (
          <div className="no-scrollbar mx-auto mt-10 flex max-w-6xl snap-x gap-5 overflow-x-auto px-5 pb-4">
            {VIDEOS.map((v) => (
              <figure key={v.src} className="w-60 shrink-0 snap-center overflow-hidden rounded-3xl bg-card shadow-soft">
                <video src={v.src} poster={v.poster} controls playsInline preload="none" className="aspect-[9/16] w-full object-cover" />
                <figcaption className="p-3 text-sm font-semibold">{v.title[lang]}</figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div className="reveal mx-auto mt-10 flex max-w-md flex-col items-center gap-3 rounded-3xl bg-card p-10 text-center shadow-soft">
            <span className="grid h-16 w-16 place-items-center rounded-full bg-warm text-accent-foreground"><Play className="h-7 w-7" /></span>
            <p className="text-muted-foreground">{t.videosEmpty}</p>
          </div>
        )}
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <h2 className="reveal px-5 text-center text-3xl font-bold text-primary md:text-5xl">{t.testiTitle}</h2>
        <p className="mt-3 px-5 text-center text-xs italic text-muted-foreground">{t.testiNote}</p>
        <div className="no-scrollbar mt-10 overflow-x-auto">
          <div className="animate-marquee flex w-max gap-5 px-5">
            {[...TESTIMONIALS, ...TESTIMONIALS].map((r, i) => (
              <blockquote key={i} className="w-72 shrink-0 rounded-3xl bg-card p-6 shadow-soft">
                <div className="flex text-gold">{Array.from({ length: r.rating }).map((_, s) => <Star key={s} className="h-4 w-4 fill-current" />)}</div>
                <p className="mt-3 text-sm">“{r.text[lang]}”</p>
                <footer className="mt-4 text-sm font-bold text-primary">{r.name}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <footer className="mt-10 bg-cocoa py-10 text-center text-cream">
        <img src={LOGO_URL} alt="" className="mx-auto h-16 w-16 rounded-full" />
        <p className="mt-3 font-script text-3xl">Délices Maison</p>
        <p className="mt-1 text-sm opacity-80">{t.footer}</p>
      </footer>
    </div>
  );
}
