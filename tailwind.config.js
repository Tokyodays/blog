/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
module.exports = {
  theme: {
    extend: {
      colors: {
        bgColor: '#fffced',
        baseColor: '#155E75',
        subColor1: '#C8C295',
        subColor2: '#86B29E',
        darkColor1: '#4A507E',
        darkColor2: '#007540'
      }
    }
  },
  variants: {},
  plugins: [],
  future: {
    purgeLayersByDefault: true,
  }
}
