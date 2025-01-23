import { BPM_ZONES, visibleDataPoints } from '@/utils/constants';
import { ChartOptions } from 'chart.js';
import { useTheme } from '@/context/ThemeProvider';

export default function useChartOptions(username: string | null, labels: number[]) {
    const { theme } = useTheme();

    const textColor = theme === 'dark' ? 'white' : 'black';
    const tooltipTextColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)';
    const tooltipBackgroundColor = theme === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)';
    const fillColor = theme === 'dark' ? '#180E0A' : '#E5E7EB';

    const options: ChartOptions<'line'> = {
        maintainAspectRatio: false,
        responsive: true,
        animation: {
            duration: 800,
            easing: 'easeInOutSine',
            loop: false,
        },
        scales: {
            x: {
                min: labels[Math.max(labels.length - visibleDataPoints, 0)],
                max: labels[labels.length - 1],
                stacked: true,
                grid: {
                    display: false,
                },
                type: 'time',
                time: {
                    unit: 'millisecond',
                    displayFormats: {
                        second: 'HH:mm:ss',
                    },
                    tooltipFormat: 'HH:mm:ss.SSS',
                },
                title: {
                    display: false,
                    color: textColor,
                    padding: {
                        top: 30,
                    },
                    font: {
                        size: 20,
                        weight: 800,
                    },
                },
                ticks: {
                    source: 'labels',
                    display: true,
                    autoSkip: true,
                    maxRotation: 90,
                    maxTicksLimit: 3,
                    callback: function (value: number | string) {
                        const date = new Date(value);
                        return date.toLocaleTimeString('en-US', { hour12: false });
                    },
                    font: {
                        size: 18,
                        weight: 800,
                    },
                    color: textColor,
                },
            },
            y: {
                type: 'linear',
                grid: {
                    display: false,
                },
                position: 'right',
                title: {
                    display: false,
                    font: {
                        size: 20,
                        weight: 800,
                    },
                    padding: {
                        bottom: 30,
                    },
                    color: textColor,
                },
                min: BPM_ZONES[0].min,
                max: BPM_ZONES[BPM_ZONES.length - 1].max,
                ticks: {
                    callback: function (value: string | number) {
                        return `${value} bpm`;
                    },
                    font: {
                        size: 18,
                        weight: 800,
                    },
                    color: textColor,
                },
            },
        },
        interaction: {
            mode: 'index',
            intersect: false,
        },
        plugins: {
            tooltip: {
                mode: 'index',
                intersect: false,
                backgroundColor: tooltipBackgroundColor,
                titleColor: tooltipTextColor,
                xAlign: 'center',
                titleFont: {
                    size: 18,
                    weight: 800,
                },
                bodyColor: function (context) {
                    const { tooltip } = context;
                    const dataPoint = tooltip?.dataPoints?.[0];
                    const bpm = dataPoint?.raw as number;
                    const zone = BPM_ZONES.find(z => bpm >= z.min && bpm < z.max);
                    return zone?.color;
                },
                bodyFont: {
                    size: 18,
                    weight: 600,
                },
                footerFont: {
                    size: 16,
                    weight: 400,
                },
                footerColor: tooltipTextColor,
                borderWidth: 1,
                boxWidth: 70,
                padding: 15,
                cornerRadius: 8,
                caretSize: 12,
                displayColors: false,
                bodyAlign: 'center',
                titleAlign: 'center',
                callbacks: {
                    title: tooltipItems => {
                        const bpm = tooltipItems[0].raw;
                        return `${bpm} BPM`;
                    },
                    label: tooltipItem => {
                        const bpm = tooltipItem.raw;
                        const zone = BPM_ZONES.find(zone => (bpm as number) >= zone.min && (bpm as number) < zone.max);
                        return `${zone ? zone.label : 'Unknown Zone'}`;
                    },
                    footer(tooltipItems) {
                        const time = tooltipItems[0].label;
                        return time;
                    },
                },
            },
            title: {
                display: true,
                text: `${username}'s Heart Rate Measurements`,
                font: {
                    size: 28,
                    weight: 800,
                },
                color: textColor,
                padding: {
                    bottom: 100,
                },
            },
            annotation: {
                annotations: BPM_ZONES.map(zone => ({
                    type: 'box',
                    yScaleID: 'y',
                    yMin: zone.min,
                    yMax: zone.max,
                    backgroundColor: 'transparent',
                    label: {
                        position: 'start',
                        display: true,
                        content: zone.label,
                        font: {
                            size: 20,
                            weight: 800,
                        },
                        color: textColor,
                    },
                    display: true,
                    borderColor: 'transparent',
                })),
            },
            zoom: {
                pan: {
                    enabled: true,
                    mode: 'x',
                    onPan: ({ chart }) => {
                        const xScale = chart.scales.x;
                        const minTimestamp = labels[0];
                        const maxTimestamp = labels[labels.length - 1];

                        if (xScale.min < minTimestamp) {
                            xScale.options.min = minTimestamp;
                        }

                        if (xScale.max > maxTimestamp) {
                            xScale.options.max = maxTimestamp;
                        }

                        chart.update();
                    },
                },
            },
        },
        layout: {
            padding: 20,
        },
        borderColor: 'red',
        elements: {
            line: {
                tension: 0.1,
                borderWidth: 4,
                fill: 'below',
                backgroundColor: fillColor,
                borderColor: function (context) {
                    const { chart } = context;
                    const { ctx, chartArea, scales } = chart;

                    // If chartArea is undefined, black is returned
                    if (!chartArea) {
                        return '#000000';
                    }

                    const yScale = scales.y;
                    const gradient = ctx.createLinearGradient(0, yScale.bottom, 0, yScale.top);

                    const sortedZones = [...BPM_ZONES].sort((a, b) => a.min - b.min);

                    sortedZones.forEach((zone, index) => {
                        const startPoint = (yScale.getPixelForValue(zone.min) - yScale.top) / (yScale.bottom - yScale.top);
                        const endPoint = (yScale.getPixelForValue(zone.max) - yScale.top) / (yScale.bottom - yScale.top);

                        // We need to be sure that the positions are valid numbers within the range [0, 1]
                        if (typeof startPoint === 'number' && startPoint >= 0 && startPoint <= 1) {
                            gradient.addColorStop(1 - startPoint, zone.color);
                        }
                        if (typeof endPoint === 'number' && endPoint >= 0 && endPoint <= 1 && sortedZones[index + 1]?.color) {
                            gradient.addColorStop(1 - endPoint, sortedZones[index + 1].color);
                        }
                    });

                    return gradient;
                },
            },
            point: {
                pointStyle: false,
            },
        },
    };

    return options;
}
