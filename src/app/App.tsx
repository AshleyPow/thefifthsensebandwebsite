import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Music } from "./components/Music";
import { Shows } from "./components/Shows";
import { Gallery } from "./components/Gallery";
import { Videos } from "./components/Videos";
import { PressKit } from "./components/PressKit";
import { Testimonials } from "./components/Testimonials";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Navigation />
      <Hero />
      <About />
      {/* <Music />
      <Shows /> */}
      <Gallery />
      <Videos />
      <PressKit />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
