import { Measurement } from '@/types/types';
import { ChartData } from 'chart.js';

export async function fetchMeasurementsFromAPI(username: string): Promise<Measurement[]> {
    const response = await fetch(`/api/measurements?username=${username}`);
    const result = await response.json();

    if (!response.ok) {
        const errorMessage = result.message;
        throw new Error(errorMessage);
    }

    return result.measurements;
}

export function filterNewMeasurements(measurements: Measurement[], existingTimestamps: Set<number>): Measurement[] {
    return measurements.filter(measurement => !existingTimestamps.has(measurement.timestamp));
}

export function updateChartData(prevData: ChartData<'line'>, newMeasurements: Measurement[]): ChartData<'line'> {
    const newLabels = newMeasurements.map(m => m.timestamp);
    const newHeartRates = newMeasurements.map(m => m.heartRate);

    return {
        ...prevData,
        labels: [...(prevData.labels || []), ...newLabels],
        datasets: [
            {
                ...prevData.datasets[0],
                data: [...prevData.datasets[0].data, ...newHeartRates],
            },
        ],
    };
}
