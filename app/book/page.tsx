"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, Star } from "lucide-react";

type Provider = {
  id: string;
  bio?: string;
  servicesOffered: string[];
  pricePerWalk?: number;
  pricePerSitDay?: number;
  ratingAvg: number;
  user: { name: string };
  _count: { bookings: number };
};

type Pet = { id: string; name: string };

const SERVICE_LABEL: Record<string, { title: string; noun: string }> = {
  WALKING: { title: "Adventure Walk", noun: "walker" },
  SITTING: { title: "Home Staycation", noun: "sitter" },
};

export default function BookPage() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [pets, setPets] = useState<Pet[]>([]);
  const [service, setService] = useState<"WALKING" | "SITTING">("WALKING");
  const [selectedPet, setSelectedPet] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  useEffect(() => {
    fetch(`/api/providers?service=${service}`).then((r) => r.json()).then(setProviders);
    fetch("/api/pets").then((r) => r.json()).then(setPets);
  }, [service]);

  const book = async (providerId: string) => {
    if (!selectedPet || !start || !end) {
      alert("Pick a pet and times first");
      return;
    }
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ providerId, petId: selectedPet, type: service, startTime: start, endTime: end }),
    });
    if (res.ok) alert("Booking requested! You'll be notified once the provider accepts.");
  };

  return (
    <main className="max-w-3xl mx-auto px-6 py-10" style={{ background: "var(--cream, transparent)" }}>
      <h1 className="text-2xl font-bold mb-6">Book a {SERVICE_LABEL[service].title}</h1>

      <div className="flex flex-wrap gap-3 mb-8">
        <select className="border rounded-xl px-3 py-2 text-sm" style={{ borderColor: "var(--border)" }} value={service} onChange={(e) => setService(e.target.value as "WALKING" | "SITTING")}>
          <option value="WALKING">Adventure Walk</option>
          <option value="SITTING">Home Staycation</option>
        </select>
        <select className="border rounded-xl px-3 py-2 text-sm" style={{ borderColor: "var(--border)" }} value={selectedPet} onChange={(e) => setSelectedPet(e.target.value)}>
          <option value="">Select pet</option>
          {pets.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
        <input type="datetime-local" className="border rounded-xl px-3 py-2 text-sm" style={{ borderColor: "var(--border)" }} value={start} onChange={(e) => setStart(e.target.value)} />
        <input type="datetime-local" className="border rounded-xl px-3 py-2 text-sm" style={{ borderColor: "var(--border)" }} value={end} onChange={(e) => setEnd(e.target.value)} />
      </div>

      <div className="space-y-3">
        {providers.map((p) => (
          <div key={p.id} className="card flex justify-between items-center">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <p className="font-semibold">{p.user.name}</p>
                <span
                  className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold"
                  style={{ background: "var(--cream)", color: "var(--chestnut)" }}
                >
                  <ShieldCheck size={11} /> Verified
                </span>
              </div>
              <p className="text-sm mb-1" style={{ color: "var(--muted)" }}>{p.bio}</p>
              <div className="flex items-center gap-3 text-sm">
                <span className="font-medium">
                  {service === "WALKING" ? `₹${((p.pricePerWalk ?? 0) / 100).toFixed(0)}/walk` : `₹${((p.pricePerSitDay ?? 0) / 100).toFixed(0)}/day`}
                </span>
                <span className="flex items-center gap-1" style={{ color: "var(--muted)" }}>
                  <Star size={12} fill="var(--tan)" color="var(--tan)" /> {p.ratingAvg.toFixed(1)}
                </span>
                <span style={{ color: "var(--muted)" }}>
                  · {p._count.bookings} completed
                </span>
              </div>
            </div>
            <button className="btn-primary text-sm" onClick={() => book(p.id)}>
              Request
            </button>
          </div>
        ))}
        {providers.length === 0 && (
          <p className="text-sm" style={{ color: "var(--muted)" }}>No verified providers yet for this service.</p>
        )}
      </div>
    </main>
  );
}
