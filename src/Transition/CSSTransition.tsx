import React from 'react';
import propTypes from 'prop-types';
import classNames from '../utils/classNames';

enum TransitionState {
    Enter,
    Entering,
    Entered,
    Exit,
    Exiting,
    Exited
}

type Props = {
    trigger: boolean,
    mode: 'appear' | 'disappear',
    children?: React.ReactElement<any>;
    enterTimeout?: number;
    exitTimeout?: number;
    className?: string;
    onEnter?: () => void;
    onEntering?: () => void;
    onEntered?: () => void;
    onExit?: () => void;
    onExiting?: () => void;
    onExited?: () => void;
};

const CSSTransition = React.forwardRef<HTMLElement, Props>(({
    trigger,
    mode = 'appear',
    children,
    enterTimeout,
    exitTimeout,
    className,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited
}: Props, ref) => {
    const nodeRef = React.useRef<HTMLElement>(null);
    const timeout = React.useRef<number>();
    const [transitionState, setTransitionState] = React.useState<TransitionState>(() => {
        if (mode === 'appear') return TransitionState.Exited;
        return TransitionState.Entered;
    });

    const perfomEnter = () => {
        if (timeout.current) window.clearTimeout(timeout.current);

        nodeRef.current!.classList.remove(`${className}-exit`);
        nodeRef.current!.classList.remove(`${className}-exiting`);
        nodeRef.current!.classList.remove(`${className}-exited`);

        if (onEnter) onEnter();
        nodeRef.current!.classList.add(`${className}-enter`);

        timeout.current = window.setTimeout(() => {
            setTransitionState(() => {
                if (onEntering) onEntering();
                nodeRef.current!.classList.add(`${className}-entering`);

                return TransitionState.Entering;
            });

            timeout.current = window.setTimeout(() => {
                setTransitionState(() => {
                    if (onEntered) onEntered();
                    nodeRef.current!.classList.add(`${className}-entered`);
                    return TransitionState.Entered;
                });
            }, enterTimeout || 1000);
        }, 10);
    };

    const perfomExit = () => {
        if (timeout.current) window.clearTimeout(timeout.current);

        nodeRef.current!.classList.remove(`${className}-enter`);
        nodeRef.current!.classList.remove(`${className}-entering`);
        nodeRef.current!.classList.remove(`${className}-entered`);

        if (onExit) onExit();
        nodeRef.current!.classList.add(`${className}-exit`);

        timeout.current = window.setTimeout(() => {
            setTransitionState(() => {
                if (onExiting) onExiting();
                nodeRef.current!.classList.add(`${className}-exiting`);
                return TransitionState.Exiting;
            });

            timeout.current = window.setTimeout(() => {
                setTransitionState(() => {
                    if (onExited) onExited();
                    nodeRef.current!.classList.add(`${className}-exited`);
                    return TransitionState.Exited;
                });
            }, exitTimeout || 1000);
        });
    };

    React.useEffect(() => {
        if (trigger) {
            perfomEnter();
        }
        else {
            perfomExit();
        }
    }, [trigger]);

    const childrenNode: React.ReactElement<any> | undefined = React.useMemo(() => {
        if (!children) return undefined;

        const childrenProps = {
            ...children.props,
            className: classNames(className, children.props.className),
            ref: nodeRef
        };

        return React.cloneElement(children, childrenProps);
    }, [children, nodeRef]);

    return (
        <>
            {childrenNode}
        </>
    );
});

CSSTransition.propTypes = {};

CSSTransition.defaultProps = {};

export default CSSTransition;
