/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#F3F6FA',
          200: '#EEF4FE',
          300: '#5596F6',
          400: '#4864DA',
        },
      },
    },
  },
  plugins: [],
};
