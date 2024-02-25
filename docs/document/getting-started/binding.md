---
sidebar_position: 5
custom_edit_url: null
---

# 静态导出

导出未被标记反射的类，变量和函数

---

## 介绍

基于UE的反射机制能够访问到被标记反射的类，变量和函数，但是还是存在部分类由于不是UE支持的反射类型，或者类，变量和函数并没有被标记反射而导致访问不到。针对这种情况，提供了静态导出，拓展了支持的类，变量和函数，同时也可以用于优化变量访问和函数调用的效率。

---

## 枚举

静态导出枚举时，会通过std::underlying_type_t拿到UnderlyingType并生成，保证C++和C#两侧内存大小一致。

<details>

<summary>示例：枚举</summary>

```cpp
BINDING_REFLECTION_CLASS(ATestBindingFunctionActor)

struct FRegisterTestBindingFunctionActor
{
	FRegisterTestBindingFunctionActor()
	{
		TReflectionClassBuilder<ATestBindingFunctionActor>(NAMESPACE_BINDING)
			.Property("Int32Value", BINDING_PROPERTY(&ATestBindingFunctionActor::Int32Value))
			.Function("SetInt32ValueFunction", BINDING_FUNCTION(&ATestBindingFunctionActor::SetInt32ValueFunction))
			.Function("GetInt32ValueFunction", BINDING_FUNCTION(&ATestBindingFunctionActor::GetInt32ValueFunction))
			.Function("OutInt32ValueFunction", BINDING_FUNCTION(&ATestBindingFunctionActor::OutInt32ValueFunction))
			.Register();
	}
};

static FRegisterTestBindingFunctionActor RegisterTestBindingFunctionActor;
```

</details>

---

## 类/结构体

静态导出时，不区分类或者结构体，但是区分反射和非反射类型，需要通过不同的模板来导出。除了常规的导出变量和函数，还支持一些额外的操作。

- 构造函数
- 函数重载
- 继承
- 静态变量
- 一元操作符，`!，+，-，~，++，--`
- 二元操作符，`+，-，*，/，%，&，|，^，<<，>>，==，!=，<，<=，>，>=`
- 下标运算符，`[]`

## 示例

```Source/UnrealCSharp/Private/Domain/InternalCall```下有不少示例，如[FRegisterVector](https://github.com/crazytuzi/UnrealCSharp/blob/main/Source/UnrealCSharp/Private/Domain/InternalCall/FRegisterVector.cpp)。

---
