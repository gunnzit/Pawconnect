import Link from "next/link";
import { PawPrint, ShoppingBag, ArrowLeft } from "lucide-react";
import { AccessoryCard, type Accessory } from "@/components/AccessoryCard";

// Sample catalog — swap for real inventory once you have products to sell.
const ACCESSORIES: Accessory[] = [
  { id: "1", name: "Everyday Leash", category: "Walking", price: 499, description: "Padded handle, 5ft nylon webbing", icon: "leash" },
  { id: "2", name: "Adjustable Collar", category: "Walking", price: 349, description: "Soft-lined, fits neck 30–45cm", icon: "collar" },
  { id: "3", name: "Ceramic Food Bowl", category: "Feeding", price: 599, description: "Non-slip base, dishwasher safe", icon: "bowl" },
  { id: "4", name: "Slow Feeder Bowl", category: "Feeding", price: 749, description: "Reduces gulping, easy to clean", icon: "bowl" },
  { id: "5", name: "Rope Chew Toy", category: "Toys", price: 249, description: "Durable cotton rope, cleans teeth", icon: "toy" },
  { id: "6", name: "Squeaky Plush Toy", category: "Toys", price: 299, description: "Soft plush with built-in squeaker", icon: "toy" },
  { id: "7", name: "Cozy Pet Bed", category: "Comfort", price: 1499, description: "Machine washable, orthopedic foam", icon: "bed" },
  { id: "8", name: "Travel Carrier Bag", category: "Travel", price: 1899, description: "Airline-friendly, ventilated sides", icon: "carrier" },
];

export default function AccessoriesPage() {
  const categories = Array.from(new Set(ACCESSORIES.map((a) => a.category)));

  return (
    <main className="pb-16 max-w-5xl mx-auto" style={{ background: "var(--cream)", minHeight: "100vh" }}>
      <div className="flex items-center gap-3 px-6 py-5">
        <Link href="/" className="tap-scale">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-xl font-bold flex items-center gap-2">
          <ShoppingBag size={20} color="var(--tan)" /> Accessories
        </h1>
      </div>

      <p className="px-6 text-sm mb-8" style={{ color: "var(--muted)" }}>
        Everyday essentials for your pet, picked to last.
      </p>

      {categories.map((category) => (
        <section key={category} className="px-6 mb-10">
          <h2 className="text-lg font-bold mb-4">{category}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {ACCESSORIES.filter((a) => a.category === category).map((item) => (
              <AccessoryCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      ))}

      <div className="px-6 mt-4">
        <div className="card flex items-center gap-3">
          <PawPrint size={18} color="var(--tan)" />
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            More products coming soon — sign in to save items for your next order.
          </p>
        </div>
      </div>
    </main>
  );
}
