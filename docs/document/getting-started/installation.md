---
title: 安装流程
description: 如何从零开始生成一个C#工程
hide_title: true
slug: installation
sidebar_position: 1
custom_edit_url: null
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## 环境依赖

- .NET 7及以上版本
  - Windows上可通过Visual Studio Installer直接安装
  - macOS上可参考[Install .NET on macOS](https://learn.microsoft.com/en-us/dotnet/core/install/macos)
- [Mono](https://github.com/dotnet/runtime)，插件已内置

---

## 推荐IDE

- [Rider](https://www.jetbrains.com/rider/)
- [Visual Studio](https://visualstudio.microsoft.com/)
- [Visual Studio Code](https://code.visualstudio.com/)

---

## 安装插件

<Tabs>

<TabItem value="git submodule" label="子模块（推荐）" default>

[git-submodule](https://git-scm.com/docs/git-submodule)

</TabItem>

<TabItem value="source code" label="源码">

1. `git clone https://github.com/crazytuzi/UnrealCSharp`
2. 拷贝到`项目`的`Plugins`目录

</TabItem>

<TabItem value="releases" label="发布包">

1. 通过[releases](https://github.com/crazytuzi/UnrealCSharp/releases)下载需要的版本
2. 拷贝到`项目`的`Plugins`目录

</TabItem>

</Tabs>

---

## 生成C#工程

- 点击`Generator Code`
- `项目/Script`即为C#工程目录

---
