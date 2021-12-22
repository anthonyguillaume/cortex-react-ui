import React from 'react';
export interface TagSearchInputProps {
    className?: string;
    value: string;
    onClick?: () => void;
    onChange?: (value: string) => void;
}
declare const TagSearchInput: React.ForwardRefExoticComponent<TagSearchInputProps & React.RefAttributes<HTMLElement>>;
export default TagSearchInput;
