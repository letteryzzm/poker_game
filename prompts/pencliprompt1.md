# ✏️ Pencil MCP UI设计 Prompt 完整清单

基于 plan.md 和 implementation_guide.md，以下是所有需要在 Pencil MCP 中生成的 UI 设计 Prompt，按页面和组件分类整理。

---

## 🎯 设计系统基础

### 设计规范 Prompt（先执行此条，建立统一风格）

```
Create a design system for "Space 21" - a sci-fi blackjack card game:

Color Palette:
- Primary: #4A90E2 (bright blue, buttons/highlights)
- Secondary: #7B68EE (purple, accents)
- Background Dark: #1A1A2E (main background)
- Card Background: #16213E (panels/cards)
- Success: #4CAF50 (win states)
- Danger: #F44336 (lose states/warnings)
- Warning: #FFB300 (gold/coins)
- Text Primary: #FFFFFF
- Text Secondary: #A0A0B0

Typography:
- Headings: Bold, futuristic sans-serif
- Body: Clean sans-serif
- Numbers: Monospace for scores/money

Visual Style:
- Dark space theme
- Neon glow effects on interactive elements
- Rounded corners (8-12px)
- Subtle gradients
- Star field patterns in backgrounds

Save this as the base design system for all subsequent screens.
```

---

## 📱 一、核心页面线框图（4张）

### 1.1 主游戏界面（Main Game Screen）

```
Design the main game interface for Space 21, a sci-fi blackjack game.

Screen size: 1920×1080px (desktop)
Background: Dark space theme (#1A1A2E) with subtle star particles

Layout Structure:

=== TOP BAR (height: 80px, full width) ===
Background: Semi-transparent dark (#16213E with 90% opacity)
Left section:
- Coin icon (golden) + "1,000" in bold white text
- Spacing: 16px padding

Center section:
- Heart icon (red) + HP bar (200px wide, 20px tall)
- Text overlay: "100/100"
- Bar color: gradient red to dark red

Right section:
- Backpack icon button (40×40px)
- Settings gear icon button (40×40px)
- Spacing: 12px between buttons

=== MAIN CONTENT AREA (split into two columns) ===

LEFT COLUMN (40% width, padding 24px):
Scene Panel:
- Rounded container (#16213E background)
- Scene background image placeholder (fill width, 300px height)
- Scene title: "新手矿区" in white, 24px font
- NPC card below (see component spec)
- Navigation buttons at bottom:
  - "← 上一区域" and "下一区域 →"
  - Disabled state for unavailable areas

RIGHT COLUMN (60% width, padding 24px):
Blackjack Table:
- Green felt background (#1B5E20 with texture)
- Rounded corners (16px)
- Inner padding: 32px

Dealer Area (top of table):
- Label: "庄家" in white, left-aligned
- Score display: "? 点" (hidden initially)
- Card slots: 2-5 horizontal slots, 120px spacing
- Cards fan out slightly (5° rotation each)

Player Area (middle of table):
- Label: "你" in white, left-aligned  
- Score display: "19 点" in large text (32px)
- Card slots: same as dealer
- Highlight glow when it's player's turn

Betting Display (between areas):
- Chip stack visualization
- Current bet: "下注: 100 ⭐"
- Centered, golden text

Control Buttons (bottom of table):
- Row of 4 buttons, evenly spaced:
  - "要牌 (Hit)" - blue primary
  - "停牌 (Stand)" - orange
  - "加倍 (Double)" - gold
  - "分牌 (Split)" - purple
- Button size: 120×50px
- Disabled state: 50% opacity, no glow

=== BOTTOM BAR (height: 200px, full width) ===
Background: #16213E

Inventory Section:
- Label: "背包" with backpack icon
- Horizontal scrollable card row
- 6 visible card slots (128×176px each)
- Scroll arrows on edges if more cards
- Cards show: image, name, count badge

Weight Bar:
- Label: "负重: 45/100 kg"
- Progress bar (full width - 48px padding)
- Color: blue when under 80%, yellow 80-95%, red >95%
- Height: 24px with rounded ends

Show the complete layout with placeholder content.
```

---

### 1.2 背包/仓库界面（Inventory Screen）

