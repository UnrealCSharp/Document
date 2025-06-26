---
title: ❓ 常见问题
description: 使用 UnrealCSharp 过程中的常见问题与解决方案
hide_title: false
custom_edit_url: null
---

# ❓ 常见问题 (FAQ)

<div style={{textAlign: 'center', marginBottom: '2rem'}}>
  <p style={{fontSize: '1.1rem', color: 'var(--ifm-color-emphasis-600)'}}>
    💡 <strong>快速解决您在使用过程中遇到的问题</strong>
  </p>
</div>

---

## 🔧 安装相关

### Q: 插件安装后编辑器无法启动？

<div className="alert alert--warning">
  <strong>🔍 常见原因：</strong>
</div>

- **检查 .NET 版本**：确保安装了 .NET 8 或更高版本
- **检查插件完整性**：确认所有依赖文件都已正确放置
- **清理临时文件**：删除 `Binaries/` 和 `Intermediate/` 文件夹后重新编译

### Q: 无法生成 C# 项目？

<div className="alert alert--info">
  <strong>💡 解决步骤：</strong>
</div>

1. 确认插件已正确启用
2. 检查 `Generator Code` 按钮是否可见
3. 尝试使用命令行：`UnrealCSharp.Editor.Generator`
4. 查看输出日志中的错误信息

---

## 💻 开发相关

### Q: C# 代码修改后不生效？

<div className="alert alert--success">
  <strong>🔥 热重载功能：</strong>
</div>

- **自动重载**：编辑器会自动检测 C# 代码变更
- **手动重载**：使用 `UnrealCSharp.Editor.Compile` 命令
- **完整重新生成**：使用 `UnrealCSharp.Editor.Generator` 命令

### Q: 调试断点不生效？

<div className="alert alert--info">
  <strong>🐛 调试设置：</strong>
</div>

1. 确认使用 Debug 配置编译
2. 检查调试器是否正确附加到进程
3. 验证断点设置在可执行的代码行上

---

## 🌍 平台相关

### Q: Android 平台打包失败？

<div className="alert alert--warning">
  <strong>📱 Android 特殊设置：</strong>
</div>

- 确保 Android NDK 版本兼容
- 检查 ARM64 架构支持
- 验证 Mono 运行时正确打包

### Q: iOS 平台是否支持？

<div className="alert alert--success">
  <strong>✅ 完全支持：</strong>
</div>

- iOS 平台已完全支持
- 支持真机调试
- 支持 App Store 发布

---

## 🔄 热更新相关

### Q: 如何实现代码热更新？

<div className="alert alert--info">
  <strong>📦 热更新流程：</strong>
</div>

1. 将 C# 程序集打包到 Pak 文件
2. 运行时下载新的 Pak 文件
3. 调用热更新 API 加载新代码
4. 无需重启应用即可生效

### Q: 热更新有哪些限制？

<div className="alert alert--warning">
  <strong>⚠️ 注意事项：</strong>
</div>

- 不能修改已存在的静态绑定类结构
- 动态类可以完全替换
- 建议设计时考虑热更新友好的架构

---

## 🚀 性能相关

### Q: C# 性能是否足够好？

<div className="alert alert--success">
  <strong>📊 性能数据：</strong>
</div>

- 基于 .NET 8 运行时，性能优异
- 与原生 C++ 性能差距极小
- 已在商业项目中验证

### Q: 如何优化 C# 代码性能？

<div className="alert alert--info">
  <strong>💡 优化建议：</strong>
</div>

- 避免频繁的装箱/拆箱操作
- 合理使用对象池
- 减少跨语言调用频率
- 使用 `Span<T>` 等高性能类型

---

## 📚 学习资源

### Q: 有哪些学习资料？

<div className="row">
  <div className="col col--6">
    <div className="card margin--sm">
      <div className="card__header">
        <h4>📖 官方文档</h4>
      </div>
      <div className="card__body">
        <ul>
          <li><a href="/docs/document/getting-started/installation">安装指南</a></li>
          <li><a href="/docs/document/getting-started/binding">绑定机制</a></li>
          <li><a href="/docs/document/guides/debug">调试指南</a></li>
        </ul>
      </div>
    </div>
  </div>
  <div className="col col--6">
    <div className="card margin--sm">
      <div className="card__header">
        <h4>🎮 示例项目</h4>
      </div>
      <div className="card__body">
        <ul>
          <li>StackOBot 游戏示例</li>
          <li>Cropout 游戏示例</li>
          <li>社区项目案例</li>
        </ul>
      </div>
    </div>
  </div>
</div>

---

## 🤝 获取帮助

<div style={{textAlign: 'center', margin: '2rem 0'}}>
  <p style={{marginBottom: '1rem'}}>找不到您问题的答案？我们来帮助您！</p>
  <a href="/docs/community/communication" className="button button--primary button--lg">
    💬 联系社区
  </a>
  {' '}
  <a href="https://github.com/crazytuzi/UnrealCSharp/issues" className="button button--secondary button--lg">
    🐛 报告问题
  </a>
</div>

---
