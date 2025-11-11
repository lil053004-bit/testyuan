/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-primary': '#0a0e1a',
        'dark-secondary': '#1a1f2e',
        'dark-card': '#151923',
        'accent-red': '#dc2626',
        'accent-red-dark': '#b91c1c',
        'navy-dark': '#1a1f3a',
        'navy-blue': '#1a2235',
        'navy-card': '#202847',
        'blue-border': '#4A90E2',
        'orange-bright': '#FF9500',
        'orange-dark': '#FF6B00',
        'green-label': '#06C755',
        'ai-blue-light': '#A5D8FF',
        'ai-blue': '#74C0FC',
        'yellow-warning': '#FFC107',
      },
      backgroundImage: {
        'dark-gradient': 'linear-gradient(to bottom right, #0a0e1a, #111827, #0a0e1a)',
        'red-glow': 'radial-gradient(circle, rgba(220, 38, 38, 0.2), transparent)',
        'orange-gradient': 'linear-gradient(to right, #FF9500, #FF6B00)',
        'ai-gradient': 'linear-gradient(135deg, #A5D8FF, #74C0FC)',
        'navy-gradient': 'linear-gradient(to bottom right, #1a1f3a, #1a2235)',
      },
      boxShadow: {
        'red-glow': '0 0 20px rgba(220, 38, 38, 0.5)',
        'red-glow-lg': '0 0 40px rgba(220, 38, 38, 0.6)',
        'orange-glow': '0 8px 32px rgba(255, 149, 0, 0.4)',
        'orange-glow-lg': '0 12px 48px rgba(255, 149, 0, 0.6)',
        'blue-glow': '0 4px 16px rgba(74, 144, 226, 0.3)',
        '3d-depth': '0 10px 30px rgba(0, 0, 0, 0.5), 0 4px 8px rgba(0, 0, 0, 0.3)',
        'inner-3d': 'inset 0 2px 4px rgba(0, 0, 0, 0.3)',
      },
      animation: {
        'pulse-red': 'pulse-red 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'shine': 'shine 2s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.6s ease-out',
      },
      keyframes: {
        'pulse-red': {
          '0%, 100%': { opacity: 1, boxShadow: '0 0 20px rgba(220, 38, 38, 0.5)' },
          '50%': { opacity: 0.8, boxShadow: '0 0 40px rgba(220, 38, 38, 0.8)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'shine': {
          '0%': { left: '-100%' },
          '50%': { left: '100%' },
          '100%': { left: '100%' },
        },
        'fade-in-up': {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
