import Link from "next/link";
import LineWaves from "../LineWaves";
import { site, socials } from "../../data/site";
import {
  SpotifyIcon,
  AppleMusicIcon,
  YouTubeIcon,
  SoundCloudIcon,
  InstagramIcon,
} from "../Icons";

const heroSocials = [
  { href: socials.spotify, label: "Spotify", Icon: SpotifyIcon },
  { href: socials.appleMusic, label: "Apple Music", Icon: AppleMusicIcon },
  { href: socials.youtube, label: "YouTube", Icon: YouTubeIcon },
  { href: socials.soundcloud, label: "SoundCloud", Icon: SoundCloudIcon },
  { href: socials.instagram, label: "Instagram", Icon: InstagramIcon },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      {/* Background LineWaves — existing visual, unchanged */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <LineWaves
          speed={0.3}
          innerLineCount={32}
          outerLineCount={36}
          warpIntensity={1}
          rotation={-45}
          edgeFadeWidth={0}
          colorCycleSpeed={1}
          brightness={0.2}
          color1="#1E90FF"
          color2="#8A7DFF"
          color3="#FFB86B"
          enableMouseInteraction
          mouseInfluence={2}
        />
      </div>

      {/* Bottom fade into page background */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-40 bg-gradient-to-t from-black to-transparent" />

      {/* Hero content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <p className="animate-hero mb-4 text-xs font-semibold uppercase tracking-[0.4em] text-white/60 md:text-sm">
          Electronic · House · Progressive House
        </p>

        <h1 className="animate-hero text-5xl font-extrabold uppercase tracking-tight text-white [animation-delay:120ms] sm:text-6xl md:text-7xl lg:text-8xl">
          Rhythmic{" "}
          <span className="bg-gradient-to-r from-[#1E90FF] via-[#8A7DFF] to-[#FFB86B] bg-clip-text text-transparent">
            Chaos
          </span>
        </h1>

        <p className="animate-hero mt-6 max-w-xl text-base leading-relaxed text-white/60 [animation-delay:240ms] md:text-lg">
          {site.tagline} — cinematic emotion meets club-focused energy.
        </p>

        <div className="animate-hero mt-10 flex flex-col items-center gap-4 [animation-delay:360ms] sm:flex-row">
          <a
            href={socials.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded-full bg-white px-8 py-3 font-medium text-black transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_-6px_rgba(255,255,255,0.6)] sm:w-auto"
          >
            Listen Now
          </a>
          <Link
            href="/music"
            className="w-full rounded-full border border-white px-8 py-3 font-medium text-white transition-all duration-300 hover:bg-white hover:text-black sm:w-auto"
          >
            View Music
          </Link>
          <Link
            href="/#contact"
            className="w-full rounded-full border border-white/30 px-8 py-3 font-medium text-white/80 transition-all duration-300 hover:border-white hover:text-white sm:w-auto"
          >
            Bookings
          </Link>
        </div>

        <div className="animate-hero mt-12 flex items-center gap-6 [animation-delay:480ms]">
          {heroSocials.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-white/40 transition-all duration-300 hover:scale-110 hover:text-white"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/25 p-1.5">
          <div className="h-2 w-1 animate-bounce rounded-full bg-white/60" />
        </div>
      </div>
    </section>
  );
}
