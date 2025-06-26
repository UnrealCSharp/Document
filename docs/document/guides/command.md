---
title: ⌨️ 控制台命令
description: UnrealCSharp 控制台命令完整指南
hide_title: false
sidebar_position: 2
custom_edit_url: null
---

# ⌨️ 控制台命令

<div style={{textAlign: 'center', marginBottom: '2rem'}}>
  <p style={{fontSize: '1.1rem', color: 'var(--ifm-color-emphasis-600)'}}>
    🚀 <strong>使用控制台命令高效管理您的 C# 项目</strong>
  </p>
</div>

---

## 🛠️ 编辑器命令

### 核心开发命令

<div className="row">
  <div className="col col--6">
    <div className="card margin--sm">
      <div className="card__header">
        <h4>🔍 代码分析</h4>
      </div>
      <div className="card__body">
        <p><strong>命令：</strong><code>UnrealCSharp.Editor.CodeAnalysis</code></p>
        <p><strong>功能：</strong>分析 C# 代码质量和潜在问题</p>
        <p><strong>用途：</strong></p>
        <ul>
          <li>检查代码规范</li>
          <li>发现潜在错误</li>
          <li>优化建议</li>
        </ul>
      </div>
    </div>
  </div>
  <div className="col col--6">
    <div className="card margin--sm">
      <div className="card__header">
        <h4>📝 生成解决方案</h4>
      </div>
      <div className="card__body">
        <p><strong>命令：</strong><code>UnrealCSharp.Editor.SolutionGenerator</code></p>
        <p><strong>功能：</strong>生成 Visual Studio 解决方案文件</p>
        <p><strong>用途：</strong></p>
        <ul>
          <li>创建 .sln 文件</li>
          <li>配置项目引用</li>
          <li>IDE 集成支持</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<div className="row">
  <div className="col col--6">
    <div className="card margin--sm">
      <div className="card__header">
        <h4>🔨 编译代码</h4>
      </div>
      <div className="card__body">
        <p><strong>命令：</strong><code>UnrealCSharp.Editor.Compile</code></p>
        <p><strong>功能：</strong>编译 C# 代码并热重载</p>
        <p><strong>用途：</strong></p>
        <ul>
          <li>增量编译</li>
          <li>热重载更新</li>
          <li>快速验证修改</li>
        </ul>
      </div>
    </div>
  </div>
  <div className="col col--6">
    <div className="card margin--sm">
      <div className="card__header">
        <h4>⚡ 完整生成</h4>
      </div>
      <div className="card__body">
        <p><strong>命令：</strong><code>UnrealCSharp.Editor.Generator</code></p>
        <p><strong>功能：</strong>完整重新生成 C# 项目</p>
        <p><strong>用途：</strong></p>
        <ul>
          <li>全量代码生成</li>
          <li>解决方案重建</li>
          <li>清理并重新开始</li>
        </ul>
      </div>
    </div>
  </div>
</div>

---

## 🎯 命令使用指南

### 📝 如何执行命令

<div className="alert alert--info">
  <strong>💡 三种执行方式：</strong>
</div>

1. **编辑器控制台**
   - 按下 `` ` `` 键打开控制台
   - 输入命令并按回车

2. **输出日志窗口**
   - Window → Developer Tools → Output Log
   - 在命令输入框中执行

3. **蓝图节点**
   - 在蓝图中使用 "Execute Console Command" 节点
   - 适合自动化流程

### ⚡ 常用命令组合

<div className="row">
  <div className="col col--6">
    <div className="card margin--sm">
      <div className="card__header">
        <h4>🔄 开发工作流</h4>
      </div>
      <div className="card__body">
        <ol>
          <li><code>UnrealCSharp.Editor.CodeAnalysis</code></li>
          <li><code>UnrealCSharp.Editor.Compile</code></li>
          <li>测试功能</li>
          <li>重复步骤 1-3</li>
        </ol>
      </div>
    </div>
  </div>
  <div className="col col--6">
    <div className="card margin--sm">
      <div className="card__header">
        <h4>🚀 项目初始化</h4>
      </div>
      <div className="card__body">
        <ol>
          <li><code>UnrealCSharp.Editor.Generator</code></li>
          <li><code>UnrealCSharp.Editor.SolutionGenerator</code></li>
          <li>在 IDE 中打开解决方案</li>
          <li>开始开发</li>
        </ol>
      </div>
    </div>
  </div>
</div>

---

## 🔧 高级用法

### 🎯 自动化脚本

您可以将这些命令集成到自动化脚本中：

```bash
# 示例：自动化构建脚本
echo "开始 C# 代码分析..."
UnrealCSharp.Editor.CodeAnalysis

echo "编译 C# 代码..."
UnrealCSharp.Editor.Compile

echo "构建完成！"
```

### 🔄 CI/CD 集成

<div className="alert alert--success">
  <strong>💡 持续集成建议：</strong>
</div>

- 在 CI 流程中使用 `UnrealCSharp.Editor.CodeAnalysis` 进行质量检查
- 使用 `UnrealCSharp.Editor.Compile` 验证代码可编译性
- 定期使用 `UnrealCSharp.Editor.Generator` 确保代码生成一致性

---

## ⚠️ 注意事项

### 🚨 执行顺序

<div className="alert alert--warning">
  <strong>⚠️ 重要提醒：</strong>
</div>

- 首次使用时必须先执行 `UnrealCSharp.Editor.Generator`
- 代码分析应在编译前进行
- 修改绑定后需要重新生成解决方案

### 🐛 故障排除

| 问题 | 解决方案 |
|------|----------|
| 命令无法识别 | 确认插件已正确加载 |
| 编译失败 | 检查 C# 代码语法错误 |
| 生成失败 | 验证项目结构完整性 |

---

## 🤝 更多帮助

<div style={{textAlign: 'center', margin: '2rem 0'}}>
  <p>需要更多命令行工具的帮助？</p>
  <a href="/docs/document/guides/debug" className="button button--primary button--lg">
    🐛 学习调试
  </a>
  {' '}
  <a href="/docs/document/FAQ/FAQ" className="button button--secondary button--lg">
    ❓ 查看 FAQ
  </a>
</div>

---
