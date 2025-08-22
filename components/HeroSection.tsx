import {
  ArrowRight,
  Stethoscope,
  Brain,
  BookOpen,
  FileText,
} from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-hero overflow-hidden">
      {/* Background Pattern */}
      <div
        className={
          'absolute inset-0 bg-[url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')] opacity-30'
        }
      ></div>

      <div className="relative z-10 container-max section-padding pt-24 lg:pt-32">
        <div className="text-center space-y-8 max-w-5xl mx-auto">
          {/* Main Headline */}
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Sushrut Health: Empowering Medical Professionals and Students
              with{" "}
              <span className="text-blue-200">
                Intelligent Clinical Support
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-blue-100 leading-relaxed max-w-4xl mx-auto">
              Your intelligent co-pilot for accurate, efficient clinical
              decision-making. From differential diagnosis and investigations to
              management and documentation.
            </p>
          </div>

          {/* CTA Button */}
          <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <button className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-sushruta-purple-700 bg-white rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
              Request a Demo
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>

          {/* Product Showcase */}
          <div
            className="mt-16 animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="relative max-w-4xl mx-auto">
              {/* Main Interface Mockup */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    How can I help you today?
                  </h3>
                </div>

                {/* Mode Toggles */}
                <div className="flex space-x-4 mb-8">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white hover:bg-white/30 transition-all duration-200">
                    <Stethoscope className="w-4 h-4" />
                    <span>Case Discussion</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-blue-200 hover:bg-white/20 transition-all duration-200">
                    <BookOpen className="w-4 h-4" />
                    <span>Clinical Evaluation</span>
                  </button>
                </div>

                {/* Quick Actions Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <button className="flex flex-col items-center justify-center p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all duration-200 group">
                    <div className="w-8 h-8 bg-blue-400/30 rounded-lg flex items-center justify-center mb-2 group-hover:bg-blue-400/40 transition-colors">
                      <Stethoscope className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium">Start Case Discussion</span>
                  </button>

                  <button className="flex flex-col items-center justify-center p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all duration-200 group">
                    <div className="w-8 h-8 bg-purple-400/30 rounded-lg flex items-center justify-center mb-2 group-hover:bg-purple-400/40 transition-colors">
                      <Brain className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium">Differential Dx</span>
                  </button>

                  <button className="flex flex-col items-center justify-center p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all duration-200 group">
                    <div className="w-8 h-8 bg-green-400/30 rounded-lg flex items-center justify-center mb-2 group-hover:bg-green-400/40 transition-colors">
                      <FileText className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium">Case Study</span>
                  </button>

                  <button className="flex flex-col items-center justify-center p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all duration-200 group">
                    <div className="w-8 h-8 bg-orange-400/30 rounded-lg flex items-center justify-center mb-2 group-hover:bg-orange-400/40 transition-colors">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium">Learning</span>
                  </button>
                </div>

                {/* Sample Features */}
                <div className="mt-8 space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-white/5 border border-white/10 rounded-lg">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-blue-100 text-sm">
                      Sync EMR Summary
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-white/5 border border-white/10 rounded-lg">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-blue-100 text-sm">
                      Start Case Discussion
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-white/5 border border-white/10 rounded-lg">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-blue-100 text-sm">
                      Draft Patient History
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center animate-pulse">
                <Brain className="w-8 h-8 text-white" />
              </div>

              <div
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-400/20 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center animate-pulse"
                style={{ animationDelay: "1s" }}
              >
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-24 fill-white"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" />
        </svg>
      </div>
    </section>
  );
}
