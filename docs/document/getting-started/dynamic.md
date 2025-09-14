---
title: ⚡ 动态类系统
description: 无需蓝图载体，直接通过 C# 创建 UE 类型
hide_title: false
sidebar_position: 5
custom_edit_url: null
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# ⚡ 动态类系统

<div style={{textAlign: 'center', marginBottom: '2rem'}}>
  <p style={{fontSize: '1.1rem', color: 'var(--ifm-color-emphasis-600)'}}>
    🎯 <strong>革命性功能：纯 C# 创建完整的 UE 类型系统</strong>
  </p>
</div>

---

## 🌟 什么是动态类？

<div className="alert alert--success">
  <strong>🚀 核心特性：</strong> 动态类系统允许您通过 C# 代码直接生成 UClass、UInterface、UStruct 和 UEnum，无需任何蓝图载体！
</div>

### 🎯 支持的类型

<div className="row">
  <div className="col col--6">
    <div className="card margin--sm">
      <div className="card__header">
        <h4>📋 基础类型</h4>
      </div>
      <div className="card__body">
        <ul>
          <li>🔢 <strong>UEnum</strong> - 枚举类型</li>
          <li>📦 <strong>UStruct</strong> - 结构体类型</li>
        </ul>
      </div>
    </div>
  </div>
  <div className="col col--6">
    <div className="card margin--sm">
      <div className="card__header">
        <h4>🏗️ 高级类型</h4>
      </div>
      <div className="card__body">
        <ul>
          <li>🎮 <strong>UClass</strong> - 游戏对象类</li>
          <li>🔌 <strong>UInterface</strong> - 接口类型</li>
        </ul>
      </div>
    </div>
  </div>
</div>

---

## 🏗️ 架构设计原理

<div className="alert alert--info">
  <strong>🔍 技术细节：</strong> 了解动态类的底层工作机制，有助于更好地使用这一强大功能。
</div>

### 📦 Package 映射机制

在 [反射文档](reflection.md) 中介绍了 C++ Package 和 C# Namespace 的映射关系。对于动态类有特殊处理：

<div className="row">
  <div className="col col--6">
    <div className="card margin--sm">
      <div className="card__header">
        <h4>🎯 统一 Package</h4>
      </div>
      <div className="card__body">
        <p><strong>所有动态类都创建在：</strong></p>
        <p><code>/Script/CoreUObject</code></p>
        <p><strong>原因：</strong></p>
        <ul>
          <li>避免序列化失败</li>
          <li>支持场景放置</li>
          <li>确保引用安全</li>
        </ul>
      </div>
    </div>
  </div>
  <div className="col col--6">
    <div className="card margin--sm">
      <div className="card__header">
        <h4>🔄 热重载支持</h4>
      </div>
      <div className="card__body">
        <p><strong>特殊设计：</strong></p>
        <ul>
          <li>继承于 OverrideAttribute</li>
          <li>回到反射绑定流程</li>
          <li>支持编辑器热重载</li>
          <li>规范的文件命名</li>
        </ul>
      </div>
    </div>
  </div>
</div>

### 📝 命名规范

<div className="alert alert--warning">
  <strong>⚠️ 重要：</strong> 动态类必须遵循严格的命名规范，这是确保系统正常工作的关键！
</div>

| 类型 | 类名前缀 | 文件名前缀 | 示例 |
|------|----------|------------|------|
| UEnum | `E` | `E` | `ETestDynamicEnum` |
| UStruct | `F` | 无 | `FTestDynamicStruct` |
| UClass | `U` 或 `A` | 无 | `ATestDynamicActor` |
| UInterface | `I` | 无 | `ITestDynamicInterface` |

---

## 🔢 UEnum - 动态枚举

<div className="alert alert--info">
  <strong>🎯 蓝图兼容性：</strong> 如果需要标记 BlueprintType（被蓝图使用），UnderlyingType 必须设置为 <code>byte</code>。
</div>

### 📋 创建要求

- **类名前缀：** `E` (例如: `ETestDynamicEnum`)
- **文件名前缀：** `E` (例如: `ETestDynamicEnum.cs`)
- **蓝图类型：** UnderlyingType 必须为 `byte`

<details>

<summary>💻 完整代码示例：动态枚举</summary>

<Tabs>

<TabItem value="basic" label="🔤 基础枚举" default>

