import React from 'react';
export interface SpinnerProps {
    className?: string;
    variant: 'indeterminate' | 'determinate';
}
declare const Spinner: React.FC<SpinnerProps>;
export default Spinner;
