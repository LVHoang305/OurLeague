/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      width: {
        "1100": "1100px"
      },
      backgroundColor: {
        primary: "#333333",
        second: "#B81E1F",
        third: "#0349B2",
        'overlay-30': 'rgba(0,0,0,0.3)',
        'overlay-70': 'rgba(0,0,0,0.7)'
      },
      maxWidth: {
        "600" : "600px"
      },
      cursor: {
        pointer: 'pointer'
      }
    },
  },
  plugins: [],
}