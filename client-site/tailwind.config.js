const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'xs': '200px',
      ...defaultTheme.screens,
    },
    scale: {
      '0': '0',
      '25': '.25',
      '50': '.5',
      '75': '.75',
      '90': '.9',
      '95': '.95',
      '100': '1',
      '105': '1.05',
      '110': '1.1',
      '125': '1.25',
      '150': '1.5',
      '200': '2',
      '500': '5'
    },
    extend: {
      width: {
        '500': '50rem',
        '400': '40rem',
        '300': '30rem',
        '250': '25rem',
        '200': '20rem',
      }
    }
  },
  variants: {},
  plugins: [],
}
