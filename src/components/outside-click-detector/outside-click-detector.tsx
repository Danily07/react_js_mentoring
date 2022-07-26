import React from 'react';

export interface OutsideClickDetectorProps {
    children: React.ReactNode;
    onOutsideClick: () => void;
}

const OutsideClickDetector: React.FC<OutsideClickDetectorProps> = props => {
    const { onOutsideClick } = props;
    const refObject = React.useRef<HTMLDivElement>();

    const clickHandler = React.useCallback(
        (event: PointerEvent) => {
            // original event path (before it was processed by event's target element)
            const eventPath = event.composedPath();
            const pathIncludesDetector = eventPath.includes(refObject.current);

            if (!pathIncludesDetector) {
                onOutsideClick();
            }
        },
        [onOutsideClick],
    );

    React.useEffect(() => {
        // set listener option's capture to 'false'
        // as we want to allow event's target to process event firstly
        document.addEventListener('mousedown', clickHandler, {
            capture: false,
        });

        return () => document.removeEventListener('mousedown', clickHandler);
    }, [clickHandler]);

    return <div ref={refObject}>{props.children}</div>;
};

export { OutsideClickDetector };
