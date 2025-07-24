/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "(pages-dir-node)/./components/Navbar.tsx":
/*!*******************************!*\
  !*** ./components/Navbar.tsx ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Navbar)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/link */ \"(pages-dir-node)/./node_modules/.pnpm/next@15.4.3_react-dom@18.3.1_react@18.3.1/node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/router */ \"(pages-dir-node)/./node_modules/.pnpm/next@15.4.3_react-dom@18.3.1_react@18.3.1/node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _barrel_optimize_names_Menu_X_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! __barrel_optimize__?names=Menu,X!=!lucide-react */ \"(pages-dir-node)/__barrel_optimize__?names=Menu,X!=!./node_modules/.pnpm/lucide-react@0.462.0_react@18.3.1/node_modules/lucide-react/dist/cjs/lucide-react.js\");\n\n\n\n\n\nfunction Navbar() {\n    const [isMenuOpen, setIsMenuOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();\n    const navigation = [\n        {\n            href: \"/\",\n            label: \"Home\"\n        },\n        {\n            href: \"/features\",\n            label: \"Features\"\n        },\n        {\n            href: \"/about\",\n            label: \"About\"\n        },\n        {\n            href: \"/contact\",\n            label: \"Contact Us\"\n        }\n    ];\n    // Close mobile menu on route change\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)({\n        \"Navbar.useEffect\": ()=>{\n            const handleRouteChange = {\n                \"Navbar.useEffect.handleRouteChange\": ()=>{\n                    setIsMenuOpen(false);\n                }\n            }[\"Navbar.useEffect.handleRouteChange\"];\n            router.events.on(\"routeChangeComplete\", handleRouteChange);\n            return ({\n                \"Navbar.useEffect\": ()=>{\n                    router.events.off(\"routeChangeComplete\", handleRouteChange);\n                }\n            })[\"Navbar.useEffect\"];\n        }\n    }[\"Navbar.useEffect\"], [\n        router.events\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"nav\", {\n        className: \"bg-white/70 backdrop-blur-md border-b border-white/20 sticky top-0 z-50\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"container\",\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"flex items-center justify-between h-16\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {\n                            href: \"/\",\n                            className: \"text-xl font-semibold text-foreground hover:text-primary transition-colors\",\n                            children: \"Sushruta Health\"\n                        }, void 0, false, {\n                            fileName: \"/Users/praveenkumarsaini/Documents/sushruta/sushruta-landing/components/Navbar.tsx\",\n                            lineNumber: 34,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"hidden md:flex items-center space-x-1\",\n                            children: navigation.map((item)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {\n                                    href: item.href,\n                                    className: `nav-link ${router.pathname === item.href ? \"active\" : \"\"}`,\n                                    children: item.label\n                                }, item.href, false, {\n                                    fileName: \"/Users/praveenkumarsaini/Documents/sushruta/sushruta-landing/components/Navbar.tsx\",\n                                    lineNumber: 41,\n                                    columnNumber: 15\n                                }, this))\n                        }, void 0, false, {\n                            fileName: \"/Users/praveenkumarsaini/Documents/sushruta/sushruta-landing/components/Navbar.tsx\",\n                            lineNumber: 39,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                            onClick: ()=>setIsMenuOpen(!isMenuOpen),\n                            className: \"md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors\",\n                            children: isMenuOpen ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Menu_X_lucide_react__WEBPACK_IMPORTED_MODULE_4__.X, {\n                                className: \"w-5 h-5\"\n                            }, void 0, false, {\n                                fileName: \"/Users/praveenkumarsaini/Documents/sushruta/sushruta-landing/components/Navbar.tsx\",\n                                lineNumber: 57,\n                                columnNumber: 15\n                            }, this) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Menu_X_lucide_react__WEBPACK_IMPORTED_MODULE_4__.Menu, {\n                                className: \"w-5 h-5\"\n                            }, void 0, false, {\n                                fileName: \"/Users/praveenkumarsaini/Documents/sushruta/sushruta-landing/components/Navbar.tsx\",\n                                lineNumber: 59,\n                                columnNumber: 15\n                            }, this)\n                        }, void 0, false, {\n                            fileName: \"/Users/praveenkumarsaini/Documents/sushruta/sushruta-landing/components/Navbar.tsx\",\n                            lineNumber: 52,\n                            columnNumber: 11\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/Users/praveenkumarsaini/Documents/sushruta/sushruta-landing/components/Navbar.tsx\",\n                    lineNumber: 32,\n                    columnNumber: 9\n                }, this),\n                isMenuOpen && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"md:hidden border-t border-white/20 bg-white/80 backdrop-blur-md\",\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"py-2 space-y-1\",\n                        children: navigation.map((item)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {\n                                href: item.href,\n                                className: `block w-full text-left px-3 py-2 text-sm font-medium transition-colors ${router.pathname === item.href ? \"text-primary bg-accent\" : \"text-muted-foreground hover:text-foreground hover:bg-accent\"}`,\n                                children: item.label\n                            }, item.href, false, {\n                                fileName: \"/Users/praveenkumarsaini/Documents/sushruta/sushruta-landing/components/Navbar.tsx\",\n                                lineNumber: 69,\n                                columnNumber: 17\n                            }, this))\n                    }, void 0, false, {\n                        fileName: \"/Users/praveenkumarsaini/Documents/sushruta/sushruta-landing/components/Navbar.tsx\",\n                        lineNumber: 67,\n                        columnNumber: 13\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"/Users/praveenkumarsaini/Documents/sushruta/sushruta-landing/components/Navbar.tsx\",\n                    lineNumber: 66,\n                    columnNumber: 11\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"/Users/praveenkumarsaini/Documents/sushruta/sushruta-landing/components/Navbar.tsx\",\n            lineNumber: 31,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/praveenkumarsaini/Documents/sushruta/sushruta-landing/components/Navbar.tsx\",\n        lineNumber: 30,\n        columnNumber: 5\n    }, this);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL2NvbXBvbmVudHMvTmF2YmFyLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUE0QztBQUNmO0FBQ1c7QUFDRDtBQUV4QixTQUFTTTtJQUN0QixNQUFNLENBQUNDLFlBQVlDLGNBQWMsR0FBR1IsK0NBQVFBLENBQUM7SUFDN0MsTUFBTVMsU0FBU04sc0RBQVNBO0lBRXhCLE1BQU1PLGFBQWE7UUFDakI7WUFBRUMsTUFBTTtZQUFLQyxPQUFPO1FBQU87UUFDM0I7WUFBRUQsTUFBTTtZQUFhQyxPQUFPO1FBQVc7UUFDdkM7WUFBRUQsTUFBTTtZQUFVQyxPQUFPO1FBQVE7UUFDakM7WUFBRUQsTUFBTTtZQUFZQyxPQUFPO1FBQWE7S0FDekM7SUFFRCxvQ0FBb0M7SUFDcENYLGdEQUFTQTs0QkFBQztZQUNSLE1BQU1ZO3NEQUFvQjtvQkFDeEJMLGNBQWM7Z0JBQ2hCOztZQUVBQyxPQUFPSyxNQUFNLENBQUNDLEVBQUUsQ0FBQyx1QkFBdUJGO1lBQ3hDO29DQUFPO29CQUNMSixPQUFPSyxNQUFNLENBQUNFLEdBQUcsQ0FBQyx1QkFBdUJIO2dCQUMzQzs7UUFDRjsyQkFBRztRQUFDSixPQUFPSyxNQUFNO0tBQUM7SUFFbEIscUJBQ0UsOERBQUNHO1FBQUlDLFdBQVU7a0JBQ2IsNEVBQUNDO1lBQUlELFdBQVU7OzhCQUNiLDhEQUFDQztvQkFBSUQsV0FBVTs7c0NBRWIsOERBQUNoQixrREFBSUE7NEJBQUNTLE1BQUs7NEJBQUlPLFdBQVU7c0NBQTZFOzs7Ozs7c0NBS3RHLDhEQUFDQzs0QkFBSUQsV0FBVTtzQ0FDWlIsV0FBV1UsR0FBRyxDQUFDLENBQUNDLHFCQUNmLDhEQUFDbkIsa0RBQUlBO29DQUVIUyxNQUFNVSxLQUFLVixJQUFJO29DQUNmTyxXQUFXLENBQUMsU0FBUyxFQUFFVCxPQUFPYSxRQUFRLEtBQUtELEtBQUtWLElBQUksR0FBRyxXQUFXLElBQUk7OENBRXJFVSxLQUFLVCxLQUFLO21DQUpOUyxLQUFLVixJQUFJOzs7Ozs7Ozs7O3NDQVVwQiw4REFBQ1k7NEJBQ0NDLFNBQVMsSUFBTWhCLGNBQWMsQ0FBQ0Q7NEJBQzlCVyxXQUFVO3NDQUVUWCwyQkFDQyw4REFBQ0YseUVBQUNBO2dDQUFDYSxXQUFVOzs7OztxREFFYiw4REFBQ2QsNEVBQUlBO2dDQUFDYyxXQUFVOzs7Ozs7Ozs7Ozs7Ozs7OztnQkFNckJYLDRCQUNDLDhEQUFDWTtvQkFBSUQsV0FBVTs4QkFDYiw0RUFBQ0M7d0JBQUlELFdBQVU7a0NBQ1pSLFdBQVdVLEdBQUcsQ0FBQyxDQUFDQyxxQkFDZiw4REFBQ25CLGtEQUFJQTtnQ0FFSFMsTUFBTVUsS0FBS1YsSUFBSTtnQ0FDZk8sV0FBVyxDQUFDLHVFQUF1RSxFQUNqRlQsT0FBT2EsUUFBUSxLQUFLRCxLQUFLVixJQUFJLEdBQ3pCLDJCQUNBLCtEQUNKOzBDQUVEVSxLQUFLVCxLQUFLOytCQVJOUyxLQUFLVixJQUFJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWlCaEMiLCJzb3VyY2VzIjpbIi9Vc2Vycy9wcmF2ZWVua3VtYXJzYWluaS9Eb2N1bWVudHMvc3VzaHJ1dGEvc3VzaHJ1dGEtbGFuZGluZy9jb21wb25lbnRzL05hdmJhci50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IExpbmsgZnJvbSBcIm5leHQvbGlua1wiO1xuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSBcIm5leHQvcm91dGVyXCI7XG5pbXBvcnQgeyBNZW51LCBYIH0gZnJvbSBcImx1Y2lkZS1yZWFjdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBOYXZiYXIoKSB7XG4gIGNvbnN0IFtpc01lbnVPcGVuLCBzZXRJc01lbnVPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XG5cbiAgY29uc3QgbmF2aWdhdGlvbiA9IFtcbiAgICB7IGhyZWY6IFwiL1wiLCBsYWJlbDogXCJIb21lXCIgfSxcbiAgICB7IGhyZWY6IFwiL2ZlYXR1cmVzXCIsIGxhYmVsOiBcIkZlYXR1cmVzXCIgfSxcbiAgICB7IGhyZWY6IFwiL2Fib3V0XCIsIGxhYmVsOiBcIkFib3V0XCIgfSxcbiAgICB7IGhyZWY6IFwiL2NvbnRhY3RcIiwgbGFiZWw6IFwiQ29udGFjdCBVc1wiIH0sXG4gIF07XG5cbiAgLy8gQ2xvc2UgbW9iaWxlIG1lbnUgb24gcm91dGUgY2hhbmdlXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgaGFuZGxlUm91dGVDaGFuZ2UgPSAoKSA9PiB7XG4gICAgICBzZXRJc01lbnVPcGVuKGZhbHNlKTtcbiAgICB9O1xuXG4gICAgcm91dGVyLmV2ZW50cy5vbihcInJvdXRlQ2hhbmdlQ29tcGxldGVcIiwgaGFuZGxlUm91dGVDaGFuZ2UpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICByb3V0ZXIuZXZlbnRzLm9mZihcInJvdXRlQ2hhbmdlQ29tcGxldGVcIiwgaGFuZGxlUm91dGVDaGFuZ2UpO1xuICAgIH07XG4gIH0sIFtyb3V0ZXIuZXZlbnRzXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8bmF2IGNsYXNzTmFtZT1cImJnLXdoaXRlLzcwIGJhY2tkcm9wLWJsdXItbWQgYm9yZGVyLWIgYm9yZGVyLXdoaXRlLzIwIHN0aWNreSB0b3AtMCB6LTUwXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBoLTE2XCI+XG4gICAgICAgICAgey8qIExvZ28gKi99XG4gICAgICAgICAgPExpbmsgaHJlZj1cIi9cIiBjbGFzc05hbWU9XCJ0ZXh0LXhsIGZvbnQtc2VtaWJvbGQgdGV4dC1mb3JlZ3JvdW5kIGhvdmVyOnRleHQtcHJpbWFyeSB0cmFuc2l0aW9uLWNvbG9yc1wiPlxuICAgICAgICAgICAgU3VzaHJ1dGEgSGVhbHRoXG4gICAgICAgICAgPC9MaW5rPlxuXG4gICAgICAgICAgey8qIERlc2t0b3AgTmF2aWdhdGlvbiAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhpZGRlbiBtZDpmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTFcIj5cbiAgICAgICAgICAgIHtuYXZpZ2F0aW9uLm1hcCgoaXRlbSkgPT4gKFxuICAgICAgICAgICAgICA8TGlua1xuICAgICAgICAgICAgICAgIGtleT17aXRlbS5ocmVmfVxuICAgICAgICAgICAgICAgIGhyZWY9e2l0ZW0uaHJlZn1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BuYXYtbGluayAke3JvdXRlci5wYXRobmFtZSA9PT0gaXRlbS5ocmVmID8gXCJhY3RpdmVcIiA6IFwiXCJ9YH1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtpdGVtLmxhYmVsfVxuICAgICAgICAgICAgICA8L0xpbms+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBNb2JpbGUgTWVudSBCdXR0b24gKi99XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0SXNNZW51T3BlbighaXNNZW51T3Blbil9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJtZDpoaWRkZW4gcC0yIHJvdW5kZWQtbWQgdGV4dC1tdXRlZC1mb3JlZ3JvdW5kIGhvdmVyOnRleHQtZm9yZWdyb3VuZCBob3ZlcjpiZy1hY2NlbnQgdHJhbnNpdGlvbi1jb2xvcnNcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtpc01lbnVPcGVuID8gKFxuICAgICAgICAgICAgICA8WCBjbGFzc05hbWU9XCJ3LTUgaC01XCIgLz5cbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDxNZW51IGNsYXNzTmFtZT1cInctNSBoLTVcIiAvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIE1vYmlsZSBOYXZpZ2F0aW9uICovfVxuICAgICAgICB7aXNNZW51T3BlbiAmJiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZDpoaWRkZW4gYm9yZGVyLXQgYm9yZGVyLXdoaXRlLzIwIGJnLXdoaXRlLzgwIGJhY2tkcm9wLWJsdXItbWRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHktMiBzcGFjZS15LTFcIj5cbiAgICAgICAgICAgICAge25hdmlnYXRpb24ubWFwKChpdGVtKSA9PiAoXG4gICAgICAgICAgICAgICAgPExpbmtcbiAgICAgICAgICAgICAgICAgIGtleT17aXRlbS5ocmVmfVxuICAgICAgICAgICAgICAgICAgaHJlZj17aXRlbS5ocmVmfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgYmxvY2sgdy1mdWxsIHRleHQtbGVmdCBweC0zIHB5LTIgdGV4dC1zbSBmb250LW1lZGl1bSB0cmFuc2l0aW9uLWNvbG9ycyAke1xuICAgICAgICAgICAgICAgICAgICByb3V0ZXIucGF0aG5hbWUgPT09IGl0ZW0uaHJlZlxuICAgICAgICAgICAgICAgICAgICAgID8gXCJ0ZXh0LXByaW1hcnkgYmctYWNjZW50XCJcbiAgICAgICAgICAgICAgICAgICAgICA6IFwidGV4dC1tdXRlZC1mb3JlZ3JvdW5kIGhvdmVyOnRleHQtZm9yZWdyb3VuZCBob3ZlcjpiZy1hY2NlbnRcIlxuICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAge2l0ZW0ubGFiZWx9XG4gICAgICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgPC9uYXY+XG4gICk7XG59XG4iXSwibmFtZXMiOlsidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJMaW5rIiwidXNlUm91dGVyIiwiTWVudSIsIlgiLCJOYXZiYXIiLCJpc01lbnVPcGVuIiwic2V0SXNNZW51T3BlbiIsInJvdXRlciIsIm5hdmlnYXRpb24iLCJocmVmIiwibGFiZWwiLCJoYW5kbGVSb3V0ZUNoYW5nZSIsImV2ZW50cyIsIm9uIiwib2ZmIiwibmF2IiwiY2xhc3NOYW1lIiwiZGl2IiwibWFwIiwiaXRlbSIsInBhdGhuYW1lIiwiYnV0dG9uIiwib25DbGljayJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(pages-dir-node)/./components/Navbar.tsx\n");

