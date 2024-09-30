const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%)",
      },
      backgroundBlendMode: {
        "multiply-multiply": "multiply,multiply",
      },
      height: {
        "8/9": "88%",
      },
      width: {
        "8/9": "88%",
        "6/7": "85.7142857%",
        "1/7": "14.2857143%",
      },
      spacing: {
        100: "30rem",
        128: "32rem",
      },
      keyframes: {
        slidein: {
          from: {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        tilt: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(5deg)" },
          "50%": { transform: "rotate(-5deg)" },
          "75%": { transform: "rotate(5deg)" },
        },
      },
      animation: {
        slidein: "slidein 1s ease var(--slidein-delay, 0) forwards",
        scroll: "scroll 20s linear infinite",
        tilt: "tilt 0.5s infinite ease-in-out",
      },
    },
  },
  plugins: [],
});
