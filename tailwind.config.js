/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#ccff00",
        base: "#0b0c0e",
        surface: "#15171b",
        surface2: "#1c1f24",
        border: "#2a2d33",
        muted: "#9aa0aa",
      },
      fontFamily: {
        display: ["var(--font-oswald)"],
        body: ["var(--font-inter)"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
