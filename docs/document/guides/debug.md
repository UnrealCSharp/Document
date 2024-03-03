---
title: 调试
description: 如何配置和使用调试工具进行调试
hide_title: true
slug: debug
sidebar_position: 1
custom_edit_url: null
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## 基础概念

[Mono](https://github.com/dotnet/runtime)已经摒弃[Guide:Debugger](https://www.mono-project.com/archived/guidedebugger/)这套调试流程，目前需要参考[C# Compiler Options that control code generation](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/compiler-options/code-generation)将`DebugType`设置为`embedded`（插件已处理好）。

---

## 项目配置

参考[配置](../getting-started/configuration.md)

---

## IDE配置

<Tabs>

<TabItem value="Rider" label="Rider（推荐）" default>

`Run-Edit Configurations...-Add New Configuration-.NET-Mono Remote`

</TabItem>

<TabItem value="Visual Studio" label="Visual Studio">

[VSMonoDebugger](https://github.com/GordianDotNet/VSMonoDebugger)

</TabItem>

<TabItem value="Visual Studio Code" label="Visual Studio Code">

[vscode-mono-debug](https://github.com/microsoft/vscode-mono-debug)

</TabItem>

</Tabs>

---

## 真机调试

参考[debug-on-phone](https://github.com/Tencent/LuaPanda/blob/master/Docs/Manual/debug-on-phone.md)中提及的`反向代理`

---
