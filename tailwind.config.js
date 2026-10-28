const v = n => `rgb(var(--${n}) / <alpha-value>)`

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: v('surface'),
        canvas: v('canvas'),
        heading: v('heading'),
        body: v('body'),
        muted: v('muted'),
        line: v('line'),
        lime: v('lime'),
        accent: {
          DEFAULT: v('brand'),
          dark: v('brand-strong'),
          cyan: v('brand-soft'),
          btn: v('btn'),
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'Menlo', 'monospace'],
      },
      keyframes: {
        marquee: { to: { transform: 'translateX(-50%)' } },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
      },
    },
  },
  plugins: [],
}