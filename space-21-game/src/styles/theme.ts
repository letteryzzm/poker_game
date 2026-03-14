// 设计系统 - 从 Pencil 提取
export const colors = {
  primary: '#4A90E2',
  secondary: '#7B68EE',
  bgDark: '#1A1A2E',
  cardBg: '#16213E',
  success: '#4CAF50',
  danger: '#F44336',
  warning: '#FFB300',
  textPrimary: '#FFFFFF',
  textSecondary: '#A0A0B0'
} as const;

export const typography = {
  fontFamily: 'Inter, sans-serif',
  sizes: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '32px'
  },
  weights: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700'
  }
} as const;
