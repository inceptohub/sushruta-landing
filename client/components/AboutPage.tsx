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
              intelligence systems characterized not merely by statistical
              predictability, but also by their explicability and alignment with
              established, evidence-based medical guidelines. This unwavering
              commitment to the principles of safety, accuracy, and transparency
              constitutes the foundational tenet of all developmental
              undertakings.
            </p>

            <p>
              It is posited that through the mitigation of documentation
              workloads and the provision of instantaneous access to synthesized
              knowledge, the central focus of medical practice may be redirected
              to its appropriate locus: the patient.
            </p>
          </div>
        </section>

        {/* Team Section */}
        <section className="space-y-8">
          <h2>Principals and Advisors</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-card">
                {/* Placeholder Avatar */}
                <div className="w-24 h-24 bg-muted rounded-full mx-auto flex items-center justify-center">
                  <span className="text-2xl font-semibold text-muted-foreground">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>

                <div className="text-center">
                  <h3 className="font-semibold text-foreground">
                    {member.name}
                  </h3>
                  <p className="team-title mb-3">{member.title}</p>
                  <p className="supporting-text leading-relaxed text-left">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Values Section */}
        <section className="space-y-8">
          <h2>Core Principles</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3>Evidence-Based Intelligence</h3>
              <p className="text-muted-foreground">
                Every recommendation and suggestion is grounded in peer-reviewed
                medical literature, established clinical guidelines, and
                evidence-based best practices. Our AI models are trained on
                curated datasets that prioritize accuracy and clinical
                relevance.
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
