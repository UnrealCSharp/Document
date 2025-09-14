---
title: Runtime
description: Runtime运行时配置参数详解
hide_title: true
slug: runtime
sidebar_position: 2
custom_edit_url: null
---

# Runtime 运行时配置

本文档详细介绍UnrealCSharp在运行时的各项配置参数，涵盖程序集发布、函数覆盖、域管理、绑定和调试等关键功能。

## Publish 发布配置

配置程序集的发布和加载相关参数。

| 参数名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| `PublishDirectory` | string | `Script` | 已编译程序集的发布目录 |
| `UEName` | string | - | UE引擎程序集的名称 |
| `GameName` | string | - | 游戏项目程序集的名称 |
| `CustomProjects` | array | `[]` | 自定义程序集列表，用于加载额外的程序集 |

:::info 说明
`PublishDirectory` 指定运行时加载程序集的目录，通常与编译输出目录保持一致。
:::

---

## Override 函数覆盖配置

控制C#中覆盖UE函数的行为和命名规则。

| 参数名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| `bEnableCallOverrideFunction` | bool | `true` | 是否启用调用被覆盖的原始函数功能 |
| `OverrideFunctionNamePrefix` | string | `""` | 被覆盖函数的名称前缀 |
| `OverrideFunctionNameSuffix` | string | `_Override` | 被覆盖函数的名称后缀 |

### 使用示例

当覆盖UE中的`BeginPlay`函数时：
- 原始函数调用：`BeginPlay_Override()` （使用默认后缀）
- 如果设置前缀为`Super_`：`Super_BeginPlay()`

:::tip 最佳实践
建议保持默认的`_Override`后缀，这样可以清晰地区分原始函数调用。
:::

---

## Domain 程序域配置

管理.NET程序集的加载和隔离。

| 参数名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| `AssemblyLoader` | string | - | 自定义程序集加载器的完整类名 |

### 自定义加载器

可以通过实现自定义加载器来控制程序集的加载行为，例如：
- 热重载支持
- 版本管理
- 依赖解析

---

## Bind 预绑定配置

配置需要预先绑定的类型，优化运行时性能。

| 参数名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| `BindClass` | array | `[]` | 需要预先绑定的C#类型列表 |

### 使用场景

主要用于绑定以下类型：
- **CDO (Class Default Object)**: 类默认对象
- **蓝图函数库**: 如`UBlueprintFunctionLibrary`的子类
- **静态类**: 频繁使用的工具类

### 配置示例

```json
"BindClass": [
    "MyProject.MyBlueprintFunctionLibrary",
    "MyProject.Utilities.MathHelper"
]
```

---

## Debug 调试配置

配置C#代码的调试功能，支持远程调试。

| 参数名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| `bEnableDebug` | bool | `false` | 是否启用调试模式 |
| `Host` | string | `localhost` | 调试服务器地址 |
| `Port` | int | `4711` | 调试服务器端口 |

### 调试设置

1. **启用调试**: 将`bEnableDebug`设置为`true`
2. **配置IDE**: 在Visual Studio或VS Code中配置远程调试
3. **连接调试器**: 使用指定的Host和Port连接

:::warning 性能提醒
调试模式会影响运行时性能，请在发布版本中关闭此功能。
:::

---

## Module 模块配置

控制模块的激活和生命周期管理。

| 参数名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| `bEnableImmediatelyActive` | bool | `true` | 是否在加载后立即激活模块 |

### 模块激活策略

- **立即激活** (`true`): 模块加载后立即执行初始化代码
- **延迟激活** (`false`): 模块加载后等待手动激活或特定事件触发

:::note 注意事项
对于依赖其他系统的模块，可能需要关闭立即激活以确保正确的初始化顺序。
:::

---