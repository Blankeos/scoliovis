module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        manrope: ["Manrope", "sans-serif"],
        // epilogue: ["Epilogue", "sans-serif"],
        // inter: ["Inter", "sans-serif"],
        // poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: "#0073f5",
      },
      cursor: {
        talk: "url(/cursor-chat.png), pointer",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(0deg) scale(1)" },
          "50%": { transform: "rotate(15deg) scale(1.07)" },
        },
      },
      animation: {
        wiggle: "wiggle 0.4s ease-in-out",
      },
    },
  },
  plugins: [],
};
