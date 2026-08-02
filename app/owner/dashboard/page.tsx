import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { getOrCreateUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import BottomNav from "@/components/BottomNav";

export default async function OwnerDashboard() {
  const user = await getOrCreateUser();
  if (!user) redirect("/sign-in");

  const [pets, bookings, upcomingVaccines, providers] = await Promise.all([
    prisma.pet.findMany({ where: { ownerId: user.id } }),
    prisma.booking.findMany({
      where: { ownerId: user.id },
      include: { provider: { include: { user: true } }, pet: true },
      orderBy: { startTime: "desc" },
      take: 5,
    }),
    prisma.vaccination.findMany({
      where: { pet: { ownerId: user.id }, nextDueDate: { lte: new Date(Date.now() + 30 * 86400000) } },
      include: { pet: true },
      orderBy: { nextDueDate: "asc" },
    }),
    prisma.provider.findMany({
      where: { verified: true },
      include: { user: { select: { name: true } } },
      orderBy: { ratingAvg: "desc" },
      take: 4,
    }),
  ]);

  const firstName = user.name.split(" ")[0];

  return (
    <main className="pb-24">
      {/* ===== Header + category tabs (dark gradient zone) ===== */}
      <div className="home-hero px-5 pt-6 pb-5 animate-fade-up">
        <div className="flex justify-between items-start mb-5">
          <div>
            <p className="font-extrabold text-lg leading-none flex items-center gap-1" style={{ color: "var(--accent-orange)" }}>
              Home <span className="text-white/60 text-sm">›</span>
            </p>
            <p className="text-xs text-white/70 mt-1 max-w-[220px]">
              {pets.length > 0 ? `${pets.length} pet${pets.length > 1 ? "s" : ""} · ${user.name}` : "Add your first pet to get started"}
            </p>
          </div>
          <button className="w-10 h-10 rounded-full flex items-center justify-center tap-scale hover-lift" style={{ background: "rgba(0,0,0,0.35)" }}>
            <span className="text-lg">☰</span>
          </button>
        </div>

        {/* Category tabs — real photos, staggered entrance, tap + hover feedback */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-5 px-5 pb-1">
          <Link href="/owner/dashboard" className="flex flex-col items-center gap-1 shrink-0 tap-scale animate-fade-up" style={{ animationDelay: "60ms" }}>
            <div className="w-16 h-16 rounded-2xl overflow-hidden relative img-zoom hover-lift" style={{ border: "2px solid var(--accent-orange)" }}>
              <Image src="/images/tab-walking.jpg" alt="Walking" fill sizes="64px" className="object-cover" />
            </div>
            <span className="text-xs font-bold">Walking</span>
          </Link>
          <Link href="/book?service=SITTING" className="flex flex-col items-center gap-1 shrink-0 relative tap-scale animate-fade-up" style={{ animationDelay: "120ms" }}>
            <span className="absolute -top-1 left-1/2 -translate-x-1/2 z-10 text-[9px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap animate-pulse-soft" style={{ background: "var(--accent-orange)" }}>
              Today
            </span>
            <div className="w-16 h-16 rounded-2xl overflow-hidden relative img-zoom hover-lift" style={{ border: "2px solid rgba(255,255,255,0.25)" }}>
              <Image src="/images/tab-sitting.jpg" alt="Sitting" fill sizes="64px" className="object-cover" />
            </div>
            <span className="text-xs font-semibold text-white/80">Sitting</span>
          </Link>
          <Link href="/owner/pets" className="flex flex-col items-center gap-1 shrink-0 tap-scale animate-fade-up" style={{ animationDelay: "180ms" }}>
            <div className="w-16 h-16 rounded-2xl overflow-hidden relative img-zoom hover-lift" style={{ border: "2px solid rgba(255,255,255,0.25)" }}>
              <Image src="/images/tab-vaccines.webp" alt="Vaccines" fill sizes="64px" className="object-cover" />
            </div>
            <span className="text-xs font-semibold text-white/80">Vaccines</span>
          </Link>
          <Link href="/owner/bookings" className="flex flex-col items-center gap-1 shrink-0 tap-scale animate-fade-up" style={{ animationDelay: "240ms" }}>
            <div className="w-16 h-16 rounded-2xl overflow-hidden relative img-zoom hover-lift" style={{ border: "2px solid rgba(255,255,255,0.25)" }}>
              <Image src="/images/tab-community.jpg" alt="Community" fill sizes="64px" className="object-cover" />
            </div>
            <span className="text-xs font-semibold text-white/80">Bookings</span>
          </Link>
        </div>
      </div>

      {/* ===== Search bar ===== */}
      <div className="px-5 -mt-1 relative z-10 animate-fade-up" style={{ animationDelay: "100ms" }}>
        <div className="flex gap-2">
          <div className="flex-1 bg-white rounded-2xl flex items-center px-4 py-3 shadow-lg gap-2 search-focus">
            <span style={{ color: "var(--muted)" }}>🔍</span>
            <span className="text-sm" style={{ color: "var(--muted)" }}>Search for a walker or sitter</span>
          </div>
          <div className="bg-white rounded-2xl px-3 py-2 flex flex-col items-center justify-center shadow-lg tap-scale">
            <span className="text-[10px] font-bold" style={{ color: "var(--ink)" }}>VERIFIED</span>
            <span className="w-8 h-4 rounded-full mt-1 animate-glow" style={{ background: "var(--accent-orange)" }} />
          </div>
        </div>
      </div>

      {/* ===== Welcome banner ===== */}
      <div className="home-hero px-5 pt-8 pb-8 -mt-1" style={{ background: "linear-gradient(180deg, var(--body-pink) 0%, var(--body-pink-deep) 100%)" }}>
        <h1 className="text-3xl font-extrabold text-white mb-6 animate-fade-up" style={{ animationDelay: "80ms" }}>
          Welcome, <span style={{ fontFamily: "cursive", color: "#ffe08a" }}>{firstName || "pet parent"}!</span>
        </h1>

        {/* Promo grid — real photos, hover lift + zoom */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <Link href="/owner/pets" className="rounded-2xl overflow-hidden relative tap-scale hover-lift img-zoom animate-fade-up" style={{ minHeight: 220, animationDelay: "140ms" }}>
            <Image src="/images/hero-large.jpg" alt="Add your pets" fill sizes="50vw" className="object-cover" />
            <div className="absolute inset-0 flex flex-col justify-end p-4" style={{ background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.75) 100%)" }}>
              <p className="font-bold text-sm text-white">🐾 Add pets</p>
              <p className="text-xs text-white/80 mt-1">Track vaccines &amp; profiles</p>
            </div>
          </Link>
          <div className="flex flex-col gap-3">
            <Link href="/book" className="rounded-2xl overflow-hidden relative tap-scale hover-lift img-zoom animate-fade-up" style={{ minHeight: 102, animationDelay: "200ms" }}>
              <Image src="/images/promo-first-walk.jpg" alt="First walk" fill sizes="50vw" className="object-cover" />
              <div className="absolute inset-0 flex flex-col justify-end p-3" style={{ background: "linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.7) 100%)" }}>
                <p className="font-bold text-xs" style={{ color: "#ffe08a" }}>First walk</p>
                <p className="text-[11px] text-white/80">Free trial</p>
              </div>
            </Link>
            <Link href="/owner/pets" className="rounded-2xl overflow-hidden relative tap-scale hover-lift img-zoom animate-fade-up" style={{ minHeight: 102, animationDelay: "260ms" }}>
              <Image src="/images/promo-vaccine-reminder.jpg" alt="Vaccine reminders" fill sizes="50vw" className="object-cover" />
              <div className="absolute inset-0 flex flex-col justify-end p-3" style={{ background: "linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.7) 100%)" }}>
                <p className="font-bold text-xs" style={{ color: "#ffe08a" }}>Get reminded</p>
                <p className="text-[11px] text-white/80">On vaccines</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* ===== Instant walker banner ===== */}
      <div className="px-5 -mt-4 relative z-10 mb-5 animate-fade-up" style={{ animationDelay: "160ms" }}>
        <Link href="/book" className="block rounded-2xl overflow-hidden relative tap-scale hover-lift img-zoom" style={{ minHeight: 170 }}>
          <Image src="/images/banner-instant-walk.jpg" alt="Instant walker" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 flex flex-col justify-center p-5" style={{ background: "linear-gradient(90deg, rgba(20,5,15,0.85) 40%, transparent 90%)" }}>
            <p className="font-bold text-base mb-1 text-white">
              Instant <span style={{ color: "var(--accent-orange)" }}>⚡</span> | Walker in 15 mins!
            </p>
            <p className="text-xs text-white/80 mb-3 max-w-[180px]">Nearby verified walkers, ready right now.</p>
            <span className="btn-primary text-xs inline-block w-fit shimmer-btn">BOOK NOW</span>
          </div>
        </Link>
      </div>

      {/* ===== Vaccine due strip (real data) ===== */}
      {upcomingVaccines.length > 0 && (
        <div className="px-5 mb-5 animate-fade-up" style={{ animationDelay: "220ms" }}>
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            <span className="chip chip-pulse shrink-0" style={{ background: "#fff0e6", color: "var(--accent-orange-dark)" }}>
              💉 {upcomingVaccines.length} vaccine{upcomingVaccines.length > 1 ? "s" : ""} due soon
            </span>
            <span className="chip shrink-0" style={{ background: "#fff0e6", color: "var(--accent-orange-dark)" }}>
              TOP RATED WALKERS
            </span>
          </div>
        </div>
      )}

      {/* ===== Provider listing — real photos rotated across cards, staggered entrance ===== */}
      <div className="px-5 mb-5">
        <h2 className="font-bold text-base mb-3 animate-fade-up">Verified walkers near you</h2>
        {providers.length === 0 ? (
          <p className="text-sm" style={{ color: "var(--muted)" }}>No verified providers yet — check back soon.</p>
        ) : (
          <div className="flex gap-3 overflow-x-auto no-scrollbar">
            {providers.map((p, i) => {
              const photos = ["/images/tab-walking.jpg", "/images/tab-sitting.jpg", "/images/tab-community.jpg", "/images/promo-first-walk.jpg"];
              return (
                <Link
                  href="/book"
                  key={p.id}
                  className="shrink-0 rounded-2xl overflow-hidden bg-white shadow-sm tap-scale hover-lift img-zoom animate-fade-up"
                  style={{ width: 150, animationDelay: `${280 + i * 70}ms` }}
                >
                  <div className="w-full h-24 relative">
                    <Image src={photos[i % photos.length]} alt={p.user.name} fill sizes="150px" className="object-cover" />
                    <span className="absolute top-2 right-2 text-lg tab-icon-float">🤍</span>
                  </div>
                  <div className="p-2">
                    <p className="font-semibold text-sm truncate">{p.user.name}</p>
                    <p className="text-xs" style={{ color: "var(--muted)" }}>⭐ {p.ratingAvg.toFixed(1)}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* ===== Recent bookings (real data) ===== */}
      <div className="px-5 mb-5">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-bold text-base">Recent bookings</h2>
          <Link href="/book" className="text-sm font-semibold tap-scale" style={{ color: "var(--accent-orange-dark)" }}>
            + New
          </Link>
        </div>
        {bookings.length === 0 ? (
          <p className="text-sm" style={{ color: "var(--muted)" }}>No bookings yet.</p>
        ) : (
          <div className="space-y-2">
            {bookings.map((b, i) => (
              <div key={b.id} className="card flex justify-between items-center text-sm hover-lift tap-scale animate-fade-up" style={{ animationDelay: `${400 + i * 60}ms` }}>
                <span>{b.pet.name} · {b.type} with {b.provider.user.name}</span>
                <span className="font-semibold">{b.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </main>
  );
}
