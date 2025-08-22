export const scenarios = {
  "homePageScenarios": [
    {
      "mode": "Clinical Evaluation",
      "prompt": "45-year-old male with sudden-onset severe epigastric pain radiating to the back",
      "response": {
        "title": "Top Differential Diagnoses",
        "items": [
          "1. Acute Pancreatitis",
          "2. Peptic Ulcer Perforation",
          "3. Myocardial Infarction (Inferior Wall)"
        ],
        "nextStep": "Assess vital signs and obtain an ECG."
      }
    },
    {
      "mode": "Clinical Evaluation",
      "prompt": "A young adult with fever and sore throat",
      "response": {
        "title": "Top Differential Diagnoses",
        "items": [
          "1. Viral Pharyngitis",
          "2. Streptococcal Pharyngitis",
          "3. Infectious Mononucleosis"
        ],
        "nextStep": "Examine for tonsillar exudates and cervical lymphadenopathy."
      }
    },
    {
      "mode": "Case Discussion",
      "prompt": "65-year-old male with persistent cough and fever for 7 days",
      "response": {
        "title": "Top Differential Diagnoses",
        "items": [
          "1. Community-Acquired Pneumonia",
          "2. Acute Bronchitis"
        ],
        "nextStep": "Chest X-ray (PA view), CBC with differential."
      }
    },
    {
      "mode": "Case Discussion",
      "prompt": "Draft a management plan for newly diagnosed Type 2 Diabetes",
      "response": {
        "title": "Draft Management Plan Outline",
        "items": [
          "1. Lifestyle Modification: Dietary counseling (reduce refined carbohydrates, increase fiber) and advise regular exercise (150 mins/week).",
          "2. Pharmacotherapy: Initiate Metformin 500mg once daily.",
          "3. Patient Education: Counsel on home blood glucose monitoring and symptoms of hypoglycemia."
        ]
      }
    }
  ],
  "featuresPageScenarios": [
    {
      "feature": "Differential Diagnosis",
      "mode": "Clinical Evaluation",
      "scenario": "A medical student is presented with a classic case of chest pain and needs to build a broad differential, considering both common and life-threatening causes.",
      "userInput": "35-year-old software engineer presents with a 2-hour history of central, crushing chest pain. He is diaphoretic and anxious. No significant past medical history.",
      "sushrutOutput": {
        "criticalAlert": "Potentially life-threatening condition. Prioritize assessment of airway, breathing, and circulation (ABCs).",
        "rankedDDx": [
          {
            "condition": "Acute Coronary Syndrome (ACS)",
            "probability": "High Probability",
            "rationale": "Classic presentation of crushing chest pain, diaphoresis."
          },
          {
            "condition": "Pulmonary Embolism (PE)",
            "probability": "Moderate Probability",
            "rationale": "Can present with acute chest pain, but typically pleuritic."
          },
          {
            "condition": "Aortic Dissection",
            "probability": "Low Probability but Critical",
            "rationale": "Must be considered in any severe chest pain, especially if radiating to the back."
          },
          {
            "condition": "Gastroesophageal Reflux Disease (GERD)",
            "probability": "Low Probability",
            "rationale": "Common cause of chest pain, but less likely given the severity and diaphoresis."
          }
        ],
        "nextSteps": "Obtain 12-lead ECG immediately. Check cardiac enzymes (Troponin). Administer MONA (Morphine, Oxygen, Nitrates, Aspirin) as per protocol."
      }
    },
    {
      "feature": "Ask a Question",
      "mode": "Case Discussion",
      "scenario": "A primary care physician is evaluating a patient with chronic headache, a common but challenging complaint.",
      "userInput": "Patient is a 42-year-old woman complaining of headaches for the past 3 months. She describes them as a 'dull ache' all over her head, occurring 3-4 times a week.",
      "sushrutOutput": {
        "suggestedQuestions": [
          {
            "question": "Is this the worst headache of your life?",
            "rationale": "Screens for subarachnoid hemorrhage."
          },
          {
            "question": "Are there any associated neurological symptoms like vision changes, weakness, or numbness?",
            "rationale": "Screens for intracranial pathology."
          },
          {
            "question": "Is the headache worse in the mornings or with coughing/straining?",
            "rationale": "Screens for raised intracranial pressure."
          },
          {
            "question": "What is your stress level like? Any changes in sleep patterns?",
            "rationale": "Explores features of tension-type headache, the most common diagnosis."
          }
        ]
      }
    },
    {
      "feature": "Draft Management Plan (DMP)",
      "mode": "Case Discussion",
      "scenario": "A doctor needs to create an initial management plan for a patient newly diagnosed with Dengue Fever during a seasonal outbreak.",
      "userInput": "Patient is a 28-year-old male with a 4-day history of high-grade fever, retro-orbital pain, and myalgia. CBC shows leukopenia and thrombocytopenia (platelets 80,000). NS1 antigen test is positive.",
      "sushrutOutput": {
        "title": "Draft Management Plan (for uncomplicated Dengue Fever)",
        "plan": [
          {
            "step": "Symptomatic Treatment",
            "details": "Prescribe Paracetamol for fever and pain. AVOID NSAIDs (like Ibuprofen, Diclofenac) due to risk of hemorrhage."
          },
          {
            "step": "Hydration",
            "details": "Advise adequate oral fluid intake (oral rehydration salts, juice, water). Monitor for warning signs of dehydration."
          },
          {
            "step": "Patient Education (Warning Signs)",
            "details": "Instruct patient to return immediately if they experience severe abdominal pain, persistent vomiting, bleeding from any site, or lethargy."
          },
          {
            "step": "Follow-up",
            "details": "Daily monitoring of platelet count and hematocrit is recommended until stable."
          }
        ]
      }
    },
    {
      "feature": "Draft H&P (History & Physical)",
      "mode": "Case Discussion",
      "scenario": "A resident doctor needs to quickly generate a structured note after an in-person consultation for a patient with a common skin infection.",
      "userInput": "Patient is a 22-year-old college student with a painful, red, swollen area on his right shin for 3 days. Denies trauma. On examination, there is a 5x7 cm erythematous, tender, non-fluctuant plaque with ill-defined borders on the anterior aspect of the right lower leg.",
      "sushrutOutput": {
        "title": "Draft H&P Note",
        "note": {
          "chiefComplaint": "Painful red rash on right leg.",
          "hpi": "The patient is a 22-year-old male who presents with a 3-day history of a painful, erythematous, and swollen lesion on his right shin. The onset was spontaneous, without any preceding trauma. He denies fever, chills, or other systemic symptoms.",
          "physicalExam": "Vitals: Afebrile, hemodynamically stable. Lower Extremity: On the anterior aspect of the right shin, there is a 5x7 cm, tender, warm, erythematous plaque with indistinct borders. No fluctuance, purulent discharge, or signs of crepus noted.",
          "assessment": "Cellulitis of the right lower extremity.",
          "plan": [
            "Prescribe a course of oral antibiotics (e.g., Cephalexin).",
            "Advise leg elevation to reduce swelling.",
            "Instruct patient to mark the borders of the erythema to monitor for spread.",
            "Follow up in 48-72 hours or sooner if symptoms worsen."
          ]
        }
      }
    }
  ]
}
