---
title: 🔗 静态绑定
description: 扩展 UE 反射系统，导出未标记反射的类、变量和函数
hide_title: false
sidebar_position: 4
custom_edit_url: null
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 🔗 静态绑定 (Static Binding)

<div style={{textAlign: 'center', marginBottom: '2rem'}}>
  <p style={{fontSize: '1.1rem', color: 'var(--ifm-color-emphasis-600)'}}>
    🚀 <strong>扩展 UE 反射系统，访问更多 C++ 类型和功能</strong>
  </p>
</div>

---

## 🎯 什么是静态绑定？

<div className="alert alert--info">
  <strong>💡 核心概念：</strong> 静态绑定是 UnrealCSharp 提供的强大功能，用于扩展 UE 反射系统的覆盖范围。
</div>

虽然 UE 的反射机制可以访问标记了反射的类、变量和函数，但仍有部分内容因为以下原因无法直接访问：

<div className="row">
  <div className="col col--6">
    <div className="card margin--sm">
      <div className="card__header">
        <h4>⚠️ 无法访问的情况</h4>
      </div>
      <div className="card__body">
        <ul>
          <li>不是 UE 支持的反射类型</li>
          <li>类/变量/函数未标记反射</li>
          <li>第三方库的类型</li>
          <li>原生 C++ 标准库类型</li>
        </ul>
      </div>
    </div>
  </div>
  <div className="col col--6">
    <div className="card margin--sm">
      <div className="card__header">
        <h4>✨ 静态绑定的优势</h4>
      </div>
      <div className="card__body">
        <ul>
          <li>扩展支持的类型范围</li>
          <li>优化变量访问效率</li>
          <li>提升函数调用性能</li>
          <li>完全自定义绑定逻辑</li>
        </ul>
      </div>
    </div>
  </div>
</div>

---

## 📋 枚举绑定

<div className="alert alert--success">
  <strong>🔧 技术实现：</strong> 使用 <code>std::underlying_type_t</code> 获取 UnderlyingType 并生成，确保 C++ 和 C# 两侧内存大小完全一致。
</div>

### 🎯 绑定流程

1. **声明绑定** - 使用 `BINDING_ENUM` 宏声明枚举
2. **注册器类** - 创建注册器结构体
3. **枚举值绑定** - 使用 `TBindingEnumBuilder` 绑定每个枚举值
4. **静态注册** - 创建静态实例完成注册

<details>

<summary>💻 完整代码示例：枚举绑定</summary>

<Tabs>

<TabItem value="raw" label="🔤 原始 C++ 枚举" default>

```cpp title="ERawTestEnum.h"
// 原始的 C++ 枚举，未标记 UE 反射
enum ERawTestEnum
{
	RawTestEnumZero,
	RawTestEnumOne, 
	RawTestEnumTwo
};
```

<div className="alert alert--warning">
  <strong>⚠️ 问题：</strong> 这个枚举没有 UENUM 标记，C# 无法直接访问
</div>

</TabItem>

<TabItem value="binding" label="🔗 静态绑定代码">

```cpp title="ERawTestEnumBinding.cpp" 
// 静态绑定实现
BINDING_ENUM(ERawTestEnum)

struct FRegisterRawTestEnum
{
	FRegisterRawTestEnum()
	{
		TBindingEnumBuilder<ERawTestEnum>()
			.Enumerator("RawTestEnumZero", ERawTestEnum::RawTestEnumZero)
			.Enumerator("RawTestEnumOne", ERawTestEnum::RawTestEnumOne)
			.Enumerator("RawTestEnumTwo", ERawTestEnum::RawTestEnumTwo);
	}
};

// 静态实例，程序启动时自动注册
static FRegisterRawTestEnum RegisterRawTestEnum;
```

<div className="alert alert--success">
  <strong>✅ 解决：</strong> 现在 C# 可以直接使用这个枚举了！
</div>

</TabItem>