```
Design the full inventory management screen for Space 21.

Screen size: 1920×1080px
Background: #1A1A2E with subtle grid pattern

Layout Structure:

=== HEADER (height: 100px) ===
- Back arrow button (left)
- Title: "背包管理" centered, 36px bold
- Sort dropdown (right): "排序: 类型 ▼"

=== MAIN CONTENT (two-panel layout) ===

LEFT PANEL - Hand Deck (50% width):
Container:
- Background: #16213E
- Border: 2px solid #4A90E2
- Header: "手牌卡组" with hand icon
- Subheader: "拖拽卡牌进行整理"

Weight Display:
- Circular progress indicator (120×120px)
- Center text: "45/100"
- Label below: "kg"
- Color coding: blue/yellow/red based on %

Card Grid:
- 4 columns × 4 rows visible
- Card size: 140×190px
- Gap: 16px
- Scrollable if more cards
- Empty slots shown as dashed borders

Grid shows sample cards:
- [铁矿 x5] [金矿 x2] [能量棒 x3]
- [钻石 x1] [empty] [empty]
- Each card shows: image, name, count badge, weight

RIGHT PANEL - Warehouse (50% width):
Container:
- Background: #16213E
- Border: 2px solid #7B68EE (purple for warehouse)
- Header: "仓库" with warehouse icon
- Subheader: "容量: 120/500 kg"

Card Grid:
- Same layout as hand deck
- Different border color (purple)
- More slots visible (larger capacity)

=== BOTTOM ACTION BAR (height: 80px) ===
- "全部存入仓库" button (left)
- "快速整理" button (center)
- "全部取出" button (right)
- Button style: outlined, 160×48px

=== DRAG OVERLAY (shown when dragging) ===
- Semi-transparent card following cursor
- Drop zone highlights (green glow on valid targets)
- Invalid drop zones show red X

Include visual states:
1. Normal state
2. Card being dragged
3. Valid drop zone highlighted
4. Stack merge preview (when dropping same card type)
```

---

### 1.3 商店界面（Shop Screen）

```
Design the NPC shop interface for Space 21.

Screen size: 1920×1080px
Background: #1A1A2E

Layout Structure:

=== HEADER (height: 120px) ===
Left side:
- NPC portrait (circular, 80×80px)
- NPC name: "老矿工杰克"
- NPC dialogue bubble: "欢迎来到我的商店，矿工！"

Right side:
- Player money display: "💰 1,000 星币"
- Large, prominent styling

=== MAIN CONTENT (three-column layout) ===

LEFT COLUMN - Buy Section (35% width):
Header: "购买" with cart icon
Tab bar: [装备] [消耗品] [材料] - active tab highlighted

Item Grid:
- 2 columns × scrollable rows
- Item card (180×240px):
  - Item image (top, 180×120px)
  - Item name (bold)
  - Item description (small, gray)
  - Price: "💰 200" in gold
  - "购买" button (blue, full width)

Sample items:
- 能量棒 (30星币) - 恢复20HP
- 采矿激光器 (500星币) - +20%矿石掉落
- 背包扩展 (300星币) - +30kg容量

CENTER COLUMN - Transaction Area (30% width):
Shopping Cart:
- Header: "购物车"
- List of selected items with quantities
- Each row: [item icon] [name] [qty +-] [subtotal] [x remove]
- Divider line
- Total: "总计: 530 星币"
- "确认购买" large button (green)
- "清空" text button below

SELL Section (below cart):
- Header: "出售物品"
- Drop zone: "拖拽物品到此处出售"
- Dashed border, accepts drag
- Shows sell price preview on hover

RIGHT COLUMN - Sell Section (35% width):
Header: "你的物品" with backpack icon

Player inventory grid:
- Same card style as inventory screen
- Draggable to sell zone
- Shows sell price on hover tooltip
- Grayed out if not sellable

=== BOTTOM BAR ===
- "返回游戏" button (left)
- Transaction history link (right): "查看交易记录"

Include states:
1. Empty cart state
2. Item selected for purchase
3. Insufficient funds warning (red text, disabled button)
4. Successful purchase animation placeholder
```

---

### 1.4 场景选择/地图界面（Scene Selection Screen）

