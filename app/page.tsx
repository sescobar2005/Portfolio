import About from '@/components/sections/about/about';
import Hero from '@/components/sections/hero/hero';
import Skills from '@/components/sections/skills/skills';

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />

      <section id="projects">
        <h2>Expeditions</h2>
      </section>

      <section id="contact">
        <h2>Transmissions</h2>
      </section>
    </main>
  );
}