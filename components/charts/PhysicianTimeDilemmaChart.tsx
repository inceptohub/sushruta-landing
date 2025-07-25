'use client';

import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Direct Patient Care', value: 46, hours: 27.6 },
  { name: 'Indirect Patient Care (EHR/Desktop Medicine)', value: 24, hours: 14.4 },
  { name: 'Administrative Tasks (Paperwork, Billing)', value: 30, hours: 18.0 },
];

const COLORS = ['#2563EB', '#6B7280', '#D1D5DB'];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/80 backdrop-blur-md border border-white/30 rounded-lg p-3 shadow-lg">
        <p className="font-semibold text-foreground">{`${payload[0].name}`}</p>
        <p className="text-sm text-muted-foreground">{`${payload[0].payload.hours.toFixed(1)} hours per week`}</p>
      </div>
    );
  }

  return null;
};

const PhysicianTimeDilemmaChart = () => {
  return (
    <div className="output-box p-8 text-center flex flex-col h-full">
      <h3 className="text-2xl font-semibold mb-4">The Modern Clinician's 60-Hour Workweek</h3>
      <div className="w-full h-64 flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              isAnimationActive={true}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-4 text-sm text-foreground/60">
        Annotation: Physicians spend nearly two-thirds of their time on non-patient-facing work, a primary driver of burnout, which affected 49% of doctors in 2024.
      </p>
    </div>
  );
};

export default PhysicianTimeDilemmaChart;
