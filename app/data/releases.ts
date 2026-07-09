/**
 * Release data — now sourced from Supabase (Phase 5).
 *
 * The public site reads with the anon key; Row Level Security guarantees only
 * public releases come back (published / upcoming-public / archived-public).
 *
 * If Supabase env vars are not configured yet, these functions fall back to a
 * bundled snapshot of the original catalog so the deployed site never breaks
 * during the migration. Once keys are set, Supabase is the single source of
 * truth and the dashboard controls everything.
 *
 * Public ordering rules:
 *   - Featured (homepage): release_date DESC
 *   - Music page "All Releases": status=published, release_date DESC
 *   - Music page "Upcoming": status=upcoming & smart_link_public, release_date ASC
 *   - Never sort public releases by created_at.
 */

import { getSupabase } from "../lib/supabase";

export type ReleaseType =
  | "Single"
  | "EP"
  | "Album"
  | "Remix"
  | "Bootleg"
  | "Mix";

export type ReleaseStatus = "draft" | "upcoming" | "published" | "archived";

export type LinkType =
  | "listen"
  | "presave"
  | "preadd"
  | "preorder"
  | "premiere"
  | "other";

export interface ReleaseLink {
  platform: string;
  platformLabel: string | null;
  linkType: LinkType;
  url: string;
  customButtonLabel: string | null;
  sortOrder: number;
}

export interface Release {
  slug: string;
  title: string;
  artistName: string;
  type: ReleaseType;
  releaseDate: string; // YYYY-MM-DD
  cover: string;
  description: string;
  mood: string | null;
  status: ReleaseStatus;
  smartLinkPublic: boolean;
  featured: boolean;
  links: ReleaseLink[];
}

export const COVER_PLACEHOLDER =
  "https://placehold.co/640x640/0d0d12/8A7DFF?text=Rhythmic+Chaos";

/* ---------- Row mapping ---------- */

interface DbLink {
  platform: string;
  platform_label: string | null;
  link_type: LinkType;
  url: string;
  custom_button_label: string | null;
  sort_order: number;
}

interface DbRelease {
  slug: string;
  title: string;
  artist_name: string;
  type: ReleaseType;
  release_date: string;
  cover_image_url: string | null;
  description: string | null;
  mood: string | null;
  status: ReleaseStatus;
  smart_link_public: boolean;
  featured: boolean;
  release_links?: DbLink[];
}

function mapLink(l: DbLink): ReleaseLink {
  return {
    platform: l.platform,
    platformLabel: l.platform_label,
    linkType: l.link_type,
    url: l.url,
    customButtonLabel: l.custom_button_label,
    sortOrder: l.sort_order,
  };
}

function mapRelease(r: DbRelease): Release {
  return {
    slug: r.slug,
    title: r.title,
    artistName: r.artist_name,
    type: r.type,
    releaseDate: r.release_date,
    cover: r.cover_image_url || COVER_PLACEHOLDER,
    description: r.description ?? "",
    mood: r.mood,
    status: r.status,
    smartLinkPublic: r.smart_link_public,
    featured: r.featured,
    links: (r.release_links ?? [])
      .map(mapLink)
      .sort((a, b) => a.sortOrder - b.sortOrder),
  };
}

const SELECT = "*, release_links(*)";

/* ---------- Public queries ---------- */

/** Homepage featured: published or public-upcoming, newest first. */
export async function getFeaturedReleases(max = 4): Promise<Release[]> {
  const supabase = getSupabase();
  if (!supabase) {
    return FALLBACK.filter((r) => r.featured)
      .sort((a, b) => b.releaseDate.localeCompare(a.releaseDate))
      .slice(0, max);
  }
  const { data, error } = await supabase
    .from("releases")
    .select(SELECT)
    .eq("featured", true)
    .in("status", ["published", "upcoming"])
    .order("release_date", { ascending: false })
    .limit(max);
  if (error || !data) return [];
  return (data as DbRelease[]).map(mapRelease);
}

