"use client";

import { useEffect, useState } from "react";

type Provider = {
  id: string;
  bio?: string;
  servicesOffered: string[];
  pricePerWalk?: number;
  pricePerSitDay?: number;
  ratingAvg: number;
  user: { name: string };
};

type Pet = { id: string; name: string };

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
    <main className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-extrabold mb-6">Find a {service === "WALKING" ? "walker" : "sitter"}</h1>

      <div className="flex gap-3 mb-6">
        <select className="border rounded-lg px-3 py-2" value={service} onChange={(e) => setService(e.target.value as "WALKING" | "SITTING")}>
          <option value="WALKING">Walking</option>
          <option value="SITTING">Sitting</option>
        </select>
        <select className="border rounded-lg px-3 py-2" value={selectedPet} onChange={(e) => setSelectedPet(e.target.value)}>
          <option value="">Select pet</option>
          {pets.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
        <input type="datetime-local" className="border rounded-lg px-3 py-2" value={start} onChange={(e) => setStart(e.target.value)} />
        <input type="datetime-local" className="border rounded-lg px-3 py-2" value={end} onChange={(e) => setEnd(e.target.value)} />
      </div>

      <div className="space-y-3">
        {providers.map((p) => (
          <div key={p.id} className="card flex justify-between items-center">
            <div>
              <p className="font-semibold">{p.user.name}</p>
              <p className="text-sm" style={{ color: "var(--muted)" }}>{p.bio}</p>
              <p className="text-sm">
                {service === "WALKING" ? `₹${((p.pricePerWalk ?? 0) / 100).toFixed(0)}/walk` : `₹${((p.pricePerSitDay ?? 0) / 100).toFixed(0)}/day`}
                {" · ⭐ "}{p.ratingAvg.toFixed(1)}
              </p>
            </div>
            <button className="btn-primary text-sm" onClick={() => book(p.id)}>
              Request booking
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
