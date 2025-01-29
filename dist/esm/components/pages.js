"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageProgressBar = void 0;
const react_1 = __importDefault(require("react"));
const nprogress_1 = __importDefault(require("nprogress"));
const router_1 = __importDefault(require("next/router"));
const PageProgressBar = ({ color: propColor, height: propHeight, showSpinner, crawl, crawlSpeed, initialPosition, easing, speed, shadow, delay = 0, template, zIndex = 1600, showAtBottom = false, }) => {
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
        const progressStarted = () => {
            clearTimeout(progressBarTimeout);
            progressBarTimeout = setTimeout(nprogress_1.default.start, delay);
        };
        const progressComplete = () => nprogress_1.default.done(true);
        router_1.default.events.on('routeChangeStart', progressStarted);
        router_1.default.events.on('routeChangeComplete', progressComplete);
        router_1.default.events.on('routeChangeError', progressComplete);
        return () => {
            router_1.default.events.off('routeChangeStart', progressStarted);
            router_1.default.events.off('routeChangeComplete', progressComplete);
            router_1.default.events.off('routeChangeError', progressComplete);
        };
    }, []);
    return styles;
};
exports.PageProgressBar = PageProgressBar;
//# sourceMappingURL=pages.js.map