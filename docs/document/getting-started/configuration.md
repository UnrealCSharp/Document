---
title: 配置
description: 详解Editor和Runtime的配置参数
hide_title: true
slug: configuration
sidebar_position: 2
custom_edit_url: null
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>

<TabItem value="Editor" label="Editor" default>

<Tabs>

<TabItem value="DotNet" label="DotNet" default>

- DotNetPath，DotNet路径
  - Windows上默认为`C:/Program Files/dotnet/dotnet.exe`
  - macOS上默认为`/usr/local/share/dotnet/dotnet`

</TabItem>

<TabItem value="Generator" label="Generator">

- SupportedModule，需要对C++代码生成C#代码的模块或者插件
  - 对于类，需要类继承的基类以及接口被导出
  - 对于变量，需要变量类型被导出
  - 对于函数，需要函数所有参数类型以及返回值类型被导出
  - 推荐至少添加上如下模块：
    - Core
    - CoreUObject
    - Engine
    - SlateCore
    - FieldNotification
    - UMG
    - `项目`
- SupportedAssetPath，需要对资源生成C#代码的模块或者插件
  - 推荐至少添加上`项目`
- SupportedAssetClass，需要对资源生成C#代码的资源类型
  - 对于蓝图类，会生成变量和函数
  - 对于蓝图结构体，会生成变量
  - 对于蓝图枚举，会生成枚举值
  - 对于其他类型，会生成继承资源类型的空类，主要用于防止资源路径硬编码，可借助代码分析工具实现收集C#侧资源引用情况
  - 推荐至少添加上如下资源类型：
    - Blueprint
    - UserDefinedStruct
    - UserDefinedEnum
    - WidgetBlueprint

</TabItem>

</Tabs>

</TabItem>

<TabItem value="Runtime" label="Runtime">

<Tabs>

<TabItem value="Bind" label="Bind" default>

- BindClass，需要预先绑定的类型，可用于绑定CDO，比如UBlueprintFunctionLibrary

</TabItem>

<TabItem value="Debug" label="Debug">

- bEnableDebug，是否开启调试模式
- Host，调试地址
- Port，调试端口

</TabItem>

</Tabs>

</TabItem>

</Tabs>

 ---
