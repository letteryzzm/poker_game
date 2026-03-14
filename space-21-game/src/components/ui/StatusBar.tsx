import { colors } from '@/styles/theme';

interface Props {
  label: string;
  current: number;
  max: number;
  color?: string;
  icon?: string;
}

export function StatusBar({ label, current, max, color = colors.success, icon }: Props) {
  const percentage = Math.min((current / max) * 100, 100);

  return (
    <div className="flex items-center gap-3">
      {icon && <span className="text-xl">{icon}</span>}
      <div className="flex-1">
        <div className="flex justify-between text-sm mb-1">
          <span style={{ color: colors.textPrimary }}>{label}</span>
          <span style={{ color: colors.textSecondary }}>{current}/{max}</span>
        </div>
        <div className="h-2 rounded-full" style={{ backgroundColor: colors.cardBg }}>
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{ width: `${percentage}%`, backgroundColor: color }}
          />
        </div>
      </div>
    </div>
  );
}
