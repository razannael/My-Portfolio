/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#060611",
        secondary: "#a1a1b5",
        tertiary: "#0f0f23",
        "black-100": "#0a0a1a",
        "black-200": "#06060f",
        "white-100": "#f3f3f3",
        accent: "#818cf8",
      },
      boxShadow: {
        card: "0px 35px 120px -15px rgba(129,140,248,0.08)",
        glow: "0 0 40px rgba(129,140,248,0.15)",
      },
      screens: {
        xs: "450px",
      },
    },
  },
  plugins: [],
};
