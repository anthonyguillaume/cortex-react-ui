import React from 'react';
import propTypes from 'prop-types';
import classNames from '../utils/classNames';

export interface SpinnerProps {
    className?: string;
    variant: 'indeterminate' | 'determinate';
}

const Spinner: React.FC<SpinnerProps> = ({
    className,
    variant = 'indeterminate'
}: SpinnerProps) => (
    <div
        className={classNames(
            'ui-spinner',
            variant === 'indeterminate' ? 'ui-spinner-indeterminate' : null,
            className
        )}
    >
        loading...
    </div>
);

Spinner.propTypes = {
    className: propTypes.string,
    variant: propTypes.oneOf(['indeterminate', 'determinate'] as const).isRequired
};

Spinner.defaultProps = { className: undefined };

export default Spinner;