```csharp title="ETestDynamicEnum.cs"
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

<div className="alert alert--success">
  <strong>✅ 特性说明：</strong>
  <ul>
    <li><code>[UEnum]</code> - 标记为 UE 枚举类型</li>
    <li><code>[BlueprintType]</code> - 允许在蓝图中使用</li>
    <li><code>: byte</code> - 确保蓝图兼容性</li>
  </ul>
</div>

</TabItem>

<TabItem value="usage" label="🎯 使用示例">

```csharp title="EnumUsage.cs"
public class EnumUsageExample
{
    public void UseEnum()
    {
        // 直接使用动态枚举
        ETestDynamicEnum currentValue = ETestDynamicEnum.TestDynamicOne;
        
        // 枚举比较
        if (currentValue == ETestDynamicEnum.TestDynamicZero)
        {
            Console.WriteLine("值为零");
        }
        
        // 枚举转换
        byte numericValue = (byte)currentValue;
        ETestDynamicEnum backToEnum = (ETestDynamicEnum)numericValue;
        
        // 在蓝图函数中使用
        SetGameState(ETestDynamicEnum.TestDynamicTwo);
    }
    
    [UFunction, BlueprintCallable]
    public void SetGameState(ETestDynamicEnum newState)
    {
        // 这个函数可以在蓝图中调用
        // 参数类型会在蓝图中正确显示
    }
}
```

</TabItem>

<TabItem value="advanced" label="🚀 高级特性">

```csharp title="EGameState.cs"
using Script.Dynamic;

namespace Script.CoreUObject
{
    [UEnum, BlueprintType]
    public enum EGameState : byte
    {
        [DisplayName("游戏菜单")]
        Menu = 0,
        
        [DisplayName("游戏中")]
        Playing = 1,
        
        [DisplayName("暂停")]
        Paused = 2,
        
        [DisplayName("游戏结束")]
        GameOver = 3
    }
    
    [UEnum, BlueprintType] 
    public enum EPlayerAction : byte
    {
        Idle = 0,
        Moving = 1,
        Jumping = 2,
        Attacking = 4,  // 可以用作位标志
        Defending = 8
    }
}
```

<div className="alert alert--info">
  <strong>💡 高级用法：</strong>
  <ul>
    <li>使用 <code>[DisplayName]</code> 自定义蓝图中的显示名称</li>
    <li>可以设计为位标志枚举</li>
    <li>支持多个枚举在同一文件中</li>
  </ul>
</div>

</TabItem>

</Tabs>

</details>

---

## 📦 UStruct - 动态结构体

<div className="alert alert--info">
  <strong>📝 命名规范：</strong> 类名需要 <code>F</code> 前缀，但文件名不需要前缀。
</div>

### 📋 创建要求

- **类名前缀：** `F` (例如: `FTestDynamicStruct`)
- **文件名：** 无前缀 (例如: `TestDynamicStruct.cs`)
- **继承标记：** 必须标记 `partial` 以支持代码生成

<details>

<summary>💻 完整代码示例：动态结构体</summary>

<Tabs>

<TabItem value="basic" label="📦 基础结构体" default>

```csharp title="TestDynamicStruct.cs"
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

<div className="alert alert--success">
  <strong>✅ 特性说明：</strong>
  <ul>
    <li><code>[UStruct]</code> - 标记为 UE 结构体</li>
    <li><code>[BlueprintType]</code> - 蓝图可用</li>
    <li><code>partial</code> - 支持代码生成</li>
    <li><code>[UProperty]</code> - 标记属性为 UE 属性</li>
  </ul>
</div>

</TabItem>

<TabItem value="complex" label="🏗️ 复杂结构体">

```csharp title="PlayerStats.cs"
using Script.Dynamic;
using Script.CoreUObject;
using Script.Engine;

namespace Script.CoreUObject
{
    [UStruct, BlueprintType]
    public partial class FPlayerStats
    {
        [UProperty, BlueprintReadWrite, Category = "基础属性"]
        public int Health { get; set; } = 100;
        
        [UProperty, BlueprintReadWrite, Category = "基础属性"]
        public int MaxHealth { get; set; } = 100;
        
        [UProperty, BlueprintReadWrite, Category = "基础属性"]
        public float Speed { get; set; } = 600.0f;
        
        [UProperty, BlueprintReadWrite, Category = "游戏数据"]
        public int Score { get; set; } = 0;
        
        [UProperty, BlueprintReadWrite, Category = "游戏数据"]
        public int Level { get; set; } = 1;
        
        [UProperty, BlueprintReadWrite, Category = "状态"]
        public bool IsAlive { get; set; } = true;
        
        [UProperty, BlueprintReadWrite, Category = "位置信息"]
        public FVector LastPosition { get; set; }
        
        // 构造函数
        public FPlayerStats()
        {
            Health = MaxHealth;
            LastPosition = FVector.ZeroVector;
        }
    }
}
```

