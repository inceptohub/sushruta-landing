import {
  Upload,
  MessageCircle,
  BarChart3,
  ArrowRight,
  Play,
  CheckCircle,
} from "lucide-react";

const steps = [
  {
    id: 1,
    icon: Upload,
    title: "Input Case",
    description:
      "Enter a patient's case history or let Sushruta listen during a teleconsultation.",
    details: [
      "Type or dictate patient symptoms",
      "Upload medical records or images",
      "Real-time voice recognition",
      "Integration with EMR systems",
    ],
    visual: {
      title: "Case Input",
      content: "Patient presents with chest pain radiating to left arm...",
      type: "input",
    },
  },
  {
    id: 2,
    icon: MessageCircle,
    title: "Interact & Refine",
    description:
      "Use Sushruta's guided questions and suggestions to inquire further and input findings.",
    details: [
      "AI-suggested follow-up questions",
      "Dynamic examination prompts",
      "Interactive differential diagnosis",
      "Real-time clinical guidance",
    ],
    visual: {
      title: "Guided Questions",
      content:
        "Suggested next questions:\n• When did the pain start?\n• Any associated symptoms?",
      type: "interaction",
    },
  },
  {
    id: 3,
    icon: BarChart3,
    title: "Get Insights",
    description:
      "Receive a comprehensive summary with diagnoses, management plans, and learning points.",
    details: [
      "Complete diagnostic summary",
      "Evidence-based treatment plans",
      "Educational insights and rationale",
      "Exam preparation materials",
    ],
    visual: {
      title: "Clinical Summary",
      content: "Primary Dx: Acute MI\nManagement: ASA, Heparin, Cath Lab",
      type: "summary",
    },
  },
];

export default function HowItWorksSection() {
  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Get from Symptom to Solution in{" "}
            <span className="gradient-text">3 Steps</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our streamlined workflow guides you through the entire clinical
            process, from initial assessment to final diagnosis and treatment
            planning.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 1;

            return (
              <div
                key={step.id}
                className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                  isEven ? "lg:grid-flow-col-dense" : ""
                }`}
              >
                {/* Content */}
                <div className={isEven ? "lg:col-start-2" : ""}>
                  <div className="space-y-6">
                    {/* Step Number & Icon */}
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-lg">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-sushruta-blue-600 uppercase tracking-wide">
                          Step {step.id}
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                          {step.title}
                        </h3>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Details */}
                    <div className="space-y-3">
                      {step.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-sushruta-blue-600 flex-shrink-0" />
                          <span className="text-gray-700">{detail}</span>
                        </div>
                      ))}
                    </div>

                    {/* Action */}
                    <button className="inline-flex items-center text-sushruta-blue-600 font-semibold hover:text-sushruta-blue-700 transition-colors duration-200 group">
                      Try Step {step.id}
                      <Play className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" />
                    </button>
                  </div>
                </div>

                {/* Visual */}
                <div className={isEven ? "lg:col-start-1" : ""}>
                  <div className="relative">
                    {/* Main Card */}
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 relative overflow-hidden">
                      {/* Background Pattern */}
                      <div className="absolute inset-0 bg-gradient-to-br from-sushruta-blue-50/50 to-sushruta-purple-50/50"></div>

                      {/* Content */}
                      <div className="relative z-10">
                        <div className="flex items-center space-x-3 mb-6">
                          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <h4 className="font-semibold text-gray-900">
                            {step.visual.title}
                          </h4>
                        </div>

                        {/* Visual Content */}
                        <div className="space-y-4">
                          {step.visual.type === "input" && (
                            <div className="space-y-3">
                              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                <div className="text-sm text-gray-500 mb-2">
                                  Chief Complaint:
                                </div>
                                <div className="text-gray-900">
                                  {step.visual.content}
                                </div>
                              </div>
                              <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <span>AI processing input...</span>
                              </div>
                            </div>
                          )}

                          {step.visual.type === "interaction" && (
                            <div className="space-y-3">
                              <div className="bg-sushruta-blue-50 rounded-lg p-4 border border-sushruta-blue-200">
                                <div className="text-sm text-sushruta-blue-600 mb-2">
                                  AI Assistant:
                                </div>
                                <div className="text-gray-900 whitespace-pre-line">
                                  {step.visual.content}
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <button className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                                  Sudden onset
                                </button>
                                <button className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                                  Gradual onset
                                </button>
                              </div>
                            </div>
                          )}

                          {step.visual.type === "summary" && (
                            <div className="space-y-3">
                              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                                <div className="text-sm text-green-600 mb-2">
                                  Clinical Summary:
                                </div>
                                <div className="text-gray-900 whitespace-pre-line">
                                  {step.visual.content}
                                </div>
                              </div>
                              <div className="flex items-center space-x-2 text-sm text-green-600">
                                <CheckCircle className="w-4 h-4" />
                                <span>Summary generated successfully</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Step Number Badge */}
                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-lg">
                        {step.id}
                      </span>
                    </div>

                    {/* Connection Arrow */}
                    {index < steps.length - 1 && (
                      <div className="hidden lg:block absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                        <ArrowRight className="w-6 h-6 text-sushruta-blue-400 rotate-90" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to experience the complete workflow?
            </h3>
            <p className="text-gray-600 mb-6">
              See how Sushruta Health can transform your clinical practice with
              intelligent, step-by-step guidance.
            </p>
            <button className="btn-primary">
              Start Free Trial
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
