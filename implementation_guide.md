# 🎮 太空21点卡牌游戏 — AI辅助开发实施指南

> 基于 plan.md 的详细实现计划，使用AI工具链完成游戏开发

---

## 📋 项目概览

**游戏名称**：Space 21 - 太空矿工的赌局
**游戏类型**：21点 + 资源卡收集 + RPG探索
**技术栈**：React 18 + TypeScript + Zustand + Framer Motion + TailwindCSS
**开发周期**：8周（可根据实际情况调整）
**AI工具链**：Claude Code + Pencil MCP + Lovart + Suno

---

## 🎯 阶段零：需求确认与技术调研（Week 0 - 3天）

**目标**：确认游戏设计方向，调研技术方案，准备开发环境

### AI 产出清单

| 工具 | 产出物 | 用途 |
|------|--------|------|
| Claude Code | 技术栈可行性分析报告 | 评估 React + Zustand 方案 |
| Claude Code | 现有开源项目分析（blackjackin + godot-card-game-frame） | 提取可复用代码 |
| AI Studio | React卡牌游戏最佳实践汇总 | 学习行业方案 |
| 观猹 | 类似游戏案例研究（Slay the Spire等） | UI/UX参考 |

### 关键 Prompt

```
Prompt 1: 技术栈评估
"分析以下技术栈用于开发太空21点卡牌游戏的优劣：
1. React 18 + TypeScript + Zustand
2. Vue 3 + Pinia
3. 纯 JavaScript + Canvas

游戏需求：
- 21点核心机制
- 资源卡拖拽系统
- 多场景切换
- 流畅动画效果
- 存档系统

请给出推荐方案和理由。"
```

```
Prompt 2: 代码复用分析
"我有两个现有项目：
1. blackjackin - React实现的21点游戏
2. godot-card-game-frame - Godot卡牌框架

请分析这两个项目中哪些代码/逻辑可以复用到新项目中，
并给出具体的迁移建议。"
```

### 人工决策点

- ✅ 确认使用 React + TypeScript 方案
- ✅ 确认使用 Zustand 而非 Redux（更轻量）
- ✅ 确认使用 Framer Motion 做动画
- ✅ 确认项目目录结构

---

## 📐 阶段一：核心设计文档（Week 1 - 5天）

**目标**：产出完整的游戏设计文档和技术规格

### AI 产出清单

| 产出物 | 具体内容 | 格式 | 负责工具 |
|--------|----------|------|----------|
| **游戏规则文档** | 21点规则 + 资源卡系统 + 场景系统 | Markdown | Claude Code |
| **数据结构设计** | TypeScript类型定义（Card/Player/Inventory等） | .ts文件 | Claude Code |
| **状态机设计** | 游戏状态流转图 | Mermaid | Claude Code |
| **UI交互规范** | 每个界面的交互逻辑 | Markdown | Claude Code |
| **API设计文档** | 核心函数接口定义 | TypeScript | Claude Code |

### 关键 Prompt

```
Prompt 3: 游戏规则文档
"基于 plan.md 中的游戏设计，生成详细的游戏规则文档，包括：

1. 21点核心规则
   - 基础流程（下注→发牌→玩家回合→庄家回合→结算）
   - 特殊规则（Blackjack/Double Down/Split）
   - Ace自动转换逻辑
   - Five Card Charlie规则

2. 资源卡系统
   - 卡牌类型和属性
   - 堆叠规则
   - 负重系统
   - 奖励机制

3. 场景系统
   - 场景列表和解锁条件
   - NPC交互规则
   - 商店系统

输出格式：Markdown，包含表格和流程图。"
```

```
Prompt 4: TypeScript类型定义
"根据游戏规则，生成完整的 TypeScript 类型定义，包括：

1. 扑克牌类型（PlayingCard）
2. 资源卡类型（ResourceCard）
3. 游戏状态类型（GameState）
4. 玩家数据类型（Player）
5. 背包类型（Inventory）
6. 场景类型（Scene）
7. NPC类型（NPC）

要求：
- 使用严格类型
- 添加详细注释
- 考虑可扩展性"
```