```
Design the scene/area selection map for Space 21.

Screen size: 1920×1080px
Background: Deep space with nebula (#0A0A1A)

Layout Structure:

=== HEADER (height: 80px) ===
- Back button (left)
- Title: "星际地图" centered
- Current location indicator (right): "📍 新手矿区"

=== MAIN MAP AREA (full remaining height) ===

Visual Style:
- Space map with connected nodes
- Each node is a location/scene
- Paths between nodes shown as dotted light trails
- Locked areas shown dimmed with lock icon

Node Layout (4 main areas):

NODE 1 - 新手矿区 (bottom-left quadrant):
- Position: 25% from left, 70% from top
- Status: UNLOCKED (bright, glowing)
- Icon: Mining helmet
- Ring color: Blue (#4A90E2)
- Label below: "新手矿区"
- Sublabel: "Lv.1 | 最低下注: 10"
- Click state: Pulsing glow

NODE 2 - 中级矿区 (center):
- Position: 50% from left, 50% from top
- Status: UNLOCKED
- Icon: Pickaxe
- Ring color: Green (#4CAF50)
- Label: "中级矿区"
- Sublabel: "Lv.5 | 最低下注: 50"
- Path from Node 1: Glowing trail

NODE 3 - 深空矿区 (top-right quadrant):
- Position: 75% from left, 30% from top
- Status: LOCKED
- Icon: Crystal + Lock overlay
- Ring color: Gray (dimmed purple)
- Label: "深空矿区"
- Sublabel: "需要: Lv.10"
- Locked tooltip: "达到10级解锁"

NODE 4 - 危险区 (top-center, slightly hidden):
- Position: 50% from left, 15% from top
- Status: LOCKED
- Icon: Skull + Lock overlay
- Ring color: Gray (dimmed red)
- Label: "危险区"
- Sublabel: "需要: 通行证"
- Mysterious fog effect around it

Connection Paths:
- Node 1 → Node 2: Solid glowing line (unlocked path)
- Node 2 → Node 3: Dashed line (locked path)
- Node 2 → Node 4: Dashed line with warning icon

=== SELECTED NODE DETAIL PANEL (right side overlay) ===
When a node is clicked, show detail panel:
- Width: 350px
- Background: #16213E with glow
- 
Content:
- Scene artwork (350×200px)
- Scene name (large)
- Description text
- Stats table:
  | 最低下注 | 10 星币 |
  | 奖励倍率 | 1.0x |
  | 特殊规则 | 无 |
  | 卡池 | 铁矿, 石头, 冰 |
- NPC preview (small portrait + name)
- "进入" button (large, primary)
- "返回" text button

=== BOTTOM INFO BAR ===
- Player level: "Lv.3"
- Progress to next level: progress bar
- Hint text: "提升等级解锁更多区域"

Include visual states:
1. Default map view
2. Node hover state (enlarged, info tooltip)
3. Node selected state (detail panel open)
4. Locked node interaction (shake + tooltip)
```

---

## 🧩 二、核心组件设计（10+个）

### 2.1 扑克牌组件（Playing Card）

```
Design the playing card component for Space 21 blackjack game.

Component: PlayingCard
Size: 120×168px (game table size)
Alternative sizes: 80×112px (small), 160×224px (large/detail)

=== CARD FRONT ===

Base:
- Background: Gradient from #16213E to #1A1A2E
- Border: 2px solid with suit color
- Border radius: 8px
- Inner glow effect (subtle)

Layout:
- Top-left corner: Rank + small suit (12px from edge)
- Bottom-right corner: Rank + small suit (rotated 180°)
- Center: Large suit symbol

Suit Colors:
- Spades (♠): White with blue glow
- Hearts (♥): Pink/red with pink glow  
- Diamonds (♦): Cyan with cyan glow
- Clubs (♣): Green with green glow

Rank Styling:
- Font: Bold, slightly futuristic
- Size: 18px for corner, 48px for face cards
- Color: White

Face Cards (J/Q/K):
- Center area shows stylized portrait
- Sci-fi character design
- Suit color as accent

Ace:
- Extra large suit symbol in center
- Subtle particle effect around it

=== CARD BACK ===
- Background: #0A0A1A
- Pattern: Geometric circuit pattern
- Center: Holographic galaxy emblem
- Border: Blue glow (#4A90E2)

=== STATES ===

1. Default:
   - Normal appearance

2. Hover:
   - Slight lift (translateY: -4px)
   - Enhanced glow
   - Scale: 1.02

3. Selected:
   - Strong glow ring
   - Checkmark overlay (for split selection)

4. Hidden (dealer's hole card):
   - Show card back
   - Subtle "?" overlay

5. Dealing animation placeholder:
   - Motion blur effect
   - Entry from deck position

6. Disabled:
   - Grayscale filter
   - 50% opacity

Show all states for Ace of Spades as example.
```

