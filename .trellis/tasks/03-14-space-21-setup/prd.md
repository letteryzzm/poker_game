# Space-21 游戏项目基础架构

## Goal
创建 React + TypeScript 项目基础架构，配置开发环境和工具链，建立核心目录结构。

## Requirements

### 1. 项目初始化
- 使用 Vite 创建 React + TypeScript 项目
- 项目名称：space-21-game
- 位置：当前目录下的 `space-21-game/` 文件夹

### 2. 依赖安装
- zustand（状态管理）
- framer-motion（动画）
- tailwindcss（样式）
- lodash（工具函数）

### 3. TailwindCSS 配置
配置自定义配色方案：
```
--primary: #4A90E2
--secondary: #7B68EE
--bg-dark: #1A1A2E
--bg-card: #16213E
```

### 4. TypeScript 配置
- 启用严格模式
- 配置路径别名 `@/` 指向 `src/`

### 5. 目录结构
创建以下核心目录（参考 plan.md 第 138-230 行）：
```
src/
├── components/
│   ├── game/
│   ├── inventory/
│   ├── scene/
│   ├── ui/
│   └── common/
├── hooks/
├── store/
├── utils/
├── types/
├── App.tsx
└── main.tsx

public/
├── assets/
│   ├── cards/
│   ├── resources/
│   ├── scenes/
│   ├── npcs/
│   └── sounds/
└── data/
```

## Acceptance Criteria
- [ ] 项目可以成功运行 `npm run dev`
- [ ] TailwindCSS 配置生效
- [ ] TypeScript 严格模式启用
- [ ] 路径别名 `@/` 可用
- [ ] 所有核心目录已创建

## Technical Notes
- 只创建目录结构和配置，不创建具体业务组件
- 保持最小化原则，避免过度配置
