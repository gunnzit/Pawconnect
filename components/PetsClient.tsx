"use client";

import { useState, useEffect } from "react";

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
      <h1 className="text-2xl font-extrabold mb-6">Your pets</h1>

      <form onSubmit={addPet} className="card mb-8 space-y-3">
        <h2 className="font-bold">Add a pet</h2>
        <input
          className="w-full border rounded-lg px-3 py-2"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          className="w-full border rounded-lg px-3 py-2"
          placeholder="Breed"
          value={form.breed}
          onChange={(e) => setForm({ ...form, breed: e.target.value })}
        />
        <select
          className="w-full border rounded-lg px-3 py-2"
          value={form.size}
          onChange={(e) => setForm({ ...form, size: e.target.value })}
        >
          <option value="SMALL">Small</option>
          <option value="MEDIUM">Medium</option>
          <option value="LARGE">Large</option>
        </select>
        <textarea
          className="w-full border rounded-lg px-3 py-2"
          placeholder="Temperament / notes (e.g. scared of loud noises)"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />
        <button type="submit" className="btn-primary">Add pet</button>
      </form>

      <div className="space-y-4">
        {pets.map((p) => (
          <div key={p.id} className="card">
            <p className="font-bold">{p.name} <span className="text-sm font-normal" style={{ color: "var(--muted)" }}>{p.breed}</span></p>
            {p.vaccinations.length > 0 && (
              <ul className="text-sm mt-2" style={{ color: "var(--muted)" }}>
                {p.vaccinations.map((v) => (
                  <li key={v.id}>💉 {v.vaccineName} — due {new Date(v.nextDueDate).toDateString()}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}