# 专题研报接入 Scimaster.ai — PRD

> **文档版本**: v1.0
> **创建日期**: 2025-03-15
> **产品负责人**: [待填写]
> **技术负责人**: [待填写]
> **文档状态**: 草稿

---

## 1. 产品原型地址

| 类型 | 链接 |
|------|------|
| Figma 原型 | [待补充] |
| 线上 Demo | [待补充] |

---

## 2. 需求背景

### 2.1 业务背景

- **现状**: Scimaster.borium 平台上的"专题研报"功能已趋成熟，具备稳定的算法链路和较完整的用户体验
- **目标**: 将该能力迁移接入 Scimaster.ai，作为平台能力补全的一环

### 2.2 用户视角分析

| 维度 | 专题研报 (Research Report) | 综述撰写 (Academic Survey) |
|------|---------------------------|---------------------------|
| **目标场景** | 行业场景 | 学术场景 |
| **输出内容** | 行业分析 / 趋势洞察类报告 | 文献综述论文 |
| **输入方式** | 主题 + 参考资料 | 主题 + 参考资料 |
| **写作风格** | 商业化、数据驱动 | 学术化、严谨引用 |
| **引用规范** | 网页链接、报告来源 | 学术文献格式 (APA/MLA等) |

**核心洞察**: 二者本质上属于同一类"基于大量文献进行深度分析并生成长文"的任务，交互流程高度相似，适合合并为统一入口。

### 2.3 技术背景

- 研报与综述均沿用 Scimaster.borium 已有的算法链路
- 本次开发重点：
  - **前端展示层**的适配与统一
  - **研报最终输出格式**的处理

---

## 3. 需求目标

### 3.1 业务目标

| 目标 | 指标 | 目标值 |
|------|------|--------|
| 功能上线 | 专题研报功能完整可用 | 100% |
| 用户体验统一 | 研报与综述入口合并，交互一致 | 统一入口上线 |
| 生成成功率 | 研报生成成功率 | ≥ 95% |

### 3.2 用户目标

- 用户能够通过统一入口快速选择生成"学术综述"或"行业研报"
- 用户能够实时了解生成进度，并在生成完成后收到通知
- 用户能够获得格式规范的输出文档 (Markdown / PDF)

### 3.3 非目标 (Out of Scope)

- 本期不涉及算法链路的改动
- 本期不涉及新的数据源接入
- 本期不涉及多人协作编辑功能

---

## 4. 用户故事

### 4.1 核心用户画像

| 用户类型 | 描述 | 核心诉求 |
|----------|------|----------|
| **行业分析师** | 需要快速产出行业洞察报告 | 高效生成、数据可靠、格式专业 |
| **学术研究者** | 需要撰写文献综述 | 引用规范、内容全面、学术风格 |
| **咨询顾问** | 需要为客户产出研究报告 | 快速交付、可编辑、支持导出 |

### 4.2 用户故事列表

| ID | 作为... | 我希望... | 以便于... | 优先级 |
|----|---------|----------|----------|--------|
| US-01 | 行业分析师 | 输入研究主题后快速生成行业报告 | 节省调研和撰写时间 | P0 |
| US-02 | 用户 | 在生成过程中看到实时进度 | 了解当前状态，合理安排时间 | P0 |
| US-03 | 用户 | 生成完成后收到通知 | 不必一直等待，可以处理其他事务 | P0 |
| US-04 | 用户 | 下载 Markdown 或 PDF 格式的报告 | 方便后续编辑和分享 | P0 |
| US-05 | 学术研究者 | 选择简版或标准版综述 | 根据需求控制输出深度 | P0 |
| US-06 | 用户 | 在编辑器中修改生成的内容 | 进行个性化调整 | P1 |
| US-07 | 用户 | 将 LaTeX 编译为 PDF | 获得出版级排版质量 | P1 |

---

## 5. 需求详情

### 5.1 功能架构

```
Synthesize Draft (统一入口)
├── Academic Survey (学术综述)
│   ├── Short Version (5-8 分钟)
│   └── Standard Version (~2 小时)
└── Research Report (行业研报)
    └── 标准版 (15 分钟)
```

### 5.2 模块详情

#### 5.2.1 入口模块

