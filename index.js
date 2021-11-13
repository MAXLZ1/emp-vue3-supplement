const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = ({ less }) => (fn) => (ec) => {
  const { config, env } = ec
  const isDev = env === 'development'

  function getStyleLoader(modules = false, preLoader = {}) {
    return {
      [isDev ? 'vue-style-loader' : 'extract-css-loader']: {
        loader: isDev ? require.resolve('vue-style-loader') : MiniCssExtractPlugin.loader,
      },
      'css-loader': {
        loader: require.resolve('css-loader'),
        options: {
          sourceMap: false,
          importLoaders: 2,
          modules: modules ? {
            localIdentName: '[name]_[local]_[hash:base64:5]',
          } : modules,
        },
      },
      'postcss-loader': {
        loader: require.resolve('postcss-loader'),
        options: {
          postcssOptions: {
            hideNothingWarning: true,
          },
        },
      },
      ...preLoader,
    }
  }

  const lessLoader = {
    'less-loader': {
      loader: require.resolve('less-loader'),
      options: {
        lessOptions: {
          javascriptEnabled: true,
        },
        ...less,
      },
    },
  }

  // 清除 .css/.less loader
  config.module.rule('css').uses.clear()
  config.module.rule('less').uses.clear()

  config.merge({
    module: {
      rule: {
        css: {
          oneOf: {
            'vue-module': {
              resourceQuery: /module/,
              use: {
                ...getStyleLoader(true),
              },
            },
            normal: {
              use: {
                ...getStyleLoader(),
              },
            },
          },
        },
        less: {
          oneOf: {
            'vue-module': {
              resourceQuery: /module/,
              use: {
                ...getStyleLoader(true, lessLoader),
              },
            },
            normal: {
              use: {
                ...getStyleLoader(false, lessLoader),
              },
            },
          },
        },
      },
    },
  })
  return fn && fn(ec)
}
