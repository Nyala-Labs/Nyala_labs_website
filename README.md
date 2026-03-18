# nyala — blaze the trail

> a modern, animation-rich website for the nyala university club.  
> built with next.js 15, tailwind css, payload cms, and framer motion.

---

## tech stack

| layer | technology |
|-------|-----------|
| framework | next.js 15 (app router) |
| styling | tailwind css v4 |
| animations | framer motion |
| cms | payload cms |
| language | typescript |
| font | jetbrains mono (google fonts) |

---

## quick start

```bash
# 1. install dependencies
pnpm install

# 2. copy environment variables
cp .env.example .env.local
# edit .env.local with your payload secret and database url

# 3. run dev server
pnpm dev

# 4. open browser
# → http://localhost:3000
```

---

## folder structure

```
nyala/
├── public/
│   ├── images/              # static images (hero, blog, events)
│   │   └── committee/       # member profile photos
│   └── videos/              # hero background videos
├── src/
│   ├── app/                 # next.js app router pages
│   │   ├── layout.tsx       # root layout (navbar + footer + grain)
│   │   ├── page.tsx         # landing page
│   │   ├── globals.css      # tailwind config + custom animations
│   │   ├── about/           # about us page (timeline, trail, committee preview)
│   │   ├── blogs/           # blog listing (featured, grid, filters)
│   │   ├── committee/       # committee member grid
│   │   ├── activities/      # upcoming events listing
│   │   └── news/            # news feed (placeholder)
│   ├── components/
│   │   ├── layout/          # navbar, footer
│   │   ├── hero/            # hero section, typing tagline
│   │   ├── blog/            # blog card
│   │   ├── committee/       # committee card
│   │   ├── about/           # timeline, trail path
│   │   └── ui/              # shared: scroll reveal, grain, dividers, headings
│   ├── lib/
│   │   ├── cms-client.ts    # client-side payload data adapters
│   │   ├── payload.ts       # server-side payload client helper
│   │   ├── animations.ts    # shared framer motion variants
│   │   └── utils.ts         # helper functions
│   ├── collections/         # payload collection configs
│   ├── payload.config.ts    # payload project config
│   ├── data/
│   │   └── mock.ts          # mock data for development
│   └── types/
│       └── index.ts         # typescript interfaces
├── package.json
├── tailwind.config.ts
├── next.config.ts
└── README.md
```

---

## pages

| route | page | description |
|-------|------|-------------|
| `/` | landing | hero video/image rotation, typing taglines, activities preview, blog preview, highlights |
| `/about` | about us | origin story timeline, winding trail path (aims), committee preview |
| `/blogs` | blogs | featured article, category filters, paginated grid |
| `/committee` | committee | responsive member card grid with hover effects |
| `/activities` | activities | upcoming events listing |
| `/news` | news | placeholder (coming soon) |

---

## components

### core components

| component | path | description |
|-----------|------|-------------|
| `Navbar` | `layout/Navbar.tsx` | fixed, transparent→solid on scroll, mobile drawer |
| `Footer` | `layout/Footer.tsx` | minimal dark footer with links and cta |
| `HeroVideoSection` | `hero/HeroVideoSection.tsx` | fullscreen hero with video rotation + mouse parallax |
| `TypingTagline` | `hero/TypingTagline.tsx` | terminal-style typewriter with cursor blink |
| `BlogCard` | `blog/BlogCard.tsx` | article card with featured variant |
| `CommitteeCard` | `committee/CommitteeCard.tsx` | grayscale→color, tilt, glow on hover |
| `Timeline` | `about/Timeline.tsx` | vertical timeline with animated line + dots |
| `TrailPath` | `about/TrailPath.tsx` | svg winding path drawn on scroll |

### shared ui

| component | description |
|-----------|-------------|
| `GrainOverlay` | subtle noise texture over entire site |
| `ScrollReveal` | reusable scroll-triggered fade animation |
| `AnimatedDivider` | line that draws on scroll |
| `SectionHeading` | section title with glow option + red underline |

---

## animation system

all animations use **framer motion**. shared variants live in `src/lib/animations.ts`:

- `fadeUp` — element fades in and slides up
- `fadeIn` — simple opacity fade
- `slideInLeft / slideInRight` — horizontal slide reveals
- `scaleUp` — zoom in from smaller scale
- `staggerContainer` — parent that staggers child animations
- `drawLine` — svg path drawing effect
- `letterReveal` — character-by-character text reveal

