import Link from "next/link";
import Image from "next/image";
import { Show } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <nav className="flex justify-between items-center mb-16">
        <span className="text-xl font-extrabold" style={{ color: "var(--brand, var(--accent-orange))" }}>
          🐾 PawConnect
        </span>
        <div className="flex gap-4 items-center">
          <Show when="signed-out">
            <Link href="/sign-in" className="text-sm font-medium">Sign in</Link>
            <Link href="/sign-up" className="btn-primary text-sm">Get started</Link>
          </Show>
          <Show when="signed-in">
            <Link href="/owner/dashboard" className="btn-primary text-sm">Dashboard</Link>
          </Show>
        </div>
      </nav>

      <section className="grid md:grid-cols-2 gap-10 items-center mb-20">
        <div>
          <h1 className="text-5xl font-extrabold mb-4 leading-tight">
            Welcome, <span style={{ fontFamily: "cursive", color: "var(--accent-orange, #ff7a1a)" }}>pet parent!</span>
          </h1>
          <p className="text-lg mb-8" style={{ color: "var(--muted)" }}>
            Verified pet care providers near you — plus we keep track of vaccine due dates so you never forget.
          </p>
          <div className="flex gap-4">
            <Link href="/sign-up" className="btn-primary">Find a walker</Link>
            <Link href="/provider/onboarding" className="btn-primary" style={{ background: "var(--ink)" }}>
              Become a provider
            </Link>
          </div>
        </div>
        <div className="rounded-3xl overflow-hidden relative shadow-xl" style={{ minHeight: 340 }}>
          <Image src="/images/banner-instant-walk.jpg" alt="Happy dog on a walk" fill sizes="500px" className="object-cover" priority />
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card overflow-hidden p-0">
          <div className="relative w-full h-36">
            <Image src="/images/tab-walking.jpg" alt="Walking" fill sizes="300px" className="object-cover" />
          </div>
          <div className="p-4">
            <h3 className="font-bold mb-1">🚶 Walking</h3>
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              Live GPS tracking and a report card after every walk.
            </p>
          </div>
        </div>
        <div className="card overflow-hidden p-0">
          <div className="relative w-full h-36">
            <Image src="/images/tab-sitting.jpg" alt="Sitting" fill sizes="300px" className="object-cover" />
          </div>
          <div className="p-4">
            <h3 className="font-bold mb-1">🏠 Sitting</h3>
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              In-home or at the provider's place, with daily check-in photos.
            </p>
          </div>
        </div>
        <div className="card overflow-hidden p-0">
          <div className="relative w-full h-36">
            <Image src="/images/tab-vaccines.webp" alt="Vaccines" fill sizes="300px" className="object-cover" />
          </div>
          <div className="p-4">
            <h3 className="font-bold mb-1">💉 Vaccine Reminders</h3>
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              Never miss a due date — we track it and notify you.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
