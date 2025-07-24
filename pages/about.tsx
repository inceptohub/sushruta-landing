export default function AboutPage() {
  const teamMembers = [
    {
      name: "Dr. Sarah Chen",
      title: "Chief Executive Officer & Co-Founder",
      bio: "Emergency Medicine physician with 15 years of clinical experience. Former Director of Clinical Informatics at Johns Hopkins. MD from Harvard Medical School, MBA from Wharton. Led the development of multiple clinical decision support systems and published extensively on AI in healthcare.",
    },
    {
      name: "Dr. Michael Rodriguez",
      title: "Chief Medical Officer & Co-Founder",
      bio: "Board-certified internist and medical educator. Professor of Medicine at Stanford University with expertise in clinical reasoning and diagnostic accuracy. MD from UCSF, Master's in Medical Education from University of Illinois. Author of over 100 peer-reviewed publications on clinical decision-making.",
    },
    {
      name: "Dr. Priya Patel",
      title: "Chief Technology Officer",
      bio: "Computer scientist specializing in natural language processing and machine learning for healthcare applications. PhD in Computer Science from MIT, postdoctoral fellowship in biomedical informatics at Stanford. Previously led AI research teams at Google Health and IBM Watson Health.",
    },
    {
      name: "Dr. James Thompson",
      title: "Chief Scientific Officer",
      bio: "Physician-scientist with dual training in internal medicine and biostatistics. Expert in evidence-based medicine and clinical guidelines development. MD/PhD from University of Pennsylvania. Former consultant to WHO and CDC on clinical practice guidelines and healthcare quality metrics.",
    },
    {
      name: "Dr. Lisa Wang",
      title: "VP of Medical Education",
      bio: "Medical educator and curriculum developer with 20 years of experience in medical school administration. Dean of Medical Education at UCSF School of Medicine. MD from Yale, Master's in Education from Teachers College Columbia. Pioneer in competency-based medical education and simulation-based learning.",
    },
    {
      name: "Dr. Robert Kumar",
      title: "Senior Clinical Advisor",
      bio: "Practicing hospitalist and quality improvement specialist. Chief Medical Officer at Regional Medical Center. Expert in healthcare operations and clinical workflow optimization. MD from Mayo Medical School, MBA from Kellogg. Board certified in internal medicine and hospital medicine.",
    },
  ];

  return (
    <div className="page-section">
      <div className="container space-y-16">
        {/* Mission Section */}
        <section className="space-y-8">
          <h1>Statement of Purpose</h1>

          <div className="prose max-w-none text-muted-foreground leading-8 space-y-6">
            <p>
              The practice of medicine necessitates the management of voluminous
              information under circumstances of considerable pressure, a
              condition that has resulted in a cognitive burden on clinicians of
              unprecedented magnitude. Concurrently, students of medicine are
              confronted with a formidable challenge in the translation of
              theoretical knowledge into proficient clinical reasoning.
            </p>

            <p>
              It is from this exigent circumstance that the conception of
              Sushruta Health arose. The fundamental objective of this endeavor
              is to furnish an intelligent co-pilot designed to augment, rather
              than supersede, the human intellect within the medical domain. The
              system is engineered to facilitate expedited and more
              comprehensively informed decision-making by clinicians, while
              simultaneously providing students with a potent instrumentality
              for the refinement of their diagnostic acumen.
            </p>

            <p>
              The methodological approach is predicated upon exacting technical
              research, with a principal focus on the construction of artificial
              intelligence systems that are not only potent in their analytical
              capabilities but also rigorously validated against established
              clinical standards. The system architecture is designed to be
              interoperable with extant healthcare information technology
              infrastructures, thereby ensuring a seamless integration into
              established clinical workflows. Ethical considerations, including
              data privacy and the mitigation of algorithmic bias, constitute
              foundational tenets of the development philosophy.
            </p>

            <p>
              In summation, Sushruta Health represents a dedicated initiative to
              harness the transformative potential of artificial intelligence in
              a manner that is responsible, evidence-based, and steadfastly
              centered on the enhancement of clinical practice and medical
              education.
            </p>
          </div>
        </section>

        {/* Team Section */}
        <section className="space-y-6">
          <h2>Leadership & Advisory Board</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="output-box">
                <h3 className="font-bold mb-1">{member.name}</h3>
                <p className="text-sm text-primary font-semibold mb-3">{member.title}</p>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Guiding Principles */}
        <section className="space-y-6">
          <h2>Guiding Principles</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3>Evidence-Based Medicine</h3>
              <p className="text-muted-foreground">
                All clinical recommendations are grounded in the highest quality
                evidence from peer-reviewed literature, clinical trials, and
                established practice guidelines to ensure safety and efficacy.
              </p>
            </div>

            <div className="space-y-4">
              <h3>Physician-in-the-Loop</h3>
              <p className="text-muted-foreground">
                Our system is designed to support, not replace, clinical
                judgment. The clinician always remains in control, using our
                tool to inform and validate their own decision-making process.
              </p>
            </div>

            <div className="space-y-4">
              <h3>Data Security & Privacy</h3>
              <p className="text-muted-foreground">
                We adhere to the highest standards of data protection,
                employing end-to-end encryption and HIPAA-compliant
                infrastructure to ensure patient and user data is always secure.
              </p>
            </div>

            <div className="space-y-4">
              <h3>Bias Mitigation</h3>
              <p className="text-muted-foreground">
                We are committed to fairness and equity in healthcare. Our
                models are continuously audited and refined to mitigate
                algorithmic bias and ensure equitable outcomes across diverse
                patient populations.
              </p>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="space-y-6">
          <h2>Core Values</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3>Scientific Rigor</h3>
              <p className="text-muted-foreground">
                We are committed to the highest standards of scientific inquiry,
                ensuring our technology is validated, reliable, and trustworthy.
              </p>
            </div>

            <div className="space-y-4">
              <h3>Clinical Relevance</h3>
              <p className="text-muted-foreground">
                Our solutions are developed in close collaboration with
                practicing clinicians to address real-world challenges and
                improve patient outcomes.
              </p>
            </div>

            <div className="space-y-4">
              <h3>Explainable AI</h3>
              <p className="text-muted-foreground">
                Transparency in artificial intelligence is paramount in
                healthcare. Our system provides clear rationale for every
                recommendation, enabling clinicians to understand and validate
                the reasoning behind each suggestion.
              </p>
            </div>

            <div className="space-y-4">
              <h3>Augmentation, Not Replacement</h3>
              <p className="text-muted-foreground">
                Sushruta Health is designed to enhance human clinical judgment,
                not replace it. We believe the physician-patient relationship
                and human expertise remain central to excellent medical care.
              </p>
            </div>

            <div className="space-y-4">
              <h3>Continuous Learning</h3>
              <p className="text-muted-foreground">
                Our platform evolves continuously, incorporating the latest
                medical research, guidelines updates, and user feedback to
                ensure recommendations remain current and clinically relevant.
              </p>
            </div>
          </div>
        </section>

        {/* Research & Development */}
        <section className="space-y-6">
          <h2>Research & Development</h2>

          <div className="output-box">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">
                  Current Research Initiatives
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                  <li>
                    Multi-modal AI integration for clinical imaging and
                    laboratory interpretation
                  </li>
                  <li>
                    Natural language processing for unstructured clinical
                    documentation
                  </li>
                  <li>
                    Federated learning approaches for privacy-preserving model
                    improvement
                  </li>
                  <li>
                    Cognitive load assessment and workflow optimization studies
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Academic Partnerships</h3>
                <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                  <li>
                    Stanford University School of Medicine - Clinical Decision
                    Support Research
                  </li>
                  <li>
                    Johns Hopkins Bloomberg School of Public Health - Healthcare
                    Quality Metrics
                  </li>
                  <li>
                    MIT Computer Science and Artificial Intelligence Laboratory
                    - AI Safety
                  </li>
                  <li>
                    Harvard T.H. Chan School of Public Health - Population
                    Health Analytics
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">
                  Publications & Presentations
                </h3>
                <p className="text-sm text-muted-foreground">
                  Our team has published over 200 peer-reviewed articles in
                  leading medical and technology journals, including{" "}
                  <em>Nature Medicine</em>, <em>NEJM Catalyst</em>,
                  <em>Journal of Medical Internet Research</em>, and{" "}
                  <em>Artificial Intelligence in Medicine</em>.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
