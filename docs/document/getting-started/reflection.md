---
title: 反射
description: 介绍对于UE反射的支持，变量访问和函数调用
hide_title: true
slug: reflection
sidebar_position: 2
custom_edit_url: null
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## 介绍

通过UE提供的反射，插件会根据[配置](../guides/configuration/editor)生成指定模块和插件下的类，结构体，枚举，以及资源类型。

---

## 基础概念

UE和C#两侧的反射类型存在一一对应关系，对于简单类型比较容易理解，针对如UObject，蓝图等此类复杂类型，需要先了解一下UE中Package的概念，推荐[UE4的资源管理](https://zhuanlan.zhihu.com/p/357904199)和[[中文直播]第33期 | UE4资产管理基础1 | Epic 大钊](https://www.bilibili.com/video/BV1Mr4y1A7nZ)。

<Tabs>

<TabItem value="C++" label="C++" default>

如AActor，会将`/Script/Engine.Actor`映射为`Script.Engine.Actor`，规则为去掉首位`/`，并将`/`替换为`.`

</TabItem>

<TabItem value="blueprint" label="Blueprint">

如BP_TestReflectionPropertyActor_C，会将`/Game/UnitTest/Reflection/BP_TestReflectionPropertyActor.BP_TestReflectionPropertyActor_C`映射为`Script.Game.UnitTest.Reflection.BP_TestReflectionPropertyActor_C`，规则为加上`Script/`，去掉`BP_TestReflectionPropertyActor.`，并将`/`替换为`.`

</TabItem>

</Tabs>

---

## 数据类型

针对不同的数据类型，有不同的处理方式，分为以下几个大类。

<Tabs>

<TabItem value="base" label="基本类型" default>

| C++       | C#        |
| --------  | --------  |
| bool      | bool      |
| int8      | sbyte     |
| int16     | short     |
| int32     | int       |
| int64     | long      |
| uint8     | byte      |
| uint16    | ushort    |
| uint32    | uint      |
| uint64    | ulong     |
| float     | float     |
| double    | double    |

</TabItem>

<TabItem value="string" label="字符串">

| C++       | C#                    		|
| --------  | --------              		|
| FName     | Script.CoreUObject.FName   	|
| FText     | Script.CoreUObject.FText   	|
| FString   | Script.CoreUObject.FString 	|

</TabItem>

<TabItem value="enum" label="枚举">

对于枚举和TEnumAsByte都会被对应到映射关系下的枚举。

<details>

<summary>示例：枚举</summary>

<Tabs>

<TabItem value="C++" label="C++" default>

```cpp
UENUM(BlueprintType)
enum ETestEnum
{
	TestEnumZero,
	TestEnumOne,
	TestEnumTwo
};
```

</TabItem>

<TabItem value="C#" label="C#">

```csharp
using Script.CoreUObject;

namespace Script.UnrealCSharpTest
{
	[PathName("/Script/UnrealCSharpTest.ETestEnum")]
	public enum ETestEnum : byte
	{
		TestEnumZero = 0,
		TestEnumOne = 1,
		TestEnumTwo = 2,
	}
}
```

</TabItem>

</Tabs>

</details>

</TabItem>

<TabItem value="struct" label="结构体">

会生成反射变量，StaticStruct，构造函数和析构函数等。

<details>

<summary>示例：结构体</summary>

<Tabs>

<TabItem value="C++" label="C++" default>

```cpp
USTRUCT(BlueprintType)
struct FTestStruct
{
	GENERATED_BODY()

	UPROPERTY(BlueprintReadWrite)
	int32 Value;
};
```

</TabItem>

<TabItem value="C#" label="C#">

