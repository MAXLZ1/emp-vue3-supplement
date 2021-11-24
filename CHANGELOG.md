# 1.3.2(2021-11-24)

## Bug Fixes
修复`loaderOptions`未判断`less`、`sass`、`stylus`选项`undefined`的情况

## Features
1. `asset/resource`替代`url-laoder`处理`svg`
2. `mini-css-extract-plugin`关闭`experimentalUseImportModule`用以解决打包过程中出现的`Invalid URL`问题
