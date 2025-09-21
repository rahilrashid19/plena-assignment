# Token Portfolio

A React-based web application for tracking a cryptocurrency portfolio, built with Vite, Redux, and integrated with the CoinGecko API. This project visualizes portfolio totals, watchlist data, and token price trends, featuring an interactive UI with charts and modals. The app is deployed and accessible live.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [API Integration](#api-integration)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Portfolio Card**: Displays the total portfolio value with a dynamic donut chart showing currency breakdowns. The legend uses colored text (e.g., "Bitcoin 21%") with a gap between the currency name and percentage, and no colored dots.
- **Watchlist Table**: Includes token prices, 24h percentage changes, sparklines, and editable holdings with hover effects on action buttons.
- **Add Token Modal**: Features a centered popup with trending tokens, search functionality, checkboxes, and a fixed footer with "Cancel" and "Add to Watchlist" buttons.
- **Real-time Updates**: Fetches live price data from the CoinGecko API, with a "Refresh Prices" button.
- **Responsive Design**: Optimized for dark theme and various screen sizes.
- **Interactive Elements**: Includes hover effects, smooth transitions, and a multi-line legend for the donut chart when multiple coins are present.

## Installation

1. **Clone the repository**:

   ```bash
   git clone hhttps://github.com/rahilrashid19/plena-assignment

   ```

2. **Install dependencies**:
   Ensure you have Node.js installed (version 16 or later recommended). Then run:bash

3. **Set up environment variables:Create a .env file in the root directory**.
   Add your CoinGecko API key (if required) or leave it blank if using the free tier:
   VITE_COINGECKO_API_KEY=your_api_key_here

4. **Start the development server**:
   npm run dev

token-portfolio/
├── public/ # Static assets
├── src/
│ ├── components/ # React components
│ │ ├── PortfolioCard.tsx # Displays portfolio total and donut chart
│ │ ├── WatchlistTable.tsx # Manages token watchlist
│ │ ├── AddTokenModal.tsx # Modal for adding tokens
│ │ ├── DonutChart.tsx # Donut chart component
│ │ └── ... # Other UI components
│ ├── hooks/ # Custom hooks (e.g., useTokenData for API calls)
│ ├── store/ # Redux store and slices (e.g., tokenSlice)
│ ├── types/ # TypeScript type definitions
│ ├── App.tsx # Main app component
│ ├── main.tsx # Entry point
│ └── vite-env.d.ts # TypeScript config for Vite
├── .env # Environment variables
├── package.json # Project metadata and scripts
├── README.md # This file
├── tsconfig.json # TypeScript configuration
└── vite.config.ts # Vite configuration

5. **DeploymentThe app is deployed using Vercel and is accessible at**:
   https://plena-assignment-dtwce0cxh-rahilrashid19s-projects.vercel.app/.