/***/ }),

/***/ "(pages-dir-node)/./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/router */ \"(pages-dir-node)/./node_modules/.pnpm/next@15.4.3_react-dom@18.3.1_react@18.3.1/node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_Navbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Navbar */ \"(pages-dir-node)/./components/Navbar.tsx\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/styles/globals.css */ \"(pages-dir-node)/./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nfunction App({ Component, pageProps }) {\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter)();\n    const showNavbar = router.pathname !== '/ChatPage';\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"flex flex-col min-h-screen\",\n        children: [\n            showNavbar && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Navbar__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {}, void 0, false, {\n                fileName: \"/Users/praveenkumarsaini/Documents/sushruta/sushruta-landing/pages/_app.tsx\",\n                lineNumber: 12,\n                columnNumber: 22\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"main\", {\n                className: \"flex-grow\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                    ...pageProps\n                }, void 0, false, {\n                    fileName: \"/Users/praveenkumarsaini/Documents/sushruta/sushruta-landing/pages/_app.tsx\",\n                    lineNumber: 14,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/praveenkumarsaini/Documents/sushruta/sushruta-landing/pages/_app.tsx\",\n                lineNumber: 13,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/praveenkumarsaini/Documents/sushruta/sushruta-landing/pages/_app.tsx\",\n        lineNumber: 11,\n        columnNumber: 5\n    }, this);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL3BhZ2VzL19hcHAudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUN3QztBQUNFO0FBQ1o7QUFFZixTQUFTRSxJQUFJLEVBQUVDLFNBQVMsRUFBRUMsU0FBUyxFQUFZO0lBQzVELE1BQU1DLFNBQVNMLHNEQUFTQTtJQUN4QixNQUFNTSxhQUFhRCxPQUFPRSxRQUFRLEtBQUs7SUFFdkMscUJBQ0UsOERBQUNDO1FBQUlDLFdBQVU7O1lBQ1pILDRCQUFjLDhEQUFDTCwwREFBTUE7Ozs7OzBCQUN0Qiw4REFBQ1M7Z0JBQUtELFdBQVU7MEJBQ2QsNEVBQUNOO29CQUFXLEdBQUdDLFNBQVM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSWhDIiwic291cmNlcyI6WyIvVXNlcnMvcHJhdmVlbmt1bWFyc2FpbmkvRG9jdW1lbnRzL3N1c2hydXRhL3N1c2hydXRhLWxhbmRpbmcvcGFnZXMvX2FwcC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBBcHBQcm9wcyB9IGZyb20gJ25leHQvYXBwJztcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gJ25leHQvcm91dGVyJztcbmltcG9ydCBOYXZiYXIgZnJvbSAnLi4vY29tcG9uZW50cy9OYXZiYXInO1xuaW1wb3J0ICdAL3N0eWxlcy9nbG9iYWxzLmNzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEFwcCh7IENvbXBvbmVudCwgcGFnZVByb3BzIH06IEFwcFByb3BzKSB7XG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xuICBjb25zdCBzaG93TmF2YmFyID0gcm91dGVyLnBhdGhuYW1lICE9PSAnL0NoYXRQYWdlJztcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBtaW4taC1zY3JlZW5cIj5cbiAgICAgIHtzaG93TmF2YmFyICYmIDxOYXZiYXIgLz59XG4gICAgICA8bWFpbiBjbGFzc05hbWU9XCJmbGV4LWdyb3dcIj5cbiAgICAgICAgPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPlxuICAgICAgPC9tYWluPlxuICAgIDwvZGl2PlxuICApO1xufVxuIl0sIm5hbWVzIjpbInVzZVJvdXRlciIsIk5hdmJhciIsIkFwcCIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyIsInJvdXRlciIsInNob3dOYXZiYXIiLCJwYXRobmFtZSIsImRpdiIsImNsYXNzTmFtZSIsIm1haW4iXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(pages-dir-node)/./pages/_app.tsx\n");

