/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#141414",
        "blue": "#3575E2",
        "bla":"#2196F3",
        "bl":"#0096FF",
        "ab":"#2196F3",
        "col":"#1e40af",
        "gray":"#f5f5f5",
        "light":"#d1d5db",
      " gris": "#d6d3d1",
       "rmadi" :"#d1d5db",
       "pink":"#F98080",
       "grays":"#E5E7EB",
       "blue-100":"#E1EFFE",
       "blue-50":"#EBF5FF"
      },
      keyframes: {
        slideUnder: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(100%)' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        slideUnder: 'slideUnder 1s forwards',
        fadeOut: 'fadeOut 1s forwards',
        fadeIn: 'fadeIn 1s forwards',
      },
    },
  },
  plugins: [],
}
