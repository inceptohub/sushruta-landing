import { useState } from "react";
import {
  Brain,
  MessageSquare,
  Target,
  FileText,
  Shield,
  ChevronRight,
  Sparkles,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const features = [
  {
    id: "prompting",
    icon: Brain,
    title: "Intelligent Clinical Prompting",
    description:
      "From a patient's initial complaint, sushrut suggests relevant specialties, differential diagnoses, and targeted questions to ask next.",
    details: [
      "AI-powered specialty recommendations",
      "Dynamic differential diagnosis generation",
      "Context-aware follow-up questions",
      "Evidence-based clinical pathways",
    ],
    visual: {
      title: "Smart Question Suggestions",
      subtitle: "Patient: 35-year-old female with chest pain",
      items: [
        "Cardiology consultation recommended",
        "Consider: Angina, MI, Pericarditis",
        "Ask: Radiation pattern, onset timing",
        "Next: ECG, Troponins, CXR",
      ],
    },
  },
  {
    id: "rationale",
    icon: MessageSquare,
    title: "Rationale-Driven Learning & Decisions",
    description:
      "Understand the 'why.' Every suggestion, from a follow-up question to a lab investigation, comes with a clinical rationale to support your decision-making and enhance your understanding.",
    details: [
      "Detailed clinical reasoning for each recommendation",
      "Educational insights for learning opportunities",
      "Evidence-based explanations",
      "Interactive knowledge building",
    ],
    visual: {
      title: "Clinical Reasoning",
      subtitle: "Why this investigation?",
      items: [
        "📋 ECG: Rule out acute coronary syndrome",
        "🩸 Troponins: Detect myocardial damage",
        "📸 CXR: Assess for pneumothorax/PE",
        "💡 D-dimer: If PE suspected based on Wells score",
      ],
    },
  },
  {
    id: "adaptive",
    icon: Target,
    title: "Adaptive & Interactive Workflow",
    description:
      "The system dynamically adapts its suggestions based on your inputs, from patient answers to physical exam findings, ensuring a tailored and relevant workflow.",
    details: [
      "Real-time adaptation to patient responses",
      "Dynamic workflow adjustments",
      "Personalized recommendation engine",
      "Seamless integration with clinical practice",
    ],
    visual: {
      title: "Adaptive Workflow",
      subtitle: "Workflow adjusts based on findings",
      items: [
        "✅ Normal ECG → Consider other causes",
        "⚠️ ST elevation → Activate cath lab",
        "📊 Troponin elevated → Admit for monitoring",
        "🔄 Workflow automatically updates",
      ],
    },
  },
  {
    id: "summaries",
    icon: FileText,
    title: "Comprehensive Summaries",
    description:
      "At the end of a consultation or case evaluation, receive a complete compilation including differential diagnoses, suggested investigations, management advice, and even potential viva questions for exam preparation.",
    details: [
      "Automated encounter summaries",
      "Comprehensive differential diagnosis lists",
      "Management and treatment recommendations",
      "Educational viva questions for students",
    ],
    visual: {
      title: "Complete Summary",
      subtitle: "Consultation Summary Generated",
      items: [
        "📝 Chief complaint documented",
        "🔍 Top 3 differential diagnoses",
        "📋 Investigation plan outlined",
        "💊 Management recommendations",
      ],
    },
  },
  {
    id: "guidelines",
    icon: Shield,
    title: "Guideline-Based & Efficient",
    description:
      "Leverage suggestions based on established medical guidelines to ensure accuracy and best practices, all while streamlining your workflow and documentation.",
    details: [
      "Evidence-based clinical guidelines integration",
      "Updated medical protocols and standards",
      "Quality assurance and safety checks",
      "Efficient documentation workflows",
    ],
    visual: {
      title: "Evidence-Based Care",
      subtitle: "Following AHA/ESC Guidelines",
      items: [
        "📚 2023 AHA Chest Pain Guidelines",
        "✅ Risk stratification completed",
        "🎯 HEART score calculated: 4",
        "📋 Disposition: Observation unit",
      ],
    },
  },
];

export default function FeaturesSection() {
  const [activeFeature, setActiveFeature] = useState("prompting");

  const currentFeature =
    features.find((f) => f.id === activeFeature) || features[0];

  return (
    <section id="features" className="section-padding bg-white">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            An Assistant That{" "}
            <span className="gradient-text">Thinks With You</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Advanced AI capabilities designed to enhance clinical
            decision-making and accelerate medical learning through intelligent,
            contextual support.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Feature List */}
          <div className="space-y-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isActive = activeFeature === feature.id;

              return (
                <div
                  key={feature.id}
                  className={`group cursor-pointer transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-sushrut-blue-50 to-sushrut-purple-50 border-sushrut-blue-200"
                      : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                  } border rounded-2xl p-6`}
                  onClick={() => setActiveFeature(feature.id)}
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-primary text-white shadow-lg"
                          : "bg-white text-gray-600 group-hover:text-gray-900"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3
                          className={`text-lg font-semibold transition-colors duration-200 ${
                            isActive
                              ? "text-gray-900"
                              : "text-gray-700 group-hover:text-gray-900"
                          }`}
                        >
                          {feature.title}
                        </h3>
                        <ChevronRight
                          className={`w-5 h-5 transition-all duration-300 ${
                            isActive
                              ? "text-sushrut-blue-600 rotate-90"
                              : "text-gray-400 group-hover:text-gray-600"
                          }`}
                        />
                      </div>

                      <p
                        className={`text-sm leading-relaxed transition-colors duration-200 ${
                          isActive
                            ? "text-gray-600"
                            : "text-gray-500 group-hover:text-gray-600"
                        }`}
                      >
                        {feature.description}
                      </p>

                      {isActive && (
                        <div className="mt-4 space-y-2 animate-fade-in">
                          {feature.details.map((detail, idx) => (
                            <div
                              key={idx}
                              className="flex items-center space-x-2"
                            >
                              <CheckCircle className="w-4 h-4 text-sushrut-blue-600 flex-shrink-0" />
                              <span className="text-sm text-gray-600">
                                {detail}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Visual Showcase */}
          <div className="lg:sticky lg:top-8">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200 p-8 shadow-lg">
              {/* Header */}
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {currentFeature.visual.title}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {currentFeature.visual.subtitle}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-3">
                {currentFeature.visual.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-white rounded-xl border border-gray-200 shadow-sm animate-slide-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-2 h-2 bg-gradient-primary rounded-full flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>

              {/* Action */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <button className="inline-flex items-center text-sushrut-blue-600 font-medium hover:text-sushrut-blue-700 transition-colors duration-200 group">
                  See this feature in action
                  <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
