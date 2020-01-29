module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/overture'
    : '/',
  css: {
    loaderOptions: {
      sass: {
        prependData: "@import '@/scss/global.scss';",
      },
    },
  },
}