const { tailwindExtractor } = require('tailwindcss/lib/lib/purgeUnusedStyles')
const colors = require('tailwindcss/colors')

const svelteClassColonExtractor = (content) => {
  return content.match(/(?<=class:)([a-zA-Z0-9_-]+)/gm) || []
}

module.exports = {
  purge: {
    enabled: !process.env.ROLLUP_WATCH,
    content: [
      './src/**/*.svelte',
      './src/**/*.html',
      './src/**/*.css',
      './index.html',
    ],
    preserveHtmlElements: true,
    options: {
      safelist: [/svelte-/],
      defaultExtractor: (content) => {
        // WARNING: tailwindExtractor is internal tailwind api
        // if this breaks after a tailwind update, report to svite repo
        return [
          ...tailwindExtractor(content),
          ...svelteClassColonExtractor(content),
        ]
      },
      keyframes: true,
    },
  },
  theme: {
    extend: {
      colors: {
        cyan: colors.cyan,
      },
    },
  },
  variants: {},
  plugins: [],
}
