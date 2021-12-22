import * as React from 'react';

export default function useClickOutside(
    callback: () => void,
    nodes: React.MutableRefObject<HTMLElement | null>[],
): void {
    const handleDocumentClick = React.useCallback((event: MouseEvent) => {
        const { target } = event;

        const isOutside = nodes.reduce((acc, item) => {
            if (acc === false || !item.current || item.current === null) return acc;
            return !item.current.contains(target as Node);
        }, true);

        if (callback && isOutside) {
            callback();
        }
    }, [callback]);

    React.useEffect(() => {
        document.addEventListener('click', handleDocumentClick);

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, [nodes, handleDocumentClick]);
}