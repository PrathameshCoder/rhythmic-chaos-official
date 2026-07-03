"use client";

import { useState } from "react";
import type { Release, ReleaseType } from "../data/releases";
import ReleaseCard from "../components/ReleaseCard";

const filters: ("All" | ReleaseType)[] = ["All", "Single", "EP", "Album", "Remix"];

export default function MusicGrid({ releases }: { releases: Release[] }) {
  const [active, setActive] = useState<(typeof filters)[number]>("All");

  const available = filters.filter(
    (f) => f === "All" || releases.some((r) => r.type === f)
  );
  const visible =
    active === "All" ? releases : releases.filter((r) => r.type === active);

  return (
    <div>
      {/* Filters */}
      <div className="mb-10 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Filter releases by type">
        {available.map((f) => (
          <button
            key={f}
            role="tab"
            aria-selected={active === f}
            onClick={() => setActive(f)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
              active === f
                ? "bg-white text-black"
                : "border border-white/15 text-white/60 hover:border-white/40 hover:text-white"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((release) => (
          <ReleaseCard key={release.slug} release={release} />
        ))}
      </div>

      {visible.length === 0 && (
        <p className="py-16 text-center text-white/45">
          No releases in this category yet.
        </p>
      )}
    </div>
  );
}
