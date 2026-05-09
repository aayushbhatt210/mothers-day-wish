# Memories in Bloom

Mother's Day interactive website built with React + TypeScript + Tailwind.

## Run locally

```bash
npm install
npm run dev
```

## Build for production

```bash
npm run build
npm run preview
```

## Add your real assets

Drop files in:

- `public/assets/photos/` (`photo1.jpg` ... `photo10.jpg`)
- `public/assets/audio/` (`backgroundMusic.mp3`, `balloonPop.mp3`, `heartChime.mp3`, `sparkleSound.mp3`, `confettiPop.mp3`, `messageAppear.mp3`)

Album content is editable in `public/assets/data/albumData.json`.

## Deploy to Netlify

This repo already includes `netlify.toml`.

1. Push this project to GitHub.
2. In Netlify, create a new project from the repo.
3. Netlify will use:
   - Build command: `npm run build`
   - Publish directory: `dist`
