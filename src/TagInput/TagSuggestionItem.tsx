import React from 'react';
import classNames from '../utils/classNames';
import { Cortex } from './types';

export interface TagSuggestionItemProps {
    suggestion: Cortex.TagSuggestion;
    onClick?: (suggestion: Cortex.TagSuggestion, event: React.MouseEvent<HTMLDivElement>) => void;
}

const TagSuggestionItem: React.FC<TagSuggestionItemProps> = ({
    suggestion,
    onClick
}: TagSuggestionItemProps) => {
    const handleClick = React.useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        if (!onClick) return;
        onClick(suggestion, event);
    }, [onClick]);

    return (
        <div
            role="button"
            onClick={handleClick}
            tabIndex={0}
        >
            {suggestion.label}
        </div>
    );
};

export default TagSuggestionItem;