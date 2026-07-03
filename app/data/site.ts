/**
 * Central site configuration.
 * Edit artist info, links, and contact details here — everything else pulls from this file.
 */

export const site = {
  name: "Rhythmic Chaos",
  tagline: "The Sound of Two Worlds",
  description:
    "Official website of Rhythmic Chaos. Listen to the latest releases, explore music, join the mailing list, and contact for bookings and collaborations.",
  url: "https://rhythmicchaos.com", // TODO: replace with your deployed domain
  bookingEmail: "bookings@rhythmicchaos.com", // TODO: replace with your real booking email
  genres: ["Electronic", "House", "Progressive House"],
} as const;

export const socials = {
  spotify: "https://open.spotify.com/artist/1pipQ5cKsrr6WSE07W0LWi",
  appleMusic: "https://music.apple.com/in/artist/rhythmic-chaos/1502874582",
  youtube: "https://www.youtube.com/@rhythmicchaos4",
  soundcloud: "https://soundcloud.com/user-435775001",
  instagram: "https://www.instagram.com/rhythmic_chaos",
} as const;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Music", href: "/music" },
  { label: "About", href: "/#about" },
  { label: "Shows", href: "/#shows" },
  { label: "Contact", href: "/#contact" },
] as const;
