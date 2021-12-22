import React from 'react';
declare type Props = {
    trigger: boolean;
    children?: React.ReactElement<any>;
    onEnter?: () => void;
    onEntering?: () => void;
    onEntered?: () => void;
    onExit?: () => void;
    onExiting?: () => void;
    onExited?: () => void;
};
declare const Fade: React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLElement>>;
export default Fade;
