import StaticFeatureChatShowcase from "./StaticFeatureChatShowcase";

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

        {/* Feature 1: Differential Diagnosis (Chat Showcase) */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Generate a Differential Diagnosis Instantly
          </h2>
          <p className="text-lg text-foreground/80 mb-6">
            Transform clinical presentations into ranked differential diagnoses
            with supporting rationale.
          </p>
          <StaticFeatureChatShowcase
            scenario="SCENARIO (Student Mode)"
            messages={[
              {
                role: "user",
                content: (
                  <>
                    Chief Complaint: 67-year-old male presents with acute onset
                    severe abdominal pain, radiating to the back, associated
                    with nausea and vomiting. Pain started 2 hours ago after a
                    large meal. Patient appears diaphoretic and is in obvious
                    distress. Vitals: BP 140/90, HR 110, Temp 99.2°F, RR 22
                    Physical: Epigastric tenderness, positive Murphy's sign
                  </>
                ),
              },
              {
                role: "assistant",
                content: (
                  <>
                    <div className="font-semibold text-lg mb-2">
                      Differential Diagnosis (Ranked)
                    </div>
                    <div className="space-y-3 mb-4">
                      <div className="border border-border rounded p-4 bg-gray-50">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-medium">
                            1. Acute Pancreatitis
                          </span>
                          <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded">
                            High Probability
                          </span>
                        </div>
                        <p className="text-gray-700 text-sm">
                          <strong>Rationale:</strong> Classic presentation of
                          severe epigastric pain radiating to back, triggered by
                          large meal, associated with nausea/vomiting. Age and
                          symptom pattern strongly suggest pancreatic etiology.
                        </p>
                      </div>
                      <div className="border border-border rounded p-4 bg-gray-50">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-medium">
                            2. Acute Cholangitis
                          </span>
                          <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                            Moderate Probability
                          </span>
                        </div>
                        <p className="text-gray-700 text-sm">
                          <strong>Rationale:</strong> Positive Murphy's sign
                          suggests biliary involvement. Consider Charcot's triad
                          (fever, jaundice, RUQ pain). Low-grade fever present.
                        </p>
                      </div>
                      <div className="border border-border rounded p-4 bg-gray-50">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-medium">
                            3. Peptic Ulcer Perforation
                          </span>
                          <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                            Moderate Probability
                          </span>
                        </div>
                        <p className="text-gray-700 text-sm">
                          <strong>Rationale:</strong> Acute onset severe pain
                          could indicate perforation. However, lack of
                          peritoneal signs makes this less likely.
                        </p>
                      </div>
                    </div>
                    <div className="font-semibold mb-2">
                      Recommended Next Steps
                    </div>
                    <ul className="space-y-1 text-sm list-disc list-inside">
                      <li>
                        Obtain lipase and amylase levels (diagnostic for
                        pancreatitis)
                      </li>
                      <li>
                        CBC with differential, comprehensive metabolic panel
                      </li>
                      <li>
                        CT abdomen with contrast to evaluate pancreas and
                        biliary tree
                      </li>
                      <li>Consider ERCP if cholangitis suspected</li>
                      <li>NPO status and IV fluid resuscitation</li>
                    </ul>
                  </>
                ),
              },
            ]}
          />
        </div>

        {/* Feature 2: Clinical Questions */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Ask a Question
          </h2>
          <p className="text-lg text-foreground/80 mb-6">
            Get intelligent follow-up questions and clinical guidance based on
            patient interactions and clinical scenarios.
          </p>
          <StaticFeatureChatShowcase
            scenario="SCENARIO (Student Mode)"
            messages={[
              {
                role: "user",
                content: (
                  <>
                    Chief Complaint: 45-year-old male presents with 2-day
                    history of chest pain, described as pressure-like, radiating
                    to left arm, associated with shortness of breath and
                    diaphoresis. Pain occurs with exertion and is relieved with
                    rest. Past Medical History: Hypertension, hyperlipidemia.
                    Family History: Father had myocardial infarction at age 55.
                    Social History: Smoker, 1 pack per day for 20 years.
                  </>
                ),
              },
              {
                role: "assistant",
                content: (
                  <>
                    <div className="font-semibold text-lg mb-2">
                      Follow-up Questions
                    </div>
                    <div className="space-y-3 mb-4">
                      <div className="border border-border rounded p-4 bg-gray-50">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-medium">
                            1. Can you describe the characteristics of the chest
                            pain?
                          </span>
                        </div>
                        <p className="text-gray-700 text-sm">
                          <strong>Rationale:</strong> Understanding the nature
                          of the chest pain will help differentiate between
                          cardiac and non-cardiac causes.
                        </p>
                      </div>
                      <div className="border border-border rounded p-4 bg-gray-50">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-medium">
                            2. Have you experienced any similar episodes in the
                            past?
                          </span>
                        </div>
                        <p className="text-gray-700 text-sm">
                          <strong>Rationale:</strong> Identifying any previous
                          episodes of chest pain will help determine if this is
                          an acute or chronic condition.
                        </p>
                      </div>
                      <div className="border border-border rounded p-4 bg-gray-50">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-medium">
                            3. Are you experiencing any other symptoms such as
                            nausea, vomiting, or dizziness?
                          </span>
                        </div>
                        <p className="text-gray-700 text-sm">
                          <strong>Rationale:</strong> Assessing for other
                          symptoms will help determine the severity of the
                          condition and potential complications.
                        </p>
                      </div>
                    </div>
                    <div className="font-semibold mb-2">Clinical Rationale</div>
                    <p className="text-sm text-muted-foreground">
                      These questions follow a systematic approach to chest pain
                      evaluation, focusing on differentiating between cardiac
                      (likely given exertional pattern and family history),
                      pulmonary, and other etiologies. The exertional component
                      and family history raise suspicion for coronary artery
                      disease requiring careful characterization.
                    </p>
                  </>
                ),
              },
            ]}
          />
        </div>

        {/* Feature 3: Management Plan (Chat Showcase) */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Draft Management Plan (DMP)
          </h2>
          <p className="text-lg text-foreground/80 mb-6">
            Generate evidence-based treatment plans from clinical findings and
            diagnostic results.
          </p>
          <StaticFeatureChatShowcase
            scenario="SCENARIO (Clinician Mode)"
            messages={[
              {
                role: "user",
                content: (
                  <>
                    Patient: 45-year-old female with newly diagnosed
                    hypertension BP: 165/95 (confirmed on multiple readings)
                    Labs: Normal renal function, no diabetes ECG: Normal Echo:
                    Mild LVH No target organ damage evident
                  </>
                ),
              },
              {
                role: "assistant",
                content: (
                  <>
                    <div className="font-semibold text-lg mb-2">
                      Management Plan
                    </div>
                    <div className="space-y-4 mb-4">
                      <div className="border border-border rounded p-4 bg-gray-50">
                        <div className="font-medium mb-2">
                          Immediate Actions
                        </div>
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
                      <div className="border border-border rounded p-4 bg-gray-50">
                        <div className="font-medium mb-2">
                          Follow-up Schedule
                        </div>
                        <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                          <li>
                            Return in 2-4 weeks to assess BP response and
                            medication tolerance
                          </li>
                          <li>Home BP monitoring recommended</li>
                          <li>Annual lipid panel, HbA1c screening</li>
                          <li>Ophthalmologic exam for baseline</li>
                        </ul>
                      </div>
                      <div className="border border-border rounded p-4 bg-gray-50">
                        <div className="font-medium mb-2">
                          Monitoring Parameters
                        </div>
                        <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                          <li>Target BP &lt;130/80 per AHA/ACC guidelines</li>
                          <li>
                            Monitor renal function (Cr, BUN) in 1-2 weeks after
                            ACE inhibitor initiation
                          </li>
                          <li>
                            Watch for ACE inhibitor side effects (dry cough,
                            angioedema)
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="font-semibold mb-2">Evidence Base</div>
                    <p className="text-sm text-muted-foreground">
                      Recommendations based on 2017 AHA/ACC Hypertension
                      Guidelines. ACE inhibitors are first-line therapy for
                      stage 1-2 hypertension without compelling indications for
                      other agents. The presence of mild LVH suggests chronic
                      hypertension requiring aggressive BP control to prevent
                      progression.
                    </p>
                  </>
                ),
              },
            ]}
          />
        </div>

        {/* Feature 4: H&P Documentation (Chat Showcase) */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Draft H&amp;P
          </h2>
          <p className="text-lg text-foreground/80 mb-6">
            Automatically generate structured clinical documentation from
            consultation notes and findings.
          </p>
          <StaticFeatureChatShowcase
            scenario="SCENARIO (Documentation Mode)"
            messages={[
              {
                role: "user",
                content: (
                  <>
                    Consultation Notes: 28-year-old previously healthy female
                    presents with 3-day history of fever, cough, and fatigue.
                    Started with sore throat, progressed to productive cough
                    with yellow sputum. No sick contacts. Lives with roommate
                    who is well. Physical: Temp 101.2°F, normal vitals
                    otherwise. HEENT normal. Lungs: crackles RLL. Heart regular.
                    Abd benign. No rash.
                  </>
                ),
              },
              {
                role: "assistant",
                content: (
                  <>
                    <div className="font-semibold text-lg mb-2">
                      Generated History &amp; Physical
                    </div>
                    <div className="space-y-4 text-sm mb-4">
                      <div className="border border-border rounded p-4 bg-gray-50">
                        <div className="font-medium mb-2">Chief Complaint</div>
                        <p className="text-muted-foreground">
                          3-day history of fever, cough, and fatigue
                        </p>
                      </div>
                      <div className="border border-border rounded p-4 bg-gray-50">
                        <div className="font-medium mb-2">
                          History of Present Illness
                        </div>
                        <p className="text-muted-foreground">
                          28-year-old previously healthy female presents with
                          3-day progression of upper respiratory symptoms
                          beginning with sore throat, evolving to productive
                          cough with yellow sputum and associated fever and
                          fatigue. Denies sick contacts. No recent travel or
                          known exposures.
                        </p>
                      </div>
                      <div className="border border-border rounded p-4 bg-gray-50">
                        <div className="font-medium mb-2">
                          Physical Examination
                        </div>
                        <div className="text-muted-foreground space-y-1">
                          <p>
                            <strong>Vital Signs:</strong> Temperature 101.2°F,
                            other vitals within normal limits
                          </p>
                          <p>
                            <strong>HEENT:</strong> Normal examination
                          </p>
                          <p>
                            <strong>Pulmonary:</strong> Crackles present in
                            right lower lobe
                          </p>
                          <p>
                            <strong>Cardiovascular:</strong> Regular rate and
                            rhythm
                          </p>
                          <p>
                            <strong>Abdomen:</strong> Benign examination
                          </p>
                          <p>
                            <strong>Skin:</strong> No rash noted
                          </p>
                        </div>
                      </div>
                      <div className="border border-border rounded p-4 bg-gray-50">
                        <div className="font-medium mb-2">
                          Assessment and Plan
                        </div>
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
                  </>
                ),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
