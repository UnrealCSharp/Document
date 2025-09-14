---
title: UnrealCSharp 介绍
description: 一个强大的 Unreal Engine C# 编程插件，基于 .NET 8，支持全平台开发
hide_title: false
custom_edit_url: null
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 🎮 UnrealCSharp

<div style={{textAlign: 'center', marginBottom: '2rem'}}>
  <p style={{fontSize: '1.2rem', color: 'var(--ifm-color-emphasis-600)'}}>
    🚀 <strong>现代化的 Unreal Engine C# 编程解决方案</strong>
  </p>
</div>

---

## ✨ 什么是 UnrealCSharp？

**UnrealCSharp** 是一个功能强大的 Unreal Engine C# 编程插件，基于 **.NET 8 (Mono)** 构建，为开发者提供了完整的 C# 开发体验。

### 🎯 核心特性

<div className="row">
  <div className="col col--6">
    <div className="card margin--sm">
      <div className="card__header">
        <h4>🔄 完整反射支持</h4>
      </div>
      <div className="card__body">
        <p>支持全部反射类型，自动生成 C# 代码，静态导出各种数据类型和函数</p>
      </div>
    </div>
  </div>
  <div className="col col--6">
    <div className="card margin--sm">
      <div className="card__header">
        <h4>⚡ 动态类特性</h4>
      </div>
      <div className="card__body">
        <p>通过 C# 直接生成 UClass、UInterface、UStruct 和 UEnum，无需蓝图载体</p>
      </div>
    </div>
  </div>
</div>

### 🌍 平台支持

<Tabs>
<TabItem value="desktop" label="桌面平台">

- ✅ **Windows**
- ✅ **macOS** 
- ✅ **Linux**

</TabItem>
<TabItem value="mobile" label="移动平台">

- ✅ **Android**
- ✅ **iOS**

</TabItem>
<TabItem value="server" label="服务器">

- ✅ **Dedicated Server**

</TabItem>
</Tabs>

### 🛠️ 开发工具支持

<div className="row">
  <div className="col col--4">
    <div className="card margin--sm">
      <div className="card__body">
        <h5>🐛 调试支持</h5>
        <ul>
          <li>Editor 调试</li>
          <li>Runtime 调试</li>
          <li>Android 真机调试</li>
        </ul>
      </div>
    </div>
  </div>
  <div className="col col--4">
    <div className="card margin--sm">
      <div className="card__body">
        <h5>🔥 热重载</h5>
        <ul>
          <li>C# 代码热重载</li>
          <li>动态类替换</li>
          <li>编辑器内实时更新</li>
        </ul>
      </div>
    </div>
  </div>
  <div className="col col--4">
    <div className="card margin--sm">
      <div className="card__body">
        <h5>📦 热更新</h5>
        <ul>
          <li>通过 Pak 文件热更新</li>
          <li>运行时代码更新</li>
          <li>无需重启应用</li>
        </ul>
      </div>
    </div>
  </div>
</div>

---

## 🏆 生态与质量保证

### 📊 测试覆盖

- ✅ **完备的单元测试**
- ✅ **全面的回归测试** 
- ✅ **详细的性能测试**

### 🎮 实战验证

插件已成功复刻 Epic 官方提供的游戏示例：
- 🤖 **StackOBot**
- 🌾 **Cropout**

### 👥 社区应用

目前已有多个社区项目成功接入使用，经过实际生产环境验证。

---

## 🚀 快速开始

准备好开始您的 UnrealCSharp 之旅了吗？

<div style={{textAlign: 'center', margin: '2rem 0'}}>
  <a href="/docs/document/getting-started/installation" className="button button--primary button--lg">
    📥 开始安装
  </a>
  {' '}
  <a href="/docs/document/getting-started/binding" className="button button--secondary button--lg">
    📖 学习绑定
  </a>
</div>

---
