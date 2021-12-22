import React from 'react';
import setRef from '../utils/setRef';

export interface TagSearchInputProps {
    className?: string;
    value: string;
    onClick?: () => void;
    onChange?: (value: string) => void;
}

const TagSearchInput = React.forwardRef<HTMLElement, TagSearchInputProps>(({
    className,
    value,
    onClick,
    onChange
}: TagSearchInputProps, ref) => {
    const inputRef = React.useRef(null);

    const handleInputChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        if (!onChange) return;
        onChange(event.target.value);
    }, [onChange]);

    React.useEffect(() => {
        if (ref && inputRef) {
            setRef(ref, inputRef.current);

            return () => {
                setRef(ref, null);
            };
        }

        return undefined;
    }, [ref, inputRef]);

    return (
        <>
            <input
                ref={inputRef}
                value={value}
                onChange={handleInputChange}
                onClick={onClick}
            />
        </>
    );
});

export default TagSearchInput;