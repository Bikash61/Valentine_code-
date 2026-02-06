# Valentine's Week Interactive Website ❤️

A romantic, interactive website template designed to celebrate Valentine's Week (Feb 7-14).

## Features

- **Interactive Timeline**: Flip cards for each day of Valentine's week.
- **Memory Lane**: Photo gallery and relationship journey timeline.
- **Reasons I Love You**: Animated flip cards.
- **Secret Messages**: Hidden interactions.
- **Music Player**: Background romantic music.
- **Floating Animations**: Hearts, petals, and particles.

## 🚀 Getting Started

### 1. Installation

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 2. Customization (IMPORTANT!)

All the content is managed in **`src/lib/content.ts`**. Open this file to change:

- Your names & Anniversary date.
- All messages for Rose Day, Propose Day, etc.
- The "Reasons I Love You" list.
- The final Love Letter.
- Timeline milestones.

### 3. Adding Photos

1. Place your photos in the `public/` folder (e.g., `public/photos/us1.jpg`).
2. Update the `journey` or `photoPlaceholder` specific links in `src/lib/content.ts`.
3. For the gallery in `MemoryLane.tsx`, you can replace the loop `[1,2,3...]` with an actual array of your image paths.

### 4. Adding Music

1. Put your mp3 file in `public/media/bg-music.mp3` (create the folder if needed).
2. Or update the path in `src/lib/content.ts`.

## 📦 Deployment

The easiest way to deploy is **Vercel**:

1. Push this code to a GitHub repository.
2. Go to [Vercel.com](https://vercel.com) and sign up/login.
3. Click "Add New > Project".
4. Import your repository.
5. Click **Deploy**.

## Tech Stack

- Next.js 14+ (App Router)
- Tailwind CSS v4
- Framer Motion (Animations)
- Lucide React (Icons)
