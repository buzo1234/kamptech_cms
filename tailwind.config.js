/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/react-tailwindcss-select/dist/index.esm.js',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1a1c23', // light background
        secondary: '#121317', // dark background
        success: '#0e9f6e',
        inputBg: '#24262d',
        danger: '#f00',
      },
    },
  },
  plugins: [require('tailwindcss-safe-area')],
};

// navbar and header color: #1a1c23
// backgroundColor: #121317
// input field bg: #24262d
// success btn: #0e9f6e
