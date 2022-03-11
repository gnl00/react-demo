module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        '4xl': '5rem',
      },
      height: {
        '32rem': '32rem',
        '36rem': '36rem',
        '42rem': '42rem',
        '52rem': '52rem',
        '64rem': '64rem',
      },
      backgroundColor: {
        'navBg': '#3489fd',
        'navBgActive': '#1f67c1',
      }
    },
  },
  plugins: [],
}