/***/ }),

/***/ "(pages-dir-node)/./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "(pages-dir-node)/__barrel_optimize__?names=Menu,X!=!./node_modules/.pnpm/lucide-react@0.462.0_react@18.3.1/node_modules/lucide-react/dist/cjs/lucide-react.js":
/*!****************************************************************************************************************************************************!*\
  !*** __barrel_optimize__?names=Menu,X!=!./node_modules/.pnpm/lucide-react@0.462.0_react@18.3.1/node_modules/lucide-react/dist/cjs/lucide-react.js ***!
  \****************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Users_praveenkumarsaini_Documents_sushruta_sushruta_landing_node_modules_pnpm_lucide_react_0_462_0_react_18_3_1_node_modules_lucide_react_dist_cjs_lucide_react_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/.pnpm/lucide-react@0.462.0_react@18.3.1/node_modules/lucide-react/dist/cjs/lucide-react.js */ "(pages-dir-node)/./node_modules/.pnpm/lucide-react@0.462.0_react@18.3.1/node_modules/lucide-react/dist/cjs/lucide-react.js");
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _Users_praveenkumarsaini_Documents_sushruta_sushruta_landing_node_modules_pnpm_lucide_react_0_462_0_react_18_3_1_node_modules_lucide_react_dist_cjs_lucide_react_js__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _Users_praveenkumarsaini_Documents_sushruta_sushruta_landing_node_modules_pnpm_lucide_react_0_462_0_react_18_3_1_node_modules_lucide_react_dist_cjs_lucide_react_js__WEBPACK_IMPORTED_MODULE_0__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);


/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-dom");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next@15.4.3_react-dom@18.3.1_react@18.3.1","vendor-chunks/@swc+helpers@0.5.15","vendor-chunks/lucide-react@0.462.0_react@18.3.1"], () => (__webpack_exec__("(pages-dir-node)/./pages/_app.tsx")));
module.exports = __webpack_exports__;

})();