```
Prompt 5: 状态机设计
"设计游戏状态机，使用 Mermaid 语法绘制状态流转图：

状态包括：
- idle（待机）
- betting（下注）
- dealing（发牌）
- playing（玩家回合）
- dealer_turn（庄家回合）
- finished（结算）
- scene_transition（场景切换）

包含所有状态转换条件和触发事件。"
```

### 人工审核点

- ✅ 检查规则是否完整无遗漏
- ✅ 确认类型定义符合实际需求
- ✅ 验证状态机逻辑是否合理

---

## 🖼️ 阶段二：UI设计与美术资产（Week 2 - 7天）

**目标**：产出所有视觉素材和UI设计

### AI 产出清单

| 工具 | 产出物 | 规格要求 | 数量 |
|------|--------|----------|------|
| **Pencil MCP** | 游戏界面线框图 | 主界面/游戏桌/背包/商店 | 4张 |
| **Pencil MCP** | 组件设计图 | 卡牌/按钮/对话框 | 10+个 |
| **Lovart** | 扑克牌面素材 | PNG透明底，250×360px | 52张+牌背 |
| **Lovart** | 资源卡图片 | PNG透明底，250×360px | 20张 |
| **Lovart** | 场景背景图 | 1920×1080px | 4张 |
| **Lovart** | NPC头像 | 圆形，256×256px | 4张 |
| **Lovart** | UI元素 | 按钮/图标/装饰 | 素材包 |

### 关键 Prompt

```
Prompt 6: Pencil MCP - 游戏主界面
"使用 Pencil MCP 设计太空21点游戏的主界面，布局要求：

顶部栏（高度80px）：
- 左侧：星币数量（💰 1000）
- 中间：HP条（❤️ 100/100）
- 右侧：背包按钮、设置按钮

主游戏区（分左右两栏）：
- 左侧（40%宽度）：当前场景展示
  - 场景背景图
  - NPC卡片（可点击）
  - 场景切换按钮

- 右侧（60%宽度）：21点游戏桌
  - 庄家手牌区（顶部）
  - 玩家手牌区（中部）
  - 控制按钮区（底部）：Hit/Stand/Double/Split
  - 下注面板

底部栏（高度200px）：
- 背包卡组展示（横向滚动）
- 负重条（45/100kg）

配色：深色太空主题（#1A1A2E背景）"
```

```
Prompt 7: Lovart - 扑克牌素材
"生成一套科幻风格的扑克牌面素材：

风格要求：
- 太空/科技感
- 深色背景（深蓝/深紫）
- 发光边框效果
- 现代化数字和花色图标

具体需求：
- 黑桃A：深蓝色背景，白色发光黑桃符号，左上角"A"
- 尺寸：250×360px
- 格式：PNG透明底
- 圆角：10px

请生成黑桃A的设计。"
```

```
Prompt 8: Lovart - 资源卡素材
"生成太空矿石资源卡图片：

卡牌名称：铁矿（Iron Ore）
风格：科幻写实
内容：
- 主体：深灰色金属矿石，带有金属光泽
- 背景：深色太空背景，星点装饰
- 边框：蓝色发光边框
- 尺寸：250×360px
- 格式：PNG透明底

请生成这张资源卡的设计。"
```

### 人工审核点

- ✅ 检查UI设计是否符合游戏风格
- ✅ 确认所有素材尺寸统一
- ✅ 验证配色方案协调性
- ✅ 测试素材在不同分辨率下的显示效果

---

## 💻 阶段三：核心代码开发 - Phase 1（Week 3-4）

**目标**：实现21点核心游戏逻辑

### AI 产出清单

