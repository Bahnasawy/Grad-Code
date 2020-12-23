const colors = require("tailwindcss/colors")

module.exports = {
  purge: ["public/**/*.html", "src/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        teal: colors.teal,
      },
      gridTemplateRows: {
        10: "repeat(10, minmax(0, 1fr))",
        20: "repeat(20, minmax(0, 1fr))",
      },
      gridRow: {
        "span-8": "span 8 / span 8",
        "span-19": "span 19 / span 19",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["active"],
      display: ["group-hover"],
    },
  },
  plugins: [],
}
