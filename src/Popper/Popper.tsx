import React from 'react';
import propTypes from 'prop-types';
import DomContainer from '../DomContainer';
import setRef from '../utils/setRef';
import classNames from '../utils/classNames';

const getAnchorElement = (anchorEl: string | HTMLElement | React.RefObject<HTMLElement> | undefined): HTMLElement => {
    if (!anchorEl) return document.body;
    if (Object.prototype.toString.call(anchorEl) === '[object String]') {
        const element = document.getElementById(anchorEl as string);
        return element ?? document.body;
    }

    const ref = anchorEl as React.RefObject<HTMLElement>;
    if (ref && ref.current) return ref.current ?? document.body;

    return anchorEl as HTMLElement;
};

function getAbsoluteBoundingRect(el: HTMLElement) {
    const win = window;
    const { body } = document;

    // pageXOffset and pageYOffset work everywhere except IE <9.
    let offsetX = win.pageXOffset !== undefined ? win.pageXOffset :
        (document.documentElement || body.parentNode || body).scrollLeft;
    let offsetY = win.pageYOffset !== undefined ? win.pageYOffset :
        (document.documentElement || body.parentNode || body).scrollTop;

    const rect = el.getBoundingClientRect();

    if (el !== body) {
        let parent = el.parentNode as HTMLElement;

        while (parent !== body && parent !== null) {
            offsetX += parent.scrollLeft;
            offsetY += parent.scrollTop;
            parent = parent.parentNode as HTMLElement;
        }
    }

    return {
        bottom: rect.bottom + offsetY,
        height: rect.height,
        left: rect.left + offsetX,
        right: rect.right + offsetX,
        top: rect.top + offsetY,
        width: rect.width
    };
}

function getContentPosition(placement: string | undefined, container: HTMLElement, content: HTMLElement) {
    let left = 0;
    let top = 0;

    const containerRect = getAbsoluteBoundingRect(container);
    const contentRect = getAbsoluteBoundingRect(content);

    switch (placement) {
        case PopperPlacement.Center:
            left = containerRect.left + (containerRect.width / 2) - (contentRect.width / 2);
            top = containerRect.top + (containerRect.height / 2) - (contentRect.height / 2);
            break;
        case PopperPlacement.BottomLeft:
            left = containerRect.left;
            top = containerRect.bottom;
            break;
        case PopperPlacement.BottomRight:
            left = containerRect.left - contentRect.width + containerRect.width;
            top = containerRect.bottom;
            break;
        case PopperPlacement.BottomCenter:
            left = containerRect.left + (containerRect.width / 2) - (contentRect.width / 2);
            top = containerRect.bottom;
            break;
        case PopperPlacement.TopLeft:
            left = containerRect.left;
            top = containerRect.top - contentRect.height;
            break;
        case PopperPlacement.TopRight:
            left = containerRect.left - contentRect.width + containerRect.width;
            top = containerRect.top - contentRect.height;
            break;
        case PopperPlacement.TopCenter:
            left = containerRect.left + (containerRect.width / 2) - (contentRect.width / 2);
            top = containerRect.top - contentRect.height;
            break;
        case PopperPlacement.LeftTop:
            left = containerRect.left - contentRect.width;
            top = containerRect.top;
            break;
        case PopperPlacement.LeftBottom:
            left = containerRect.left - contentRect.width;
            top = containerRect.bottom - contentRect.height;
            break;
        case PopperPlacement.LeftCenter:
            left = containerRect.left - contentRect.width;
            top = containerRect.top + (containerRect.height / 2) - (contentRect.height / 2);
            break;
        case PopperPlacement.RightTop:
            left = containerRect.right;
            top = containerRect.top;
            break;
        case PopperPlacement.RightBottom:
            left = containerRect.right;
            top = containerRect.bottom - contentRect.height;
            break;
        case PopperPlacement.RightCenter:
            left = containerRect.right;
            top = containerRect.top + (containerRect.height / 2) - (contentRect.height / 2);
            break;
    }

    return { left, top };
}

export const PopperPlacement = {
    Center: 'center',
    BottomCenter: 'bottom-center',
    BottomRight: 'bottom-right',
    BottomLeft: 'bottom-left',
    TopCenter: 'top-center',
    TopRight: 'top-right',
    TopLeft: 'top-left',
    LeftTop: 'left-top',
    LeftBottom: 'left-bottom',
    LeftCenter: 'left-center',
    RightTop: 'right-top',
    RightBottom: 'right-bottom',
    RightCenter: 'right-center'
} as const;

type Props = {
    anchorEl?: string | HTMLElement | React.RefObject<HTMLElement>;
    placement?: ObjectValues<typeof PopperPlacement>;
    open?: boolean;
    role?: string;
    children?: React.ReactNode;
    className?: string;
    onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
    onMouseMove?: React.MouseEventHandler<HTMLDivElement>;
    onMouseOut?: React.MouseEventHandler<HTMLDivElement>;
    onMouseOver?: React.MouseEventHandler<HTMLDivElement>;
};

const Popper = React.forwardRef<HTMLElement, Props>(({
    anchorEl,
    placement,
    open = false,
    role,
    children,
    className,
    ...other
}: Props, ref) => {
    const popperRef = React.useRef<HTMLDivElement | null>(null);
    const containerRef = React.useRef(null);
    const [anchorNode, setAnchorNode] = React.useState<HTMLElement | null>(null);
    const [popperStyle, setPopperStyle] = React.useState<React.CSSProperties>({
        position: 'absolute',
        margin: '0',
        inset: '0px auto auto 0px',
        transform: 'translate3d(0px, 0px, 0px)',
        opacity: 0
    });

    React.useEffect(() => {
        setAnchorNode(getAnchorElement(anchorEl));
    }, [anchorEl]);

    React.useEffect(() => {
        if (ref && popperRef) {
            setRef(ref, popperRef.current);

            return () => {
                setRef(ref, null);
            };
        }

        return undefined;
    }, [ref, popperRef.current]);

    React.useEffect(() => {
        if (open && popperRef.current && anchorNode) {
            const { left, top } = getContentPosition(placement, anchorNode, popperRef.current!);

            setPopperStyle({
                position: 'absolute',
                margin: '0',
                inset: '0px auto auto 0px',
                transform: `translate3d(${left}px, ${top}px, 0px)`,
                opacity: 1
            });
        }
    }, [popperRef, anchorNode, open, placement]);

    if (open !== true) return null;

    return (
        <DomContainer ref={containerRef}>
            <div
                ref={el => {
                    popperRef.current = el;
                }}
                style={popperStyle}
                role={role}
                className={classNames(
                    'ui-popper',
                    className
                )}
                {...other}
            >
                {children}
            </div>
        </DomContainer>
    );
});

Popper.propTypes = {
    anchorEl: propTypes.oneOfType([
        propTypes.string.isRequired,
        propTypes.instanceOf(HTMLElement).isRequired,
        propTypes.shape({ current: propTypes.instanceOf(HTMLElement).isRequired }).isRequired
    ]),
    placement: propTypes.oneOf(Object.values(PopperPlacement)),
    open: propTypes.bool,
    role: propTypes.string,
    children: propTypes.node
};

Popper.defaultProps = {
    anchorEl: undefined,
    placement: PopperPlacement.BottomLeft,
    open: false,
    role: undefined,
    children: undefined
};

export default Popper;