---

### 2.2 资源卡组件（Resource Card）

```
Design the resource card component for Space 21 inventory system.

Component: ResourceCard
Size: 128×176px (standard), 96×132px (compact)

=== CARD STRUCTURE ===

Base Container:
- Background: #16213E
- Border: 2px solid (color by rarity)
- Border radius: 10px
- Overflow: hidden

Rarity Border Colors:
- Common: #9E9E9E (gray)
- Rare: #2196F3 (blue)
- Epic: #9C27B0 (purple)
- Legendary: #FF9800 (orange/gold)

Image Area (top 60%):
- Full width
- Height: 105px
- Object-fit: cover
- Slight vignette overlay at bottom

Info Area (bottom 40%):
- Padding: 8px
- Background: Slightly darker

Card Name:
- Font: Bold, 14px
- Color: White
- Max 2 lines, ellipsis overflow

Card Type Icon (top-right of image):
- Small badge (24×24px)
- Icons: ⛏️ ore, 🍖 food, 🛡️ equipment, ⭐ special

Weight Badge (bottom-left):
- Background: rgba(0,0,0,0.7)
- Text: "⚖️ 5kg"
- Font: 10px

Stack Count (top-right corner):
- Only shown if count > 1
- Background: #000 with 80% opacity
- Text: "x5" in white
- Border radius: 4px
- Padding: 2px 6px

=== STATES ===

1. Default:
   - Normal appearance

2. Hover:
   - Scale: 1.05
   - Lift shadow
   - Show tooltip with full description

3. Dragging:
   - Scale: 1.1
   - Strong shadow
   - 80% opacity
   - Cursor: grabbing

4. Selected:
   - Blue glow ring
   - Checkmark badge

5. Disabled/Locked:
   - Grayscale
   - Lock icon overlay
   - "需要等级X" tooltip

6. New (just acquired):
   - "NEW" ribbon in corner
   - Sparkle animation placeholder

=== TOOLTIP (on hover) ===
- Width: 200px
- Background: #0A0A1A
- Border: 1px solid rarity color
- Content:
  - Name (large)
  - Type tag
  - Description (full text)
  - Stats: Weight, Stack limit, Sell price
  - Effect (if consumable): "+20 HP"

Show examples:
1. Common ore card (铁矿, x5)
2. Rare equipment card (采矿激光器, x1)
3. Epic consumable card (量子水晶, x2)
```

---

### 2.3 NPC卡片组件（NPC Card）

```
Design the NPC card component for Space 21 scene interactions.

Component: NPCCard
Size: 280×160px (scene panel), 200×120px (compact)

=== CARD STRUCTURE ===

Base:
- Background: Linear gradient #16213E to #1A1A2E
- Border: 2px solid #4A90E2
- Border radius: 12px
- Flex layout: row

Left Section (portrait, 40%):
- Circular portrait frame (80×80px)
- Border: 3px solid (NPC type color)
- Glow effect behind
- Portrait image centered

NPC Type Colors:
- Dealer: #4CAF50 (green)
- Merchant: #FF9800 (gold)
- Quest Giver: #2196F3 (blue)
- Special: #9C27B0 (purple)

Right Section (info, 60%):
- Padding: 12px

NPC Name:
- Font: Bold, 18px
- Color: White

NPC Title/Role:
- Font: 12px
- Color: #A0A0B0
- Example: "矿区庄家"

Status Indicator:
- Small dot + text
- Green: "可对话"
- Yellow: "任务进行中"
- Gray: "暂时离开"

Quick Action Button:
- Small pill button
- Text: "开始游戏" / "对话" / "交易"
- Color matches NPC type

=== STATES ===

1. Default:
   - Normal appearance

2. Hover:
   - Lift effect
   - Border glow intensifies
   - Button becomes more prominent

3. Active/Selected:
   - Strong glow
   - Expanded state (shows more info)

4. Unavailable:
   - Grayscale portrait
   - "暂时离开" status
   - No action button

5. Has Quest:
   - Yellow exclamation mark badge
   - Subtle pulse animation

6. Quest Complete:
   - Yellow question mark badge
   - Ready to turn in

=== EXPANDED STATE (on click) ===
- Height expands to 240px
- Shows dialogue preview
- Shows available actions list
- "查看详情" link

Show examples:
1. 机器人教官 (Dealer, available)
2. 老矿工杰克 (Merchant, has quest)
3. 神秘商人 (Special, locked)
```

