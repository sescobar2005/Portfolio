import About from '@/components/sections/about/about';
import Hero from '@/components/sections/hero/hero';

export default function Home() {
  return (
    <main>
      <Hero />
      <About />

      <section id="skills">
        <h2>Technology lab</h2>
      </section>

      <section id="projects">
        <h2>Expeditions</h2>
      </section>

      <section id="contact">
        <h2>Transmissions</h2>
      </section>
    </main>
  );
}