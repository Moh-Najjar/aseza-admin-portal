"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trimIfString = trimIfString;
exports.isProvided = isProvided;
function trimIfString({ value }) {
    return typeof value === 'string' ? value.trim() : value;
}
function isProvided(_object, value) {
    return value !== undefined;
}
//# sourceMappingURL=trim-if-string.js.map