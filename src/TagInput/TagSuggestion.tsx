import React from 'react';
import Popper from '../Popper';
import { PopperPlacement } from '../Popper/Popper';
import setRef from '../utils/setRef';
import useForkRef from '../utils/useForkRef';
import TagSuggestionGroup from './TagSuggestionGroup';
import TagSuggestionItem from './TagSuggestionItem';
import { Cortex } from './types';

export interface TagSuggestionProps {
    open: boolean;
    suggestions?: Cortex.TagSuggestion[];
    anchorEl?: React.RefObject<HTMLElement>;
    filter?: string;
    onSuggestionClick?: (suggestion: Cortex.TagSuggestion) => void;
}

const TagSuggestion = React.forwardRef<HTMLElement, TagSuggestionProps>(({
    open,
    suggestions,
    anchorEl,
    filter,
    onSuggestionClick
}: TagSuggestionProps, ref) => {
    const [childNode, setChildNode] = React.useState();
    const popperRef = React.useRef<HTMLElement | null>(null);

    const filteredSuggestions = React.useMemo<Cortex.TagSuggestion[]>(() => {
        if (!Array.isArray(suggestions)) return [];
        if (!filter || filter.length === 0) return suggestions;

        const result = [...suggestions];
        return result
            .filter(sugItem => {
                if (sugItem.group === true) {
                    if (Array.isArray(sugItem.suggestions)) {
                        sugItem.suggestions = sugItem.suggestions.filter(childSugItem =>
                            childSugItem.label.toUpperCase().indexOf(filter.toUpperCase()) >= 0);
                        return sugItem.suggestions.length > 0;
                    }
                    return false;
                }
                return sugItem.label.toUpperCase().indexOf(filter.toUpperCase()) >= 0;
            });
    }, [suggestions, filter]);

    const handleItemClick = React.useCallback((suggestion: Cortex.TagSuggestion) => {
        if (!onSuggestionClick) return;
        onSuggestionClick(suggestion);
    }, [onSuggestionClick]);

    const isOpen = open && filteredSuggestions.length > 0;
    const suggestionElements = filteredSuggestions.map((sugItem, idx) => {
        if (sugItem.group === true) {
            return (
                <TagSuggestionGroup
                    key={idx}
                    group={sugItem}
                    onClick={handleItemClick}
                />
            );
        }
        return (
            <TagSuggestionItem
                key={idx}
                suggestion={sugItem}
                onClick={handleItemClick}
            />
        );
    });

    return (
        <Popper
            ref={ref}
            open={isOpen}
            anchorEl={anchorEl}
            placement={PopperPlacement.BottomLeft}
        >
            {suggestionElements}
        </Popper>
    );
});

export default TagSuggestion;