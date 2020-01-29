module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/overture-frontend'
    : '/',
  css: {
    loaderOptions: {
      sass: {
        prependData: "@import '@/scss/global.scss';",
      },
    },
  },
}