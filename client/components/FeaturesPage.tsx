export default function FeaturesPage() {
  return (
    <div className="page-section">
      <div className="container space-y-16">
        {/* Page Header */}
        <div className="text-center space-y-4">
          <h1>Features</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Real-world scenarios demonstrating how Sushruta Health enhances
            clinical decision-making for students and practicing clinicians.
          </p>
        </div>

        {/* Feature 1: Differential Diagnosis */}
        <section className="space-y-6">
          <div>
            <h2>Generate a Differential Diagnosis Instantly</h2>
            <p className="text-lg mt-2">
              Transform clinical presentations into ranked differential
              diagnoses with supporting rationale.
            </p>
          </div>

          <div className="output-box">
            <div className="scenario-label mb-4">SCENARIO (Student Mode)</div>

            <div className="input-box mb-6">
              Chief Complaint: 67-year-old male presents with acute onset severe
              abdominal pain, radiating to the back, associated with nausea and
              vomiting. Pain started 2 hours ago after a large meal. Patient
              appears diaphoretic and is in obvious distress. Vitals: BP 140/90,
              HR 110, Temp 99.2°F, RR 22 Physical: Epigastric tenderness,
              positive Murphy's sign
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">
                  Differential Diagnosis (Ranked)
                </h3>
                <div className="space-y-3">
                  <div className="border border-border rounded p-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium">1. Acute Pancreatitis</span>
                      <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded">
                        High Probability
                      </span>
                    </div>
                    <p className="rationale-text">
                      <strong>Rationale:</strong> Classic presentation of severe
                      epigastric pain radiating to back, triggered by large
                      meal, associated with nausea/vomiting. Age and symptom
                      pattern strongly suggest pancreatic etiology.
                    </p>
                  </div>

                  <div className="border border-border rounded p-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium">2. Acute Cholangitis</span>
                      <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                        Moderate Probability
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <strong>Rationale:</strong> Positive Murphy's sign
                      suggests biliary involvement. Consider Charcot's triad
                      (fever, jaundice, RUQ pain). Low-grade fever present.
                    </p>
                  </div>

                  <div className="border border-border rounded p-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium">
                        3. Peptic Ulcer Perforation
                      </span>
                      <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                        Moderate Probability
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <strong>Rationale:</strong> Acute onset severe pain could
                      indicate perforation. However, lack of peritoneal signs
                      makes this less likely.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Recommended Next Steps</h3>
                <ul className="space-y-1 text-sm list-disc list-inside">
                  <li>
                    Obtain lipase and amylase levels (diagnostic for
                    pancreatitis)
                  </li>
                  <li>CBC with differential, comprehensive metabolic panel</li>
                  <li>
                    CT abdomen with contrast to evaluate pancreas and biliary
                    tree
                  </li>
                  <li>Consider ERCP if cholangitis suspected</li>
                  <li>NPO status and IV fluid resuscitation</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Feature 2: Clinical Questions */}
        <section className="space-y-6">
          <div>
            <h2>Ask a Question</h2>
            <p className="text-lg mt-2">
              Get intelligent follow-up questions and clinical guidance based on
              patient interactions and clinical scenarios.
            </p>
          </div>

          <div className="output-box">
            <div className="scenario-label mb-4">
              SCENARIO (Clinician - OPD Mode)
            </div>

            <div className="input-box mb-6">
              Patient Transcript: "Doctor, I've been having this chest pain for
              the past week. It comes and goes, usually when I'm walking up
              stairs or exercising. Sometimes I feel short of breath too. My
              father had a heart attack when he was 60." Current Question: "What
              specific questions should I ask to better characterize this chest
              pain?"
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">
                  Suggested Follow-up Questions
                </h3>
                <div className="space-y-3">
                  <div className="border border-border rounded p-4">
                    <div className="font-medium mb-2">Pain Characteristics</div>
                    <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                      <li>
                        "Can you describe the quality of the pain? Is it sharp,
                        dull, burning, or pressure-like?"
                      </li>
                      <li>
                        "On a scale of 1-10, how severe is the pain when it
                        occurs?"
                      </li>
                      <li>"How long does each episode typically last?"</li>
                    </ul>
                  </div>

                  <div className="border border-border rounded p-4">
                    <div className="font-medium mb-2">Triggers and Timing</div>
                    <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                      <li>
                        "Does the pain occur with a specific level of exertion,
                        or is it variable?"
                      </li>
                      <li>
                        "Have you noticed if it happens more at certain times of
                        day?"
                      </li>
                      <li>"Does rest relieve the symptoms completely?"</li>
                    </ul>
                  </div>

                  <div className="border border-border rounded p-4">
                    <div className="font-medium mb-2">Associated Symptoms</div>
                    <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                      <li>
                        "Do you experience nausea, sweating, or dizziness with
                        the chest pain?"
                      </li>
                      <li>
                        "Have you noticed any swelling in your legs or ankles?"
                      </li>
                      <li>"Any palpitations or irregular heartbeats?"</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Clinical Rationale</h3>
                <p className="text-sm text-muted-foreground">
                  These questions follow a systematic approach to chest pain
                  evaluation, focusing on differentiating between cardiac
                  (likely given exertional pattern and family history),
                  pulmonary, and other etiologies. The exertional component and
                  family history raise suspicion for coronary artery disease
                  requiring careful characterization.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Feature 3: Management Plan */}
        <section className="space-y-6">
          <div>
            <h2>Draft Management Plan (DMP)</h2>
            <p className="text-lg mt-2">
              Generate evidence-based treatment plans from clinical findings and
              diagnostic results.
            </p>
          </div>

          <div className="output-box">
            <div className="scenario-label mb-4">SCENARIO (Clinician Mode)</div>

            <div className="input-box mb-6">
              Patient: 45-year-old female with newly diagnosed hypertension BP:
              165/95 (confirmed on multiple readings) Labs: Normal renal
              function, no diabetes ECG: Normal Echo: Mild LVH No target organ
              damage evident
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Management Plan</h3>
                <div className="space-y-4">
                  <div className="border border-border rounded p-4">
                    <div className="font-medium mb-2">Immediate Actions</div>
                    <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                      <li>
                        Initiate ACE inhibitor (Lisinopril 10mg daily) -
                        first-line for uncomplicated HTN
                      </li>
                      <li>
                        Lifestyle counseling: DASH diet, sodium restriction
                        (&lt;2g/day), regular exercise
                      </li>
                      <li>Weight management if BMI elevated</li>
                    </ul>
                  </div>

                  <div className="border border-border rounded p-4">
                    <div className="font-medium mb-2">Follow-up Schedule</div>
                    <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                      <li>
                        Return in 2-4 weeks to assess BP response and medication
                        tolerance
                      </li>
                      <li>Home BP monitoring recommended</li>
                      <li>Annual lipid panel, HbA1c screening</li>
                      <li>Ophthalmologic exam for baseline</li>
                    </ul>
                  </div>

                  <div className="border border-border rounded p-4">
                    <div className="font-medium mb-2">
                      Monitoring Parameters
                    </div>
                    <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                      <li>Target BP &lt;130/80 per AHA/ACC guidelines</li>
                      <li>
                        Monitor renal function (Cr, BUN) in 1-2 weeks after ACE
                        inhibitor initiation
                      </li>
                      <li>
                        Watch for ACE inhibitor side effects (dry cough,
                        angioedema)
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Evidence Base</h3>
                <p className="text-sm text-muted-foreground">
                  Recommendations based on 2017 AHA/ACC Hypertension Guidelines.
                  ACE inhibitors are first-line therapy for stage 1-2
                  hypertension without compelling indications for other agents.
                  The presence of mild LVH suggests chronic hypertension
                  requiring aggressive BP control to prevent progression.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Feature 4: H&P Documentation */}
        <section className="space-y-6">
          <div>
            <h2>Draft H&P</h2>
            <p className="text-lg mt-2">
              Automatically generate structured clinical documentation from
              consultation notes and findings.
            </p>
          </div>

          <div className="output-box">
            <div className="scenario-label mb-4">
              SCENARIO (Documentation Mode)
            </div>

            <div className="input-box mb-6">
              Consultation Notes: 28-year-old previously healthy female presents
              with 3-day history of fever, cough, and fatigue. Started with sore
              throat, progressed to productive cough with yellow sputum. No sick
              contacts. Lives with roommate who is well. Physical: Temp 101.2°F,
              normal vitals otherwise. HEENT normal. Lungs: crackles RLL. Heart
              regular. Abd benign. No rash.
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">
                  Generated History & Physical
                </h3>
                <div className="space-y-4 text-sm">
                  <div className="border border-border rounded p-4">
                    <div className="font-medium mb-2">Chief Complaint</div>
                    <p className="text-muted-foreground">
                      3-day history of fever, cough, and fatigue
                    </p>
                  </div>

                  <div className="border border-border rounded p-4">
                    <div className="font-medium mb-2">
                      History of Present Illness
                    </div>
                    <p className="text-muted-foreground">
                      28-year-old previously healthy female presents with 3-day
                      progression of upper respiratory symptoms beginning with
                      sore throat, evolving to productive cough with yellow
                      sputum and associated fever and fatigue. Denies sick
                      contacts. No recent travel or known exposures.
                    </p>
                  </div>

                  <div className="border border-border rounded p-4">
                    <div className="font-medium mb-2">Physical Examination</div>
                    <div className="text-muted-foreground space-y-1">
                      <p>
                        <strong>Vital Signs:</strong> Temperature 101.2°F, other
                        vitals within normal limits
                      </p>
                      <p>
                        <strong>HEENT:</strong> Normal examination
                      </p>
                      <p>
                        <strong>Pulmonary:</strong> Crackles present in right
                        lower lobe
                      </p>
                      <p>
                        <strong>Cardiovascular:</strong> Regular rate and rhythm
                      </p>
                      <p>
                        <strong>Abdomen:</strong> Benign examination
                      </p>
                      <p>
                        <strong>Skin:</strong> No rash noted
                      </p>
                    </div>
                  </div>

                  <div className="border border-border rounded p-4">
                    <div className="font-medium mb-2">Assessment and Plan</div>
                    <div className="text-muted-foreground">
                      <p className="mb-2">
                        <strong>Impression:</strong> Community-acquired
                        pneumonia, likely bacterial
                      </p>
                      <ul className="space-y-1 list-disc list-inside">
                        <li>Chest X-ray to confirm pneumonia</li>
                        <li>Consider CBC, procalcitonin if severe</li>
                        <li>
                          Outpatient antibiotic therapy (azithromycin or
                          amoxicillin-clavulanate)
                        </li>
                        <li>Return if worsening symptoms</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
