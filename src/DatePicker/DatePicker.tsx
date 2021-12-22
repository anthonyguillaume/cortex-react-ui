import React from 'react';
import propTypes from 'prop-types';

type Props = {
    value?: Date;
    className?: string;
};

const DatePicker: React.FC<Props> = ({
    value,
    className
}) => {
    return (<></>);
};

DatePicker.propTypes = {
    value: propTypes.instanceOf(Date),
    className: propTypes.string
};

DatePicker.defaultProps = {
    value: undefined,
    className: undefined
};

export default DatePicker;