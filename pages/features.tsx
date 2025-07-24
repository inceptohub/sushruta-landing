import StaticFeatureChatShowcase from "../components/StaticFeatureChatShowcase";
import { scenarios } from "../lib/scenarios";

const renderSushrutaOutput = (feature: string, output: any) => {
  switch (feature) {
    case "Differential Diagnosis":
      return (
        <>
          {output.criticalAlert && <div className="font-semibold text-lg mb-2 text-red-600">{output.criticalAlert}</div>}
          <div className="font-semibold text-lg mt-4 mb-2">Differential Diagnosis (Ranked):</div>
          <ul className="list-decimal list-inside text-gray-700 space-y-2">
            {output.rankedDDx.map((item: any, index: number) => (
              <li key={index}><strong>{item.condition}:</strong> ({item.probability}) - Rationale: {item.rationale}</li>
            ))}
          </ul>
          <div className="font-semibold text-lg mt-4 mb-2">Recommended Next Steps:</div>
          <p>{output.nextSteps}</p>
        </>
      );
    case "Ask a Question":
      return (
        <>
          <div className="font-semibold text-lg mb-2">Suggested Follow-up Questions (to rule out red flags):</div>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            {output.suggestedQuestions.map((item: any, index: number) => (
              <li key={index}><strong>{item.question}</strong> - Rationale: {item.rationale}</li>
            ))}
          </ul>
        </>
      );
    case "Draft Management Plan (DMP)":
      return (
        <>
          <div className="font-semibold text-lg mb-2">{output.title}</div>
          <ol className="list-decimal list-inside text-gray-700 space-y-2">
            {output.plan.map((item: any, index: number) => (
              <li key={index}><strong>{item.step}:</strong> {item.details}</li>
            ))}
          </ol>
        </>
      );
    case "Draft H&P (History & Physical)":
      return (
        <>
          <div className="font-semibold text-lg mb-2">{output.title}</div>
          <div className="space-y-2">
            <p><strong>Chief Complaint:</strong> {output.note.chiefComplaint}</p>
            <p><strong>History of Present Illness:</strong> {output.note.hpi}</p>
            <p><strong>Physical Examination:</strong> {output.note.physicalExam}</p>
            <p><strong>Assessment:</strong> {output.note.assessment}</p>
            <div><strong>Plan:</strong>
              <ol className="list-decimal list-inside pl-4">
                {output.note.plan.map((item: string, index: number) => <li key={index}>{item}</li>)}
              </ol>
            </div>
          </div>
        </>
      );
    default:
      return null;
  }
};

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

        {scenarios.featuresPageScenarios.map((scenario, index) => (
          <div key={index} className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              {scenario.feature}
            </h2>
            <StaticFeatureChatShowcase
              scenario={`SCENARIO (${scenario.mode})`}
              messages={[
                {
                  role: "user",
                  content: <>{scenario.userInput}</>,
                },
                {
                  role: "assistant",
                  content: renderSushrutaOutput(scenario.feature, scenario.sushrutaOutput),
                },
              ]}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
