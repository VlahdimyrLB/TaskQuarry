/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {},
    colors: {
      dark: {
        primary: "#191D1F",
        secondary: "#15171A",
      },

      lightWhite: "#E6EDF3" //for text
    },
  },
  plugins: [],
});