| 产出物 | 具体内容 | 文件路径 |
|--------|----------|----------|
| 项目脚手架 | Vite + React + TS 初始化 | 整个项目 |
| 类型定义 | 所有 TypeScript 类型 | `src/types/` |
| 游戏逻辑 | 21点核心算法 | `src/utils/blackjackLogic.ts` |
| 状态管理 | Zustand stores | `src/store/` |
| 扑克牌组件 | PlayingCard 组件 | `src/components/game/` |
| 游戏桌组件 | BlackjackTable 组件 | `src/components/game/` |

### 关键 Prompt

```
Prompt 9: 项目初始化
"使用 Vite 创建 React + TypeScript 项目，并配置：

1. 安装依赖：
   - zustand（状态管理）
   - framer-motion（动画）
   - tailwindcss（样式）
   - lodash（工具函数）

2. 配置 TailwindCSS，使用以下配色：
   --primary: #4A90E2
   --secondary: #7B68EE
   --bg-dark: #1A1A2E
   --bg-card: #16213E

3. 创建项目目录结构（参考 plan.md）

4. 配置 tsconfig.json 使用严格模式

请提供完整的初始化命令和配置文件。"
```

```
Prompt 10: 21点核心逻辑实现
"实现 21点游戏的核心逻辑函数，文件：src/utils/blackjackLogic.ts

需要实现的函数：

1. calculateScore(hand: PlayingCard[]): number
   - 计算手牌总分
   - 处理 Ace 自动转换（11→1）
   - 支持多个 Ace 的情况

2. isBlackjack(hand: PlayingCard[]): boolean
   - 判断是否为天然21点（前两张牌为A+10点牌）

3. isFiveCardCharlie(hand: PlayingCard[]): boolean
   - 判断是否为五张牌不爆

4. determineResult(playerHand, dealerHand): GameResult
   - 判定游戏结果（win/lose/push/blackjack/charlie）

5. dealerShouldHit(dealerHand, playerScore): boolean
   - 庄家是否应该继续抽牌

要求：
- 完整的 TypeScript 类型
- 详细的注释
- 单元测试用例（使用 Vitest）"
```

```
Prompt 11: Zustand 状态管理
"创建游戏状态管理 store，文件：src/store/gameStore.ts

状态包括：
- status: 游戏状态
- deck: 牌堆
- playerHand: 玩家手牌
- dealerHand: 庄家手牌
- playerScore: 玩家分数
- dealerScore: 庄家分数
- currentBet: 当前下注
- result: 游戏结果

方法包括：
- initDeck(): 初始化52张牌
- shuffleDeck(): 洗牌
- dealCards(): 发牌
- hit(): 玩家要牌
- stand(): 玩家停牌
- placeBet(amount): 下注
- resetGame(): 重置游戏

使用 Zustand 实现，包含完整类型定义。"
```

### 开发流程建议

1. **先读取现有代码**
   ```
   "请阅读 blackjackin/js/all-components.js，
   提取其中的洗牌、发牌、计分逻辑，
   并转换为 TypeScript 版本。"
   ```

2. **逐步实现功能**
   - Day 1-2: 项目初始化 + 类型定义
   - Day 3-4: 核心逻辑实现
   - Day 5-6: 状态管理
   - Day 7-8: 基础组件
   - Day 9-10: 集成测试

3. **每日验收标准**
   - 代码通过 TypeScript 编译
   - 单元测试覆盖率 > 80%
   - 无 ESLint 错误

---

## 💻 阶段四：核心代码开发 - Phase 2（Week 5-6）

**目标**：实现资源卡系统和场景系统

### AI 产出清单

| 产出物 | 具体内容 | 文件路径 |
|--------|----------|----------|
| 背包管理 | 资源卡添加/移除/堆叠逻辑 | `src/utils/inventoryManager.ts` |
| 奖励系统 | 根据游戏结果发放奖励 | `src/utils/rewardSystem.ts` |
| 拖拽系统 | 卡牌拖拽 Hook | `src/hooks/useDragDrop.ts` |
| 资源卡组件 | ResourceCard 组件 | `src/components/inventory/` |
| 场景系统 | 场景切换和管理 | `src/store/sceneStore.ts` |
| NPC系统 | NPC交互和对话 | `src/components/scene/` |

