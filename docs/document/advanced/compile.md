---
title: 编译Mono
description: 如何多平台编译Mono
hide_title: true
slug: compile
sidebar_position: 3
custom_edit_url: null
---

# 编译Mono

本文档详细介绍了如何在不同平台上编译Mono运行时，包括环境配置、编译步骤和产物说明。

## 概述

Mono是.NET运行时的开源实现，支持多平台部署。本文档涵盖以下平台的编译流程：

- **Windows** - 使用Visual Studio构建工具
- **Linux** - 使用GCC/Clang工具链  
- **macOS** - 使用Xcode命令行工具
- **Android** - 交叉编译支持ARM64
- **iOS** - 包含AOT编译和Framework打包

## 源码仓库

- **主仓库**: [dotnet/runtime](https://github.com/dotnet/runtime)
- **版本**: 推荐使用v8.0.5或更高版本
- **分支**: `main` 或对应的发布分支

## 文档导航

本文档按照以下结构组织：

1. [Windows编译](#windows) - Visual Studio环境编译
2. [Linux编译](#linux) - GCC/Clang工具链编译  
3. [macOS编译](#macos) - Xcode命令行工具编译
4. [Android编译](#android) - NDK交叉编译
5. [iOS编译](#ios) - 包含AOT和Framework打包
6. [常见问题](#常见问题-faq) - 故障排除和解决方案
7. [最佳实践](#最佳实践) - 性能优化和部署建议


## Windows

:::tip 提示
Windows编译需要Visual Studio 2022或Visual Studio Build Tools 2022。
:::

### 环境要求

**系统要求**:
- Windows 10版本1909或更高版本
- Visual Studio 2022或Visual Studio Build Tools 2022
- Windows SDK (最新版本)
- Git for Windows

**详细要求**: [Requirements to build dotnet/runtime on Windows](https://github.com/dotnet/runtime/blob/main/docs/workflow/requirements/windows-requirements.md)

### 编译步骤

```powershell
# 克隆源码
git clone https://github.com/dotnet/runtime.git
cd runtime

# Debug版本编译
.\build.cmd mono+libs

# Release版本编译
.\build.cmd mono+libs -c release

# 指定架构编译 (可选)
.\build.cmd mono+libs -arch x64
```

:::warning 注意
编译过程可能需要1-2小时，确保有足够的磁盘空间（至少20GB）。
:::

### 产物目录

#### 头文件 (Include Files)
```
artifacts/bin/mono/windows.x64.Debug/include/
├── mono/
│   ├── jit/
│   ├── metadata/
│   └── utils/
└── ...
```

#### 托管库文件 (Managed Assemblies)
| 文件类型 | 位置 | 说明 |
|---------|------|------|
| NuGet包 | [Microsoft.NETCore.App.Runtime.Mono.win-x64](https://www.nuget.org/packages/Microsoft.NETCore.App.Runtime.Mono.win-x64/8.0.5) | 下载后解压获取运行时库 |
| 运行时库 | `artifacts/bin/runtime/net8.0-windows-Debug-x64/` | 根据`runtimes/win-x64/lib/net8.0`筛选 |
| 核心库 | `artifacts/bin/mono/windows.x64.Debug/System.Private.CoreLib.dll` | Mono核心类库 |

#### 本机库文件 (Native Libraries)
位于 `artifacts/obj/mono/windows.x64.Debug/out/lib/` 目录下：

| 文件名 | 用途 |
|--------|------|
| `coreclr.dll` | 核心运行时库 |
| `coreclr.import.lib` | 导入库 |
| `mono-component-debugger-static.lib` | 调试器组件 |
| `mono-component-debugger-stub-static.lib` | 调试器存根 |
| `mono-component-diagnostics_tracing-static.lib` | 诊断跟踪组件 |
| `mono-component-diagnostics_tracing-stub-static.lib` | 诊断跟踪存根 |
| `mono-component-hot_reload-static.lib` | 热重载组件 |
| `mono-component-hot_reload-stub-static.lib` | 热重载存根 |
| `mono-component-marshal-ilgen-static.lib` | 编组IL生成组件 |
| `mono-component-marshal-ilgen-stub-static.lib` | 编组IL生成存根 |
| `mono-profiler-aot.lib` | AOT分析器 |
| `monosgen-2.0.lib` | Mono SGen垃圾回收器 |

## Linux

:::tip 提示
Linux编译支持多种发行版，推荐使用Ubuntu 20.04 LTS或更高版本。
:::

### 环境要求

**系统要求**:
- Ubuntu 20.04 LTS, CentOS 8, 或其他现代Linux发行版
- GCC 9+ 或 Clang 10+
- CMake 3.16+
- Python 3.6+
- Git

**包管理器安装**:
```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install build-essential cmake python3 git

# CentOS/RHEL
sudo yum groupinstall "Development Tools"
sudo yum install cmake python3 git
```

**详细要求**: [Requirements to build dotnet/runtime on Linux](https://github.com/dotnet/runtime/blob/main/docs/workflow/requirements/linux-requirements.md)

### 编译选项

**自定义修改参考**: [v8.0.5-Linux 修改参考](https://github.com/crazytuzi/runtime/commit/0458ead883ddb88e269fc14d1937d95f77279031)

### 编译步骤

```bash
# 克隆源码
git clone https://github.com/dotnet/runtime.git
cd runtime

# 确保脚本可执行
chmod +x build.sh

# Debug版本编译
./build.sh mono+libs

# Release版本编译
./build.sh mono+libs -c release

# 指定架构编译
./build.sh mono+libs -arch x64
```

### 产物目录

#### 头文件 (Include Files)
```
artifacts/bin/mono/linux.x64.Debug/include/
```

#### 托管库文件 (Managed Assemblies)
| 文件类型 | 位置 | 说明 |
|---------|------|------|
| NuGet包 | [Microsoft.NETCore.App.Runtime.Mono.linux-x64](https://www.nuget.org/packages/Microsoft.NETCore.App.Runtime.Mono.linux-x64/8.0.5) | 下载后解压获取运行时库 |
| 运行时库 | `artifacts/bin/runtime/net8.0-linux-Debug-x64/` | 根据`runtimes/linux-x64/lib/net8.0`筛选 |
| 核心库 | `artifacts/bin/mono/linux.x64.Debug/System.Private.CoreLib.dll` | Mono核心类库 |

#### 本机库文件 (Native Libraries)

**主要库文件**位于 `artifacts/obj/mono/linux.x64.Debug/out/lib/` 目录下：

| 文件名 | 用途 |
|--------|------|
| `libcoreclr.so` | 核心运行时共享库 |
| `libmono-component-debugger-static.a` | 调试器组件静态库 |
| `libmono-component-debugger-stub-static.a` | 调试器存根静态库 |
| `libmono-component-diagnostics_tracing-static.a` | 诊断跟踪组件 |
| `libmono-component-diagnostics_tracing-stub-static.a` | 诊断跟踪存根 |
| `libmono-component-hot_reload-static.a` | 热重载组件 |
| `libmono-component-hot_reload-stub-static.a` | 热重载存根 |
| `libmono-component-marshal-ilgen-static.a` | 编组IL生成组件 |
| `libmono-component-marshal-ilgen-stub-static.a` | 编组IL生成存根 |
| `libmono-profiler-aot.a` | AOT分析器 |
| `libmonosgen-2.0.a` | Mono SGen垃圾回收器 |

**系统库文件**位于 `artifacts/bin/runtime/net8.0-linux-Debug-x64/` 目录下：

| 文件名 | 用途 |
|--------|------|
| `libSystem.Globalization.Native.a` | 全球化支持静态库 |
| `libSystem.Native.so` | 系统本机库 |

## macOS

### 环境要求
[Requirements to build dotnet/runtime on macOS](https://github.com/dotnet/runtime/blob/main/docs/workflow/requirements/macos-requirements.md)

### 编译步骤
```bash
# Debug版本
./build.sh mono+libs

# Release版本
./build.sh mono+libs -c release
```

### 产物目录

#### Include文件
```
artifacts/bin/mono/osx.x64.Debug/include
```

#### DLL文件
- [Microsoft.NETCore.App.Runtime.Mono.maccatalyst-x64](https://www.nuget.org/packages/Microsoft.NETCore.App.Runtime.Mono.maccatalyst-x64/8.0.5)
  > 下载后修改后缀为.zip并解压
- 根据`runtimes/maccatalyst-x64/lib/net8.0`筛选`artifacts/bin/runtime/net8.0-osx-Debug-x64`中的dll
- `artifacts/bin/mono/osx.x64.Debug/System.Private.CoreLib.dll`

#### 库文件

**基础库文件**位于`artifacts/obj/mono/osx.x64.Debug/out/lib`目录下：
- `libmono-component-debugger-static.a`
- `libmono-component-debugger-stub-static.a`
- `libmono-component-diagnostics_tracing-static.a`
- `libmono-component-diagnostics_tracing-stub-static.a`
- `libmono-component-hot_reload-static.a`
- `libmono-component-hot_reload-stub-static.a`
- `libmono-component-marshal-ilgen-static.a`
- `libmono-component-marshal-ilgen-stub-static.a`
- `libmono-profiler-aot.a`
- `libmonosgen-2.0.a`

**核心库文件**位于`artifacts/bin/mono/osx.x64.Debug`目录下：
- `libcoreclr.dylib`

**系统库文件**位于`artifacts/bin/runtime/net8.0-osx-Debug-x64`目录下：
- `libSystem.Globalization.Native.a`
- `libSystem.Globalization.Native.dylib`
- `libSystem.IO.Compression.Native.dylib`
- `libSystem.IO.Ports.Native.dylib`
- `libSystem.Native.dylib`
- `libSystem.Net.Security.Native.dylib`
- `libSystem.Security.Cryptography.Native.Apple.dylib`
- `libSystem.Security.Cryptography.Native.OpenSsl.dylib`

## Android

### 环境要求
[Testing Libraries on Android](https://github.com/dotnet/runtime/blob/main/docs/workflow/testing/libraries/testing-android.md)

### 编译步骤
```bash
# Debug版本
./build.sh mono+libs -os android -arch arm64

# Release版本
./build.sh mono+libs -os android -arch arm64 -c release
```

### 产物目录

#### Include文件
```
artifacts/bin/mono/android.arm64.Debug/include
```

#### DLL文件
- [Microsoft.NETCore.App.Runtime.Mono.android-arm64](https://www.nuget.org/packages/Microsoft.NETCore.App.Runtime.Mono.android-arm64/8.0.5)
  > 下载后修改后缀为.zip并解压
- 根据`runtimes/android-arm64/lib/net8.0`筛选`artifacts/bin/runtime/net8.0-android-Debug-arm64`中的dll
- `artifacts/bin/mono/android.arm64.Debug/System.Private.CoreLib.dll`

#### 库文件

**核心库文件**位于`artifacts/obj/mono/android.arm64.Debug/out/lib`目录下：
- `libmono-component-debugger-static.a`
- `libmono-component-debugger-stub-static.a`
- `libmono-component-diagnostics_tracing-static.a`
- `libmono-component-diagnostics_tracing-stub-static.a`
- `libmono-component-hot_reload-static.a`
- `libmono-component-hot_reload-stub-static.a`
- `libmono-component-marshal-ilgen-static.a`
- `libmono-component-marshal-ilgen-stub-static.a`
- `libmonosgen-2.0.a`
- `libmonosgen-2.0.so`

**系统库文件**位于`artifacts/bin/runtime/net8.0-android-Debug-arm64`目录下：
- `libSystem.Native.so`

## iOS

:::tip 提示
iOS编译需要macOS系统和完整的Xcode开发环境，支持AOT编译。
:::

### 环境要求

**系统要求**:
- macOS 12.0 (Monterey) 或更高版本
- Xcode 14.0 或更高版本
- iOS SDK 16.0 或更高版本
- 命令行工具

**安装命令行工具**:
```bash
sudo xcode-select --install
sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
```

**详细要求**: [Testing Libraries on iOS, tvOS, and MacCatalyst](https://github.com/dotnet/runtime/blob/main/docs/workflow/testing/libraries/testing-apple.md)

### 编译选项

**自定义修改参考**: [v8.0.5-iOS 修改参考](https://github.com/crazytuzi/runtime/commit/511b15e287bbb5eb084911da3218f9466b8950e0)

### 编译步骤

```bash
# 克隆源码
git clone https://github.com/dotnet/runtime.git
cd runtime

# Debug版本编译
./build.sh mono+libs -os ios -arch arm64

# Release版本编译
./build.sh mono+libs -os ios -arch arm64 -c release

# 多架构编译 (Universal Binary)
./build.sh mono+libs -os ios -arch "arm64+x64"
```

### AOT编译步骤

:::info AOT编译说明
Ahead-of-Time (AOT) 编译将.NET程序集预编译为本机代码，提升iOS应用启动性能。
:::

```bash
# 1. 拷贝核心库到AOT工具目录
cp artifacts/obj/mono/System.Private.CoreLib/arm64/Debug/PreTrim/System.Private.CoreLib.dll \
   artifacts/obj/mono/ios.arm64.Debug/cross/mono/mini/mono-aot-cross/

# 2. 进入AOT工具目录
cd artifacts/obj/mono/ios.arm64.Debug/cross/mono/mini/mono-aot-cross

# 3. 执行AOT编译
./mono-aot-cross --aot=asmonly,static,interp System.Private.CoreLib.dll

# 4. 编译汇编代码为目标文件
xcrun -sdk iphoneos clang -arch arm64 \
    -o System.Private.CoreLib.dll.o \
    -c System.Private.CoreLib.dll.s

# 5. 创建静态库
ar rcs System.Private.CoreLib.dll.a System.Private.CoreLib.dll.o
```

**AOT编译参数说明**:
- `asmonly`: 仅生成汇编代码
- `static`: 生成静态链接库
- `interp`: 支持解释器回退

### 产物目录

#### Include文件
```
artifacts/bin/mono/ios.arm64.Debug/include
```

#### DLL文件
- [Microsoft.NETCore.App.Runtime.Mono.ios-arm64](https://www.nuget.org/packages/Microsoft.NETCore.App.Runtime.Mono.ios-arm64/8.0.5)
  > 下载后修改后缀为.zip并解压
- 根据`runtimes/ios-arm64/lib/net8.0`筛选`artifacts/bin/runtime/net8.0-ios-Debug-arm64`中的dll
- `artifacts/obj/mono/System.Private.CoreLib/arm64/Debug/PreTrim/System.Private.CoreLib.dll`

#### 库文件

**核心库文件**位于`artifacts/obj/mono/ios.arm64.Debug/out/lib`目录下：
- `libmono-component-debugger-static.a`
- `libmono-component-debugger-stub-static.a`
- `libmono-component-diagnostics_tracing-static.a`
- `libmono-component-diagnostics_tracing-stub-static.a`
- `libmono-component-hot_reload-static.a`
- `libmono-component-hot_reload-stub-static.a`
- `libmono-component-marshal-ilgen-static.a`
- `libmono-component-marshal-ilgen-stub-static.a`
- `libmonosgen-2.0.a`

**系统库文件**位于`artifacts/bin/runtime/net8.0-ios-Debug-arm64`目录下：
- `libicudata.a`
- `libicui18n.a`
- `libicuuc.a`
- `libSystem.Globalization.Native.a`
- `libSystem.Globalization.Native.dylib`
- `libSystem.IO.Compression.Native.dylib`
- `libSystem.Native.dylib`
- `libSystem.Net.Security.Native.dylib`
- `libSystem.Security.Cryptography.Native.Apple.dylib`

**AOT编译产物**位于`artifacts/obj/mono/ios.arm64.Debug/cross/mono/mini/mono-aot-cross`目录下：
- `System.Private.CoreLib.dll.a`

### Framework创建步骤

:::tip Framework用途
创建iOS Framework便于在Xcode项目中集成Mono运行时。
:::

#### 1. 创建Xcode项目

在Xcode中创建新项目：
- **模板**: iOS → Framework
- **产品名称**: `Mono`
- **语言**: Objective-C
- **选项**: 取消勾选 `Include Tests` 和 `Include Documentation`
- **部署目标**: iOS 14.0或更高

#### 2. 配置构建设置

**Library Search Paths**:
```
Build Settings → Library Search Paths → Debug
```
添加包含 `*.dylib` 文件的目录路径

**链接库文件**:
```
Build Phases → Link Binary With Libraries
```
添加所需的 `*.dylib` 文件

**嵌入设置**:
```
General → Frameworks and Libraries → Embed
```
选择 `Embed & Sign`

**构建目标**:
选择 `Any iOS Device (arm64)`

#### 3. 项目设置优化

**工作空间设置**:
```
File → Project Settings → Advanced → Custom
```
选择 `Relative to Workspace`

#### 4. 自动化打包脚本

```bash
#!/bin/bash
# build_framework.sh

set -e

PROJECT_NAME="Mono"
BUILD_DIR="Build/Products"
SCHEME_NAME="Debug-iphoneos"

echo "开始构建 ${PROJECT_NAME} Framework..."

# 清理之前的构建产物
xcodebuild clean -project ${PROJECT_NAME}.xcodeproj -scheme ${PROJECT_NAME}

# 构建Framework
xcodebuild archive \
    -project ${PROJECT_NAME}.xcodeproj \
    -scheme ${PROJECT_NAME} \
    -destination "generic/platform=iOS" \
    -archivePath ${BUILD_DIR}/${PROJECT_NAME}.xcarchive \
    SKIP_INSTALL=NO \
    BUILD_LIBRARY_FOR_DISTRIBUTION=YES

# 创建嵌入式Framework目录
EMBED_DIR="${BUILD_DIR}/${SCHEME_NAME}/${PROJECT_NAME}.embeddedframework"
mkdir -p "${EMBED_DIR}"

# 拷贝Framework
cp -R "${BUILD_DIR}/${SCHEME_NAME}/${PROJECT_NAME}.framework" "${EMBED_DIR}/"

# 压缩打包
cd "${BUILD_DIR}/${SCHEME_NAME}"
zip -r "${PROJECT_NAME}.embeddedframework.zip" "${PROJECT_NAME}.embeddedframework"

echo "Framework打包完成: ${BUILD_DIR}/${SCHEME_NAME}/${PROJECT_NAME}.embeddedframework.zip"
```

**使用方法**:
```bash
chmod +x build_framework.sh
./build_framework.sh
```
