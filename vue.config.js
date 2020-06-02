
module.exports = {
  css: {
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          require('postcss-px2rem')({
            remUnit: 192
          })
        ]
      }
    }
  },
  // devServer: {
  //   host: 'localhost',
  //   port: 3000,
  //   proxy: {
  //     '': {
  //       target: 'http://xf.padssz.com:9265',
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '^': ''
  //       }
  //     }
  //   }
  // },
  // build: {
  //   index: path.resolve(__dirname, '../dist/index.html'),
  //   assetsRoot: path.resolve(__dirname, '../dist'),
  //   assetsSubDirectory: 'static',
  //   assetsPublicPath: './'
  // },
  productionSourceMap: false,
  chainWebpack: (config) => {
    config.plugins.delete('prefetch')
  },
  publicPath: './',
  indexPath: 'index.html'

}
