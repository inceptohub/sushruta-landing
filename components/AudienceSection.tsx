import {
  Stethoscope,
  GraduationCap,
  ArrowRight,
  Clock,
  Users,
  BookOpen,
  Target,
} from "lucide-react";

export default function AudienceSection() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Built for Every Stage of Your Medical Journey
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Whether you're practicing medicine or learning it, sushrut Health
            adapts to support your unique needs and workflow.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* For Clinicians */}
          <div id="clinicians" className="group">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 lg:p-10 h-full hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
              {/* Header */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-sushrut-blue-500 to-sushrut-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Stethoscope className="w-8 h-8 text-white" />
                </div>
                <div>
                  <span className="text-sm font-semibold text-sushrut-blue-600 uppercase tracking-wide">
                    Case Discussion
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                    For Clinicians
                  </h3>
                </div>
              </div>

              {/* Title */}
              <h4 className="text-xl font-semibold text-gray-900 mb-4">
                Streamline Your Practice
              </h4>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed mb-8">
                Reduce administrative tasks with an intelligent assistant for
                both in-person and teleconsultations. Get real-time suggestions
                for questions, investigations, and management plans, all while
                automatically documenting the encounter.
              </p>

              {/* Features */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-sushrut-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-3 h-3 text-sushrut-blue-600" />
                  </div>
                  <span className="text-gray-700">
                    Real-time clinical decision support during consultations
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-sushrut-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Target className="w-3 h-3 text-sushrut-blue-600" />
                  </div>
                  <span className="text-gray-700">
                    Automated documentation and encounter summaries
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-sushrut-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Users className="w-3 h-3 text-sushrut-blue-600" />
                  </div>
                  <span className="text-gray-700">
                    Support for both in-person and telemedicine workflows
                  </span>
                </div>
              </div>

              {/* CTA */}
              <button className="inline-flex items-center text-sushrut-blue-600 font-semibold hover:text-sushrut-blue-700 transition-colors duration-200 group">
                Learn more about Case Discussion
                <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>
          </div>

          {/* For Students */}
          <div id="students" className="group">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 lg:p-10 h-full hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
              {/* Header */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-sushrut-purple-500 to-sushrut-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <div>
                  <span className="text-sm font-semibold text-sushrut-purple-600 uppercase tracking-wide">
                    Clinical Evaluation
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                    For Students
                  </h3>
                </div>
              </div>

              {/* Title */}
              <h4 className="text-xl font-semibold text-gray-900 mb-4">
                Master Your Clinical Skills
              </h4>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed mb-8">
                Prepare for rotations and exams with realistic case simulations.
                Move from case history to final diagnosis, understanding the
                rationale behind every question and step.
              </p>

              {/* Features */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-sushrut-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Stethoscope className="w-3 h-3 text-sushrut-purple-600" />
                  </div>
                  <span className="text-gray-700">
                    Practice history taking with guided prompts
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-sushrut-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <BookOpen className="w-3 h-3 text-sushrut-purple-600" />
                  </div>
                  <span className="text-gray-700">
                    Interactive case simulations with step-by-step guidance
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-sushrut-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Target className="w-3 h-3 text-sushrut-purple-600" />
                  </div>
                  <span className="text-gray-700">
                    Detailed explanations and clinical reasoning for every
                    decision
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-sushrut-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <GraduationCap className="w-3 h-3 text-sushrut-purple-600" />
                  </div>
                  <span className="text-gray-700">
                    Exam preparation with viva questions and practice scenarios
                  </span>
                </div>
              </div>

              {/* CTA */}
              <button className="inline-flex items-center text-sushrut-purple-600 font-semibold hover:text-sushrut-purple-700 transition-colors duration-200 group">
                Learn more about Clinical Evaluation
                <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">500+</div>
            <div className="text-gray-600">Medical Conditions</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">50+</div>
            <div className="text-gray-600">Medical Specialties</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">1000+</div>
            <div className="text-gray-600">Case Studies</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">24/7</div>
            <div className="text-gray-600">AI Support</div>
          </div>
        </div>
      </div>
    </section>
  );
}