</TabItem>

<TabItem value="usage" label="🎯 使用示例">

```csharp title="StructUsage.cs"
public class StructUsageExample
{
    public void UseStruct()
    {
        // 创建结构体实例
        var playerStats = new FPlayerStats
        {
            Health = 80,
            Score = 1500,
            Level = 5
        };
        
        // 访问属性
        int currentHealth = playerStats.Health;
        
        // 修改属性
        playerStats.Health = Math.Max(0, playerStats.Health - 10);
        
        // 检查状态
        if (playerStats.Health <= 0)
        {
            playerStats.IsAlive = false;
        }
        
        // 在函数中使用
        UpdatePlayerUI(playerStats);
    }
    
    [UFunction, BlueprintCallable]
    public void UpdatePlayerUI(FPlayerStats stats)
    {
        // 这个函数可以在蓝图中调用
        // 结构体会作为完整的参数类型显示
    }
}
```

</TabItem>

<TabItem value="advanced" label="🚀 高级特性">

```csharp title="GameConfig.cs"
using Script.Dynamic;
using Script.CoreUObject;

namespace Script.CoreUObject
{
    [UStruct, BlueprintType]
    public partial class FGameConfig
    {
        [UProperty, BlueprintReadWrite, Category = "图形设置"]
        [Meta(ClampMin = "0", ClampMax = "3")]
        public int GraphicsQuality { get; set; } = 2;
        
        [UProperty, BlueprintReadWrite, Category = "音频设置"]
        [Meta(ClampMin = "0.0", ClampMax = "1.0")]
        public float MasterVolume { get; set; } = 1.0f;
        
        [UProperty, BlueprintReadWrite, Category = "游戏设置"]
        public bool EnableTutorial { get; set; } = true;
        
        [UProperty, BlueprintReadWrite, Category = "控制设置"]
        public TArray<FInputActionKeyMapping> KeyMappings { get; set; }
        
        // 验证配置的方法
        public bool IsValid()
        {
            return GraphicsQuality >= 0 && GraphicsQuality <= 3 &&
                   MasterVolume >= 0.0f && MasterVolume <= 1.0f;
        }
        
        // 重置为默认值
        public void ResetToDefaults()
        {
            GraphicsQuality = 2;
            MasterVolume = 1.0f;
            EnableTutorial = true;
        }
    }
}
```

<div className="alert alert--info">
  <strong>💡 高级特性：</strong>
  <ul>
    <li><code>[Meta]</code> 特性用于添加编辑器约束</li>
    <li><code>Category</code> 用于在蓝图中分组显示</li>
    <li>支持复杂的 UE 类型如 <code>TArray</code></li>
    <li>可以添加自定义方法（不会暴露给蓝图）</li>
  </ul>
</div>

</TabItem>

</Tabs>

</details>

---

---

## 🎮 UClass - 动态游戏类

<div className="alert alert--info">
  <strong>📝 命名约定：</strong> 类名需要 <code>U</code> 或 <code>A</code> 前缀，文件名不需要前缀。动态蓝图类需要以 <code>_C</code> 结尾。
</div>

### 📋 创建要求

- **Actor 类前缀：** `A` (例如: `ATestDynamicActor`)
- **Object 类前缀：** `U` (例如: `UTestDynamicComponent`) 
- **文件名：** 无前缀 (例如: `TestDynamicActor.cs`)
- **蓝图类：** 以 `_C` 结尾 (例如: `AMyGameActor_C`)

<details>

<summary>💻 完整代码示例：动态游戏类</summary>

<Tabs>

<TabItem value="actor" label="🎭 Actor 类" default>

