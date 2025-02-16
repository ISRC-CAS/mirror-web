### 简介

基于 Next.js 构建的 iscas 前端开源镜像站

### 功能特性

- 查看镜像列表（包含相关信息和使用帮助）
- 获取安装镜像（提供操作系统、应用软件和字体安装包）
- 支持暗色/亮色主题切换
- 支持固定/自适应宽度切换

### 开发环境

- 操作系统: 基于 Ubuntu-24.04

  - 安装 node:
    ```
    <!-- 更新包管理器 -->
    sudo apt update
    <!-- 安装 Node.js v18.16.0 -->
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
    <!-- 查看node版本 -->
    node -v
    ```

- Node.js 版本: 18 及以上
- 安装依赖: `npm install`
- 启动开发环境: `npm run dev`

### 项目结构

```
├── app/                     # 应用程序
│   ├── api/                 # 通用api
│   ├── components/          # 公共组件
│   ├── homePage/            # 主页
│   ├── mdxPage/[slug]/      # 帮助文档页
│   ├── globals.css          # 全局CSS
│   ├── layout.js            # 布局组件
│   ├── page.js              # 页面组件
│   └── page.module.css      # 页面组件的css模块
├── mdxFile/                 # 子仓库
├── public/                  # 公共静态资源
├── .gitignore               # Git忽略文件
├── .gitmodules              # 子模块配置文件
├── eslint.config.mjs        # ESLint配置文件
├── jsconfig.json            # js配置文件
├── mdx-components.js        # MDX组件的定义文件
├── next.config.mjs          # Next.js配置文件
|—— Dockerfile               # Docker配置文件
|—— .dockerignore            # Docker忽略文件
|—— README.md                # 项目说明
├── package-lock.json        # npm包锁定文件
└── package.json             # 包管理器配置文件
```
