/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#ffffff',
        sidebar: '#f7f7f5',
        subtle: '#f4f4f2',
        border: '#e7e5e4',
        'border-strong': '#d6d3d1',
        ink: '#111111',
        'text-2': '#57534e',
        'text-3': '#78716c',
        accent: '#2f4bc0',
        'accent-hover': '#233a9e',
        'accent-pressed': '#1c2f80',
        'accent-tint': '#eef2ff',

        'danger-text': '#b42318',
        'danger-bg': '#fef3f2',
        'danger-border': '#fecdca',

        'success-text': '#067647',
        'success-bg': '#ecfdf3',
        'success-border': '#abefc6',

        'warning-text': '#b54708',
        'warning-bg': '#fffaeb',
        'warning-border': '#fedf89',

        // Semantic compatibility mappings
        ground: '#ffffff',
        'ground-muted': '#f4f4f2',
        panel: '#ffffff',
        rule: '#e7e5e4',
        'ink-secondary': '#57534e',
      },
      fontFamily: {
        sans: ['"Inter"', '"Noto Sans Bengali"', '"Hind Siliguri"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        bn: ['"Noto Sans Bengali"', '"Hind Siliguri"', '"Kalpurush"', '"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        pill: '9999px',
        panel: '12px',
      },
      transitionDuration: {
        interaction: '150ms',
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
