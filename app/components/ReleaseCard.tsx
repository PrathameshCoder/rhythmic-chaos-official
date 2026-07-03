import Image from "next/image";
import Link from "next/link";
import type { Release } from "../data/releases";
import { PlayIcon } from "./Icons";

function formatDate(date: string) {
  return new Date(date + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
}

export default function ReleaseCard({ release }: { release: Release }) {
  return (
    <Link
      href={`/music/${release.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d12] transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-[#131318] hover:shadow-[0_0_40px_-10px_rgba(138,125,255,0.35)]"
    >
      {/* Cover */}
      <div className="relative aspect-square w-full overflow-hidden bg-neutral-900">
        <Image
          src={release.cover}
          alt={`${release.title} cover artwork`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <span className="absolute right-3 top-3 rounded-full border border-white/20 bg-black/70 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white/90">
          {release.type}
        </span>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="text-lg font-semibold text-white">{release.title}</h3>
          <span className="shrink-0 text-xs text-white/40">
            {formatDate(release.releaseDate)}
          </span>
        </div>
        <p className="line-clamp-2 text-sm leading-relaxed text-white/55">
          {release.description}
        </p>
        <span className="mt-auto inline-flex items-center gap-2 pt-3 text-sm font-medium text-[#8A7DFF] transition-colors group-hover:text-white">
          <PlayIcon className="h-3.5 w-3.5" />
          Listen
        </span>
      </div>
    </Link>
  );
}
