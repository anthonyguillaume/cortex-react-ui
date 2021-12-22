import React from 'react';
declare type Props = {
    children?: React.ReactNode;
    container?: HTMLElement | (() => HTMLElement);
};
declare const DomContainer: React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLElement>>;
export default DomContainer;
