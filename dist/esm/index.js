"use client";
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageProgressBar = exports.useRouter = exports.AppProgressBar = void 0;
const app_hook_1 = require("./components/app-hook");
Object.defineProperty(exports, "useRouter", { enumerable: true, get: function () { return app_hook_1.useRouter; } });
const app_1 = __importDefault(require("./components/app"));
exports.AppProgressBar = app_1.default;
const pages_1 = require("./components/pages");
Object.defineProperty(exports, "PageProgressBar", { enumerable: true, get: function () { return pages_1.PageProgressBar; } });
//# sourceMappingURL=index.js.map