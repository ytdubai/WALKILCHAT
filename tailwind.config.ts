import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // WakilChat™ Dark Luxury Theme
        background: "#0a0a0a",
        foreground: "#f5f5f5",
        primary: {
          DEFAULT: "#d4a853",
          foreground: "#0a0a0a",
          hover: "#e5b964",
          light: "#f4e4c1",
        },
        secondary: {
          DEFAULT: "#1a1a1a",
          foreground: "#f5f5f5",
        },
        accent: {
          DEFAULT: "#2a2a2a",
          foreground: "#f5f5f5",
        },
        muted: {
          DEFAULT: "#1a1a1a",
          foreground: "#999999",
        },
        border: "#2a2a2a",
        input: "#2a2a2a",
        ring: "#d4a853",
        card: {
          DEFAULT: "#141414",
          foreground: "#f5f5f5",
        },
        destructive: {
          DEFAULT: "#dc2626",
          foreground: "#f5f5f5",
        },
        success: {
          DEFAULT: "#10b981",
          foreground: "#f5f5f5",
        },
        warning: {
          DEFAULT: "#f59e0b",
          foreground: "#0a0a0a",
        },
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        lora: ['Lora', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.25rem",
      },
      boxShadow: {
        'luxury': '0 4px 20px rgba(212, 168, 83, 0.15)',
        'luxury-lg': '0 8px 30px rgba(212, 168, 83, 0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
