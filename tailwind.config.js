/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#f0f7ff',
          100: '#e0effe',
          500: '#0070f3', 
          600: '#0056b3',
          800: '#003366',
          900: '#002147',
        },
        accent: {
          500: '#14b8a6',
        }
      }
    },
  },
  plugins: [],
}