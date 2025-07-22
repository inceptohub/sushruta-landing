import { useState, useEffect } from "react";
import SPANavigation from "./SPANavigation";
import HomePage from "./HomePage";
import FeaturesPage from "./FeaturesPage";
import AboutPage from "./AboutPage";
import ContactPage from "./ContactPage";

export default function SPA() {
  const [currentSection, setCurrentSection] = useState("home");

  // Handle hash changes and initial load
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Remove the #
      if (hash && ["home", "features", "about", "contact"].includes(hash)) {
        setCurrentSection(hash);
      } else {
        setCurrentSection("home");
        window.history.replaceState(null, "", "#home");
      }
    };

    // Set initial section based on URL hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleNavigate = (section: string) => {
    setCurrentSection(section);
    window.location.hash = section;
  };

  const renderCurrentSection = () => {
    switch (currentSection) {
      case "features":
        return <FeaturesPage />;
      case "about":
        return <AboutPage />;
      case "contact":
        return <ContactPage />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SPANavigation currentSection={currentSection} onNavigate={handleNavigate} />
      <main className="transition-all duration-300 ease-in-out">
        {renderCurrentSection()}
      </main>
    </div>
  );
}
