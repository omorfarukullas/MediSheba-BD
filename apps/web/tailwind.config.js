/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ground: 'var(--dp-color-ground)',
        ink: 'var(--dp-color-ink)',
        'ink-secondary': 'var(--dp-color-ink-secondary)',
        'ground-muted': 'var(--dp-color-ground-muted)',
        rule: 'var(--dp-color-rule)',
        accent: 'var(--dp-color-accent)',
        field: 'var(--dp-color-field)',
        'on-field': 'var(--dp-color-on-field)',
        'on-field-secondary': 'var(--dp-color-on-field-secondary)',
        panel: 'var(--dp-color-panel)',
        'on-accent': 'var(--dp-color-on-accent)',
      },
      fontFamily: {
        sans: ['"Instrument Sans"', 'sans-serif'],
        display: ['"Host Grotesk"', 'sans-serif'],
      },
      borderRadius: {
        panel: 'var(--dp-radius-panel)',
      },
      transitionDuration: {
        interaction: 'var(--dp-motion-interaction)',
      },
      transitionTimingFunction: {
        interaction: 'var(--dp-motion-easing)',
      }
    },
  },
  plugins: [],
}
