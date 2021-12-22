export default function setRef<T>(
    ref: React.MutableRefObject<T | null> | ((instance: T | null) => void) | null | undefined,
    value: T | null,
): void {
    if (!ref) return;

    if (typeof ref === 'function') {
        ref(value);
    }
    else {
        ref.current = value;
    }
}