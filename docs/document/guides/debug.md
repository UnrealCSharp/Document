---
title: 调试
description: UnrealCSharp调试完整指南：从基础配置到真机调试
hide_title: true
slug: debug
sidebar_position: 3
custom_edit_url: null
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# C# 调试指南

本文档提供UnrealCSharp的完整调试解决方案，包括项目配置、IDE设置和真机调试等内容。

## 📖 基础概念

### 调试机制说明

由于[Mono](https://github.com/dotnet/runtime)已经废弃了传统的[Guide:Debugger](https://www.mono-project.com/archived/guidedebugger/)调试流程，UnrealCSharp采用了新的调试机制：

- **调试符号格式**: 使用`embedded` DebugType（插件已自动配置）
- **协议支持**: 基于.NET标准调试协议
- **跨平台兼容**: 支持Windows、macOS、Linux等平台

:::info 技术背景
根据[C# Compiler Options](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/compiler-options/code-generation)文档，`embedded` DebugType将调试信息直接嵌入到程序集中，提供更好的调试体验。
:::

---

## ⚙️ 项目配置

### Runtime 调试配置

在项目的Runtime配置中启用调试功能：

```json
{
  "Debug": {
    "bEnableDebug": true,
    "Host": "localhost",
    "Port": 4711
  }
}
```

| 参数 | 说明 | 默认值 |
|------|------|--------|
| `bEnableDebug` | 启用调试模式 | `false` |
| `Host` | 调试服务器地址 | `localhost` |
| `Port` | 调试端口 | `4711` |

:::tip 配置建议
- 开发阶段建议启用调试模式
- 发布版本务必关闭调试以提升性能
- 团队开发时可使用不同端口避免冲突
:::

详细配置参数请参考：[Runtime配置文档](../guides/configuration/runtime#debug-调试配置)

---

## 🛠️ IDE 配置

根据您使用的开发环境选择相应的配置方法：

<Tabs>

<TabItem value="Rider" label="JetBrains Rider（推荐）" default>

### 配置步骤

1. **创建调试配置**
   - `Run` → `Edit Configurations...`
   - 点击 `+` → `.NET` → `Mono Remote`

2. **配置参数**
   ```
   Name: UnrealCSharp Debug
   Host: localhost
   Port: 4711
   ```

3. **高级设置**
   - ✅ `Suspend on connection`
   - ✅ `Wait for connections`

### 使用方法

1. 启动UE编辑器或游戏
2. 在Rider中点击调试按钮
3. 设置断点并开始调试

:::tip Rider优势
- 原生支持Mono调试
- 强大的代码分析功能
- 优秀的UE集成支持
:::

</TabItem>

<TabItem value="Visual Studio" label="Visual Studio">

### 插件安装

安装 [VSMonoDebugger](https://github.com/GordianDotNet/VSMonoDebugger) 扩展：

1. 打开 `Extensions` → `Manage Extensions`
2. 搜索 "Mono Debugger"
3. 安装并重启VS

### 配置调试

1. **创建调试配置**
   - `Debug` → `Attach to Process...`
   - 选择 `Mono Remote (MonoDebugger)`

2. **连接设置**
   ```
   Host: localhost
   Port: 4711
   ```

### 注意事项

- 确保VS版本支持该插件
- 可能需要手动配置符号路径
- 建议使用VS 2019或更高版本

</TabItem>

<TabItem value="Visual Studio Code" label="Visual Studio Code">

### 插件安装

安装 [vscode-mono-debug](https://github.com/microsoft/vscode-mono-debug) 扩展：

```bash
code --install-extension ms-vscode.mono-debug
```

### launch.json 配置

在项目根目录创建 `.vscode/launch.json`：

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "UnrealCSharp Debug",
      "type": "mono",
      "request": "attach",
      "address": "localhost",
      "port": 4711,
      "localRoot": "${workspaceFolder}",
      "remoteRoot": "/path/to/remote/source"
    }
  ]
}
```

### 调试步骤

1. 按 `F5` 或点击调试按钮
2. 选择 "UnrealCSharp Debug" 配置
3. 连接到运行中的UE实例

</TabItem>

</Tabs>

---

## 📱 真机调试

### 移动端调试配置

对于Android和iOS等移动平台的调试，需要使用反向代理技术：

#### 网络配置

1. **端口转发设置**
   ```bash
   # Android (ADB)
   adb forward tcp:4711 tcp:4711
   
   # iOS (可使用 libimobiledevice)
   iproxy 4711 4711
   ```

2. **防火墙配置**
   - 确保调试端口在防火墙中开放
   - 移动设备能够访问开发机器

#### 配置示例

```json
{
  "Debug": {
    "bEnableDebug": true,
    "Host": "0.0.0.0",  // 监听所有网卡
    "Port": 4711
  }
}
```

### 网络调试

参考 [LuaPanda 真机调试指南](https://github.com/Tencent/LuaPanda/blob/master/Docs/Manual/debug-on-phone.md) 中的反向代理配置方法。

#### 关键步骤

1. **建立代理连接**
   - 使用USB连接或WiFi网络
   - 配置端口转发规则

2. **调试器连接**
   - IDE连接到本地转发端口
   - 自动转发到设备上的调试端口

3. **断点调试**
   - 设置断点并启动应用
   - 在移动设备上触发相应代码

:::warning 注意事项
- 真机调试可能影响游戏性能
- 确保网络连接稳定
- 建议在开发版本中使用
:::

---

## 🔧 故障排除

### 常见问题

| 问题 | 原因 | 解决方案 |
|------|------|----------|
| 连接超时 | 端口被占用或防火墙阻止 | 检查端口状态，配置防火墙规则 |
| 断点无效 | 调试符号缺失 | 确认DebugType为embedded |
| 性能下降 | 调试模式开销 | 发布时关闭调试功能 |

### 调试技巧

1. **日志输出**: 使用`UE_LOG`输出调试信息
2. **条件断点**: 在特定条件下触发断点
3. **监视变量**: 实时查看变量值变化
4. **调用堆栈**: 分析函数调用路径

---