---

### 2.4 游戏控制按钮组（Game Control Buttons）

```
Design the game control button group for Space 21 blackjack.

Component: GameControls
Layout: Horizontal button row
Container width: 560px
Button count: 4 main + betting controls

=== MAIN ACTION BUTTONS ===

Button Base Style:
- Size: 120×50px
- Border radius: 8px
- Font: Bold, 16px
- Text color: White
- Transition: all 0.2s ease

Button 1 - HIT (要牌):
- Background: Linear gradient #4A90E2 to #357ABD
- Icon: Card with + symbol (left of text)
- Glow: Blue
- Hotkey hint: "H" in small text

Button 2 - STAND (停牌):
- Background: Linear gradient #FF9800 to #F57C00
- Icon: Hand stop symbol
- Glow: Orange
- Hotkey hint: "S"

Button 3 - DOUBLE (加倍):
- Background: Linear gradient #FFD700 to #FFA000
- Icon: 2x symbol
- Glow: Gold
- Hotkey hint: "D"
- Condition text below: "(需要足够星币)"

Button 4 - SPLIT (分牌):
- Background: Linear gradient #9C27B0 to #7B1FA2
- Icon: Split arrows
- Glow: Purple
- Hotkey hint: "P"
- Only enabled when pair detected

=== BUTTON STATES ===

1. Default:
   - Normal gradient
   - Subtle shadow

2. Hover:
   - Brighter gradient
   - Lift (translateY: -2px)
   - Enhanced glow

3. Active/Pressed:
   - Darker gradient
   - No lift
   - Inner shadow

4. Disabled:
   - Gray gradient (#666 to #444)
   - 50% opacity
   - No glow
   - Cursor: not-allowed
   - Tooltip: reason for disabled

5. Loading:
   - Spinner icon
   - Pulsing opacity

=== BETTING CONTROLS (separate row above) ===

Layout: Centered, 400px width

Bet Display:
- Current bet: "下注: 100 ⭐"
- Large text, gold color
- Chip stack icon

Bet Adjustment:
- "-10" button (circular, 40px)
- "-50" button
- Bet amount display (120px wide)
- "+50" button  
- "+100" button
- "MAX" button

Quick Bet Buttons:
- "10" "50" "100" "500" preset buttons
- Smaller, pill-shaped
- Highlight current selection

"DEAL" Button (below bet controls):
- Size: 200×60px
- Background: Gradient green #4CAF50 to #388E3C
- Text: "发牌" large and bold
- Icon: Card deck
- Prominent glow
- Only enabled after bet placed

Show complete control panel with all states.
```

---

### 2.5 顶部状态栏（Top Status Bar）

```
Design the top status bar for Space 21.

Component: TopBar
Size: Full width × 80px
Position: Fixed top

=== STRUCTURE ===

Background:
- Color: #16213E with 95% opacity
- Backdrop blur: 10px
- Bottom border: 1px solid rgba(74, 144, 226, 0.3)

Layout: Flexbox, space-between, vertically centered
Padding: 0 24px

=== LEFT SECTION (Player Resources) ===

Money Display:
- Coin icon (animated spin on change)
- Amount: "1,000" in bold
- Label: "星币" in smaller text
- Color: Gold (#FFD700)
- Click: Opens transaction history

Separator: Vertical line, 1px, 40px height

HP Display:
- Heart icon (pulses when low)
- HP Bar: 160px × 20px
- Bar background: #333
- Bar fill: Gradient red (#F44336 to #C62828)
- Text overlay: "85/100"
- When < 30%: Bar pulses red

=== CENTER SECTION (Game Info) ===

Current Scene Badge:
- Icon: Location pin
- Text: "新手矿区"
- Background: Pill shape, #4A90E2
- Click: Opens scene details

Round Counter (during game):
- "第 3 局"
- Smaller text below: "连胜: 2"

=== RIGHT SECTION (Actions) ===

Button Group:
- Gap: 12px between buttons

Inventory Button:
- Icon: Backpack
- Size: 44×44px
- Background: Transparent
- Border: 1px solid #4A90E2
- Badge: Red dot if new items

Settings Button:
- Icon: Gear
- Same style as inventory
- Opens settings modal

Profile Button:
- Player avatar (circular, 40px)
- Level badge overlay: "Lv.3"
- Click: Opens profile panel

=== STATES ===

1. Default game state

2. Low HP warning:
   - HP section has red glow
   - Heart icon pulses
   - Warning icon appears

3. Low money warning:
   - Money section has yellow glow
   - "余额不足" tooltip

4. New items notification:
   - Red badge on inventory
   - Subtle bounce animation

5. Level up state:
   - Level badge glows gold
   - Particle effect

Show all variations.
```

