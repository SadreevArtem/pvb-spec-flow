import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#17457a",
        tab: "#e9ebea",
        red: "#cd163f",
      },
    },
    screens: {
      sm: "320px",
      md: "768px",
      lg: "1280px",
      xl: "1440px",
      xxl: "2100px",
    },
  },
  plugins: [],
} satisfies Config;
