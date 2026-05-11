import Hero from "@/components/Hero";
import MissionVision from "@/components/MissionVision";
import FeaturedPrograms from "@/components/FeaturedPrograms";
import ImpactCalculator from "@/components/ImpactCalculator";
import CommandCenter from "@/components/CommandCenter";

export default function Home() {
  return (
    <main>
      <Hero />
      <MissionVision />
      <FeaturedPrograms />
      <ImpactCalculator />
      <CommandCenter />
    </main>
  );
}
