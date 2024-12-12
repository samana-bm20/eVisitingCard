/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lobster: ['Lobster', 'cursive'],
        opensans: ['Open Sans', 'sans-serif'],
        parkinsans: ['Parkinsans', 'sans-serif'],
      },
      boxShadow: {
        custom: 'rgba(51, 91, 134, 0.8) 0px 0px 10px 1px, rgba(10, 37, 64, 0.35) 0px -1px 2px 0px inset',
      },
    },
  },
  plugins: [],
}