### 关键 Prompt

```
Prompt 12: 背包管理系统
"实现背包管理系统，文件：src/utils/inventoryManager.ts

功能需求：

1. addCardToInventory(inventory, card, count): Inventory
   - 添加卡牌到背包
   - 自动堆叠同名卡牌
   - 检查是否超过 maxStack
   - 更新总重量

2. removeCardFromInventory(inventory, cardId, count): Inventory
   - 从背包移除卡牌
   - 如果数量为0则删除整个堆叠

3. calculateTotalWeight(deck: CardStack[]): number
   - 计算总重量

4. canAddCard(inventory, card, count): boolean
   - 检查是否可以添加（不超重）

5. splitCardStack(inventory, stackIndex, splitCount): Inventory
   - 分离堆叠卡牌

要求：
- 不可变数据操作（不修改原对象）
- 完整类型定义
- 边界情况处理"
```

```
Prompt 13: 拖拽系统实现
"实现卡牌拖拽 Hook，文件：src/hooks/useDragDrop.ts

功能需求：

1. 状态管理：
   - isDragging: 是否正在拖拽
   - draggedCard: 被拖拽的卡牌
   - draggedFrom: 来源卡组
   - position: 当前位置

2. 方法：
   - startDrag(card, fromDeck, event): 开始拖拽
   - updateDragPosition(event): 更新位置
   - endDrag(targetDeck): 结束拖拽

3. 交互逻辑：
   - 鼠标按下开始拖拽
   - 鼠标移动更新位置
   - 鼠标释放检测目标区域
   - 如果目标有效则移动卡牌
   - 如果无效则返回原位

使用 React Hooks 实现。"
```

### 开发流程建议

1. **参考 Godot 项目**
   ```
   "请阅读 godot-card-game-frame/deck/deck.gd，
   理解其卡组管理逻辑，
   并转换为 TypeScript 实现。"
   ```

2. **逐步实现功能**
   - Day 1-3: 背包管理系统
   - Day 4-5: 奖励系统
   - Day 6-8: 拖拽系统
   - Day 9-10: 场景和NPC系统

---

## 🎵 阶段五：音效音乐（Week 7）

**目标**：产出所有音频素材并集成

### AI 产出清单

| 工具 | 产出物 | 规格 | 数量 |
|------|--------|------|------|
| **Suno** | 背景音乐 | 60-90秒循环，MP3 | 4首 |
| **Suno** | 音效 | 1-3秒，MP3 | 10个 |
| **Claude Code** | 音效管理系统 | TypeScript | 1个文件 |

### 关键 Prompt

```
Prompt 14: Suno - 背景音乐
"生成太空赌场风格的背景音乐：

场景：新手矿区
风格：轻松的电子合成器音乐
节奏：中速（100-120 BPM）
情绪：轻松、科技感、略带神秘
时长：90秒
要求：可无缝循环

请生成这首背景音乐。"
```

```
Prompt 15: 音效管理系统
"实现音效管理系统，文件：src/hooks/useSound.ts

功能需求：

1. 预加载所有音效
2. 播放音效：playSound(soundName)
3. 播放背景音乐：playMusic(musicName)
4. 停止音乐：stopMusic()
5. 音量控制：setVolume(type, volume)
6. 静音切换：toggleMute()

使用 Howler.js 或原生 Audio API 实现。"
```

---

## 🧪 阶段六：测试与优化（Week 8）

**目标**：全面测试，修复bug，优化性能

### 测试清单

| 测试类型 | 测试内容 | 工具 |
|----------|----------|------|
| 单元测试 | 核心逻辑函数 | Vitest |
| 集成测试 | 组件交互 | React Testing Library |
| E2E测试 | 完整游戏流程 | Playwright |
| 性能测试 | 帧率、内存占用 | Chrome DevTools |

