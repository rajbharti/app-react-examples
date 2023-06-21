/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Arial", "Helvetica", "sans"],
    },
    minWidth: {
      "30px": "30px",
    },
    maxHeight: {
      "253px": "253px",
    },
    extend: {},
  },
  plugins: [],
};
