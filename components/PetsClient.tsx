"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Pet = {
  id: string;
  name: string;
  breed?: string;
  size: string;
  vaccinations: { id: string; vaccineName: string; nextDueDate: string }[];
};

export default function PetsClient() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [form, setForm] = useState({ name: "", breed: "", size: "MEDIUM", temperament: "", notes: "" });

  const loadPets = async () => {
    const res = await fetch("/api/pets");
    if (res.ok) setPets(await res.json());
  };

  useEffect(() => {
    loadPets();
  }, []);

  const addPet = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/pets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setForm({ name: "", breed: "", size: "MEDIUM", temperament: "", notes: "" });
      loadPets();
    }
  };

  return (
    <main className="max-w-2xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Your pets</h1>

      <form onSubmit={addPet} className="card mb-8 space-y-3">
        <h2 className="font-bold">Add a pet</h2>
        <input
          className="w-full border rounded-lg px-3 py-2"
          style={{ borderColor: "var(--border)" }}
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          className="w-full border rounded-lg px-3 py-2"
          style={{ borderColor: "var(--border)" }}
          placeholder="Breed"
          value={form.breed}
          onChange={(e) => setForm({ ...form, breed: e.target.value })}
        />
        <select
          className="w-full border rounded-lg px-3 py-2"
          style={{ borderColor: "var(--border)" }}
          value={form.size}
          onChange={(e) => setForm({ ...form, size: e.target.value })}
        >
          <option value="SMALL">Small</option>
          <option value="MEDIUM">Medium</option>
          <option value="LARGE">Large</option>
        </select>
        <textarea
          className="w-full border rounded-lg px-3 py-2"
          style={{ borderColor: "var(--border)" }}
          placeholder="Temperament / notes (e.g. scared of loud noises)"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />
        <button type="submit" className="btn-primary">Add pet</button>
      </form>

      <div className="space-y-3">
        {pets.map((p) => (
          <Link href={`/owner/pets/${p.id}`} key={p.id} className="card flex items-center justify-between tap-scale">
            <div>
              <p className="font-bold">{p.name} <span className="text-sm font-normal" style={{ color: "var(--muted)" }}>{p.breed}</span></p>
              {p.vaccinations.length > 0 && (
                <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
                  💉 {p.vaccinations.length} vaccine{p.vaccinations.length > 1 ? "s" : ""} on record
                </p>
              )}
            </div>
            <ChevronRight size={18} color="var(--muted)" />
          </Link>
        ))}
      </div>
    </main>
  );
}
