module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        keyframes: {
          fadeIn: {
            'from': { opacity: '0', transform: 'translateY(20px)' },
            'to': { opacity: '1', transform: 'translateY(0)' }
          }
        },
        animation: {
          'fade-in': 'fadeIn 0.6s ease-out forwards'
        }
      },
    },
    plugins: [],
  }