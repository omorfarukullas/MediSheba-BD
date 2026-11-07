/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Ease Health Botanical Tokens
        'forest-ink': '#0f3e17',
        'forest-shadow': '#0c2f10',
        'sage-mist': '#b1dbb8',
        'keylime-wash': '#e1f4df',
        'mint-veil': '#cfe7d3',
        'slate-hush': '#b6ced5',
        'cream-paper': '#fffefc',
        charcoal: '#222222',
        'border-mist': '#efeeeb',

        // Semantic Role Mappings
        canvas: '#fffefc',
        sidebar: '#f9fbf8',
        subtle: '#e1f4df',
        border: '#efeeeb',
        'border-strong': '#b1dbb8',
        ink: '#0f3e17',
        'text-2': '#222222',
        'text-3': '#5a6e5e',
        accent: '#0f3e17',
        'accent-hover': '#0c2f10',
        'accent-pressed': '#071d0b',
        'accent-tint': '#e1f4df',

        'danger-text': '#b42318',
        'danger-bg': '#fef3f2',
        'danger-border': '#fecdca',

        'success-text': '#0f3e17',
        'success-bg': '#e1f4df',
        'success-border': '#b1dbb8',

        'warning-text': '#8c4e04',
        'warning-bg': '#fffbed',
        'warning-border': '#fde68a',

        // Semantic compatibility mappings
        ground: '#fffefc',
        'ground-muted': '#e1f4df',
        panel: '#fffefc',
        rule: '#efeeeb',
        'ink-secondary': '#222222',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Noto Serif Bengali"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', '"Noto Sans Bengali"', '"Suisse Intl"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        bn: ['"Noto Sans Bengali"', '"Noto Serif Bengali"', '"Kalpurush"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        nav: '7px',
        sm: '7px',
        md: '14px',
        lg: '14px',
        xl: '14px',
        cards: '14px',
        buttons: '14px',
        pill: '999px',
        full: '9999px',
        panel: '14px',
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
