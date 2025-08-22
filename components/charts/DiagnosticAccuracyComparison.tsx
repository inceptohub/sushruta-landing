'use client';

import React from 'react';

const DiagnosticAccuracyComparison = () => {
  return (
    <div className="output-box p-8 flex flex-col h-full">
      <h3 className="text-2xl font-semibold mb-4 text-center">Enhancing Diagnostic Precision</h3>
      <div className="grid grid-cols-2 gap-4 text-center items-center flex-grow">
        <div>
          <h4 className="font-semibold text-lg mb-2">Traditional Practice</h4>
          <div className="my-4 text-6xl">⚠️</div>
          <p className="text-muted-foreground">Diagnostic Uncertainty</p>
        </div>
        <div className="border-l border-gray-200/60 pl-4">
          <h4 className="font-semibold text-lg mb-2">With Sushrut Health</h4>
          <div className="my-4 text-6xl">🎯</div>
          <p className="text-primary font-bold text-4xl">29%</p>
          <p className="text-muted-foreground">Improvement in Diagnostic Accuracy</p>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticAccuracyComparison;
