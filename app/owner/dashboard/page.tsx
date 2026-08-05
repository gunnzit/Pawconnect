import Link from "next/link";
import Image from "next/image";
import { Show } from "@clerk/nextjs";
import { PawPrint, Scissors, Stethoscope, Home as HomeIcon, ShoppingBag } from "lucide-react";

const NEEDS = [
  { label: "Walk", sub: "Adventure walks", icon: PawPrint, href: "/book?service=WALKING", soon: false },
  { label: "Groom", sub: "Spa sessions", icon: Scissors, href: "#", soon: true },
  { label: "Vet", sub: "Vaccine care", icon: Stethoscope, href: "/owner/pets", soon: false },
  { label: "Sit", sub: "Home staycation", icon: HomeIcon, href: "/book?service=SITTING", soon: false },
  { label: "Shop", sub: "Accessories", icon: ShoppingBag, href: "/accessories", soon: false },
];

export default function Home() {
  return (
    <main className="pb-16" style={{ background: "var(--cream)" }}>
      {/* ===== Nav ===== */}
      <nav className="flex justify-between items-center px-6 py-5 max-w-5xl mx-auto">
        <span className="text-lg font-bold flex items-center gap-2">
          <PawPrint size={20} color="var(--tan)" /> PawConnect
        </span>
        <div className="flex gap-3 items-center">
          <Show when="signed-out">
            <Link href="/sign-in" className="text-sm font-medium">Sign in</Link>
            <Link href="/sign-up" className="btn-primary text-sm">Get started</Link>
          </Show>
          <Show when="signed-in">
            <Link href="/owner/dashboard" className="btn-primary text-sm">Dashboard</Link>
          </Show>
        </div>
      </nav>

      {/* ===== Hero: "My pet needs..." ===== */}
      <section className="max-w-5xl mx-auto px-6 mb-6 animate-fade-up">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 leading-tight">
          My pet needs<span style={{ color: "var(--tan)" }}>…</span>
        </h1>
        <p className="text-base mb-8" style={{ color: "var(--muted)" }}>
          One tap. Done.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-6 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {NEEDS.map((need) => {
            const Icon = need.icon;
            const Wrapper = need.soon ? "div" : Link;
            const wrapperProps = need.soon ? {} : { href: need.href };
            return (
              <Wrapper
                key={need.label}
                {...(wrapperProps as any)}
                className={`card flex flex-col items-center text-center gap-3 py-8 ${need.soon ? "" : "tap-scale"}`}
                style={{ opacity: need.soon ? 0.55 : 1, cursor: need.soon ? "default" : "pointer" }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ background: "var(--cream)" }}
                >
                  <Icon size={24} color="var(--tan)" strokeWidth={1.75} />
                </div>
                <div>
                  <p className="font-semibold text-sm">{need.label}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
                    {need.soon ? "Coming soon" : need.sub}
                  </p>
                </div>
              </Wrapper>
            );
          })}
        </div>
      </section>

      {/* ===== Hero photo moment ===== */}
      <section className="max-w-5xl mx-auto px-6 mb-16 animate-fade-up">
        <div className="img-frame relative shadow-sm" style={{ minHeight: 320 }}>
          <Image src="/images/banner-instant-walk.jpg" alt="Happy dog on a walk" fill sizes="900px" className="object-cover" priority />
          <div
            className="absolute inset-0 flex flex-col justify-end p-8"
            style={{ background: "linear-gradient(180deg, transparent 40%, rgba(43,29,20,0.75) 100%)" }}
          >
            <h2 className="text-white text-2xl font-bold mb-2">Verified people. Real trust.</h2>
            <p className="text-white/80 text-sm mb-4 max-w-md">
              Every provider is verified, rated, and rehired by real pet parents.
            </p>
            <Link href="/sign-up" className="btn-primary w-fit">Get started</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
