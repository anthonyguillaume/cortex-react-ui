import React from 'react';
import ReactDOM from 'react-dom';
import propTypes from 'prop-types';
import setRef from '../utils/setRef';

type Props = {
    children?: React.ReactNode;
    container?: HTMLElement | (() => HTMLElement);
};

function getContainer(container: HTMLElement | (() => HTMLElement)) {
    return typeof container === 'function' ? container() : container;
}

const DomContainer = React.forwardRef<HTMLElement, Props>(({
    children,
    container = document.body
}: Props, ref) => {
    // const [containerNode, setContainerNode] = React.useState<HTMLElement | null>(null);

    const containerNode = React.useMemo(() => getContainer(container) || document.body, [container]);

    // React.useEffect(() => {
    //     setContainerNode(getContainer(container) || document.body);
    // }, [container]);

    React.useEffect(() => {
        if (ref && containerNode) {
            setRef(ref, containerNode);

            return () => {
                setRef(ref, null);
            };
        }

        return undefined;
    }, [ref, containerNode]);

    return containerNode ? ReactDOM.createPortal(children, containerNode) : containerNode;
});

DomContainer.propTypes = {
    children: propTypes.node,
    container: propTypes.oneOfType([
        propTypes.instanceOf(HTMLElement),
        propTypes.func
    ])
};

DomContainer.defaultProps = {
    children: undefined,
    container: undefined
};

export default DomContainer;
