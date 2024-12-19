# ISCAS 开源镜像站 🚀

## 📖 项目介绍

ISCAS 开源镜像站是由中国科学院软件研究所智能软件研究中心维护的开源软件镜像站。本项目提供了镜像站的前端界面实现，致力于为用户提供便捷、高效的开源软件镜像服务。

### ✨ 主要特性

- 📊 展示丰富的镜像源列表
- 📝 提供详细的镜像使用帮助文档
- 🔍 支持镜像列表筛选和排序
- 💾 提供操作系统和软件下载功能

## 🛠️ 技术栈

- ![HTML5](https://img.shields.io/badge/-HTML5-E34F26?style=flat-square&logo=html5&logoColor=white) HTML5
- ![CSS3](https://img.shields.io/badge/-CSS3-1572B6?style=flat-square&logo=css3) CSS3
- ![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black) JavaScript
- ![jQuery](https://img.shields.io/badge/-jQuery-0769AD?style=flat-square&logo=jquery) jQuery

## 🌍 环境地址

- 测试环境：`http://127.0.0.1:5500`
- 正式环境：[https://mirror.iscas.ac.cn/](https://mirror.iscas.ac.cn/)

## 📁 项目结构

```
ISCAS-Mirror/
├── 📂 css/ # 样式文件目录
│ └── mirror.css # 主样式表
│
├── 📂 file/ # 镜像帮助文档目录
│ └── .mdx # 各镜像使用帮助文档
│
├── 📂 images/ # 静态资源目录
│ └── .png # 图片资源
│
├── 📂 js/ # JavaScript文件目录
│ ├── download.js # 镜像下载功能
│ ├── mirror.js # 核心业务逻辑
│ ├── mirrorList.js # 镜像列表管理
│ └── jquery-1.11.3.min.js # jQuery库
│
├── 📄 isoinfo.json # 镜像信息配置文件
├── 📄 index.html # 项目入口文件
├── 📄 ref.py # Github资源同步脚本
├── 📄 syncstatus.json # 同步状态数据文件
└── 📄 README.md # 项目说明文档
```


## ⚙️ 项目运行配置

### 前置要求

- Python 3.x
- pip 包管理器
- VSCode 或其他代码编辑器
- Live Server 插件（推荐）

### 安装步骤

1. **克隆项目**
   ```bash
   git clone https://github.com/your-username/iscas-mirror.git
   cd iscas-mirror
   ```

2. **安装 Python 依赖**
   ```bash
   pip install PyGithub
   ```

3. **同步镜像文档**
   ```bash
   python ref.py  # 执行后会自动下载最新的 mdx 文件到 file 目录
   ```

4. **启动项目**

   方式一：使用 VSCode Live Server（推荐）
   - 安装 Live Server 插件
   - 右键 `index.html` 文件
   - 选择 "Open with Live Server"

   方式二：使用浏览器直接打开
   - 右键 `index.html` 文件
   - 选择 "Open with Default Browser"




