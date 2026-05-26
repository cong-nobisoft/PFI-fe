import { Button as AntdButton } from 'antd';
import type { ButtonProps as AntdButtonProps } from 'antd';
import React from 'react';

export type ButtonSize = 'large' | 'medium' | 'small';
export type ButtonVariant = 'gradient' | 'default' | 'primary' | 'dashed' | 'link' | 'text';

export interface ButtonCommonProps extends Omit<AntdButtonProps, 'icon' | 'variant' | 'size'> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  /**
   * Visual style of the button.
   * - `gradient`: Figma gradient border style (default)
   * - Other values map to Ant Design's native button types.
   */
  variant?: ButtonVariant;
  /**
   * Size of the button.
   * - `large`: px-6 py-4 (24px / 16px) — default
   * - `medium`: px-5 py-3 (20px / 12px)
   * - `small`: px-5 py-2 (20px / 8px)
   */
  size?: ButtonSize;
}

const SIZE_CLASS_MAP: Record<ButtonSize, string> = {
  large: 'btn-size-large',
  medium: 'btn-size-medium',
  small: 'btn-size-small',
};

export const ButtonCommon: React.FC<ButtonCommonProps> = ({
  children,
  leftIcon,
  rightIcon,
  variant = 'gradient',
  size = 'large',
  className = '',
  disabled,
  ...props
}) => {
  const isGradient = variant === 'gradient';
  const gradientClass = isGradient && !disabled ? 'btn-gradient-border' : '';
  const disabledClass = disabled ? 'btn-disabled' : '';
  const sizeClass = SIZE_CLASS_MAP[size];

  return (
    <AntdButton
      className={`btn-common ${sizeClass} ${gradientClass} ${disabledClass} ${className}`.trim()}
      disabled={disabled}
      type={isGradient ? 'default' : (variant as AntdButtonProps['type'])}
      {...props}
    >
      {leftIcon && <span className="btn-icon">{leftIcon}</span>}
      {children && <span className="btn-label">{children}</span>}
      {rightIcon && <span className="btn-icon">{rightIcon}</span>}
    </AntdButton>
  );
};
