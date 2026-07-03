"use client";

import StaggeredMenu from "./StaggeredMenu";
import { socials } from "../data/site";

const menuItems = [
  { label: "Home", ariaLabel: "Go to home page", link: "/" },
  { label: "Music", ariaLabel: "View music", link: "/music" },
  { label: "About", ariaLabel: "Learn about the artist", link: "/#about" },
  { label: "Shows", ariaLabel: "Shows and events", link: "/#shows" },
  { label: "Contact", ariaLabel: "Get in touch", link: "/#contact" },
];

const socialItems = [
  { label: "Spotify", link: socials.spotify },
  { label: "Apple Music", link: socials.appleMusic },
  { label: "YouTube", link: socials.youtube },
  { label: "SoundCloud", link: socials.soundcloud },
  { label: "Instagram", link: socials.instagram },
];

export default function Navbar() {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[9999] h-24 w-full overflow-visible">
      <StaggeredMenu
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials
        displayItemNumbering={true}
        menuButtonColor="#ffffff"
        openMenuButtonColor="#111111"
        changeMenuColorOnOpen={true}
        colors={["#8A7DFF", "#1E90FF"]}
        logoUrl="/Logo.png"
        logoHeight={64}
        accentColor="#1E90FF"
        isFixed={true}
      />
    </div>
  );
}
