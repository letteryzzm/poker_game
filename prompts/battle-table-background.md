# 对战桌面背景图 - 第一版

## 设计需求

**用途**：21点对战时的主背景图
**目标**：简洁、不抢戏、突出卡牌和UI

---

## Prompt 1: 太空赌桌背景（推荐）

```
设计一个太空主题的21点赌桌背景：

视觉元素：
- 主体：深色赌桌表面，类似传统绿色桌布但改为深蓝色/深紫色
- 材质：带有轻微的科技纹理（电路板纹路、六边形网格）
- 边缘：发光的霓虹边框（蓝色或紫色）
- 细节：桌面上有淡淡的星空反光效果
- 中央：可选的"21"标记或扑克牌符号（半透明）

色彩方案：
- 主色：深蓝色 #0A1628 到 深紫色 #1A0F2E 的渐变
- 边框：蓝色霓虹 #4A90E2
- 纹理：浅蓝色 #2C3E50（低透明度）
- 反光：白色 #FFFFFF（10%透明度）

技术要求：
- 尺寸：1920×1080px
- 格式：PNG或JPG
- 分辨率：72 DPI
- 风格：扁平化 + 轻微渐变
- 重点：中心区域（卡牌放置区）要干净简洁

关键词：
space blackjack table, dark blue purple gradient, neon border, circuit pattern texture, hexagonal grid, subtle star reflection, minimalist design, sci-fi casino table, clean center area

注意事项：
- 不要有复杂的背景元素（星空、飞船等）
- 保持中心区域干净，方便放置卡牌
- 边缘可以有装饰，但不要太抢眼
- 整体要暗色调，让卡牌更突出
```

---

## Prompt 2: 极简版（备选）

```
极简太空赌桌背景：

设计：
- 纯色深蓝色背景 #0D1B2A
- 中心有一个圆角矩形区域（稍亮的蓝色 #1B263B）
- 四角有发光的装饰点
- 整体非常干净简洁

尺寸：1920×1080px
格式：PNG
风格：极简主义

关键词：
minimalist space table, dark blue solid color, rounded rectangle center, glowing corner dots, ultra clean design
```

---

## Prompt 3: 传统改良版（最简单）

```
改良版传统赌桌：

设计：
- 保持传统绿色赌桌的布局
- 但颜色改为深蓝色 #0F2027
- 添加轻微的星空纹理（非常淡）
- 边缘有简单的发光线条

尺寸：1920×1080px
格式：PNG
风格：传统 + 科幻元素

关键词：
traditional casino table, dark blue felt texture, subtle star pattern, glowing edge lines, classic layout with sci-fi twist
```

---

## 推荐方案

**第一版建议使用 Prompt 1（太空赌桌背景）**

原因：
1. ✅ 符合太空主题
2. ✅ 简洁不抢戏
3. ✅ 有科技感但不复杂
4. ✅ 中心区域干净，适合放卡牌
5. ✅ 霓虹边框增加视觉吸引力

---

## 布局参考

```
┌─────────────────────────────────────────┐
│  [发光边框]                              │
│                                         │
│         庄家区域（顶部1/3）              │
│         ┌─────────────┐                 │
│         │  卡牌放置区  │                 │
│         └─────────────┘                 │
│                                         │
│         [中央下注显示区]                 │
│                                         │
│         玩家区域（底部1/3）              │
│         ┌─────────────┐                 │
│         │  卡牌放置区  │                 │
│         └─────────────┘                 │
│                                         │
│  [发光边框]                              │
└─────────────────────────────────────────┘
```

---

## 快速实现方案（CSS备选）

如果AI生成的图片不满意，可以用纯CSS实现：

```css
.battle-table {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #0A1628 0%, #1A0F2E 100%);
  position: relative;
}

/* 中心区域 */
.battle-table::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 70%;
  background: rgba(26, 38, 62, 0.3);
  border-radius: 20px;
  border: 2px solid rgba(74, 144, 226, 0.5);
  box-shadow: 0 0 30px rgba(74, 144, 226, 0.3);
}

/* 科技纹理 */
.battle-table::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(74, 144, 226, 0.03) 2px,
      rgba(74, 144, 226, 0.03) 4px
    );
  pointer-events: none;
}
```

---

**优先级**：🔥 高优先级（第一版必需）
**预计生成时间**：5-10分钟
**备选方案**：纯CSS实现
