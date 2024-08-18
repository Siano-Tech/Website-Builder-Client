/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'indigo': {
          '50': '#f4f2ff',
          '100': '#ece7ff',
          '200': '#dad3ff',
          '300': '#c0b0ff',
          '400': '#a183ff',
          '500': '#8450ff',
          '600': '#813efb',
          '700': '#671be6',
          '800': '#5616c1',
          '900': '#48149e',
          '950': '#2b0a6b',
        },
      },
    },
  },
  plugins: [
    require('@headlessui/tailwindcss')({ prefix: 'ui' })
  ],
}

