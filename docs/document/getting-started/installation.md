---
sidebar_position: 1
custom_edit_url: null
---

# 安装流程

如何从零开始生成一个C#工程

---

## 环境依赖

- .NET 7及以上版本
  - Windows上可通过Visual Studio Installer直接安装
  - macOS上可参考[Install .NET on macOS](https://learn.microsoft.com/en-us/dotnet/core/install/macos)
- [Mono](https://github.com/dotnet/runtime)，插件已内置

---

## 推荐IDE

- [Visual Studio](https://visualstudio.microsoft.com/)
- [Rider](https://www.jetbrains.com/rider/)
- [Visual Studio Code](https://code.visualstudio.com/)

---

## 安装插件

- 源码安装方式
  - `git clone https://github.com/crazytuzi/UnrealCSharp`
  - 拷贝到`项目`的`Plugins`目录
- 发布包安装方式
  - 通过[releases](https://github.com/crazytuzi/UnrealCSharp/releases)下载需要的版本
  - 拷贝到`项目`的`Plugins`目录
- 子模块（推荐）
  - [git-submodule](https://git-scm.com/docs/git-submodule)

---

## 配置导出项

- 参考[配置](configuration.md)

---

## 生成C#工程

- 点击`Generator Code`
- `项目/Script`即为C#工程目录

---
