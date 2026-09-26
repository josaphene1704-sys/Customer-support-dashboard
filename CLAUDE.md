# Customer Support Dashboard

## Project
- Spec: see SPEC.MD (source of truth for features and structure)
- Stack: React + Vite, Tailwind CSS v4, lucide-react, recharts, date-fns, react-hot-toast

## Conventions
- Functional components + hooks only
- One component per file, PascalCase file names
- Tailwind utility classes only — no separate CSS files (besides src/index.css)
- Derived data (KPIs, chart data, filtered lists) via useMemo, not extra state
- Keep components under ~150 lines; extract sub-components when larger

## Commands
- Dev server: npm run dev  (opens at http://localhost:5173/support-dashboard/)
- Build: npm run build
- Preview build: npm run preview

## Workflow
- Explain changes in Hebrew, write code/comments in English
- After each feature: run the build and make sure there are no console errors
