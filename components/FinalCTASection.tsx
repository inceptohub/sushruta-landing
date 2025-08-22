import { ArrowRight, Star, Users, Award, CheckCircle } from "lucide-react";

export default function FinalCTASection() {
  return (
    <section className="section-padding bg-gradient-hero relative overflow-hidden">
      {/* Background Pattern */}
      <div
        className={
          'absolute inset-0 bg-[url(\'data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ffffff" fill-opacity="0.03"%3E%3Ccircle cx="20" cy="20" r="1"/%3E%3C/g%3E%3C/svg%3E\')] opacity-50'
        }
      ></div>

      <div className="relative z-10 container-max">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to transform your clinical workflow and learning?
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 leading-relaxed max-w-3xl mx-auto">
              Join the next generation of medical professionals using
              intelligent tools to deliver better care and build deeper
              knowledge.
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-2">10,000+</div>
              <div className="text-blue-200">Medical Professionals</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-2">4.9/5</div>
              <div className="text-blue-200">User Rating</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-2">FDA</div>
              <div className="text-blue-200">Compliant</div>
            </div>
          </div>

          {/* Benefits List */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 mb-12">
            <h3 className="text-xl font-semibold text-white mb-6">
              What you get with sushrut Health:
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-blue-300 flex-shrink-0" />
                <span className="text-blue-100">
                  Instant AI-powered clinical guidance
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-blue-300 flex-shrink-0" />
                <span className="text-blue-100">
                  Evidence-based decision support
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-blue-300 flex-shrink-0" />
                <span className="text-blue-100">
                  Automated documentation & summaries
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-blue-300 flex-shrink-0" />
                <span className="text-blue-100">
                  Interactive learning scenarios
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-blue-300 flex-shrink-0" />
                <span className="text-blue-100">
                  24/7 availability & support
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-blue-300 flex-shrink-0" />
                <span className="text-blue-100">HIPAA compliant & secure</span>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <button className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-sushruta-purple-700 bg-white rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto">
              Request a Demo
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <button className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white border-2 border-white/30 rounded-xl hover:bg-white/10 transition-all duration-300 w-full sm:w-auto">
              Start Free Trial
            </button>
          </div>

          {/* Subtext */}
          <div className="text-blue-200 text-sm space-y-2">
            <p>✓ No credit card required for trial</p>
            <p>✓ Full feature access for 14 days</p>
            <p>✓ Setup support included</p>
          </div>

          {/* Testimonial */}
          <div className="mt-16 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-w-3xl mx-auto">
            <div className="flex items-center justify-center space-x-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-yellow-400 fill-current"
                />
              ))}
            </div>
            <blockquote className="text-lg text-blue-100 italic mb-4">
              "sushrut Health has revolutionized how I practice medicine. The
              AI-powered insights help me make better diagnoses faster, and my
              students love the interactive learning scenarios."
            </blockquote>
            <div className="text-blue-200">
              <div className="font-semibold">Dr. Sarah Johnson, MD</div>
              <div className="text-sm">Internal Medicine, Johns Hopkins</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-16 fill-white"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" />
        </svg>
      </div>
    </section>
  );
}
