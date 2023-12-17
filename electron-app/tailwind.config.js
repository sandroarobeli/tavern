/** @type {import('tailwindcss').Config} */
const tw = require('tw-elements-react/dist/plugin.cjs')

module.exports = {
  content: ['./src/renderer/index.html', './src/renderer/src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  plugins: [tw]
}
