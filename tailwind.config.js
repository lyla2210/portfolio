/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: '#050505',
        muted: '#8A8A8A',
        line: '#E7E7E7',
        paper: '#FAFAFA',
        blue: '#002FA7',
        acid: '#00E676',
      },
      transitionTimingFunction: {
        quint: 'cubic-bezier(0.83, 0, 0.17, 1)',
        snap: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
