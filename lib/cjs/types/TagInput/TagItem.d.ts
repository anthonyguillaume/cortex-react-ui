import React from 'react';
import { Cortex } from './types';
export interface TooltipProps {
    tag: Cortex.Tag;
    className?: string;
    onDelete?: () => void;
}
declare const TagItem: React.FC<TooltipProps>;
export default TagItem;
