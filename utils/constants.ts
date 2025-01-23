export const ERROR_MESSAGES = {
    fetchFailed: 'Failed to fetch data. Please try again later.',
    unauthorized: 'You are not authorized to perform this action. Please login and try again.',
    unexpected: 'An unexpected error occurred. Please try again later.',
    emptyUsername: "Please don't use only spaces for a username.",
    loginFailed: 'Login failed.',
};

export const BPM_ZONES = [
    { label: '1', min: 40, max: 60, color: '#FFFF00' },
    { label: '2', min: 60, max: 90, color: '#FFA500' },
    { label: '3', min: 90, max: 110, color: '#FF4500' },
    { label: '4', min: 110, max: 140, color: '#FF0000' },
    { label: '5', min: 140, max: 160, color: '#1C0000' },
];

export const fetchFrequency = 5000;

export const toastAutoClose = 3000;

export const tooltipHoverLineColor = '#bfc2c7';

export const visibleDataPoints = 8;
