'use client';

import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const AnimatedNumber = ({ target }: { target: number }) => {
  const [current, setCurrent] = useState(0);
  const duration = 1500; // ms

  useEffect(() => {
    let start = 0;
    const end = target;
    if (start === end) return;

    const incrementTime = (duration / end) * 10;
    const timer = setInterval(() => {
      start += Math.ceil(end / (duration / 10));
      if (start >= end) {
        setCurrent(end);
        clearInterval(timer);
      } else {
        setCurrent(start);
      }
    }, 10);

    return () => clearInterval(timer);
  }, [target]);

  return <>{current.toLocaleString()}</>;
};

const barChartData = [
  { name: 'Vascular Events', value: 25 },
  { name: 'Infections', value: 20 },
  { name: 'Cancers', value: 15 },
];

const COLORS = ['#6B7280', '#9CA3AF', '#D1D5DB'];

const DiagnosticErrorScale = () => {
  return (
    <div className="output-box p-8 text-center flex flex-col h-full">
      <h3 className="text-2xl font-semibold mb-4">The Scale of Diagnostic Error</h3>
      <div className="my-8 flex-grow flex flex-col items-center justify-center">
        <p className="text-7xl font-bold text-primary">
          <AnimatedNumber target={795000} />
        </p>
        <p className="mt-2 text-sm text-foreground/60 max-w-xs mx-auto">
          Americans suffer permanent disability or death annually from diagnostic error.
        </p>
      </div>
      <div>
        <h4 className="text-xl font-semibold mb-4">The 'Big Three' Categories of Error</h4>
        <div className="w-full h-48 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barChartData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--foreground)', fontSize: 14 }} width={120} />
              <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.3)', borderRadius: '0.75rem', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }} />
              <Bar dataKey="value" barSize={20} isAnimationActive={true}>
                {barChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticErrorScale;
