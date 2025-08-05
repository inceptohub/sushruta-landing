import React from 'react';
import { v4 as uuidv4 } from 'uuid';

interface StructuredResponseProps {
  content: string;
  query?: string;
}

const StructuredResponse: React.FC<StructuredResponseProps> = ({ content, query }) => {
  const parseContent = (text: string) => {
    const sections: { [key: string]: string[] } = {};
    let currentSection = '';

    text.split('\n').forEach(line => {
      line = line.trim();
      if (!line) return;

      const match = line.match(/\*\*(.*?):\*\*/);
      if (match) {
        currentSection = match[1];
        sections[currentSection] = [];
      } else if (currentSection && sections[currentSection]) {
        const item = line.replace(/^(•|\d+\.)\s*/, '').trim();
        sections[currentSection].push(item);
      }
    });

    return sections;
  };

  const parsed = parseContent(content);

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-foreground">
          Analysis Complete
        </h3>
        <span className="text-xs text-foreground/60 bg-white/40 px-3 py-1 rounded-full">
          DEMO MODE
        </span>
      </div>

      {query && (
        <div className="bg-white/60 backdrop-blur-sm border border-white/20 p-4 rounded-lg">
          <div className="text-sm text-foreground/70 font-medium mb-2">
            Input:
          </div>
          <div className="text-foreground">{query}</div>
        </div>
      )}

      <div className="space-y-6">
        {Object.entries(parsed).map(([title, items]) => (
          <div key={uuidv4()}>
            <h4 className="text-lg font-semibold mb-4 text-foreground">
              {title}:
            </h4>
            <div className="space-y-3">
              {title === 'Differential Diagnosis'
                ? items.map((item, index) => {
                    const parts = item.split(' - ');
                    const name = parts[0].replace(/\*\*/g, '');
                    const description = parts.slice(1).join(' - ');
                    let probability = '';
                    let probabilityClass = '';

                    if (description.toLowerCase().includes('most likely') || description.toLowerCase().includes('high probability')) {
                      probability = 'High probability';
                      probabilityClass = 'text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full font-medium';
                    } else if (description.toLowerCase().includes('consider') || description.toLowerCase().includes('moderate probability')) {
                      probability = 'Moderate probability';
                      probabilityClass = 'text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-medium';
                    }

                    return (
                      <div key={uuidv4()} className="flex justify-between items-center p-4 bg-white/40 rounded-xl border border-white/20">
                        <span className="font-medium text-foreground">
                          {index + 1}. {name}
                        </span>
                        {probability && (
                          <span className={probabilityClass}>
                            {probability}
                          </span>
                        )}
                      </div>
                    );
                  })
                : items.map((item) => (
                    <div key={uuidv4()} className="flex items-center p-4 bg-white/40 rounded-xl border border-white/20">
                      <div className="w-2 h-2 bg-primary rounded-full mr-4 flex-shrink-0"></div>
                      <span className="text-foreground">
                        {item}
                      </span>
                    </div>
                  ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StructuredResponse;
