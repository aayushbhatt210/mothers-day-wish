# Product Requirements Document (PRD)
## Mother's Day Interactive Website

**Project Name:** Memories in Bloom  
**Purpose:** A heartwarming, interactive website dedicated to celebrating your mother with animations, an interactive flipbook album, and personal memories  
**Platform:** Web (Mobile-first)  
**Hosting:** Netlify  
**Target Audience:** Personal use - for your mom  

---

## 1. Product Overview

### Vision
Create an emotionally engaging, interactive website that celebrates your mother through:
- **Interactive animations** (balloons, hearts, confetti, sparkles)
- **Personalized message display** (Happy Mother's Day, Love You messages)
- **Digital flipbook/photo album** with memories and dates
- **Ambient soundscapes** (nature sounds + background music)
- **Elegant, warm aesthetic** using soft pink, cream, and rose color palette

### Core Experience Flow
1. **Landing/Cover Page** → Beautiful welcome screen with title + "Start" button
2. **Interactive Zone** → Buttons to trigger animations (balloons, hearts, etc.) with ambient music playing
3. **Flipbook Album** → 5-10 pages of photos with handwritten memories and dates
4. **End Screen** → Thank you message + confetti animation + return to start

---

## 2. Detailed Requirements

### 2.1 Technical Stack
- **Framework:** React (TypeScript)
- **Styling:** Tailwind CSS
- **Component Library:** shadcn/ui
- **Animation Libraries:**
  - `framer-motion` (for smooth animations)
  - `balloons-js` (for balloon animations)
  - Custom confetti component
- **Audio:** `howler.js` or Web Audio API for background music + sound effects
- **Icons:** `lucide-react`
- **Fonts:** 
  - Headers: Sparkles effect (custom or Poppins Bold)
  - Body Text: Playfair Display (serif, elegant)
  - UI Text: Inter or Poppins (clean, modern)

---

## 3. Page Structure & Features

### 3.1 Landing/Cover Page
**Purpose:** Beautiful welcome screen that sets the emotional tone

**Components:**
- **Background:** Soft gradient (white → light pink or cream)
- **Title:** "Happy Mother's Day" in sparkles text effect
- **Subtitle:** A heartfelt one-liner (e.g., "A celebration of memories with you")
- **Decorative Elements:** 
  - Subtle floating flowers or leaf animations
  - Soft glowing background elements
- **Call-to-Action Button:** Large, prominent "Start" button
  - Color: Rose/pink gradient
  - Hover effect: Slight scale + glow
  - Text: "Start" or "Open Album"

**Design Notes:**
- Mobile-optimized layout (full screen on mobile)
- Minimal text to create anticipation
- Ambient background music fades in automatically

---

### 3.2 Interactive Animation Zone
**Purpose:** Engaging interactive buttons that trigger celebrations

**Buttons & Animations:**

#### Button 1: Launch Balloons
- **Trigger:** Click button
- **Animation:** Balloons float up from bottom using `balloons-js`
- **Color:** Mix of pink, rose, and cream balloons
- **Sound Effect:** Soft whoosh sound
- **Quantity:** 10-15 balloons per launch
- **Duration:** 3-5 seconds

#### Button 2: Falling Hearts
- **Trigger:** Click button
- **Animation:** Red/pink hearts fall from top to bottom
- **Quantity:** 20-30 hearts
- **Duration:** 4-6 seconds
- **Sound Effect:** Gentle chime sound
- **Physics:** Gentle sway as they fall

#### Button 3: Sparkles Burst
- **Trigger:** Click button
- **Animation:** Colorful sparkles explode from center
- **Colors:** Mix of rose, pink, and gold sparkles
- **Quantity:** 30-50 sparkles
- **Sound Effect:** Magical twinkle sound

#### Button 4: Confetti Celebration
- **Trigger:** Click button
- **Animation:** Colorful confetti cannons shoot from sides
- **Colors:** Pastel pink, cream, rose, gold
- **Sound Effect:** Celebratory pop sound
- **Duration:** 3-4 seconds

#### Button 5: Message Display
- **Trigger:** Click button
- **Animation:** Text appears with typewriter effect, then fades
- **Messages (Rotating):**
  - "Happy Mother's Day! 🎈"
  - "You mean the world to me 💕"
  - "Thank you for everything, Mom"
  - "Love you so much 🌸"
- **Font:** Sparkles text effect
- **Sound Effect:** None (but background music plays)

**Layout:**
- 5 buttons arranged in a grid or stack (mobile-friendly)
- Buttons have soft shadows, hover effects
- Buttons positioned above the flipbook section
- All buttons trigger animations in the viewport

---

### 3.3 Flipbook/Photo Album
**Purpose:** Interactive album showcasing 5-10 pages of photos with personal memories

**Page Structure:**
- **Total Pages:** 5-10 (customizable)
- **Photos per Page:** 3-4 depending on aspect ratio
- **Layout:** 
  - Masonry grid layout (3 columns on desktop, 1-2 on mobile)
  - Photos have soft rounded corners
  - Soft drop shadows for depth

**Each Page Contains:**
- **Photos:** Hardcoded from `/public/assets/photos/`
- **Memory/Caption:** Handwritten-style text (using Playfair Display serif font)
- **Date:** (e.g., "March 15, 2024")
- **Layout Example:**
  ```
  +------------------+
  |  [Photo 1] [Photo 2]
  |  [Photo 3] [Photo 4]
  |
  | "A beautiful memory from our trip..."
  | - Date: Summer 2023
  +------------------+
  ```

**Navigation:**
- **Previous/Next Buttons:** 
  - Positioned at bottom center
  - Arrows or text-based (Previous | Next)
  - Disabled on first/last pages
- **Page Indicator:** "Page 3 of 8" display
- **Swipe Support:** Swipe left/right on mobile to navigate

**Animations:**
- Pages fade in/out smoothly (300ms transition)
- Photos have subtle zoom-in effect on load
- Memories text fades in after photos load

**Design Notes:**
- White/cream background for album pages
- Soft pink border or shadow around the album container
- Responsive: Full width on mobile, contained on desktop

---

### 3.4 End Screen
**Purpose:** Heartfelt conclusion with celebration and option to restart

**Components:**
- **Thank You Message:** 
  - Text: "Thank you for being the best mom"
  - Font: Sparkles text effect
  - Animation: Fade in + scale
- **Confetti Burst:** Auto-triggered when page loads
  - Multiple confetti cannons
  - Duration: 5-7 seconds
  - Colors: Pastel pink, cream, rose, gold
- **Decorative Elements:** Floating flowers or hearts
- **Action Buttons:**
  - "Back to Start" button (prominent)
  - Optional: "Share" or "Download" (future feature)

**Sound:** Celebratory background music peaks here, then fades

---

## 4. Color Palette

### Primary Colors (Soft Pastel Theme)
- **Background:** `#FFF9F7` (Off-white/cream)
- **Primary Pink:** `#FFC0CB` (Light pink)
- **Accent Rose:** `#F4A6C1` (Mauve rose)
- **Dark Rose:** `#C85A7C` (Darker rose for text)
- **Gold Accent:** `#E8D4B8` (Warm gold for sparkles)

### Secondary Colors
- **White:** `#FFFFFF` (Clean backgrounds)
- **Light Cream:** `#FAF6F3` (Subtle backgrounds)
- **Soft Purple:** `#E6D9F0` (Optional accent)

### Text Colors
- **Headings:** `#C85A7C` (Dark rose)
- **Body Text:** `#5A4A4A` (Dark brown/gray)
- **Hover States:** `#F4A6C1` (Mauve rose)

---

## 5. Asset Requirements

### 5.1 File Structure
```
project-root/
├── public/
│   └── assets/
│       ├── photos/
│       │   ├── photo1.jpg
│       │   ├── photo2.jpg
│       │   ├── photo3.jpg
│       │   ├── photo4.jpg
│       │   ├── photo5.jpg
│       │   ├── photo6.jpg
│       │   ├── photo7.jpg
│       │   ├── photo8.jpg
│       │   ├── photo9.jpg
│       │   └── photo10.jpg
│       ├── audio/
│       │   ├── backgroundMusic.mp3
│       │   ├── balloonPop.mp3
│       │   ├── heartChime.mp3
│       │   ├── sparkleSound.mp3
│       │   ├── confettiPop.mp3
│       │   └── messageAppear.mp3
│       └── data/
│           └── albumData.json
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── balloons.tsx
│   │   │   ├── sparkles-text.tsx
│   │   │   ├── button.tsx
│   │   │   ├── confetti.tsx
│   │   │   └── flipbook.tsx
│   │   ├── LandingPage.tsx
│   │   ├── InteractionZone.tsx
│   │   ├── Album.tsx
│   │   └── EndScreen.tsx
│   ├── hooks/
│   │   └── useAudio.ts
│   ├── lib/
│   │   └── utils.ts
│   ├── App.tsx
│   └── index.css
```

### 5.2 Audio Assets

#### Background Music
- **File:** `backgroundMusic.mp3`
- **Genre:** Ambient/Nature sounds (birds, gentle rain)
- **Duration:** 3-5 minutes (loops)
- **Mood:** Calm, emotional, sentimental
- **Recommendations:**
  - Royalty-free from: Pixabay, Freepik, or Epidemic Sound
  - Example search: "ambient nature sounds relaxing"

#### Sound Effects
- **Balloon Pop:** `balloonPop.mp3` (light, cheerful pop)
- **Heart Chime:** `heartChime.mp3` (gentle bell/chime sound)
- **Sparkle:** `sparkleSound.mp3` (magical twinkle)
- **Confetti:** `confettiPop.mp3` (celebratory popping sound)
- **Message:** `messageAppear.mp3` (optional soft tone for text reveal)

**Volume Levels:**
- Background music: 30-40% volume
- Sound effects: 50-60% volume
- Mutable toggle in top-right corner

### 5.3 Photo Assets

**Count:** 8-10 photos (minimum 3-4 per page for 5-10 pages)  
**Format:** JPG/PNG  
**Resolution:** 1080x1080px minimum (high quality)  
**Aspect Ratios:** Mix of square (1:1), portrait (9:16), landscape (16:9)  
**Content:** Personal family photos with your mother  
**Backup Option:** If unavailable, use Unsplash royalty-free photos (search: "family moments", "mother and child")

---

## 6. Data Structure

### 6.1 Album Data (albumData.json)
```json
{
  "pages": [
    {
      "pageNumber": 1,
      "photos": [
        "photo1.jpg",
        "photo2.jpg",
        "photo3.jpg"
      ],
      "memory": "A beautiful memory from our trip to the mountains. You made every moment special with your warmth and love.",
      "date": "Summer 2023"
    },
    {
      "pageNumber": 2,
      "photos": [
        "photo4.jpg",
        "photo5.jpg"
      ],
      "memory": "Laughing together in the kitchen while baking your favorite cookies. These are the moments I treasure the most.",
      "date": "December 2022"
    }
    // ... more pages
  ]
}
```

### 6.2 Component Props Structure
```typescript
interface PageData {
  pageNumber: number;
  photos: string[];
  memory: string;
  date: string;
}

interface AlbumConfig {
  pages: PageData[];
  title: string;
  subtitle: string;
}
```

---

## 7. Interaction Flow & User Journey

```
START
  ↓
[Landing Page] → "Start" button clicked
  ↓
[Interactive Zone] ← Background music plays (looped)
  ├─ User clicks "Launch Balloons" → Balloons animate + sound effect
  ├─ User clicks "Falling Hearts" → Hearts fall + sound effect
  ├─ User clicks "Sparkles" → Sparkles burst + sound effect
  ├─ User clicks "Confetti" → Confetti explodes + sound effect
  ├─ User clicks "Message" → Text displays with typewriter effect
  │
  └─ User clicks "Next" or scrolls down
    ↓
[Flipbook Album]
  ├─ Page 1 displayed with photos + memory + date
  ├─ User swipes/clicks "Next" to navigate
  ├─ Pages 2-8 display with different photos and memories
  │
  └─ Last page reached
    ↓
[End Screen]
  ├─ "Thank you" message appears
  ├─ Confetti burst auto-triggers
  ├─ "Back to Start" button visible
  │
  └─ User clicks "Back to Start"
    ↓
[Return to Landing Page or Interactive Zone]
```

---

## 8. Responsive Design Specifications

### Mobile (< 768px)
- **Landing Page:** Full viewport, centered content
- **Buttons:** Stack vertically, full width (with padding)
- **Flipbook:** Single column layout, 1-2 photos per page
- **Navigation:** Swipe-based + touch-friendly buttons
- **Font Sizes:** Scaled down appropriately

### Tablet (768px - 1024px)
- **Buttons:** 2x3 grid layout
- **Flipbook:** 2 columns, 2-3 photos per page

### Desktop (> 1024px)
- **Buttons:** 3x2 grid or horizontal layout
- **Flipbook:** 3-4 column masonry grid
- **Contained width:** Max 1200px with centered padding

---

## 9. Accessibility Requirements

- **Color Contrast:** Ensure text meets WCAG AA standards
- **Alt Text:** All images have descriptive alt text
- **Keyboard Navigation:** All buttons/interactions accessible via keyboard
- **Screen Readers:** Proper ARIA labels for interactive elements
- **Mute Button:** Easy access to toggle audio
- **Focus Indicators:** Clear focus states for all buttons

---

## 10. Performance & Optimization

- **Image Optimization:** Compress photos to <200KB each
- **Lazy Loading:** Load flipbook pages on demand
- **Audio:** Stream rather than preload all audio files
- **Bundle Size:** Keep JS under 500KB (after compression)
- **Mobile Performance:** Target Lighthouse score > 90

---

## 11. Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## 12. Development Timeline (Estimated)

| Phase | Duration | Tasks |
|-------|----------|-------|
| **Setup** | 2 days | Repo setup, dependencies, folder structure |
| **Components** | 5 days | Balloons, Hearts, Confetti, Flipbook, Button components |
| **Pages** | 4 days | Landing, Interactive Zone, Album, End Screen |
| **Audio Integration** | 2 days | Background music, sound effects, audio hooks |
| **Styling & Polish** | 3 days | Colors, animations, responsive design |
| **Testing** | 2 days | Mobile testing, responsiveness, audio sync |
| **Deployment** | 1 day | Netlify deployment, domain setup |
| **Total** | ~2 weeks | End-to-end development |

---

## 13. Future Enhancements (Out of Scope)

- Share functionality (WhatsApp, email link)
- Download as PDF or image
- User-customizable photos (upload feature)
- Multiple language support
- Video clips in the flipbook
- Custom music upload
- Animation intensity settings

---

## 14. Success Metrics

- ✅ Website loads in < 2 seconds on mobile
- ✅ All animations trigger smoothly without lag
- ✅ Audio syncs perfectly with animations
- ✅ Flipbook navigates smoothly between pages
- ✅ Responsive on all mobile devices
- ✅ Accessibility score > 95
- ✅ Emotional impact achieved (mom loves it! 💕)

---

## 15. Dependencies to Install

```bash
npm install
  framer-motion
  balloons-js
  @radix-ui/react-slot
  class-variance-authority
  howler
  clsx
  tailwind-merge
```

---

## 16. Notes for Developer

1. **Hardcoded Assets:** Keep all assets in `/public/assets/` with simple naming convention
2. **JSON Configuration:** Store all album data in `albumData.json` for easy updates
3. **Modular Components:** Each animation is a separate reusable component
4. **Music Loop:** Ensure background music loops seamlessly without clicks/pops
5. **Mobile-First Approach:** Design for mobile first, then scale up
6. **Testing:** Test all animations on actual mobile devices (not just browser dev tools)
7. **Sound Volume:** Provide mute button and remember user preference in localStorage

---

**Document Version:** 1.0  
**Last Updated:** May 2026  
**Status:** Ready for Development ✅