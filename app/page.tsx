import Countdown from "./components/Countdown";
import EnvelopeCover from "./components/EnvelopeCover";
import Footer from "./components/Footer";
import Gallery from "./components/Gallery";
import Hero from "./components/Hero";
import Invitation from "./components/Invitation";
import OurStory from "./components/OurStory";
import TheDay from "./components/TheDay";
import Venues from "./components/Venues";

export default function Home() {
  return (
    <>
      <EnvelopeCover />
      <main>
        <Hero />
        <Invitation />
        <Countdown />
        <OurStory />
        <TheDay />
        <Gallery />
        <Venues />
        <Footer />
      </main>
    </>
  );
}
