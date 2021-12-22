import React from 'react';
import classNames from '../utils/classNames';
import useClickOutside from '../utils/useClickOutside';
import TagItem from './TagItem';
import TagSearchInput from './TagSearchInput';
import TagSuggestion from './TagSuggestion';
import { Cortex } from './types';

export interface TooltipProps {
    tags?: Cortex.Tag[];
    className?: string;
    suggestions?: Cortex.TagSuggestion[];
    onChange?: (tags: Cortex.Tag[]) => void;
}

const TagInput: React.FC<TooltipProps> = ({
    tags,
    className,
    suggestions,
    onChange
}: TooltipProps) => {
    const inputRef = React.useRef(null);
    const suggestionRef = React.useRef(null);
    const nodeRef = React.useRef<HTMLDivElement>(null);
    const [inputValue, setInputValue] = React.useState<string>('');
    const [suggestionOpen, setSuggestionOpen] = React.useState<boolean>(false);

    useClickOutside(() => {
        setSuggestionOpen(false);
    }, [inputRef, suggestionRef]);

    const handleDeleteTag = React.useCallback((tag: Cortex.Tag) => {
        if (!onChange || !Array.isArray(tags)) return;

        const tagIndex = tags.findIndex(tagItem => tagItem.id === tag.id);
        if (tagIndex < 0) return;

        const newTags = [...tags];
        newTags.splice(tagIndex, 1);
        onChange(newTags);
    }, [tags, onChange]);

    const handleSuggestionClick = React.useCallback((suggestion: Cortex.TagSuggestion) => {
        if (!onChange || !suggestion) return;

        const newTag: Cortex.Tag = {
            id: suggestion.id,
            label: suggestion.label
        };

        const newTags = Array.isArray(tags) ? [...tags, newTag] : [newTag];
        setSuggestionOpen(false);
        onChange(newTags);
    }, [tags, onChange]);

    const handleSearchInputClick = () => {
        setSuggestionOpen(true);
    };

    const tagElements = Array.isArray(tags) ?
        tags.map((tagItem, idx) => (
            <TagItem
                key={idx}
                tag={tagItem}
                onDelete={() => handleDeleteTag(tagItem)}
            />
        )) : [];

    return (
        <div ref={nodeRef}>
            {tagElements}
            <TagSearchInput
                ref={inputRef}
                value={inputValue}
                onChange={newValue => setInputValue(newValue)}
                onClick={handleSearchInputClick}
            />
            <TagSuggestion
                ref={suggestionRef}
                open={suggestionOpen}
                anchorEl={inputRef}
                filter={inputValue}
                suggestions={suggestions}
                onSuggestionClick={handleSuggestionClick}
            />
        </div>
    );
};

export default TagInput;