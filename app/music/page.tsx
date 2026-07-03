import type { Metadata } from "next";
import { getAllReleases } from "../data/releases";
import MusicGrid from "./MusicGrid";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Music — Rhythmic Chaos",
  description:
    "Explore the full Rhythmic Chaos discography — singles, EPs, and remixes. Electronic, house, and progressive house music.",
};

export default function MusicPage() {
  const releases = getAllReleases();

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

          <MusicGrid releases={releases} />
        </div>
      </div>
      <Footer />
    </main>
  );
}
