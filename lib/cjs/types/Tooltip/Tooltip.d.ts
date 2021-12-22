import React from 'react';
export interface TooltipProps {
    children?: React.ReactElement<any>;
    anchorEl?: string | HTMLElement | React.RefObject<HTMLElement>;
    title: React.ReactNode;
    enterDelay?: number;
    leaveDelay?: number;
    className?: string;
}
declare const Tooltip: React.FC<TooltipProps>;
export default Tooltip;
