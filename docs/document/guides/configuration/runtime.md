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

- bEnableCallOverrideFunction，是否开启调用被覆盖函数，默认开启
- OverrideFunctionNamePrefix，被覆盖函数前缀，默认为空
- OverrideFunctionNameSuffix，被覆盖函数后缀，默认为_Override

---

### Domain

- AssemblyLoader，自定义程序集加载规则

---

### Bind

- BindClass，需要预先绑定的类型，可用于绑定CDO，比如UBlueprintFunctionLibrary

---

### Debug

- bEnableDebug，是否开启调试模式
- Host，调试地址
- Port，调试端口

### Module

- bEnableImmediatelyActive，是否开启直接启动Module，默认开启

---