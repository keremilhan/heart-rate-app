'use client';
import React, { useEffect } from 'react';
import { CategoryScale, Chart as ChartJS, LinearScale, LineElement, PointElement, Title, Tooltip, TimeScale, ChartData, ChartOptions, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';
import Annotation from 'chartjs-plugin-annotation';
import { createHoverLinePlugin } from '@/utils/chartPlugins';
import { tooltipHoverLineColor } from '@/utils/constants';

ChartJS.register(TimeScale, CategoryScale, LinearScale, PointElement, LineElement, Annotation, Title, Tooltip, Filler);

export default function LineChart({ options, data }: { options: ChartOptions<'line'>; data: ChartData<'line'> }) {
    const hoverLinePlugin = createHoverLinePlugin(tooltipHoverLineColor);

    useEffect(() => {
        async function loadZoomPlugin() {
            const { default: zoomPlugin } = await import('chartjs-plugin-zoom');
            ChartJS.register(zoomPlugin);
        }
        loadZoomPlugin();
    }, []);

    return (
        <div className="w-full h-full md:w-2/3 md:h-4/5 rounded-3xl p-12 bg-gray-50 dark:bg-gray-950 flex justify-center items-center">
            <Line data={data} options={options} plugins={[hoverLinePlugin]} />
        </div>
    );
}
