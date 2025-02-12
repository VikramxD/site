/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'garamond': ['EB Garamond', 'serif'],
      },
      maxWidth: {
        'content': '650px',
      },
      backgroundColor: {
        dark: '#000000'
      },
      colors: {
        dark: {
          900: '#000000', // OLED black
          800: '#000000',
          700: '#000000',
          600: '#2D2D2D',
          500: '#3D3D3D',
          400: '#4D4D4D',
          300: '#606060',
          200: '#757575',
          100: '#9E9E9E',
          50: '#CFCFCF',
        },
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' }
        }
      },
      animation: {
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
      gridTemplateColumns: {
        'auto-fit': 'repeat(auto-fit, minmax(250px, 1fr))',
      },
    },
  },
  plugins: [],
};