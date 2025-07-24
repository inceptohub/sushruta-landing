import StaticFeatureChatShowcase from "../components/StaticFeatureChatShowcase";

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
                            3. Myocardial Infarction
                          </span>
                          <span className="text-sm bg-orange-100 text-orange-800 px-2 py-1 rounded">
                            Low Probability
                          </span>
                        </div>
                        <p className="text-gray-700 text-sm">
                          <strong>Rationale:</strong> Atypical presentation,
                          but must be ruled out in patients with risk factors.
                          Epigastric pain can be an anginal equivalent.
                        </p>
                      </div>
                    </div>
                    <div className="font-semibold text-lg mb-2 mt-4">
                      Recommended Next Steps
                    </div>
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                      <li>
                        <strong>Labs:</strong> Serum amylase and lipase (expect
                        elevated), CBC, CMP, troponin.
                      </li>
                      <li>
                        <strong>Imaging:</strong> Abdominal ultrasound to assess
                        for gallstones, CT abdomen if diagnosis uncertain.
                      </li>
                      <li>
                        <strong>ECG:</strong> To rule out myocardial infarction.
                      </li>
                    </ul>
                  </>
                ),
              },
            ]}
          />
        </div>

        {/* Feature 2: Note Generation */}
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Generate H&P and SOAP Notes from Keywords
          </h2>
          <p className="text-lg text-foreground/80 mb-6">
            Efficiently create structured clinical notes from brief inputs,
            saving valuable time on documentation.
          </p>
          <StaticFeatureChatShowcase
            scenario="SCENARIO (OPD Mode)"
            messages={[
              {
                role: "user",
                content: (
                  <>
                    28F, 3d hx of fever, cough, fatigue. Sore throat initially,
                    now productive cough with yellow sputum. No sick contacts.
                    Vitals: T 101.2, otherwise WNL. P/E: RLL crackles.
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

        {/* Feature 3: Compare Treatment Options */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Compare Treatment Options
          </h2>
          <p className="text-lg text-foreground/80 mb-6">
            Evaluate and compare treatment plans based on efficacy, side effects, and patient-specific factors.
          </p>
          <StaticFeatureChatShowcase
            scenario="SCENARIO (Student Mode)"
            messages={[
              {
                role: "user",
                content: (
                  <>
                    Compare metformin vs. empagliflozin for a 62-year-old male with T2DM, HTN, and a history of heart failure (HFrEF).
                  </>
                ),
              },
              {
                role: "assistant",
                content: (
                  <>
                    <div className="font-semibold text-lg mb-2">Treatment Comparison</div>
                    <div className="space-y-3 text-sm mb-4">
                      <div className="border border-border rounded p-4 bg-gray-50">
                        <div className="font-medium mb-2">Metformin</div>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                          <li><strong>Mechanism:</strong> Decreases hepatic glucose production.</li>
                          <li><strong>Efficacy:</strong> A1c reduction ~1.5%.</li>
                          <li><strong>CV/Renal:</strong> Neutral benefit.</li>
                          <li><strong>Side Effects:</strong> GI upset, lactic acidosis (rare).</li>
                          <li><strong>Cost:</strong> Low.</li>
                        </ul>
                      </div>
                      <div className="border border-border rounded p-4 bg-gray-50">
                        <div className="font-medium mb-2">Empagliflozin (SGLT2i)</div>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                          <li><strong>Mechanism:</strong> Increases urinary glucose excretion.</li>
                          <li><strong>Efficacy:</strong> A1c reduction ~0.8-1%.</li>
                          <li><strong>CV/Renal:</strong> Proven to reduce CV death and HF hospitalizations. Slows CKD progression.</li>
                          <li><strong>Side Effects:</strong> GU infections, euglycemic DKA risk.</li>
                          <li><strong>Cost:</strong> High.</li>
                        </ul>
                      </div>
                      <div className="border border-border rounded p-4 bg-green-50">
                        <div className="font-medium mb-2">Recommendation</div>
                        <p className="text-gray-800">
                          Given the patient's history of HFrEF, <strong>Empagliflozin is strongly recommended</strong> due to its proven cardiovascular benefits, often in combination with Metformin if A1c target is not met and renal function allows.
                        </p>
                      </div>
                    </div>
                  </>
                ),
              },
            ]}
          />
        </div>

        {/* Feature 4: Simulate Patient Cases for Practice */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Simulate Patient Cases for Practice
          </h2>
          <p className="text-lg text-foreground/80 mb-6">
            Engage with interactive patient scenarios to sharpen your diagnostic and management skills in a safe environment.
          </p>
          <StaticFeatureChatShowcase
            scenario="SCENARIO (OPD Mode)"
            messages={[
              {
                role: "user",
                content: (
                  <>
                    Start a new patient simulation. I'm a resident in the ICU.
                  </>
                ),
              },
              {
                role: "assistant",
                content: (
                  <>
                    <div className="font-semibold text-lg mb-2">ICU Patient Simulation</div>
                    <div className="space-y-3 text-sm mb-4">
                      <div className="border border-border rounded p-4 bg-gray-50">
                        <div className="font-medium mb-2">Case Presentation</div>
                        <p className="text-gray-700">
                          A 58-year-old female is admitted to the ICU with septic shock of unknown origin. She was found unresponsive at home. Vitals: BP 80/40 mmHg (on norepinephrine), HR 130, Temp 102.5°F, SpO2 90% on 6L NC. Initial labs show leukocytosis (WBC 22k), lactate 4.5 mmol/L, and acute kidney injury (Cr 2.1 mg/dL).
                        </p>
                      </div>
                      <div className="border border-border rounded p-4 bg-blue-50">
                        <div className="font-medium mb-2">Your Task</div>
                        <p className="text-gray-800">
                          What are your initial diagnostic and management priorities? Please list the top 3 for each category.
                        </p>
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
