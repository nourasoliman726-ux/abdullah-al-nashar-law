// Removed TypeScript-only type import for JS file
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0B1428",
        navyDeep: "#080F1E",
        card: "#151D2F",
        cardBorder: "rgba(205,165,71,0.20)",
        cream: "#F9F8F5",
        gold: "#CDA547",
        goldSoft: "#DDBB66",
        slate: "#0F172A",
        grayText: "#BFC0C3",
      },
      fontFamily: {
        cairo: ["var(--font-cairo)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      keyframes: {
        "elnashar-pulse": {
          "0%": { boxShadow: "0 0 0 0 rgba(205,165,71,0.45)" },
          "70%": { boxShadow: "0 0 0 14px rgba(205,165,71,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(205,165,71,0)" },
        },
      },
      animation: {
        "elnashar-pulse": "elnashar-pulse 2.4s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