---

### 2.6 对话框组件（Dialogue Box）

```
Design the NPC dialogue box component for Space 21.

Component: DialogueBox
Size: 600×200px (expandable)
Position: Bottom center of scene panel

=== STRUCTURE ===

Container:
- Background: #16213E with 95% opacity
- Border: 2px solid #4A90E2
- Border radius: 16px
- Box shadow: 0 -4px 20px rgba(0,0,0,0.5)

=== LAYOUT ===

Left Section (NPC Info):
- Width: 120px
- NPC portrait (80×80px, circular)
- NPC name below
- Mood indicator (emoji or icon)

Right Section (Dialogue Content):
- Flex: 1
- Padding: 16px

Speaker Name:
- Font: Bold, 16px
- Color: #4A90E2
- Margin bottom: 8px

Dialogue Text:
- Font: 14px, line-height 1.6
- Color: White
- Typewriter effect placeholder
- Max 3 lines visible, scroll if more

=== BOTTOM ACTIONS ===

Response Options (when available):
- Vertical list of clickable options
- Each option:
  - Background: Transparent
  - Border: 1px solid #4A90E2
  - Padding: 8px 16px
  - Hover: Background #4A90E2, text white
- Example options:
  - "开始游戏" → starts blackjack
  - "查看商店" → opens shop
  - "询问任务" → shows quest info
  - "离开" → closes dialogue

Continue Indicator (when no options):
- "点击继续" or "按空格继续"
- Blinking arrow icon
- Bottom right corner

=== STATES ===

1. Appearing:
   - Slide up animation
   - Fade in

2. Typing:
   - Text appears character by character
   - Cursor blinks at end

3. Waiting for input:
   - Continue indicator visible
   - Subtle pulse

4. With choices:
   - Options list visible
   - First option highlighted

5. Closing:
   - Slide down
   - Fade out

=== SPECIAL DIALOGUE TYPES ===

Quest Dialogue:
- Yellow border instead of blue
- Quest icon in corner
- "新任务" badge

Shop Dialogue:
- Gold border
- Coin icon
- "查看商品" prominent button

Warning Dialogue:
- Red border
- Warning icon
- Danger zone entry confirmation

Show examples of each type.
```

---

### 2.7 奖励弹窗（Reward Modal）

