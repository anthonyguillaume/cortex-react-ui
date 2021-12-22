import React from 'react';
import { Cortex } from './types';
export interface TagSuggestionItemProps {
    suggestion: Cortex.TagSuggestion;
    onClick?: (suggestion: Cortex.TagSuggestion, event: React.MouseEvent<HTMLDivElement>) => void;
}
declare const TagSuggestionItem: React.FC<TagSuggestionItemProps>;
export default TagSuggestionItem;
