import React from 'react';

declare const PopperPlacement: {
    readonly Center: "center";
    readonly BottomCenter: "bottom-center";
    readonly BottomRight: "bottom-right";
    readonly BottomLeft: "bottom-left";
    readonly TopCenter: "top-center";
    readonly TopRight: "top-right";
    readonly TopLeft: "top-left";
    readonly LeftTop: "left-top";
    readonly LeftBottom: "left-bottom";
    readonly LeftCenter: "left-center";
    readonly RightTop: "right-top";
    readonly RightBottom: "right-bottom";
    readonly RightCenter: "right-center";
};
declare type Props$1 = {
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
declare const Popper: React.ForwardRefExoticComponent<Props$1 & React.RefAttributes<HTMLElement>>;

declare type Props = {
    children?: React.ReactNode;
    container?: HTMLElement | (() => HTMLElement);
};
declare const DomContainer: React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLElement>>;

interface SpinnerProps {
    className?: string;
    variant: 'indeterminate' | 'determinate';
}
declare const Spinner: React.FC<SpinnerProps>;

interface ButtonProps {
    label: string;
}
declare const Button: React.FC<ButtonProps>;

interface TooltipProps$1 {
    children?: React.ReactElement<any>;
    anchorEl?: string | HTMLElement | React.RefObject<HTMLElement>;
    title: React.ReactNode;
    enterDelay?: number;
    leaveDelay?: number;
    className?: string;
}
declare const Tooltip: React.FC<TooltipProps$1>;

declare namespace Cortex {
    type Tag = {
        id: string;
        label: string;
    };
    type TagSuggestion = {
        id: string;
        label: string;
        group?: boolean;
        suggestions?: TagSuggestion[];
    };
}

interface TooltipProps {
    tags?: Cortex.Tag[];
    className?: string;
    suggestions?: Cortex.TagSuggestion[];
    onChange?: (tags: Cortex.Tag[]) => void;
}
declare const TagInput: React.FC<TooltipProps>;

export { Button, DomContainer, Popper, Spinner, TagInput, Tooltip };
