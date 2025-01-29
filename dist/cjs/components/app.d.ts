import React from 'react';
export type NextTopLoaderProps = {
    color?: string;
    initialPosition?: number;
    crawlSpeed?: number;
    height?: number;
    crawl?: boolean;
    showSpinner?: boolean;
    easing?: string;
    speed?: number;
    shadow?: string | false;
    template?: string;
    zIndex?: number;
    showAtBottom?: boolean;
    showForHashAnchor?: boolean;
    delay?: number;
};
declare const AppProgressBar: ({ color: propColor, height: propHeight, showSpinner, crawl, crawlSpeed, initialPosition, easing, speed, shadow, delay, template, zIndex, showAtBottom, showForHashAnchor, }: NextTopLoaderProps) => React.JSX.Element;
export default AppProgressBar;