```csharp
using Script.Library;
using Script.CoreUObject;

namespace Script.UnrealCSharpTest
{
	[PathName("/Script/UnrealCSharpTest.TestStruct")]
	public partial class FTestStruct : IStaticStruct, IGarbageCollectionHandle
	{
		public static UScriptStruct StaticStruct()
		{
			return UStructImplementation.UStruct_StaticStructImplementation("/Script/UnrealCSharpTest.TestStruct");
		}

		public FTestStruct() => UStructImplementation.UStruct_RegisterImplementation(this, Utils.GetPathName(GetType()));

		~FTestStruct() => UStructImplementation.UStruct_UnRegisterImplementation(GarbageCollectionHandle);

		public static bool operator ==(FTestStruct A, FTestStruct B) => UStructImplementation.UStruct_IdenticalImplementation(StaticStruct().GarbageCollectionHandle, A?.GarbageCollectionHandle??nint.Zero, B?.GarbageCollectionHandle??nint.Zero);

		public static bool operator !=(FTestStruct A, FTestStruct B) => !UStructImplementation.UStruct_IdenticalImplementation(StaticStruct().GarbageCollectionHandle, A?.GarbageCollectionHandle??nint.Zero, B?.GarbageCollectionHandle??nint.Zero);

		public override bool Equals(object Other) => this == Other as FTestStruct;

		public override int GetHashCode() => (int)GarbageCollectionHandle;

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

</TabItem>

</Tabs>

</details>

</TabItem>

<TabItem value="UObject" label="UObject">

会生成反射变量，反射函数，接口函数和StaticClass等。

<details>

<summary>示例：UObject</summary>

<Tabs>

<TabItem value="C++" label="C++" default>

```cpp
#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Actor.h"
#include "UnitTest/Core/TestInterface.h"
#include "TestReflectionPropertyActor.generated.h"

UCLASS()
class UNREALCSHARPTEST_API ATestReflectionPropertyActor : public AActor, public ITestInterface
{
	GENERATED_BODY()

public:
	// Sets default values for this actor's properties
	ATestReflectionPropertyActor();

public:
	UPROPERTY(BlueprintReadWrite)
	int32 Int32Value;
};
```

</TabItem>

<TabItem value="C#" label="C#">

```csharp
using Script.Engine;
using Script.CoreUObject;
using Script.Library;

namespace Script.UnrealCSharpTest
{
    [PathName("/Script/UnrealCSharpTest.TestReflectionPropertyActor")]
    public partial class ATestReflectionPropertyActor : AActor, IStaticClass, ITestInterface
    {
        public int Int32Value
        {
            get => FPropertyImplementation.FProperty_GetObjectInt32PropertyImplementation(GarbageCollectionHandle， __Int32Value);

            set => FPropertyImplementation.FProperty_SetObjectInt32PropertyImplementation(GarbageCollectionHandle， __Int32Value, value);
        }

        public new static UClass StaticClass()
        {
            return UObjectImplementation.UObject_StaticClassImplementation("/Script/UnrealCSharpTest.TestReflectionPropertyActor");
        }

        private static uint __Int32Value = 0;
    }
}
```

</TabItem>

</Tabs>

</details>

</TabItem>

<TabItem value="UObject template" label="UObject模板">

| C++               | C#                                		|
| --------          | --------                          		|
| TScriptInterface  | Script.CoreUObject.TScriptInterface`1  	|
| TSubclassOf       | Script.CoreUObject.TSubclassOf`1       	|
| TWeakObjectPtr    | Script.CoreUObject.TWeakObjectPtr`1    	|
| TLazyObjectPtr    | Script.CoreUObject.TLazyObjectPtr`1    	|
| TSoftObjectPtr    | Script.CoreUObject.TSoftObjectPtr`1    	|
| TSoftClassPtr     | Script.CoreUObject.TSoftClassPtr`1     	|

</TabItem>

<TabItem value="container" label="容器">

| C++       | C#                        	|
| --------  | --------                  	|
| TArray    | Script.CoreUObject.TArray`1  	|
| TSet      | Script.CoreUObject.TSet`1     |
| TMap      | Script.CoreUObject.TMap`2     |

</TabItem>

<TabItem value="delegate" label="代理">

单播和多播都会映射为C#中的类，并且提供相关操作函数。

<Tabs>

<TabItem value="single delegate" label="单播" default>

<details>

<summary>示例：单播</summary>

<Tabs>

<TabItem value="C++" label="C++" default>

```cpp
DECLARE_DYNAMIC_DELEGATE_RetVal_TwoParams(FEventReply, FOnPointerEvent, FGeometry, MyGeometry, const FPointerEvent&, MouseEvent);
```

</TabItem>

<TabItem value="C#" label="C#">

```csharp
using System;
using Script.CoreUObject;
using Script.Library;
using Script.SlateCore;
using Script.UMG;

namespace Script.UMG.Widget
{
	public class FOnPointerEvent : FDelegate<Func<FGeometry, FPointerEvent, FEventReply>>
	{
		public FOnPointerEvent() => FDelegateImplementation.FDelegate_RegisterImplementation(this);

		~FOnPointerEvent() => FDelegateImplementation.FDelegate_UnRegisterImplementation(GarbageCollectionHandle);

		public FEventReply Execute(FGeometry MyGeometry, FPointerEvent MouseEvent)
		{
			return FDelegateImplementation.FDelegate_Execute3Implementation(GarbageCollectionHandle, MyGeometry, MouseEvent) as FEventReply;
		}
	}
}
```

