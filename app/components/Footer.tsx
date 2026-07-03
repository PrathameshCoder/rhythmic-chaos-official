import Link from "next/link";
import { site, socials, navLinks } from "../data/site";
import {
  SpotifyIcon,
  AppleMusicIcon,
  YouTubeIcon,
  SoundCloudIcon,
  InstagramIcon,
} from "./Icons";

const musicLinks = [
  { label: "Spotify", href: socials.spotify, Icon: SpotifyIcon },
  { label: "Apple Music", href: socials.appleMusic, Icon: AppleMusicIcon },
  { label: "YouTube", href: socials.youtube, Icon: YouTubeIcon },
  { label: "SoundCloud", href: socials.soundcloud, Icon: SoundCloudIcon },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-black/60 px-6 pb-10 pt-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-4 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <p className="text-xl font-bold tracking-wide text-white">
              {site.name.toUpperCase()}
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/50">
              {site.tagline}. Electronic music blending cinematic emotion with
              club-focused energy — built for late nights, headphones, and
              festival moments.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a
                href={socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-white/40 transition-colors hover:text-white"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
              {musicLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-white/40 transition-colors hover:text-white"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer navigation">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-white/40">
              Explore
            </p>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Listen + contact */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-white/40">
              Listen
            </p>
            <ul className="space-y-3">
              {musicLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/40">
              Bookings
            </p>
            <a
              href={`mailto:${site.bookingEmail}`}
              className="text-sm text-white/60 transition-colors hover:text-white"
            >
              {site.bookingEmail}
            </a>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-6 text-center">
          <p className="text-xs text-white/35">
            © {year} {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
