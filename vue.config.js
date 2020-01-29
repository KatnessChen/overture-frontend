module.exports = {
  configureWebpack: (config) => {
    console.log(config);
    // if (process.env.NODE_ENV === 'production') {
    //   console.log(config);
    // }
  },
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