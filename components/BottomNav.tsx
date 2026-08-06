"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { PawPrint, Home, Syringe, ShoppingBag, User } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();
  // Read ?service= directly from the browser instead of useSearchParams(), which
  // avoids forcing every page that renders this nav into a Suspense boundary.
  const [currentService, setCurrentService] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentService(new URLSearchParams(window.location.search).get("service"));
    }
  }, [pathname]);

  const isBook = pathname === "/book";

  const items = [
    {
      href: "/owner/dashboard",
      label: "Walks",
      icon: PawPrint,
      active: pathname === "/owner/dashboard" || (isBook && currentService === "WALKING"),
    },
    {
      href: "/book?service=SITTING",
      label: "Sitting",
      icon: Home,
      active: isBook && currentService === "SITTING",
    },
    {
      href: "/owner/pets",
      label: "Vaccines",
      icon: Syringe,
      active: pathname === "/owner/pets",
    },
    {
      href: "/accessories",
      label: "Shop",
      icon: ShoppingBag,
      active: pathname === "/accessories",
    },
    {
      href: "/owner/profile",
      label: "Profile",
      icon: User,
      active: pathname === "/owner/profile",
    },
  ];

  return (
    <nav className="bottom-nav">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <Link key={item.label} href={item.href} className={`tap-scale ${item.active ? "active" : ""}`}>
            <Icon size={20} strokeWidth={item.active ? 2.5 : 2} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
