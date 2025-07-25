'use client';

import { useEffect, useRef, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const DiagnosticErrorChart = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = chartRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const data = {
    labels: ['Vascular Events', 'Infections', 'Cancer'],
    datasets: [
      {
        label: 'Serious Misdiagnosis-Related Harms',
        data: isVisible ? [28, 26, 20] : [0, 0, 0],
        backgroundColor: 'hsl(221, 83%, 53%)',
        hoverBackgroundColor: 'hsl(221, 83%, 45%)',
        barThickness: 20,
      },
    ],
  };

  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Top Causes of Serious Misdiagnosis-Related Harms',
        color: 'hsl(222, 47%, 11%)',
        font: {
            family: 'Inter, sans-serif',
            size: 16,
            weight: 600,
        }
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return `${context.raw}%`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'hsl(222, 9%, 46%)',
           font: {
            family: 'Inter, sans-serif',
          },
          callback: function(value: any) {
            return value + '%'
          }
        },
        border: {
            display: false
        }
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'hsl(222, 9%, 46%)',
           font: {
            family: 'Inter, sans-serif',
          },
        },
         border: {
            display: false
        }
      },
    },
    animation: {
        duration: 1000,
    }
  };

  return (
    <div ref={chartRef} style={{ height: '250px' }}>
      <Bar options={options} data={data} />
    </div>
  );
};
