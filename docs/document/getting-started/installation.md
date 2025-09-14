---
title: 📥 安装指南
description: 从零开始搭建 UnrealCSharp 开发环境
hide_title: false
custom_edit_url: null
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 📥 安装指南

<div style={{textAlign: 'center', marginBottom: '2rem'}}>
  <p style={{fontSize: '1.1rem', color: 'var(--ifm-color-emphasis-600)'}}>
    🎯 <strong>快速搭建您的 UnrealCSharp 开发环境</strong>
  </p>
</div>

---

## 🔧 环境依赖

### 必需组件

<div className="row">
  <div className="col col--6">
    <div className="card margin--sm">
      <div className="card__header">
        <h4>⚡ .NET 8+ Runtime</h4>
      </div>
      <div className="card__body">
        <Tabs>
          <TabItem value="windows" label="Windows">
            <p>📦 通过 <strong>Visual Studio Installer</strong> 直接安装</p>
            <p>或从 <a href="https://dotnet.microsoft.com/download">Microsoft 官网</a> 下载</p>
          </TabItem>
          <TabItem value="macos" label="macOS">
            <p>📖 参考官方指南：<br/><a href="https://learn.microsoft.com/en-us/dotnet/core/install/macos">Install .NET on macOS</a></p>
          </TabItem>
        </Tabs>
      </div>
    </div>
  </div>
  <div className="col col--6">
    <div className="card margin--sm">
      <div className="card__header">
        <h4>🔥 Mono Runtime</h4>
      </div>
      <div className="card__body">
        <p>✅ <strong>已内置在插件中</strong></p>
        <p>基于 <a href="https://github.com/dotnet/runtime">dotnet/runtime</a></p>
        <p>🎉 无需额外安装配置</p>
      </div>
    </div>
  </div>
</div>

---

## 🛠️ 推荐 IDE

<div className="row">
  <div className="col col--4">
    <div className="card margin--sm">
      <div className="card__header">
        <h4>🚀 JetBrains Rider</h4>
      </div>
      <div className="card__body">
        <p><strong>推荐指数：⭐⭐⭐⭐⭐</strong></p>
        <ul>
          <li>最佳 C# 开发体验</li>
          <li>强大的调试功能</li>
          <li>优秀的 Unreal 支持</li>
        </ul>
        <a href="https://www.jetbrains.com/rider/" className="button button--primary button--sm">下载</a>
      </div>
    </div>
  </div>
  <div className="col col--4">
    <div className="card margin--sm">
      <div className="card__header">
        <h4>💼 Visual Studio</h4>
      </div>
      <div className="card__body">
        <p><strong>推荐指数：⭐⭐⭐⭐</strong></p>
        <ul>
          <li>Microsoft 官方 IDE</li>
          <li>完整 .NET 生态支持</li>
          <li>免费 Community 版本</li>
        </ul>
        <a href="https://visualstudio.microsoft.com/" className="button button--primary button--sm">下载</a>
      </div>
    </div>
  </div>
  <div className="col col--4">
    <div className="card margin--sm">
      <div className="card__header">
        <h4>⚡ VS Code</h4>
      </div>
      <div className="card__body">
        <p><strong>推荐指数：⭐⭐⭐</strong></p>
        <ul>
          <li>轻量级编辑器</li>
          <li>丰富的扩展生态</li>
          <li>完全免费开源</li>
        </ul>
        <a href="https://code.visualstudio.com/" className="button button--primary button--sm">下载</a>
      </div>
    </div>
  </div>
</div>

---

## 📦 安装插件

<Tabs>

<TabItem value="source" label="🔧 源码安装（推荐）" default>

### 步骤说明

<div className="alert alert--success">
  <strong>💡 推荐理由：</strong> 获取最新功能，完整源码控制，便于自定义修改
</div>

1. **📥 克隆仓库**
   ```bash
   git clone --recurse-submodule https://github.com/crazytuzi/UnrealCSharp
   ```

2. **📁 复制到项目**
   ```
   将整个文件夹复制到：
   YourProject/
   └── Plugins/
       └── UnrealCSharp/
   ```

3. **✅ 验证安装**
   - 重新生成项目文件
   - 编译项目
   - 启动编辑器

</TabItem>

<TabItem value="releases" label="📦 发布包安装">

### 步骤说明

<div className="alert alert--info">
  <strong>📝 注意：</strong> 需要手动下载依赖组件
</div>

1. **📥 下载发布包**
   - 访问 [GitHub Releases](https://github.com/crazytuzi/UnrealCSharp/releases)
   - 选择对应版本下载

2. **📥 下载依赖组件**
   - [Mono Runtime](https://github.com/crazytuzi/Mono)
   - [SourceCodeGenerator](https://github.com/crazytuzi/SourceCodeGenerator)
   - 按照目录结构放置

3. **📁 复制到项目**
   ```
   将整个文件夹复制到：
   YourProject/
   └── Plugins/
       └── UnrealCSharp/
   ```

</TabItem>

</Tabs>

---

## 🎯 生成 C# 工程

安装完成后，需要生成 C# 项目文件：

<Tabs>

<TabItem value="button" label="🖱️ 图形界面（推荐）" default>

### 使用编辑器按钮

<div className="alert alert--success">
  <strong>🎯 最简单的方式</strong>
</div>

1. **🔍 找到按钮**
   - 在 Unreal Editor 工具栏中
   - 查找 `Generator Code` 按钮

2. **🖱️ 点击生成**
   - 点击按钮开始生成
   - 等待生成完成

3. **📁 检查结果**
   ```
   YourProject/
   └── Script/        ← C# 工程目录
       ├── Game/
       ├── Engine/
       └── YourProject.sln
   ```

</TabItem>

<TabItem value="command" label="⌨️ 命令行">

### 使用控制台命令

<div className="alert alert--info">
  <strong>🔧 适合高级用户</strong>
</div>

1. **📝 打开控制台**
   - 在编辑器中按 `` ` `` 键
   - 或者在 Window → Developer Tools → Output Log

2. **⌨️ 执行命令**
   ```
   UnrealCSharp.Editor.Generator
   ```

3. **📁 检查结果**
   - 生成的 C# 工程位于 `项目/Script` 目录

</TabItem>

</Tabs>

---

## ✅ 验证安装

### 🔍 检查清单

<div className="row">
  <div className="col col--6">
    <div className="card margin--sm">
      <div className="card__header">
        <h4>📁 文件结构</h4>
      </div>
      <div className="card__body">
        <ul>
          <li>✅ Plugins/UnrealCSharp/ 存在</li>
          <li>✅ Script/ 目录已生成</li>
          <li>✅ 解决方案文件 (.sln) 已创建</li>
        </ul>
      </div>
    </div>
  </div>
  <div className="col col--6">
    <div className="card margin--sm">
      <div className="card__header">
        <h4>🛠️ 编辑器功能</h4>
      </div>
      <div className="card__body">
        <ul>
          <li>✅ Generator Code 按钮可见</li>
          <li>✅ UnrealCSharp 插件已启用</li>
          <li>✅ 控制台命令可用</li>
        </ul>
      </div>
    </div>
  </div>
</div>

### 🎉 下一步

安装完成！现在您可以：

<div style={{textAlign: 'center', margin: '2rem 0'}}>
  <a href="/docs/document/getting-started/binding" className="button button--primary button--lg">
    📖 学习绑定机制
  </a>
  {' '}
  <a href="/docs/document/getting-started/dynamic" className="button button--secondary button--lg">
    ⚡ 了解动态类
  </a>
</div>

---
