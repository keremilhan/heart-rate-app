# Heart Rate App

A full-stack application for tracking heart rate measurements. Users can log in, view their heart rate data visualized in a chart, and receive real-time updates of their measurements.

[Live Preview](https://heart-rate-app-keremilhan.vercel.app)

<img width="1701" alt="heart-rate" src="https://github.com/user-attachments/assets/5bbbbec4-a134-4f95-afe4-0c32ba44d35f" />


## Features

-   **Dark Mode**: Toggle between light and dark themes.
-   **Real-time Data Fetching**: Updates heart rate measurements at regular intervals.
-   **Interactive Chart**: Visualize heart rate data using a responsive chart.
-   **Custom Notifications**: Toast messages for errors, updates, and unauthorized access.

## Technologies Used

### Frontend

-   [Next.js](https://nextjs.org/) (App Router)
-   [Tailwind CSS](https://tailwindcss.com/) for styling
-   [React Toastify](https://fkhadra.github.io/react-toastify/) for notifications
-   [Chart.js](https://www.chartjs.org/) for chart visualizations

### Backend

-   Next.js API routes

## Getting Started

### Prerequisites

Make sure you have the following installed:

-   Node.js (v16 or above)
-   npm or yarn

## Environment Variables

Create a `.env` file in the root of your project and add the following variables:

```env
NEXT_PUBLIC_API_BASE_URL=<API_BASE_URL>
```

Replace `<API_BASE_URL>` with your backend API URL.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Author

-   **Kerem Ilhan**
