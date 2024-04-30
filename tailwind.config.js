/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  
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

