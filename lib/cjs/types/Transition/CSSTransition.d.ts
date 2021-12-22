import React from 'react';
declare type Props = {
    trigger: boolean;
    mode: 'appear' | 'disappear';
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
declare const CSSTransition: React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLElement>>;
export default CSSTransition;
