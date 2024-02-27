---
sidebar_position: 1
custom_edit_url: null
---

# 调试

如何配置和使用调试工具进行调试

---

## 基础概念

[Mono](https://github.com/dotnet/runtime)已经摒弃[Guide:Debugger](https://www.mono-project.com/archived/guidedebugger/)这套调试流程，目前需要参考[C# Compiler Options that control code generation](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/compiler-options/code-generation)将`DebugType`设置为`embedded`（插件已处理好）。

---

## 项目配置

参考[配置](../getting-started/configuration.md)

---

## IDE配置

- Visual Studio
    - [VSMonoDebugger](https://github.com/GordianDotNet/VSMonoDebugger)
- Rider（推荐）
    - `Run-Edit Configurations...-Add New Configuration-.NET-Mono Remote`
- Visual Studio Code
    - [vscode-mono-debug](https://github.com/microsoft/vscode-mono-debug)

---

## 真机调试

参考[debug-on-phone](https://github.com/Tencent/LuaPanda/blob/master/Docs/Manual/debug-on-phone.md)中提及的`反向代理`

---
