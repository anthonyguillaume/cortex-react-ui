import React from 'react';
import propTypes from 'prop-types';
import CSSTransition from './CSSTransition';

type Props = {
    trigger: boolean,
    children?: React.ReactElement<any>;
    onEnter?: () => void;
    onEntering?: () => void;
    onEntered?: () => void;
    onExit?: () => void;
    onExiting?: () => void;
    onExited?: () => void;
};

const Fade = React.forwardRef<HTMLElement, Props>(({
    trigger,
    children,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited
}: Props, ref) => (
    <CSSTransition
        ref={ref}
        trigger={trigger}
        mode="appear"
        className="ui-fade"
        enterTimeout={160}
        exitTimeout={160}
        onEnter={onEnter}
        onExit={onExit}
        onEntering={onEntering}
        onEntered={onEntered}
        onExiting={onExiting}
        onExited={onExited}
    >
        {children}
    </CSSTransition>
));

Fade.propTypes = {};

Fade.defaultProps = {};

export default Fade;
