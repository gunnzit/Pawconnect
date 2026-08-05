import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { getOrCreateUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import BottomNav from "@/components/BottomNav";
import { Search, Syringe, Home as HomeIcon, PawPrint, ChevronRight, Star } from "lucide-react";

export default async function OwnerDashboard() {
  const user = await getOrCreateUser();
  if (!user) redirect("/sign-in");

  const [pets, bookings, upcomingVaccines, providers] = await Promise.all([
    prisma.pet.findMany({ where: { ownerId: user.id } }),
    prisma.booking.findMany({
      where: { ownerId: user.id },
      include: { provider: { include: { user: true } }, pet: true },
      orderBy: { startTime: "desc" },
      take: 4,
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
  const photos = ["/images/tab-walking.jpg", "/images/tab-sitting.jpg", "/images/tab-community.jpg", "/images/promo-first-walk.jpg"];

  return (
    <main className="pb-28 max-w-2xl mx-auto">
      {/* ===== Hero photo moment ===== */}
      <div className="relative w-full animate-fade-up" style={{ height: 280 }}>
        <Image src="/images/banner-instant-walk.jpg" alt="" fill sizes="700px" className="object-cover" priority />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(43,29,20,0.15) 0%, rgba(43,29,20,0.55) 100%)" }} />
        <div className="absolute inset-0 flex flex-col justify-end px-6 pb-8">
          <p className="text-white/80 text-sm font-medium mb-1">Good to see you,</p>
          <h1 className="text-white text-4xl font-bold">{firstName || "pet parent"}</h1>
        </div>
      </div>

      {/* ===== Search ===== */}
      <div className="px-6 -mt-6 relative z-10 animate-fade-up" style={{ animationDelay: "80ms" }}>
        <div className="bg-white rounded-2xl flex items-center gap-3 px-5 py-4 shadow-sm" style={{ border: "1px solid var(--border)" }}>
          <Search size={18} color="var(--muted)" />
          <span className="text-sm" style={{ color: "var(--muted)" }}>Find a walker or sitter nearby</span>
        </div>
      </div>

      {/* ===== Pill tabs ===== */}
      <div className="px-6 mt-6 mb-8 animate-fade-up" style={{ animationDelay: "120ms" }}>
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          <Link href="/owner/dashboard" className="pill-tab active tap-scale flex items-center gap-1.5">
            <PawPrint size={14} /> Walking
          </Link>
          <Link href="/book?service=SITTING" className="pill-tab tap-scale flex items-center gap-1.5">
            <HomeIcon size={14} /> Sitting
          </Link>
          <Link href="/owner/pets" className="pill-tab tap-scale flex items-center gap-1.5">
            <Syringe size={14} /> Vaccines
          </Link>
          <Link href="/owner/bookings" className="pill-tab tap-scale">
            Bookings
          </Link>
        </div>
      </div>

      {/* ===== Vaccine reminder — quiet, single line ===== */}
      {upcomingVaccines.length > 0 && (
        <div className="px-6 mb-8 animate-fade-up" style={{ animationDelay: "160ms" }}>
          <Link href="/owner/pets" className="flex items-center justify-between py-3 px-4 rounded-2xl tap-scale" style={{ background: "white", border: "1px solid var(--border)" }}>
            <div className="flex items-center gap-3">
              <Syringe size={16} color="var(--tan-dark, var(--tan))" />
              <span className="text-sm font-medium">
                {upcomingVaccines.length} vaccine{upcomingVaccines.length > 1 ? "s" : ""} due this month
              </span>
            </div>
            <ChevronRight size={16} color="var(--muted)" />
          </Link>
        </div>
      )}

      {/* ===== Two quiet promo cards, minimal ===== */}
      <div className="px-6 mb-10 animate-fade-up" style={{ animationDelay: "200ms" }}>
        <div className="grid grid-cols-2 gap-3">
          <Link href="/owner/pets" className="card tap-scale flex flex-col justify-between" style={{ minHeight: 130 }}>
            <PawPrint size={20} color="var(--tan)" />
            <div>
              <p className="font-semibold text-sm">Add a pet</p>
              <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>Track profile &amp; vaccines</p>
            </div>
          </Link>
          <Link href="/book" className="card tap-scale flex flex-col justify-between" style={{ minHeight: 130 }}>
            <PawPrint size={20} color="var(--tan)" />
            <div>
              <p className="font-semibold text-sm">First walk</p>
              <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>Free trial for new pets</p>
            </div>
          </Link>
        </div>
      </div>

      {/* ===== Providers — clean horizontal list, photo + name + rating only ===== */}
      <div className="mb-10 animate-fade-up" style={{ animationDelay: "240ms" }}>
        <div className="flex items-center justify-between px-6 mb-4">
          <h2 className="text-lg font-bold">Recommended near you</h2>
          <Link href="/book" className="text-sm font-medium tap-scale" style={{ color: "var(--tan-dark, var(--tan))" }}>
            See all
          </Link>
        </div>
        {providers.length === 0 ? (
          <p className="text-sm px-6" style={{ color: "var(--muted)" }}>No verified providers yet.</p>
        ) : (
          <div className="flex gap-4 overflow-x-auto no-scrollbar px-6">
            {providers.map((p, i) => (
              <Link href="/book" key={p.id} className="shrink-0 tap-scale" style={{ width: 168 }}>
                <div className="img-frame relative" style={{ height: 130 }}>
                  <Image src={photos[i % photos.length]} alt={p.user.name} fill sizes="168px" className="object-cover" />
                </div>
                <p className="font-semibold text-sm mt-2">{p.user.name}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Star size={12} fill="var(--tan)" color="var(--tan)" />
                  <span className="text-xs" style={{ color: "var(--muted)" }}>{p.ratingAvg.toFixed(1)}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* ===== Bookings — simple rows, hairline dividers ===== */}
      <div className="px-6 animate-fade-up" style={{ animationDelay: "280ms" }}>
        <h2 className="text-lg font-bold mb-4">Recent bookings</h2>
        {bookings.length === 0 ? (
          <p className="text-sm" style={{ color: "var(--muted)" }}>Nothing booked yet.</p>
        ) : (
          <div>
            {bookings.map((b, i) => (
              <div key={b.id} className={`flex justify-between items-center py-4 ${i !== bookings.length - 1 ? "hairline" : ""}`}>
                <div>
                  <p className="font-medium text-sm">{b.pet.name} · {b.type === "WALKING" ? "Walk" : "Sitting"}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>with {b.provider.user.name}</p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: "var(--cream)", color: "var(--chestnut)" }}>
                  {b.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </main>
  );
}