/** Music page "All Releases": published only, newest first. */
export async function getPublishedReleases(): Promise<Release[]> {
  const supabase = getSupabase();
  if (!supabase) {
    return FALLBACK.filter((r) => r.status === "published").sort((a, b) =>
      b.releaseDate.localeCompare(a.releaseDate)
    );
  }
  const { data, error } = await supabase
    .from("releases")
    .select(SELECT)
    .eq("status", "published")
    .order("release_date", { ascending: false });
  if (error || !data) return [];
  return (data as DbRelease[]).map(mapRelease);
}

/** Music page "Upcoming": public upcoming, nearest date first. */
export async function getUpcomingReleases(): Promise<Release[]> {
  const supabase = getSupabase();
  if (!supabase) {
    return FALLBACK.filter(
      (r) => r.status === "upcoming" && r.smartLinkPublic
    ).sort((a, b) => a.releaseDate.localeCompare(b.releaseDate));
  }
  const { data, error } = await supabase
    .from("releases")
    .select(SELECT)
    .eq("status", "upcoming")
    .eq("smart_link_public", true)
    .order("release_date", { ascending: true });
  if (error || !data) return [];
  return (data as DbRelease[]).map(mapRelease);
}

/** Single release by slug. Returns null if not publicly visible (RLS-enforced). */
export async function getReleaseBySlug(
  slug: string
): Promise<Release | null> {
  const supabase = getSupabase();
  if (!supabase) {
    return FALLBACK.find((r) => r.slug === slug) ?? null;
  }
  const { data, error } = await supabase
    .from("releases")
    .select(SELECT)
    .eq("slug", slug)
    .maybeSingle();
  if (error || !data) return null;
  return mapRelease(data as DbRelease);
}

/** Slugs to pre-render at build time (published + public upcoming). */
export async function getStaticSlugs(): Promise<string[]> {
  const supabase = getSupabase();
  if (!supabase) return FALLBACK.map((r) => r.slug);
  const { data, error } = await supabase
    .from("releases")
    .select("slug, status, smart_link_public");
  if (error || !data) return [];
  return (
    data as {
      slug: string;
      status: ReleaseStatus;
      smart_link_public: boolean;
    }[]
  )
    .filter(
      (r) =>
        r.status === "published" ||
        (r.status === "upcoming" && r.smart_link_public)
    )
    .map((r) => r.slug);
}

/* ---------- Fallback snapshot (only used when Supabase is unconfigured) ---------- */

function spotify(url: string): ReleaseLink[] {
  return [
    {
      platform: "Spotify",
      platformLabel: null,
      linkType: "listen",
      url,
      customButtonLabel: null,
      sortOrder: 0,
    },
  ];
}

