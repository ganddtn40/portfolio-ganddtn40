# GANDDTN40 - Full Stack Web Developer Portfolio

A brutalist, gothic, and highly interactive terminal-style web portfolio built with Next.js, Tailwind CSS, Framer Motion, and GSAP.

## About

Portfolio of ganddtn40 (lyhsjaa), a Full Stack Web Developer from Indonesia specializing in TypeScript, Next.js, PHP, SQL, and Dart. Terminal-first, gothic aesthetic — every section behaves like a session in a command line: `whoami`, `cat info.txt`, `./github_contributions.sh`, and a live "socialitea" project demo.

## Tech Stack

- **Next.js 16** (App Router, Turbopack, static prerendering)
- **TypeScript** (strict mode)
- **Tailwind CSS** (monochrome gothic design system, custom keyframes)
- **21st.dev Components** — Globe, Robot (Spline), Space Shooter (GitHub calendar), Bucket, Meteors, Sparkles, Lamp, Tracing Beam, Wobble Card, Border Beam, Spotlight, Glitch Text, Hacker Text, Typewriter, Morph Text, Magic Card, Magnetic (all loaded with `next/dynamic` + `ssr: false` for Lighthouse 90+)
- **Framer Motion / Motion** + **GSAP** for animation
- **react-icons**, **lucide-react**, **@hugeicons/react**

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### Production build

```bash
npm run build
npm start
```

### Quality gates

```bash
npx tsc --noEmit   # strict typecheck
npx eslint src     # lint (0 warnings/errors)
```

## Sections

| Command | Section |
| --- | --- |
| `$ whoami` | Hero, terminal intro, robot cursor tracker |
| `00 — whoami` | About, macOS-style `cat info.txt` terminal |
| `01 — STACK` | 3D icon cloud + hackable stack list |
| `02 — PROJECTS` | Socialitea (Live Demo → https://socialitea.vercel.app) |
| `./github_contributions.sh` | GitHub contribution calendar in a fake terminal |
| `The Bucket` | Identity chips — Full Stack Web, Backend Architect, Terminal First, Continuous Learner |
| `03 — NETWORK` | 3D wireframe globe + social links |

## Deployment

Optimized for **Vercel** — zero configuration required.

```bash
vercel
```

## License

All rights reserved. This repository is a personal portfolio — content, layout, and code are owned by ganddtn40 and may not be reused without permission.