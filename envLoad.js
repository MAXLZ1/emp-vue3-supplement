const { resolveApp } = require('@efox/emp-cli/helpers/paths')
const DotEnvWebpack = require('dotenv-webpack')

module.exports = (config, env) => {
  // 修改加载环境变量文件：.env.(development|production)
  config.plugin('dotenv').tap((args) => {
    // eslint-disable-next-line no-param-reassign
    args[0].path = resolveApp(`.env${env ? `.${env}` : ''}`)
    return args
  })

  // 加载.env
  config.plugin('dotenv2').use(DotEnvWebpack, [
    {
      path: resolveApp('.env'),
      safe: true,
      allowEmptyValues: true,
      systemvars: true,
      silent: true,
      defaults: false,
    },
  ])
}