```csharp title="TestDynamicActor.cs"
using Script.Dynamic;
using Script.Engine;
using Script.CoreUObject;

namespace Script.CoreUObject
{
    [UClass, BlueprintType, Blueprintable]
    public partial class ATestDynamicActor : AActor, ITestDynamicInterface
    {
        public ATestDynamicActor()
        {
            // 设置默认值
            Int32Value = 12;
            PrimaryActorTick.bCanEverTick = true;
            
            // 创建默认组件
            SceneComponent = CreateDefaultSubobject<USceneComponent>("SceneComponent");
            RootComponent = SceneComponent;
        }

        [UProperty, BlueprintReadWrite, Category = "测试属性"]
        public int Int32Value { get; set; }
        
        [UProperty, BlueprintReadWrite, Category = "组件"]
        public USceneComponent SceneComponent { get; set; }

        [UFunction, BlueprintCallable, Category = "测试函数"]
        public void SetInt32ValueFunction(int InInt32Value)
        {
            Int32Value = InInt32Value;
        }

        [UFunction, BlueprintCallable, BlueprintPure, Category = "测试函数"]
        public int GetInt32ValueFunction()
        {
            return Int32Value;
        }

        [UFunction, BlueprintCallable, Category = "测试函数"]
        public void OutInt32ValueFunction(ref int OutInt32Value)
        {
            OutInt32Value = Int32Value;
        }
        
        // 重写 Actor 生命周期函数
        public override void BeginPlay()
        {
            base.BeginPlay();
            // 游戏开始时的逻辑
        }
        
        public override void Tick(float DeltaTime)
        {
            base.Tick(DeltaTime);
            // 每帧更新逻辑
        }
    }
}
```

<div className="alert alert--success">
  <strong>✅ 特性说明：</strong>
  <ul>
    <li><code>[UClass]</code> - 标记为 UE 类</li>
    <li><code>[BlueprintType]</code> - 可在蓝图中使用作为变量类型</li>
    <li><code>[Blueprintable]</code> - 可以创建蓝图子类</li>
    <li><code>partial</code> - 支持代码生成</li>
  </ul>
</div>

</TabItem>

<TabItem value="component" label="🔧 Component 类">

```csharp title="TestDynamicComponent.cs"
using Script.Dynamic;
using Script.Engine;
using Script.CoreUObject;

namespace Script.CoreUObject
{
    [UClass, BlueprintType, Blueprintable]
    public partial class UTestDynamicComponent : UActorComponent
    {
        public UTestDynamicComponent()
        {
            // 组件默认设置
            PrimaryComponentTick.bCanEverTick = true;
            Health = MaxHealth;
        }

        [UProperty, BlueprintReadWrite, Category = "健康系统"]
        [Meta(ClampMin = "0")]
        public float Health { get; set; } = 100.0f;
        
        [UProperty, BlueprintReadWrite, Category = "健康系统"]
        [Meta(ClampMin = "1")]
        public float MaxHealth { get; set; } = 100.0f;
        
        [UProperty, BlueprintReadOnly, Category = "状态")]
        public bool IsAlive 
        { 
            get => Health > 0; 
        }

        [UFunction, BlueprintCallable, Category = "健康系统"]
        public void TakeDamage(float DamageAmount)
        {
            Health = FMath.Max(0.0f, Health - DamageAmount);
            
            if (Health <= 0)
            {
                OnDeath();
            }
        }

        [UFunction, BlueprintCallable, Category = "健康系统"]
        public void Heal(float HealAmount)
        {
            Health = FMath.Min(MaxHealth, Health + HealAmount);
        }
        
        [UFunction, BlueprintImplementableEvent, Category = "事件"]
        public void OnDeath();
        
        [UFunction, BlueprintImplementableEvent, Category = "事件"]
        public void OnHealthChanged(float NewHealth, float OldHealth);

        public override void TickComponent(float DeltaTime, ELevelTick TickType, ref FActorComponentTickFunction ThisTickFunction)
        {
            base.TickComponent(DeltaTime, TickType, ref ThisTickFunction);
            // 组件更新逻辑
        }
    }
}
```

</TabItem>

<TabItem value="gamemode" label="🎮 GameMode 类">