```
Design the reward modal for Space 21 game results.

Component: RewardModal
Size: 480×600px (centered)
Trigger: After each game round ends

=== OVERLAY ===
- Full screen
- Background: rgba(0,0,0,0.8)
- Backdrop blur: 5px
- Click outside to close (after animation)

=== MODAL CONTAINER ===

Background:
- Gradient: #16213E to #1A1A2E
- Border: 3px solid (result color)
- Border radius: 20px
- Box shadow: 0 0 40px (result color glow)

Result Colors:
- Win: #4CAF50 (green)
- Blackjack: #FFD700 (gold)
- Five Card Charlie: #9C27B0 (purple)
- Lose: #F44336 (red)
- Push: #9E9E9E (gray)

=== HEADER SECTION ===

Result Banner:
- Full width, 100px height
- Background: Result color gradient
- Large text: "胜利!" / "21点!" / "失败" / "平局"
- Icon: Trophy / Cards / X / Handshake
- Confetti animation for wins

=== SCORE SUMMARY ===

Your Hand:
- Card fan display (mini cards)
- Score: "19点"

Dealer Hand:
- Card fan display
- Score: "17点"

Comparison arrow between them

=== REWARDS SECTION ===

Money Change:
- Icon: Coin
- Text: "+200 星币" (green) or "-100 星币" (red)
- Animation: Count up effect

Cards Earned (if won):
- Header: "获得卡牌"
- Card display (1-3 cards)
- Each card shows: image, name, rarity glow
- "NEW" badge if first time getting

Streak Bonus (if applicable):
- "🔥 连胜 x3"
- Bonus multiplier: "+50% 奖励"

=== STATS SECTION ===

Quick Stats:
- 本局时长: 2分30秒
- 抽牌次数: 3
- 最高点数: 19

=== ACTION BUTTONS ===

Primary Button:
- "再来一局" (large, result color)
- Hotkey: Space or Enter

Secondary Button:
- "返回场景" (outlined)
- "查看背包" (text link)

=== ANIMATION SEQUENCE ===

1. Overlay fades in
2. Modal scales up from center
3. Result banner slides down
4. Cards flip to reveal
5. Money counts up
6. Reward cards appear one by one
7. Buttons fade in

Show all result variations:
1. Normal win
2. Blackjack win (extra celebration)
3. Five Card Charlie (special effects)
4. Loss
5. Push (tie)
```

---

### 2.8 负重条组件（Weight Bar）

```
Design the weight/capacity bar component for Space 21 inventory.

Component: WeightBar
Size: Full width × 32px (standard), 200px × 24px (compact)

=== STRUCTURE ===

Container:
- Background: #0A0A1A
- Border: 1px solid #333
- Border radius: 16px (pill shape)
- Padding: 4px

Progress Fill:
- Border radius: 12px (inner pill)
- Height: Fill container
- Animated width transition

=== COLOR STATES ===

Normal (0-79%):
- Fill: Linear gradient #4A90E2 to #357ABD
- Glow: Subtle blue

Warning (80-94%):
- Fill: Linear gradient #FF9800 to #F57C00
- Glow: Orange pulse
- Warning icon appears

Critical (95-100%):
- Fill: Linear gradient #F44336 to #C62828
- Glow: Red pulse (faster)
- "超重!" warning text

Overweight (>100%):
- Fill: Solid #F44336
- Entire bar pulses red
- "无法添加更多物品" tooltip

=== LABELS ===

Left Label:
- Icon: Scale/weight icon
- Text: "负重"

Right Label:
- Current/Max: "45/100"
- Unit: "kg"

Percentage (optional):
- Centered on bar
- "45%"
- Text color: White with shadow

=== VARIANTS ===

1. Standard (inventory panel):
   - Full width
   - All labels visible
   - Detailed

2. Compact (top bar):
   - Fixed 200px width
   - Only current/max shown
   - Tooltip for details

3. Circular (inventory screen):
   - 120×120px circle
   - Progress as arc
   - Center shows numbers
   - Color coding same as linear

=== INTERACTIONS ===

Hover:
- Tooltip shows breakdown:
  - 铁矿 x5: 25kg
  - 金矿 x2: 16kg
  - 能量棒 x3: 3kg
  - 总计: 44kg

Animation:
- Smooth transition when weight changes
- Bounce effect when adding items
- Shake effect when trying to exceed

Show all states and variants.
```

---

### 2.9 设置面板（Settings Panel）

```
Design the settings panel modal for Space 21.

Component: SettingsPanel
Size: 500×600px
Position: Centered modal

=== HEADER ===
- Title: "设置" with gear icon
- Close button (X) top right

=== TABS ===
Tab bar with 3 tabs:
- [游戏] [音效] [显示]
- Active tab: Underline + brighter text

=== GAME TAB ===

Difficulty Section:
- Label: "游戏难度"
- Radio buttons: 简单 / 普通 / 困难
- Description text for each

Auto-play Options:
- Toggle: "自动停牌 (17点以上)"
- Toggle: "快速发牌动画"
- Toggle: "跳过结算动画"

Confirmation Options:
- Toggle: "大额下注确认 (>500)"
- Toggle: "退出游戏确认"

=== AUDIO TAB ===

Master Volume:
- Slider: 0-100%
- Current value display
- Mute button

Music Volume:
- Slider with preview button
- "🎵 背景音乐"

SFX Volume:
- Slider with test button
- "🔊 音效"

Voice Volume (if applicable):
- Slider
- "🗣️ 语音"

Quick Toggles:
- "全部静音" button

=== DISPLAY TAB ===

Visual Quality:
- Dropdown: 低 / 中 / 高 / 极高
- Affects: 粒子效果, 阴影, 动画

Card Style:
- Preview of 3 card back designs
- Radio selection

Animation Speed:
- Slider: 0.5x to 2x
- Preview button

Color Theme:
- Swatches: 默认蓝 / 暗紫 / 深绿
- Preview updates live

Accessibility:
- Toggle: "高对比度模式"
- Toggle: "减少动画"
- Toggle: "大字体模式"

=== FOOTER ===

Buttons:
- "恢复默认" (left, text button)
- "取消" (outlined)
- "保存" (primary, blue)

=== STATES ===

1. Default view
2. Unsaved changes indicator (dot on Save button)
3. Slider being dragged
4. Toggle animation
5. Tab switching animation

Show complete panel with Game tab active.
```

