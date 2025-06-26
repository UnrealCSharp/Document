---
title: Editor
description: Editor配置参数详解
hide_title: true
slug: editor
sidebar_position: 1
custom_edit_url: null
---

# Editor 配置参数

本文档详细介绍UnrealCSharp在编辑器模式下的各项配置参数，帮助开发者根据项目需求进行个性化配置。

## DotNet 配置

配置.NET运行时环境相关参数。

| 参数名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| `DotNetPath` | string | 见下方说明 | .NET可执行文件的完整路径 |

**默认路径：**
- **Windows**: `C:/Program Files/dotnet/dotnet.exe`
- **macOS**: `/usr/local/share/dotnet/dotnet`

:::tip 提示
确保指定的.NET路径存在且可执行，建议使用.NET 6.0及以上版本。
:::

---

## Generator 生成器配置

控制C#代码生成和编译相关的配置参数。

### 基础配置

| 参数名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| `ScriptDirectory` | string | `Script` | C#脚本存放的根目录名称 |
| `bEnableDeleteProxyDirectory` | bool | `false` | 是否在生成前删除Proxy目录 |
| `bEnableCompiled` | bool | `true` | 是否启用自动编译功能 |

### 监听配置

| 参数名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| `bEnableAssetChanged` | bool | `true` | 是否监听UE资源文件变更并自动重新生成 |
| `bEnableDirectoryChanged` | bool | `true` | 是否监听C#文件变更并自动重新编译 |

### 模块生成配置

| 参数名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| `bIsSkipGenerateEngineModules` | bool | `false` | 跳过引擎模块的重复生成以提升速度 |
| `bIsGenerateAllModules` | bool | `true` | 是否生成所有模块，关闭时使用SupportedModule自定义 |

#### SupportedModule（支持的模块）

指定需要从C++代码生成C#绑定的模块或插件列表。

**生成要求：**
- **类**: 基类和接口必须被导出
- **变量**: 变量类型必须被导出  
- **函数**: 所有参数类型和返回值类型必须被导出

**默认包含的模块：**
- `Core` - UE核心模块
- `CoreUObject` - UE对象系统
- `Engine` - UE引擎模块
- `SlateCore` - UI核心模块
- `FieldNotification` - 字段通知系统
- `UMG` - UE用户界面系统
- `UnrealCSharpCore` - UnrealCSharp核心模块
- 当前项目模块

### 资源生成配置

| 参数名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| `bIsGenerateAsset` | bool | `true` | 是否生成资源类型的C#绑定 |

#### SupportedAssetPath（支持的资源路径）

指定需要生成C#代码的资源所在的模块或插件路径。

**默认值：** 当前项目

#### SupportedAssetClass（支持的资源类型）

指定需要生成C#绑定的资源类型及其生成规则：

| 资源类型 | 生成内容 | 说明 |
|----------|----------|------|
| `Blueprint` | 变量和函数 | 蓝图类的完整绑定 |
| `UserDefinedStruct` | 变量 | 用户定义结构体 |
| `UserDefinedEnum` | 枚举值 | 用户定义枚举 |
| `WidgetBlueprint` | 变量和函数 | UI蓝图的完整绑定 |
| 其他类型 | 空类继承 | 防止资源路径硬编码，便于引用分析 |

### 其他配置

| 参数名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| `bIsGenerateFunctionComment` | bool | `true` | 是否在生成的C#代码中包含函数注释 |
| `bEnableExport` | bool | `false` | 是否通过UHT生成静态绑定代码 |
| `ExportModule` | array | `[]` | 需要通过UHT生成静态绑定的模块列表 |

:::warning 注意
`bEnableExport` 功能仍在实验阶段，建议在生产环境中谨慎使用。
:::

---