"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/owner/dashboard", label: "Walks", icon: "🐕" },
  { href: "/book?service=SITTING", label: "Sitting", icon: "🏠" },
  { href: "/owner/pets", label: "Vaccines", icon: "💉" },
  { href: "/owner/bookings", label: "Bookings", icon: "📅" },
  { href: "/owner/profile", label: "Profile", icon: "🐾" },
];

export default function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="bottom-nav">
      {NAV_ITEMS.map((item) => {
        const active = pathname === item.href.split("?")[0];
        return (
          <Link key={item.href} href={item.href} className={active ? "active" : ""}>
            <span style={{ fontSize: "1.1rem" }}>{item.icon}</span>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
