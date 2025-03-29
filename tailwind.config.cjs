/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0a192f",
          light: "#ffffff",
        },
        secondary: {
          DEFAULT: "#64ffda",
          dark: "#64ffda",
          light: "#0a192f",
        },
        tertiary: {
          DEFAULT: "#112240",
          light: "#f3f4f6",
        },
        textPrimary: {
          DEFAULT: "#ccd6f6",
          light: "#1f2937",
        },
        textSecondary: {
          DEFAULT: "#8892b0",
          light: "#4b5563",
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}