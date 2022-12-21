/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBackground: '#131715',
        darkCard: '#1B1E1F',
        darkButton: '#06F6F6',
        darkHover: '#1B1E1F',
        darkText: '#ffffff',
        darkBorder: '#272B2A',
        primary: '#00BEA4',
      },
      transitionDuration: {
        'normal': '200'
      }
    },
  },
  plugins: [],
}