/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0f0f13',
        panel: 'rgba(255, 255, 255, 0.05)',
        primary: '#4f46e5',
        'primary-hover': '#6366f1',
        text: '#e2e8f0',
        'text-muted': '#94a3b8'
      }
    },
  },
  plugins: [],
}