<TabItem value="csharp" label="🎯 C# 使用示例">

```csharp title="Usage.cs"
// 在 C# 中使用绑定的枚举
public class ExampleUsage
{
    public void UseEnum()
    {
        // 直接使用原本无法访问的枚举
        var enumValue = ERawTestEnum.RawTestEnumOne;
        
        // 进行枚举比较
        if (enumValue == ERawTestEnum.RawTestEnumZero)
        {
            // 处理逻辑
        }
        
        // 枚举转换
        int intValue = (int)enumValue;
    }
}
```

</TabItem>

</Tabs>

</details>

---

## 🏗️ 类与结构体绑定

<div className="alert alert--info">
  <strong>🔍 灵活设计：</strong> 静态绑定不区分类或结构体，但会区分反射和非反射类型，使用不同的模板进行导出。
</div>

### ⚡ 支持的高级功能

<div className="row">
  <div className="col col--6">
    <div className="card margin--sm">
      <div className="card__header">
        <h4>🔧 基础功能</h4>
      </div>
      <div className="card__body">
        <ul>
          <li>✅ <strong>构造函数</strong></li>
          <li>✅ <strong>函数重载</strong></li>
          <li>✅ <strong>继承关系</strong></li>
          <li>✅ <strong>静态变量</strong></li>
        </ul>
      </div>
    </div>
  </div>
  <div className="col col--6">
    <div className="card margin--sm">
      <div className="card__header">
        <h4>🎯 操作符重载</h4>
	</div>
		<div className="card__body">
			<p><strong>一元操作符：</strong></p>
			<p><code>!</code> <code>+</code> <code>-</code> <code>~</code> <code>++</code> <code>--</code></p>
			<p><strong>二元操作符：</strong></p>
			<p><code>+</code> <code>-</code> <code>*</code> <code>/</code> <code>%</code> <code>&</code> <code>|</code> <code>^</code></p>
			<p><code>&lt;&lt;</code> <code>&gt;&gt;</code> <code>==</code> <code>!=</code> <code>&lt;</code> <code>&lt;=</code> <code>&gt;</code> <code>&gt;=</code></p>
			<p><strong>下标运算符：</strong> <code>[]</code></p>
		</div>
    </div>
  </div>
</div>

### 🎯 绑定步骤

1. **声明绑定类** - 使用 `BINDING_CLASS` 宏
2. **创建注册器** - 实现注册结构体
3. **绑定成员** - 使用 `TBindingClassBuilder` 绑定属性和函数
4. **完成注册** - 创建静态实例

<details>

<summary>💻 完整代码示例：类绑定</summary>

<Tabs>

<TabItem value="raw" label="🔤 原始 C++ 类" default>

```cpp title="FTestBindingFunction.h"
#pragma once

// 普通的 C++ 类，未使用 UE 反射
class FTestBindingFunction
{
public:
    FTestBindingFunction();

public:
    // 设置整型值
    void SetInt32ValueFunction(int32 InInt32Value);

    // 获取整型值
    int32 GetInt32ValueFunction() const;

    // 输出参数示例
    void OutInt32ValueFunction(int32& OutInt32Value) const;

public:
    int32 Int32Value;
};
```

<div className="alert alert--warning">
  <strong>⚠️ 限制：</strong> 普通 C++ 类无法被 UE 反射系统识别，C# 无法直接访问
</div>

</TabItem>

<TabItem value="binding" label="🔗 静态绑定实现">

