// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./*.html",
    "./src/**/*.{js,ts,html}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#E51728", // Primary Red
        darkblue: "#191D32", // Dark Blue
        lightgrey: "#F2F2F3", // Light Grey
      },
    },
  },
  plugins: [],
};