</TabItem>

</Tabs>

</details>

</TabItem>

<TabItem value="multicast delegate" label="多播">

<details>

<summary>示例：多播</summary>

<Tabs>

<TabItem value="C++" label="C++" default>

```cpp
DECLARE_DYNAMIC_MULTICAST_DELEGATE(FOnButtonClickedEvent);
```

</TabItem>

<TabItem value="C#" label="C#">

```csharp
using System;
using Script.CoreUObject;
using Script.Library;

namespace Script.UMG
{
	public class FOnButtonClickedEvent : FMulticastDelegate<Action>
	{
		public FOnButtonClickedEvent() => FMulticastDelegateImplementation.FMulticastDelegate_RegisterImplementation(this);

		~FOnButtonClickedEvent() => FMulticastDelegateImplementation.FMulticastDelegate_UnRegisterImplementation(GarbageCollectionHandle);

		public void Broadcast()
		{
			FMulticastDelegateImplementation.FMulticastDelegate_Broadcast0Implementation(GarbageCollectionHandle);
		}
	}
}
```

</TabItem>

</Tabs>

</details>

</TabItem>

</Tabs>

</TabItem>

</Tabs>

---

## 变量访问

对于C++或者蓝图中的反射变量，会生成对应的[Properties](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/properties)，而非[Fields](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/fields)，实际内存还是放在C++侧。

<details>

<summary>示例：变量访问</summary>

<Tabs>

<TabItem value="C++" label="C++" default>

```cpp
#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Actor.h"
#include "TestReflectionPropertyActor.generated.h"

UCLASS()
class UNREALCSHARPTEST_API ATestReflectionPropertyActor : public AActor
{
	GENERATED_BODY()

public:
	// Sets default values for this actor's properties
	ATestReflectionPropertyActor();

public:
	UPROPERTY(BlueprintReadWrite)
	int32 Int32Value;
};
```

</TabItem>

<TabItem value="C#" label="C#">

```csharp
using Script.CoreUObject;

namespace Script.UnrealCSharpTest
{
    public partial class UUnitTestSubsystem
    {
        private void TestReflectionProperty()
        {
            var PropertyActor = GetWorld().SpawnActor<ATestReflectionPropertyActor>(new FTransform());

            var Int32Value = PropertyActor.Int32Value;

            PropertyActor.Int32Value = 21;
        }
    }
}
```

</TabItem>

</Tabs>

</details>

---

## 函数调用

对于C++或者蓝图中的反射函数，会生成对应的C#函数，并且处理好函数默认参数。

<details>

<summary>示例：函数调用</summary>

<Tabs>

<TabItem value="C++" label="C++" default>

```cpp
#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Actor.h"
#include "TestReflectionFunctionActor.generated.h"

UCLASS()
class UNREALCSHARPTEST_API ATestReflectionFunctionActor : public AActor
{
	GENERATED_BODY()

public:
	// Sets default values for this actor's properties
	ATestReflectionFunctionActor();

public:
	UFUNCTION(BlueprintCallable)
	void SetInt32ValueFunction(int32 InInt32Value);

	UFUNCTION(BlueprintCallable)
	int32 GetInt32ValueFunction() const;

	UFUNCTION(BlueprintCallable)
	void OutInt32ValueFunction(int32& OutInt32Value) const;
};
```

</TabItem>

<TabItem value="C#" label="C#">

```csharp
using Script.CoreUObject;
using Script.Engine;

namespace Script.UnrealCSharpTest
{
    public partial class UUnitTestSubsystem
    {
        private void TestReflectionFunction()
        {
            var FunctionActor = GetWorld().SpawnActor<ATestReflectionFunctionActor>(new FTransform());

            var Int32Value = FunctionActor.GetInt32ValueFunction();

            FunctionActor.SetInt32ValueFunction(21);

            var OutInt32Value = 12;

            FunctionActor.OutInt32ValueFunction(ref OutInt32Value);
        }
    }
}
```

</TabItem>

</Tabs>

</details>

---
