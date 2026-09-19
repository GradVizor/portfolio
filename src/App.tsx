import About from "./components/About";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Starfield from "./components/Starfield";

export default function App() {
  return (
    <div className="relative min-h-screen bg-base text-ink antialiased selection:bg-violet/40 selection:text-white">
      <Starfield />
      {/* film grain overlay */}
      <div className="grain pointer-events-none fixed inset-0 z-[60]" aria-hidden />
      {/* vignette */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 0%, transparent 55%, rgba(4,4,8,0.55) 100%)",
        }}
      />

      <Navbar />

      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}