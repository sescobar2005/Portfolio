import About from '@/components/sections/about/about';
import Hero from '@/components/sections/hero/hero';
import Projects from '@/components/sections/projects/projects';
import Skills from '@/components/sections/skills/skills';

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Projects />

      <section id="contact">
        <h2>Transmissions</h2>
      </section>
    </main>
  );
}