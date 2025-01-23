export interface Measurement {
    timestamp: number;
    heartRate: number;
}

export type ToastType = 'info' | 'success' | 'warning' | 'error' | 'default';
