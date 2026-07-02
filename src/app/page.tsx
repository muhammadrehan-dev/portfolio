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

export default function Home() {
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
