import Hero from "./components/sections/Hero";
import FeaturedReleases from "./components/sections/FeaturedReleases";
import About from "./components/sections/About";
import Newsletter from "./components/sections/Newsletter";
import Shows from "./components/sections/Shows";
import Contact from "./components/sections/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="relative w-full bg-black">
      <Hero />
      <FeaturedReleases />
      <About />
      <Newsletter />
      <Shows />
      <Contact />
      <Footer />
    </main>
  );
}
