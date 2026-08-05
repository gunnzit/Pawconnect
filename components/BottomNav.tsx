"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PawPrint, Home, Syringe, Calendar, User } from "lucide-react";

const NAV_ITEMS = [
  { href: "/owner/dashboard", label: "Walks", icon: PawPrint },
  { href: "/book?service=SITTING", label: "Sitting", icon: Home },
  { href: "/owner/pets", label: "Vaccines", icon: Syringe },
  { href: "/owner/bookings", label: "Bookings", icon: Calendar },
  { href: "/owner/profile", label: "Profile", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="bottom-nav">
      {NAV_ITEMS.map((item) => {
        const active = pathname === item.href.split("?")[0];
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
