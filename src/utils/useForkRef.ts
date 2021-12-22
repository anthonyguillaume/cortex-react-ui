import * as React from 'react';
import setRef from './setRef';

export default function useForkRef<Instance>(
    refA: React.Ref<Instance> | null | undefined,
    refB: React.Ref<Instance> | null | undefined,
): React.Ref<Instance> | null {
    return React.useMemo(() => {
        if (refA === null && refB === null) {
            return null;
        }
        return refValue => {
            setRef(refA, refValue);
            setRef(refB, refValue);
        };
    }, [refA, refB]);
}