### 关键 Prompt

```
Prompt 16: 单元测试生成
"为 src/utils/blackjackLogic.ts 生成完整的单元测试：

测试用例包括：

1. calculateScore 测试：
   - 普通牌面计算
   - 单个Ace转换
   - 多个Ace转换
   - 边界情况（空手牌、全A）

2. isBlackjack 测试：
   - 标准Blackjack（A+10）
   - 非Blackjack情况
   - 边界情况

3. determineResult 测试：
   - 所有可能的结果
   - 边界情况

使用 Vitest，覆盖率要求 > 90%。"
```

```
Prompt 17: 性能优化建议
"分析当前游戏代码，提供性能优化建议：

关注点：
1. React 组件渲染优化（useMemo/useCallback）
2. 图片资源懒加载
3. 动画性能优化
4. 状态更新批处理
5. 内存泄漏检查

请提供具体的优化方案和代码示例。"
```

### 优化检查清单

- ✅ 帧率稳定在 60fps
- ✅ 首屏加载时间 < 2秒
- ✅ 内存占用 < 100MB
- ✅ 无内存泄漏
- ✅ 所有测试通过
- ✅ 代码覆盖率 > 80%

---

## 📊 完整时间线总览

| 周次 | 阶段 | 核心产出 | AI工具 | 人工占比 |
|------|------|----------|--------|----------|
| Week 0 | 需求调研 | 技术方案 + 项目分析 | Claude Code | 30% |
| Week 1 | 设计文档 | 规则文档 + 类型定义 + 状态机 | Claude Code | 20% |
| Week 2 | UI设计 | 线框图 + 所有美术素材 | Pencil + Lovart | 40% |
| Week 3-4 | 核心开发1 | 21点游戏逻辑 | Claude Code | 50% |
| Week 5-6 | 核心开发2 | 资源卡 + 场景系统 | Claude Code | 50% |
| Week 7 | 音效集成 | BGM + 音效 + 管理系统 | Suno + Claude Code | 30% |
| Week 8 | 测试优化 | 测试 + Bug修复 + 优化 | Claude Code | 60% |

**总计**：8周，AI辅助占比约 50-60%

---

## 💡 关键成功因素

### 1. AI使用策略

**✅ 适合AI的任务**：
- 代码框架生成
- 类型定义编写
- 单元测试生成
- 文档编写
- 美术素材生成
- 音效音乐生成

**❌ 不适合AI的任务**：
- 游戏平衡性调整
- 用户体验细节打磨
- 复杂bug调试
- 性能瓶颈定位
- 创意决策

### 2. 人工介入点

**必须人工决策的环节**：
1. **技术选型**：最终确认使用哪个技术栈
2. **游戏平衡**：下注金额、奖励倍率、卡牌掉落概率
3. **UI/UX细节**：动画时长、交互反馈、视觉效果
4. **代码审查**：AI生成的代码需要人工审查
5. **集成测试**：确保各模块正确协作

**人工优化的环节**：
1. **性能调优**：根据实际测试结果优化
2. **Bug修复**：AI可能无法理解复杂的bug
3. **用户体验**：根据试玩反馈调整
4. **代码重构**：保持代码质量

### 3. 开发节奏建议

**每日工作流**：
1. 早上：规划当天任务，准备 Prompt
2. 上午：使用 AI 生成代码/素材
3. 中午：审查 AI 产出，标记问题
4. 下午：人工修正和集成
5. 晚上：测试和验收

**每周里程碑**：
- Week 1: 完成设计文档
- Week 2: 完成所有素材
- Week 4: 21点可玩
- Week 6: 资源卡系统可用
- Week 7: 音效集成完成
- Week 8: 发布候选版本

---

## 🎯 AI产出追踪表

### 策划阶段

