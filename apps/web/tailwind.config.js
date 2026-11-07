/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Direct System Tokens
        'indigo-bolt': '#4570ff',
        'indigo-bolt-hover': '#345ee6',
        'ember-orange': '#ff6808',
        'lime-highlighter': '#c6ff94',
        'lavender-mist': '#ebdcff',
        'ice-blue': '#d6e0ff',
        'lilac-bloom': '#c293f1',
        'deep-navy': '#193f78',
        'forest-sage': '#244f47',
        'warm-bone': '#f1f0ec',
        'paper-white': '#ffffff',
        'ink-black': '#000000',
        hairline: '#e5e7eb',
        stone: '#d1d5db',
        smoke: '#6e6d6c',
        graphite: '#555555',

        // Semantic aliases
        ground: '#ffffff',
        'ground-muted': '#f1f0ec',
        bone: '#f1f0ec',
        panel: '#ffffff',
        ink: '#000000',
        'ink-secondary': '#6e6d6c',
        rule: '#e5e7eb',
        accent: '#4570ff',
        'on-accent': '#ffffff',
        field: '#000000',
        'on-field': '#ffffff',
        'on-field-secondary': '#d1d5db',
      },
      fontFamily: {
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        script: ['"Caveat"', '"Nanum Pen Script"', 'cursive'],
        display: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        pill: '9999px',
        hero: '40px',
        card: '20px',
        nav: '16px',
        input: '12px',
        icon: '8px',
        panel: '20px',
      },
      transitionDuration: {
        interaction: '160ms',
      },
      transitionTimingFunction: {
        interaction: 'ease-out',
      },
      boxShadow: {
        none: 'none',
      }
    },
  },
  plugins: [],
}
