# 太空21点游戏 - 图片设计 Prompt 完整清单

> 使用 Lovart 或其他 AI 绘画工具生成所有美术素材

---

## 📋 素材清单总览

| 类别 | 数量 | 规格 | 优先级 |
|------|------|------|--------|
| 扑克牌面 | 53张 | 250×360px, PNG | P0 |
| 资源卡 | 20张 | 250×360px, PNG | P0 |
| 场景背景 | 4张 | 1920×1080px, PNG/JPG | P1 |
| NPC头像 | 4张 | 256×256px, PNG | P1 |
| UI元素 | 15+个 | 可变, PNG | P2 |

---

## 🃏 一、扑克牌面素材（53张）

### 设计风格定义

**整体风格**：科幻太空主题，深色背景，发光效果

**配色方案**：
- 黑桃（Spades）：深蓝色 #1E3A8A + 白色发光
- 红心（Hearts）：深红色 #991B1B + 粉色发光
- 梅花（Clubs）：深绿色 #065F46 + 青色发光
- 方块（Diamonds）：深紫色 #6B21A8 + 紫色发光

**通用元素**：
- 圆角：10px
- 边框：2px 发光边框
- 背景：渐变深色（深蓝到深紫）
- 纹理：细微的星空点缀

---

### Prompt 模板（扑克牌）

```
基础 Prompt 结构：
"Generate a futuristic space-themed playing card design:

Card: [花色][点数] (例如: Spade Ace, Heart King)
Style: Sci-fi, dark theme, glowing effects
Background: Deep [颜色] gradient with subtle star particles
Symbol: Large glowing [花色符号] in the center
Corner: Top-left and bottom-right show [点数] and small [花色符号]
Border: 2px glowing [颜色] border
Size: 250×360 pixels
Format: PNG with transparent background
Corner radius: 10px

Additional details:
- Metallic texture on symbols
- Holographic shine effect
- Futuristic font for numbers
- Subtle circuit pattern in background"
```

---

### 1.1 黑桃（Spades）- 13张

#### Prompt 1: 黑桃 A

```
Generate a futuristic space-themed playing card design:

Card: Spade Ace (黑桃A)
Style: Sci-fi, dark theme, glowing effects
Background: Deep blue gradient (#0F172A to #1E293B) with subtle star particles
Symbol: Large glowing white spade symbol in the center with blue neon outline
Corner: Top-left shows "A" and small spade symbol, bottom-right mirrored
Border: 2px glowing cyan border (#06B6D4)
Size: 250×360 pixels
Format: PNG with transparent background
Corner radius: 10px

Additional details:
- Metallic silver texture on the spade symbol
- Holographic blue shine effect
- Futuristic sans-serif font for "A"
- Subtle hexagonal circuit pattern in background
- Spade symbol has inner glow effect
- Card has slight 3D depth with shadow
```

#### Prompt 2: 黑桃 2

```
Generate a futuristic space-themed playing card design:

Card: Spade 2 (黑桃2)
Style: Sci-fi, dark theme, glowing effects
Background: Deep blue gradient (#0F172A to #1E293B) with subtle star particles
Symbol: Two medium-sized glowing white spade symbols arranged vertically
Corner: Top-left shows "2" and small spade symbol, bottom-right mirrored
Border: 2px glowing cyan border (#06B6D4)
Size: 250×360 pixels
Format: PNG with transparent background
Corner radius: 10px

Additional details:
- Metallic silver texture on spade symbols
- Holographic blue shine effect
- Futuristic sans-serif font for "2"
- Subtle hexagonal circuit pattern in background
```

#### Prompt 3-10: 黑桃 3-10

```
[使用相同的模板，只需修改：]
- Card: Spade [3/4/5/6/7/8/9/10]
- Symbol: [对应数量]个 medium-sized glowing white spade symbols
  - 3张：三角形排列
  - 4张：四角排列
  - 5张：梅花形排列
  - 6张：两列三行
  - 7张：六边形 + 中心1个
  - 8张：两列四行
  - 9张：三列三行
  - 10张：两列五行
- Corner: 显示对应数字
```