| 产出物 | AI工具 | Prompt编号 | 状态 | 质量评分 |
|--------|--------|------------|------|----------|
| 游戏规则文档 | Claude Code | Prompt 3 | ⬜ | - |
| TypeScript类型 | Claude Code | Prompt 4 | ⬜ | - |
| 状态机设计 | Claude Code | Prompt 5 | ⬜ | - |

### 美术阶段

| 产出物 | AI工具 | Prompt编号 | 状态 | 质量评分 |
|--------|--------|------------|------|----------|
| 主界面线框图 | Pencil MCP | Prompt 6 | ⬜ | - |
| 扑克牌素材 | Lovart | Prompt 7 | ⬜ | - |
| 资源卡素材 | Lovart | Prompt 8 | ⬜ | - |

### 开发阶段

| 产出物 | AI工具 | Prompt编号 | 状态 | 质量评分 |
|--------|--------|------------|------|----------|
| 项目初始化 | Claude Code | Prompt 9 | ⬜ | - |
| 21点核心逻辑 | Claude Code | Prompt 10 | ⬜ | - |
| Zustand Store | Claude Code | Prompt 11 | ⬜ | - |
| 背包管理系统 | Claude Code | Prompt 12 | ⬜ | - |
| 拖拽系统 | Claude Code | Prompt 13 | ⬜ | - |

### 音效阶段

| 产出物 | AI工具 | Prompt编号 | 状态 | 质量评分 |
|--------|--------|------------|------|----------|
| 背景音乐 | Suno | Prompt 14 | ⬜ | - |
| 音效管理系统 | Claude Code | Prompt 15 | ⬜ | - |

### 测试阶段

| 产出物 | AI工具 | Prompt编号 | 状态 | 质量评分 |
|--------|--------|------------|------|----------|
| 单元测试 | Claude Code | Prompt 16 | ⬜ | - |
| 性能优化建议 | Claude Code | Prompt 17 | ⬜ | - |

**质量评分标准**：
- ⭐⭐⭐⭐⭐ 完美，无需修改
- ⭐⭐⭐⭐ 优秀，微调即可
- ⭐⭐⭐ 良好，需要一定修改
- ⭐⭐ 一般，需要大量修改
- ⭐ 较差，需要重新生成

---

## 📝 复盘报告模板

### 1. 项目成果展示

```markdown
## 游戏演示

- 试玩链接：[部署地址]
- 演示视频：[视频链接]
- 源码仓库：[GitHub链接]

## 核心功能截图

1. 主界面
   ![主界面](screenshots/main.png)

2. 21点游戏桌
   ![游戏桌](screenshots/game.png)

3. 背包系统
   ![背包](screenshots/inventory.png)

4. 场景切换
   ![场景](screenshots/scene.png)
```

### 2. AI工具链评估

```markdown
## 工具使用统计

| 工具 | 使用场景 | 产出数量 | 平均质量 | 时间节省 |
|------|----------|----------|----------|----------|
| Claude Code | 代码生成 | 50+ 文件 | ⭐⭐⭐⭐ | 60% |
| Pencil MCP | UI设计 | 4 个界面 | ⭐⭐⭐⭐ | 70% |
| Lovart | 美术素材 | 80+ 张图 | ⭐⭐⭐ | 80% |
| Suno | 音效音乐 | 14 个文件 | ⭐⭐⭐⭐ | 90% |

## 各环节AI占比

- 策划设计：20%（主要是文档生成）
- 美术资产：80%（几乎全部AI生成）
- 代码开发：50%（框架AI生成，逻辑人工优化）
- 音效音乐：90%（AI生成后微调）
- 测试优化：40%（测试用例AI生成）

**总体AI占比**：约 55%
```

### 3. 关键挑战与解决方案

```markdown
## 遇到的主要问题

### 问题1：Ace自动转换逻辑复杂

**AI表现**：⭐⭐⭐
- AI生成的初版代码只处理了单个Ace
- 多个Ace的情况有bug

**解决方案**：
- 人工修正逻辑，添加循环处理
- 补充单元测试覆盖边界情况

### 问题2：拖拽系统性能问题

**AI表现**：⭐⭐
- AI生成的代码每次移动都触发重渲染
- 导致卡顿

**解决方案**：
- 使用 requestAnimationFrame 优化
- 添加 useMemo 缓存计算结果
```

