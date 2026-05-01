import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#17212b",
        paper: "#f6f4ef",
        clay: "#b9654d",
        moss: "#4f6f52",
        steel: "#4e6b78",
        gold: "#c69b44"
      },
      boxShadow: {
        panel: "0 18px 60px rgba(23, 33, 43, 0.12)"
      }
    },
  },
  plugins: [],
};

export default config;
