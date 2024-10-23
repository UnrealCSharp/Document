---
title: 静态导出
description: 导出未被标记反射的类，变量和函数
hide_title: true
slug: binding
sidebar_position: 4
custom_edit_url: null
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## 介绍

基于UE的反射机制能够访问到被标记反射的类，变量和函数，但是还是存在部分类由于不是UE支持的反射类型，或者类，变量和函数并没有被标记反射而导致访问不到。针对这种情况，提供了静态导出，拓展了支持的类，变量和函数，同时也可以用于优化变量访问和函数调用的效率。

---

## 枚举

静态导出枚举时，会通过std::underlying_type_t拿到UnderlyingType并生成，保证C++和C#两侧内存大小一致。

<details>

<summary>示例：枚举</summary>

<Tabs>

<TabItem value="raw" label="raw" default>

```cpp
enum ERawTestEnum
{
	RawTestEnumZero,
	RawTestEnumOne,
	RawTestEnumTwo
};
```

</TabItem>

<TabItem value="binding" label="binding">

```cpp
BINDING_PROJECT_ENUM(ERawTestEnum)

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

static FRegisterRawTestEnum RegisterRawTestEnum;
```

</TabItem>

</Tabs>

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

<details>

<summary>示例：类/结构体</summary>

<Tabs>

<TabItem value="raw" label="raw" default>

```cpp
#pragma once

class FTestBindingFunction
{
public:
	FTestBindingFunction();

public:
	void SetInt32ValueFunction(int32 InInt32Value);

	int32 GetInt32ValueFunction() const;

	void OutInt32ValueFunction(int32& OutInt32Value) const;

public:
	int32 Int32Value;
};
```

</TabItem>

<TabItem value="binding" label="binding">

```cpp
BINDING_PROJECT_CLASS(FTestBindingFunction)

struct FRegisterTestBindingFunction
{
	FRegisterTestBindingFunction()
	{
		TBindingClassBuilder<FTestBindingFunction>(NAMESPACE_BINDING)
			.Property("Int32Value", BINDING_PROPERTY(&FTestBindingFunction::Int32Value))
			.Function("SetInt32ValueFunction", BINDING_FUNCTION(&FTestBindingFunction::SetInt32ValueFunction))
			.Function("GetInt32ValueFunction", BINDING_FUNCTION(&FTestBindingFunction::GetInt32ValueFunction))
			.Function("OutInt32ValueFunction", BINDING_FUNCTION(&FTestBindingFunction::OutInt32ValueFunction));
	}
};

static FRegisterTestBindingFunction RegisterTestBindingFunction;
```

</TabItem>

</Tabs>

</details>

---

## 通过UHT生成

通过UHT，根据[配置](../guides/configuration/editor)的模块或者插件，自动生成静态绑定代码。

<details>

<summary>示例：引用静态绑定文件</summary>

```cpp
#if WITH_BINDING
#include "Binding/Class/PreHeader.h"
#include "Engine.header.inl"
#include "UMG.header.inl"
#endif
```

</details>

---

## 示例

```Source/UnrealCSharp/Private/Domain/InternalCall```下有不少示例，如[FRegisterVector](https://github.com/crazytuzi/UnrealCSharp/blob/main/Source/UnrealCSharp/Private/Domain/InternalCall/FRegisterVector.cpp)。

---
