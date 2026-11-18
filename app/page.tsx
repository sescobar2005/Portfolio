import About from '@/components/sections/about/about';
import Contact from '@/components/sections/contact/contact';
import Hero from '@/components/sections/hero/hero';
import Projects from '@/components/sections/projects/projects';
import Skills from '@/components/sections/skills/skills';
import TechnologyLab from '@/components/sections/space-station/space-station';

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <TechnologyLab />
      <Projects />
      <Contact />
    </main>
  );
}