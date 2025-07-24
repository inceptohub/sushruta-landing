import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const roles = [
    "Attending Physician",
    "Resident",
    "Medical Student",
    "Nurse Practitioner",
    "Physician Assistant",
    "Healthcare Administrator",
    "Medical Educator",
    "Researcher",
    "Other",
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ fullName: "", email: "", role: "", message: "" });
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="page-section flex items-center justify-center">
        <div className="container max-w-2xl text-center space-y-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl">Message Sent Successfully</h1>
          <p className="text-lg text-muted-foreground">
            Thank you for your message. Our team will review your inquiry and
            respond within 24-48 hours.
          </p>
          <button onClick={() => setIsSubmitted(false)} className="btn-primary">
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-section">
      <div className="container max-w-2xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1>Contact Us</h1>
          <p className="text-lg text-muted-foreground">
            We'd love to hear from you. Whether you're interested in learning
            more about Sushruta Health, have questions about our platform, or
            want to discuss partnership opportunities, please don't hesitate to
            reach out.
          </p>
        </div>

        {/* Contact Information */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <h3>Get in Touch</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <span className="w-5 h-5 text-primary">📧</span>
                <span>hello@sushrutahealth.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="w-5 h-5 text-primary">📞</span>
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="w-5 h-5 text-primary">📍</span>
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3>Response Time</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• General inquiries: 24-48 hours</p>
              <p>• Partnership requests: 3-5 business days</p>
              <p>• Technical support: Same business day</p>
              <p>• Media inquiries: 24 hours</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="output-box space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-foreground"
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="form-input"
                placeholder="Dr. Jane Smith"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="jane.smith@hospital.org"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-foreground"
            >
              Role <span className="text-red-500">*</span>
            </label>
            <select
              id="role"
              name="role"
              required
              value={formData.role}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Select your role</option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-foreground"
            >
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              value={formData.message}
              onChange={handleChange}
              className="form-textarea"
              placeholder="Please describe your inquiry, questions about our platform, or how we might work together..."
            />
          </div>

          <div className="space-y-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full py-3 text-base disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                  <span>Sending Message...</span>
                </div>
              ) : (
                "Submit"
              )}
            </button>

            <p className="text-xs text-muted-foreground text-center">
              By submitting this form, you agree to our privacy policy and terms
              of service. We will only use your information to respond to your
              inquiry.
            </p>
          </div>
        </form>

        {/* Additional Information */}
        <div className="output-box mt-12">
          <h3 className="font-semibold mb-4">Frequently Asked Questions</h3>
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-medium mb-1">How do I request a demo?</p>
              <p className="text-muted-foreground">
                Simply mention "demo request" in your message above, and we'll
                schedule a personalized demonstration of Sushruta Health
                tailored to your specific needs.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">
                Is there a free trial available?
              </p>
              <p className="text-muted-foreground">
                Yes, we offer a 14-day free trial for qualified healthcare
                professionals and medical institutions. Contact us to learn more
                about eligibility.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">
                Do you offer training and support?
              </p>
              <p className="text-muted-foreground">
                Absolutely. We provide comprehensive onboarding, training
                sessions, and ongoing technical support to ensure successful
                implementation and adoption.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
