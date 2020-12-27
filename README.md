# hexo-service-worker-tooltip

> 本项目是基于 [hexo-service-worker](https://github.com/zoumiaojiang/hexo-service-worker) 实现的，主要用于解决在使用过程遇到的一些问题。

## 安装

```bash
npm i git+https://github.com/DaiwenZh5/hexo-service-worker-tooltip#1.0.0 --save
```

## 用法

安装插件后，直接配置 `_config.yml` 文件如下就可以了：
主要添加了 `withUpdate` 属性，用于自定义更新提示（原来的内置样式不喜欢）。
其他的和原插件配置一样。
但是此处需要手动在 `index.html` （或其他布局文件中）手动引入 `sw.js` 文件 (原插件是自动注入的，但我这边没有生效，public 输出正常，但 hexo server 运行时加载不到，本着所见即所得的原则，我就认为自动注入失败了)，如：
```ejs
<!-- index.ejs中 -->
<%- js(['sw-register.js']) %>
```


```yaml
# offline config passed to sw-precache.
service_worker:
  # 指定网站检测到更新后的动作，不要引号
  # js(xxx), xxx 为一行压缩后的脚本
  withUpdate: js(alter(更新成功!);)
  # 默认为执行一段内置脚本
  # 也可以指定路径
  # withUpdate: path/xxx.js, 该文件打包时会进行语法检测
  # 但脚本最终时嵌入页面的，所以存在变量未定义的情况，
  # 为了防止输出异常信息，在文件内部没使用 "`"包裹脚本内容
  # 如：xxx.js 内
  # `
  # do something
  # `
  # 最终会去除 "`"
  maximumFileSizeToCacheInBytes: 5242880
  staticFileGlobs:
  - public/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff,woff2}
  stripPrefix: public
  verbose: true
```

以上配置是缓存 public 文件夹下面的指定静态资源和静态 html 页面的。

如果除了自身博客项目的静态资源需要缓存以外，还有第三方 CDN 静态资源的缓存需求的话，例如：

```yaml
- https://cdn.some.com/some/path/some-script.js
- http://cdn.some-else.org/some/path/deeply/some-style.css
```

这种需求也可以通过配置 `_config.yml` 完成，在 `servcie_worker` 的配置后面补全下面格式的配置即可：

```yaml
service_worker:
  runtimeCaching:
    - urlPattern: /*
      handler: cacheFirst
      options:
        origin: cdn.some.com
    - urlPattern: /*
      handler: cacheFirst
      options:
        origin: cdn.some-else.org
```

enjoy it!
