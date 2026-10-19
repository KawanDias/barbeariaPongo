import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/pages/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}", "./src/app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { ink: "#0b0d0f", panel: "#15191d", gold: "#d5a54a", cream: "#f8f5ef", price: "#62d391" },
      fontFamily: { sans: ["var(--font-inter)", "Inter", "Arial", "sans-serif"] }
    }
  },
  plugins: []
};

export default config;
