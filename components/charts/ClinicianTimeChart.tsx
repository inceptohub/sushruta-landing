'use client';

import { useEffect, useRef, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export const ClinicianTimeChart = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredLabel, setHoveredLabel] = useState('');

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
    labels: ['Clinical Assessment & History', 'Documentation & Prescription', 'Patient Counselling'],
    datasets: [
      {
        data: isVisible ? [50, 30, 20] : [0, 0, 0],
        backgroundColor: [
          'hsl(221, 83%, 53%)',
          'hsl(220, 7%, 85%)',
          'hsla(220, 7%, 85%, 0.7)',
        ],
        hoverBackgroundColor: [
            'hsl(221, 83%, 45%)',
            'hsl(220, 7%, 75%)',
            'hsla(220, 7%, 75%, 0.7)',
        ],
        borderColor: 'hsl(0, 0%, 100%)',
        borderWidth: 2,
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'OPD Time Allocation Challenge',
        color: 'hsl(222, 47%, 11%)',
        font: {
            family: 'Inter, sans-serif',
            size: 16,
            weight: 600,
        }
      },
      tooltip: {
        enabled: false, // We use the center text for info
      },
    },
    onHover: (event: any, chartElement: any) => {
        if (chartElement.length > 0) {
            const index = chartElement[0].index;
            setHoveredLabel(data.labels[index]);
        } else {
            setHoveredLabel('');
        }
    },
    animation: {
        duration: 1000,
        animateScale: true,
        animateRotate: true,
    }
  };

  return (
    <div ref={chartRef} style={{ height: '250px', position: 'relative' }}>
      <Doughnut options={options} data={data} />
      {hoveredLabel && (
        <div style={{
            position: 'absolute',
            top: '55%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            color: 'hsl(222, 47%, 11%)',
            fontFamily: 'Inter, sans-serif',
            fontSize: '1rem',
            fontWeight: '600',
        }}>
          {hoveredLabel}
        </div>
      )}
    </div>
  );
};
