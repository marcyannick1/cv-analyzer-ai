// tailwind.config.js
module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    
    theme: {
      extend: {
        fontFamily: {
          'inter': ['Inter', 'system-ui', 'sans-serif']
        },
        colors: {
          primary: {
            50: '#f0fdf4',
            100: '#dcfce7',
            200: '#bbf7d0',
            300: '#86efac',
            400: '#4ade80',
            500: '#22c55e',
            600: '#16a34a',
            700: '#15803d',
            800: '#166534',
            900: '#14532d',
          },
          'gradient-start': '#10b981',
          'gradient-end': '#059669'
        },
        animation: {
          'fade-in': 'fadeIn 0.5s ease-out',
          'slide-up': 'slideUp 0.6s ease-out',
          'bounce-subtle': 'bounceSubtle 2s infinite',
          'glow': 'glow 2s ease-in-out infinite alternate',
          'float': 'float 6s ease-in-out infinite',
          'shake': 'shake 0.5s ease-in-out',
          'pulse-ring': 'pulse-ring 1.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite'
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0', transform: 'translateY(10px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' }
          },
          slideUp: {
            '0%': { opacity: '0', transform: 'translateY(20px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' }
          },
          bounceSubtle: {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-5px)' }
          },
          glow: {
            '0%': { boxShadow: '0 0 5px rgb(34, 197, 94), 0 0 10px rgb(34, 197, 94), 0 0 15px rgb(34, 197, 94)' },
            '100%': { boxShadow: '0 0 10px rgb(34, 197, 94), 0 0 20px rgb(34, 197, 94), 0 0 30px rgb(34, 197, 94)' }
          },
          float: {
            '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
            '33%': { transform: 'translateY(-10px) rotate(1deg)' },
            '66%': { transform: 'translateY(5px) rotate(-1deg)' }
          },
          shake: {
            '0%, 100%': { transform: 'translateX(0)' },
            '25%': { transform: 'translateX(-5px)' },
            '75%': { transform: 'translateX(5px)' }
          },
          'pulse-ring': {
            '0%': {
              transform: 'scale(.33)',
            },
            '80%, 100%': {
              opacity: '0',
            }
          }
        },
        backdropBlur: {
          xs: '2px'
        }
      }
    },
    plugins: [],
  }
  
 