# emp-vue3-supplement

> 对`@efox/emp-vue3`的补充配置
> 1.支持`.vue`文件中使用 [CSS Module](https://v3.cn.vuejs.org/api/sfc-style.html#style-module)
> 2.支持`.env.development`、`.env.production`、`.env`文件定义环境变量

## Use

`emp.config.js`
```js
const withFrameWork = require('@efox/emp-vue3')
const replaceVueStyleLoader = require('emp-vue3-supplement')

module.exports = {
  compile: [withFrameWork, replaceVueStyleLoader({
    less: {
      lessOptions: {
        javascriptEnabled: true,
      },
    }
  })],
}
```

* args

```js
{
  less: {}
}
```
