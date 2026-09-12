import { useTheme } from "./hooks/useTheme";
import Background from "./components/ui/Background";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import BackToTop from "./components/ui/BackToTop";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Experience from "./components/sections/Experience";
import CTA from "./components/sections/CTA";
import Contact from "./components/sections/Contact";

export default function App() {
  const { theme, toggle } = useTheme();

  return (
    <div className="relative min-h-screen font-sans text-ink bg-bg">
      <Background />
      <div className="noise-overlay" />
      <Navbar theme={theme} onToggleTheme={toggle} />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <CTA />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}