```cpp title="FTestBindingFunctionBinding.cpp"
#include "FTestBindingFunction.h"

// 声明这是一个需要绑定的类
BINDING_CLASS(FTestBindingFunction)

struct FRegisterTestBindingFunction
{
    FRegisterTestBindingFunction()
    {
        // 使用 TBindingClassBuilder 进行绑定
        TBindingClassBuilder<FTestBindingFunction>(NAMESPACE_BINDING)
            // 绑定属性
            .Property("Int32Value", 
                BINDING_PROPERTY(&FTestBindingFunction::Int32Value))
            
            // 绑定成员函数
            .Function("SetInt32ValueFunction", 
                BINDING_FUNCTION(&FTestBindingFunction::SetInt32ValueFunction))
            .Function("GetInt32ValueFunction", 
                BINDING_FUNCTION(&FTestBindingFunction::GetInt32ValueFunction))
            .Function("OutInt32ValueFunction", 
                BINDING_FUNCTION(&FTestBindingFunction::OutInt32ValueFunction));
    }
};

// 静态注册实例
static FRegisterTestBindingFunction RegisterTestBindingFunction;
```

<div className="alert alert--success">
  <strong>🎉 成功：</strong> 现在 C# 可以完全访问这个类的所有功能！
</div>

</TabItem>

<TabItem value="csharp" label="🎯 C# 使用示例">

```csharp title="Usage.cs"
// 在 C# 中使用绑定的类
public class ExampleUsage
{
    public void UseBindingClass()
    {
        // 创建实例
        var testObj = new FTestBindingFunction();
        
        // 直接访问属性
        testObj.Int32Value = 42;
        int currentValue = testObj.Int32Value;
        
        // 调用成员函数
        testObj.SetInt32ValueFunction(100);
        int getValue = testObj.GetInt32ValueFunction();
        
        // 使用输出参数
        int outValue;
        testObj.OutInt32ValueFunction(out outValue);
        
        Console.WriteLine($"当前值: {outValue}");
    }
}
```

</TabItem>

<TabItem value="advanced" label="🚀 高级功能示例">

```cpp title="AdvancedBinding.cpp"
// 高级绑定功能示例
BINDING_CLASS(FAdvancedClass)

struct FRegisterAdvancedClass
{
    FRegisterAdvancedClass()
    {
        TBindingClassBuilder<FAdvancedClass>(NAMESPACE_BINDING)
            // 绑定构造函数
            .Constructor<int32, float>()
            
            // 绑定静态变量
            .StaticProperty("StaticValue", 
                BINDING_STATIC_PROPERTY(&FAdvancedClass::StaticValue))
            
            // 绑定操作符重载
            .Operator("+", BINDING_OPERATOR(&FAdvancedClass::operator+))
            .Operator("==", BINDING_OPERATOR(&FAdvancedClass::operator==))
            
            // 绑定下标运算符
            .Operator("[]", BINDING_OPERATOR(&FAdvancedClass::operator[]))
            
            // 绑定重载函数
            .Function("Process", 
                BINDING_OVERLOAD(void, FAdvancedClass, (int32), &FAdvancedClass::Process))
            .Function("Process", 
                BINDING_OVERLOAD(void, FAdvancedClass, (float, bool), &FAdvancedClass::Process));
    }
};
```

</TabItem>

</Tabs>

</details>

---

## 🤖 通过 UHT 自动生成

<div className="alert alert--success">
  <strong>🚀 自动化流程：</strong> UnrealCSharp 可以通过 UHT (Unreal Header Tool) 根据配置自动生成静态绑定代码，大大减少手工编写的工作量。
</div>

### 📋 配置步骤

1. **配置模块/插件** - 在[编辑器配置](../guides/configuration/editor)中指定需要生成绑定的模块或插件
2. **运行 UHT** - UHT 会扫描指定的头文件
3. **自动生成** - 生成对应的静态绑定代码文件
4. **引用文件** - 在项目中引用生成的绑定文件

### 💡 优势对比

