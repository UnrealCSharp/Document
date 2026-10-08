---
title: Runtime
description: Runtime配置参数
hide_title: true
slug: runtime
sidebar_position: 2
custom_edit_url: null
---

### Publish

- PublishDirectory，发布目录，默认为Script
- UEName，UE程序集名
- GameName，Game程序集名
- CustomProjects，自定义程序集

---

### Override

- bEnableOverrideBlueprintNativeEvent，是否开启覆写蓝图原生事件，默认开启，仅UE5.5及以上有效
- bEnableCallOverrideFunction，是否开启调用被覆盖函数，默认开启
- OverrideFunctionNamePrefix，被覆盖函数前缀，默认为空
- OverrideFunctionNameSuffix，被覆盖函数后缀，默认为_Override

---

### Domain

- WindowsScriptDomainType，Windows平台切换CoreCLR，Mono或者LeanCLR，默认为CoreCLR

- LinuxScriptDomainType，Linux平台切换CoreCLR，Mono或者LeanCLR，默认为CoreCLR

- MacScriptDomainType，Mac平台切换CoreCLR，Mono或者LeanCLR，默认为CoreCLR

- AndroidScriptDomainType，Android切换Mono或者LeanCLR，默认为Mono

- IOSScriptDomainType，IOS切换Mono或者LeanCLR，默认为Mono

- AssemblyLoader，自定义程序集加载规则

---

### Bind

- bEnableFieldHash，是否开启字段和函数绑定哈希稳定生成，默认开启
- BindClass，需要预先绑定的类型，可用于绑定CDO，比如UBlueprintFunctionLibrary

---

### Debug

- bEnableDebug，是否开启调试模式
- Host，调试地址
- Port，调试端口

---

### Module

- bEnableImmediatelyActive，是否开启直接启动Module，默认开启

---

### Solution

- DotnetVersion，dotnet版本，默认为Latest

---
