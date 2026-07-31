import Link from "next/link";
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
      <div className="home-hero px-5 pt-6 pb-5">
        <div className="flex justify-between items-start mb-5">
          <div>
            <p className="font-extrabold text-lg leading-none flex items-center gap-1" style={{ color: "var(--accent-orange)" }}>
              Home <span className="text-white/60 text-sm">›</span>
            </p>
            <p className="text-xs text-white/70 mt-1 max-w-[220px]">
              {pets.length > 0 ? `${pets.length} pet${pets.length > 1 ? "s" : ""} · ${user.name}` : "Add your first pet to get started"}
            </p>
          </div>
          <button className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(0,0,0,0.35)" }}>
            <span className="text-lg">☰</span>
          </button>
        </div>

        {/* Category tabs */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-5 px-5 pb-1">
          <Link href="/owner/dashboard" className="home-card flex flex-col items-center justify-center gap-1 px-5 py-3 shrink-0" style={{ background: "rgba(255,255,255,0.16)", borderColor: "var(--accent-orange)" }}>
            <span className="text-2xl">🐕</span>
            <span className="text-xs font-bold">Walking</span>
          </Link>
          <Link href="/book?service=SITTING" className="home-card flex flex-col items-center justify-center gap-1 px-5 py-3 shrink-0 relative">
            <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[9px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap" style={{ background: "var(--accent-orange)" }}>
              Today
            </span>
            <span className="text-2xl">🏠</span>
            <span className="text-xs font-semibold text-white/80">Sitting</span>
          </Link>
          <Link href="/owner/pets" className="home-card flex flex-col items-center justify-center gap-1 px-5 py-3 shrink-0">
            <span className="text-2xl">💉</span>
            <span className="text-xs font-semibold text-white/80">Vaccines</span>
          </Link>
          <Link href="/owner/bookings" className="home-card flex flex-col items-center justify-center gap-1 px-5 py-3 shrink-0">
            <span className="text-2xl">📅</span>
            <span className="text-xs font-semibold text-white/80">Bookings</span>
          </Link>
        </div>
      </div>

      {/* ===== Search bar ===== */}
      <div className="px-5 -mt-1 relative z-10">
        <div className="flex gap-2">
          <div className="flex-1 bg-white rounded-2xl flex items-center px-4 py-3 shadow-lg gap-2">
            <span style={{ color: "var(--muted)" }}>🔍</span>
            <span className="text-sm" style={{ color: "var(--muted)" }}>Search for a walker or sitter</span>
          </div>
          <div className="bg-white rounded-2xl px-3 py-2 flex flex-col items-center justify-center shadow-lg">
            <span className="text-[10px] font-bold" style={{ color: "var(--ink)" }}>VERIFIED</span>
            <span className="w-8 h-4 rounded-full mt-1" style={{ background: "var(--accent-orange)" }} />
          </div>
        </div>
      </div>

      {/* ===== Welcome banner (still on the pink field) ===== */}
      <div className="home-hero px-5 pt-8 pb-8 -mt-1" style={{ background: "linear-gradient(180deg, var(--body-pink) 0%, var(--body-pink-deep) 100%)" }}>
        <h1 className="text-3xl font-extrabold text-white mb-6">
          Welcome, <span style={{ fontFamily: "cursive", color: "#ffe08a" }}>{firstName || "pet parent"}!</span>
        </h1>

        {/* Promo grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <Link href="/owner/pets" className="home-card p-4 flex flex-col justify-between" style={{ minHeight: 150 }}>
            <div>
              <p className="font-bold text-sm">🐾 Add pets</p>
              <p className="text-xs text-white/70 mt-1">Track vaccines &amp; profiles</p>
            </div>
            <span className="text-3xl self-end">🐶</span>
          </Link>
          <div className="flex flex-col gap-3">
            <Link href="/book" className="home-card p-3 flex justify-between items-center" style={{ minHeight: 70 }}>
              <div>
                <p className="font-bold text-xs" style={{ color: "#ffe08a" }}>First walk</p>
                <p className="text-[11px] text-white/70">Free trial</p>
              </div>
              <span className="text-2xl">🚶</span>
            </Link>
            <Link href="/owner/pets" className="home-card p-3 flex justify-between items-center" style={{ minHeight: 70 }}>
              <div>
                <p className="font-bold text-xs" style={{ color: "#ffe08a" }}>Get reminded</p>
                <p className="text-[11px] text-white/70">On vaccines</p>
              </div>
              <span className="text-2xl">💉</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ===== Bolt-style instant banner ===== */}
      <div className="px-5 -mt-4 relative z-10 mb-5">
        <div
          className="rounded-2xl p-5 flex justify-between items-center text-white"
          style={{ background: "linear-gradient(120deg, #4a0a26, #7a0f38)" }}
        >
          <div>
            <p className="font-bold text-base mb-1">
              Instant <span style={{ color: "var(--accent-orange)" }}>⚡</span> | Walker in 15 mins!
            </p>
            <p className="text-xs text-white/70 mb-3 max-w-[180px]">Nearby verified walkers, ready right now.</p>
            <Link href="/book" className="btn-primary text-xs inline-block">
              BOOK NOW
            </Link>
          </div>
          <span className="text-5xl">🐕‍🦺</span>
        </div>
      </div>

      {/* ===== Vaccine due strip (real data) ===== */}
      {upcomingVaccines.length > 0 && (
        <div className="px-5 mb-5">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            <span className="chip shrink-0" style={{ background: "#fff0e6", color: "var(--accent-orange-dark)" }}>
              💉 {upcomingVaccines.length} vaccine{upcomingVaccines.length > 1 ? "s" : ""} due soon
            </span>
            <span className="chip shrink-0" style={{ background: "#fff0e6", color: "var(--accent-orange-dark)" }}>
              TOP RATED WALKERS
            </span>
          </div>
        </div>
      )}

      {/* ===== Provider listing ===== */}
      <div className="px-5 mb-5">
        <h2 className="font-bold text-base mb-3">Verified walkers near you</h2>
        {providers.length === 0 ? (
          <p className="text-sm" style={{ color: "var(--muted)" }}>No verified providers yet — check back soon.</p>
        ) : (
          <div className="flex gap-3 overflow-x-auto no-scrollbar">
            {providers.map((p) => (
              <Link href="/book" key={p.id} className="card shrink-0 relative" style={{ width: 150 }}>
                <span className="absolute top-3 right-3">🤍</span>
                <div className="w-full h-20 rounded-xl mb-2 flex items-center justify-center text-3xl" style={{ background: "var(--bg)" }}>
                  🐾
                </div>
                <p className="font-semibold text-sm truncate">{p.user.name}</p>
                <p className="text-xs" style={{ color: "var(--muted)" }}>⭐ {p.ratingAvg.toFixed(1)}</p>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* ===== Recent bookings (real data, kept from before) ===== */}
      <div className="px-5 mb-5">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-bold text-base">Recent bookings</h2>
          <Link href="/book" className="text-sm font-semibold" style={{ color: "var(--accent-orange-dark)" }}>
            + New
          </Link>
        </div>
        {bookings.length === 0 ? (
          <p className="text-sm" style={{ color: "var(--muted)" }}>No bookings yet.</p>
        ) : (
          <div className="space-y-2">
            {bookings.map((b) => (
              <div key={b.id} className="card flex justify-between items-center text-sm">
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
