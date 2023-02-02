/** @type {import('tailwindcss').Config} */

// 1px === 0.0625rem === 0.25
// 4px === 0.25rem === 1
// 5px === 0.3125rem === 1.25
// 10px === 0.625rem === 2.5
// 14px === 0.875rem === 3.5

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      minWidth: {
        24: '96px',
        40: '160px',
      },
      maxWidth: {
        175: '700px',
      },
      width: {
        '1/10': '10%',
        '3/10': '30%',
        '9/10': '90%',
      },
      fontSize: {
        symbol: ['0.625rem', '0.875rem'],
      },
      spacing: {
        50: '12.5rem',
      },
    },
  },
  plugins: [],
}
