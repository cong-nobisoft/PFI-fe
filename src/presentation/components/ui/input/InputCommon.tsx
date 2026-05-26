import { Input as AntdInput } from 'antd';
import type { InputProps as AntdInputProps } from 'antd';
import React from 'react';

import { ChevronDownIcon } from '@heroicons/react/24/outline';

export interface InputCommonProps extends AntdInputProps {
  /** If true, adds a ChevronDown icon as suffix, often used to mock a Select input */
  showDropdownIcon?: boolean;
}

export const InputCommon = React.forwardRef<any, InputCommonProps>(
  ({ showDropdownIcon, suffix, className = '', ...props }, ref) => {
    // Determine suffix icon
    let mergedSuffix = suffix;
    if (showDropdownIcon && !suffix) {
      mergedSuffix = (
        <ChevronDownIcon className="w-5 h-5 text-[#9EA2AE]" strokeWidth={1.5} />
      );
    }

    return (
      <AntdInput
        ref={ref}
        suffix={mergedSuffix}
        className={`text-[16px] font-normal text-[#131927] ${className}`}
        {...props}
      />
    );
  },
);

InputCommon.displayName = 'InputCommon';
