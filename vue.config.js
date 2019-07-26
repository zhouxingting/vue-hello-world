const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

const path = require('path');
const port = process.env.port || process.env.npm_config_port || 9000 // dev port
const name = 'vue Demo'

function resolve(dir) {
  return path.join(__dirname, dir)
}

function addStyleResource(rule) {
  rule
    .use('style-loader')
    .loader('style-resources-loader')
    .options({
      patterns: [path.resolve(__dirname, 'src/assets/common/variable.less')],
    });
}

module.exports = {
  lintOnSave: process.env.NODE_ENV !== 'production',
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/api': {
        target: 'http://dev.91zdd.cn',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    }
  },
  productionSourceMap: false,
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  configureWebpack: {
    plugins: [
      new LodashModuleReplacementPlugin({
        paths: true,
      }),
    ]
  },
  chainWebpack: (config) => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
    types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type))); //自动全局引入公共less文件

    // set svg-sprite-loader webpack-chain
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: '[name]'
      })
      .end()

      // set preserveWhitespace
      config.module
        .rule('vue')
        .use('vue-loader')
        .loader('vue-loader')
        .tap(options => {
          options.compilerOptions.preserveWhitespace = true
          return options
        })
        .end()
      config
      // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-source-map')
      )
      config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
            // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config.plugin('AutoDllPlugin')
          .use('autodll-webpack-plugin-4x', [{
            inject: true, // will inject the DLL bundle to index.html
            debug: true,
            filename: '[name]_bundle.js',
            path: './dll',
            entry: {
              webpack: [
                'vue',
                'vue-router',
                'vuex'
              ],
            },
          }])
          .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          config.optimization.runtimeChunk('single')
        }
      )
  },
};