![LOGO](https://pic.imgdb.cn/item/601ec9183ffa7d37b3a637a7.png)

项目地址：<https://github.com/Passkou/bilibili-article-md>

# bilibili-md-js

一个可将 Markdown 格式转换成b站专栏格式的油猴脚本

# 特性

+ 一键转换，可以将 Markdown 文件直接拖入专栏编辑器。
+ 表格使用 [canvas-table](https://www.npmjs.com/package/canvas-table) 转换为图片以便阅读。
+ 图片自动下载后上传到b站服务器（仅限网络URL），需要给予完整的网络权限。
+ 支持代码、公式，一切都是自动转换。

# 安装

本脚本使用了 [TamperMonkey](https://www.tampermonkey.net/) 插件。请先安装此插件后再使用。

推荐使用 [FireFox](https://www.firefox.com.cn/) 浏览器，国内用户无需翻墙。

你可以在支持的浏览器的应用商店上一键安装油猴，这里不再赘述。

安装本脚本方式：

## 手动安装

1) 下载 [dist/bilibili-article-md.user.js](https://raw.githubusercontent.com/Passkou/bilibili-article-md/main/dist/bilibili-article-md.user.js) 文件（可能使用浏览器打开后也会唤起安装界面）。
2) 拖入浏览器将会自动唤起安装界面。

## Greasy Fork

1) 进入网址：<https://greasyfork.org/zh-CN/scripts/421327-bilibili-article-md>。
2) 点击 `安装此脚本` 即可安装。

# 用法

由于前端限制，需要遵循以下几点即可正常使用。特别是加粗部分。

1) 打开 [专栏投稿](https://member.bilibili.com/platform/upload/text/edit)。
2) 确认是否显示以下图标

![](https://pic.imgdb.cn/item/601ec9b43ffa7d37b3a67893.jpg)

3) **先激活一下编辑框，并随意输入一个字符。**

4) 可以点击这个图标选择 Markdown 文件，也可以拖拽文件到编辑框快捷上传。

5) 如果 Markdown 中含有图片，将会自动下载图片并上传，由于下载图片需要跨源，会弹出以下窗口，请给予完整权限，否则无法下载图片并上传到b站服务器。

![](https://pic.imgdb.cn/item/601ecaed3ffa7d37b3a6f024.jpg)

6) 等待文章加载完成后，**点击任意位置再随意输入一个字符**。

7) 确认已输入字符统计是否变化，变化了表示已正常载入文章。

![](https://pic.imgdb.cn/item/601eca5e3ffa7d37b3a6b910.jpg)