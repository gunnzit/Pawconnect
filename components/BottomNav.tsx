"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { PawPrint, Home, Syringe, ShoppingBag, User } from "lucide-react";

const NAV_ITEMS = [
  { href: "/owner/dashboard", label: "Walks", icon: PawPrint, service: "WALKING" },
  { href: "/book?service=SITTING", label: "Sitting", icon: Home, service: "SITTING" },
  { href: "/owner/pets", label: "Vaccines", icon: Syringe, service: null },
  { href: "/accessories", label: "Shop", icon: ShoppingBag, service: null },
  { href: "/owner/profile", label: "Profile", icon: User, service: null },
];

export default function BottomNav() {
  const pathname = usePathname();
  // Read the ?service= query directly from the browser instead of useSearchParams(),
  // which avoids requiring a Suspense boundary on every page that renders this nav.
  const [currentService, setCurrentService] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentService(new URLSearchParams(window.location.search).get("service"));
    }
  }, [pathname]);

  return (
    <nav className="bottom-nav">
      {NAV_ITEMS.map((item) => {
        const itemPath = item.href.split("?")[0];
        const active =
          pathname === "/book"
            ? currentService === item.service
            : item.service === null && pathname === itemPath;
        const Icon = item.icon;
        return (
          <Link key={item.href} href={item.href} className={`tap-scale ${active ? "active" : ""}`}>
            <Icon size={20} strokeWidth={active ? 2.5 : 2} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
