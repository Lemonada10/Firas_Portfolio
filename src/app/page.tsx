import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Pipeline } from "@/components/sections/pipeline";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Contact } from "@/components/sections/contact";
import { HashScroll } from "@/components/ui/hash-scroll";

export default function HomePage() {
  return (
    <>
      <HashScroll />
      <Hero />
      <About />
      <Pipeline />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
    </>
  );
}
