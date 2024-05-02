/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        // image: "url(/src/assets/slike/hug_dog.jpg)",
      },
      colors: {
        blue: {
          45: "#00222B",
          46: "#007FAC",
        },
        gold: {
          50: "#D8AD44",
        },
        black: {
          60: "#201E10",
          61: "#343A40",
          62: "#333",
        },
        white: {
          70: "#FFFFFF",
        },
        red: {
          80: "#E63946",
        },
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
