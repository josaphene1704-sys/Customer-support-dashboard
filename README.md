# 🎧 Customer Support Dashboard

An interactive dashboard for customer support teams: live KPIs, a searchable and filterable tickets table with inline status updates, and real-time analytics charts.

**Live demo:** https://josaphene1704-sys.github.io/Customer-support-dashboard/

## Features

- **KPI cards** — total, open, resolved today, average response time, CSAT and urgent tickets, with week-over-week trends
- **Tickets table** — search (ID, customer, email, subject), filters (status, priority, channel, agent, date), sorting and pagination
- **Status updates** — change status inline or from the details drawer, with toast notifications and Undo
- **Real-time analytics** — tickets over time, status distribution, channel breakdown and agent performance
- **Live simulation** — a new ticket arrives every 10–15 seconds (pause/resume from the header)
- **Dark mode**, responsive layout, and changes saved in `localStorage`

## Tech stack

React · Vite · Tailwind CSS v4 · lucide-react · Recharts · date-fns · react-hot-toast

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:5173/Customer-support-dashboard/

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the dev server |
| `npm run build` | Build for production into `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | Lint with oxlint |

## Deployment

Every push to `main` builds and deploys the site to GitHub Pages via `.github/workflows/deploy.yml`.

See [SPEC.MD](./SPEC.MD) for the full product specification.