```csharp title="TestDynamicGameMode.cs"
using Script.Dynamic;
using Script.Engine;
using Script.CoreUObject;

namespace Script.CoreUObject
{
    [UClass, BlueprintType, Blueprintable]
    public partial class ATestDynamicGameMode : AGameModeBase
    {
        public ATestDynamicGameMode()
        {
            // 设置默认类
            DefaultPawnClass = typeof(ATestDynamicPawn);
            PlayerControllerClass = typeof(ATestDynamicPlayerController);
        }

        [UProperty, BlueprintReadWrite, Category = "游戏设置"]
        public int MaxPlayers { get; set; } = 4;
        
        [UProperty, BlueprintReadWrite, Category = "游戏设置"]
        public float GameDuration { get; set; } = 300.0f; // 5分钟
        
        [UProperty, BlueprintReadOnly, Category = "游戏状态"]
        public float RemainingTime { get; private set; }
        
        [UProperty, BlueprintReadOnly, Category = "游戏状态"]
        public bool IsGameActive { get; private set; }

        [UFunction, BlueprintCallable, Category = "游戏控制"]
        public void StartGame()
        {
            IsGameActive = true;
            RemainingTime = GameDuration;
            OnGameStarted();
        }

        [UFunction, BlueprintCallable, Category = "游戏控制"]
        public void EndGame()
        {
            IsGameActive = false;
            OnGameEnded();
        }
        
        [UFunction, BlueprintImplementableEvent, Category = "游戏事件"]
        public void OnGameStarted();
        
        [UFunction, BlueprintImplementableEvent, Category = "游戏事件"]
        public void OnGameEnded();
        
        [UFunction, BlueprintImplementableEvent, Category = "游戏事件"]
        public void OnTimeUpdate(float NewTime);

        public override void Tick(float DeltaSeconds)
        {
            base.Tick(DeltaSeconds);
            
            if (IsGameActive && RemainingTime > 0)
            {
                RemainingTime -= DeltaSeconds;
                OnTimeUpdate(RemainingTime);
                
                if (RemainingTime <= 0)
                {
                    EndGame();
                }
            }
        }
    }
}
```

</TabItem>

<TabItem value="usage" label="🎯 使用示例">

```csharp title="DynamicClassUsage.cs"
public class DynamicClassUsageExample
{
    public void SpawnDynamicActor()
    {
        // 获取世界引用
        UWorld world = GetWorld();
        
        // 生成动态 Actor
        var spawnParams = new FActorSpawnParameters
        {
            SpawnCollisionHandlingOverride = ESpawnActorCollisionHandlingMethod.AlwaysSpawn
        };
        
        var dynamicActor = world.SpawnActor<ATestDynamicActor>(
            new FVector(0, 0, 100), 
            FRotator.ZeroRotator, 
            spawnParams
        );
        
        // 使用动态 Actor 的功能
        dynamicActor.SetInt32ValueFunction(42);
        int value = dynamicActor.GetInt32ValueFunction();
        
        // 添加动态组件
        var healthComponent = dynamicActor.CreateDefaultSubobject<UTestDynamicComponent>("HealthComponent");
        healthComponent.TakeDamage(25.0f);
    }
    
    public void CreateDynamicComponent()
    {
        // 为现有 Actor 添加动态组件
        var actor = GetOwner();
        var component = actor.CreateDefaultSubobject<UTestDynamicComponent>("DynamicComponent");
        
        // 配置组件
        component.MaxHealth = 150.0f;
        component.Heal(50.0f);
    }
}
```

</TabItem>

</Tabs>

</details>

---

---

## 🔌 UInterface - 动态接口

<div className="alert alert--warning">
  <strong>⚠️ 限制：</strong> 动态接口不支持继承蓝图接口，但可以定义纯 C# 接口供动态类实现。
</div>

### 📋 创建要求

- **接口名前缀：** `I` (例如: `ITestDynamicInterface`)
- **文件名：** 无前缀 (例如: `TestDynamicInterface.cs`)
- **必须继承：** `IInterface` 基接口

<details>

<summary>💻 完整代码示例：动态接口</summary>

<Tabs>

<TabItem value="basic" label="🔌 基础接口" default>

```csharp title="TestDynamicInterface.cs"
using Script.Dynamic;
using Script.CoreUObject;

namespace Script.CoreUObject
{
    [UInterface, Blueprintable]
    public interface ITestDynamicInterface : IInterface
    {
        // 接口定义（仅声明，无实现）
    }
}
```

<div className="alert alert--success">
  <strong>✅ 特性说明：</strong>
  <ul>
    <li><code>[UInterface]</code> - 标记为 UE 接口</li>
    <li><code>[Blueprintable]</code> - 允许蓝图实现</li>
    <li><code>: IInterface</code> - 必须继承基接口</li>
  </ul>