const FALLBACK: Release[] = [
  {
    slug: "flow",
    title: "Flow",
    artistName: "Rhythmic Chaos",
    type: "Single",
    releaseDate: "2025-06-27",
    cover: "https://i.scdn.co/image/ab67616d0000b27327c18627757bfeef0a3b0de7",
    description:
      "A driving progressive journey built for peak-time momentum.",
    mood: null,
    status: "published",
    smartLinkPublic: true,
    featured: true,
    links: spotify("https://open.spotify.com/album/4bDUp19lWhWJ70iho5L31M"),
  },
  {
    slug: "love-ep",
    title: "Love",
    artistName: "Rhythmic Chaos",
    type: "EP",
    releaseDate: "2024-10-12",
    cover: "https://i.scdn.co/image/ab67616d0000b273abe3c30cce4c1b45c51c9267",
    description:
      "A four-track exploration of connection — cinematic melodies over deep, driving rhythms.",
    mood: null,
    status: "published",
    smartLinkPublic: true,
    featured: true,
    links: spotify("https://open.spotify.com/album/76u87gwXmgr1GkHCSFkwXY"),
  },
  {
    slug: "lost-and-found",
    title: "Lost & Found",
    artistName: "Rhythmic Chaos",
    type: "Single",
    releaseDate: "2024-09-25",
    cover: "https://i.scdn.co/image/ab67616d0000b273568b5dc7cc13e25a89fb3e4c",
    description: "Emotional depth meets late-night club energy.",
    mood: null,
    status: "published",
    smartLinkPublic: true,
    featured: true,
    links: spotify("https://open.spotify.com/album/6E7VXfy6nvSnEIjrtGmjM5"),
  },
  {
    slug: "echoes",
    title: "Echoes",
    artistName: "Rhythmic Chaos",
    type: "Single",
    releaseDate: "2024-08-09",
    cover: "https://i.scdn.co/image/ab67616d0000b273201c005710b2cbd49d25998d",
    description: "Atmospheric textures echoing between two worlds.",
    mood: null,
    status: "published",
    smartLinkPublic: true,
    featured: true,
    links: spotify("https://open.spotify.com/album/0UWip5pBbOHDf0IUvCts09"),
  },
  {
    slug: "forever-starts",
    title: "Forever Starts",
    artistName: "Rhythmic Chaos",
    type: "Single",
    releaseDate: "2024-05-01",
    cover: "https://i.scdn.co/image/ab67616d0000b273d42f2b205e42c6de5eddf092",
    description: "Where melody meets momentum — a progressive anthem.",
    mood: null,
    status: "published",
    smartLinkPublic: true,
    featured: false,
    links: spotify("https://open.spotify.com/album/0VadY4YdeJ7p4p0nAsCcyj"),
  },
  {
    slug: "dream-about-you",
    title: "Dream about You",
    artistName: "Rhythmic Chaos",
    type: "Single",
    releaseDate: "2024-03-01",
    cover: "https://i.scdn.co/image/ab67616d0000b2733cb3c5ef8ec33a16d2749404",
    description: "A dreamlike vocal cut drifting over deep house grooves.",
    mood: null,
    status: "published",
    smartLinkPublic: true,
    featured: false,
    links: spotify("https://open.spotify.com/album/67nCmnJeNKhYyIubOBeGoJ"),
  },
  {
    slug: "alaap",
    title: "Alaap",
    artistName: "Rhythmic Chaos",
    type: "Single",
    releaseDate: "2023-06-30",
    cover: "https://i.scdn.co/image/ab67616d0000b273f2926822d48aa79e6b98bec3",
    description:
      "Indian classical ragas woven into electronic rhythm — the sound of two worlds.",
    mood: null,
    status: "published",
    smartLinkPublic: true,
    featured: false,
    links: spotify("https://open.spotify.com/album/0H4k519F8duCtyMhqKDwzQ"),
  },
  {
    slug: "to-the-bassline",
    title: "To the Bassline",
    artistName: "Rhythmic Chaos",
    type: "Single",
    releaseDate: "2023-03-01",
    cover: "https://i.scdn.co/image/ab67616d0000b273991aaeb2b84ca3dbd219f6e4",
    description: "Raw, bass-driven energy made for the dancefloor.",
    mood: null,
    status: "published",
    smartLinkPublic: true,
    featured: false,
    links: spotify("https://open.spotify.com/album/4RD6MfjbOjaNx5we15pLBp"),
  },
  {
    slug: "to-the-end",
    title: "To the End",
    artistName: "Rhythmic Chaos",
    type: "Single",
    releaseDate: "2023-01-01",
    cover: "/images/releases/to-the-end.jpg",
    description: "A relentless progressive ride from first beat to last.",
    mood: null,
    status: "published",
    smartLinkPublic: true,
    featured: false,
    links: spotify("https://open.spotify.com/album/74e3O5UGxE47yKsA3GoPJF"),
  },
  {
    slug: "stay-forever",
    title: "Stay Forever",
    artistName: "Rhythmic Chaos",
    type: "Single",
    releaseDate: "2022-06-01",
    cover: "https://i.scdn.co/image/ab67616d0000b273b8a9243dd406acea3218f53f",
    description: "Melodic warmth suspended in time.",
    mood: null,
    status: "published",
    smartLinkPublic: true,
    featured: false,
    links: spotify("https://open.spotify.com/album/3DzVUPpgzfcDs63yyZrGbJ"),
  },
];
