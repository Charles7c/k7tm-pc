<h1 style="text-align: center">可期教学管理系统 - PC端</h1>
<div style="text-align: center">

[![AUR](https://img.shields.io/badge/license-Apache%20License%202.0-blue.svg)](https://github.com/Charles7c/k7tm-backend/master/LICENSE)
[![star](https://github.com/Charles7c/k7tm-backend/badge/star.svg?theme=white)](https://github.com/Charles7c/k7tm-backend)
[![GitHub stars](https://img.shields.io/github/stars/Charles7c/k7tm-backend.svg?style=social&label=Stars)](https://github.com/Charles7c/k7tm-backend)
[![GitHub forks](https://img.shields.io/github/forks/Charles7c/k7tm-backend.svg?style=social&label=Fork)](https://github.com/Charles7c/k7tm-backend)

</div>

#### 项目简介
一个基于 Spring Boot 2.1.0 、 Spring Boot Jpa&MyBatis Plus、 JWT、Spring Security、Redis、Vue的前后端分离的教学管理后台系统

#### 项目源码

|  开源平台  |   后端源码  |   前端源码  |
|---  |--- | --- |
|  github   |  https://github.com/Charles7c/k7tm-backend   |  https://github.com/Charles7c/k7tm-pc   |

#### 开发文档
暂无

#### 前端模板

初始模板基于： [https://github.com/PanJiaChen/vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)

模板文档： [https://panjiachen.github.io/vue-element-admin-site/zh/guide/](https://panjiachen.github.io/vue-element-admin-site/zh/guide/)

#### Build Setup
``` bash
# 配置镜像加速
https://www.ydyno.com/archives/1219.html

# 安装依赖
npm install

# 启动服务 localhost:8013
npm run dev

# 构建生产环境
npm run build:prod
```

#### 常见问题

1、linux 系统在安装依赖的时候会出现 node-sass 无法安装的问题

解决方案：
```
1. 单独安装：npm install --unsafe-perm node-sass 
2. 直接使用：npm install --unsafe-perm
```

2、加速node-sass安装

https://www.ydyno.com/archives/1219.html

#### 特别鸣谢

- 感谢 [PanJiaChen](https://github.com/PanJiaChen/vue-element-admin) 的前端模板项目：vue-element-admin

- 感谢 [Elunez](https://github.com/elunez/eladmin) 的后台管理系统框架：EL-ADMIN

#### 代码及Git提交规范

- 后端代码编写建议参考[《阿里巴巴Java开发手册（嵩山版）》](https://github.com/alibaba/p3c/blob/master/Java%E5%BC%80%E5%8F%91%E6%89%8B%E5%86%8C%EF%BC%88%E5%B5%A9%E5%B1%B1%E7%89%88%EF%BC%89.pdf)
    - 配合Intellij IDEA的Alibaba Java Code Guidelines插件使用，体验更佳
    - 插件具体使用方法可参考：[《阿里巴巴Java开发手册插件》](https://blog.csdn.net/wjn19921104/article/details/80171913)
- Git提交模板建议参考[AngularJS仓库](https://github.com/angular/angular.js)的提交规范
    - 配合Intellij IDEA或WebStorm的Git Commit Template插件使用，体验更佳
    - 插件具体使用方法可参考：[《Git Commit Template》](https://www.cnblogs.com/Dyaqi/p/13231260.html)
    - emoji表情可参考[gitmoji](https://gitmoji.carloscuesta.me/)官网及其GitHub仓库示例

#### 反馈交流   
       
- QQ交流群：1045079806
