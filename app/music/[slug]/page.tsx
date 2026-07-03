import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { releases, getReleaseBySlug, dspMeta } from "../../data/releases";
import { site } from "../../data/site";
import {
  SpotifyIcon,
  AppleMusicIcon,
  YouTubeIcon,
  SoundCloudIcon,
  MusicNoteIcon,
  ExternalLinkIcon,
  ArrowRightIcon,
} from "../../components/Icons";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return releases.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const release = getReleaseBySlug(slug);
  if (!release) return {};
  const title = `${release.title} — ${site.name}`;
  const description = `Listen to "${release.title}" by ${site.name} on your favorite platform. ${release.description}`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: release.cover, width: 640, height: 640 }],
      type: "music.album",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

const dspIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  spotify: SpotifyIcon,
  appleMusic: AppleMusicIcon,
  youtubeMusic: YouTubeIcon,
  youtube: YouTubeIcon,
  soundcloud: SoundCloudIcon,
};

function formatFullDate(date: string) {
  return new Date(date + "T00:00:00").toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function ReleasePage({ params }: Props) {
  const { slug } = await params;
  const release = getReleaseBySlug(slug);
  if (!release) notFound();

  const availableLinks = dspMeta.filter(({ key }) => release.links[key]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-black">
      {/* Ambient blurred cover backdrop */}
      <div className="pointer-events-none absolute inset-0">
        <Image
          src={release.cover}
          alt=""
          fill
          sizes="100vw"
          className="scale-125 object-cover opacity-20 blur-3xl"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-md flex-col items-center px-6 pb-16 pt-32">
        {/* Cover */}
        <div className="relative aspect-square w-full max-w-[320px] overflow-hidden rounded-2xl border border-white/10 shadow-[0_20px_60px_-20px_rgba(138,125,255,0.4)]">
          <Image
            src={release.cover}
            alt={`${release.title} cover artwork`}
            fill
            sizes="320px"
            className="object-cover"
            priority
          />
        </div>

        {/* Title */}
        <div className="mt-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8A7DFF]">
            {release.type} · {formatFullDate(release.releaseDate)}
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
            {release.title}
          </h1>
          <p className="mt-1 text-lg text-white/60">{site.name}</p>
          <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-white/50">
            {release.description}
          </p>
        </div>

        {/* DSP buttons */}
        <div className="mt-10 w-full space-y-3">
          {availableLinks.length > 0 ? (
            availableLinks.map(({ key, label }) => {
              const Icon = dspIcons[key] ?? MusicNoteIcon;
              return (
                <a
                  key={key}
                  href={release.links[key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-full items-center justify-between rounded-xl border border-white/12 bg-black/40 px-5 py-4 transition-all duration-300 hover:border-white/30 hover:bg-black/60 hover:shadow-[0_0_25px_-8px_rgba(138,125,255,0.4)]"
                >
                  <span className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-white/80" />
                    <span className="font-medium text-white">{label}</span>
                  </span>
                  <ExternalLinkIcon className="h-4 w-4 text-white/30 transition-colors group-hover:text-white/70" />
                </a>
              );
            })
          ) : (
            <p className="text-center text-sm text-white/45">
              Streaming links coming soon.
            </p>
          )}
        </div>

        {/* Back link */}
        <Link
          href="/music"
          className="group mt-12 inline-flex items-center gap-2 text-sm text-white/45 transition-colors hover:text-white"
        >
          <ArrowRightIcon className="h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-1" />
          All music
        </Link>
      </div>
    </main>
  );
}
