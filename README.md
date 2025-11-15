# PostureLens

A production-quality B2B "digital musculoskeletal biomarker" dashboard that shows posture quality over time for individual employees and organizations.

## Features

- **Real-time Posture Monitoring**: Live posture score tracking with visual feedback
- **Daily & Weekly Analytics**: Timeline charts and trend analysis
- **Organization Insights**: Leaderboards, team statistics, and actionable insights
- **Theme Support**: Light and dark mode with smooth transitions
- **Responsive Design**: Optimized for laptops and desktops

## Tech Stack

- **Next.js 15** (App Router, TypeScript)
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **TanStack Query** for data fetching and caching
- **Recharts** for data visualization
- **next-themes** for theme management

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
str8/
├── app/                    # Next.js app router pages
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Landing page
│   ├── dashboard/          # Individual dashboard
│   └── org/                # Organization overview
├── components/             # React components
│   ├── layout/            # Layout components (Navbar, AppShell)
│   ├── selectors/         # Org/User selectors
│   ├── charts/            # Chart components (Recharts)
│   ├── tables/            # Table components
│   └── ui/                # shadcn/ui components
├── lib/
│   ├── api/               # API layer (currently mocked)
│   ├── hooks/             # Custom React hooks
│   ├── providers/         # Context providers
│   ├── types/             # TypeScript types
│   └── mock-data/         # Mock data files
└── public/                # Static assets
```

## Architecture

### Mock API Layer

All API functions are currently mocked in `lib/api/mock.ts`. This architecture makes it trivial to swap the mock layer for a real Supabase-backed API without touching page or feature components.

To connect to a real API:
1. Create a new file `lib/api/supabase.ts` with the same function signatures
2. Replace imports in `lib/hooks/*.ts` from `@/lib/api/mock` to `@/lib/api/supabase`

### Data Flow

1. **User Selection**: Org/User selection persisted in localStorage
2. **Data Fetching**: TanStack Query hooks fetch data from mock API
3. **Live Updates**: `useLivePosture` polls every 3 seconds for real-time updates
4. **Caching**: TanStack Query handles caching and refetching automatically

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Mock Data

The app uses in-memory mock data:
- **Organizations**: 3 sample organizations (TechCorp, HealthStart, FinanceFlow)
- **Users**: 7 users distributed across organizations
- **Posture Samples**: Generated time-series data with realistic patterns

## Future Enhancements

- Connect to Supabase for real data storage
- Implement actual computer vision posture detection
- Add authentication and user management
- Real Slack webhook integration
- Advanced analytics and reporting

## License

Private project for hackathon demonstration.

