---
sidebar_position: 4
custom_edit_url: null
---

# 覆盖函数

通过覆盖函数，重写C++和蓝图函数逻辑

---

## 介绍

对于标记有BlueprintImplementableEvent或者BlueprintNativeEvent的C++和蓝图函数，能够被C#重写函数逻辑。

---

## 流程

1. 通过[Partial](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/partial-classes-and-methods)，新建一个函数所属类的Partial类，并且标记`Override`
2. 声明一个拥有相同函数签名的函数，并且同样需要标记`Override`

<details>

<summary>示例：覆盖函数</summary>

```csharp
using Script.Common;

namespace Script.UnrealCSharpTest
{
    [Override]
    public partial class ATestCSharpFunctionActor
    {
        [Override]
        public void SetInt32ValueFunction(int InInt32Value)
        {
            Int32Value = InInt32Value;
        }

        [Override]
        public int GetInt32ValueFunction()
        {
            return Int32Value;
        }

        [Override]
        public void OutInt32ValueFunction(ref int OutInt32Value)
        {
            OutInt32Value = Int32Value;
        }
    }
}
```

</details>

---

## 代码扫描
在生成C#工程的时候，会先通过[Microsoft.CodeAnalysis.CSharp](https://www.nuget.org/packages/Microsoft.CodeAnalysis.CSharp/)对项目代码进行一次代码扫描，分析出标记有`Override`的类和函数，并且生成到`项目/Intermediate/CodeAnalysis`中，避免覆盖函数后续再生成，导致重定义。

---
