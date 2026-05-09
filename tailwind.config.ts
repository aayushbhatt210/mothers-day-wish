import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FFF9F7",
        "light-cream": "#FAF6F3",
        "primary-pink": "#FFC0CB",
        "accent-rose": "#F4A6C1",
        "dark-rose": "#C85A7C",
        "warm-gold": "#E8D4B8",
        "body-text": "#5A4A4A",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(200, 90, 124, 0.12)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        float: "float 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
