"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/tiny-invariant@1.3.3";
exports.ids = ["vendor-chunks/tiny-invariant@1.3.3"];
exports.modules = {

/***/ "(pages-dir-node)/./node_modules/.pnpm/tiny-invariant@1.3.3/node_modules/tiny-invariant/dist/tiny-invariant.cjs.js":
/*!********************************************************************************************************!*\
  !*** ./node_modules/.pnpm/tiny-invariant@1.3.3/node_modules/tiny-invariant/dist/tiny-invariant.cjs.js ***!
  \********************************************************************************************************/
/***/ ((module) => {

eval("\n\nvar isProduction = \"development\" === 'production';\nvar prefix = 'Invariant failed';\nfunction invariant(condition, message) {\n    if (condition) {\n        return;\n    }\n    if (isProduction) {\n        throw new Error(prefix);\n    }\n    var provided = typeof message === 'function' ? message() : message;\n    var value = provided ? \"\".concat(prefix, \": \").concat(provided) : prefix;\n    throw new Error(value);\n}\n\nmodule.exports = invariant;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL25vZGVfbW9kdWxlcy8ucG5wbS90aW55LWludmFyaWFudEAxLjMuMy9ub2RlX21vZHVsZXMvdGlueS1pbnZhcmlhbnQvZGlzdC90aW55LWludmFyaWFudC5janMuanMiLCJtYXBwaW5ncyI6IkFBQWE7O0FBRWIsbUJBQW1CLGFBQW9CO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSIsInNvdXJjZXMiOlsiL1VzZXJzL3ByYXZlZW5rdW1hcnNhaW5pL0RvY3VtZW50cy9zdXNocnV0YS9zdXNocnV0YS1sYW5kaW5nL25vZGVfbW9kdWxlcy8ucG5wbS90aW55LWludmFyaWFudEAxLjMuMy9ub2RlX21vZHVsZXMvdGlueS1pbnZhcmlhbnQvZGlzdC90aW55LWludmFyaWFudC5janMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaXNQcm9kdWN0aW9uID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJztcbnZhciBwcmVmaXggPSAnSW52YXJpYW50IGZhaWxlZCc7XG5mdW5jdGlvbiBpbnZhcmlhbnQoY29uZGl0aW9uLCBtZXNzYWdlKSB7XG4gICAgaWYgKGNvbmRpdGlvbikge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChpc1Byb2R1Y3Rpb24pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKHByZWZpeCk7XG4gICAgfVxuICAgIHZhciBwcm92aWRlZCA9IHR5cGVvZiBtZXNzYWdlID09PSAnZnVuY3Rpb24nID8gbWVzc2FnZSgpIDogbWVzc2FnZTtcbiAgICB2YXIgdmFsdWUgPSBwcm92aWRlZCA/IFwiXCIuY29uY2F0KHByZWZpeCwgXCI6IFwiKS5jb25jYXQocHJvdmlkZWQpIDogcHJlZml4O1xuICAgIHRocm93IG5ldyBFcnJvcih2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW52YXJpYW50O1xuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(pages-dir-node)/./node_modules/.pnpm/tiny-invariant@1.3.3/node_modules/tiny-invariant/dist/tiny-invariant.cjs.js\n");

/***/ })

};
;