</div>

</TabItem>

<TabItem value="advanced" label="🚀 高级接口">

```csharp title="IHealthSystem.cs"
using Script.Dynamic;
using Script.CoreUObject;

namespace Script.CoreUObject
{
    [UInterface, Blueprintable]
    public interface IHealthSystem : IInterface
    {
        // 接口方法将在实现类中定义
    }
    
    // 接口的默认实现类（可选）
    public class HealthSystemImplementation
    {
        [UFunction, BlueprintCallable, BlueprintImplementableEvent]
        public virtual void TakeDamage(float DamageAmount) { }
        
        [UFunction, BlueprintCallable, BlueprintImplementableEvent]
        public virtual void Heal(float HealAmount) { }
        
        [UFunction, BlueprintCallable, BlueprintImplementableEvent]
        public virtual float GetHealthPercentage() { return 1.0f; }
    }
}
```

</TabItem>

<TabItem value="implementation" label="🎯 接口实现">

```csharp title="ImplementingClass.cs"
using Script.Dynamic;
using Script.Engine;
using Script.CoreUObject;

namespace Script.CoreUObject
{
    [UClass, BlueprintType]
    public partial class AHealthyActor : AActor, IHealthSystem
    {
        public AHealthyActor()
        {
            Health = MaxHealth;
        }

        [UProperty, BlueprintReadWrite, Category = "健康系统"]
        public float Health { get; set; } = 100.0f;
        
        [UProperty, BlueprintReadWrite, Category = "健康系统"]
        public float MaxHealth { get; set; } = 100.0f;

        // 实现接口方法
        [UFunction, BlueprintCallable, Category = "健康系统"]
        public void TakeDamage(float DamageAmount)
        {
            Health = FMath.Max(0.0f, Health - DamageAmount);
            if (Health <= 0)
            {
                OnDeath();
            }
        }

        [UFunction, BlueprintCallable, Category = "健康系统"]
        public void Heal(float HealAmount)
        {
            Health = FMath.Min(MaxHealth, Health + HealAmount);
        }

        [UFunction, BlueprintCallable, BlueprintPure, Category = "健康系统"]
        public float GetHealthPercentage()
        {
            return MaxHealth > 0 ? Health / MaxHealth : 0.0f;
        }
        
        [UFunction, BlueprintImplementableEvent, Category = "事件"]
        public void OnDeath();
    }
}
```

</TabItem>

<TabItem value="usage" label="🎮 接口使用">

```csharp title="InterfaceUsage.cs"
public class InterfaceUsageExample
{
    public void UseInterface()
    {
        // 通过接口引用操作对象
        IHealthSystem healthSystem = GetSomeHealthyActor();
        
        // 调用接口方法
        healthSystem.TakeDamage(25.0f);
        healthSystem.Heal(10.0f);
        
        float healthPercent = healthSystem.GetHealthPercentage();
        
        // 检查接口实现
        if (healthSystem is AHealthyActor actor)
        {
            // 访问具体类型的成员
            actor.Health = 50.0f;
        }
    }
    
    // 接受接口参数的函数
    [UFunction, BlueprintCallable]
    public void ProcessHealthSystem(TScriptInterface<IHealthSystem> healthSystem)
    {
        if (healthSystem.GetInterface() != null)
        {
            healthSystem.GetInterface().TakeDamage(10.0f);
        }
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

对于引用类型，只有ref参数，没有out参数。如果函数还会被其他蓝图调用，需要同时标记BlueprintCallable和BlueprintImplementableEvent。

<details>

<summary>示例：函数</summary>

<Tabs>

<TabItem value="C#" label="C#" default>

```csharp
[UFunction, BlueprintCallable, BlueprintImplementableEvent]
public void SetInt32ValueFunction(int InInt32Value)
{
    Int32Value = InInt32Value;
}

[UFunction, BlueprintCallable, BlueprintImplementableEvent]
public int GetInt32ValueFunction()
{
    return Int32Value;
}

[UFunction, BlueprintCallable, BlueprintImplementableEvent]
public void OutInt32ValueFunction(ref int OutInt32Value)
{
    OutInt32Value = Int32Value;
}
```

</TabItem>

</Tabs>

</details>

---
