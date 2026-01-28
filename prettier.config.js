// prettier.config.js

/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
export default {
  semi: false,
  trailingComma: 'none',
  singleQuote: true,
  printWidth: 120,
  endOfLine: 'lf',
  tabWidth: 2,
  plugins: ['prettier-plugin-tailwindcss']
}