<div className="row">
  <div className="col col--6">
    <div className="card margin--sm">
      <div className="card__header">
        <h4>✍️ 手动绑定</h4>
      </div>
      <div className="card__body">
        <ul>
          <li>🎯 精确控制绑定内容</li>
          <li>🔧 自定义绑定逻辑</li>
          <li>⚠️ 工作量大，易出错</li>
          <li>🔄 维护成本高</li>
        </ul>
      </div>
    </div>
  </div>
  <div className="col col--6">
    <div className="card margin--sm">
      <div className="card__header">
        <h4>🤖 自动生成</h4>
      </div>
      <div className="card__body">
        <ul>
          <li>⚡ 快速批量生成</li>
          <li>✅ 减少人为错误</li>
          <li>🔄 易于维护更新</li>
          <li>📦 覆盖范围广</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<details>

<summary>💻 代码示例：引用生成的绑定文件</summary>

<Tabs>

<TabItem value="include" label="📁 引用绑定文件" default>

```cpp title="YourModule.cpp"
// 引用自动生成的静态绑定文件
#if WITH_BINDING
    #include "Binding/Class/PreHeader.h"
    
    // 引用 Engine 模块的绑定
    #include "Engine.header.inl"
    
    // 引用 UMG 模块的绑定  
    #include "UMG.header.inl"
    
    // 引用其他模块的绑定
    #include "YourCustomModule.header.inl"
#endif
```

<div className="alert alert--info">
  <strong>💡 说明：</strong>
  <ul>
    <li><code>WITH_BINDING</code> 宏确保只在需要时编译绑定代码</li>
    <li><code>PreHeader.h</code> 包含必要的绑定基础设施</li>
    <li><code>*.header.inl</code> 文件包含具体的绑定实现</li>
  </ul>
</div>

</TabItem>

<TabItem value="generated" label="🔧 生成的绑定示例">

```cpp title="Engine.header.inl (生成的文件)"
// 这是 UHT 自动生成的文件，请勿手动修改

// AActor 类的绑定
BINDING_CLASS(AActor)
struct FRegister_AActor
{
    FRegister_AActor()
    {
        TBindingClassBuilder<AActor>(TEXT("Script.Engine"))
            .Property("RootComponent", 
                BINDING_PROPERTY(&AActor::RootComponent))
            .Function("GetActorLocation", 
                BINDING_FUNCTION(&AActor::GetActorLocation))
            .Function("SetActorLocation", 
                BINDING_FUNCTION(&AActor::SetActorLocation))
            // ... 更多绑定
            ;
    }
};
static FRegister_AActor Register_AActor;

// UStaticMeshComponent 类的绑定
BINDING_CLASS(UStaticMeshComponent)
struct FRegister_UStaticMeshComponent
{
    FRegister_UStaticMeshComponent()
    {
        TBindingClassBuilder<UStaticMeshComponent>(TEXT("Script.Engine"))
            .Property("StaticMesh", 
                BINDING_PROPERTY(&UStaticMeshComponent::GetStaticMesh))
            .Function("SetStaticMesh", 
                BINDING_FUNCTION(&UStaticMeshComponent::SetStaticMesh))
            // ... 更多绑定
            ;
    }
};
static FRegister_UStaticMeshComponent Register_UStaticMeshComponent;
```

</TabItem>

<TabItem value="config" label="⚙️ 配置示例">

```json title="UnrealCSharpSettings.json"
{
    "BindingModules": [
        {
            "Name": "Engine",
            "Enabled": true,
            "IncludePatterns": [
                "*.h"
            ],
            "ExcludePatterns": [
                "*Private*",
                "*Internal*"
            ]
        },
        {
            "Name": "UMG", 
            "Enabled": true
        },
        {
            "Name": "YourCustomModule",
            "Enabled": true,
            "CustomBindings": [
                "FSpecialClass",
                "ESpecialEnum"
            ]
        }
    ]
}
```

</TabItem>

</Tabs>

</details>

---

## 📚 学习资源与示例

### 🎯 官方示例代码

<div className="alert alert--info">
  <strong>📁 示例位置：</strong> <code>Source/UnrealCSharp/Private/Domain/InternalCall</code> 目录下包含了大量的绑定示例。
</div>

