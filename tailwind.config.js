/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        'mukta': ['Mukta', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
  }

