/**
 * Release catalog — the single source of truth for all music on the site.
 *
 * To add a release:
 * 1. Copy an entry below and edit the fields.
 * 2. `slug` becomes the URL: /music/<slug>
 * 3. `cover` can be a remote URL or a local file in /public/images/releases/
 * 4. Leave any DSP link as "" and its button simply won't render.
 * 5. Set `featured: true` on up to ~4 releases to show them on the homepage.
 */

export type ReleaseType = "Single" | "EP" | "Album" | "Remix";

export interface Release {
  slug: string;
  title: string;
  type: ReleaseType;
  releaseDate: string; // YYYY-MM-DD
  cover: string;
  description: string;
  featured: boolean;
  links: {
    spotify?: string;
    appleMusic?: string;
    youtubeMusic?: string;
    youtube?: string;
    soundcloud?: string;
    amazonMusic?: string;
    beatport?: string;
    bandcamp?: string;
  };
}

export const releases: Release[] = [
  {
    slug: "flow",
    title: "Flow",
    type: "Single",
    releaseDate: "2025-06-27",
    cover: "https://i.scdn.co/image/ab67616d0000b27327c18627757bfeef0a3b0de7",
    description: "A driving progressive journey built for peak-time momentum.",
    featured: true,
    links: {
      spotify: "https://open.spotify.com/album/4bDUp19lWhWJ70iho5L31M",
      appleMusic: "",
      youtubeMusic: "",
      youtube: "",
      soundcloud: "",
      amazonMusic: "",
      beatport: "",
      bandcamp: "",
    },
  },
  {
    slug: "love-ep",
    title: "Love",
    type: "EP",
    releaseDate: "2024-10-12",
    cover: "https://i.scdn.co/image/ab67616d0000b273abe3c30cce4c1b45c51c9267",
    description:
      "A four-track exploration of connection — cinematic melodies over deep, driving rhythms.",
    featured: true,
    links: {
      spotify: "https://open.spotify.com/album/76u87gwXmgr1GkHCSFkwXY",
      appleMusic: "",
      youtubeMusic: "",
      youtube: "",
      soundcloud: "",
      amazonMusic: "",
      beatport: "",
      bandcamp: "",
    },
  },
  {
    slug: "lost-and-found",
    title: "Lost & Found",
    type: "Single",
    releaseDate: "2024-09-25",
    cover: "https://i.scdn.co/image/ab67616d0000b273568b5dc7cc13e25a89fb3e4c",
    description: "Emotional depth meets late-night club energy.",
    featured: true,
    links: {
      spotify: "https://open.spotify.com/album/6E7VXfy6nvSnEIjrtGmjM5",
      appleMusic: "",
      youtubeMusic: "",
      youtube: "",
      soundcloud: "",
      amazonMusic: "",
      beatport: "",
      bandcamp: "",
    },
  },
  {
    slug: "echoes",
    title: "Echoes",
    type: "Single",
    releaseDate: "2024-08-09",
    cover: "https://i.scdn.co/image/ab67616d0000b273201c005710b2cbd49d25998d",
    description: "Atmospheric textures echoing between two worlds.",
    featured: true,
    links: {
      spotify: "https://open.spotify.com/album/0UWip5pBbOHDf0IUvCts09",
      appleMusic: "",
      youtubeMusic: "",
      youtube: "",
      soundcloud: "",
      amazonMusic: "",
      beatport: "",
      bandcamp: "",
    },
  },
  {
    slug: "forever-starts",
    title: "Forever Starts",
    type: "Single",
    releaseDate: "2024-05-01",
    cover: "https://i.scdn.co/image/ab67616d0000b273d42f2b205e42c6de5eddf092",
    description: "Where melody meets momentum — a progressive anthem.",
    featured: false,
    links: {
      spotify: "https://open.spotify.com/album/0VadY4YdeJ7p4p0nAsCcyj",
      appleMusic: "",
      youtubeMusic: "",
      youtube: "",
      soundcloud: "",
      amazonMusic: "",
      beatport: "",
      bandcamp: "",
    },
  },
  {
    slug: "dream-about-you",
    title: "Dream about You",
    type: "Single",
    releaseDate: "2024-03-01",
    cover: "https://i.scdn.co/image/ab67616d0000b2733cb3c5ef8ec33a16d2749404",
    description: "A dreamlike vocal cut drifting over deep house grooves.",
    featured: false,
    links: {
      spotify: "https://open.spotify.com/album/67nCmnJeNKhYyIubOBeGoJ",
      appleMusic: "",
      youtubeMusic: "",
      youtube: "",
      soundcloud: "",
      amazonMusic: "",
      beatport: "",
      bandcamp: "",
    },
  },
  {
    slug: "alaap",
    title: "Alaap",
    type: "Single",
    releaseDate: "2023-06-30",
    cover: "https://i.scdn.co/image/ab67616d0000b273f2926822d48aa79e6b98bec3",
    description:
      "Indian classical ragas woven into electronic rhythm — the sound of two worlds.",
    featured: false,
    links: {
      spotify: "https://open.spotify.com/album/0H4k519F8duCtyMhqKDwzQ",
      appleMusic: "",
      youtubeMusic: "",
      youtube: "",
      soundcloud: "",
      amazonMusic: "",
      beatport: "",
      bandcamp: "",
    },
  },
  {
    slug: "to-the-bassline",
    title: "To the Bassline",
    type: "Single",
    releaseDate: "2023-03-01",
    cover: "https://i.scdn.co/image/ab67616d0000b273991aaeb2b84ca3dbd219f6e4",
    description: "Raw, bass-driven energy made for the dancefloor.",
    featured: false,
    links: {
      spotify: "https://open.spotify.com/album/4RD6MfjbOjaNx5we15pLBp",
      appleMusic: "",
      youtubeMusic: "",
      youtube: "",
      soundcloud: "",
      amazonMusic: "",
      beatport: "",
      bandcamp: "",
    },
  },
  {
    slug: "to-the-end",
    title: "To the End",
    type: "Single",
    releaseDate: "2023-01-01",
    cover: "/images/releases/to-the-end.jpg", // TODO: add cover image
    description: "A relentless progressive ride from first beat to last.",
    featured: false,
    links: {
      spotify: "https://open.spotify.com/album/74e3O5UGxE47yKsA3GoPJF",
      appleMusic: "",
      youtubeMusic: "",
      youtube: "",
      soundcloud: "",
      amazonMusic: "",
      beatport: "",
      bandcamp: "",
    },
  },
  {
    slug: "stay-forever",
    title: "Stay Forever",
    type: "Single",
    releaseDate: "2022-06-01",
    cover: "https://i.scdn.co/image/ab67616d0000b273b8a9243dd406acea3218f53f",
    description: "Melodic warmth suspended in time.",
    featured: false,
    links: {
      spotify: "https://open.spotify.com/album/3DzVUPpgzfcDs63yyZrGbJ",
      appleMusic: "",
      youtubeMusic: "",
      youtube: "",
      soundcloud: "",
      amazonMusic: "",
      beatport: "",
      bandcamp: "",
    },
  },
];

/* ---------- Helpers ---------- */

const byDateDesc = (a: Release, b: Release) =>
  b.releaseDate.localeCompare(a.releaseDate);

export const getAllReleases = (): Release[] => [...releases].sort(byDateDesc);

export const getFeaturedReleases = (max = 4): Release[] =>
  getAllReleases().filter((r) => r.featured).slice(0, max);

export const getReleaseBySlug = (slug: string): Release | undefined =>
  releases.find((r) => r.slug === slug);

/** DSP display order + labels for smart-link pages. Buttons render only if a link exists. */
export const dspMeta: { key: keyof Release["links"]; label: string }[] = [
  { key: "spotify", label: "Spotify" },
  { key: "appleMusic", label: "Apple Music" },
  { key: "youtubeMusic", label: "YouTube Music" },
  { key: "youtube", label: "YouTube" },
  { key: "soundcloud", label: "SoundCloud" },
  { key: "amazonMusic", label: "Amazon Music" },
  { key: "beatport", label: "Beatport" },
  { key: "bandcamp", label: "Bandcamp" },
];
