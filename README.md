# Firas Al Haddad — Portfolio

Premium, project-focused portfolio site built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **shadcn/ui**.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command       | Description            |
| ------------- | ---------------------- |
| `npm run dev` | Start dev server       |
| `npm run build` | Production build     |
| `npm run start` | Run production server |
| `npm run lint`  | ESLint               |

## Customize content

- **Profile, skills, jobs, projects:** edit [`src/lib/data.ts`](src/lib/data.ts)
- **Types:** [`src/types/index.ts`](src/types/index.ts)
- **Resume download:** replace [`public/resume.pdf`](public/resume.pdf) with your real PDF (same filename), or change links in the navbar/hero
- **Site URL / SEO:** update `metadataBase` and `openGraph.url` in [`src/app/layout.tsx`](src/app/layout.tsx)

## Project structure

- `src/app/` — App Router pages (`/`, `/projects/[slug]`)
- `src/components/sections/` — Home page sections
- `src/components/layout/` — Navbar, footer, theme toggle
- `src/components/ui/` — shadcn components + project modal/card
- `src/lib/data.ts` — centralized content

## Tech stack

- Next.js (App Router) · TypeScript · Tailwind CSS · Framer Motion · next-themes · Lucide (plus custom GitHub/LinkedIn SVGs where the icon set lacked names) · shadcn/ui (Base UI primitives)
