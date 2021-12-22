import React from 'react';
import Popper from '../Popper';
import Fade from '../Transition/Fade';
import classNames from '../utils/classNames';

export interface TooltipProps {
    children?: React.ReactElement<any>;
    anchorEl?: string | HTMLElement | React.RefObject<HTMLElement>;
    title: React.ReactNode;
    enterDelay?: number;
    leaveDelay?: number;
    className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
    children,
    title,
    anchorEl,
    enterDelay = 0,
    leaveDelay = 0,
    className
}: TooltipProps) => {
    const [childNode, setChildNode] = React.useState<HTMLElement | undefined>(undefined);
    const [isOpen, setIsOpen] = React.useState(false);
    const [isTransitionExited, setTransitionExited] = React.useState(false);
    const mouseEnterTimer = React.useRef<number>();
    const mouseLeaveTimer = React.useRef<number>();
    const transition = true;

    const openTooltip = () => {
        setIsOpen(true);
    };

    const closeTooltip = () => {
        setIsOpen(false);
    };

    const handleFocus = (event: React.MouseEvent<HTMLElement>) => {
        if (!childNode) {
            setChildNode(event.currentTarget);
        }
    };

    const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
        clearTimeout(mouseEnterTimer.current);
        clearTimeout(mouseLeaveTimer.current);

        if (!childNode) {
            setChildNode(event.currentTarget);
        }
        mouseEnterTimer.current = setTimeout(
            () => {
                openTooltip();
            },
            enterDelay
        );
    };

    const handleMouseLeave = (event: React.MouseEvent<HTMLElement>) => {
        clearTimeout(mouseEnterTimer.current);
        clearTimeout(mouseLeaveTimer.current);

        if (!childNode) {
            setChildNode(event.currentTarget);
        }
        mouseLeaveTimer.current = setTimeout(
            () => {
                closeTooltip();
            },
            leaveDelay
        );
    };

    const handleMouseOver = (event: React.MouseEvent<HTMLElement>) => {
        clearTimeout(mouseEnterTimer.current);
        clearTimeout(mouseLeaveTimer.current);

        if (!childNode) {
            setChildNode(event.currentTarget);
        }
        mouseEnterTimer.current = setTimeout(
            () => {
                openTooltip();
            },
            enterDelay
        );
    };

    let childrenNode: React.ReactElement<any> | undefined;
    if (children) {
        const childrenProps = {
            ...children.props,
            onFocus: handleFocus,
            onMouseEnter: handleMouseEnter,
            onMouseLeave: handleMouseLeave,
            onMouseOver: handleMouseOver
        };

        childrenNode = React.cloneElement(children, childrenProps);
    }

    const handleTransitionEnter = () => {
        setTransitionExited(false);
    };

    const handleTransitionExited = () => {
        setTransitionExited(true);
    };

    const computeOpen = isOpen || (transition && !isTransitionExited);

    return (
        <>
            {childrenNode}

            <Popper
                role="tooltip"
                anchorEl={childNode}
                open={computeOpen}
                className={classNames(
                    'ui-tooltip',
                    className
                )}
                onMouseOver={handleMouseOver}
                onMouseLeave={handleMouseLeave}
            >
                <Fade
                    trigger={isOpen}
                    onEnter={handleTransitionEnter}
                    onExited={handleTransitionExited}
                >
                    <div className="ui-tooltip-content">
                        {title}
                    </div>
                </Fade>
            </Popper>

        </>
    );
};

export default Tooltip;