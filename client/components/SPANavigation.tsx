import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

interface SPANavigationProps {
  currentSection: string;
  onNavigate: (section: string) => void;
}

export default function SPANavigation({
  currentSection,
  onNavigate,
}: SPANavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { id: "home", label: "Home" },
    { id: "features", label: "Features" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact Us" },
  ];

  const handleNavigate = (sectionId: string) => {
    onNavigate(sectionId);
    setIsMenuOpen(false);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsMenuOpen(false);
    };

    if (isMenuOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [isMenuOpen]);

  return (
    <nav className="bg-white/70 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => handleNavigate("home")}
            className="text-xl font-semibold text-foreground hover:text-primary transition-colors"
          >
            Sushruta Health
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`nav-link ${currentSection === item.id ? "active" : ""}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
            }}
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-white/20 bg-white/80 backdrop-blur-md">
            <div className="py-2 space-y-1">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`block w-full text-left px-3 py-2 text-sm font-medium transition-colors ${
                    currentSection === item.id
                      ? "text-primary bg-accent"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
