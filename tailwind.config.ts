import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // dark mode toggled via class
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // 🎨 Brand Colors
      colors: {
        brand: {
          teal: "#0D9488", // calm/order
          azure: "#2563EB", // focus/flow
          purple: "#8B5CF6", // creativity
        },
        neutral: {
          light: "#F9FAFB",
          dark: "#111827",
          gray: "#6B7280",
        },
        success: "#22C55E",
        warning: "#FACC15",
        danger: "#EF4444",
      },

      // 🔠 Typography
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        // 📱 Responsive scale
        xs: ["0.75em", { lineHeight: "1rem" }], // 12px
        sm: ["0.875em", { lineHeight: "1.25rem" }], // 14px
        base: ["1em", { lineHeight: "1.5rem" }], // 16px
        lg: ["1.125em", { lineHeight: "1.75rem" }], // 18px
        xl: ["1.25em", { lineHeight: "1.75rem" }], // 20px
        "2xl": ["1.5em", { lineHeight: "2rem" }], // 24px
        "3xl": ["1.875em", { lineHeight: "2.25rem" }], // 30px
        "4xl": ["2.25em", { lineHeight: "2.5rem" }], // 36px
        "5xl": ["3em", { lineHeight: "1" }], // 48px
        "6xl": ["6em", { lineHeight: "1" }], // 60px
      },

      // 📏 Spacing & Layout
      spacing: {
        "4.5": "1.125rem", // 18px
        "18": "4.5rem", // 72px
        "30": "7.5rem", // 120px
      },

      // 📱 Breakpoints
      screens: {
        xs: "480px", // very small
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },

      // 🪄 Shadows & Effects
      boxShadow: {
        soft: "0 2px 8px rgba(0,0,0,0.06)",
        card: "0 4px 20px rgba(0,0,0,0.08)",
        "inner-glow": "inset 0 2px 4px rgba(0,0,0,0.06)",
      },

      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
