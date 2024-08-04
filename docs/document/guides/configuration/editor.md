---
title: Editor
description: Editor配置参数
hide_title: true
slug: editor
sidebar_position: 1
custom_edit_url: null
---

### DotNet

- DotNetPath，DotNet路径
  - Windows上默认为`C:/Program Files/dotnet/dotnet.exe`
  - macOS上默认为`/usr/local/share/dotnet/dotnet`

---

### Generator

- bEnableCompiled，是否开启编译，默认开启
- bEnableAssetChanged，是否开启监听资源变更，默认开启
- bEnableDirectoryChanged，是否开启监听C#文件变更，默认开启
- bIsSkipGenerateEngineModules，是否跳过引擎侧生成，默认关闭，当确认引擎侧不需要重复生成时，可开启，用于加快生成速度
- bIsGenerateAllModules，是否全量生成，默认开启，当想要通过SupportedModule自定义生成规则时，可关闭
- SupportedModule，需要对C++代码生成C#代码的模块或者插件
  - 对于类，需要类继承的基类以及接口被导出
  - 对于变量，需要变量类型被导出
  - 对于函数，需要函数所有参数类型以及返回值类型被导出
  - 默认添加如下模块或者插件：
    - Core
    - CoreUObject
    - Engine
    - SlateCore
    - FieldNotification
    - UMG
    - UnrealCSharpCore
    - `项目`
- SupportedAssetPath，需要对资源生成C#代码的模块或者插件
  - 默认添加`项目`
- SupportedAssetClass，需要对资源生成C#代码的资源类型
  - 对于蓝图类，会生成变量和函数
  - 对于蓝图结构体，会生成变量
  - 对于蓝图枚举，会生成枚举值
  - 对于其他类型，会生成继承资源类型的空类，主要用于防止资源路径硬编码，可借助代码分析工具实现收集C#侧资源引用情况
  - 默认添加如下资源类型：
    - Blueprint
    - UserDefinedStruct
    - UserDefinedEnum
    - WidgetBlueprint
- bEnableCompiled，是否开启通过UHT生成静态绑定代码，默认关闭
- ExportModule，需要通过UHT生成静态绑定代码的模块或者插件

---