| 字段 | 说明 |
|------|------|
| **统一入口名称** | Synthesize Draft |
| **入口位置** | 登录后主页面，与 Idea Brainstorming 并列 |
| **入口描述** | "Synthesize literature reviews or generate instant, data-rich survey reports from your sources." |

**模式选项**:

| 模式 | 英文名 | 描述 | 预估时间 |
|------|--------|------|----------|
| 学术综述 | Academic Survey | Literature-based overview of academic papers, methods, and research trends | 5分钟 - 2小时 |
| 行业研报 | Research Report | Insights from web and industry sources, including markets, companies, and emerging signals | ~15 分钟 |

**子选项 (仅 Academic Survey)**:

| 版本 | 说明 | 预估时间 |
|------|------|----------|
| Short Version | Rapid structured overview, lighter than deep research | 5-8 分钟 |
| Standard Version | Evidence-based survey draft with balanced depth | ~2 小时 |

#### 5.2.2 输入模块

| 元素 | 说明 |
|------|------|
| **输入框占位符** | "Describe your topic, goals, or key questions here, then choose the output type..." |
| **Type 选择器** | 点击展开模式选择面板 |
| **Add reference files** | 支持上传参考文件 (PDF, 文档等) |

**强制选择模式逻辑**:

```
用户行为流程:
1. 用户输入提示词
2. 检查是否已选择 Type
   ├── 已选择 → 直接发送请求
   └── 未选择 → 弹出模式选择弹窗
       ├── 用户选择模式 → 继续生成
       └── 用户取消 → 返回输入状态
```

**弹窗设计**:

| 元素 | 说明 |
|------|------|
| 标题 | "Choose report type" |
| 副标题 | "Choose output type before generating. Academic Survey also lets you choose the survey type." |
| 选项 | Academic Survey / Research Report |
| 按钮 | Cancel / Confirm |

#### 5.2.3 生成过程模块

**生成阶段**:

| 阶段 | 英文名 | 状态展示 | 说明 |
|------|--------|----------|------|
| 1 | Thinking | 展开显示 | "Outline completed. Key topics and section order are finalized." |
| 2 | Writing | 分章节显示进度 | 每个章节独立显示状态 (进行中/已完成) |
| 3 | Polishing | 收起显示 | 最终润色阶段 |

**Writing 阶段章节示例**:

| 章节 | 状态图标 |
|------|----------|
| Introduction | ✓ Done |
| VAE Architectures for Physics-Informed Learning | ✓ Done |
| Applications in Solid Mechanics and Material Identification | ● Writing |
| Applications in Fluid Mechanics and Turbulence Modeling | ○ Pending |
| ... | ... |

**状态图标规范**:

