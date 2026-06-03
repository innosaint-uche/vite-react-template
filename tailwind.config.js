/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        legali: {
          orange: '#E05A00',
          'orange-light': '#FF6B0D',
          'orange-dark': '#B84800',
          dark: '#1A1A1A',
          charcoal: '#2D2D2D',
          gray: '#6B7280',
          'gray-light': '#9CA3AF',
          light: '#F8F4F0',
          cream: '#FDF8F4',
          border: '#E8E0D8',
          success: '#22C55E',
          warning: '#F59E0B',
          error: '#EF4444',
          info: '#3B82F6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        legali: '0 4px 24px rgba(224, 90, 0, 0.15)',
        'legali-lg': '0 8px 40px rgba(224, 90, 0, 0.20)',
        card: '0 2px 16px rgba(0,0,0,0.06)',
        'card-hover': '0 8px 32px rgba(0,0,0,0.12)',
      },
    },
  },
  plugins: [],
};
