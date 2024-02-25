---
sidebar_position: 6
custom_edit_url: null
---

# 动态类

不需要蓝图载体的动态类

---

## 介绍

通过C#可以动态生成UClass，UStruct和UEnum，并且不需要对应的蓝图载体。

---

## 基础概念

在[反射](reflection.md)中，有介绍C++中Package和C#中Namespace的映射关系，对于动态类来说，namespace被限制为一定是`Script.CoreUObject`，也就是说，动态类都会被创建到`/Script/CoreUObject`中。这样做的目是有一些特殊的情景，如动态类被其他类所引用或者被放置在场景中时，但是由于没有对应的蓝图载体，如果放在其他Package中，会导致序列化失败。其中UClassAttribute，UStructAttribute和UFunctionAttribute继承于OverrideAttribute，换言之，动态类的变量访问和函数调用又会回到反射绑定流程。同时，为了编辑器热重载，需要保持文件名和枚举名或者类名一致。

---

## 变量

同[反射](reflection.md)中，动态类的变量也是[Properties](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/properties)，而非[Fields](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/fields)，并且为了性能优化，需要额外定义一个`uint`类型的加上`__`前缀的静态变量。

<details>

<summary>示例：变量</summary>

```csharp
[UProperty]
public int Value
{
    get => FPropertyImplementation.FProperty_GetStructInt32PropertyImplementation(GarbageCollectionHandle, __Value);

    set => FPropertyImplementation.FProperty_SetStructInt32PropertyImplementation(GarbageCollectionHandle, __Value, value);
}

private static uint __Value = 0;
```

</details>

---

## 函数

对于引用类型，只有ref参数，没有out参数。如果函数还会被其他蓝图调用，需要同时标记BlueprintCallable和BlueprintNativeEvent。

<details>

<summary>示例：函数</summary>

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

</details>

---

## UEnum

如果需要标记BlueprintType，即被蓝图使用，需要将UnderlyingType设置为byte。

<details>

<summary>示例：UEnum</summary>

```csharp
using Script.Common;
using Script.Dynamic;

namespace Script.CoreUObject
{
    [UEnum, BlueprintType]
    [PathName("/Script/CoreUObject.ETestDynamicEnum")]
    public enum ETestDynamicEnum : byte
    {
        TestDynamicZero = 0,
        TestDynamicOne = 1,
        TestDynamicTwo = 2
    }
}
```

</details>

---

## UStruct

目前有一些比较繁琐的定义，后续会提供编辑器创建功能。

<details>

<summary>示例：UStruct</summary>

```csharp
using Script.Common;
using Script.Dynamic;
using Script.Library;

namespace Script.CoreUObject
{
    [UStruct, BlueprintType]
    [PathName("/Script/CoreUObject.TestDynamicStruct")]
    public class FTestDynamicStruct : IStaticStruct, IGarbageCollectionHandle
    {
        public static UScriptStruct StaticStruct()
        {
            return UStructImplementation.UStruct_StaticStructImplementation("/Script/CoreUObject.TestDynamicStruct");
        }

        public FTestDynamicStruct() =>
            UStructImplementation.UStruct_RegisterImplementation(this, Utils.GetPathName(GetType()));

        ~FTestDynamicStruct() =>
            UStructImplementation.UStruct_UnRegisterImplementation(GarbageCollectionHandle);

        public static bool operator ==(FTestDynamicStruct A, FTestDynamicStruct B) =>
            UStructImplementation.UStruct_IdenticalImplementation(StaticStruct().GarbageCollectionHandle,
                A?.GarbageCollectionHandle ?? nint.Zero, B?.GarbageCollectionHandle ?? nint.Zero);

        public static bool operator !=(FTestDynamicStruct A, FTestDynamicStruct B) =>
            !UStructImplementation.UStruct_IdenticalImplementation(StaticStruct().GarbageCollectionHandle,
                A?.GarbageCollectionHandle ?? nint.Zero, B?.GarbageCollectionHandle ?? nint.Zero);

        public override bool Equals(object Other) => this == Other as FTestDynamicStruct;

        public override int GetHashCode() => (int)GarbageCollectionHandle;

        [UProperty, BlueprintReadWrite]
        public int Value
        {
            get => FPropertyImplementation.FProperty_GetStructInt32PropertyImplementation(GarbageCollectionHandle, __Value);

            set => FPropertyImplementation.FProperty_SetStructInt32PropertyImplementation(GarbageCollectionHandle, __Value, value);
        }

        private static uint __Value = 0;

        public nint GarbageCollectionHandle { get; set; }
    }
}
```

</details>

---

## UClass

约定了命令规范，对于动态蓝图类，需要以`_C`结尾。

<details>

<summary>示例：UClass</summary>

```csharp
using Script.Common;
using Script.Dynamic;
using Script.Engine;
using Script.Library;

namespace Script.CoreUObject
{
    [UClass]
    [PathName("/Script/CoreUObject.TestRawDynamicFunctionActor")]
    public class ATestRawDynamicFunctionActor : AActor, IStaticClass
    {
        public ATestRawDynamicFunctionActor()
        {
            Int32Value = 12;
        }

        [UProperty]
        public int Int32Value
        {
            get => FPropertyImplementation.FProperty_GetObjectInt32PropertyImplementation(GarbageCollectionHandle, __Int32Value);

            set => FPropertyImplementation.FProperty_SetObjectInt32PropertyImplementation(GarbageCollectionHandle, __Int32Value, value);
        }

        public new static UClass StaticClass()
        {
            return UObjectImplementation.UObject_StaticClassImplementation("/Script/CoreUObject.TestRawDynamicFunctionActor");
        }

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

        private static uint __Int32Value = 0;
    }
}
```

</details>

---
