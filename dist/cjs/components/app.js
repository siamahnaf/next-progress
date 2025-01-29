'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const nprogress_1 = __importDefault(require("nprogress"));
const AppProgressBar = ({ color: propColor, height: propHeight, showSpinner, crawl, crawlSpeed, initialPosition, easing, speed, shadow, delay = 0, template, zIndex = 1600, showAtBottom = false, showForHashAnchor = true, }) => {
    const defaultColor = '#29d';
    const defaultHeight = 3;
    const color = propColor !== null && propColor !== void 0 ? propColor : defaultColor;
    const height = propHeight !== null && propHeight !== void 0 ? propHeight : defaultHeight;
    const boxShadow = !shadow && shadow !== undefined
        ? ''
        : shadow
            ? `box-shadow:${shadow}`
            : `box-shadow:0 0 10px ${color},0 0 5px ${color}`;
    const positionStyle = showAtBottom ? 'bottom: 0;' : 'top: 0;';
    const spinnerPositionStyle = showAtBottom ? 'bottom: 15px;' : 'top: 15px;';
    const styles = (react_1.default.createElement("style", null, `#nprogress{pointer-events:none}#nprogress .bar{background:${color};position:fixed;z-index:${zIndex};${positionStyle}left:0;width:100%;height:${height}px}#nprogress .peg{display:block;position:absolute;right:0;width:100px;height:100%;${boxShadow};opacity:1;-webkit-transform:rotate(3deg) translate(0px,-4px);-ms-transform:rotate(3deg) translate(0px,-4px);transform:rotate(3deg) translate(0px,-4px)}#nprogress .spinner{display:block;position:fixed;z-index:${zIndex};${spinnerPositionStyle}right:15px}#nprogress .spinner-icon{width:18px;height:18px;box-sizing:border-box;border:2px solid transparent;border-top-color:${color};border-left-color:${color};border-radius:50%;-webkit-animation:nprogress-spinner 400ms linear infinite;animation:nprogress-spinner 400ms linear infinite}.nprogress-custom-parent{overflow:hidden;position:relative}.nprogress-custom-parent #nprogress .bar,.nprogress-custom-parent #nprogress .spinner{position:absolute}@-webkit-keyframes nprogress-spinner{0%{-webkit-transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg)}}@keyframes nprogress-spinner{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}`));
    const toAbsoluteURL = (url) => {
        return new URL(url, window.location.href).href;
    };
    const isHashAnchor = (currentUrl, newUrl) => {
        const current = new URL(toAbsoluteURL(currentUrl));
        const next = new URL(toAbsoluteURL(newUrl));
        return current.href.split('#')[0] === next.href.split('#')[0];
    };
    const isSameHostName = (currentUrl, newUrl) => {
        const current = new URL(toAbsoluteURL(currentUrl));
        const next = new URL(toAbsoluteURL(newUrl));
        return current.hostname.replace(/^www\./, '') === next.hostname.replace(/^www\./, '');
    };
    react_1.default.useEffect(() => {
        let progressBarTimeout;
        nprogress_1.default.configure({
            showSpinner: showSpinner !== null && showSpinner !== void 0 ? showSpinner : true,
            trickle: crawl !== null && crawl !== void 0 ? crawl : true,
            trickleSpeed: crawlSpeed !== null && crawlSpeed !== void 0 ? crawlSpeed : 200,
            minimum: initialPosition !== null && initialPosition !== void 0 ? initialPosition : 0.08,
            easing: easing !== null && easing !== void 0 ? easing : 'ease',
            speed: speed !== null && speed !== void 0 ? speed : 200,
            template: template !== null && template !== void 0 ? template : '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>',
        });
        function startProgressBar() {
            clearTimeout(progressBarTimeout);
            progressBarTimeout = setTimeout(nprogress_1.default.start, delay);
        }
        function stopProgressBar() {
            clearTimeout(progressBarTimeout);
            nprogress_1.default.done();
        }
        function isAnchorOfCurrentUrl(currentUrl, newUrl) {
            const currentUrlObj = new URL(currentUrl);
            const newUrlObj = new URL(newUrl);
            if (currentUrlObj.hostname === newUrlObj.hostname &&
                currentUrlObj.pathname === newUrlObj.pathname &&
                currentUrlObj.search === newUrlObj.search) {
                const currentHash = currentUrlObj.hash;
                const newHash = newUrlObj.hash;
                return (currentHash !== newHash && currentUrlObj.href.replace(currentHash, '') === newUrlObj.href.replace(newHash, ''));
            }
            return false;
        }
        var nProgressClass = document.querySelectorAll('html');
        const removeNProgressClass = () => nProgressClass.forEach((el) => el.classList.remove('nprogress-busy'));
        function findClosestAnchor(element) {
            while (element && element.tagName.toLowerCase() !== 'a') {
                element = element.parentElement;
            }
            return element;
        }
        function handleClick(event) {
            try {
                const target = event.target;
                const anchor = findClosestAnchor(target);
                const newUrl = anchor === null || anchor === void 0 ? void 0 : anchor.href;
                if (newUrl) {
                    const currentUrl = window.location.href;
                    const isExternalLink = anchor.target === '_blank';
                    const isSpecialScheme = ['tel:', 'mailto:', 'sms:', 'blob:', 'download:'].some((scheme) => newUrl.startsWith(scheme));
                    const notSameHost = !isSameHostName(window.location.href, anchor.href);
                    if (notSameHost) {
                        return;
                    }
                    const isAnchorOrHashAnchor = isAnchorOfCurrentUrl(currentUrl, newUrl) || isHashAnchor(window.location.href, anchor.href);
                    if (!showForHashAnchor && isAnchorOrHashAnchor) {
                        return;
                    }
                    if (newUrl === currentUrl ||
                        isExternalLink ||
                        isSpecialScheme ||
                        isAnchorOrHashAnchor ||
                        event.ctrlKey ||
                        event.metaKey ||
                        event.shiftKey ||
                        event.altKey ||
                        !toAbsoluteURL(anchor.href).startsWith('http')) {
                        startProgressBar();
                        stopProgressBar();
                        removeNProgressClass();
                    }
                    else {
                        startProgressBar();
                    }
                }
            }
            catch (err) {
                startProgressBar();
                stopProgressBar();
            }
        }
        ((history) => {
            const pushState = history.pushState;
            history.pushState = (...args) => {
                stopProgressBar();
                removeNProgressClass();
                return pushState.apply(history, args);
            };
        })(window.history);
        ((history) => {
            const replaceState = history.replaceState;
            history.replaceState = (...args) => {
                stopProgressBar();
                removeNProgressClass();
                return replaceState.apply(history, args);
            };
        })(window.history);
        function handlePageHide() {
            stopProgressBar();
            removeNProgressClass();
        }
        function handleBackAndForth() {
            stopProgressBar();
        }
        window.addEventListener('popstate', handleBackAndForth);
        document.addEventListener('click', handleClick);
        window.addEventListener('pagehide', handlePageHide);
        return () => {
            document.removeEventListener('click', handleClick);
            window.removeEventListener('pagehide', handlePageHide);
            window.removeEventListener('popstate', handleBackAndForth);
        };
    }, []);
    return styles;
};
exports.default = AppProgressBar;
//# sourceMappingURL=app.js.map