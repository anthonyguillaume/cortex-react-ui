import React from 'react';
import { Cortex } from './types';
export interface TooltipProps {
    tags?: Cortex.Tag[];
    className?: string;
    suggestions?: Cortex.TagSuggestion[];
    onChange?: (tags: Cortex.Tag[]) => void;
}
declare const TagInput: React.FC<TooltipProps>;
export default TagInput;
