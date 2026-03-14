import { colors } from '@/styles/theme';
import { Button } from '../ui/Button';

interface MapNode {
  id: string;
  name: string;
  icon: string;
  completed: boolean;
  locked: boolean;
}

interface Props {
  nodes: MapNode[];
  currentNode: string;
  onSelectNode: (nodeId: string) => void;
  onClose: () => void;
}

export function MapScreen({ nodes, currentNode, onSelectNode, onClose }: Props) {
  return (
    <div className="w-screen h-screen flex flex-col" style={{ backgroundColor: '#0A0A1A' }}>
      {/* 头部 */}
      <div className="h-20 flex items-center justify-between px-8" style={{ backgroundColor: colors.cardBg }}>
        <span className="text-2xl font-bold" style={{ color: colors.textPrimary }}>🗺️ 星际地图</span>
        <button onClick={onClose} className="px-4 py-2 rounded-lg" style={{ backgroundColor: colors.danger }}>
          <span style={{ color: colors.textPrimary }}>✕</span>
        </button>
      </div>

      {/* 地图区域 */}
      <div className="flex-1 relative p-12">
        {nodes.map((node, i) => (
          <div
            key={node.id}
            className="absolute flex flex-col items-center gap-2 cursor-pointer"
            style={{
              left: `${20 + i * 25}%`,
              top: `${30 + (i % 2) * 20}%`,
              opacity: node.locked ? 0.5 : 1
            }}
            onClick={() => !node.locked && onSelectNode(node.id)}
          >
            <div
              className="w-45 h-45 rounded-full flex items-center justify-center text-4xl"
              style={{
                backgroundColor: node.completed ? colors.success : colors.cardBg,
                border: `3px solid ${node.id === currentNode ? colors.primary : colors.textSecondary}`
              }}
            >
              {node.icon}
            </div>
            <span style={{ color: colors.textPrimary }}>{node.name}</span>
          </div>
        ))}
      </div>

      {/* 底部 */}
      <div className="h-20 flex items-center justify-center gap-6 px-8" style={{ backgroundColor: colors.cardBg }}>
        <Button variant="primary" onClick={() => onSelectNode(currentNode)}>
          进入关卡
        </Button>
      </div>
    </div>
  );
}
