import Image from "next/image";
import Reveal from "../Reveal";
import { site, socials } from "../../data/site";
import { SpotifyIcon, InstagramIcon, YouTubeIcon, SoundCloudIcon } from "../Icons";

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 px-6 py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-16">
        {/* Artist image */}
        <Reveal>
          <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-2xl border border-white/10">
            <Image
              src="https://i.scdn.co/image/ab6761610000e5eb8d31533e7d41b1294c723735"
              alt="Rhythmic Chaos artist portrait"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="pointer-events-none absolute -inset-px rounded-2xl shadow-[inset_0_0_60px_-20px_rgba(30,144,255,0.3)]" />
          </div>
        </Reveal>

        {/* Bio */}
        <Reveal delay={150}>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#8A7DFF]">
              About
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              {site.tagline}
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-white/60">
              {/* EDIT: your bio lives here */}
              <p>
                Originating from Pune, India, and now shaping the Nuremberg
                electronic scene, Rhythmic Chaos is a producer with a global
                perspective — fusing the high-octane energy of European
                electronic music with the intricate, soulful ragas of Indian
                classical tradition.
              </p>
              <p>
                Blending atmospheric sitar melodies with deep, driving
                progressive house rhythms, the project creates a cinematic
                experience built for late nights, headphones, and festival
                moments.
              </p>
              <p>
                Since 2018, every release has been an experiment in collision —
                two worlds, one rhythm. Join the journey as the chaos unfolds.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-5">
              {[
                { href: socials.spotify, label: "Spotify", Icon: SpotifyIcon },
                { href: socials.instagram, label: "Instagram", Icon: InstagramIcon },
                { href: socials.youtube, label: "YouTube", Icon: YouTubeIcon },
                { href: socials.soundcloud, label: "SoundCloud", Icon: SoundCloudIcon },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-white/50 transition-colors hover:text-white"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
