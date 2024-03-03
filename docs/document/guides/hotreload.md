---
title: 编辑器热重载
description: 编辑器下监听C#文件和资源变更并热重载
hide_title: true
slug: hotreload
sidebar_position: 2
custom_edit_url: null
---

## C#文件变更

使用`IDirectoryWatcher::FDirectoryChanged`监听`Script`项目中`Game`工程的C#文件变更情况，当编辑器切换到前台时，如果检测到有文件变更，则会触发C#编译，当变更列表中存在动态类时，也会对动态类进行热重载。

---

## 资源变更

当发生资源变更（增加，删除，修改和重命名）时，如果该资源类型以及该资源所属模块或插件在[配置](../getting-started/configuration.md)中匹配成功，则会新建或者覆盖对应C#文件，并且触发C#编译。

---
