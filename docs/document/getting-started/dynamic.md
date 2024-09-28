---
title: 动态类
description: 不需要蓝图载体的动态类
hide_title: true
slug: dynamic
sidebar_position: 5
custom_edit_url: null
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## 介绍

通过C#可以动态生成UClass，UInterface，UStruct和UEnum，并且不需要蓝图载体。

---

## 基础概念

在[反射](reflection.md)中，有介绍C++中Package和C#中Namespace的映射关系，对于动态类来说，namespace被限制为一定是`Script.CoreUObject`，也就是说，动态类都会被创建到`/Script/CoreUObject`中。这样做的目是有一些特殊的情景，如动态类被其他类所引用或者被放置在场景中时，但是由于没有蓝图载体，如果放在其他Package中，会导致序列化失败。其中UClassAttribute，UStructAttribute和UFunctionAttribute继承于OverrideAttribute，换言之，动态类的变量访问和函数调用又会回到反射绑定流程。同时，为了编辑器热重载，文件命名具有规范。

---

## UEnum

如果需要标记BlueprintType，即被蓝图使用，需要将UnderlyingType设置为byte。枚举名和文件名都需要`E`前缀。

<details>

<summary>示例：UEnum</summary>

<Tabs>

<TabItem value="C#" label="C#" default>

```csharp
using Script.Dynamic;

namespace Script.CoreUObject
{
    [UEnum, BlueprintType]
    public enum ETestDynamicEnum : byte
    {
        TestDynamicZero = 0,
        TestDynamicOne = 1,
        TestDynamicTwo = 2
    }
}
```

</TabItem>

</Tabs>

</details>

---

## UStruct

类名需要`F`前缀，文件名不需要`F`前缀。

<details>

<summary>示例：UStruct</summary>

<Tabs>

<TabItem value="C#" label="C#" default>

```csharp
using Script.Dynamic;

namespace Script.CoreUObject
{
    [UStruct, BlueprintType]
    public partial class FTestDynamicStruct
    {
        [UProperty, BlueprintReadWrite]
        public int Value { get; set; }
    }
}
```

</TabItem>

</Tabs>

</details>

---

## UClass

约定了命令规范，对于动态蓝图类，需要以`_C`结尾。类名需要`U`或者`A`前缀，文件名不需要`U`或者`A`前缀。

<details>

<summary>示例：UClass</summary>

<Tabs>

<TabItem value="C#" label="C#" default>

```csharp
using Script.Dynamic;
using Script.Engine;

namespace Script.CoreUObject
{
    [UClass]
    public partial class ATestRawDynamicFunctionActor : AActor, ITestDynamicInterface
    {
        public ATestRawDynamicFunctionActor()
        {
            Int32Value = 12;
        }

        [UProperty]
        public int Int32Value { get; set; }

        [UFunction]
        public void SetInt32ValueFunction(int InInt32Value)
        {
            Int32Value = InInt32Value;
        }

        [UFunction]
        public int GetInt32ValueFunction()
        {
            return Int32Value;
        }

        [UFunction]
        public void OutInt32ValueFunction(ref int OutInt32Value)
        {
            OutInt32Value = Int32Value;
        }
    }
}
```

</TabItem>

</Tabs>

</details>

---

## UInterface

不支持继承蓝图接口。类名需要`U`前缀，文件名不需要`U`前缀。

<details>

<summary>示例：UInterface</summary>

<Tabs>

<TabItem value="C#" label="C#" default>

```csharp
using Script.Dynamic;

namespace Script.CoreUObject
{
    [UInterface, Blueprintable]
    public partial class UTestDynamicInterface : UInterface
    {
    }

    public interface ITestDynamicInterface : IInterface
    {
    }
}
```

</TabItem>

</Tabs>

</details>

---

## 变量

同[反射](reflection.md)中，动态类的变量也是[Properties](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/properties)，而非[Fields](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/fields)。

<details>

<summary>示例：变量</summary>

<Tabs>

<TabItem value="C#" label="C#" default>

```csharp
[UProperty]
public int Int32Value { get; set; }
```

</TabItem>

</Tabs>

</details>

---

## 函数

对于引用类型，只有ref参数，没有out参数。如果函数还会被其他蓝图调用，需要同时标记BlueprintCallable和BlueprintNativeEvent。

<details>

<summary>示例：函数</summary>

<Tabs>

<TabItem value="C#" label="C#" default>

```csharp
[UFunction, BlueprintCallable, BlueprintNativeEvent]
public void SetInt32ValueFunction(int InInt32Value)
{
    Int32Value = InInt32Value;
}

[UFunction, BlueprintCallable, BlueprintNativeEvent]
public int GetInt32ValueFunction()
{
    return Int32Value;
}

[UFunction, BlueprintCallable, BlueprintNativeEvent]
public void OutInt32ValueFunction(ref int OutInt32Value)
{
    OutInt32Value = Int32Value;
}
```

</TabItem>

</Tabs>

</details>

---
