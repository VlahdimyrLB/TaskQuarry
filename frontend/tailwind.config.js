/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {},
    colors: {
      dark: {
        100: '#191D1F',
        200: '#15171A'
      }
    },
  },
  plugins: [],
});
