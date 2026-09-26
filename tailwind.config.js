/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#070b12",
        panel: "#0d131d",
        line: "#1d2939",
        cyanx: "#22d3ee",
      },
      boxShadow: {
        glow: "0 0 30px rgba(34,211,238,.08)",
      },
    },
  },
  plugins: [],
};