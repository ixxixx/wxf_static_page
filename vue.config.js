module.exports = {
  css: {
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          require('postcss-px2rem')({
            remUnit: 60
          })
        ]
      }
    }
  },
  devServer: {
    host: 'localhost',
    port: 3000,
    proxy: {
      '': {
        target: 'http://192.168.0.2:8888',
        changeOrigin: true,
        pathRewrite: {
          '^': ''
        }
      }
    }
  },
  productionSourceMap: true,
  chainWebpack: (config) => {
    config.plugins.delete('prefetch')
  }

}
