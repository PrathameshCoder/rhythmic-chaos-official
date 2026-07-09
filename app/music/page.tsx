import type { Metadata } from "next";
import {
  getPublishedReleases,
  getUpcomingReleases,
} from "../data/releases";
import MusicGrid from "./MusicGrid";
import ReleaseCard from "../components/ReleaseCard";
import Footer from "../components/Footer";

// ISR: cached, but refreshes periodically and on-demand (see /api/revalidate).
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Music — Rhythmic Chaos",
  description:
    "Explore the full Rhythmic Chaos discography — singles, EPs, and remixes. Electronic, house, and progressive house music.",
};

export default async function MusicPage() {
  const [published, upcoming] = await Promise.all([
    getPublishedReleases(),
    getUpcomingReleases(),
  ]);

  return (
    <main className="min-h-screen bg-black">
      <div className="px-6 pb-24 pt-36 md:pt-44">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#8A7DFF]">
              Discography
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
              Music
            </h1>
            <p className="mt-4 text-base leading-relaxed text-white/55">
              Every release, from the earliest experiments to the latest
              progressive journeys. Pick a track and choose your platform.
            </p>
          </div>

          {/* Upcoming section — only rendered when there are public upcoming releases */}
          {upcoming.length > 0 && (
            <section className="mb-16">
              <div className="mb-6 flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-[#8A7DFF]" />
                <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8A7DFF]">
                  Upcoming
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {upcoming.map((release) => (
                  <ReleaseCard key={release.slug} release={release} />
                ))}
              </div>
            </section>
          )}

          {/* All released music */}
          {upcoming.length > 0 && (
            <div className="mb-6 flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
              <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-white/50">
                All Releases
              </h2>
            </div>
          )}
          <MusicGrid releases={published} />
        </div>
      </div>
      <Footer />
    </main>
  );
}
