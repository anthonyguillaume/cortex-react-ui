import React from 'react';
import { Cortex } from './types';
export interface TagSuggestionGroupProps {
    group: Cortex.TagSuggestion;
    onClick?: (suggestion: Cortex.TagSuggestion, event: React.MouseEvent<HTMLDivElement>) => void;
}
declare const TagSuggestionGroup: React.FC<TagSuggestionGroupProps>;
export default TagSuggestionGroup;
