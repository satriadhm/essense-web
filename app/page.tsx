import { Navbar } from "@/components/navigation/Navbar";
import { HeroSection } from "@/components/hero/HeroSection";
import { WhatIsEssense } from "@/components/sections/WhatIsEssense";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { FragranceNotes } from "@/components/sections/FragranceNotes";
import { BiometricSection } from "@/components/sections/BiometricSection";
import { MiaAI } from "@/components/sections/MiaAI";
import { JournalSection } from "@/components/sections/JournalSection";
import { CommunitySection } from "@/components/sections/CommunitySection";
import { AppPreview } from "@/components/sections/AppPreview";
import { CTASection } from "@/components/sections/CTASection";

export default function Home() {
  return (
    <div className="relative min-h-[100dvh] overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <WhatIsEssense />
        <HowItWorks />
        <FragranceNotes />
        <BiometricSection />
        <MiaAI />
        <JournalSection />
        <CommunitySection />
        <AppPreview />
        <CTASection />
      </main>
    </div>
  );
}
