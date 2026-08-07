"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { User } from "lucide-react";
import WalkTransition from "@/components/WalkTransition";

export default function WalkHero({ firstName }: { firstName: string }) {
  const [showWalkAnim, setShowWalkAnim] = useState(false);
  const router = useRouter();

  if (showWalkAnim) {
    return <WalkTransition onDone={() => router.push("/book?service=WALKING")} />;
  }

  return (
    <div
      className="relative w-full animate-fade-up tap-scale"
      style={{ height: 280, cursor: "pointer" }}
      onClick={() => setShowWalkAnim(true)}
      role="button"
      aria-label="Book a walk"
    >
      <Image src="/images/banner-instant-walk.jpg" alt="" fill sizes="700px" className="object-cover" priority />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(43,29,20,0.15) 0%, rgba(43,29,20,0.55) 100%)" }} />
      <Link
        href="/owner/profile"
        onClick={(e) => e.stopPropagation()}
        className="absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center tap-scale"
        style={{ background: "rgba(0,0,0,0.35)" }}
        aria-label="Profile"
      >
        <User size={16} color="white" />
      </Link>
      <div className="absolute inset-0 flex flex-col justify-end px-6 pb-8">
        <p className="text-white/80 text-sm font-medium mb-1">Good to see you,</p>
        <h1 className="text-white text-4xl font-bold mb-1">{firstName || "pet parent"}</h1>
        <p className="text-white/70 text-xs font-medium">Tap to book a walk</p>
      </div>
    </div>
  );
}