### 4. 经验总结

```markdown
## 最有效的AI使用方式

1. **详细的Prompt**：提供完整的上下文和需求
2. **迭代优化**：不要期望一次生成完美代码
3. **人工审查**：AI生成后必须人工审查
4. **保留痕迹**：记录所有重要的Prompt和输出

## 如果重来一次

1. **更早开始美术素材生成**：Week 1就可以开始
2. **更细粒度的任务拆分**：每个Prompt只做一件事
3. **建立素材库**：提前准备好Prompt模板
4. **更多的单元测试**：AI生成测试用例很高效
```

---

## ✅ 最终检查清单

### 功能完整性

- [ ] 21点所有规则正确实现
- [ ] 资源卡系统完整可用
- [ ] 场景切换流畅
- [ ] NPC交互正常
- [ ] 商店系统可用
- [ ] 存档系统稳定

### 技术质量

- [ ] TypeScript 无编译错误
- [ ] ESLint 无警告
- [ ] 单元测试覆盖率 > 80%
- [ ] 所有测试通过
- [ ] 无内存泄漏
- [ ] 性能达标（60fps）

### 用户体验

- [ ] 界面美观
- [ ] 动画流畅
- [ ] 音效合适
- [ ] 操作响应快
- [ ] 无明显bug
- [ ] 移动端适配

### 文档完整

- [ ] README.md
- [ ] 开发文档
- [ ] API文档
- [ ] 部署文档
- [ ] 复盘报告

---

## 🚀 部署与发布

### 部署选项

1. **Vercel**（推荐）
   - 自动部署
   - 免费额度充足
   - CDN加速

2. **GitHub Pages**
   - 完全免费
   - 适合静态站点

3. **Netlify**
   - 功能丰富
   - 免费额度充足

### 部署 Prompt

```
Prompt 18: 部署配置
"配置项目部署到 Vercel：

1. 创建 vercel.json 配置文件
2. 配置构建命令和输出目录
3. 设置环境变量
4. 配置自定义域名（可选）

请提供完整的配置文件和部署步骤。"
```

---

## 📚 参考资源

### 官方文档

- React: https://react.dev
- TypeScript: https://www.typescriptlang.org
- Zustand: https://github.com/pmndrs/zustand
- Framer Motion: https://www.framer.com/motion
- TailwindCSS: https://tailwindcss.com
- Vitest: https://vitest.dev

### AI工具

- Claude Code: https://claude.ai
- Pencil MCP: [MCP工具]
- Lovart: [AI绘画工具]
- Suno: https://suno.ai

### 游戏开发

- 21点规则: https://en.wikipedia.org/wiki/Blackjack
- 卡牌游戏设计: https://www.gamedeveloper.com
- React游戏开发: https://react.gg

---

## 🎓 总结

这份实施指南提供了使用AI工具链开发太空21点卡牌游戏的完整流程：

**核心优势**：
- ✅ 详细的分阶段计划
- ✅ 可复用的Prompt模板
- ✅ 明确的AI/人工分工
- ✅ 完整的质量检查清单
- ✅ 可追踪的产出管理

**预期成果**：
- 8周完成完整游戏
- AI辅助占比 55%
- 代码质量高（测试覆盖率>80%）
- 用户体验好（60fps流畅运行）

**关键建议**：
1. 严格按照阶段推进，不要跳步
2. 每个AI产出都要人工审查
3. 保持迭代优化的心态
4. 记录所有重要决策和问题

祝开发顺利！🎮✨

---

**文档版本**：v1.0
**创建日期**：2026-03-14
**适用项目**：Space 21 - 太空矿工的赌局
**预计完成时间**：8周