#### Prompt 11: 黑桃 J（Jack）

```
Generate a futuristic space-themed playing card design:

Card: Spade Jack (黑桃J)
Style: Sci-fi, dark theme, glowing effects, character portrait
Background: Deep blue gradient (#0F172A to #1E293B) with subtle star particles
Character: Futuristic space knight in powered armor
- Helmet with glowing cyan visor
- Dark blue and silver armor with spade emblem on chest
- Holding an energy sword
- Portrait style (shoulders and head visible)
Corner: Top-left shows "J" and small spade symbol, bottom-right mirrored
Border: 2px glowing cyan border (#06B6D4)
Size: 250×360 pixels
Format: PNG with transparent background
Corner radius: 10px

Additional details:
- Cyberpunk aesthetic
- Neon blue accent lights on armor
- Holographic HUD elements around character
- Subtle hexagonal circuit pattern in background
```

#### Prompt 12: 黑桃 Q（Queen）

```
Generate a futuristic space-themed playing card design:

Card: Spade Queen (黑桃Q)
Style: Sci-fi, dark theme, glowing effects, character portrait
Background: Deep blue gradient (#0F172A to #1E293B) with subtle star particles
Character: Elegant female space commander
- Sleek dark blue uniform with silver accents
- Glowing cyan circuitry patterns on uniform
- Spade emblem crown/tiara
- Confident expression
- Portrait style (shoulders and head visible)
Corner: Top-left shows "Q" and small spade symbol, bottom-right mirrored
Border: 2px glowing cyan border (#06B6D4)
Size: 250×360 pixels
Format: PNG with transparent background
Corner radius: 10px

Additional details:
- Holographic data streams in background
- Elegant futuristic design
- Subtle star field behind character
```

#### Prompt 13: 黑桃 K（King）

```
Generate a futuristic space-themed playing card design:

Card: Spade King (黑桃K)
Style: Sci-fi, dark theme, glowing effects, character portrait
Background: Deep blue gradient (#0F172A to #1E293B) with subtle star particles
Character: Powerful space emperor
- Regal dark blue and silver armor
- Glowing cyan energy crown
- Large spade emblem on chest plate
- Commanding presence
- Portrait style (shoulders and head visible)
Corner: Top-left shows "K" and small spade symbol, bottom-right mirrored
Border: 2px glowing cyan border (#06B6D4)
Size: 250×360 pixels
Format: PNG with transparent background
Corner radius: 10px

Additional details:
- Royal sci-fi aesthetic
- Energy particles around crown
- Holographic throne elements in background
```

---

### 1.2 红心（Hearts）- 13张

#### Prompt 14: 红心 A

```
Generate a futuristic space-themed playing card design:

Card: Heart Ace (红心A)
Style: Sci-fi, dark theme, glowing effects
Background: Deep red gradient (#450A0A to #7F1D1D) with subtle star particles
Symbol: Large glowing pink heart symbol in the center with red neon outline
Corner: Top-left shows "A" and small heart symbol, bottom-right mirrored
Border: 2px glowing pink border (#EC4899)
Size: 250×360 pixels
Format: PNG with transparent background
Corner radius: 10px

Additional details:
- Metallic rose gold texture on the heart symbol
- Holographic pink shine effect
- Futuristic sans-serif font for "A"
- Subtle pulse/heartbeat animation suggestion in design
- Heart symbol has inner glow effect
- Card has slight 3D depth with shadow
```

#### Prompt 15-26: 红心 2-K

```
[使用与黑桃相同的结构，但修改：]
- Background: Deep red gradient (#450A0A to #7F1D1D)
- Symbol: Glowing pink heart symbols
- Border: 2px glowing pink border (#EC4899)
- Character cards (J/Q/K):
  - Jack: Space medic/healer in red armor
  - Queen: Elegant space diplomat in red dress
  - King: Noble space lord in red royal attire
```

---

### 1.3 梅花（Clubs）- 13张

#### Prompt 27: 梅花 A

