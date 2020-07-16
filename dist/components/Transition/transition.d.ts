import React from 'react';
declare type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right';
interface TransitionProps {
    animation?: AnimationName;
    classNames?: string;
    show: boolean;
}
declare const Transition: React.FC<TransitionProps>;
export default Transition;
