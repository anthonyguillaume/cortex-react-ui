import React from 'react';
import TagSuggestionItem from './TagSuggestionItem';
import { Cortex } from './types';

export interface TagSuggestionGroupProps {
    group: Cortex.TagSuggestion;
    onClick?: (suggestion: Cortex.TagSuggestion, event: React.MouseEvent<HTMLDivElement>) => void;
}

const TagSuggestionGroup: React.FC<TagSuggestionGroupProps> = ({
    group,
    onClick
}: TagSuggestionGroupProps) => {
    const suggestionElements = Array.isArray(group.suggestions) ? group.suggestions.map((sugItem, idx) => {
        if (sugItem.group === true) {
            return (
                <TagSuggestionGroup
                    key={idx}
                    group={sugItem}
                    onClick={onClick}
                />
            );
        }
        return (
            <TagSuggestionItem
                key={idx}
                suggestion={sugItem}
                onClick={onClick}
            />
        );
    }) : null;

    return (
        <div>
            <span>{group.label}</span>
            <div>
                {suggestionElements}
            </div>
        </div>
    );
};

export default TagSuggestionGroup;