```
Generate a futuristic space-themed playing card design:

Card: Club Ace (梅花A)
Style: Sci-fi, dark theme, glowing effects
Background: Deep green gradient (#022C22 to #065F46) with subtle star particles
Symbol: Large glowing cyan club symbol in the center with green neon outline
Corner: Top-left shows "A" and small club symbol, bottom-right mirrored
Border: 2px glowing cyan border (#14B8A6)
Size: 250×360 pixels
Format: PNG with transparent background
Corner radius: 10px

Additional details:
- Metallic emerald texture on the club symbol
- Holographic green shine effect
- Futuristic sans-serif font for "A"
- Subtle leaf/nature-tech pattern in background
- Club symbol has inner glow effect
- Card has slight 3D depth with shadow
```

#### Prompt 28-39: 梅花 2-K

```
[使用与黑桃相同的结构，但修改：]
- Background: Deep green gradient (#022C22 to #065F46)
- Symbol: Glowing cyan club symbols
- Border: 2px glowing cyan border (#14B8A6)
- Character cards (J/Q/K):
  - Jack: Space engineer in green工作服
  - Queen: Bio-tech scientist in green lab coat
  - King: Environmental commander in green armor
```

---

### 1.4 方块（Diamonds）- 13张

#### Prompt 40: 方块 A

```
Generate a futuristic space-themed playing card design:

Card: Diamond Ace (方块A)
Style: Sci-fi, dark theme, glowing effects
Background: Deep purple gradient (#3B0764 to #6B21A8) with subtle star particles
Symbol: Large glowing violet diamond symbol in the center with purple neon outline
Corner: Top-left shows "A" and small diamond symbol, bottom-right mirrored
Border: 2px glowing violet border (#A855F7)
Size: 250×360 pixels
Format: PNG with transparent background
Corner radius: 10px

Additional details:
- Metallic amethyst texture on the diamond symbol
- Holographic purple shine effect
- Futuristic sans-serif font for "A"
- Subtle crystal/gem pattern in background
- Diamond symbol has prismatic inner glow
- Card has slight 3D depth with shadow
```

#### Prompt 41-52: 方块 2-K

```
[使用与黑桃相同的结构，但修改：]
- Background: Deep purple gradient (#3B0764 to #6B21A8)
- Symbol: Glowing violet diamond symbols
- Border: 2px glowing violet border (#A855F7)
- Character cards (J/Q/K):
  - Jack: Space merchant in purple vest
  - Queen: Wealthy space noble in purple gown
  - King: Mining baron in purple royal attire
```

---

### 1.5 牌背（Card Back）

#### Prompt 53: 牌背设计

```
Generate a futuristic space-themed playing card back design:

Style: Sci-fi, dark theme, symmetrical pattern
Background: Deep space gradient (dark blue #0F172A to purple #3B0764)
Pattern: Intricate geometric mandala design with:
- Central circular emblem with "SPACE 21" text
- Radiating hexagonal patterns
- Circuit board aesthetic
- Glowing cyan and purple lines
- Small star particles scattered throughout
Border: 2px glowing multi-color border (cyan to purple gradient)
Size: 250×360 pixels
Format: PNG with transparent background
Corner radius: 10px

Additional details:
- Symmetrical both vertically and horizontally
- Holographic shine effect
- Metallic accents
- Subtle animation suggestion (pulsing glow)
- Professional casino card back aesthetic
- No text except central "SPACE 21" logo
```

---

## 🎴 二、资源卡素材（20张）

### 设计风格定义

**整体风格**：写实科幻，物品特写，深色太空背景

**卡牌结构**：
- 顶部：物品图片（占60%）
- 底部：深色信息栏（占40%）
- 边框：根据稀有度变色

**稀有度配色**：
- 普通（Common）：灰色边框 #6B7280
- 稀有（Rare）：蓝色边框 #3B82F6
- 史诗（Epic）：紫色边框 #A855F7
- 传说（Legendary）：金色边框 #F59E0B

---

### 2.1 矿石卡（Ore Cards）

#### Prompt 54: 铁矿（Iron Ore）

