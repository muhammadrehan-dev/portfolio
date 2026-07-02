import { preload } from "react-dom";
import { PresentationProvider } from "@/components/PresentationProvider";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import { Navbar } from "@/components/Navbar";
import { HeroPanel } from "@/components/panels/HeroPanel";
import { AboutPanel } from "@/components/panels/AboutPanel";
import { EducationPanel } from "@/components/panels/EducationPanel";
import { SkillsPanel } from "@/components/panels/SkillsPanel";
import { ProjectsPanel } from "@/components/panels/ProjectsPanel";
import { SecurityPanel } from "@/components/panels/SecurityPanel";
import { ContactPanel } from "@/components/panels/ContactPanel";

const backgroundImages = [
  "/media/hero-bg.jpg",
  "/media/about-bg.jpg",
  "/media/education-bg.jpg",
  "/media/skills-bg.jpg",
  "/media/projects-bg.jpg",
  "/media/security-bg.jpg",
  "/media/contact-bg.jpg"
];

export default function Home() {
  // Preload all background images to prevent lag/flashes during slide transitions
  backgroundImages.forEach((src) => {
    preload(src, { as: "image" });
  });

  return (
    <main className="w-full bg-black">
      <PresentationProvider>
        <Navbar />
        <ProgressIndicator />
        <HeroPanel />
        <AboutPanel />
        <EducationPanel />
        <SkillsPanel />
        <ProjectsPanel />
        <SecurityPanel />
        <ContactPanel />
      </PresentationProvider>
    </main>
  );
}
