# Sales Dashboard - Sidetool & Kleva

Real-time sales metrics dashboard with company toggle, funnel visualization, and channel performance tracking.

## Features

- **Company Toggle**: Switch between Sidetool, Kleva, or combined view
- **KPI Scorecard**: MRR, Deals, Pipeline, Meetings, LTV:CAC, CAC
- **Conversion Funnel**: Visual representation of lead journey
- **Channel Performance**: Track performance by acquisition channel
- **Ad Spend Trends**: Monitor spend, CTR, and conversion rates
- **Real-time Alerts**: Actionable insights and warnings

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Deploy to Vercel
vercel
```

## Deploy to Vercel

1. Push to GitHub
2. Import project in Vercel
3. Deploy with zero config

Or use Vercel CLI:
```bash
npm i -g vercel
vercel
```

## Data Sources

Currently uses static data from:
- Ad spend CSV (Google Ads, Meta, LinkedIn)
- Sample funnel metrics
- KPI targets

## Next Steps

To connect real data:
1. Add API routes in `/app/api/`
2. Connect to your CRM (HubSpot/Salesforce)
3. Integrate with Google Analytics
4. Add database for historical data

## Environment Variables

Create `.env.local`:
```
NEXT_PUBLIC_API_URL=your-api-url
DATABASE_URL=your-database-url
```

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Recharts
- Lucide Icons