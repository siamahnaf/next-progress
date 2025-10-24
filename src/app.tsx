'use client';
import React from 'react';
import NProgress from 'nprogress';

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

const AppProgressBar = ({
    color: propColor,
    height: propHeight,
    showSpinner,
    crawl,
    crawlSpeed,
    initialPosition,
    easing,
    speed,
    shadow,
    delay = 0,
    template,
    zIndex = 1600,
    showAtBottom = false,
    showForHashAnchor = true,
}: NextTopLoaderProps): React.JSX.Element => {
    const defaultColor = '#29d';
    const defaultHeight = 3;

    const color = propColor ?? defaultColor;
    const height = propHeight ?? defaultHeight;

    const boxShadow =
        !shadow && shadow !== undefined
            ? ''
            : shadow
                ? `box-shadow:${shadow}`
                : `box-shadow:0 0 10px ${color},0 0 5px ${color}`;

    const positionStyle = showAtBottom ? 'bottom: 0;' : 'top: 0;';
    const spinnerPositionStyle = showAtBottom ? 'bottom: 15px;' : 'top: 15px;';

    const styles = (
        <style>
            {`#nprogress{pointer-events:none}#nprogress .bar{background:${color};position:fixed;z-index:${zIndex};${positionStyle}left:0;width:100%;height:${height}px}#nprogress .peg{display:block;position:absolute;right:0;width:100px;height:100%;${boxShadow};opacity:1;-webkit-transform:rotate(3deg) translate(0px,-4px);-ms-transform:rotate(3deg) translate(0px,-4px);transform:rotate(3deg) translate(0px,-4px)}#nprogress .spinner{display:block;position:fixed;z-index:${zIndex};${spinnerPositionStyle}right:15px}#nprogress .spinner-icon{width:18px;height:18px;box-sizing:border-box;border:2px solid transparent;border-top-color:${color};border-left-color:${color};border-radius:50%;-webkit-animation:nprogress-spinner 400ms linear infinite;animation:nprogress-spinner 400ms linear infinite}.nprogress-custom-parent{overflow:hidden;position:relative}.nprogress-custom-parent #nprogress .bar,.nprogress-custom-parent #nprogress .spinner{position:absolute}@-webkit-keyframes nprogress-spinner{0%{-webkit-transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg)}}@keyframes nprogress-spinner{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}`}
        </style>
    );

    const toAbsoluteURL = (url: string): string => {
        return new URL(url, window.location.href).href;
    };

    const isHashAnchor = (currentUrl: string, newUrl: string): boolean => {
        const current = new URL(toAbsoluteURL(currentUrl));
        const next = new URL(toAbsoluteURL(newUrl));
        return current.href.split('#')[0] === next.href.split('#')[0];
    };

    const isSameHostName = (currentUrl: string, newUrl: string): boolean => {
        const current = new URL(toAbsoluteURL(currentUrl));
        const next = new URL(toAbsoluteURL(newUrl));
        return current.hostname.replace(/^www\./, '') === next.hostname.replace(/^www\./, '');
    };

    React.useEffect((): ReturnType<React.EffectCallback> => {
        let progressBarTimeout: NodeJS.Timeout
        NProgress.configure({
            showSpinner: showSpinner ?? true,
            trickle: crawl ?? true,
            trickleSpeed: crawlSpeed ?? 200,
            minimum: initialPosition ?? 0.08,
            easing: easing ?? 'ease',
            speed: speed ?? 200,
            template:
                template ??
                '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>',
        });

        function startProgressBar() {
            clearTimeout(progressBarTimeout);
            progressBarTimeout = setTimeout(NProgress.start, delay);
        }

        function stopProgressBar() {
            clearTimeout(progressBarTimeout);
            NProgress.done();
        }

        function isAnchorOfCurrentUrl(currentUrl: string, newUrl: string): boolean {
            const currentUrlObj = new URL(currentUrl);
            const newUrlObj = new URL(newUrl);
            if (
                currentUrlObj.hostname === newUrlObj.hostname &&
                currentUrlObj.pathname === newUrlObj.pathname &&
                currentUrlObj.search === newUrlObj.search
            ) {
                const currentHash = currentUrlObj.hash;
                const newHash = newUrlObj.hash;
                return (
                    currentHash !== newHash && currentUrlObj.href.replace(currentHash, '') === newUrlObj.href.replace(newHash, '')
                );
            }
            return false;
        }


        var nProgressClass: NodeListOf<HTMLHtmlElement> = document.querySelectorAll('html');

        const removeNProgressClass = (): void =>
            nProgressClass.forEach((el: Element) => el.classList.remove('nprogress-busy'));

        function findClosestAnchor(element: HTMLElement | null): HTMLAnchorElement | null {
            while (element && element.tagName.toLowerCase() !== 'a') {
                element = element.parentElement;
            }
            return element as HTMLAnchorElement;
        }

        function handleClick(event: MouseEvent): void {
            try {
                const target = event.target as HTMLElement;
                const anchor = findClosestAnchor(target);
                const newUrl = anchor?.href;
                if (newUrl) {
                    const currentUrl = window.location.href;

                    const isExternalLink = (anchor as HTMLAnchorElement).target === '_blank';

                    const isSpecialScheme = ['tel:', 'mailto:', 'sms:', 'blob:', 'download:'].some((scheme) =>
                        newUrl.startsWith(scheme)
                    );

                    const notSameHost = !isSameHostName(window.location.href, anchor.href);
                    if (notSameHost) {
                        return;
                    }

                    const isAnchorOrHashAnchor =
                        isAnchorOfCurrentUrl(currentUrl, newUrl) || isHashAnchor(window.location.href, anchor.href);
                    if (!showForHashAnchor && isAnchorOrHashAnchor) {
                        return;
                    }

                    if (
                        newUrl === currentUrl ||
                        isExternalLink ||
                        isSpecialScheme ||
                        isAnchorOrHashAnchor ||
                        event.ctrlKey ||
                        event.metaKey ||
                        event.shiftKey ||
                        event.altKey ||
                        !toAbsoluteURL(anchor.href).startsWith('http')
                    ) {
                        startProgressBar();
                        stopProgressBar();
                        removeNProgressClass();
                    } else {
                        startProgressBar();
                    }
                }
            } catch (err) {
                startProgressBar();
                stopProgressBar();
            }
        }


        ((history: History): void => {
            const pushState = history.pushState;
            history.pushState = (...args) => {
                stopProgressBar();
                removeNProgressClass();
                return pushState.apply(history, args);
            };
        })((window as Window).history);


        ((history: History): void => {
            const replaceState = history.replaceState;
            history.replaceState = (...args) => {
                stopProgressBar();
                removeNProgressClass();
                return replaceState.apply(history, args);
            };
        })((window as Window).history);

        function handlePageHide(): void {
            stopProgressBar();
            removeNProgressClass();
        }


        function handleBackAndForth(): void {
            stopProgressBar();
        }

        window.addEventListener('popstate', handleBackAndForth);
        document.addEventListener('click', handleClick);
        window.addEventListener('pagehide', handlePageHide);

        return (): void => {
            document.removeEventListener('click', handleClick);
            window.removeEventListener('pagehide', handlePageHide);
            window.removeEventListener('popstate', handleBackAndForth);
        };
    }, []);

    return styles;
};
export default AppProgressBar;