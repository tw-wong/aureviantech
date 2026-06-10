import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-manrope)", "var(--font-inter)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        wordmark: ["var(--font-playfair)", "Georgia", "serif"],
      },
      colors: {
        primary: {
          DEFAULT: "var(--color-primary)",
          active: "var(--color-primary-active)",
          neutral: "var(--color-primary-neutral)",
          pale: "var(--color-primary-pale)",
        },
        "on-primary": "var(--color-on-primary)",
        canvas: {
          DEFAULT: "var(--color-canvas)",
          soft: "var(--color-canvas-soft)",
        },
        ink: {
          DEFAULT: "var(--color-ink)",
          deep: "var(--color-ink-deep)",
        },
        body: "var(--color-body)",
        mute: "var(--color-mute)",
        positive: {
          DEFAULT: "var(--color-positive)",
          deep: "var(--color-positive-deep)",
        },
        negative: {
          DEFAULT: "var(--color-negative)",
          darkest: "var(--color-negative-darkest)",
        },
      },
      borderRadius: {
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        pill: "var(--radius-pill)",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        float: "var(--shadow-float)",
      },
      maxWidth: {
        container: "var(--container-max)",
        text: "var(--container-text)",
      },
      transitionTimingFunction: {
        standard: "var(--ease-standard)",
      },
      keyframes: {
        "status-ping": {
          "0%": { transform: "scale(1)", opacity: "0.55" },
          "75%, 100%": { transform: "scale(2.4)", opacity: "0" },
        },
      },
      animation: {
        "status-ping": "status-ping 2.4s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
