import React from 'react';
import { ConfigProvider, App } from 'antd';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'var(--font-inter)',
          fontSize: 16, // Base body size B1/B2

          // Primary Palette
          colorPrimary: '#7B8794', // Primary 500

          // System/Status Colors
          colorSuccess: '#43B75D', // Green 500
          colorWarning: '#FFAA00', // Yellow 500
          colorError: '#EE443F', // Red 500
          colorInfo: '#0095FF', // Blue 500

          // Neutrals
          colorTextBase: '#131927', // Grey 900

          // Base spacing, typography and rounding
          lineHeight: 1.5, // 24px line-height for 16px base size, matching B1 Body
          borderRadius: 8,
          colorLink: '#0095FF', // Use Blue 500 for links
        },
        components: {
          Typography: {
            fontSizeHeading1: 48,
            lineHeightHeading1: 58 / 48,
            fontSizeHeading2: 40,
            lineHeightHeading2: 48 / 40,
            fontSizeHeading3: 32,
            lineHeightHeading3: 38 / 32,
            fontSizeHeading4: 28,
            lineHeightHeading4: 34 / 28,
            fontSizeHeading5: 24,
            lineHeightHeading5: 28 / 24,
            fontWeightStrong: 600,
          },
          Button: {
            fontWeight: 500, // Matching Figma "Medium 500" for buttons
            // Custom button sizes matching Figma
            fontSize: 14, // Medium Button
            fontSizeLG: 14, // Large Button uses 14px too
            fontSizeSM: 14, // Small Button uses 14px too
            controlHeight: 44, // Base height (Medium)
            controlHeightLG: 52,
            controlHeightSM: 36,
            paddingInline: 20, // Medium padding X
            paddingInlineLG: 24, // Large padding X
            paddingInlineSM: 20, // Small padding X
          },
          Input: {
            colorPrimary: '#0095FF', // Blue 500 for focus/hover
            colorPrimaryHover: '#0095FF',
            controlHeight: 48,
            borderRadius: 12,
            paddingInline: 14,
            colorBorder: '#E5E7EA', // Grey 200
            colorTextPlaceholder: '#9EA2AE', // Grey 400
            activeShadow: '0 0 0 4px rgba(0, 149, 255, 0.1)', // Focus ring
            errorActiveShadow: '0 0 0 4px rgba(238, 68, 63, 0.1)', // Error Focus ring
            warningActiveShadow: '0 0 0 4px rgba(255, 170, 0, 0.1)', // Warning Focus ring
          },
          Form: {
            labelColor: '#4B545D', // Primary 700
            labelFontSize: 14,
            labelHeight: 20,
            verticalLabelPadding: '0 0 8px', // Match the 8px gap between label and input
          },
        },
      }}
    >
      <App>{children}</App>
    </ConfigProvider>
  );
};
