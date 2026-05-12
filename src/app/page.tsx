import Hero from "@/components/Hero";
import MissionVision from "@/components/MissionVision";
import FeaturedPrograms from "@/components/FeaturedPrograms";
import ImpactCalculator from "@/components/ImpactCalculator";
import CommandCenter from "@/components/CommandCenter";

export const revalidate = 60;

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
