'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from 'recharts';

const data = [
  { name: 'Documentation Time', value: 70, label: 'Up to 70% Reduction' },
  { name: 'Patient Wait Times', value: 50, label: 'Up to 50% Reduction' },
  { name: 'Claim Denials', value: 25, label: 'Up to 25% Reduction' },
];

const ClinicalEfficiencyChart = () => {
  return (
    <div className="output-box p-8 flex flex-col h-full">
      <h3 className="text-2xl font-semibold mb-4 text-center">Reclaiming Time, Reducing Waste</h3>
      <div className="w-full flex-grow" style={{ minHeight: '200px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <XAxis type="number" hide domain={[0, 100]} />
            <YAxis type="category" dataKey="name" hide />
            <Tooltip cursor={{ fill: 'rgba(255, 255, 255, 0.2)' }} contentStyle={{ display: 'none' }} />
            <Bar dataKey="value" fill="#2563EB" radius={[4, 4, 4, 4]} isAnimationActive={true}>
              <LabelList dataKey="label" position="insideRight" style={{ fill: 'white', fontWeight: 'bold' }} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ClinicalEfficiencyChart;