```
Generate a resource card for a space mining game:

Item: Iron Ore (铁矿)
Rarity: Common
Style: Realistic sci-fi, item showcase

Card Layout (250×360px):
- Top 60%: Item image
  - Chunk of dark gray metallic ore
  - Rough, angular surface with metallic sheen
  - Small glowing blue veins running through it
  - Floating in space with subtle particle effects
  - Dark blue space background with distant stars

- Bottom 40%: Info panel
  - Background: Dark gray (#374151) with subtle texture
  - Border: 2px gray glowing border (#6B7280)
  - Text overlay space for:
    * Item name (top)
    * Weight icon (bottom left)
    * Stack count area (bottom right)

Additional details:
- Photorealistic rendering
- Dramatic lighting from top-left
- Slight depth of field blur on background
- PNG with transparent background
- Corner radius: 10px
```

#### Prompt 55: 金矿（Gold Ore）

```
Generate a resource card for a space mining game:

Item: Gold Ore (金矿)
Rarity: Rare
Style: Realistic sci-fi, item showcase

Card Layout (250×360px):
- Top 60%: Item image
  - Chunk of golden metallic ore
  - Smooth surface with bright golden sheen
  - Glowing orange veins pulsing with energy
  - Floating in space with golden particle effects
  - Dark purple space background with nebula

- Bottom 40%: Info panel
  - Background: Dark blue (#1E3A8A) with subtle texture
  - Border: 2px blue glowing border (#3B82F6)
  - Text overlay space

Additional details:
- Photorealistic rendering
- Warm golden lighting
- Lens flare effect on brightest spots
- PNG with transparent background
- Corner radius: 10px
```

#### Prompt 56: 银矿（Silver Ore）

```
Generate a resource card for a space mining game:

Item: Silver Ore (银矿)
Rarity: Rare
Style: Realistic sci-fi, item showcase

Card Layout (250×360px):
- Top 60%: Item image
  - Chunk of silver metallic ore
  - Polished surface with bright silver sheen
  - Glowing white veins with electric effect
  - Floating in space with silver sparkle particles
  - Dark teal space background with stars

- Bottom 40%: Info panel
  - Background: Dark blue (#1E3A8A) with subtle texture
  - Border: 2px blue glowing border (#3B82F6)
  - Text overlay space

Additional details:
- Photorealistic rendering
- Cool silver lighting
- Reflective surface
- PNG with transparent background
- Corner radius: 10px
```

#### Prompt 57: 钻石（Diamond）

```
Generate a resource card for a space mining game:

Item: Diamond (钻石)
Rarity: Epic
Style: Realistic sci-fi, item showcase

Card Layout (250×360px):
- Top 60%: Item image
  - Large cut diamond crystal
  - Perfect facets with rainbow prismatic effect
  - Glowing white core with rainbow refractions
  - Floating in space with prismatic light rays
  - Deep purple space background with nebula

- Bottom 40%: Info panel
  - Background: Dark purple (#581C87) with subtle texture
  - Border: 2px purple glowing border (#A855F7)
  - Text overlay space

Additional details:
- Photorealistic rendering
- Dramatic prismatic lighting
- Caustic light effects
- Rainbow lens flare
- PNG with transparent background
- Corner radius: 10px
```

---

### 2.2 食物卡（Food Cards）

#### Prompt 58: 能量棒（Energy Bar）

```
Generate a resource card for a space mining game:

Item: Energy Bar (能量棒)
Rarity: Common
Style: Realistic sci-fi, item showcase

Card Layout (250×360px):
- Top 60%: Item image
  - Futuristic energy bar in metallic wrapper
  - Glowing blue energy indicator on wrapper
  - Partially unwrapped showing glowing blue gel inside
  - Floating in space with energy particles
  - Dark background with subtle glow

- Bottom 40%: Info panel
  - Background: Dark gray (#374151) with subtle texture
  - Border: 2px gray glowing border (#6B7280)
  - HP recovery icon (+20 HP)
  - Text overlay space

Additional details:
- Clean product photography style
- Soft blue glow from energy gel
- Metallic foil texture on wrapper
- PNG with transparent background
- Corner radius: 10px
```

