/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        '1f1f1f': '#1f1f1f',
        'pholder': '#999',
        'link': 'rgb(59, 130, 246)'
      }
    },
  },
  plugins: [],
}

