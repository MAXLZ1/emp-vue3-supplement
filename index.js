const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const envLoad = require('./envLoad')

module.exports = (loaderOptions) => (fn) => (ec) => {
  const { config, env } = ec
  const isDev = env === 'development'

  envLoad(config, env)

  // 清除 .css/.less loader
  config.module.rule('css').uses.clear()
  config.module.rule('less').uses.clear()
  config.module.rule('sass').uses.clear()

  function createCSSRule(lang, test, loader, options) {
    const baseRule = config.module.rule(lang).test(test)

    const vueModuleRule = baseRule.oneOf('vue-modules').resourceQuery(/module/)
    createLoaders(vueModuleRule, true)

    const vueRule = baseRule.oneOf('vue').resourceQuery(/\?vue/)
    createLoaders(vueRule)

    const normalRule = baseRule.oneOf('normal')
    createLoaders(normalRule)

    function createLoaders(rule, forceCssModule = false) {
      if (isDev) {
        rule.use('vue-style-loader').loader(require.resolve('vue-style-loader'))
      } else {
        rule.use('extract-css-loader').loader(MiniCssExtractPlugin.loader)
      }

      rule
        .use('css-loader')
        .loader(require.resolve('css-loader'))
        .options({
          importLoaders: 2,
          modules: forceCssModule ? {
            auto: () => true,

            // localIdentName: '[name]_[local]_[hash:base64:5]',
            localIdentName: isDev ? '[path][name]-[local]-[hash:base64:5]' : '_[hash:base64:7]',
          } : forceCssModule,
        })

      rule
        .use('postcss-loader')
        .loader(require.resolve('postcss-loader'))
        .options({
          postcssOptions: {
            hideNothingWarning: true,
          },
        })

      if (loader) {
        rule
          .use(loader)
          .loader(require.resolve(loader))
          .options(options)
      }
    }
  }

  createCSSRule('css', /\.css$/)
  createCSSRule('less', /\.less$/, 'less-loader', {
    lessOptions: {
      javascriptEnabled: true,
    },
    ...loaderOptions.less,
  })
  createCSSRule('sass', /\.s(a|c)ss$/, 'sass-loader', {
    sourceMap: env === 'development',
    ...loaderOptions.sass,
  })
  createCSSRule('stylus', /.styl(us)$/, 'stylus-loader', {
    ...loaderOptions.stylus,
  })

  if (!isDev) {
    config.plugin('MiniCssExtractPlugin').use(MiniCssExtractPlugin, [
      {
        ignoreOrder: true,
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
      },
    ])
  }

  return fn && fn(ec)
}
