'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import LineChart from '@/components/LineChart';
import 'chartjs-adapter-date-fns';
import { ChartData } from 'chart.js';
import customToast from '@/utils/customToast';
import { ERROR_MESSAGES, fetchFrequency } from '@/utils/constants';
import useChartOptions from '@/hooks/useChartOptions';
import { fetchMeasurementsFromAPI, filterNewMeasurements, updateChartData } from '@/utils/functions';
import MessageLayout from '@/components/MessageLayout';

export default function Dashboard() {
    const searchParams = useSearchParams();
    const username = searchParams.get('username');

    const initialData: ChartData<'line'> = {
        labels: [],
        datasets: [
            {
                label: 'Heart Rate',
                data: [],
                fill: true,
            },
        ],
    };

    const [chartData, setChartData] = useState<ChartData<'line'>>(initialData);
    const [authFlag, setAuthFlag] = useState<boolean>(true);
    const existingTimestampsRef = useRef<Set<number>>(new Set());
    const options = useChartOptions(username, (chartData.labels as number[]) || []);

    useEffect(() => {
        const fetchAndSetMeasurements = async (): Promise<void> => {
            if (!username) {
                return;
            }
            try {
                const measurements = await fetchMeasurementsFromAPI(username);

                const newMeasurements = filterNewMeasurements(measurements, existingTimestampsRef.current);

                if (newMeasurements.length > 0) {
                    setChartData(prevData => updateChartData(prevData, newMeasurements));
                    newMeasurements.forEach(m => existingTimestampsRef.current.add(m.timestamp));
                }
            } catch (error) {
                if (error instanceof Error) {
                    if (error.message.includes(ERROR_MESSAGES.unauthorized)) {
                        setAuthFlag(false);
                    }
                    customToast(error.message, 'error');
                } else {
                    customToast(ERROR_MESSAGES.unexpected, 'error');
                }
            }
        };
        if (username) {
            fetchAndSetMeasurements();
            let fetchInterval: NodeJS.Timeout;
            if (authFlag) {
                fetchInterval = setInterval(fetchAndSetMeasurements, fetchFrequency);
            }
            return () => {
                clearInterval(fetchInterval);
            };
        }
    }, [username, authFlag]);

    const isDataReady = chartData?.datasets?.[0]?.data?.length > 1;

    if (!username || !authFlag) {
        return <MessageLayout message="Please go back to login page and provide a username to see heart rates for the user." />;
    }

    return isDataReady ? <LineChart options={options} data={chartData} /> : <MessageLayout message="Fetching data..." />;
}
