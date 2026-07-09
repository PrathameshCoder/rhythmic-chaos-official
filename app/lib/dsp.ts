import type { LinkType, ReleaseLink } from "../data/releases";

const VERB: Record<LinkType, string> = {
  listen: "Listen on",
  presave: "Pre-save on",
  preadd: "Pre-add on",
  preorder: "Pre-order on",
  premiere: "Watch Premiere on",
  other: "Open on",
};

/**
 * Button label from platform + link type, honoring a custom override.
 *   Spotify + presave    -> "Pre-save on Spotify"
 *   Apple Music + preadd -> "Pre-add on Apple Music"
 *   YouTube + premiere   -> "Watch Premiere on YouTube"
 *   Spotify + listen     -> "Listen on Spotify"
 */
export function buttonLabel(link: ReleaseLink): string {
  if (link.customButtonLabel && link.customButtonLabel.trim()) {
    return link.customButtonLabel.trim();
  }
  const name =
    link.platform === "Other"
      ? link.platformLabel?.trim() || "Link"
      : link.platform;
  return `${VERB[link.linkType] ?? "Open on"} ${name}`;
}
