import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AudienceSection from "../components/AudienceSection";
import FeaturesSection from "../components/FeaturesSection";
import HowItWorksSection from "../components/HowItWorksSection";
import FinalCTASection from "../components/FinalCTASection";
import Footer from "../components/Footer";

export default function Index() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AudienceSection />
      <FeaturesSection />
      <HowItWorksSection />
      <FinalCTASection />
      <Footer />
    </div>
  );
}