| 状态 | 图标 | 颜色 |
|------|------|------|
| Pending | ○ (空心圆) | Gray (#9CA3AF) |
| In Progress | ● (加载动画) | Blue (#3B82F6) |
| Completed | ✓ (勾选) | Green (#10B981) |

#### 5.2.4 通知模块

**【通知我】功能**:

| 触发条件 | 用户点击 "Notify me when ready" |
|----------|--------------------------------|
| 浏览器权限请求 | 显示系统通知权限弹窗 |
| 生成完成时 | 浏览器推送通知 |

**生成完成弹窗**:

| 元素 | 内容 |
|------|------|
| 标题 | "Report Generated Successfully" |
| 描述 | "Your report has been generated through systematic process. Would you like to open the output workspace for now? You may also access it anytime in the sidebar, under 'XXX'." |
| 按钮 | "Open Later" / "Open Project" (主按钮) |

#### 5.2.5 报告展示模块

**【P0 实现】Markdown 模式**:

| 区域 | 说明 |
|------|------|
| 左侧 - Editor | Markdown 源码编辑区域 |
| 右侧 - Preview | Markdown 实时预览 |
| Tab 栏 | 支持多文件切换 (report.md, survey.tex, etc.) |

**【P1 实现】LaTeX 模式**:

| 区域 | 说明 |
|------|------|
| 左侧 - Editor | .tex 源码编辑区域 |
| 右侧 - PDF Preview | 编译后的 PDF 预览 |
| 工具栏 | View log / Compile / Sync to PDF |

**底部工具栏**:

| 元素 | 说明 |
|------|------|
| 输入框 | "What do you want to write today?" |
| Writer 选择器 | 选择 AI 模型 (默认 claude-4.6) |
| 发送按钮 | 支持追问和修改 |

---

## 6. 交互规范

### 6.1 入口交互

```
状态机:
[初始状态] → 点击 Type → [展开选择面板]
[展开选择面板] → 选择模式 → [已选择状态]
[已选择状态] → 输入内容 + 发送 → [生成中状态]
[初始状态] → 输入内容 + 发送 → [弹出选择弹窗]
```

### 6.2 生成过程交互

| 交互 | 行为 |
|------|------|
| 点击阶段标题 | 展开/收起该阶段详情 |
| 点击 "Notify me" | 请求浏览器通知权限 |
| 点击 "Prepare Workspace" | 跳转到编辑工作区 |
| 生成完成 | 自动弹出完成提示 |

### 6.3 编辑器交互

| 交互 | 行为 |
|------|------|
| 编辑左侧 Markdown | 右侧实时预览更新 |
| 点击 Compile (LaTeX) | 触发 PDF 编译 |
| 点击 Sync to PDF | 定位到当前编辑位置对应的 PDF 页面 |

---

## 7. 数据结构

### 7.1 报告生成请求

```typescript
interface GenerateReportRequest {
  // 用户输入的主题/问题
  prompt: string;

  // 报告类型
  reportType: 'academic_survey' | 'research_report';

  // 仅当 reportType 为 academic_survey 时有效
  surveyDepth?: 'short' | 'standard';

  // 上传的参考文件 ID 列表
  referenceFileIds?: string[];

  // 用户 ID
  userId: string;
}
```

### 7.2 生成进度推送

```typescript
interface GenerationProgress {
  // 任务 ID
  taskId: string;

  // 当前阶段
  currentPhase: 'thinking' | 'writing' | 'polishing';

  // 阶段状态
  phaseStatus: {
    thinking: 'pending' | 'in_progress' | 'completed';
    writing: 'pending' | 'in_progress' | 'completed';
    polishing: 'pending' | 'in_progress' | 'completed';
  };

  // Writing 阶段的章节进度
  sections?: {
    id: string;
    title: string;
    status: 'pending' | 'in_progress' | 'completed';
  }[];

  // 预估剩余时间 (秒)
  estimatedTimeRemaining?: number;
}
```

### 7.3 报告输出

```typescript
interface GeneratedReport {
  // 报告 ID
  reportId: string;

  // 报告标题
  title: string;

  // Markdown 内容
  markdownContent: string;

  // LaTeX 内容 (P1)
  latexContent?: string;

  // 引用列表
  references: Reference[];

  // 创建时间
  createdAt: string;

  // 报告类型
  reportType: 'academic_survey' | 'research_report';
}

interface Reference {
  id: string;
  type: 'paper' | 'webpage' | 'report';
  title: string;
  authors?: string[];
  url?: string;
  publishDate?: string;
  // 学术引用格式 (APA/MLA 等)
  formattedCitation?: string;
}
```

---

## 8. 引用格式规范

### 8.1 学术综述 (Academic Survey)

采用标准学术引用格式:

```markdown
根据最新研究表明，深度学习在该领域取得了显著进展 [1]。

## References

[1] Smith, J., & Johnson, M. (2024). Deep Learning Applications in Scientific Research.
    Nature Machine Intelligence, 6(3), 234-245. https://doi.org/10.1038/xxx
```

### 8.2 行业研报 (Research Report)

采用网页/报告来源格式:

```markdown
据行业报告显示，2024 年市场规模达到 500 亿美元 [^1]。

## 数据来源

[^1]: 艾瑞咨询. (2024). 2024年中国XX行业研究报告.
      https://www.iresearch.com.cn/report/xxx
```

---

## 9. 异常处理

### 9.1 错误场景

| 场景 | 错误码 | 用户提示 | 处理方式 |
|------|--------|----------|----------|
| 输入内容为空 | E001 | "Please enter your topic or question" | 前端拦截，高亮输入框 |
| 未选择报告类型 | E002 | (弹出选择弹窗) | 强制选择后继续 |
| 生成超时 | E003 | "Generation is taking longer than expected. We'll notify you when it's ready." | 转为后台任务 |
| 生成失败 | E004 | "Sorry, we couldn't generate your report. Please try again." | 提供重试按钮 |
| 文件上传失败 | E005 | "Failed to upload file. Please check file format and size." | 显示具体错误原因 |

### 9.2 边界情况

| 情况 | 处理方式 |
|------|----------|
| 用户关闭页面后生成完成 | 下次登录时显示通知，报告保存在项目列表 |
| 网络断开 | 显示重连提示，自动重试 |
| 生成过程中切换页面 | 后台继续生成，状态保持 |

---

## 10. 非功能性需求

### 10.1 性能要求

| 指标 | 目标值 |
|------|--------|
| 页面首屏加载时间 | < 2s |
| 生成进度更新延迟 | < 500ms |
| Markdown 预览渲染 | < 100ms |
| PDF 编译时间 (P1) | < 30s |

### 10.2 兼容性要求

| 平台 | 支持版本 |
|------|----------|
| Chrome | 最近 2 个主版本 |
| Firefox | 最近 2 个主版本 |
| Safari | 最近 2 个主版本 |
| Edge | 最近 2 个主版本 |

### 10.3 安全要求

- 用户上传文件需进行安全扫描
- 生成内容需进行敏感词过滤
- API 请求需进行身份验证

---

## 11. 版本规划

### 11.1 P0 (MVP)

| 功能 | 状态 |
|------|------|
| 统一入口 (Synthesize Draft) | 待开发 |
| 模式选择 (Academic Survey / Research Report) | 待开发 |
| 生成进度展示 | 待开发 |
| 生成完成通知 | 待开发 |
| Markdown 编辑器 + 预览 | 待开发 |
| 引用格式展示 | 待开发 |

### 11.2 P1 (增强)

| 功能 | 状态 |
|------|------|
| LaTeX 编辑器 | 待排期 |
| PDF 编译预览 | 待排期 |
| Sync to PDF | 待排期 |

---

## 12. 验收标准

### 12.1 功能验收

- [ ] 用户可通过统一入口选择生成学术综述或行业研报
- [ ] 用户未选择模式时，发送内容会弹出选择弹窗
- [ ] 生成过程中可看到 Thinking → Writing → Polishing 三个阶段
- [ ] Writing 阶段可看到各章节的完成状态
- [ ] 用户可点击"通知我"，生成完成后收到浏览器通知
- [ ] 生成完成后弹出成功提示，可选择立即打开或稍后查看
- [ ] 编辑器左侧显示 Markdown 源码，右侧实时预览
- [ ] 研报引用显示为网页链接格式
- [ ] 综述引用显示为学术文献格式

### 12.2 体验验收

- [ ] 交互流畅，无明显卡顿
- [ ] 进度展示清晰，用户可理解当前状态
- [ ] 错误提示友好，用户可理解问题原因

---

## 13. 依赖与风险

### 13.1 依赖项

| 依赖 | 说明 | 负责方 |
|------|------|--------|
| Scimaster.borium 算法接口 | 研报/综述生成能力 | 算法团队 |
| 用户认证系统 | 用户身份验证 | 后端团队 |
| 文件存储服务 | 上传文件和生成报告存储 | 后端团队 |

### 13.2 风险评估

| 风险 | 影响 | 概率 | 缓解措施 |
|------|------|------|----------|
| 算法接口不稳定 | 生成失败率上升 | 低 | 增加重试机制，提供友好错误提示 |
| 生成时间过长 | 用户流失 | 中 | 提供通知功能，支持后台生成 |
| Markdown 渲染兼容性 | 预览显示异常 | 低 | 使用成熟的渲染库，充分测试 |

---

## 14. 评审纪要

| 日期 | 参与人 | 主要结论 | 待办事项 |
|------|--------|----------|----------|
| [待填写] | [待填写] | [待填写] | [待填写] |

---

## 15. 附录

### 15.1 术语表

| 术语 | 说明 |
|------|------|
| Academic Survey | 学术综述，基于学术论文生成的文献综述 |
| Research Report | 行业研报，基于行业数据和网络资源生成的分析报告 |
| Short Version | 简版综述，快速生成，内容精简 |
| Standard Version | 标准版综述，深度研究，内容全面 |

### 15.2 参考文档

- [Scimaster.borium 专题研报功能文档]
- [Scimaster.ai 设计规范]
- [API 接口文档]

---

## 修订历史

| 版本 | 日期 | 修改人 | 修改内容 |
|------|------|--------|----------|
| v1.0 | 2025-03-15 | [待填写] | 初稿 |
