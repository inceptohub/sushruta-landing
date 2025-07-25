import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';
import { DiagnosticErrorChart } from '../components/charts/DiagnosticErrorChart';
import { ClinicianTimeChart } from '../components/charts/ClinicianTimeChart';

export const metadata: Metadata = {
  title: 'About Us | Sushruta Health',
  description: 'Learn about the mission of Sushruta Health to mitigate cognitive burden in medicine and meet the team behind our intelligent clinical co-pilot.',
};

const teamMembers = [
  {
    name: 'Praveen Kumar Saini',
    credentials: 'Cofounder & CTO',
    role: 'Owns product roadmap and AI development',
    image: '/images/team/praveen-kumar-saini.jpg',
  },
  {
    name: 'Dr. Arpit',
    credentials: 'Clinical Lead & Cofounder',
    role: 'Defines clinical workflows and use cases',
    image: '/images/team/dr-arpit.jpg',
  },
  {
    name: 'Amit Gupta',
    credentials: 'Cofounder & Tech Lead',
    role: 'Builds and scales backend architecture',
    image: '/images/team/amit-gupta.jpg',
  },
  {
    name: 'Dr. Ankit',
    credentials: 'Founding Clinical Research',
    role: 'Provides and structures clinical content',
    image: '/images/team/dr-ankit.jpg',
  },
];

const AboutPage = () => {
  return (
    <main className="container py-16 md:py-24">
      <section id="vision" className="text-center max-w-4xl mx-auto mb-20 md:mb-28">
        <h1>Augmenting Clinical Acumen.</h1>
        <p className="mt-4">
          In a nation of 1.4 billion, the cognitive burden on our clinicians is immense. Sushruta Health was founded to address this uniquely Indian challenge. We are building an intelligent co-pilot to augment—not replace—the clinician, refining diagnostic accuracy and restoring time for patient care in our high-volume environment.
        </p>
      </section>

      <section id="problem" className="max-w-4xl mx-auto mb-20 md:mb-28">
        <h2 className="text-center mb-12">The Data Behind the Decision</h2>
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-16 items-start">
          <div className="space-y-3">
            <h3>The High-Volume Environment</h3>
            <p className="rationale-text">
              With clinicians in public hospitals often seeing over 100 patients a day, the pressure is immense. This environment amplifies the risk of cognitive biases, where atypical presentations of endemic diseases like Tuberculosis can be missed. Over 80% of Indian doctors report burnout, a direct consequence of this systemic strain.
            </p>
            <div id="diagnostic-error-chart" className="mt-4">
              <DiagnosticErrorChart />
            </div>
            <p className="supporting-text">Source: Indian Medical Association (IMA), Published Studies 2024</p>
          </div>

          <div className="space-y-3">
            <h3>The Burden of Documentation</h3>
            <p className="rationale-text">
              In a high-volume Out-Patient Department (OPD), every minute counts. Even minimal time per patient on paperwork accumulates, leading to significant administrative overload. This non-clinical work reduces crucial interaction time and is a key factor that 45% of Indian doctors wish to decrease, allowing them to focus on clinical reasoning.
            </p>
            <div id="clinician-time-chart" className="mt-4">
              <ClinicianTimeChart />
            </div>
            <p className="supporting-text">Source: Journal of Family Medicine and Primary Care, 2023</p>
          </div>
        </div>
      </section>

      <section id="solution" className="max-w-4xl mx-auto mb-20 md:mb-28">
        <h2 className="text-center mb-12">An Evidence-Based Co-Pilot</h2>
        <p className="text-center mb-12">
          Sushruta Health is an augmented intelligence platform that integrates into the clinical workflow. It leverages a proprietary knowledge graph, trained on Indian epidemiological data, and large language models to provide real-time, evidence-based support.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
            <div className="output-box">
                <h4>Probabilistic Differential Diagnosis</h4>
                <p>Aids in differentiating complex presentations, such as acute febrile illnesses (Dengue vs. Malaria vs. Typhoid) or the nuances of chest pain, ensuring critical possibilities are not overlooked in a high-pressure OPD.</p>
            </div>
            <div className="output-box">
                <h4>Structured Clinical Inquiry</h4>
                <p>Guides users to ask high-yield follow-up questions to systematically rule out red-flag symptoms for conditions prevalent in India, from cardiovascular events in younger adults to neurological complications.</p>
            </div>
            <div className="output-box">
                <h4>Evidence-Based Management Plans</h4>
                <p>Generates draft management plans aligned with national guidelines (e.g., NCDC, ICMR), emphasizing critical safety instructions like NSAID avoidance in Dengue and correct antibiotic stewardship.</p>
            </div>
            <div className="output-box">
                <h4>Automated Documentation</h4>
                <p>Leverages Natural Language Processing (NLP) to structure patient encounters into draft H&P notes, specifically designed to reduce the documentation burden in high-volume Indian hospital and clinic settings.</p>
            </div>
        </div>
      </section>

      <section id="team" className="max-w-5xl mx-auto">
        <h2 className="text-center mb-12">Our Team</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {teamMembers.map((member) => (
            <div key={member.name} className="team-card-minimal text-center">
              <Image
                src={member.image}
                alt={member.name}
                width={96}
                height={96}
                className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
              />
              <h3 className="text-lg">{member.name}</h3>
              <p className="team-title">{member.credentials}</p>
              <p className="supporting-text mt-1">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
