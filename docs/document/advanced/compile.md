---
title: 编译Mono
description: 如何多平台编译Mono
hide_title: true
slug: compile
sidebar_position: 3
custom_edit_url: null
---

##

### 源码
    - [runtime](https://github.com/dotnet/runtime)

---

### Windows
    1. 环境：[Requirements to build dotnet/runtime on Windows](https://github.com/dotnet/runtime/blob/main/docs/workflow/requirements/windows-requirements.md)
    2. 编译
        - Debug：`build.cmd mono+libs`
        - Release：`build.cmd mono+libs -c release`
    3. include
        - `artifacts/bin/mono/windows.x64.Debug/include`
    4. dll
        - [Microsoft.NETCore.App.Runtime.Mono.win-x64](https://www.nuget.org/packages/Microsoft.NETCore.App.Runtime.Mono.win-x64/8.0.5)，修改后缀为.zip，并解压
        - 根据`runtimes/win-x64/lib/net8.0`筛选`artifacts/bin/runtime/net8.0-windows-Debug-x64`中的dll
        - `artifacts/bin/mono/windows.x64.Debug/System.Private.CoreLib.dll`
    5. lib
        - `artifacts/obj/mono/windows.x64.Debug/out/lib`
            - `coreclr.dll`
            - `coreclr.import.lib`
            - `mono-component-debugger-static.lib`
            - `mono-component-debugger-stub-static.lib`
            - `mono-component-diagnostics_tracing-static.lib`
            - `mono-component-diagnostics_tracing-stub-static.lib`
            - `mono-component-hot_reload-static.lib`
            - `mono-component-hot_reload-stub-static.lib`
            - `mono-component-marshal-ilgen-static.lib`
            - `mono-component-marshal-ilgen-stub-static.lib`
            - `mono-profiler-aot.lib`
            - `monosgen-2.0.lib`

---

### Linux
    1. 环境：[Requirements to build dotnet/runtime on Linux](https://github.com/dotnet/runtime/blob/main/docs/workflow/requirements/linux-requirements.md)
    2. 编译选项：[v8.0.5-Linux](https://github.com/crazytuzi/runtime/commit/0458ead883ddb88e269fc14d1937d95f77279031)
    3. 编译
        - Debug：`./build.sh mono+libs`
        - Release：`./build.sh mono+libs -c release`
    4. include
        - `artifacts/bin/mono/linux.x64.Debug/include`
    5. dll
        - [Microsoft.NETCore.App.Runtime.Mono.linux-x64](https://www.nuget.org/packages/Microsoft.NETCore.App.Runtime.Mono.linux-x64/8.0.5)，修改后缀为.zip，并解压
        - 根据`runtimes/linux-x64/lib/net8.0`筛选`artifacts/bin/runtime/net8.0-linux-Debug-x64`中的dll
        - `artifacts/bin/mono/linux.x64.Debug/System.Private.CoreLib.dll`
    6. lib
        - `artifacts/obj/mono/linux.x64.Debug/out/lib`
            - `libcoreclr.so`
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
        - `artifacts/bin/runtime/net8.0-linux-Debug-x64`
            - `libSystem.Globalization.Native.a`
            - `libSystem.Native.so`

---      

### macOS
    1. 环境：[Requirements to build dotnet/runtime on macOS](https://github.com/dotnet/runtime/blob/main/docs/workflow/requirements/macos-requirements.md)
    2. 编译
        - Debug：`./build.sh mono+libs`
        - Release：`./build.sh mono+libs -c release`
    3. include
        - `artifacts/bin/mono/osx.x64.Debug/include`
    4. dll
        - [Microsoft.NETCore.App.Runtime.Mono.maccatalyst-x64](https://www.nuget.org/packages/Microsoft.NETCore.App.Runtime.Mono.maccatalyst-x64/8.0.5)，修改后缀为.zip，并解压
        - 根据`runtimes/maccatalyst-x64/lib/net8.0`筛选`artifacts/bin/runtime/net8.0-osx-Debug-x64`中的dll
        - `artifacts/bin/mono/osx.x64.Debug/System.Private.CoreLib.dll`
    5. lib
        - `artifacts/obj/mono/osx.x64.Debug/out/lib`
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
        - `artifacts/bin/mono/osx.x64.Debug`
            - `libcoreclr.dylib`
        - `artifacts/bin/runtime/net8.0-osx-Debug-x64`
            - `libSystem.Globalization.Native.a`
            - `libSystem.Globalization.Native.dylib`
            - `libSystem.IO.Compression.Native.dylib`
            - `libSystem.IO.Ports.Native.dylib`
            - `libSystem.Native.dylib`
            - `libSystem.Net.Security.Native.dylib`
            - `libSystem.Security.Cryptography.Native.Apple.dylib`
            - `libSystem.Security.Cryptography.Native.OpenSsl.dylib`

---

### Android
    1. 环境：[Testing Libraries on Android](https://github.com/dotnet/runtime/blob/main/docs/workflow/testing/libraries/testing-android.md)
    2. 编译
        - Debug：`./build.sh mono+libs -os android -arch arm64`
        - Release：`./build.sh mono+libs -os android -arch arm64 -c release`
    3. include
        - `artifacts/bin/mono/android.arm64.Debug/include`
    4. dll
        - [Microsoft.NETCore.App.Runtime.Mono.android-arm64](https://www.nuget.org/packages/Microsoft.NETCore.App.Runtime.Mono.android-arm64/8.0.5)，修改后缀为.zip，并解压
        - 根据`runtimes/android-arm64/lib/net8.0`筛选`artifacts/bin/runtime/net8.0-android-Debug-arm64`中的dll
        - `artifacts/bin/mono/android.arm64.Debug/System.Private.CoreLib.dll`
    5. lib
        - `artifacts/obj/mono/android.arm64.Debug/out/lib`
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
        - `artifacts/bin/runtime/net8.0-android-Debug-arm64`
            - `libSystem.Native.so`

---

### IOS
    1. 环境：[Testing Libraries on iOS, tvOS, and MacCatalyst](https://github.com/dotnet/runtime/blob/main/docs/workflow/testing/libraries/testing-apple.md)
    2. 编译选项：[v8.0.5-IOS](https://github.com/crazytuzi/runtime/commit/511b15e287bbb5eb084911da3218f9466b8950e0)
    3. 编译
        - Debug：`./build.sh mono+libs -os ios -arch arm64`
        - Release：`./build.sh mono+libs -os ios -arch arm64 -c release`
        - 拷贝`artifacts/obj/mono/System.Private.CoreLib/arm64/Debug/PreTrim/System.Private.CoreLib.dll`到`artifacts/obj/mono/ios.arm64.Debug/cross/mono/mini/mono-aot-cross`
        - `./mono-aot-cross --aot=asmonly,static,interp System.Private.CoreLib.dll`
        - `xcrun -sdk iphoneos clang -arch arm64 -o System.Private.CoreLib.dll.o -c System.Private.CoreLib.dll.s`
        - `ar rcs System.Private.CoreLib.dll.a System.Private.CoreLib.dll.o`
    4. include
        - `artifacts/bin/mono/ios.arm64.Debug/include`
    5. dll
        - [Microsoft.NETCore.App.Runtime.Mono.ios-arm64](https://www.nuget.org/packages/Microsoft.NETCore.App.Runtime.Mono.ios-arm64/8.0.5)，修改后缀为.zip，并解压
        - 根据`runtimes/ios-arm64/lib/net8.0`筛选`artifacts/bin/runtime/net8.0-ios-Debug-arm64`中的dll
        - `artifacts/obj/mono/System.Private.CoreLib/arm64/Debug/PreTrim/System.Private.CoreLib.dll`
    6. lib
        -  `artifacts/obj/mono/ios.arm64.Debug/out/lib`
            - `libmono-component-debugger-static.a`
            - `libmono-component-debugger-stub-static.a`
            - `libmono-component-diagnostics_tracing-static.a`
            - `libmono-component-diagnostics_tracing-stub-static.a`
            - `libmono-component-hot_reload-static.a`
            - `libmono-component-hot_reload-stub-static.a`
            - `libmono-component-marshal-ilgen-static.a`
            - `libmono-component-marshal-ilgen-stub-static.a`
            - `libmonosgen-2.0.a`
        - `artifacts/bin/runtime/net8.0-ios-Debug-arm64`
            - `libicudata.a`
            - `libicui18n.a`
            - `libicuuc.a`
            - `libSystem.Globalization.Native.a`
            - `libSystem.Globalization.Native.dylib`
            - `libSystem.IO.Compression.Native.dylib`
            - `libSystem.Native.dylib`
            - `libSystem.Net.Security.Native.dylib`
            - `libSystem.Security.Cryptography.Native.Apple.dylib`
        - `artifacts/obj/mono/ios.arm64.Debug/cross/mono/mini/mono-aot-cross`
            - `System.Private.CoreLib.dll.a`
    7. Framework
        1. 新建`IOS`-`Framework`
        2. `Product`填写`Mono`
        3. `Language`选择`Objective-C`
        4. 不勾选`Include Tests`和`Include Documentation`
        5. `Minmum Deployments`选择`14.0`
        6. `Build Settings`-`Library Search Paths`-`Debug`选择`*dylib`目录
        7. `Build Phases`-`Link Binary With Libraries`添加`*dylib`
        8. `General`-`Frameworks and Libraries`-`Embed`选择`Embed & Sign`
        9. `Build`选择`Any IOS Device（arm64）`
        10. `File`-`Project Setting`-`Advanced`-`Custom`选择`Relative to Workspace`
        11. `Build/Products/Debug-iphones`新建`Mono.embeddedframework`文件夹，拷贝`Mono.framework`到`Mono.embeddedframework`，压缩`Mono.embeddedframework`

---
