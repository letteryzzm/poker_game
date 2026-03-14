import { motion } from 'framer-motion';
import { colors } from '@/styles/theme';

interface Props {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  onClick?: () => void;
  disabled?: boolean;
}

const variantStyles = {
  primary: { bg: colors.primary, hover: '#5BA3F5' },
  secondary: { bg: colors.secondary, hover: '#8B7BF8' },
  danger: { bg: colors.danger, hover: '#F55A4E' },
  success: { bg: colors.success, hover: '#5FBF63' }
};

export function Button({ children, variant = 'primary', onClick, disabled }: Props) {
  const style = variantStyles[variant];

  return (
    <motion.button
      className="px-6 py-3 rounded-lg font-semibold text-white"
      style={{ backgroundColor: style.bg }}
      whileHover={!disabled ? { backgroundColor: style.hover, scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
}
