/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--bg-dark)",
        sofia: {
          orange: "#FF4500",
          warm: "#FF8800"
        },
        ivan: {
          blue: "#00E5FF",
          purple: "#8A2BE2"
        }
      }
    },
  },
  plugins: [],
};