### css animations (globals.css)

- `blink` — cursor blink effect
- `grain` — film grain texture movement
- `float` — gentle floating effect
- `glow-pulse` — pulsing text glow

### key animation features

1. **grain overlay** — persistent, subtle noise texture
2. **scroll reveals** — elements animate in when scrolling into view
3. **mouse parallax** — hero background reacts to cursor position
4. **typing effect** — terminal-style tagline cycling
5. **grayscale→color** — committee cards transition on hover
6. **parallax tilt** — cards tilt based on mouse position
7. **path drawing** — svg trail draws on scroll progress
8. **staggered loading** — grid items animate in sequence
9. **animated dividers** — lines draw across screen on scroll

---

## payload cms setup

### 1. install dependencies

```bash
# install project dependencies
pnpm install
```

### 2. configure environment

add these values to `.env.local`:

```
PAYLOAD_SECRET=replace-with-a-secure-random-string
DATABASE_URL=file:./payload.db
```

### 3. collections

content types are configured in `src/collections/`:

| schema | fields |
|--------|--------|
| `blogPost` | title, slug, excerpt, body (portable text), coverImage, author, categories, publishedAt, readingTime, featured |
| `committeeMember` | name, role, image, bio, linkedin, order |
| `activity` | title, description, date, location, image, status |
| `news` | title, slug, body, coverImage, publishedAt |

### 4. payload admin + api routes

payload admin and REST routes are mounted under:

- `/admin`
- `/api/*`

---

## deployment

### vercel (recommended)

```bash
# install vercel cli
pnpm add -g vercel

# deploy
vercel
```

set environment variables in vercel dashboard:
- `PAYLOAD_SECRET`
- `DATABASE_URL`

### other platforms

works with any platform supporting next.js:
- netlify
- railway
- aws amplify
- self-hosted with `pnpm build && pnpm start`

---

## design system

### color palette

| token | hex | usage |
|-------|-----|-------|
| `nyala-red` | `#c62828` | primary accent, cta buttons, active states |
| `nyala-red-light` | `#ef5350` | hover states |
| `nyala-red-dark` | `#8e0000` | pressed states |
| `nyala-yellow` | `#fbc02d` | secondary accent, highlights, cursor |
| `nyala-white` | `#fafafa` | text, foreground |
| `nyala-black` | `#0a0a0a` | background |
| `nyala-gray` | `#1a1a1a` | card backgrounds |
| `nyala-gray-light` | `#2a2a2a` | borders |
| `nyala-gray-muted` | `#6b6b6b` | secondary text |

### typography

- **font:** jetbrains mono (monospace)
- **style:** all lowercase for headings and nav
- **weights:** 300 (light), 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

---

## adding media assets

### hero images / videos

place in `images/` or `public/videos/`:
- `hero-1.jpg`, `hero-2.jpg`, `hero-3.jpg` (or `.mp4` for videos)
- recommended: 1920×1080 minimum, dark/moody aesthetic

### blog cover images

- `blog-1.jpg` through `blog-6.jpg`
- recommended: 16:9 aspect ratio

### committee photos

place in `images/committee/`:
- `member-1.jpg` through `member-8.jpg`
- recommended: square (1:1), minimum 400×400px
- ensure photos look good in both grayscale and color

### highlight photos

- `highlight-1.jpg` through `highlight-4.jpg`
- recommended: square, event photography

---

## future feature suggestions

1. **interactive event map** — google maps integration showing past/upcoming event locations
2. **live activity feed** — real-time feed of club activity (social media aggregation)
3. **animated statistics section** — counting animations for member count, events, projects
4. **dynamic timeline** — cms-driven timeline that content editors can update
5. **interactive community graph** — d3.js network graph showing member connections
6. **gamified contributions** — leaderboard tracking member participation and contributions
7. **dark/light theme toggle** — respect system preference + manual toggle
8. **interactive trail visualization** — 3d or advanced svg trail with three.js
9. **event rsvp system** — integrated event registration with email confirmations
10. **member portfolio showcase** — gallery of member projects and achievements
11. **ai chatbot** — club FAQ bot using openai or similar
12. **newsletter integration** — email signup with resend or mailchimp
13. **blog search** — full-text search across blog posts
14. **reading progress bar** — progress indicator on individual blog posts
15. **page transitions** — animated route transitions with framer motion's layout animations

---

## license

mit
