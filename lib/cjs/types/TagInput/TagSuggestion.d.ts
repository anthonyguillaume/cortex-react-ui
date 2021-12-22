import React from 'react';
import { Cortex } from './types';
export interface TagSuggestionProps {
    open: boolean;
    suggestions?: Cortex.TagSuggestion[];
    anchorEl?: React.RefObject<HTMLElement>;
    filter?: string;
    onSuggestionClick?: (suggestion: Cortex.TagSuggestion) => void;
}
declare const TagSuggestion: React.ForwardRefExoticComponent<TagSuggestionProps & React.RefAttributes<HTMLElement>>;
export default TagSuggestion;
