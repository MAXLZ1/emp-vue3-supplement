# emp-vue3-supplement

> 对`@efox/emp-vue3`的补充配置，以支持`.vue`文件中使用 [CSS Module](https://v3.cn.vuejs.org/api/sfc-style.html#style-module)

## Use

`emp.config.js`
```js
const withFrameWork = require('@efox/emp-vue3')

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
