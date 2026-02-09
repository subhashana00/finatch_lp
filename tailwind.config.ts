import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0F0F11",
          50: "#1C1C1F",
          100: "#191919",
          200: "#161618",
          300: "#131315",
          400: "#0F0F11",
          500: "#0C0C0E",
          600: "#09090A",
          700: "#060607",
          800: "#030303",
          900: "#000000",
        },
        accent: {
          DEFAULT: "#7167EA",
          50: "#F0EFFD",
          100: "#E0DEFB",
          200: "#C1BCF7",
          300: "#A59EF2",
          400: "#8B83EF",
          500: "#7167EA",
          600: "#5B50D9",
          700: "#4840B8",
          800: "#363097",
          900: "#242076",
        },
        secondary: {
          DEFAULT: "#8B83EF",
          50: "#F3F2FE",
          100: "#E6E4FD",
          200: "#CCC9FB",
          300: "#B3AEF9",
          400: "#9F98F4",
          500: "#8B83EF",
          600: "#7167EA",
          700: "#5B50D9",
          800: "#4840B8",
          900: "#363097",
        },
        navy: "#0F0F11",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        display: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-gradient": "linear-gradient(135deg, #0F0F11 0%, #161618 50%, #0F0F11 100%)",
        "card-gradient": "linear-gradient(135deg, rgba(113, 103, 234, 0.1) 0%, rgba(139, 131, 239, 0.05) 100%)",
        "glow-accent": "radial-gradient(circle, rgba(113, 103, 234, 0.15) 0%, transparent 70%)",
        "glow-secondary": "radial-gradient(circle, rgba(139, 131, 239, 0.15) 0%, transparent 70%)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "float-fast": "float 4s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "gradient-shift": "gradient-shift 8s ease infinite",
        "slide-up": "slide-up 0.5s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
        "spin-slow": "spin 20s linear infinite",
        "counter": "counter 2s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(113, 103, 234, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(113, 103, 234, 0.6)" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "slide-up": {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      boxShadow: {
        "glow-sm": "0 0 15px rgba(113, 103, 234, 0.3)",
        "glow-md": "0 0 30px rgba(113, 103, 234, 0.4)",
        "glow-lg": "0 0 60px rgba(113, 103, 234, 0.5)",
        "glow-purple": "0 0 30px rgba(113, 103, 234, 0.4)",
        "glass": "0 8px 32px rgba(0, 0, 0, 0.3)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
