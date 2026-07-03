import Link from "next/link";
import { getFeaturedReleases } from "../../data/releases";
import ReleaseCard from "../ReleaseCard";
import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";
import { ArrowRightIcon } from "../Icons";

export default function FeaturedReleases() {
  const featured = getFeaturedReleases(4);

  return (
    <section id="music" className="scroll-mt-24 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            eyebrow="Latest Music"
            title="Featured Releases"
            intro="A selection of the most recent and defining tracks. Explore the full catalog on the music page."
          />
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((release, i) => (
            <Reveal key={release.slug} delay={i * 100}>
              <ReleaseCard release={release} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-12 flex justify-center">
            <Link
              href="/music"
              className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3 font-medium text-white transition-all duration-300 hover:border-[#8A7DFF] hover:bg-[#8A7DFF]/10 hover:shadow-[0_0_30px_-8px_rgba(138,125,255,0.5)]"
            >
              View More Music
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