---

### 2.10 加载界面（Loading Screen）

```
Design the loading screen for Space 21.

Component: LoadingScreen
Size: Full screen (1920×1080)

=== BACKGROUND ===
- Deep space (#0A0A1A)
- Animated star field (parallax layers)
- Subtle nebula clouds drifting

=== CENTER CONTENT ===

Game Logo:
- "SPACE 21" stylized text
- Sci-fi font with glow effect
- Subtitle: "太空矿工的赌局"
- Size: ~400px wide

Loading Indicator:
- Below logo, 300px wide

Style Option 1 - Card Flip:
- 3 cards flipping in sequence
- Card backs to fronts
- Loop animation

Style Option 2 - Progress Bar:
- Sci-fi styled bar
- Glowing fill animation
- Percentage text: "67%"

Style Option 3 - Orbital:
- Central point (planet/station)
- Orbiting dots
- Pulsing glow

Loading Text:
- Rotating tips/hints:
  - "提示: Ace可以算作1点或11点"
  - "提示: 五张牌不爆可获得3倍奖励"
  - "提示: 在商店出售矿石获取星币"
- Fade transition between tips

=== PROGRESS DETAILS ===

Current Task (small text):
- "加载游戏资源..."
- "加载音效..."
- "连接服务器..."
- "准备就绪!"

=== BOTTOM SECTION ===

Version Info:
- "v1.0.0 Beta"
- Bottom left corner

Skip Button (after minimum load time):
- "跳过" or "按任意键继续"
- Fades in after 3 seconds
- Bottom center

=== TRANSITION OUT ===

When loading complete:
1. "准备就绪!" text appears
2. Cards/indicator completes
3. Fade to white
4. Fade into game

Show the loading screen with card flip animation style.
```

---

## 📊 组件清单汇总

| 类别           | 组件名       | 尺寸       | 优先级 |
| -------------- | ------------ | ---------- | ------ |
| **页面** | 主游戏界面   | 1920×1080 | P0     |
| **页面** | 背包界面     | 1920×1080 | P0     |
| **页面** | 商店界面     | 1920×1080 | P1     |
| **页面** | 地图界面     | 1920×1080 | P1     |
| **组件** | 扑克牌       | 120×168   | P0     |
| **组件** | 资源卡       | 128×176   | P0     |
| **组件** | NPC卡片      | 280×160   | P1     |
| **组件** | 游戏控制按钮 | 560×120   | P0     |
| **组件** | 顶部状态栏   | 全宽×80   | P0     |
| **组件** | 对话框       | 600×200   | P1     |
| **组件** | 奖励弹窗     | 480×600   | P0     |
| **组件** | 负重条       | 全宽×32   | P1     |
| **组件** | 设置面板     | 500×600   | P2     |
| **组件** | 加载界面     | 全屏       | P1     |

---

## 💡 使用建议

1. **执行顺序**：先执行设计系统 Prompt，建立统一风格后再设计具体页面
2. **迭代优化**：每个 Prompt 生成后检查是否符合整体风格，必要时微调
3. **状态完整**：确保每个组件都包含所有交互状态（hover/active/disabled等）
4. **响应式考虑**：主要针对桌面端，但组件设计时考虑未来移动端适配
5. **导出规范**：设计完成后导出为 PNG/SVG，按组件命名存放
