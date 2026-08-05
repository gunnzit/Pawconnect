"use client";

import { useState } from "react";
import { Dog, CircleDot, UtensilsCrossed, Bone, BedDouble, Briefcase, Check, Plus } from "lucide-react";

export type Accessory = {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  icon: "leash" | "collar" | "bowl" | "toy" | "bed" | "carrier";
};

const ICONS = {
  leash: Dog,
  collar: CircleDot,
  bowl: UtensilsCrossed,
  toy: Bone,
  bed: BedDouble,
  carrier: Briefcase,
};

export function AccessoryCard({ item }: { item: Accessory }) {
  const [added, setAdded] = useState(false);
  const Icon = ICONS[item.icon];

  return (
    <div className="card flex flex-col gap-3">
      <div
        className="w-full flex items-center justify-center rounded-xl"
        style={{ height: 90, background: "var(--cream)" }}
      >
        <Icon size={32} color="var(--tan)" strokeWidth={1.5} />
      </div>
      <div>
        <p className="font-semibold text-sm">{item.name}</p>
        <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>{item.description}</p>
      </div>
      <div className="flex items-center justify-between mt-1">
        <span className="font-bold text-sm">₹{item.price}</span>
        <button
          onClick={() => setAdded(true)}
          className="tap-scale w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: added ? "var(--chestnut)" : "var(--espresso)" }}
          aria-label={added ? "Added" : "Add to cart"}
        >
          {added ? <Check size={14} color="white" /> : <Plus size={14} color="white" />}
        </button>
      </div>
    </div>
  );
}
