import Link from "next/link";
import Image from "next/image";
import { Show } from "@clerk/nextjs";
import { PawPrint, Home as HomeIcon, Syringe, ShoppingBag, ChevronRight } from "lucide-react";

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

      {/* ===== Hero ===== */}
      <section className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center mb-16 animate-fade-up">
        <div>
          <h1 className="text-5xl font-bold mb-4 leading-tight">
            Everything your dog needs, <span style={{ color: "var(--tan)" }}>in one place.</span>
          </h1>
          <p className="text-base mb-8" style={{ color: "var(--muted)" }}>
            Verified walkers and sitters, vaccine reminders that never let you forget, and the everyday accessories your pet actually uses.
          </p>
          <div className="flex gap-3">
            <Link href="/sign-up" className="btn-primary">Get started</Link>
            <Link href="/provider/onboarding" className="btn-secondary">Become a provider</Link>
          </div>
        </div>
        <div className="img-frame relative shadow-sm" style={{ minHeight: 340 }}>
          <Image src="/images/banner-instant-walk.jpg" alt="Happy dog on a walk" fill sizes="500px" className="object-cover" priority />
        </div>
      </section>

      {/* ===== Category mix — the "everything" section ===== */}
      <section className="max-w-5xl mx-auto px-6 mb-16">
        <h2 className="text-2xl font-bold mb-6">What you'll find here</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/sign-up" className="card tap-scale flex flex-col gap-3">
            <PawPrint size={22} color="var(--tan)" />
            <div>
              <p className="font-semibold text-sm">Walking</p>
              <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>Verified walkers nearby</p>
            </div>
          </Link>
          <Link href="/sign-up" className="card tap-scale flex flex-col gap-3">
            <HomeIcon size={22} color="var(--tan)" />
            <div>
              <p className="font-semibold text-sm">Sitting</p>
              <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>In-home or drop-off care</p>
            </div>
          </Link>
          <Link href="/sign-up" className="card tap-scale flex flex-col gap-3">
            <Syringe size={22} color="var(--tan)" />
            <div>
              <p className="font-semibold text-sm">Vaccines</p>
              <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>Never miss a due date</p>
            </div>
          </Link>
          <Link href="/accessories" className="card tap-scale flex flex-col gap-3">
            <ShoppingBag size={22} color="var(--tan)" />
            <div>
              <p className="font-semibold text-sm">Accessories</p>
              <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>Collars, bowls &amp; more</p>
            </div>
          </Link>
        </div>
      </section>

      {/* ===== Accessories teaser strip ===== */}
      <section className="max-w-5xl mx-auto px-6 mb-16">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Shop accessories</h2>
          <Link href="/accessories" className="text-sm font-medium flex items-center gap-1 tap-scale" style={{ color: "var(--tan-dark, var(--tan))" }}>
            Browse all <ChevronRight size={14} />
          </Link>
        </div>
        <p className="text-sm mb-6" style={{ color: "var(--muted)" }}>
          Everyday essentials for your pet, picked to last.
        </p>
        <Link href="/accessories" className="btn-secondary tap-scale inline-block">
          Explore accessories
        </Link>
      </section>

      {/* ===== Photo strip ===== */}
      <section className="max-w-5xl mx-auto px-6 grid grid-cols-3 gap-4">
        <div className="img-frame relative" style={{ height: 160 }}>
          <Image src="/images/tab-walking.jpg" alt="" fill sizes="300px" className="object-cover" />
        </div>
        <div className="img-frame relative" style={{ height: 160 }}>
          <Image src="/images/tab-sitting.jpg" alt="" fill sizes="300px" className="object-cover" />
        </div>
        <div className="img-frame relative" style={{ height: 160 }}>
          <Image src="/images/tab-community.jpg" alt="" fill sizes="300px" className="object-cover" />
        </div>
      </section>
    </main>
  );
}
