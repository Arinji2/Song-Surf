/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        theme: {
          50: "#222831",
          100: "#393E46",
          200: "#00ADB5",
          300: "#EEEEEE",
        },
      },
    },
  },
  plugins: [],
};
