import React from 'react';
import { Cortex } from './types';

export interface TooltipProps {
    tag: Cortex.Tag;
    className?: string;
    onDelete?: () => void;
}

const TagItem: React.FC<TooltipProps> = ({
    tag,
    className,
    onDelete
}: TooltipProps) => {
    return (
        <span>
            <span>{tag.label}</span>
            <button
                type="button"
                onClick={onDelete}
            >
                x
            </button>
        </span>
    );
};

export default TagItem;