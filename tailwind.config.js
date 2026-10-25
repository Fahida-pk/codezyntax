const v = n => `rgb(var(--${n}) / <alpha-value>)`
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: {
    colors: { surface: v('surface'), canvas: v('canvas'), heading: v('heading'), body: v('body'), muted: v('muted'), line: v('line'),
      accent: { DEFAULT: v('brand'), dark: v('brand-strong'), cyan: v('brand-soft'), btn: v('btn') } },
    fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'], display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'] },
    keyframes: { marquee: { to: { transform: 'translateX(-50%)' } } },
    animation: { marquee: 'marquee 40s linear infinite' }
  } },
  plugins: []
}