<div className="row">
  <div className="col col--6">
    <div className="card margin--sm">
      <div className="card__header">
        <h4>🎯 推荐学习示例</h4>
      </div>
      <div className="card__body">
        <ul>
          <li>
            <strong>[FRegisterVector](https://github.com/crazytuzi/UnrealCSharp/blob/main/Source/UnrealCSharp/Private/Domain/InternalCall/FRegisterVector.cpp)</strong> - 向量类型绑定
          </li>
          <li><strong>FRegisterRotator</strong> - 旋转器绑定</li>
          <li><strong>FRegisterTransform</strong> - 变换矩阵绑定</li>
          <li><strong>FRegisterArray</strong> - 数组容器绑定</li>
        </ul>
      </div>
    </div>
  </div>
  <div className="col col--6">
    <div className="card margin--sm">
      <div className="card__header">
        <h4>🔧 实践建议</h4>
      </div>
      <div className="card__body">
        <ul>
          <li>从简单的结构体开始</li>
          <li>先绑定基础功能</li>
          <li>逐步添加高级特性</li>
          <li>参考官方示例代码</li>
        </ul>
      </div>
    </div>
  </div>
</div>

### 💡 最佳实践

<div className="alert alert--success">
  <strong>🎯 绑定技巧：</strong>
  <ul>
    <li><strong>命名规范：</strong> 保持 C++ 和 C# 命名一致性</li>
    <li><strong>类型安全：</strong> 确保参数和返回类型匹配</li>
    <li><strong>内存管理：</strong> 注意对象生命周期管理</li>
    <li><strong>性能考虑：</strong> 避免频繁的跨语言调用</li>
  </ul>
</div>

### 🔍 调试技巧

<Tabs>

<TabItem value="debug" label="🐛 调试方法" default>

```cpp title="调试绑定代码"
// 1. 启用详细日志
UE_LOG(LogUnrealCSharp, Log, TEXT("绑定 %s 类"), *ClassName);

// 2. 检查绑定状态
if (!IsBindingRegistered(ClassName))
{
    UE_LOG(LogUnrealCSharp, Error, TEXT("绑定失败: %s"), *ClassName);
}

// 3. 验证函数签名
static_assert(std::is_same_v<decltype(&Class::Function), ExpectedSignature>, 
              "函数签名不匹配");
```

</TabItem>

<TabItem value="testing" label="🧪 测试绑定">

```csharp title="测试绑定功能"
// C# 测试代码
public class BindingTest
{
    public void TestBinding()
    {
        try
        {
            // 测试类创建
            var testObj = new FTestBindingFunction();
            
            // 测试属性访问
            testObj.Int32Value = 123;
            Assert.AreEqual(123, testObj.Int32Value);
            
            // 测试函数调用
            testObj.SetInt32ValueFunction(456);
            Assert.AreEqual(456, testObj.GetInt32ValueFunction());
            
            Console.WriteLine("✅ 绑定测试通过！");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"❌ 绑定测试失败: {ex.Message}");
        }
    }
}
```

</TabItem>

</Tabs>

---

## 🚀 下一步

<div style={{textAlign: 'center', margin: '2rem 0'}}>
  <p>现在您已经掌握了静态绑定的基础知识！</p>
  <a href="/docs/document/getting-started/dynamic" className="button button--primary button--lg">
    ⚡ 学习动态类
  </a>
  {' '}
  <a href="/docs/document/getting-started/override" className="button button--secondary button--lg">
    🔄 了解函数覆盖
  </a>
</div>

### 📖 相关文档

- [📋 反射机制详解](./reflection) - 了解 UE 反射系统基础
- [⚡ 动态类创建](./dynamic) - 学习如何创建动态 UE 类型
- [🔄 函数覆盖](./override) - 掌握 C++ 函数重写技巧
- [⚙️ 编辑器配置](../guides/configuration/editor) - 配置自动绑定选项

---
