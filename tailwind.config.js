/* eslint-disable import/no-anonymous-default-export */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}",],
  theme: {
    extend: {},
    colors: {
      background: '#2C7784',
      backgroundClear: '#2c779a',
      orange: {
        DEFAULT: '#FCB62D',
        clear: '#FDD27D',
      },
      white: '#FFFF',
      red: {
        DEFAULT: '#FF3030',
        dark: '#BF1D33',
      },
      yellow: {
        DEFAULT: '#FFEA30',
        dark: '#EACC1F'
      } ,
      green: {
        DEFAULT: '#30FF38',
        dark: '#57A22B',
      },
      blue: {
        DEFAULT: '#3083FF',
        dark: '#004D9E',
      },
      black: {
        DEFAULT: '#000000',
        dark: '#004D9E',
      },
      grey: {
        DEFAULT: '#D9D9D9',
        dark: '#004D9E',
      },
      text: '#2B2B2B',
    },
    fontFamily: {
      font: ['Josefin Sans', 'sans-serif']
    }
  },
  plugins: [],
}

