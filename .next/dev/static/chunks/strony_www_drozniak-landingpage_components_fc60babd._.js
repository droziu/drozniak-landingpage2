(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/strony_www/drozniak-landingpage/components/AlertModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AlertModal",
    ()=>AlertModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const AlertModal = ({ isOpen, title, message, buttonText = 'OK', onClose, type = 'info' })=>{
    if (!isOpen) return null;
    const typeStyles = {
        success: {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: "w-8 h-8 text-green-400",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                }, void 0, false, {
                    fileName: "[project]/strony_www/drozniak-landingpage/components/AlertModal.tsx",
                    lineNumber: 26,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/AlertModal.tsx",
                lineNumber: 25,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            border: 'border-green-500/50',
            bg: 'bg-green-500/10'
        },
        error: {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: "w-8 h-8 text-red-400",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                }, void 0, false, {
                    fileName: "[project]/strony_www/drozniak-landingpage/components/AlertModal.tsx",
                    lineNumber: 35,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/AlertModal.tsx",
                lineNumber: 34,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            border: 'border-red-500/50',
            bg: 'bg-red-500/10'
        },
        info: {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: "w-8 h-8 text-blue-400",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                }, void 0, false, {
                    fileName: "[project]/strony_www/drozniak-landingpage/components/AlertModal.tsx",
                    lineNumber: 44,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/AlertModal.tsx",
                lineNumber: 43,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            border: 'border-blue-500/50',
            bg: 'bg-blue-500/10'
        },
        warning: {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: "w-8 h-8 text-yellow-400",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                }, void 0, false, {
                    fileName: "[project]/strony_www/drozniak-landingpage/components/AlertModal.tsx",
                    lineNumber: 53,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/AlertModal.tsx",
                lineNumber: 52,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            border: 'border-yellow-500/50',
            bg: 'bg-yellow-500/10'
        }
    };
    const styles = typeStyles[type];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-black/70 backdrop-blur-sm",
                onClick: onClose
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/AlertModal.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `relative bg-gradient-to-br from-[#18232F] to-[#101820] rounded-2xl border-2 ${styles.border} shadow-2xl max-w-md w-full p-6 md:p-8 transform transition-all`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start gap-4 mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-shrink-0",
                                children: styles.icon
                            }, void 0, false, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/AlertModal.tsx",
                                lineNumber: 74,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-[Montserrat] text-2xl font-bold text-white mb-2",
                                        children: title
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/AlertModal.tsx",
                                        lineNumber: 78,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-300 leading-relaxed",
                                        children: message
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/AlertModal.tsx",
                                        lineNumber: 81,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/AlertModal.tsx",
                                lineNumber: 77,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/AlertModal.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-end",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "px-6 py-3 bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] font-[Montserrat] font-bold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#fee715]/40",
                            children: buttonText
                        }, void 0, false, {
                            fileName: "[project]/strony_www/drozniak-landingpage/components/AlertModal.tsx",
                            lineNumber: 88,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/AlertModal.tsx",
                        lineNumber: 87,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/AlertModal.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/strony_www/drozniak-landingpage/components/AlertModal.tsx",
        lineNumber: 64,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = AlertModal;
var _c;
__turbopack_context__.k.register(_c, "AlertModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/strony_www/drozniak-landingpage/components/CustomSelect.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CustomSelect",
    ()=>CustomSelect
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
const CustomSelect = ({ value, onChange, options, placeholder = 'Wybierz opcję', className = '', size = 'default' })=>{
    _s();
    const isSm = size === 'sm';
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [dropdownStyle, setDropdownStyle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const selectRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const buttonRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const dropdownRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const selectedOption = options.find((opt)=>opt.value === value);
    // Oblicz pozycję dropdowna gdy jest otwarty (używamy fixed positioning, żeby był nad wszystkimi elementami)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CustomSelect.useEffect": ()=>{
            if (!isOpen || !buttonRef.current || !dropdownRef.current) return;
            const updatePosition = {
                "CustomSelect.useEffect.updatePosition": ()=>{
                    const buttonRect = buttonRef.current?.getBoundingClientRect();
                    const dropdownRect = dropdownRef.current?.getBoundingClientRect();
                    if (!buttonRect || !dropdownRect) return;
                    const margin = 8;
                    const minLeft = 12;
                    const maxLeft = window.innerWidth - dropdownRect.width - 12;
                    // Domyślnie pod przyciskiem
                    let top = buttonRect.bottom + margin;
                    // Jeśli brakuje miejsca na dole, pokaż nad przyciskiem
                    if (top + dropdownRect.height > window.innerHeight - 12) {
                        top = buttonRect.top - dropdownRect.height - margin;
                    }
                    // Clamp do viewportu
                    top = Math.max(12, Math.min(top, window.innerHeight - dropdownRect.height - 12));
                    let left = buttonRect.left;
                    left = Math.max(minLeft, Math.min(left, maxLeft));
                    setDropdownStyle({
                        position: 'fixed',
                        zIndex: 99999,
                        top: `${top}px`,
                        left: `${left}px`,
                        width: `${buttonRect.width}px`
                    });
                }
            }["CustomSelect.useEffect.updatePosition"];
            // Po pierwszym renderze dropdowna złap jego wymiary
            const raf = requestAnimationFrame(updatePosition);
            window.addEventListener('scroll', updatePosition, true);
            window.addEventListener('resize', updatePosition);
            return ({
                "CustomSelect.useEffect": ()=>{
                    cancelAnimationFrame(raf);
                    window.removeEventListener('scroll', updatePosition, true);
                    window.removeEventListener('resize', updatePosition);
                }
            })["CustomSelect.useEffect"];
        }
    }["CustomSelect.useEffect"], [
        isOpen
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CustomSelect.useEffect": ()=>{
            const handleClickOutside = {
                "CustomSelect.useEffect.handleClickOutside": (event)=>{
                    if (selectRef.current && !selectRef.current.contains(event.target)) {
                        setIsOpen(false);
                    }
                }
            }["CustomSelect.useEffect.handleClickOutside"];
            if (isOpen) {
                document.addEventListener('mousedown', handleClickOutside);
            }
            return ({
                "CustomSelect.useEffect": ()=>{
                    document.removeEventListener('mousedown', handleClickOutside);
                }
            })["CustomSelect.useEffect"];
        }
    }["CustomSelect.useEffect"], [
        isOpen
    ]);
    const handleSelect = (optionValue)=>{
        onChange(optionValue);
        setIsOpen(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: selectRef,
        className: `relative ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                ref: buttonRef,
                type: "button",
                onClick: ()=>setIsOpen(!isOpen),
                className: `w-full bg-white/[0.04] border text-white focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 transition-all flex items-center justify-between ${isOpen ? 'border-[#fee715]/50' : 'border-white/10 hover:border-white/20'} ${isSm ? 'px-3 py-1.5 rounded text-sm' : 'px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#fee715]/50'}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: selectedOption ? 'text-white' : 'text-gray-400',
                        children: selectedOption ? selectedOption.label : placeholder
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/CustomSelect.tsx",
                        lineNumber: 111,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: `text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} ${isSm ? 'w-4 h-4' : 'w-5 h-5'}`,
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M19 9l-7 7-7-7"
                        }, void 0, false, {
                            fileName: "[project]/strony_www/drozniak-landingpage/components/CustomSelect.tsx",
                            lineNumber: 120,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/CustomSelect.tsx",
                        lineNumber: 114,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/CustomSelect.tsx",
                lineNumber: 103,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: dropdownRef,
                style: dropdownStyle,
                className: `bg-[#101820] border border-white/15 overflow-hidden ${isSm ? 'rounded shadow-lg' : 'rounded-lg shadow-xl'}`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-h-48 overflow-y-auto",
                    children: options.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>handleSelect(option.value),
                            className: `w-full text-left transition-colors ${value === option.value ? 'bg-[#fee715]/10 text-[#fee715]' : 'text-gray-300 hover:bg-white/5 hover:text-white'} ${isSm ? 'px-3 py-2 text-sm' : 'px-4 py-3'}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: option.label
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/CustomSelect.tsx",
                                        lineNumber: 143,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    value === option.value && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: `text-[#fee715] flex-shrink-0 ${isSm ? 'w-4 h-4' : 'w-5 h-5'}`,
                                        fill: "currentColor",
                                        viewBox: "0 0 20 20",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            fillRule: "evenodd",
                                            d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
                                            clipRule: "evenodd"
                                        }, void 0, false, {
                                            fileName: "[project]/strony_www/drozniak-landingpage/components/CustomSelect.tsx",
                                            lineNumber: 146,
                                            columnNumber: 23
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/CustomSelect.tsx",
                                        lineNumber: 145,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/CustomSelect.tsx",
                                lineNumber: 142,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0))
                        }, option.value, false, {
                            fileName: "[project]/strony_www/drozniak-landingpage/components/CustomSelect.tsx",
                            lineNumber: 132,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0)))
                }, void 0, false, {
                    fileName: "[project]/strony_www/drozniak-landingpage/components/CustomSelect.tsx",
                    lineNumber: 130,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/CustomSelect.tsx",
                lineNumber: 125,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/strony_www/drozniak-landingpage/components/CustomSelect.tsx",
        lineNumber: 102,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(CustomSelect, "JDRjCEyhW2R1PnS2PAlM0+LLzYw=");
_c = CustomSelect;
var _c;
__turbopack_context__.k.register(_c, "CustomSelect");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/strony_www/drozniak-landingpage/components/IconPicker.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IconPicker",
    ()=>IconPicker
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$MegaphoneSimple$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MegaphoneSimple$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/MegaphoneSimple.esm.js [app-client] (ecmascript) <export default as MegaphoneSimple>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$MagnifyingGlass$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MagnifyingGlass$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/MagnifyingGlass.esm.js [app-client] (ecmascript) <export default as MagnifyingGlass>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Envelope$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Envelope$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Envelope.esm.js [app-client] (ecmascript) <export default as Envelope>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$DeviceMobile$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DeviceMobile$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/DeviceMobile.esm.js [app-client] (ecmascript) <export default as DeviceMobile>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Globe$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Globe.esm.js [app-client] (ecmascript) <export default as Globe>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$FileText$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/FileText.esm.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$CreditCard$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/CreditCard.esm.js [app-client] (ecmascript) <export default as CreditCard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$CheckCircle$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/CheckCircle.esm.js [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Notebook$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Notebook$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Notebook.esm.js [app-client] (ecmascript) <export default as Notebook>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$PresentationChart$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PresentationChart$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/PresentationChart.esm.js [app-client] (ecmascript) <export default as PresentationChart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$ChatCircle$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChatCircle$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/ChatCircle.esm.js [app-client] (ecmascript) <export default as ChatCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Phone$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Phone.esm.js [app-client] (ecmascript) <export default as Phone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Gear$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gear$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Gear.esm.js [app-client] (ecmascript) <export default as Gear>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Money$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Money$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Money.esm.js [app-client] (ecmascript) <export default as Money>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Wallet$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Wallet.esm.js [app-client] (ecmascript) <export default as Wallet>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$ShoppingCart$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/ShoppingCart.esm.js [app-client] (ecmascript) <export default as ShoppingCart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Tag$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Tag.esm.js [app-client] (ecmascript) <export default as Tag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$CurrencyDollar$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CurrencyDollar$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/CurrencyDollar.esm.js [app-client] (ecmascript) <export default as CurrencyDollar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Storefront$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Storefront$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Storefront.esm.js [app-client] (ecmascript) <export default as Storefront>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$TrendUp$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendUp$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/TrendUp.esm.js [app-client] (ecmascript) <export default as TrendUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$TrendDown$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendDown$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/TrendDown.esm.js [app-client] (ecmascript) <export default as TrendDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$ChartLine$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChartLine$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/ChartLine.esm.js [app-client] (ecmascript) <export default as ChartLine>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Users$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Users.esm.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$User$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/User.esm.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Calendar$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Calendar.esm.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Clock$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Clock.esm.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$PaperPlaneTilt$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PaperPlaneTilt$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/PaperPlaneTilt.esm.js [app-client] (ecmascript) <export default as PaperPlaneTilt>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$VideoCamera$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__VideoCamera$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/VideoCamera.esm.js [app-client] (ecmascript) <export default as VideoCamera>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Camera$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Camera.esm.js [app-client] (ecmascript) <export default as Camera>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Image$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Image.esm.js [app-client] (ecmascript) <export default as Image>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Link$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Link$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Link.esm.js [app-client] (ecmascript) <export default as Link>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Share$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Share$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Share.esm.js [app-client] (ecmascript) <export default as Share>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Heart$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Heart.esm.js [app-client] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Star$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Star.esm.js [app-client] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Bell$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Bell.esm.js [app-client] (ecmascript) <export default as Bell>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Warning$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Warning$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Warning.esm.js [app-client] (ecmascript) <export default as Warning>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Info$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Info.esm.js [app-client] (ecmascript) <export default as Info>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Question$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Question$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Question.esm.js [app-client] (ecmascript) <export default as Question>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Check$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Check.esm.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$X$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/X.esm.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Plus$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Plus.esm.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Minus$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Minus.esm.js [app-client] (ecmascript) <export default as Minus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$ArrowRight$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/ArrowRight.esm.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$ArrowLeft$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/ArrowLeft.esm.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$ArrowUp$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUp$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/ArrowUp.esm.js [app-client] (ecmascript) <export default as ArrowUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$ArrowDown$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDown$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/ArrowDown.esm.js [app-client] (ecmascript) <export default as ArrowDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Download$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Download.esm.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Upload$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Upload.esm.js [app-client] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Eye$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Eye.esm.js [app-client] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$EyeSlash$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeSlash$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/EyeSlash.esm.js [app-client] (ecmascript) <export default as EyeSlash>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Lock$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Lock.esm.js [app-client] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$LockOpen$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LockOpen$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/LockOpen.esm.js [app-client] (ecmascript) <export default as LockOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Key$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Key$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Key.esm.js [app-client] (ecmascript) <export default as Key>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Shield$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Shield.esm.js [app-client] (ecmascript) <export default as Shield>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Trash$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Trash.esm.js [app-client] (ecmascript) <export default as Trash>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Pencil$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Pencil.esm.js [app-client] (ecmascript) <export default as Pencil>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Copy$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Copy.esm.js [app-client] (ecmascript) <export default as Copy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Clipboard$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clipboard$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Clipboard.esm.js [app-client] (ecmascript) <export default as Clipboard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Folder$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Folder$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Folder.esm.js [app-client] (ecmascript) <export default as Folder>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Database$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Database$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Database.esm.js [app-client] (ecmascript) <export default as Database>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Cloud$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Cloud$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Cloud.esm.js [app-client] (ecmascript) <export default as Cloud>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$WifiHigh$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__WifiHigh$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/WifiHigh.esm.js [app-client] (ecmascript) <export default as WifiHigh>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Broadcast$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Broadcast$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Broadcast.esm.js [app-client] (ecmascript) <export default as Broadcast>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$simple$2d$icons$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/simple-icons/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
// Funkcja renderująca Simple Icons logotypy marek (monochromatyczne)
const renderSimpleIcon = (slug, size = 24, className = '')=>{
    try {
        const iconKey = `si${slug.charAt(0).toUpperCase() + slug.slice(1)}`;
        const icon = __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$simple$2d$icons$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[iconKey];
        if (!icon || !icon.path) return null;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            role: "img",
            viewBox: "0 0 24 24",
            width: size,
            height: size,
            className: className,
            fill: "currentColor",
            xmlns: "http://www.w3.org/2000/svg",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: icon.path
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/IconPicker.tsx",
                lineNumber: 92,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/strony_www/drozniak-landingpage/components/IconPicker.tsx",
            lineNumber: 83,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    } catch (e) {
        return null;
    }
};
// Popularne ikony (często używane w marketingu)
const popularIcons = [
    // Simple Icons - logotypy marek (prefiks simple:)
    {
        name: 'simple:facebook',
        label: 'Facebook',
        icon: null,
        isSimpleIcon: true,
        slug: 'facebook'
    },
    {
        name: 'simple:google',
        label: 'Google',
        icon: null,
        isSimpleIcon: true,
        slug: 'google'
    },
    {
        name: 'simple:instagram',
        label: 'Instagram',
        icon: null,
        isSimpleIcon: true,
        slug: 'instagram'
    },
    // Phosphor Icons - narzędzia
    {
        name: 'MegaphoneSimple',
        label: 'Megafon',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$MegaphoneSimple$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MegaphoneSimple$3e$__["MegaphoneSimple"],
        isSimpleIcon: false
    },
    {
        name: 'MagnifyingGlass',
        label: 'Lupa',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$MagnifyingGlass$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MagnifyingGlass$3e$__["MagnifyingGlass"],
        isSimpleIcon: false
    },
    {
        name: 'Envelope',
        label: 'Email',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Envelope$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Envelope$3e$__["Envelope"],
        isSimpleIcon: false
    },
    {
        name: 'DeviceMobile',
        label: 'Telefon',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$DeviceMobile$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DeviceMobile$3e$__["DeviceMobile"],
        isSimpleIcon: false
    },
    {
        name: 'Globe',
        label: 'Globus',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Globe$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"],
        isSimpleIcon: false
    },
    {
        name: 'FileText',
        label: 'Dokument',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$FileText$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"],
        isSimpleIcon: false
    },
    {
        name: 'CreditCard',
        label: 'Karta',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$CreditCard$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__["CreditCard"],
        isSimpleIcon: false
    },
    {
        name: 'CheckCircle',
        label: 'Zaznacz',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$CheckCircle$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"],
        isSimpleIcon: false
    },
    {
        name: 'Notebook',
        label: 'Notatnik',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Notebook$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Notebook$3e$__["Notebook"],
        isSimpleIcon: false
    },
    {
        name: 'PresentationChart',
        label: 'Wykres',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$PresentationChart$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PresentationChart$3e$__["PresentationChart"],
        isSimpleIcon: false
    },
    {
        name: 'ChatCircle',
        label: 'Chat',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$ChatCircle$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChatCircle$3e$__["ChatCircle"],
        isSimpleIcon: false
    },
    {
        name: 'Phone',
        label: 'Telefon',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Phone$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"],
        isSimpleIcon: false
    },
    {
        name: 'Money',
        label: 'Pieniądze',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Money$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Money$3e$__["Money"],
        isSimpleIcon: false
    },
    {
        name: 'Wallet',
        label: 'Portfel',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Wallet$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"],
        isSimpleIcon: false
    },
    {
        name: 'ShoppingCart',
        label: 'Koszyk',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$ShoppingCart$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__["ShoppingCart"],
        isSimpleIcon: false
    },
    {
        name: 'Tag',
        label: 'Tag',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Tag$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"],
        isSimpleIcon: false
    },
    {
        name: 'CurrencyDollar',
        label: 'Dolar',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$CurrencyDollar$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CurrencyDollar$3e$__["CurrencyDollar"],
        isSimpleIcon: false
    },
    {
        name: 'Storefront',
        label: 'Sklep',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Storefront$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Storefront$3e$__["Storefront"],
        isSimpleIcon: false
    },
    {
        name: 'TrendUp',
        label: 'Wzrost',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$TrendUp$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendUp$3e$__["TrendUp"],
        isSimpleIcon: false
    },
    {
        name: 'ChartLine',
        label: 'Wykres liniowy',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$ChartLine$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChartLine$3e$__["ChartLine"],
        isSimpleIcon: false
    },
    {
        name: 'Users',
        label: 'Użytkownicy',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Users$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"],
        isSimpleIcon: false
    },
    {
        name: 'User',
        label: 'Użytkownik',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$User$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"],
        isSimpleIcon: false
    },
    {
        name: 'Calendar',
        label: 'Kalendarz',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Calendar$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"],
        isSimpleIcon: false
    },
    {
        name: 'Clock',
        label: 'Zegar',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Clock$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"],
        isSimpleIcon: false
    },
    {
        name: 'PaperPlaneTilt',
        label: 'Wiadomość',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$PaperPlaneTilt$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PaperPlaneTilt$3e$__["PaperPlaneTilt"],
        isSimpleIcon: false
    },
    {
        name: 'VideoCamera',
        label: 'Wideo',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$VideoCamera$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__VideoCamera$3e$__["VideoCamera"],
        isSimpleIcon: false
    },
    {
        name: 'Camera',
        label: 'Aparat',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Camera$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__["Camera"],
        isSimpleIcon: false
    },
    {
        name: 'Image',
        label: 'Obraz',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Image$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"],
        isSimpleIcon: false
    },
    {
        name: 'Link',
        label: 'Link',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Link$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Link$3e$__["Link"],
        isSimpleIcon: false
    },
    {
        name: 'Share',
        label: 'Udostępnij',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Share$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Share$3e$__["Share"],
        isSimpleIcon: false
    },
    {
        name: 'Heart',
        label: 'Serce',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Heart$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"],
        isSimpleIcon: false
    },
    {
        name: 'Star',
        label: 'Gwiazda',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Star$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"],
        isSimpleIcon: false
    },
    {
        name: 'Bell',
        label: 'Dzwonek',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Bell$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"],
        isSimpleIcon: false
    },
    {
        name: 'Gear',
        label: 'Ustawienia',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Gear$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gear$3e$__["Gear"],
        isSimpleIcon: false
    }
];
// Pełna lista wszystkich dostępnych ikon
const allIcons = [
    // Simple Icons - logotypy marek (prefiks simple:)
    {
        name: 'simple:facebook',
        label: 'Facebook',
        icon: null,
        isSimpleIcon: true,
        slug: 'facebook'
    },
    {
        name: 'simple:google',
        label: 'Google',
        icon: null,
        isSimpleIcon: true,
        slug: 'google'
    },
    {
        name: 'simple:instagram',
        label: 'Instagram',
        icon: null,
        isSimpleIcon: true,
        slug: 'instagram'
    },
    // Phosphor Icons - narzędzia
    {
        name: 'MegaphoneSimple',
        label: 'Megafon',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$MegaphoneSimple$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MegaphoneSimple$3e$__["MegaphoneSimple"],
        isSimpleIcon: false
    },
    {
        name: 'MagnifyingGlass',
        label: 'Lupa',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$MagnifyingGlass$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MagnifyingGlass$3e$__["MagnifyingGlass"],
        isSimpleIcon: false
    },
    {
        name: 'Envelope',
        label: 'Email',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Envelope$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Envelope$3e$__["Envelope"],
        isSimpleIcon: false
    },
    {
        name: 'DeviceMobile',
        label: 'Telefon',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$DeviceMobile$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DeviceMobile$3e$__["DeviceMobile"],
        isSimpleIcon: false
    },
    {
        name: 'Globe',
        label: 'Globus',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Globe$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"],
        isSimpleIcon: false
    },
    {
        name: 'FileText',
        label: 'Dokument',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$FileText$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"],
        isSimpleIcon: false
    },
    {
        name: 'CreditCard',
        label: 'Karta',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$CreditCard$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__["CreditCard"],
        isSimpleIcon: false
    },
    {
        name: 'CheckCircle',
        label: 'Zaznacz',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$CheckCircle$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"],
        isSimpleIcon: false
    },
    {
        name: 'Notebook',
        label: 'Notatnik',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Notebook$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Notebook$3e$__["Notebook"],
        isSimpleIcon: false
    },
    {
        name: 'PresentationChart',
        label: 'Wykres',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$PresentationChart$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PresentationChart$3e$__["PresentationChart"],
        isSimpleIcon: false
    },
    {
        name: 'ChatCircle',
        label: 'Chat',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$ChatCircle$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChatCircle$3e$__["ChatCircle"],
        isSimpleIcon: false
    },
    {
        name: 'Phone',
        label: 'Telefon',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Phone$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"],
        isSimpleIcon: false
    },
    {
        name: 'Money',
        label: 'Pieniądze',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Money$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Money$3e$__["Money"],
        isSimpleIcon: false
    },
    {
        name: 'Wallet',
        label: 'Portfel',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Wallet$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"],
        isSimpleIcon: false
    },
    {
        name: 'ShoppingCart',
        label: 'Koszyk',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$ShoppingCart$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__["ShoppingCart"],
        isSimpleIcon: false
    },
    {
        name: 'Tag',
        label: 'Tag',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Tag$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"],
        isSimpleIcon: false
    },
    {
        name: 'CurrencyDollar',
        label: 'Dolar',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$CurrencyDollar$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CurrencyDollar$3e$__["CurrencyDollar"],
        isSimpleIcon: false
    },
    {
        name: 'Storefront',
        label: 'Sklep',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Storefront$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Storefront$3e$__["Storefront"],
        isSimpleIcon: false
    },
    {
        name: 'TrendUp',
        label: 'Wzrost',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$TrendUp$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendUp$3e$__["TrendUp"],
        isSimpleIcon: false
    },
    {
        name: 'TrendDown',
        label: 'Spadek',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$TrendDown$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendDown$3e$__["TrendDown"],
        isSimpleIcon: false
    },
    {
        name: 'ChartLine',
        label: 'Wykres liniowy',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$ChartLine$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChartLine$3e$__["ChartLine"],
        isSimpleIcon: false
    },
    {
        name: 'Users',
        label: 'Użytkownicy',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Users$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"],
        isSimpleIcon: false
    },
    {
        name: 'User',
        label: 'Użytkownik',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$User$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"],
        isSimpleIcon: false
    },
    {
        name: 'Calendar',
        label: 'Kalendarz',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Calendar$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"],
        isSimpleIcon: false
    },
    {
        name: 'Clock',
        label: 'Zegar',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Clock$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"],
        isSimpleIcon: false
    },
    {
        name: 'PaperPlaneTilt',
        label: 'Wiadomość',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$PaperPlaneTilt$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PaperPlaneTilt$3e$__["PaperPlaneTilt"],
        isSimpleIcon: false
    },
    {
        name: 'VideoCamera',
        label: 'Wideo',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$VideoCamera$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__VideoCamera$3e$__["VideoCamera"],
        isSimpleIcon: false
    },
    {
        name: 'Camera',
        label: 'Aparat',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Camera$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__["Camera"],
        isSimpleIcon: false
    },
    {
        name: 'Image',
        label: 'Obraz',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Image$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"],
        isSimpleIcon: false
    },
    {
        name: 'Link',
        label: 'Link',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Link$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Link$3e$__["Link"],
        isSimpleIcon: false
    },
    {
        name: 'Share',
        label: 'Udostępnij',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Share$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Share$3e$__["Share"],
        isSimpleIcon: false
    },
    {
        name: 'Heart',
        label: 'Serce',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Heart$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"],
        isSimpleIcon: false
    },
    {
        name: 'Star',
        label: 'Gwiazda',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Star$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"],
        isSimpleIcon: false
    },
    {
        name: 'Bell',
        label: 'Dzwonek',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Bell$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"],
        isSimpleIcon: false
    },
    {
        name: 'Warning',
        label: 'Ostrzeżenie',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Warning$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Warning$3e$__["Warning"],
        isSimpleIcon: false
    },
    {
        name: 'Info',
        label: 'Informacja',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Info$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"],
        isSimpleIcon: false
    },
    {
        name: 'Question',
        label: 'Pytanie',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Question$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Question$3e$__["Question"],
        isSimpleIcon: false
    },
    {
        name: 'Check',
        label: 'Zaznacz',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Check$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"],
        isSimpleIcon: false
    },
    {
        name: 'X',
        label: 'Zamknij',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$X$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"],
        isSimpleIcon: false
    },
    {
        name: 'Plus',
        label: 'Dodaj',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Plus$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"],
        isSimpleIcon: false
    },
    {
        name: 'Minus',
        label: 'Usuń',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Minus$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__["Minus"],
        isSimpleIcon: false
    },
    {
        name: 'ArrowRight',
        label: 'Strzałka w prawo',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$ArrowRight$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"],
        isSimpleIcon: false
    },
    {
        name: 'ArrowLeft',
        label: 'Strzałka w lewo',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$ArrowLeft$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"],
        isSimpleIcon: false
    },
    {
        name: 'ArrowUp',
        label: 'Strzałka w górę',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$ArrowUp$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUp$3e$__["ArrowUp"],
        isSimpleIcon: false
    },
    {
        name: 'ArrowDown',
        label: 'Strzałka w dół',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$ArrowDown$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDown$3e$__["ArrowDown"],
        isSimpleIcon: false
    },
    {
        name: 'Download',
        label: 'Pobierz',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Download$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"],
        isSimpleIcon: false
    },
    {
        name: 'Upload',
        label: 'Wyślij',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Upload$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"],
        isSimpleIcon: false
    },
    {
        name: 'Eye',
        label: 'Widok',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Eye$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"],
        isSimpleIcon: false
    },
    {
        name: 'EyeSlash',
        label: 'Ukryj',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$EyeSlash$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeSlash$3e$__["EyeSlash"],
        isSimpleIcon: false
    },
    {
        name: 'Lock',
        label: 'Zablokuj',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Lock$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"],
        isSimpleIcon: false
    },
    {
        name: 'LockOpen',
        label: 'Odblokuj',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$LockOpen$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LockOpen$3e$__["LockOpen"],
        isSimpleIcon: false
    },
    {
        name: 'Key',
        label: 'Klucz',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Key$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Key$3e$__["Key"],
        isSimpleIcon: false
    },
    {
        name: 'Shield',
        label: 'Tarcza',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Shield$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"],
        isSimpleIcon: false
    },
    {
        name: 'Trash',
        label: 'Kosz',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Trash$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash$3e$__["Trash"],
        isSimpleIcon: false
    },
    {
        name: 'Pencil',
        label: 'Ołówek',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Pencil$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__["Pencil"],
        isSimpleIcon: false
    },
    {
        name: 'Copy',
        label: 'Kopiuj',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Copy$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"],
        isSimpleIcon: false
    },
    {
        name: 'Clipboard',
        label: 'Schowek',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Clipboard$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clipboard$3e$__["Clipboard"],
        isSimpleIcon: false
    },
    {
        name: 'Folder',
        label: 'Folder',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Folder$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Folder$3e$__["Folder"],
        isSimpleIcon: false
    },
    {
        name: 'Database',
        label: 'Baza danych',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Database$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Database$3e$__["Database"],
        isSimpleIcon: false
    },
    {
        name: 'Cloud',
        label: 'Chmura',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Cloud$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Cloud$3e$__["Cloud"],
        isSimpleIcon: false
    },
    {
        name: 'WifiHigh',
        label: 'WiFi',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$WifiHigh$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__WifiHigh$3e$__["WifiHigh"],
        isSimpleIcon: false
    },
    {
        name: 'Broadcast',
        label: 'Nadawanie',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Broadcast$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Broadcast$3e$__["Broadcast"],
        isSimpleIcon: false
    },
    {
        name: 'Gear',
        label: 'Ustawienia',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Gear$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gear$3e$__["Gear"],
        isSimpleIcon: false
    }
];
// Mapowanie starych emotikonów na nazwy ikon Phosphor (jak w FunnelBuilder)
const iconEmojiMap = {
    '📢': 'MegaphoneSimple',
    '🔍': 'MagnifyingGlass',
    '📧': 'Envelope',
    '📱': 'DeviceMobile',
    '⚙️': 'Gear',
    '🌐': 'Globe',
    '📄': 'FileText',
    '💳': 'CreditCard',
    '✅': 'CheckCircle',
    '📝': 'Notebook',
    '📊': 'PresentationChart',
    '💬': 'ChatCircle',
    '📞': 'Phone'
};
const IconPicker = ({ value, onChange, className = '' })=>{
    _s();
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showFullList, setShowFullList] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const pickerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "IconPicker.useEffect": ()=>{
            const handleClickOutside = {
                "IconPicker.useEffect.handleClickOutside": (event)=>{
                    if (pickerRef.current && !pickerRef.current.contains(event.target)) {
                        setIsOpen(false);
                        setShowFullList(false);
                        setSearchQuery('');
                    }
                }
            }["IconPicker.useEffect.handleClickOutside"];
            if (isOpen) {
                document.addEventListener('mousedown', handleClickOutside);
            }
            return ({
                "IconPicker.useEffect": ()=>{
                    document.removeEventListener('mousedown', handleClickOutside);
                }
            })["IconPicker.useEffect"];
        }
    }["IconPicker.useEffect"], [
        isOpen
    ]);
    // Mapuj emotikony na nazwy ikon Phosphor
    const mappedValue = iconEmojiMap[value] || value;
    const selectedIcon = allIcons.find((icon)=>icon.name === mappedValue || icon.name === value) || popularIcons.find((icon)=>icon.name === mappedValue || icon.name === value);
    // Renderuj ikonę - Simple Icons lub Phosphor Icons
    const renderIcon = ()=>{
        if (selectedIcon?.isSimpleIcon && selectedIcon.slug) {
            return renderSimpleIcon(selectedIcon.slug, 18, 'text-white');
        }
        if (value && value.startsWith('simple:')) {
            const slug = value.replace('simple:', '');
            return renderSimpleIcon(slug, 18, 'text-white');
        }
        const IconComponent = selectedIcon?.icon || __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$FileText$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"];
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconComponent, {
            size: 18,
            weight: "regular",
            className: "text-white"
        }, void 0, false, {
            fileName: "[project]/strony_www/drozniak-landingpage/components/IconPicker.tsx",
            lineNumber: 271,
            columnNumber: 12
        }, ("TURBOPACK compile-time value", void 0));
    };
    // Etykieta - pokaż label ikony lub "Wybierz ikonę" jeśli nie mamy value
    const displayLabel = selectedIcon?.label || (value && value.startsWith('simple:') ? value.replace('simple:', '').charAt(0).toUpperCase() + value.replace('simple:', '').slice(1) : value ? mappedValue : 'Wybierz ikonę');
    const iconsToShow = showFullList ? allIcons : popularIcons;
    const filteredIcons = searchQuery ? iconsToShow.filter((icon)=>icon.name.toLowerCase().includes(searchQuery.toLowerCase()) || icon.label.toLowerCase().includes(searchQuery.toLowerCase())) : iconsToShow;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: pickerRef,
        className: `relative ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>setIsOpen(!isOpen),
                className: "w-full bg-white/[0.04] border border-white/10 rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30 hover:border-white/20 transition-colors flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            renderIcon(),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-white",
                                children: displayLabel
                            }, void 0, false, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/IconPicker.tsx",
                                lineNumber: 294,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/IconPicker.tsx",
                        lineNumber: 292,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: `text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} w-4 h-4`,
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M19 9l-7 7-7-7"
                        }, void 0, false, {
                            fileName: "[project]/strony_www/drozniak-landingpage/components/IconPicker.tsx",
                            lineNumber: 302,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/IconPicker.tsx",
                        lineNumber: 296,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/IconPicker.tsx",
                lineNumber: 287,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute z-50 w-full bg-[#101820] border border-white/15 mt-2 rounded-lg shadow-xl max-h-96 overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-3 border-b border-white/10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "text",
                            value: searchQuery,
                            onChange: (e)=>setSearchQuery(e.target.value),
                            placeholder: "Szukaj ikony...",
                            className: "w-full bg-white/[0.04] border border-white/10 rounded px-3 py-1.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30",
                            autoFocus: true
                        }, void 0, false, {
                            fileName: "[project]/strony_www/drozniak-landingpage/components/IconPicker.tsx",
                            lineNumber: 310,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/IconPicker.tsx",
                        lineNumber: 309,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-h-64 overflow-y-auto p-3",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-4 gap-2",
                            children: filteredIcons.map((iconItem)=>{
                                const isSelected = value === iconItem.name;
                                const renderIconItem = ()=>{
                                    if (iconItem.isSimpleIcon && iconItem.slug) {
                                        return renderSimpleIcon(iconItem.slug, 20, '');
                                    }
                                    const Icon = iconItem.icon || __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$FileText$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"];
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                        size: 20,
                                        weight: "regular",
                                        className: "mx-auto"
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/IconPicker.tsx",
                                        lineNumber: 330,
                                        columnNumber: 26
                                    }, ("TURBOPACK compile-time value", void 0));
                                };
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>{
                                        onChange(iconItem.name);
                                        setIsOpen(false);
                                        setSearchQuery('');
                                    },
                                    className: `p-2 rounded-lg border transition-all ${isSelected ? 'bg-[#fee715]/10 border-[#fee715]/50 text-[#fee715]' : 'bg-white/[0.02] border-white/10 text-white/70 hover:bg-white/5 hover:border-white/20 hover:text-white'}`,
                                    title: iconItem.label,
                                    children: renderIconItem()
                                }, iconItem.name, false, {
                                    fileName: "[project]/strony_www/drozniak-landingpage/components/IconPicker.tsx",
                                    lineNumber: 333,
                                    columnNumber: 19
                                }, ("TURBOPACK compile-time value", void 0));
                            })
                        }, void 0, false, {
                            fileName: "[project]/strony_www/drozniak-landingpage/components/IconPicker.tsx",
                            lineNumber: 322,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/IconPicker.tsx",
                        lineNumber: 321,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-3 border-t border-white/10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>{
                                setShowFullList(!showFullList);
                                setSearchQuery('');
                            },
                            className: "w-full px-3 py-2 bg-white/[0.04] border border-white/10 rounded text-sm text-white/70 hover:bg-white/5 hover:text-white transition-colors",
                            children: showFullList ? 'Pokaż tylko popularne' : 'Pokaż pełną listę'
                        }, void 0, false, {
                            fileName: "[project]/strony_www/drozniak-landingpage/components/IconPicker.tsx",
                            lineNumber: 357,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/IconPicker.tsx",
                        lineNumber: 356,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/IconPicker.tsx",
                lineNumber: 307,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/strony_www/drozniak-landingpage/components/IconPicker.tsx",
        lineNumber: 286,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(IconPicker, "Ld009AHlXhTRnXxDp3qigiT6OfQ=");
_c = IconPicker;
var _c;
__turbopack_context__.k.register(_c, "IconPicker");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/strony_www/drozniak-landingpage/components/CommentPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CommentPanel",
    ()=>CommentPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$ChatCircle$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChatCircle$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/ChatCircle.esm.js [app-client] (ecmascript) <export default as ChatCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Question$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Question$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Question.esm.js [app-client] (ecmascript) <export default as Question>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$CheckSquare$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckSquare$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/CheckSquare.esm.js [app-client] (ecmascript) <export default as CheckSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$CrosshairSimple$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CrosshairSimple$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/CrosshairSimple.esm.js [app-client] (ecmascript) <export default as CrosshairSimple>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$X$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/X.esm.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$MagnifyingGlass$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MagnifyingGlass$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/MagnifyingGlass.esm.js [app-client] (ecmascript) <export default as MagnifyingGlass>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$CheckCircle$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/CheckCircle.esm.js [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$XCircle$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/XCircle.esm.js [app-client] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Clock$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Clock.esm.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$ShieldCheck$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/ShieldCheck.esm.js [app-client] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$ChatCircleDots$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChatCircleDots$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/ChatCircleDots.esm.js [app-client] (ecmascript) <export default as ChatCircleDots>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/lib/supabase-client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$CustomSelect$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/components/CustomSelect.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
const CommentPanel = ({ funnelId, isOpen, onClose, onJumpToAnchor, onThreadClick, refreshTrigger })=>{
    _s();
    const [threads, setThreads] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [statusFilter, setStatusFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all');
    const [typeFilter, setTypeFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all');
    const [showClosed, setShowClosed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const loadThreads = async ()=>{
        if (!funnelId) return;
        setLoading(true);
        try {
            // Załaduj wątki z anchorami i ostatnią wiadomością
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('comment_threads').select(`
          id,
          thread_type,
          status,
          priority,
          assigned_to,
          due_date,
          created_by,
          created_at,
          updated_at,
          comment_anchors (
            anchor_type,
            anchor_id,
            region_x,
            region_y,
            region_width,
            region_height
          ),
          comment_messages (
            id,
            content,
            created_at
          )
        `).eq('funnel_id', funnelId).order('updated_at', {
                ascending: false
            });
            if (error) throw error;
            // Przetwórz dane do formatu CommentThread
            const processedThreads = (data || []).map((thread)=>{
                // Supabase może zwrócić comment_anchors jako obiekt (gdy jest jeden) lub tablicę (gdy jest wiele)
                const anchors = thread.comment_anchors;
                const anchor = Array.isArray(anchors) ? anchors[0] : anchors;
                const messages = thread.comment_messages || [];
                const lastMessage = messages.length > 0 ? messages.sort((a, b)=>new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0] : null;
                return {
                    id: thread.id,
                    thread_type: thread.thread_type,
                    status: thread.status,
                    priority: thread.priority,
                    assigned_to: thread.assigned_to,
                    due_date: thread.due_date,
                    created_by: thread.created_by,
                    created_at: thread.created_at,
                    updated_at: thread.updated_at,
                    anchor_type: anchor?.anchor_type || 'node',
                    anchor_id: anchor?.anchor_id || null,
                    anchor_label: anchor?.anchor_id || 'Region',
                    last_message: lastMessage?.content,
                    last_message_at: lastMessage?.created_at,
                    message_count: messages.length
                };
            });
            setThreads(processedThreads);
        } catch (error) {
            console.error('Błąd ładowania wątków:', error);
        } finally{
            setLoading(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CommentPanel.useEffect": ()=>{
            if (isOpen && funnelId) {
                loadThreads();
            }
        }
    }["CommentPanel.useEffect"], [
        isOpen,
        funnelId,
        refreshTrigger
    ]);
    const getThreadIcon = (type)=>{
        switch(type){
            case 'Pytanie':
                return __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Question$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Question$3e$__["Question"];
            case 'Zadanie':
                return __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$CheckSquare$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckSquare$3e$__["CheckSquare"];
            default:
                return __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$ChatCircle$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChatCircle$3e$__["ChatCircle"];
        }
    };
    const getStatusIcon = (status)=>{
        switch(status){
            case 'Zatwierdzone':
                return __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$CheckCircle$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"];
            case 'Odrzucone':
                return __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$XCircle$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"];
            case 'W toku':
                return __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Clock$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"];
            case 'Do akceptacji':
                return __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$ShieldCheck$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"];
            default:
                return __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$ChatCircle$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChatCircle$3e$__["ChatCircle"];
        }
    };
    const getStatusColor = (status)=>{
        switch(status){
            case 'Otwarte':
                return 'text-red-400';
            case 'W toku':
                return 'text-blue-400';
            case 'Do akceptacji':
                return 'text-amber-400';
            case 'Zatwierdzone':
                return 'text-green-400';
            case 'Odrzucone':
                return 'text-gray-400';
            default:
                return 'text-white';
        }
    };
    const filteredThreads = threads.filter((thread)=>{
        // Filtry
        if (!showClosed && (thread.status === 'Zatwierdzone' || thread.status === 'Odrzucone')) {
            return false;
        }
        if (statusFilter !== 'all' && thread.status !== statusFilter) {
            return false;
        }
        if (typeFilter !== 'all' && thread.thread_type !== typeFilter) {
            return false;
        }
        // Wyszukiwarka
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            return thread.anchor_label?.toLowerCase().includes(query) || thread.last_message?.toLowerCase().includes(query) || thread.thread_type.toLowerCase().includes(query);
        }
        return true;
    });
    if (!isOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed right-0 top-0 h-full w-96 bg-[#0a0f14] border-l border-white/10 z-50 flex flex-col shadow-2xl",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 border-b border-white/10 flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$ChatCircleDots$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChatCircleDots$3e$__["ChatCircleDots"], {
                                size: 20,
                                className: "text-[#fee715]"
                            }, void 0, false, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/CommentPanel.tsx",
                                lineNumber: 199,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-lg font-semibold text-white",
                                children: "Komentarze"
                            }, void 0, false, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/CommentPanel.tsx",
                                lineNumber: 200,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/CommentPanel.tsx",
                        lineNumber: 198,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onClose,
                        className: "p-1.5 hover:bg-white/5 rounded transition-colors",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$X$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                            size: 18,
                            className: "text-white/70"
                        }, void 0, false, {
                            fileName: "[project]/strony_www/drozniak-landingpage/components/CommentPanel.tsx",
                            lineNumber: 206,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/CommentPanel.tsx",
                        lineNumber: 202,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/CommentPanel.tsx",
                lineNumber: 197,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 border-b border-white/10 space-y-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$MagnifyingGlass$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MagnifyingGlass$3e$__["MagnifyingGlass"], {
                                size: 16,
                                className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            }, void 0, false, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/CommentPanel.tsx",
                                lineNumber: 213,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                value: searchQuery,
                                onChange: (e)=>setSearchQuery(e.target.value),
                                placeholder: "Szukaj...",
                                className: "w-full bg-white/[0.04] border border-white/10 rounded px-3 pl-9 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30"
                            }, void 0, false, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/CommentPanel.tsx",
                                lineNumber: 214,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/CommentPanel.tsx",
                        lineNumber: 212,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$CustomSelect$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CustomSelect"], {
                                size: "sm",
                                value: statusFilter,
                                onChange: setStatusFilter,
                                options: [
                                    {
                                        value: 'all',
                                        label: 'Wszystkie statusy'
                                    },
                                    {
                                        value: 'Otwarte',
                                        label: 'Otwarte'
                                    },
                                    {
                                        value: 'W toku',
                                        label: 'W toku'
                                    },
                                    {
                                        value: 'Do akceptacji',
                                        label: 'Do akceptacji'
                                    },
                                    {
                                        value: 'Zatwierdzone',
                                        label: 'Zatwierdzone'
                                    },
                                    {
                                        value: 'Odrzucone',
                                        label: 'Odrzucone'
                                    }
                                ],
                                className: "w-full"
                            }, void 0, false, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/CommentPanel.tsx",
                                lineNumber: 223,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$CustomSelect$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CustomSelect"], {
                                size: "sm",
                                value: typeFilter,
                                onChange: setTypeFilter,
                                options: [
                                    {
                                        value: 'all',
                                        label: 'Wszystkie typy'
                                    },
                                    {
                                        value: 'Komentarz',
                                        label: 'Komentarz'
                                    },
                                    {
                                        value: 'Pytanie',
                                        label: 'Pytanie'
                                    },
                                    {
                                        value: 'Zadanie',
                                        label: 'Zadanie'
                                    }
                                ],
                                className: "w-full"
                            }, void 0, false, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/CommentPanel.tsx",
                                lineNumber: 237,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/CommentPanel.tsx",
                        lineNumber: 222,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "flex items-center gap-2 text-xs text-gray-400 cursor-pointer",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "checkbox",
                                checked: showClosed,
                                onChange: (e)=>setShowClosed(e.target.checked),
                                className: "w-4 h-4 rounded bg-white/[0.04] border-white/10 text-[#fee715] focus:ring-[#fee715]/40"
                            }, void 0, false, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/CommentPanel.tsx",
                                lineNumber: 251,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            "Pokaż zamknięte"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/CommentPanel.tsx",
                        lineNumber: 250,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/CommentPanel.tsx",
                lineNumber: 211,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-y-auto p-4 space-y-2",
                children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center text-gray-400 py-8",
                    children: "Ładowanie..."
                }, void 0, false, {
                    fileName: "[project]/strony_www/drozniak-landingpage/components/CommentPanel.tsx",
                    lineNumber: 264,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)) : filteredThreads.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center text-gray-400 py-8",
                    children: searchQuery || statusFilter !== 'all' || typeFilter !== 'all' ? 'Brak wyników' : 'Brak wątków'
                }, void 0, false, {
                    fileName: "[project]/strony_www/drozniak-landingpage/components/CommentPanel.tsx",
                    lineNumber: 266,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)) : filteredThreads.map((thread)=>{
                    const ThreadIcon = getThreadIcon(thread.thread_type);
                    const StatusIcon = getStatusIcon(thread.status);
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        onClick: ()=>{
                            onThreadClick?.(thread.id);
                            if (thread.anchor_type === 'region') {
                                // TODO: Przekaż współrzędne regionu
                                onJumpToAnchor('region');
                            } else {
                                onJumpToAnchor(thread.anchor_type, thread.anchor_id || undefined);
                            }
                        },
                        className: "p-3 bg-white/[0.02] border border-white/10 rounded-lg hover:bg-white/5 hover:border-white/20 cursor-pointer transition-all",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-start gap-2 mb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ThreadIcon, {
                                        size: 16,
                                        className: "text-[#fee715] mt-0.5"
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/CommentPanel.tsx",
                                        lineNumber: 291,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2 mb-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs font-medium text-white",
                                                        children: thread.thread_type
                                                    }, void 0, false, {
                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/CommentPanel.tsx",
                                                        lineNumber: 294,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatusIcon, {
                                                        size: 12,
                                                        className: getStatusColor(thread.status)
                                                    }, void 0, false, {
                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/CommentPanel.tsx",
                                                        lineNumber: 295,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `text-xs ${getStatusColor(thread.status)}`,
                                                        children: thread.status
                                                    }, void 0, false, {
                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/CommentPanel.tsx",
                                                        lineNumber: 296,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/CommentPanel.tsx",
                                                lineNumber: 293,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-gray-400 line-clamp-1",
                                                children: thread.anchor_label || 'Nieznany element'
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/CommentPanel.tsx",
                                                lineNumber: 298,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/CommentPanel.tsx",
                                        lineNumber: 292,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/CommentPanel.tsx",
                                lineNumber: 290,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            thread.last_message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-gray-500 line-clamp-2 mt-1",
                                children: thread.last_message
                            }, void 0, false, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/CommentPanel.tsx",
                                lineNumber: 304,
                                columnNumber: 19
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mt-2 pt-2 border-t border-white/5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] text-gray-500",
                                        children: [
                                            thread.message_count,
                                            " ",
                                            thread.message_count === 1 ? 'wiadomość' : 'wiadomości'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/CommentPanel.tsx",
                                        lineNumber: 309,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: (e)=>{
                                            e.stopPropagation();
                                            onJumpToAnchor(thread.anchor_type, thread.anchor_id || undefined);
                                        },
                                        className: "text-[10px] text-[#fee715] hover:underline flex items-center gap-1",
                                        title: "Przejdź do miejsca na mapie",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$CrosshairSimple$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CrosshairSimple$3e$__["CrosshairSimple"], {
                                                size: 12
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/CommentPanel.tsx",
                                                lineNumber: 320,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            "Przejdź"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/CommentPanel.tsx",
                                        lineNumber: 312,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/CommentPanel.tsx",
                                lineNumber: 308,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, thread.id, true, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/CommentPanel.tsx",
                        lineNumber: 277,
                        columnNumber: 15
                    }, ("TURBOPACK compile-time value", void 0));
                })
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/CommentPanel.tsx",
                lineNumber: 262,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/strony_www/drozniak-landingpage/components/CommentPanel.tsx",
        lineNumber: 195,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(CommentPanel, "WGHEDBgmBO8zRn7i5EApk/PmBak=");
_c = CommentPanel;
var _c;
__turbopack_context__.k.register(_c, "CommentPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/strony_www/drozniak-landingpage/components/CommentThread.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CommentThread",
    ()=>CommentThread
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Question$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Question$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Question.esm.js [app-client] (ecmascript) <export default as Question>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$CheckSquare$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckSquare$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/CheckSquare.esm.js [app-client] (ecmascript) <export default as CheckSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$ChatCircle$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChatCircle$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/ChatCircle.esm.js [app-client] (ecmascript) <export default as ChatCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$X$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/X.esm.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$User$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/User.esm.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Calendar$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Calendar.esm.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$PaperPlaneTilt$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PaperPlaneTilt$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/PaperPlaneTilt.esm.js [app-client] (ecmascript) <export default as PaperPlaneTilt>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/lib/supabase-client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$app$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/app/hooks/useAuth.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$CustomSelect$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/components/CustomSelect.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
const CommentThread = ({ threadId, funnelId, onClose, onUpdate })=>{
    _s();
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$app$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const [thread, setThread] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [newMessage, setNewMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editingStatus, setEditingStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editingPriority, setEditingPriority] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editingAssigned, setEditingAssigned] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editingDueDate, setEditingDueDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const loadThread = async ()=>{
        if (!threadId) return;
        setLoading(true);
        try {
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('comment_threads').select(`
          *,
          comment_anchors (
            anchor_type,
            anchor_id,
            region_x,
            region_y,
            region_width,
            region_height
          ),
          comment_messages (
            id,
            content,
            created_by,
            created_at,
            updated_at,
            is_edited,
            edited_at
          )
        `).eq('id', threadId).single();
            if (error) throw error;
            // Supabase może zwrócić comment_anchors jako obiekt (gdy jest jeden) lub tablicę (gdy jest wiele)
            const anchors = data.comment_anchors;
            const anchor = Array.isArray(anchors) ? anchors[0] : anchors;
            const messages = data.comment_messages || [];
            // Pobierz display_name dla każdego użytkownika używając funkcji get_user_display_name
            const userIds = new Set([
                data.created_by,
                ...messages.map((m)=>m.created_by)
            ]);
            if (data.assigned_to) userIds.add(data.assigned_to);
            const userMap = new Map();
            // Pobierz display_name dla wszystkich użytkowników
            for (const uid of userIds){
                const { data: displayName } = await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].rpc('get_user_display_name', {
                    user_uuid: uid
                });
                userMap.set(uid, displayName || 'Nieznany użytkownik');
            }
            setThread({
                ...data,
                anchor_type: anchor?.anchor_type || 'node',
                anchor_id: anchor?.anchor_id || null,
                assigned_to_email: data.assigned_to ? userMap.get(data.assigned_to) : null,
                messages: messages.map((msg)=>({
                        ...msg,
                        creator_email: userMap.get(msg.created_by)
                    }))
            });
        } catch (error) {
            console.error('Błąd ładowania wątku:', error);
        } finally{
            setLoading(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CommentThread.useEffect": ()=>{
            loadThread();
        }
    }["CommentThread.useEffect"], [
        threadId
    ]);
    const sendMessage = async ()=>{
        if (!newMessage.trim() || !thread) return;
        setSaving(true);
        try {
            const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('comment_messages').insert({
                thread_id: thread.id,
                content: newMessage.trim()
            });
            if (error) throw error;
            // Aktualizuj status na "W toku" jeśli był "Otwarte"
            if (thread.status === 'Otwarte') {
                await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('comment_threads').update({
                    status: 'W toku'
                }).eq('id', thread.id);
            }
            setNewMessage('');
            await loadThread();
            onUpdate();
        } catch (error) {
            console.error('Błąd wysyłania wiadomości:', error);
        } finally{
            setSaving(false);
        }
    };
    const updateStatus = async (newStatus)=>{
        if (!thread) return;
        try {
            const updates = {
                status: newStatus
            };
            if (newStatus === 'Zatwierdzone' || newStatus === 'Odrzucone') {
                updates.closed_at = new Date().toISOString();
                updates.closed_by = user?.id;
            } else {
                updates.closed_at = null;
                updates.closed_by = null;
            }
            const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('comment_threads').update(updates).eq('id', thread.id);
            if (error) throw error;
            await loadThread();
            onUpdate();
        } catch (error) {
            console.error('Błąd aktualizacji statusu:', error);
        }
    };
    const getThreadIcon = (type)=>{
        switch(type){
            case 'Pytanie':
                return __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Question$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Question$3e$__["Question"];
            case 'Zadanie':
                return __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$CheckSquare$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckSquare$3e$__["CheckSquare"];
            default:
                return __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$ChatCircle$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChatCircle$3e$__["ChatCircle"];
        }
    };
    if (loading || !thread) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "fixed right-0 top-0 h-full w-96 bg-[#0a0f14] border-l border-white/10 z-50 flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-gray-400",
                children: "Ładowanie..."
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/CommentThread.tsx",
                lineNumber: 206,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/strony_www/drozniak-landingpage/components/CommentThread.tsx",
            lineNumber: 205,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    const ThreadIcon = getThreadIcon(thread.thread_type);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed right-0 top-0 h-full w-96 bg-[#0a0f14] border-l border-white/10 z-50 flex flex-col shadow-2xl",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 border-b border-white/10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between mb-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ThreadIcon, {
                                        size: 20,
                                        className: "text-[#fee715]"
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/CommentThread.tsx",
                                        lineNumber: 219,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-lg font-semibold text-white",
                                        children: thread.thread_type
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/CommentThread.tsx",
                                        lineNumber: 220,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/CommentThread.tsx",
                                lineNumber: 218,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onClose,
                                className: "p-1.5 hover:bg-white/5 rounded transition-colors",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$X$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    size: 18,
                                    className: "text-white/70"
                                }, void 0, false, {
                                    fileName: "[project]/strony_www/drozniak-landingpage/components/CommentThread.tsx",
                                    lineNumber: 226,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/CommentThread.tsx",
                                lineNumber: 222,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/CommentThread.tsx",
                        lineNumber: 217,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-xs font-medium text-gray-400 mb-1",
                                        children: "Status"
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/CommentThread.tsx",
                                        lineNumber: 233,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$CustomSelect$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CustomSelect"], {
                                        size: "sm",
                                        value: thread.status,
                                        onChange: (value)=>updateStatus(value),
                                        options: [
                                            {
                                                value: 'Otwarte',
                                                label: 'Otwarte'
                                            },
                                            {
                                                value: 'W toku',
                                                label: 'W toku'
                                            },
                                            {
                                                value: 'Do akceptacji',
                                                label: 'Do akceptacji'
                                            },
                                            {
                                                value: 'Zatwierdzone',
                                                label: 'Zatwierdzone'
                                            },
                                            {
                                                value: 'Odrzucone',
                                                label: 'Odrzucone'
                                            }
                                        ],
                                        className: "w-full"
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/CommentThread.tsx",
                                        lineNumber: 234,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/CommentThread.tsx",
                                lineNumber: 232,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            thread.thread_type === 'Zadanie' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-xs font-medium text-gray-400 mb-1",
                                                children: "Priorytet"
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/CommentThread.tsx",
                                                lineNumber: 253,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$CustomSelect$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CustomSelect"], {
                                                size: "sm",
                                                value: thread.priority || 'Średni',
                                                onChange: async (value)=>{
                                                    await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('comment_threads').update({
                                                        priority: value
                                                    }).eq('id', thread.id);
                                                    await loadThread();
                                                    onUpdate();
                                                },
                                                options: [
                                                    {
                                                        value: 'Niski',
                                                        label: 'Niski'
                                                    },
                                                    {
                                                        value: 'Średni',
                                                        label: 'Średni'
                                                    },
                                                    {
                                                        value: 'Wysoki',
                                                        label: 'Wysoki'
                                                    }
                                                ],
                                                className: "w-full"
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/CommentThread.tsx",
                                                lineNumber: 254,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/CommentThread.tsx",
                                        lineNumber: 252,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    thread.due_date && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-gray-400 flex items-center gap-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Calendar$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                size: 12
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/CommentThread.tsx",
                                                lineNumber: 275,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            "Termin: ",
                                            new Date(thread.due_date).toLocaleDateString('pl-PL')
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/CommentThread.tsx",
                                        lineNumber: 274,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    thread.assigned_to_email && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-gray-400 flex items-center gap-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$User$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                size: 12
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/CommentThread.tsx",
                                                lineNumber: 281,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            "Przypisane do: ",
                                            thread.assigned_to_email
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/CommentThread.tsx",
                                        lineNumber: 280,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/CommentThread.tsx",
                        lineNumber: 231,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/CommentThread.tsx",
                lineNumber: 216,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-y-auto p-4 space-y-3",
                children: thread.messages.map((message)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white/[0.02] border border-white/10 rounded p-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 mb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-medium text-white",
                                        children: message.creator_email || 'Nieznany użytkownik'
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/CommentThread.tsx",
                                        lineNumber: 295,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] text-gray-500",
                                        children: new Date(message.created_at).toLocaleString('pl-PL')
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/CommentThread.tsx",
                                        lineNumber: 298,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    message.is_edited && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] text-gray-500 italic",
                                        children: "(edytowane)"
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/CommentThread.tsx",
                                        lineNumber: 302,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/CommentThread.tsx",
                                lineNumber: 294,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm text-gray-300 whitespace-pre-wrap",
                                children: message.content
                            }, void 0, false, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/CommentThread.tsx",
                                lineNumber: 305,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, message.id, true, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/CommentThread.tsx",
                        lineNumber: 293,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/CommentThread.tsx",
                lineNumber: 291,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 border-t border-white/10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                        value: newMessage,
                        onChange: (e)=>setNewMessage(e.target.value),
                        placeholder: "Napisz odpowiedź...",
                        className: "w-full bg-white/[0.04] border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30 min-h-[80px] resize-none",
                        onKeyDown: (e)=>{
                            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                                e.preventDefault();
                                sendMessage();
                            }
                        }
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/CommentThread.tsx",
                        lineNumber: 312,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between mt-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] text-gray-500",
                                children: "Cmd/Ctrl + Enter aby wysłać"
                            }, void 0, false, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/CommentThread.tsx",
                                lineNumber: 325,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: sendMessage,
                                disabled: !newMessage.trim() || saving,
                                className: "px-4 py-1.5 bg-[#fee715]/10 border border-[#fee715]/50 text-[#fee715] rounded text-sm font-medium hover:bg-[#fee715]/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$PaperPlaneTilt$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PaperPlaneTilt$3e$__["PaperPlaneTilt"], {
                                        size: 16
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/CommentThread.tsx",
                                        lineNumber: 331,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    "Wyślij"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/CommentThread.tsx",
                                lineNumber: 326,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/CommentThread.tsx",
                        lineNumber: 324,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/CommentThread.tsx",
                lineNumber: 311,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/strony_www/drozniak-landingpage/components/CommentThread.tsx",
        lineNumber: 214,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(CommentThread, "MUk4f6/9mrmnTTt2NSyffp3lDLw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$app$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = CommentThread;
var _c;
__turbopack_context__.k.register(_c, "CommentThread");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/strony_www/drozniak-landingpage/components/CommentBadge.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CommentBadge",
    ()=>CommentBadge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const CommentBadge = ({ count, status, onClick, tooltip })=>{
    if (count === 0) return null;
    const statusColors = {
        warning: 'bg-red-500/90 border-red-400',
        pending: 'bg-amber-500/90 border-amber-400',
        neutral: 'bg-blue-500/90 border-blue-400'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `absolute -top-2 -right-2 w-5 h-5 rounded-full ${statusColors[status]} border-2 border-[#101820] flex items-center justify-center cursor-pointer hover:scale-110 transition-transform z-20`,
        onClick: (e)=>{
            e.stopPropagation();
            onClick?.();
        },
        title: tooltip,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-[10px] font-bold text-white leading-none",
            children: count
        }, void 0, false, {
            fileName: "[project]/strony_www/drozniak-landingpage/components/CommentBadge.tsx",
            lineNumber: 29,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/strony_www/drozniak-landingpage/components/CommentBadge.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = CommentBadge;
var _c;
__turbopack_context__.k.register(_c, "CommentBadge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DatePickerField",
    ()=>DatePickerField,
    "FunnelBuilder",
    ()=>FunnelBuilder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f40$xyflow$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/@xyflow/react/dist/esm/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f40$xyflow$2f$system$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/@xyflow/system/dist/esm/index.js [app-client] (ecmascript)");
// CSS React Flow jest importowany globalnie w index.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$simple$2d$icons$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/simple-icons/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/hooks/useAuth.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/lib/supabase.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$AlertModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/components/AlertModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$LoadingState$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/components/LoadingState.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$CustomSelect$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/components/CustomSelect.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$CustomCheckbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/components/CustomCheckbox.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$IconPicker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/components/IconPicker.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$CommentPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/components/CommentPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$CommentThread$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/components/CommentThread.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$CommentForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/components/CommentForm.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$CommentBadge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/components/CommentBadge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$NISHYRIK$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/react-router/dist/development/chunk-NISHYRIK.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$MegaphoneSimple$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MegaphoneSimple$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/MegaphoneSimple.esm.js [app-client] (ecmascript) <export default as MegaphoneSimple>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$MagnifyingGlass$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MagnifyingGlass$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/MagnifyingGlass.esm.js [app-client] (ecmascript) <export default as MagnifyingGlass>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Envelope$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Envelope$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Envelope.esm.js [app-client] (ecmascript) <export default as Envelope>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$DeviceMobile$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DeviceMobile$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/DeviceMobile.esm.js [app-client] (ecmascript) <export default as DeviceMobile>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Globe$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Globe.esm.js [app-client] (ecmascript) <export default as Globe>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$FileText$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/FileText.esm.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$CreditCard$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/CreditCard.esm.js [app-client] (ecmascript) <export default as CreditCard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$CheckCircle$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/CheckCircle.esm.js [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Notebook$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Notebook$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Notebook.esm.js [app-client] (ecmascript) <export default as Notebook>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$PresentationChart$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PresentationChart$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/PresentationChart.esm.js [app-client] (ecmascript) <export default as PresentationChart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$ChatCircle$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChatCircle$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/ChatCircle.esm.js [app-client] (ecmascript) <export default as ChatCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Phone$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Phone.esm.js [app-client] (ecmascript) <export default as Phone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Gear$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gear$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Gear.esm.js [app-client] (ecmascript) <export default as Gear>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$DotsThree$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DotsThree$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/DotsThree.esm.js [app-client] (ecmascript) <export default as DotsThree>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Money$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Money$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Money.esm.js [app-client] (ecmascript) <export default as Money>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Wallet$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Wallet.esm.js [app-client] (ecmascript) <export default as Wallet>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$ShoppingCart$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/ShoppingCart.esm.js [app-client] (ecmascript) <export default as ShoppingCart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Tag$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Tag.esm.js [app-client] (ecmascript) <export default as Tag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$CurrencyDollar$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CurrencyDollar$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/CurrencyDollar.esm.js [app-client] (ecmascript) <export default as CurrencyDollar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Storefront$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Storefront$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Storefront.esm.js [app-client] (ecmascript) <export default as Storefront>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$TrendUp$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendUp$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/TrendUp.esm.js [app-client] (ecmascript) <export default as TrendUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$TrendDown$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendDown$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/TrendDown.esm.js [app-client] (ecmascript) <export default as TrendDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$ChartLine$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChartLine$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/ChartLine.esm.js [app-client] (ecmascript) <export default as ChartLine>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Users$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Users.esm.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$User$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/User.esm.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Calendar$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Calendar.esm.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Clock$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Clock.esm.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$PaperPlaneTilt$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PaperPlaneTilt$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/PaperPlaneTilt.esm.js [app-client] (ecmascript) <export default as PaperPlaneTilt>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$VideoCamera$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__VideoCamera$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/VideoCamera.esm.js [app-client] (ecmascript) <export default as VideoCamera>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Camera$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Camera.esm.js [app-client] (ecmascript) <export default as Camera>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Image$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Image.esm.js [app-client] (ecmascript) <export default as Image>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Link$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Link$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Link.esm.js [app-client] (ecmascript) <export default as Link>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Share$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Share$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Share.esm.js [app-client] (ecmascript) <export default as Share>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Heart$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Heart.esm.js [app-client] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Star$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Star.esm.js [app-client] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Bell$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Bell.esm.js [app-client] (ecmascript) <export default as Bell>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Warning$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Warning$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Warning.esm.js [app-client] (ecmascript) <export default as Warning>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Info$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Info.esm.js [app-client] (ecmascript) <export default as Info>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Question$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Question$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Question.esm.js [app-client] (ecmascript) <export default as Question>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Check$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Check.esm.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$X$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/X.esm.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Plus$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Plus.esm.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Minus$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Minus.esm.js [app-client] (ecmascript) <export default as Minus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$ArrowRight$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/ArrowRight.esm.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$ArrowLeft$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/ArrowLeft.esm.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$ArrowUp$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUp$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/ArrowUp.esm.js [app-client] (ecmascript) <export default as ArrowUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$ArrowDown$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDown$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/ArrowDown.esm.js [app-client] (ecmascript) <export default as ArrowDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Download$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Download.esm.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Upload$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Upload.esm.js [app-client] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Eye$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Eye.esm.js [app-client] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$EyeSlash$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeSlash$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/EyeSlash.esm.js [app-client] (ecmascript) <export default as EyeSlash>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Lock$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Lock.esm.js [app-client] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$LockOpen$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LockOpen$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/LockOpen.esm.js [app-client] (ecmascript) <export default as LockOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Key$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Key$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Key.esm.js [app-client] (ecmascript) <export default as Key>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Shield$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Shield.esm.js [app-client] (ecmascript) <export default as Shield>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Trash$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Trash.esm.js [app-client] (ecmascript) <export default as Trash>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Pencil$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Pencil.esm.js [app-client] (ecmascript) <export default as Pencil>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Copy$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Copy.esm.js [app-client] (ecmascript) <export default as Copy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Clipboard$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clipboard$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Clipboard.esm.js [app-client] (ecmascript) <export default as Clipboard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Folder$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Folder$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Folder.esm.js [app-client] (ecmascript) <export default as Folder>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Database$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Database$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Database.esm.js [app-client] (ecmascript) <export default as Database>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Cloud$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Cloud$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Cloud.esm.js [app-client] (ecmascript) <export default as Cloud>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$WifiHigh$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__WifiHigh$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/WifiHigh.esm.js [app-client] (ecmascript) <export default as WifiHigh>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Broadcast$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Broadcast$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Broadcast.esm.js [app-client] (ecmascript) <export default as Broadcast>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$ChatCircleDots$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChatCircleDots$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/ChatCircleDots.esm.js [app-client] (ecmascript) <export default as ChatCircleDots>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Hand$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Hand$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Hand.esm.js [app-client] (ecmascript) <export default as Hand>");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
// Kontekst trybu zaznaczania: klik = dodaj do zaznaczenia, przytrzymaj = odznacz ten element
const FunnelSelectModeContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])({
    isSelectMode: false,
    onLongPressDeselect: ()=>{}
});
// Mapowanie starych emotikonów na nazwy ikon Phosphor
const iconEmojiMap = {
    '📢': 'MegaphoneSimple',
    '🔍': 'MagnifyingGlass',
    '📧': 'Envelope',
    '📱': 'DeviceMobile',
    '⚙️': 'Gear',
    '🌐': 'Globe',
    '📄': 'FileText',
    '💳': 'CreditCard',
    '✅': 'CheckCircle',
    '📝': 'Notebook',
    '📊': 'PresentationChart',
    '💬': 'ChatCircle',
    '📞': 'Phone'
};
// Funkcja renderująca Simple Icons logotypy marek (monochromatyczne)
const renderSimpleIcon = (slug, size = 24, className = '')=>{
    try {
        const iconKey = `si${slug.charAt(0).toUpperCase() + slug.slice(1)}`;
        const icon = __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$simple$2d$icons$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[iconKey];
        if (!icon || !icon.path) return null;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            role: "img",
            viewBox: "0 0 24 24",
            width: size,
            height: size,
            className: className,
            fill: "currentColor",
            xmlns: "http://www.w3.org/2000/svg",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: icon.path
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 162,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
            lineNumber: 153,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    } catch (e) {
        return null;
    }
};
// Funkcja renderująca ikonę Phosphor na podstawie nazwy (obsługuje też stare emotikony i Simple Icons)
const renderPhosphorIcon = (iconName, size = 24, className = '')=>{
    // Jeśli ikona zaczyna się od "simple:", użyj Simple Icons
    if (iconName.startsWith('simple:')) {
        const slug = iconName.replace('simple:', '');
        return renderSimpleIcon(slug, size, className);
    }
    const iconProps = {
        size,
        weight: 'regular',
        className,
        color: 'currentColor'
    };
    // Jeśli to emotikon, zamień na nazwę ikony Phosphor
    const mappedIcon = iconEmojiMap[iconName] || iconName;
    switch(mappedIcon){
        case 'MegaphoneSimple':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$MegaphoneSimple$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MegaphoneSimple$3e$__["MegaphoneSimple"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 184,
                columnNumber: 36
            }, ("TURBOPACK compile-time value", void 0));
        case 'MagnifyingGlass':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$MagnifyingGlass$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MagnifyingGlass$3e$__["MagnifyingGlass"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 185,
                columnNumber: 36
            }, ("TURBOPACK compile-time value", void 0));
        case 'Envelope':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Envelope$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Envelope$3e$__["Envelope"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 186,
                columnNumber: 29
            }, ("TURBOPACK compile-time value", void 0));
        case 'DeviceMobile':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$DeviceMobile$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DeviceMobile$3e$__["DeviceMobile"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 187,
                columnNumber: 33
            }, ("TURBOPACK compile-time value", void 0));
        case 'Globe':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Globe$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 188,
                columnNumber: 26
            }, ("TURBOPACK compile-time value", void 0));
        case 'FileText':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$FileText$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 189,
                columnNumber: 29
            }, ("TURBOPACK compile-time value", void 0));
        case 'CreditCard':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$CreditCard$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__["CreditCard"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 190,
                columnNumber: 31
            }, ("TURBOPACK compile-time value", void 0));
        case 'CheckCircle':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$CheckCircle$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 191,
                columnNumber: 32
            }, ("TURBOPACK compile-time value", void 0));
        case 'Notebook':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Notebook$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Notebook$3e$__["Notebook"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 192,
                columnNumber: 29
            }, ("TURBOPACK compile-time value", void 0));
        case 'PresentationChart':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$PresentationChart$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PresentationChart$3e$__["PresentationChart"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 193,
                columnNumber: 38
            }, ("TURBOPACK compile-time value", void 0));
        case 'ChatCircle':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$ChatCircle$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChatCircle$3e$__["ChatCircle"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 194,
                columnNumber: 31
            }, ("TURBOPACK compile-time value", void 0));
        case 'Phone':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Phone$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 195,
                columnNumber: 26
            }, ("TURBOPACK compile-time value", void 0));
        case 'Gear':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Gear$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gear$3e$__["Gear"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 196,
                columnNumber: 25
            }, ("TURBOPACK compile-time value", void 0));
        case 'DotsThree':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$DotsThree$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DotsThree$3e$__["DotsThree"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 197,
                columnNumber: 30
            }, ("TURBOPACK compile-time value", void 0));
        // Dodatkowe ikony
        case 'Money':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Money$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Money$3e$__["Money"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 199,
                columnNumber: 26
            }, ("TURBOPACK compile-time value", void 0));
        case 'Wallet':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Wallet$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 200,
                columnNumber: 27
            }, ("TURBOPACK compile-time value", void 0));
        case 'ShoppingCart':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$ShoppingCart$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__["ShoppingCart"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 201,
                columnNumber: 33
            }, ("TURBOPACK compile-time value", void 0));
        case 'Tag':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Tag$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 202,
                columnNumber: 24
            }, ("TURBOPACK compile-time value", void 0));
        case 'CurrencyDollar':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$CurrencyDollar$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CurrencyDollar$3e$__["CurrencyDollar"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 203,
                columnNumber: 35
            }, ("TURBOPACK compile-time value", void 0));
        case 'Storefront':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Storefront$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Storefront$3e$__["Storefront"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 204,
                columnNumber: 31
            }, ("TURBOPACK compile-time value", void 0));
        case 'TrendUp':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$TrendUp$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendUp$3e$__["TrendUp"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 205,
                columnNumber: 28
            }, ("TURBOPACK compile-time value", void 0));
        case 'TrendDown':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$TrendDown$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendDown$3e$__["TrendDown"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 206,
                columnNumber: 30
            }, ("TURBOPACK compile-time value", void 0));
        case 'ChartLine':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$ChartLine$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChartLine$3e$__["ChartLine"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 207,
                columnNumber: 30
            }, ("TURBOPACK compile-time value", void 0));
        case 'Users':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Users$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 208,
                columnNumber: 26
            }, ("TURBOPACK compile-time value", void 0));
        case 'User':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$User$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 209,
                columnNumber: 25
            }, ("TURBOPACK compile-time value", void 0));
        case 'Calendar':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Calendar$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 210,
                columnNumber: 29
            }, ("TURBOPACK compile-time value", void 0));
        case 'Clock':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Clock$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 211,
                columnNumber: 26
            }, ("TURBOPACK compile-time value", void 0));
        case 'PaperPlaneTilt':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$PaperPlaneTilt$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PaperPlaneTilt$3e$__["PaperPlaneTilt"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 212,
                columnNumber: 35
            }, ("TURBOPACK compile-time value", void 0));
        case 'VideoCamera':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$VideoCamera$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__VideoCamera$3e$__["VideoCamera"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 213,
                columnNumber: 32
            }, ("TURBOPACK compile-time value", void 0));
        case 'Camera':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Camera$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__["Camera"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 214,
                columnNumber: 27
            }, ("TURBOPACK compile-time value", void 0));
        case 'Image':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Image$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 215,
                columnNumber: 26
            }, ("TURBOPACK compile-time value", void 0));
        case 'Link':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Link$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Link$3e$__["Link"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 216,
                columnNumber: 25
            }, ("TURBOPACK compile-time value", void 0));
        case 'Share':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Share$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Share$3e$__["Share"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 217,
                columnNumber: 26
            }, ("TURBOPACK compile-time value", void 0));
        case 'Heart':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Heart$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 218,
                columnNumber: 26
            }, ("TURBOPACK compile-time value", void 0));
        case 'Star':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Star$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 219,
                columnNumber: 25
            }, ("TURBOPACK compile-time value", void 0));
        case 'Bell':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Bell$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 220,
                columnNumber: 25
            }, ("TURBOPACK compile-time value", void 0));
        case 'Warning':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Warning$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Warning$3e$__["Warning"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 221,
                columnNumber: 28
            }, ("TURBOPACK compile-time value", void 0));
        case 'Info':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Info$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 222,
                columnNumber: 25
            }, ("TURBOPACK compile-time value", void 0));
        case 'Question':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Question$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Question$3e$__["Question"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 223,
                columnNumber: 29
            }, ("TURBOPACK compile-time value", void 0));
        case 'Check':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Check$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 224,
                columnNumber: 26
            }, ("TURBOPACK compile-time value", void 0));
        case 'X':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$X$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 225,
                columnNumber: 22
            }, ("TURBOPACK compile-time value", void 0));
        case 'Plus':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Plus$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 226,
                columnNumber: 25
            }, ("TURBOPACK compile-time value", void 0));
        case 'Minus':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Minus$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__["Minus"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 227,
                columnNumber: 26
            }, ("TURBOPACK compile-time value", void 0));
        case 'ArrowRight':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$ArrowRight$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 228,
                columnNumber: 31
            }, ("TURBOPACK compile-time value", void 0));
        case 'ArrowLeft':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$ArrowLeft$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 229,
                columnNumber: 30
            }, ("TURBOPACK compile-time value", void 0));
        case 'ArrowUp':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$ArrowUp$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUp$3e$__["ArrowUp"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 230,
                columnNumber: 28
            }, ("TURBOPACK compile-time value", void 0));
        case 'ArrowDown':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$ArrowDown$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDown$3e$__["ArrowDown"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 231,
                columnNumber: 30
            }, ("TURBOPACK compile-time value", void 0));
        case 'Download':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Download$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 232,
                columnNumber: 29
            }, ("TURBOPACK compile-time value", void 0));
        case 'Upload':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Upload$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 233,
                columnNumber: 27
            }, ("TURBOPACK compile-time value", void 0));
        case 'Eye':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Eye$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 234,
                columnNumber: 24
            }, ("TURBOPACK compile-time value", void 0));
        case 'EyeSlash':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$EyeSlash$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeSlash$3e$__["EyeSlash"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 235,
                columnNumber: 29
            }, ("TURBOPACK compile-time value", void 0));
        case 'Lock':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Lock$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 236,
                columnNumber: 25
            }, ("TURBOPACK compile-time value", void 0));
        case 'LockOpen':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$LockOpen$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LockOpen$3e$__["LockOpen"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 237,
                columnNumber: 29
            }, ("TURBOPACK compile-time value", void 0));
        case 'Key':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Key$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Key$3e$__["Key"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 238,
                columnNumber: 24
            }, ("TURBOPACK compile-time value", void 0));
        case 'Shield':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Shield$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 239,
                columnNumber: 27
            }, ("TURBOPACK compile-time value", void 0));
        case 'Trash':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Trash$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash$3e$__["Trash"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 240,
                columnNumber: 26
            }, ("TURBOPACK compile-time value", void 0));
        case 'Pencil':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Pencil$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__["Pencil"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 241,
                columnNumber: 27
            }, ("TURBOPACK compile-time value", void 0));
        case 'Copy':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Copy$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 242,
                columnNumber: 25
            }, ("TURBOPACK compile-time value", void 0));
        case 'Clipboard':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Clipboard$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clipboard$3e$__["Clipboard"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 243,
                columnNumber: 30
            }, ("TURBOPACK compile-time value", void 0));
        case 'Folder':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Folder$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Folder$3e$__["Folder"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 244,
                columnNumber: 27
            }, ("TURBOPACK compile-time value", void 0));
        case 'Database':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Database$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Database$3e$__["Database"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 245,
                columnNumber: 29
            }, ("TURBOPACK compile-time value", void 0));
        case 'Cloud':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Cloud$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Cloud$3e$__["Cloud"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 246,
                columnNumber: 26
            }, ("TURBOPACK compile-time value", void 0));
        case 'WifiHigh':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$WifiHigh$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__WifiHigh$3e$__["WifiHigh"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 247,
                columnNumber: 29
            }, ("TURBOPACK compile-time value", void 0));
        case 'Broadcast':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Broadcast$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Broadcast$3e$__["Broadcast"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 248,
                columnNumber: 30
            }, ("TURBOPACK compile-time value", void 0));
        default:
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$FileText$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                ...iconProps
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 249,
                columnNumber: 21
            }, ("TURBOPACK compile-time value", void 0));
    }
};
// Custom Node Component with Handles (connection points)
const CustomNode = ({ id, data, selected })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `px-5 py-4 rounded-xl border-2 transition-all duration-200 min-w-[120px] relative group ${selected ? 'border-[#fee715] shadow-lg shadow-[#fee715]/30 bg-[#18232F]' : 'border-[#fee715]/20 bg-[#0a0f14] hover:border-[#fee715]/50 hover:bg-[#18232F]'}`,
        style: {
            boxShadow: selected ? '0 0 20px rgba(254, 231, 21, 0.3)' : '0 4px 6px rgba(0, 0, 0, 0.1)'
        },
        children: [
            data.commentCount !== undefined && data.commentCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$CommentBadge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommentBadge"], {
                count: data.commentCount,
                status: data.commentStatus || 'neutral',
                onClick: ()=>{}
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 308,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f40$xyflow$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Handle"], {
                type: "source",
                position: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f40$xyflow$2f$system$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Position"].Top,
                id: "top",
                className: "!w-5 !h-5 !min-w-5 !min-h-5 bg-[#fee715] border-2 border-[#101820] hover:!w-6 hover:!h-6 transition-all cursor-crosshair z-10 opacity-0 group-hover:opacity-100",
                style: {
                    top: -10
                },
                title: "Przeciągnij do kropki na drugim panelu"
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 316,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f40$xyflow$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Handle"], {
                type: "source",
                position: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f40$xyflow$2f$system$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Position"].Bottom,
                id: "bottom",
                className: "!w-5 !h-5 !min-w-5 !min-h-5 bg-[#fee715] border-2 border-[#101820] hover:!w-6 hover:!h-6 transition-all cursor-crosshair z-10 opacity-0 group-hover:opacity-100",
                style: {
                    bottom: -10
                },
                title: "Przeciągnij do kropki na drugim panelu"
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 317,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f40$xyflow$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Handle"], {
                type: "source",
                position: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f40$xyflow$2f$system$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Position"].Left,
                id: "left",
                className: "!w-5 !h-5 !min-w-5 !min-h-5 bg-[#fee715] border-2 border-[#101820] hover:!w-6 hover:!h-6 transition-all cursor-crosshair z-10 opacity-0 group-hover:opacity-100",
                style: {
                    left: -10
                },
                title: "Przeciągnij do kropki na drugim panelu"
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 318,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f40$xyflow$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Handle"], {
                type: "source",
                position: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f40$xyflow$2f$system$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Position"].Right,
                id: "right",
                className: "!w-5 !h-5 !min-w-5 !min-h-5 bg-[#fee715] border-2 border-[#101820] hover:!w-6 hover:!h-6 transition-all cursor-crosshair z-10 opacity-0 group-hover:opacity-100",
                style: {
                    right: -10
                },
                title: "Przeciągnij do kropki na drugim panelu"
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 319,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3 mb-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-9 h-9 rounded-lg flex items-center justify-center",
                        style: {
                            backgroundColor: data.color || '#fee71520',
                            color: '#101820'
                        },
                        children: renderPhosphorIcon(data.icon, 20)
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                        lineNumber: 323,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-sm font-medium text-white leading-tight",
                            children: data.label
                        }, void 0, false, {
                            fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                            lineNumber: 330,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                        lineNumber: 329,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 322,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            data.notes && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-xs text-gray-400 mt-1 line-clamp-1",
                children: data.notes
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 334,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            data.link && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-xs text-[#fee715] mt-1 line-clamp-1 flex items-center gap-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Link$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Link$3e$__["Link"], {
                        size: 12,
                        weight: "bold"
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                        lineNumber: 338,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: data.link,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "hover:underline",
                        onClick: (e)=>e.stopPropagation(),
                        children: data.link.length > 30 ? data.link.substring(0, 30) + '...' : data.link
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                        lineNumber: 339,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 337,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            data.customFields && data.customFields.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-2 pt-2 border-t border-white/5 space-y-1",
                children: data.customFields.map((field, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs text-gray-400 flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-gray-500 font-medium",
                                children: [
                                    field.field_name,
                                    ":"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                lineNumber: 348,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            field.field_type === 'link' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: field.field_value,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                className: "text-[#fee715] hover:underline line-clamp-1",
                                onClick: (e)=>e.stopPropagation(),
                                children: field.field_value.length > 25 ? field.field_value.substring(0, 25) + '...' : field.field_value
                            }, void 0, false, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                lineNumber: 350,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)) : field.field_type === 'date' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: field.field_value ? new Date(field.field_value).toLocaleDateString('pl-PL') : '-'
                            }, void 0, false, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                lineNumber: 360,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "line-clamp-1",
                                children: field.field_value || '-'
                            }, void 0, false, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                lineNumber: 362,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, index, true, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                        lineNumber: 347,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 345,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
        lineNumber: 296,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = CustomNode;
// Custom Edge: linia od A (source) do B (target), strzałka TYLKO na końcu w B (kierunek A→B)
const CustomEdge = ({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data, style, markerEnd })=>{
    _s();
    const [edgePath, labelX, labelY] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f40$xyflow$2f$system$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSmoothStepPath"])({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
        borderRadius: 20
    });
    // Oblicz długość ścieżki i pozycję wzdłuż ścieżki
    const pathElementRef = __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useRef(null);
    __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "CustomEdge.useEffect": ()=>{
            if (pathElementRef.current) return;
            const svgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            svgPath.setAttribute('d', edgePath);
            pathElementRef.current = svgPath;
        }
    }["CustomEdge.useEffect"], [
        edgePath
    ]);
    // Oblicz offset dla etykiety, aby uniknąć kolizji z innymi etykietami
    const [labelOffset, setLabelOffset] = __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(0);
    const labelRef = __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useRef(null);
    __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "CustomEdge.useEffect": ()=>{
            if (!data?.notes || !labelRef.current || !pathElementRef.current) return;
            const checkCollisions = {
                "CustomEdge.useEffect.checkCollisions": ()=>{
                    const currentLabel = labelRef.current;
                    if (!currentLabel) return;
                    const currentRect = currentLabel.getBoundingClientRect();
                    const allLabels = document.querySelectorAll('[data-edge-label]');
                    // Sprawdź kolizje z innymi etykietami
                    let hasCollision = false;
                    for (const otherLabel of allLabels){
                        if (otherLabel === currentLabel) continue;
                        const otherRect = otherLabel.getBoundingClientRect();
                        // Sprawdź czy prostokąty się nakładają (z marginesem 15px)
                        const margin1 = 15;
                        const overlapX = !(currentRect.right + margin1 < otherRect.left || currentRect.left - margin1 > otherRect.right);
                        const overlapY = !(currentRect.bottom + margin1 < otherRect.top || currentRect.top - margin1 > otherRect.bottom);
                        if (overlapX && overlapY) {
                            hasCollision = true;
                            break;
                        }
                    }
                    // Jeśli jest kolizja, przesuń etykietę wzdłuż ścieżki
                    if (hasCollision && pathElementRef.current) {
                        try {
                            const pathLength = pathElementRef.current.getTotalLength();
                            const midPoint = pathLength / 2;
                            const offsetStep = 30; // Krok przesunięcia w pikselach
                            const maxOffset = pathLength * 0.25; // Maksymalne przesunięcie (25% długości)
                            // Spróbuj przesunąć w górę i w dół ścieżki
                            let bestOffset = 0;
                            for(let offset = offsetStep; offset <= maxOffset; offset += offsetStep){
                                // Spróbuj w górę
                                const pointUp = pathElementRef.current.getPointAtLength(midPoint - offset);
                                const testRectUp = {
                                    left: pointUp.x - currentRect.width / 2,
                                    right: pointUp.x + currentRect.width / 2,
                                    top: pointUp.y - currentRect.height / 2,
                                    bottom: pointUp.y + currentRect.height / 2
                                };
                                let collisionUp = false;
                                for (const otherLabel of allLabels){
                                    if (otherLabel === currentLabel) continue;
                                    const otherRect = otherLabel.getBoundingClientRect();
                                    const overlapX = !(testRectUp.right + margin < otherRect.left || testRectUp.left - margin > otherRect.right);
                                    const overlapY = !(testRectUp.bottom + margin < otherRect.top || testRectUp.top - margin > otherRect.bottom);
                                    if (overlapX && overlapY) {
                                        collisionUp = true;
                                        break;
                                    }
                                }
                                if (!collisionUp) {
                                    bestOffset = -offset;
                                    break;
                                }
                                // Spróbuj w dół
                                const pointDown = pathElementRef.current.getPointAtLength(midPoint + offset);
                                const testRectDown = {
                                    left: pointDown.x - currentRect.width / 2,
                                    right: pointDown.x + currentRect.width / 2,
                                    top: pointDown.y - currentRect.height / 2,
                                    bottom: pointDown.y + currentRect.height / 2
                                };
                                let collisionDown = false;
                                for (const otherLabel of allLabels){
                                    if (otherLabel === currentLabel) continue;
                                    const otherRect = otherLabel.getBoundingClientRect();
                                    const overlapX = !(testRectDown.right + margin < otherRect.left || testRectDown.left - margin > otherRect.right);
                                    const overlapY = !(testRectDown.bottom + margin < otherRect.top || testRectDown.top - margin > otherRect.bottom);
                                    if (overlapX && overlapY) {
                                        collisionDown = true;
                                        break;
                                    }
                                }
                                if (!collisionDown) {
                                    bestOffset = offset;
                                    break;
                                }
                            }
                            setLabelOffset(bestOffset);
                        } catch (e) {
                        // Ignoruj błędy
                        }
                    } else {
                        setLabelOffset(0);
                    }
                }
            }["CustomEdge.useEffect.checkCollisions"];
            // Opóźnij sprawdzenie, aby wszystkie etykiety były już wyrenderowane
            const timeoutId = setTimeout(checkCollisions, 150);
            return ({
                "CustomEdge.useEffect": ()=>clearTimeout(timeoutId)
            })["CustomEdge.useEffect"];
        }
    }["CustomEdge.useEffect"], [
        data?.notes,
        edgePath,
        labelX,
        labelY
    ]);
    // Oblicz finalną pozycję etykiety
    const finalPosition = __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "CustomEdge.useMemo[finalPosition]": ()=>{
            if (labelOffset === 0 || !pathElementRef.current) {
                return {
                    x: labelX,
                    y: labelY
                };
            }
            try {
                const pathLength = pathElementRef.current.getTotalLength();
                const point = pathElementRef.current.getPointAtLength(pathLength / 2 + labelOffset);
                return {
                    x: point.x,
                    y: point.y
                };
            } catch (e) {
                return {
                    x: labelX,
                    y: labelY
                };
            }
        }
    }["CustomEdge.useMemo[finalPosition]"], [
        labelX,
        labelY,
        labelOffset
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f40$xyflow$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BaseEdge"], {
                id: id,
                path: edgePath,
                style: style,
                markerEnd: markerEnd,
                markerStart: undefined
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 520,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            data?.commentCount !== undefined && data.commentCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f40$xyflow$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["EdgeLabelRenderer"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        position: 'absolute',
                        transform: `translate(-50%, -50%) translate(${labelX}px,${labelY - 20}px)`
                    },
                    className: "nodrag nopan",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$CommentBadge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommentBadge"], {
                        count: data.commentCount,
                        status: data.commentStatus || 'neutral',
                        onClick: ()=>{}
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                        lineNumber: 537,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                    lineNumber: 530,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 529,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            data?.notes && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f40$xyflow$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["EdgeLabelRenderer"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    ref: labelRef,
                    "data-edge-label": id,
                    style: {
                        position: 'absolute',
                        transform: `translate(-50%, -50%) translate(${finalPosition.x}px,${finalPosition.y}px)`
                    },
                    className: "nodrag nopan",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-2 py-1 bg-[#fee715] text-[#101820] text-xs font-semibold rounded shadow-lg border-2 border-[#101820] max-w-[200px] break-words whitespace-normal leading-tight",
                        children: [
                            data.notes,
                            data?.link && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: data.link,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                onClick: (e)=>e.stopPropagation(),
                                className: "block mt-1 text-[#101820] underline hover:text-blue-600",
                                children: "🔗 Link"
                            }, void 0, false, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                lineNumber: 559,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                        lineNumber: 556,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                    lineNumber: 547,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 546,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true);
};
_s(CustomEdge, "fRp6pr+mjOp1dGjmsiDRnoDR848=");
_c1 = CustomEdge;
// Text Node Component (tekst + handles do łączenia, z możliwością resize)
const TextNode = ({ id, data, selected, width, height })=>{
    // Użyj width/height z props (React Flow automatycznie je aktualizuje przez NodeResizer) lub z data, lub domyślne
    const nodeWidth = width || data.width || 250;
    const nodeHeight = height || data.height || 100;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `px-8 py-5 rounded-xl border-2 transition-all duration-200 relative group ${selected ? 'border-[#fee715] shadow-lg shadow-[#fee715]/30 bg-[#18232F]' : 'border-[#fee715]/20 bg-[#0a0f14] hover:border-[#fee715]/50 hover:bg-[#18232F]'}`,
        style: {
            boxShadow: selected ? '0 0 20px rgba(254, 231, 21, 0.3)' : '0 4px 6px rgba(0, 0, 0, 0.1)',
            width: nodeWidth,
            height: nodeHeight,
            minWidth: 150,
            minHeight: 60
        },
        children: [
            data.commentCount !== undefined && data.commentCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$CommentBadge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommentBadge"], {
                count: data.commentCount,
                status: data.commentStatus || 'neutral',
                onClick: ()=>{}
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 601,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            data.showHandles && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f40$xyflow$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Handle"], {
                        type: "source",
                        position: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f40$xyflow$2f$system$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Position"].Top,
                        id: "top",
                        className: "!w-5 !h-5 !min-w-5 !min-h-5 bg-[#fee715] border-2 border-[#101820] hover:!w-6 hover:!h-6 transition-all cursor-crosshair z-10 opacity-0 group-hover:opacity-100",
                        style: {
                            top: -10
                        },
                        title: "Przeciągnij do kropki na drugim panelu"
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                        lineNumber: 611,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f40$xyflow$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Handle"], {
                        type: "source",
                        position: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f40$xyflow$2f$system$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Position"].Bottom,
                        id: "bottom",
                        className: "!w-5 !h-5 !min-w-5 !min-h-5 bg-[#fee715] border-2 border-[#101820] hover:!w-6 hover:!h-6 transition-all cursor-crosshair z-10 opacity-0 group-hover:opacity-100",
                        style: {
                            bottom: -10
                        },
                        title: "Przeciągnij do kropki na drugim panelu"
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                        lineNumber: 612,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f40$xyflow$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Handle"], {
                        type: "source",
                        position: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f40$xyflow$2f$system$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Position"].Left,
                        id: "left",
                        className: "!w-5 !h-5 !min-w-5 !min-h-5 bg-[#fee715] border-2 border-[#101820] hover:!w-6 hover:!h-6 transition-all cursor-crosshair z-10 opacity-0 group-hover:opacity-100",
                        style: {
                            left: -10
                        },
                        title: "Przeciągnij do kropki na drugim panelu"
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                        lineNumber: 613,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f40$xyflow$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Handle"], {
                        type: "source",
                        position: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f40$xyflow$2f$system$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Position"].Right,
                        id: "right",
                        className: "!w-5 !h-5 !min-w-5 !min-h-5 bg-[#fee715] border-2 border-[#101820] hover:!w-6 hover:!h-6 transition-all cursor-crosshair z-10 opacity-0 group-hover:opacity-100",
                        style: {
                            right: -10
                        },
                        title: "Przeciągnij do kropki na drugim panelu"
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                        lineNumber: 614,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f40$xyflow$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["NodeResizer"], {
                color: "#fee715",
                isVisible: selected,
                minWidth: 150,
                minHeight: 60,
                handleStyle: {
                    backgroundColor: '#fee715',
                    border: '2px solid #101820',
                    borderRadius: '4px',
                    width: '10px',
                    height: '10px'
                }
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 617,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-white break-words h-full w-full flex",
                style: {
                    fontSize: data.fontSize || 16,
                    fontWeight: data.fontWeight || 'normal',
                    textAlign: data.textAlign || 'left',
                    justifyContent: data.textAlign === 'center' ? 'center' : data.textAlign === 'right' ? 'flex-end' : 'flex-start',
                    alignItems: data.verticalAlign === 'top' ? 'flex-start' : data.verticalAlign === 'bottom' ? 'flex-end' : 'center',
                    padding: '8px'
                },
                children: data.text || 'Kliknij, aby edytować'
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 630,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
        lineNumber: 585,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c2 = TextNode;
// Node Types Configuration
const nodeTypes = {
    custom: CustomNode,
    text: TextNode
};
// Edge Types Configuration
const edgeTypes = {
    custom: CustomEdge
};
// Available Node Templates (Sidebar)
const nodeTemplates = [
    {
        type: 'text',
        icon: 'FileText',
        label: 'Tekst',
        category: 'Narzędzia'
    },
    // Źródła Ruchu
    {
        type: 'custom',
        icon: 'simple:facebook',
        label: 'Facebook Ads',
        color: '#1877F2',
        category: 'Źródła Ruchu'
    },
    {
        type: 'custom',
        icon: 'simple:google',
        label: 'Google Ads',
        color: '#4285F4',
        category: 'Źródła Ruchu'
    },
    {
        type: 'custom',
        icon: 'Envelope',
        label: 'Email',
        color: '#EA4335',
        category: 'Źródła Ruchu'
    },
    {
        type: 'custom',
        icon: 'simple:instagram',
        label: 'Instagram',
        color: '#E4405F',
        category: 'Źródła Ruchu'
    },
    {
        type: 'custom',
        icon: 'simple:youtube',
        label: 'Youtube',
        color: '#FF0000',
        category: 'Źródła Ruchu'
    },
    {
        type: 'custom',
        icon: 'Gear',
        label: 'Inne',
        color: '#fee715',
        category: 'Źródła Ruchu',
        isCustom: true
    },
    // Typ Strony
    {
        type: 'custom',
        icon: 'Globe',
        label: 'Landing',
        color: '#00C9A7',
        category: 'Typ Strony'
    },
    {
        type: 'custom',
        icon: 'FileText',
        label: 'Sales page',
        color: '#00C9A7',
        category: 'Typ Strony'
    },
    {
        type: 'custom',
        icon: 'CreditCard',
        label: 'Checkout',
        color: '#00C9A7',
        category: 'Typ Strony'
    },
    {
        type: 'custom',
        icon: 'CheckCircle',
        label: 'Thank you',
        color: '#00C9A7',
        category: 'Typ Strony'
    },
    {
        type: 'custom',
        icon: 'Gear',
        label: 'Inne',
        color: '#00C9A7',
        category: 'Typ Strony',
        isCustom: true
    },
    // Działania
    {
        type: 'custom',
        icon: 'Notebook',
        label: 'Ebook',
        color: '#fee715',
        category: 'Działania'
    },
    {
        type: 'custom',
        icon: 'Phone',
        label: 'Rozmowa',
        color: '#fee715',
        category: 'Działania'
    },
    {
        type: 'custom',
        icon: 'FileText',
        label: 'Formularz',
        color: '#fee715',
        category: 'Działania'
    },
    {
        type: 'custom',
        icon: 'PresentationChart',
        label: 'Webinar',
        color: '#fee715',
        category: 'Działania'
    },
    {
        type: 'custom',
        icon: 'Gear',
        label: 'Inne',
        color: '#fee715',
        category: 'Działania',
        isCustom: true
    },
    // Cel/Konwersja
    {
        type: 'custom',
        icon: 'CheckCircle',
        label: 'Lead',
        color: '#10B981',
        category: 'Cel/Konwersja'
    },
    {
        type: 'custom',
        icon: 'Calendar',
        label: 'Rezerwacja',
        color: '#10B981',
        category: 'Cel/Konwersja'
    },
    {
        type: 'custom',
        icon: 'Phone',
        label: 'Telefon',
        color: '#10B981',
        category: 'Cel/Konwersja'
    },
    {
        type: 'custom',
        icon: 'CurrencyDollar',
        label: 'Sprzedaż',
        color: '#10B981',
        category: 'Cel/Konwersja'
    },
    {
        type: 'custom',
        icon: 'Gear',
        label: 'Inne',
        color: '#10B981',
        category: 'Cel/Konwersja',
        isCustom: true
    }
];
const DatePickerField = ({ value, onChange })=>{
    _s1();
    const [isDatePickerOpen, setIsDatePickerOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const datePickerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const calendarRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [calendarStyle, setCalendarStyle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const formatDateForDisplay = (dateStr)=>{
        if (!dateStr) return 'dd.mm.rrrr';
        const date = new Date(dateStr + 'T00:00:00');
        return date.toLocaleDateString('pl-PL', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };
    const formatDateForInput = (date)=>{
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    const getCalendarDays = ()=>{
        const currentDate = value ? new Date(value + 'T00:00:00') : new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
        const days = [];
        const prevMonthLastDay = new Date(year, month, 0).getDate();
        for(let i = startingDayOfWeek - 1; i >= 0; i--){
            days.push({
                day: prevMonthLastDay - i,
                isCurrentMonth: false,
                date: new Date(year, month - 1, prevMonthLastDay - i)
            });
        }
        for(let day = 1; day <= daysInMonth; day++){
            days.push({
                day,
                isCurrentMonth: true,
                date: new Date(year, month, day)
            });
        }
        const remainingDays = 42 - days.length;
        for(let day = 1; day <= remainingDays; day++){
            days.push({
                day,
                isCurrentMonth: false,
                date: new Date(year, month + 1, day)
            });
        }
        return {
            days,
            year,
            month
        };
    };
    const calendarData = getCalendarDays();
    const monthNames = [
        'Styczeń',
        'Luty',
        'Marzec',
        'Kwiecień',
        'Maj',
        'Czerwiec',
        'Lipiec',
        'Sierpień',
        'Wrzesień',
        'Październik',
        'Listopad',
        'Grudzień'
    ];
    const dayNames = [
        'Pon',
        'Wt',
        'Śr',
        'Czw',
        'Pt',
        'Sob',
        'Nie'
    ];
    const handleDateSelect = (date)=>{
        const dateStr = formatDateForInput(date);
        onChange(dateStr);
        setIsDatePickerOpen(false);
    };
    const navigateMonth = (direction)=>{
        const currentDate = value ? new Date(value + 'T00:00:00') : new Date();
        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1);
        onChange(formatDateForInput(newDate));
    };
    const selectToday = ()=>{
        handleDateSelect(new Date());
    };
    const clearDate = ()=>{
        onChange('');
        setIsDatePickerOpen(false);
    };
    // Pozycjonowanie kalendarza
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DatePickerField.useEffect": ()=>{
            if (!isDatePickerOpen) return;
            const updatePosition = {
                "DatePickerField.useEffect.updatePosition": ()=>{
                    const anchor = datePickerRef.current;
                    const popover = calendarRef.current;
                    if (!anchor || !popover) return;
                    const anchorRect = anchor.getBoundingClientRect();
                    const popRect = popover.getBoundingClientRect();
                    const margin1 = 8;
                    const padding = 12;
                    const calendarWidth = 280; // Stała szerokość kalendarza
                    let top = anchorRect.bottom + margin1;
                    if (top + popRect.height > window.innerHeight - padding) {
                        top = anchorRect.top - popRect.height - margin1;
                    }
                    top = Math.max(padding, Math.min(top, window.innerHeight - popRect.height - padding));
                    // Pozycjonowanie poziome: wyrównaj lewą krawędź kalendarza do lewej krawędzi pola input
                    let left = anchorRect.left;
                    // Sprawdź czy kalendarz mieści się w viewport
                    // Jeśli nie mieści się po prawej stronie, przesuń w lewo
                    if (left + calendarWidth > window.innerWidth - padding) {
                        left = window.innerWidth - calendarWidth - padding;
                    }
                    // Jeśli przesunięty w lewo, upewnij się że nie wychodzi poza lewą krawędź
                    if (left < padding) {
                        left = padding;
                    }
                    setCalendarStyle({
                        position: 'fixed',
                        zIndex: 99999,
                        top: `${top}px`,
                        left: `${left}px`,
                        width: `${calendarWidth}px`
                    });
                }
            }["DatePickerField.useEffect.updatePosition"];
            const raf = requestAnimationFrame(updatePosition);
            window.addEventListener('scroll', updatePosition, true);
            window.addEventListener('resize', updatePosition);
            return ({
                "DatePickerField.useEffect": ()=>{
                    cancelAnimationFrame(raf);
                    window.removeEventListener('scroll', updatePosition, true);
                    window.removeEventListener('resize', updatePosition);
                }
            })["DatePickerField.useEffect"];
        }
    }["DatePickerField.useEffect"], [
        isDatePickerOpen
    ]);
    // Zamknij po kliknięciu poza
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DatePickerField.useEffect": ()=>{
            const handleClickOutside = {
                "DatePickerField.useEffect.handleClickOutside": (event)=>{
                    const target = event.target;
                    if (isDatePickerOpen && datePickerRef.current && !datePickerRef.current.contains(target) && calendarRef.current && !calendarRef.current.contains(target)) {
                        setIsDatePickerOpen(false);
                    }
                }
            }["DatePickerField.useEffect.handleClickOutside"];
            if (isDatePickerOpen) {
                document.addEventListener('mousedown', handleClickOutside);
                document.addEventListener('keydown', {
                    "DatePickerField.useEffect": (e)=>{
                        if (e.key === 'Escape') {
                            setIsDatePickerOpen(false);
                        }
                    }
                }["DatePickerField.useEffect"]);
            }
            return ({
                "DatePickerField.useEffect": ()=>{
                    document.removeEventListener('mousedown', handleClickOutside);
                }
            })["DatePickerField.useEffect"];
        }
    }["DatePickerField.useEffect"], [
        isDatePickerOpen
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative",
        ref: datePickerRef,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>setIsDatePickerOpen(!isDatePickerOpen),
                className: "w-full bg-white/[0.04] border border-white/10 rounded px-2 py-1 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30 flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: value ? 'text-white' : 'text-gray-500',
                        children: formatDateForDisplay(value)
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                        lineNumber: 883,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: "w-4 h-4 text-white flex-shrink-0 ml-2",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        }, void 0, false, {
                            fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                            lineNumber: 887,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                        lineNumber: 886,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 878,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            isDatePickerOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: calendarRef,
                className: "fixed bg-[#18232F] border border-white/15 rounded-lg shadow-xl p-4",
                style: Object.keys(calendarStyle).length ? calendarStyle : {
                    zIndex: 99999
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between mb-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>navigateMonth(-1),
                                className: "p-1 rounded hover:bg-white/10 transition-colors",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-4 h-4 text-white",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M15 19l-7-7 7-7"
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                        lineNumber: 905,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                    lineNumber: 904,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                lineNumber: 899,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-white text-sm font-medium",
                                children: [
                                    monthNames[calendarData.month],
                                    " ",
                                    calendarData.year
                                ]
                            }, void 0, true, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                lineNumber: 908,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>navigateMonth(1),
                                className: "p-1 rounded hover:bg-white/10 transition-colors",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-4 h-4 text-white",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M9 5l7 7-7 7"
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                        lineNumber: 917,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                    lineNumber: 916,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                lineNumber: 911,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                        lineNumber: 898,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-7 gap-1 mb-2",
                        children: dayNames.map((day, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center text-[10px] text-gray-400 py-1",
                                children: day
                            }, idx, false, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                lineNumber: 925,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                        lineNumber: 923,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-7 gap-1",
                        children: calendarData.days.map((dayObj, idx)=>{
                            const isSelected = value && formatDateForInput(dayObj.date) === value;
                            const isToday = formatDateForInput(dayObj.date) === formatDateForInput(new Date());
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>dayObj.isCurrentMonth && handleDateSelect(dayObj.date),
                                disabled: !dayObj.isCurrentMonth,
                                className: `aspect-square rounded text-[11px] font-medium transition-all ${!dayObj.isCurrentMonth ? 'text-gray-600 cursor-not-allowed' : isSelected ? 'bg-[#fee715] text-[#101820] font-bold' : isToday ? 'bg-white/10 text-[#fee715] border border-[#fee715]/50' : 'text-white hover:bg-white/10'}`,
                                children: dayObj.day
                            }, idx, false, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                lineNumber: 938,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0));
                        })
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                        lineNumber: 932,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2 mt-3 pt-3 border-t border-white/10",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: clearDate,
                                className: "flex-1 px-2 py-1.5 bg-white/5 hover:bg-white/10 border border-white/20 rounded text-white text-[10px] transition-colors",
                                children: "Wyczyść"
                            }, void 0, false, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                lineNumber: 961,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: selectToday,
                                className: "flex-1 px-2 py-1.5 bg-[#fee715] text-[#101820] rounded text-[10px] font-bold transition-colors hover:bg-[#fee715]/90",
                                children: "Dzisiaj"
                            }, void 0, false, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                lineNumber: 968,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                        lineNumber: 960,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 892,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)), document.body)
        ]
    }, void 0, true, {
        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
        lineNumber: 877,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s1(DatePickerField, "4UWomdBBw2xFIt3k+keBbBJscZA=");
_c3 = DatePickerField;
const FunnelBuilder = ()=>{
    _s2();
    const { id } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$NISHYRIK$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const navigate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$NISHYRIK$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNavigate"])();
    const [funnel, setFunnel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isEditingTitle, setIsEditingTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isEditingSubtitle, setIsEditingSubtitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editedTitle, setEditedTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [editedSubtitle, setEditedSubtitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [subtitleMode, setSubtitleMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('select');
    const [selectedNode, setSelectedNode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showPropertiesPanel, setShowPropertiesPanel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [customTemplates, setCustomTemplates] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [nodeProperties, setNodeProperties] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        label: '',
        icon: 'FileText',
        notes: '',
        link: '',
        isPinned: false
    });
    const [nodeCustomFields, setNodeCustomFields] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [textNodeProperties, setTextNodeProperties] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        text: '',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'left',
        verticalAlign: 'middle',
        showHandles: false,
        isPinned: false
    });
    const [selectedEdge, setSelectedEdge] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [edgeProperties, setEdgeProperties] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        notes: '',
        link: ''
    });
    const [edgeCustomFields, setEdgeCustomFields] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [showEdgeProperties, setShowEdgeProperties] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showMinimap, setShowMinimap] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showAlignToolbar, setShowAlignToolbar] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showHeader, setShowHeader] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [showSidebar, setShowSidebar] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [showBottomToolbar, setShowBottomToolbar] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [showLegend, setShowLegend] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [interactionMode, setInteractionMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('pan');
    const [alertModal, setAlertModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        isOpen: false,
        title: '',
        message: '',
        type: 'info'
    });
    // System komentarzy
    const [commentMode, setCommentMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showCommentPanel, setShowCommentPanel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedThreadId, setSelectedThreadId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [commentFormAnchor, setCommentFormAnchor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [nodeCommentCounts, setNodeCommentCounts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Map());
    const [edgeCommentCounts, setEdgeCommentCounts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Map());
    const [commentPanelRefreshTrigger, setCommentPanelRefreshTrigger] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    // React Flow state
    const [nodes, setNodes, onNodesChange] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f40$xyflow$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useNodesState"])([]);
    const [edges, setEdges, onEdgesChange] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f40$xyflow$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useEdgesState"])([]);
    // Ref do aktualnych nodów dla wrappedOnNodesChange (aby uniknąć stale closure)
    const nodesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    // Aktualizuj ref przy każdej zmianie nodów
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FunnelBuilder.useEffect": ()=>{
            nodesRef.current = nodes;
        }
    }["FunnelBuilder.useEffect"], [
        nodes
    ]);
    // Historia do Cofnij (Wstecz) — max 50 kroków
    const HISTORY_MAX = 50;
    const [undoHistory, setUndoHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const reactFlowWrapper = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const hasCenteredOnPinnedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const hasSetInitialViewportRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const lastSavedStateRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [hasUnsavedChanges, setHasUnsavedChanges] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const lastSavedNodePropertiesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const lastSavedTextNodePropertiesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const lastSavedEdgePropertiesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [hasUnsavedNodeChanges, setHasUnsavedNodeChanges] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hasUnsavedTextNodeChanges, setHasUnsavedTextNodeChanges] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hasUnsavedEdgeChanges, setHasUnsavedEdgeChanges] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [reactFlowInstance, setReactFlowInstance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [copiedNodes, setCopiedNodes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [copiedEdges, setCopiedEdges] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isSpacePressed, setIsSpacePressed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [currentZoom, setCurrentZoom] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [alignmentGuides, setAlignmentGuides] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        vertical: [],
        horizontal: []
    });
    const [viewport, setViewport] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0,
        zoom: 1
    });
    const [flowContainerSize, setFlowContainerSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        w: 0,
        h: 0
    });
    const isManualSelectionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false); // Flaga, że ręcznie zarządzamy selekcją
    const pendingSelectionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null); // Intencja selekcji z onNodeClick
    const previousSelectedNodeIdsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new Set()); // Poprzednio zaznaczone nody (przed kliknięciem)
    const isRestoringSelectionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false); // Flaga, że przywracamy selekcję (aby uniknąć pętli)
    // Zapisz bieżący stan do historii (przed zmianą) — do Cofnij
    const pushUndoHistory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FunnelBuilder.useCallback[pushUndoHistory]": ()=>{
            const snap = {
                nodes: JSON.parse(JSON.stringify(nodes)),
                edges: JSON.parse(JSON.stringify(edges))
            };
            setUndoHistory({
                "FunnelBuilder.useCallback[pushUndoHistory]": (h)=>{
                    const next = [
                        ...h,
                        snap
                    ];
                    return next.length > HISTORY_MAX ? next.slice(1) : next;
                }
            }["FunnelBuilder.useCallback[pushUndoHistory]"]);
        }
    }["FunnelBuilder.useCallback[pushUndoHistory]"], [
        nodes,
        edges
    ]);
    const handleUndo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FunnelBuilder.useCallback[handleUndo]": ()=>{
            if (undoHistory.length === 0) return;
            const prev = undoHistory[undoHistory.length - 1];
            setNodes(prev.nodes);
            setEdges(prev.edges);
            setUndoHistory({
                "FunnelBuilder.useCallback[handleUndo]": (h)=>h.slice(0, -1)
            }["FunnelBuilder.useCallback[handleUndo]"]);
            setSelectedNode(null);
            setSelectedEdge(null);
            setShowPropertiesPanel(false);
            setShowEdgeProperties(false);
        }
    }["FunnelBuilder.useCallback[handleUndo]"], [
        undoHistory,
        setNodes,
        setEdges
    ]);
    // Rozmiar kontenera flow (do linii pomocniczych)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FunnelBuilder.useEffect": ()=>{
            const el = reactFlowWrapper.current;
            if (!el) return;
            const update = {
                "FunnelBuilder.useEffect.update": ()=>{
                    if (el) setFlowContainerSize({
                        w: el.offsetWidth,
                        h: el.offsetHeight
                    });
                }
            }["FunnelBuilder.useEffect.update"];
            update();
            const ro = new ResizeObserver(update);
            ro.observe(el);
            return ({
                "FunnelBuilder.useEffect": ()=>ro.disconnect()
            })["FunnelBuilder.useEffect"];
        }
    }["FunnelBuilder.useEffect"], []);
    // Ładowanie własnych szablonów z bazy
    const loadCustomTemplates = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FunnelBuilder.useCallback[loadCustomTemplates]": async ()=>{
            if (!user) return;
            try {
                const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('custom_node_templates').select('*').eq('created_by', user.id).order('created_at', {
                    ascending: false
                });
                if (error) throw error;
                const templates = (data || []).map({
                    "FunnelBuilder.useCallback[loadCustomTemplates].templates": (template)=>({
                            type: 'custom',
                            icon: template.icon,
                            label: template.label,
                            color: template.color,
                            category: template.category,
                            isCustom: true
                        })
                }["FunnelBuilder.useCallback[loadCustomTemplates].templates"]);
                setCustomTemplates(templates);
            } catch (error) {
                console.error('Błąd ładowania własnych szablonów:', error);
            }
        }
    }["FunnelBuilder.useCallback[loadCustomTemplates]"], [
        user
    ]);
    // Ładowanie liczby wątków dla nodów/edges
    const loadCommentCounts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FunnelBuilder.useCallback[loadCommentCounts]": async ()=>{
            if (!id) return;
            try {
                const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('comment_threads').select(`
          id,
          status,
          comment_anchors (
            anchor_type,
            anchor_id,
            region_x,
            region_y,
            region_width,
            region_height
          )
        `).eq('funnel_id', id);
                if (error) {
                    console.error('Błąd pobierania wątków:', error);
                    throw error;
                }
                // Debug: sprawdź co faktycznie wraca z bazy
                console.log('=== RAW DATA FROM DB ===');
                console.log('Threads count:', data?.length || 0);
                if (data && data.length > 0) {
                    console.log('First thread raw data:', JSON.stringify(data[0], null, 2));
                    console.log('All threads anchors:', data.map({
                        "FunnelBuilder.useCallback[loadCommentCounts]": (t)=>{
                            const anchors = t.comment_anchors;
                            const anchor = Array.isArray(anchors) ? anchors[0] : anchors;
                            return {
                                threadId: t.id,
                                anchors: anchors,
                                isArray: Array.isArray(anchors),
                                anchorsLength: Array.isArray(anchors) ? anchors.length : anchors ? 1 : 0,
                                firstAnchor: anchor
                            };
                        }
                    }["FunnelBuilder.useCallback[loadCommentCounts]"]));
                }
                const nodeCounts = new Map();
                const edgeCounts = new Map();
                (data || []).forEach({
                    "FunnelBuilder.useCallback[loadCommentCounts]": (thread)=>{
                        // Supabase może zwrócić comment_anchors jako obiekt (gdy jest jeden) lub tablicę (gdy jest wiele)
                        const anchors = thread.comment_anchors;
                        const anchor = Array.isArray(anchors) ? anchors[0] : anchors;
                        if (!anchor || !anchor.anchor_type) return;
                        const isOpen = thread.status !== 'Zatwierdzone' && thread.status !== 'Odrzucone';
                        if (!isOpen) return; // Tylko otwarte wątki
                        let status = 'neutral';
                        if (thread.status === 'Otwarte') status = 'warning';
                        else if (thread.status === 'Do akceptacji') status = 'pending';
                        else if (thread.status === 'W toku') status = 'neutral';
                        if (anchor.anchor_type === 'node' && anchor.anchor_id) {
                            const existing = nodeCounts.get(anchor.anchor_id) || {
                                count: 0,
                                status: 'neutral'
                            };
                            nodeCounts.set(anchor.anchor_id, {
                                count: existing.count + 1,
                                status: status === 'warning' || existing.status === 'warning' ? 'warning' : status === 'pending' || existing.status === 'pending' ? 'pending' : 'neutral'
                            });
                        } else if (anchor.anchor_type === 'edge' && anchor.anchor_id) {
                            const existing = edgeCounts.get(anchor.anchor_id) || {
                                count: 0,
                                status: 'neutral'
                            };
                            edgeCounts.set(anchor.anchor_id, {
                                count: existing.count + 1,
                                status: status === 'warning' || existing.status === 'warning' ? 'warning' : status === 'pending' || existing.status === 'pending' ? 'pending' : 'neutral'
                            });
                        }
                    }
                }["FunnelBuilder.useCallback[loadCommentCounts]"]);
                setNodeCommentCounts(nodeCounts);
                setEdgeCommentCounts(edgeCounts);
                // Debug: sprawdź czy dane są poprawnie załadowane
                const allAnchorsInfo = (data || []).map({
                    "FunnelBuilder.useCallback[loadCommentCounts].allAnchorsInfo": (t)=>{
                        const anchors = t.comment_anchors;
                        const anchor = Array.isArray(anchors) ? anchors[0] : anchors;
                        return {
                            threadId: t.id,
                            anchorType: anchor?.anchor_type,
                            anchorId: anchor?.anchor_id,
                            anchorIdType: typeof anchor?.anchor_id,
                            anchorIdValue: anchor?.anchor_id,
                            status: t.status,
                            isOpen: t.status !== 'Zatwierdzone' && t.status !== 'Odrzucone',
                            fullAnchor: anchor
                        };
                    }
                }["FunnelBuilder.useCallback[loadCommentCounts].allAnchorsInfo"]);
                console.log('=== DEBUG: Załadowane liczniki komentarzy ===');
                console.log('Total threads:', data?.length || 0);
                console.log('Node counts:', Array.from(nodeCounts.entries()));
                console.log('Edge counts:', Array.from(edgeCounts.entries()));
                console.log('All anchors info (szczegóły):', JSON.stringify(allAnchorsInfo, null, 2));
                console.log('Nodes with comments:', Array.from(nodeCounts.keys()));
                console.log('Edges with comments:', Array.from(edgeCounts.keys()));
                // Sprawdź, które wątki są pomijane i dlaczego
                (data || []).forEach({
                    "FunnelBuilder.useCallback[loadCommentCounts]": (thread)=>{
                        const anchors = thread.comment_anchors;
                        const anchor = Array.isArray(anchors) ? anchors[0] : anchors;
                        if (!anchor || !anchor.anchor_type) {
                            console.warn('⚠️ Thread bez anchor:', thread.id);
                        } else if (anchor.anchor_type === 'region') {
                            console.log('ℹ️ Thread dla regionu (pomijany):', thread.id);
                        } else if (anchor.anchor_type === 'node' && !anchor.anchor_id) {
                            console.warn('⚠️ Thread dla node bez anchor_id:', thread.id, anchor);
                        } else if (anchor.anchor_type === 'edge' && !anchor.anchor_id) {
                            console.warn('⚠️ Thread dla edge bez anchor_id:', thread.id, anchor);
                        } else if (thread.status === 'Zatwierdzone' || thread.status === 'Odrzucone') {
                            console.log('ℹ️ Thread zamknięty (pomijany):', thread.id, thread.status);
                        }
                    }
                }["FunnelBuilder.useCallback[loadCommentCounts]"]);
            } catch (error) {
                console.error('Błąd ładowania liczby wątków:', error);
            }
        }
    }["FunnelBuilder.useCallback[loadCommentCounts]"], [
        id
    ]);
    // Load funnel data and custom templates
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FunnelBuilder.useEffect": ()=>{
            if (id && user) {
                loadFunnel();
                loadCustomTemplates();
                loadCommentCounts();
            }
        }
    }["FunnelBuilder.useEffect"], [
        id,
        user,
        loadCustomTemplates,
        loadCommentCounts
    ]);
    // Ustawienie viewportu po załadowaniu danych (tylko raz)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FunnelBuilder.useEffect": ()=>{
            if (!reactFlowInstance || !funnel || nodes.length === 0 || hasSetInitialViewportRef.current) return;
            // Sprawdź, czy jest przypięty node
            const pinnedNode = nodes.find({
                "FunnelBuilder.useEffect.pinnedNode": (n)=>{
                    if (n.type === 'text') {
                        return n.data.isPinned === true;
                    } else {
                        return n.data.isPinned === true;
                    }
                }
            }["FunnelBuilder.useEffect.pinnedNode"]);
            hasSetInitialViewportRef.current = true;
            if (pinnedNode) {
                // Wyśrodkuj przypięty node
                hasCenteredOnPinnedRef.current = true;
                // Użyj requestAnimationFrame dla szybszego renderowania (zamiast setTimeout)
                const setViewport = {
                    "FunnelBuilder.useEffect.setViewport": ()=>{
                        if (!reactFlowInstance || !reactFlowWrapper.current) {
                            requestAnimationFrame(setViewport);
                            return;
                        }
                        // Sprawdź, czy node rzeczywiście istnieje w aktualnych nodes
                        const currentPinnedNode = nodes.find({
                            "FunnelBuilder.useEffect.setViewport.currentPinnedNode": (n)=>n.id === pinnedNode.id
                        }["FunnelBuilder.useEffect.setViewport.currentPinnedNode"]);
                        if (!currentPinnedNode) {
                            console.warn('Przypięty node nie został znaleziony:', pinnedNode.id);
                            // Fallback: ustaw domyślny viewport
                            reactFlowInstance.setViewport({
                                x: 0,
                                y: 0,
                                zoom: 0.48
                            }, {
                                duration: 0
                            });
                            return;
                        }
                        // Oblicz wymiary noda
                        const width = currentPinnedNode.width || currentPinnedNode.measured?.width || (currentPinnedNode.type === 'text' ? 250 : 150);
                        const height = currentPinnedNode.height || currentPinnedNode.measured?.height || (currentPinnedNode.type === 'text' ? 100 : 80);
                        // Oblicz środek noda w przestrzeni flow
                        const cx = currentPinnedNode.position.x + width / 2;
                        const cy = currentPinnedNode.position.y + height / 2;
                        // Oblicz wymiary kontenera
                        const containerWidth = reactFlowWrapper.current.offsetWidth;
                        const containerHeight = reactFlowWrapper.current.offsetHeight;
                        const zoom = 0.48;
                        // Oblicz pozycję viewport tak, aby środek noda był na środku ekranu
                        const x = containerWidth / 2 - cx * zoom;
                        const y = containerHeight / 2 - cy * zoom;
                        // Ustaw viewport z wyśrodkowanym nodem i zoomem 0.48
                        reactFlowInstance.setViewport({
                            x,
                            y,
                            zoom
                        }, {
                            duration: 200
                        });
                    }
                }["FunnelBuilder.useEffect.setViewport"];
                // Użyj requestAnimationFrame dla natychmiastowego renderowania
                requestAnimationFrame({
                    "FunnelBuilder.useEffect": ()=>{
                        requestAnimationFrame(setViewport);
                    }
                }["FunnelBuilder.useEffect"]);
            } else {
                // Nie ma przypiętego noda - użyj fitView jako domyślny widok
                const setViewport = {
                    "FunnelBuilder.useEffect.setViewport": ()=>{
                        if (!reactFlowInstance) {
                            requestAnimationFrame(setViewport);
                            return;
                        }
                        // Użyj fitView jako domyślny widok
                        reactFlowInstance.fitView({
                            padding: 0.2,
                            duration: 200
                        });
                    }
                }["FunnelBuilder.useEffect.setViewport"];
                // Użyj requestAnimationFrame dla natychmiastowego renderowania
                requestAnimationFrame({
                    "FunnelBuilder.useEffect": ()=>{
                        requestAnimationFrame(setViewport);
                    }
                }["FunnelBuilder.useEffect"]);
            }
        }
    }["FunnelBuilder.useEffect"], [
        reactFlowInstance,
        funnel,
        nodes,
        viewport
    ]);
    // Reset flagi przy załadowaniu nowego lejka
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FunnelBuilder.useEffect": ()=>{
            if (id) {
                hasCenteredOnPinnedRef.current = false;
                hasSetInitialViewportRef.current = false;
            }
        }
    }["FunnelBuilder.useEffect"], [
        id
    ]);
    // Sprawdź, czy są niezapisane zmiany (dirty state)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FunnelBuilder.useEffect": ()=>{
            if (!lastSavedStateRef.current) {
                // Pierwsze załadowanie - zapisz stan jako "zapisany"
                lastSavedStateRef.current = {
                    nodes: JSON.parse(JSON.stringify(nodes)),
                    edges: JSON.parse(JSON.stringify(edges))
                };
                setHasUnsavedChanges(false);
                return;
            }
            // Porównaj aktualny stan z ostatnio zapisanym
            const currentState = JSON.stringify({
                nodes,
                edges
            });
            const savedState = JSON.stringify(lastSavedStateRef.current);
            setHasUnsavedChanges(currentState !== savedState);
        }
    }["FunnelBuilder.useEffect"], [
        nodes,
        edges
    ]);
    // Auto-save on changes - ale NIE podczas edycji w modalu (properties panel)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FunnelBuilder.useEffect": ()=>{
            if (funnel && nodes.length >= 0 && !showPropertiesPanel && !showEdgeProperties) {
                const timeoutId = setTimeout({
                    "FunnelBuilder.useEffect.timeoutId": ()=>{
                        saveFunnel();
                    }
                }["FunnelBuilder.useEffect.timeoutId"], 2000); // Debounce 2 seconds
                return ({
                    "FunnelBuilder.useEffect": ()=>clearTimeout(timeoutId)
                })["FunnelBuilder.useEffect"];
            }
        }
    }["FunnelBuilder.useEffect"], [
        nodes,
        edges,
        funnel,
        showPropertiesPanel,
        showEdgeProperties
    ]);
    // Funkcja kopiowania zaznaczonych nodów i edges
    const handleCopy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FunnelBuilder.useCallback[handleCopy]": ()=>{
            const selectedNodes = nodes.filter({
                "FunnelBuilder.useCallback[handleCopy].selectedNodes": (n)=>n.selected
            }["FunnelBuilder.useCallback[handleCopy].selectedNodes"]);
            if (selectedNodes.length === 0) return;
            // Znajdź edges między zaznaczonymi nodami
            const selectedNodeIds = new Set(selectedNodes.map({
                "FunnelBuilder.useCallback[handleCopy]": (n)=>n.id
            }["FunnelBuilder.useCallback[handleCopy]"]));
            const selectedEdges = edges.filter({
                "FunnelBuilder.useCallback[handleCopy].selectedEdges": (e)=>selectedNodeIds.has(e.source) && selectedNodeIds.has(e.target)
            }["FunnelBuilder.useCallback[handleCopy].selectedEdges"]);
            setCopiedNodes(JSON.parse(JSON.stringify(selectedNodes)));
            setCopiedEdges(JSON.parse(JSON.stringify(selectedEdges)));
        }
    }["FunnelBuilder.useCallback[handleCopy]"], [
        nodes,
        edges
    ]);
    // Funkcja wklejania skopiowanych nodów i edges
    const handlePaste = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FunnelBuilder.useCallback[handlePaste]": ()=>{
            if (copiedNodes.length === 0 || !reactFlowInstance) return;
            pushUndoHistory();
            // Oblicz offset dla nowych nodów (przesuń o 50px w prawo i w dół)
            const offset = {
                x: 50,
                y: 50
            };
            const newNodes = copiedNodes.map({
                "FunnelBuilder.useCallback[handlePaste].newNodes": (node)=>{
                    const newId = `${node.type === 'text' ? 'text-node' : 'node'}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
                    return {
                        ...node,
                        id: newId,
                        selected: false,
                        position: {
                            x: node.position.x + offset.x,
                            y: node.position.y + offset.y
                        }
                    };
                }
            }["FunnelBuilder.useCallback[handlePaste].newNodes"]);
            // Utwórz mapę starych ID -> nowych ID
            const idMap = new Map();
            copiedNodes.forEach({
                "FunnelBuilder.useCallback[handlePaste]": (oldNode, index)=>{
                    idMap.set(oldNode.id, newNodes[index].id);
                }
            }["FunnelBuilder.useCallback[handlePaste]"]);
            // Utwórz nowe edges z nowymi ID
            const newEdges = copiedEdges.map({
                "FunnelBuilder.useCallback[handlePaste].newEdges": (edge)=>{
                    const newId = `edge-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
                    return {
                        ...edge,
                        id: newId,
                        source: idMap.get(edge.source) || edge.source,
                        target: idMap.get(edge.target) || edge.target,
                        selected: false
                    };
                }
            }["FunnelBuilder.useCallback[handlePaste].newEdges"]);
            // Dodaj nowe nody i edges
            setNodes({
                "FunnelBuilder.useCallback[handlePaste]": (nds)=>[
                        ...nds,
                        ...newNodes
                    ]
            }["FunnelBuilder.useCallback[handlePaste]"]);
            setEdges({
                "FunnelBuilder.useCallback[handlePaste]": (eds)=>[
                        ...eds,
                        ...newEdges
                    ]
            }["FunnelBuilder.useCallback[handlePaste]"]);
        }
    }["FunnelBuilder.useCallback[handlePaste]"], [
        copiedNodes,
        copiedEdges,
        reactFlowInstance,
        setNodes,
        setEdges,
        pushUndoHistory
    ]);
    // Obsługa Space (pan), Ctrl/Cmd+Z (cofnij), Ctrl/Cmd+C (kopiuj), Ctrl/Cmd+V (wklej) — pomijamy w polach formularza
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FunnelBuilder.useEffect": ()=>{
            const isFormElement = {
                "FunnelBuilder.useEffect.isFormElement": (el)=>{
                    if (!el || !(el instanceof HTMLElement)) return false;
                    return el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT' || el.isContentEditable === true;
                }
            }["FunnelBuilder.useEffect.isFormElement"];
            const handleKeyDown = {
                "FunnelBuilder.useEffect.handleKeyDown": (e)=>{
                    if (isFormElement(e.target) || isFormElement(document.activeElement)) return;
                    if ((e.metaKey || e.ctrlKey) && e.key === 'z' && !e.shiftKey) {
                        e.preventDefault();
                        handleUndo();
                        return;
                    }
                    if ((e.metaKey || e.ctrlKey) && e.key === 'c') {
                        e.preventDefault();
                        handleCopy();
                        return;
                    }
                    if ((e.metaKey || e.ctrlKey) && e.key === 'v') {
                        e.preventDefault();
                        handlePaste();
                        return;
                    }
                    if (e.code === 'Space' && !e.repeat) {
                        e.preventDefault();
                        setIsSpacePressed(true);
                    }
                }
            }["FunnelBuilder.useEffect.handleKeyDown"];
            const handleKeyUp = {
                "FunnelBuilder.useEffect.handleKeyUp": (e)=>{
                    if (isFormElement(e.target) || isFormElement(document.activeElement)) return;
                    if (e.code === 'Space') {
                        e.preventDefault();
                        setIsSpacePressed(false);
                    }
                }
            }["FunnelBuilder.useEffect.handleKeyUp"];
            window.addEventListener('keydown', handleKeyDown);
            window.addEventListener('keyup', handleKeyUp);
            return ({
                "FunnelBuilder.useEffect": ()=>{
                    window.removeEventListener('keydown', handleKeyDown);
                    window.removeEventListener('keyup', handleKeyUp);
                }
            })["FunnelBuilder.useEffect"];
        }
    }["FunnelBuilder.useEffect"], [
        handleUndo,
        handleCopy,
        handlePaste
    ]);
    // Zapisywanie własnego szablonu
    const saveCustomTemplate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FunnelBuilder.useCallback[saveCustomTemplate]": async (label, icon, color, category)=>{
            if (!user) return;
            try {
                const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('custom_node_templates').insert({
                    created_by: user.id,
                    label,
                    icon,
                    color,
                    category
                });
                if (error) throw error;
                // Przeładuj szablony
                await loadCustomTemplates();
                setAlertModal({
                    isOpen: true,
                    title: 'Sukces',
                    message: 'Szablon został zapisany i dodany do sidebaru!',
                    type: 'success'
                });
            } catch (error) {
                console.error('Błąd zapisywania szablonu:', error);
                setAlertModal({
                    isOpen: true,
                    title: 'Błąd',
                    message: 'Nie udało się zapisać szablonu: ' + (error.message || 'Nieznany błąd'),
                    type: 'error'
                });
            }
        }
    }["FunnelBuilder.useCallback[saveCustomTemplate]"], [
        user,
        loadCustomTemplates
    ]);
    // Ładowanie customowych pól dla wybranego noda
    const loadNodeCustomFields = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FunnelBuilder.useCallback[loadNodeCustomFields]": async (nodeId, funnelId)=>{
            try {
                const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('node_custom_fields').select('*').eq('funnel_id', funnelId).eq('node_id', nodeId).order('display_order', {
                    ascending: true
                });
                if (error) throw error;
                const fields = (data || []).map({
                    "FunnelBuilder.useCallback[loadNodeCustomFields].fields": (f)=>({
                            id: f.id,
                            field_name: f.field_name,
                            field_type: f.field_type,
                            field_value: f.field_value || '',
                            display_order: f.display_order || 0
                        })
                }["FunnelBuilder.useCallback[loadNodeCustomFields].fields"]);
                setNodeCustomFields(fields);
            } catch (error) {
                console.error('Błąd ładowania customowych pól:', error);
            }
        }
    }["FunnelBuilder.useCallback[loadNodeCustomFields]"], []);
    // Zapisywanie customowych pól dla wybranego noda
    const saveNodeCustomFields = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FunnelBuilder.useCallback[saveNodeCustomFields]": async (nodeId, funnelId, fields)=>{
            try {
                // Najpierw usuń wszystkie istniejące pola dla tego noda
                const { error: deleteError } = await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('node_custom_fields').delete().eq('funnel_id', funnelId).eq('node_id', nodeId);
                if (deleteError) throw deleteError;
                // Następnie dodaj nowe pola
                if (fields.length > 0) {
                    const fieldsToInsert = fields.map({
                        "FunnelBuilder.useCallback[saveNodeCustomFields].fieldsToInsert": (f, index)=>({
                                funnel_id: funnelId,
                                node_id: nodeId,
                                field_name: f.field_name,
                                field_type: f.field_type,
                                field_value: f.field_value || '',
                                display_order: index
                            })
                    }["FunnelBuilder.useCallback[saveNodeCustomFields].fieldsToInsert"]);
                    const { error: insertError } = await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('node_custom_fields').insert(fieldsToInsert);
                    if (insertError) throw insertError;
                }
            } catch (error) {
                console.error('Błąd zapisywania customowych pól:', error);
                throw error;
            }
        }
    }["FunnelBuilder.useCallback[saveNodeCustomFields]"], []);
    // Ładowanie customowych pól dla wybranego edge'a
    const loadEdgeCustomFields = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FunnelBuilder.useCallback[loadEdgeCustomFields]": async (edgeId, funnelId)=>{
            try {
                const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('edge_custom_fields').select('*').eq('funnel_id', funnelId).eq('edge_id', edgeId).order('display_order', {
                    ascending: true
                });
                if (error) throw error;
                const fields = (data || []).map({
                    "FunnelBuilder.useCallback[loadEdgeCustomFields].fields": (f)=>({
                            id: f.id,
                            field_name: f.field_name,
                            field_type: f.field_type,
                            field_value: f.field_value || '',
                            display_order: f.display_order || 0
                        })
                }["FunnelBuilder.useCallback[loadEdgeCustomFields].fields"]);
                setEdgeCustomFields(fields);
            } catch (error) {
                console.error('Błąd ładowania customowych pól dla edge:', error);
            }
        }
    }["FunnelBuilder.useCallback[loadEdgeCustomFields]"], []);
    // Zapisywanie customowych pól dla wybranego edge'a
    const saveEdgeCustomFields = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FunnelBuilder.useCallback[saveEdgeCustomFields]": async (edgeId, funnelId, fields)=>{
            try {
                // Najpierw usuń wszystkie istniejące pola dla tego edge'a
                const { error: deleteError } = await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('edge_custom_fields').delete().eq('funnel_id', funnelId).eq('edge_id', edgeId);
                if (deleteError) throw deleteError;
                // Następnie dodaj nowe pola
                if (fields.length > 0) {
                    const fieldsToInsert = fields.map({
                        "FunnelBuilder.useCallback[saveEdgeCustomFields].fieldsToInsert": (f, index)=>({
                                funnel_id: funnelId,
                                edge_id: edgeId,
                                field_name: f.field_name,
                                field_type: f.field_type,
                                field_value: f.field_value || '',
                                display_order: index
                            })
                    }["FunnelBuilder.useCallback[saveEdgeCustomFields].fieldsToInsert"]);
                    const { error: insertError } = await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('edge_custom_fields').insert(fieldsToInsert);
                    if (insertError) throw insertError;
                }
            } catch (error) {
                console.error('Błąd zapisywania customowych pól dla edge:', error);
                throw error;
            }
        }
    }["FunnelBuilder.useCallback[saveEdgeCustomFields]"], []);
    const loadFunnel = async ()=>{
        try {
            setLoading(true);
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('funnel_diagrams').select('*').eq('id', id).single();
            if (error) throw error;
            setFunnel(data);
            // Inicjalizuj editedTitle i editedSubtitle po załadowaniu lejka
            setEditedTitle(data.project_name || '');
            setEditedSubtitle(data.subtitle || '');
            // Jeśli subtitle nie jest jedną z standardowych opcji, ustaw tryb na 'custom'
            const standardSubtitles = [
                'stan obecny',
                'docelowy',
                'Plan 90 dni'
            ];
            if (data.subtitle && !standardSubtitles.includes(data.subtitle)) {
                setSubtitleMode('custom');
            } else {
                setSubtitleMode('select');
            }
            // Load diagram data
            if (data.diagram_data) {
                const diagramData = data.diagram_data;
                // Załaduj customowe pola dla wszystkich nodów
                let loadedNodes = diagramData.nodes || [];
                if (loadedNodes.length > 0 && id) {
                    try {
                        const { data: customFieldsData, error: customFieldsError } = await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('node_custom_fields').select('*').eq('funnel_id', id).order('display_order', {
                            ascending: true
                        });
                        if (!customFieldsError && customFieldsData) {
                            // Grupuj customowe pola według node_id
                            const customFieldsByNodeId = {};
                            customFieldsData.forEach((field)=>{
                                if (!customFieldsByNodeId[field.node_id]) {
                                    customFieldsByNodeId[field.node_id] = [];
                                }
                                customFieldsByNodeId[field.node_id].push({
                                    id: field.id,
                                    field_name: field.field_name,
                                    field_type: field.field_type,
                                    field_value: field.field_value || '',
                                    display_order: field.display_order || 0
                                });
                            });
                            // Dodaj customowe pola do danych każdego noda
                            loadedNodes = loadedNodes.map((node)=>{
                                if (node.type === 'custom' && customFieldsByNodeId[node.id]) {
                                    return {
                                        ...node,
                                        data: {
                                            ...node.data,
                                            customFields: customFieldsByNodeId[node.id]
                                        }
                                    };
                                }
                                return node;
                            });
                        }
                    } catch (error) {
                        console.error('Błąd ładowania customowych pól:', error);
                    }
                }
                if (loadedNodes && Array.isArray(loadedNodes)) {
                    setNodes(loadedNodes);
                }
                if (diagramData.edges && Array.isArray(diagramData.edges)) {
                    setEdges(diagramData.edges);
                }
                // Zapisz viewport z bazy do stanu, żeby użyć go później w useEffect
                if (diagramData.viewport) {
                    setViewport(diagramData.viewport);
                }
                setUndoHistory([]);
                hasSetInitialViewportRef.current = false; // Reset flag przy załadowaniu nowego lejka
                // Zapisz początkowy stan jako "zapisany"
                lastSavedStateRef.current = {
                    nodes: JSON.parse(JSON.stringify(loadedNodes || [])),
                    edges: JSON.parse(JSON.stringify(diagramData.edges || []))
                };
                setHasUnsavedChanges(false);
            }
        } catch (error) {
            console.error('Błąd ładowania lejka:', error);
            setAlertModal({
                isOpen: true,
                title: 'Błąd',
                message: 'Nie udało się załadować lejka: ' + (error.message || 'Nieznany błąd'),
                type: 'error'
            });
        } finally{
            setLoading(false);
        }
    };
    const saveFunnel = async ()=>{
        if (!funnel || !reactFlowInstance) return;
        try {
            setSaving(true);
            const viewport = reactFlowInstance.getViewport();
            const diagramData = {
                nodes,
                edges,
                viewport
            };
            const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('funnel_diagrams').update({
                diagram_data: diagramData,
                project_name: editedTitle,
                subtitle: editedSubtitle,
                updated_at: new Date().toISOString()
            }).eq('id', funnel.id);
            if (error) throw error;
            // Po udanym zapisie, zaktualizuj ostatnio zapisany stan
            lastSavedStateRef.current = {
                nodes: JSON.parse(JSON.stringify(nodes)),
                edges: JSON.parse(JSON.stringify(edges))
            };
            setHasUnsavedChanges(false);
        } catch (error) {
            console.error('Błąd zapisywania lejka:', error);
        // Don't show error modal for auto-save failures
        } finally{
            setSaving(false);
        }
    };
    const onConnect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FunnelBuilder.useCallback[onConnect]": (params)=>{
            pushUndoHistory();
            const newEdge = {
                ...params,
                id: `edge-${params.source}-${params.target}-${Date.now()}`,
                type: 'custom',
                animated: false,
                style: {
                    stroke: '#fee715',
                    strokeWidth: 2
                },
                markerStart: undefined,
                markerEnd: {
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f40$xyflow$2f$system$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MarkerType"].ArrowClosed,
                    color: '#fee715',
                    orient: 'auto'
                },
                data: {
                    notes: '',
                    link: ''
                }
            };
            setEdges({
                "FunnelBuilder.useCallback[onConnect]": (eds)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f40$xyflow$2f$system$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addEdge"])(newEdge, eds)
            }["FunnelBuilder.useCallback[onConnect]"]);
        }
    }["FunnelBuilder.useCallback[onConnect]"], [
        setEdges,
        pushUndoHistory
    ]);
    const onDragOver = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FunnelBuilder.useCallback[onDragOver]": (event)=>{
            event.preventDefault();
            event.dataTransfer.dropEffect = 'move';
        }
    }["FunnelBuilder.useCallback[onDragOver]"], []);
    const onDrop = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FunnelBuilder.useCallback[onDrop]": (event)=>{
            event.preventDefault();
            if (!reactFlowInstance || !reactFlowWrapper.current) return;
            const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
            const templateData = event.dataTransfer.getData('application/reactflow');
            if (!templateData) return;
            const template = JSON.parse(templateData);
            const position = reactFlowInstance.screenToFlowPosition({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top
            });
            let newNode;
            if (template.type === 'text') {
                // Text node
                newNode = {
                    id: `text-node-${Date.now()}`,
                    type: 'text',
                    position,
                    data: {
                        text: 'Kliknij, aby edytować',
                        fontSize: 18,
                        fontWeight: 'bold',
                        textAlign: 'left',
                        verticalAlign: 'middle',
                        showHandles: false,
                        width: 250,
                        height: 100
                    },
                    style: {
                        width: 250,
                        height: 100
                    }
                };
            } else {
                // Custom node
                newNode = {
                    id: `node-${Date.now()}`,
                    type: template.type || 'custom',
                    position,
                    data: {
                        label: template.isCustom ? 'Własny element' : template.label,
                        icon: template.icon,
                        color: template.color || '#fee71520',
                        notes: '',
                        category: template.category
                    }
                };
            }
            pushUndoHistory();
            setNodes({
                "FunnelBuilder.useCallback[onDrop]": (nds)=>nds.concat(newNode)
            }["FunnelBuilder.useCallback[onDrop]"]);
        }
    }["FunnelBuilder.useCallback[onDrop]"], [
        reactFlowInstance,
        setNodes,
        pushUndoHistory
    ]);
    // Ref do śledzenia czy to jest przeciąganie (drag noda) - box selection działa tylko na pustym tle
    const isDraggingNodeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const onNodeClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FunnelBuilder.useCallback[onNodeClick]": (event, node)=>{
            // W trybie komentarzy: otwórz formularz dodawania komentarza
            if (commentMode) {
                event.preventDefault();
                event.stopPropagation();
                setCommentFormAnchor({
                    type: 'node',
                    id: node.id
                });
                return;
            }
            // W trybie zaznaczania: obsługuj tylko pojedyncze kliknięcia (nie przeciąganie noda)
            // Box selection jest obsługiwane przez React Flow automatycznie poprzez selectionOnDrag
            // Box selection działa TYLKO gdy klikasz na pustym tle (pane), więc onNodeClick nie jest wywoływane podczas box selection
            if (interactionMode === 'select') {
                // Jeśli to było przeciąganie noda (nie box selection), pozwól React Flow obsłużyć to
                if (isDraggingNodeRef.current) {
                    isDraggingNodeRef.current = false;
                    return;
                }
                // Dla pojedynczych kliknięć: ręcznie zarządzaj selekcją (zachowaj poprzednie selekcje)
                event.preventDefault();
                event.stopPropagation();
                // Zapamiętaj poprzednio zaznaczone nody (przed kliknięciem)
                const currentSelectedNodeIds = new Set(nodes.filter({
                    "FunnelBuilder.useCallback[onNodeClick]": (n)=>n.selected
                }["FunnelBuilder.useCallback[onNodeClick]"]).map({
                    "FunnelBuilder.useCallback[onNodeClick]": (n)=>n.id
                }["FunnelBuilder.useCallback[onNodeClick]"]));
                previousSelectedNodeIdsRef.current = currentSelectedNodeIds;
                // Ustaw flagę i intencję selekcji
                isManualSelectionRef.current = true;
                const wasSelected = node.selected;
                pendingSelectionRef.current = {
                    nodeId: node.id,
                    shouldSelect: !wasSelected
                };
                // Zastosuj selekcję natychmiast, zachowując inne selekcje
                setNodes({
                    "FunnelBuilder.useCallback[onNodeClick]": (nds)=>{
                        return nds.map({
                            "FunnelBuilder.useCallback[onNodeClick]": (n)=>{
                                if (n.id === node.id) {
                                    return {
                                        ...n,
                                        selected: !wasSelected
                                    };
                                }
                                // Zachowaj selekcję innych nodów
                                return n;
                            }
                        }["FunnelBuilder.useCallback[onNodeClick]"]);
                    }
                }["FunnelBuilder.useCallback[onNodeClick]"]);
                // Reset flagi po krótkim czasie
                setTimeout({
                    "FunnelBuilder.useCallback[onNodeClick]": ()=>{
                        isManualSelectionRef.current = false;
                        pendingSelectionRef.current = null;
                        previousSelectedNodeIdsRef.current = new Set();
                    }
                }["FunnelBuilder.useCallback[onNodeClick]"], 150);
                // Jeśli odznaczamy node, zamknij panel właściwości jeśli był otwarty
                if (wasSelected && selectedNode?.id === node.id) {
                    setSelectedNode(null);
                    setShowPropertiesPanel(false);
                }
                return;
            }
            setSelectedNode(node);
            setSelectedEdge(null);
            setShowPropertiesPanel(true);
            if (node.type === 'text') {
                const props = {
                    text: node.data.text || '',
                    fontSize: node.data.fontSize || 18,
                    fontWeight: node.data.fontWeight || 'bold',
                    textAlign: node.data.textAlign || 'left',
                    verticalAlign: node.data.verticalAlign || 'middle',
                    showHandles: node.data.showHandles ?? false,
                    isPinned: node.data.isPinned ?? false
                };
                setTextNodeProperties(props);
                lastSavedTextNodePropertiesRef.current = JSON.parse(JSON.stringify(props));
                setHasUnsavedTextNodeChanges(false);
            } else {
                const props = {
                    label: node.data.label || '',
                    icon: node.data.icon || 'FileText',
                    notes: node.data.notes || '',
                    link: node.data.link || '',
                    isPinned: node.data.isPinned ?? false,
                    category: node.data.category
                };
                setNodeProperties(props);
                lastSavedNodePropertiesRef.current = JSON.parse(JSON.stringify(props));
                setHasUnsavedNodeChanges(false);
                // Załaduj customowe pola dla tego noda (z danych noda lub z bazy)
                const customFieldsFromNode = node.data.customFields;
                if (customFieldsFromNode && customFieldsFromNode.length > 0) {
                    setNodeCustomFields(customFieldsFromNode);
                } else if (id) {
                    loadNodeCustomFields(node.id, id);
                } else {
                    setNodeCustomFields([]);
                }
            }
            setShowEdgeProperties(false);
        }
    }["FunnelBuilder.useCallback[onNodeClick]"], [
        interactionMode,
        selectedNode,
        setNodes,
        id,
        loadNodeCustomFields
    ]);
    const onEdgeClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FunnelBuilder.useCallback[onEdgeClick]": (event, edge)=>{
            event.stopPropagation();
            // W trybie komentarzy: otwórz formularz dodawania komentarza
            if (commentMode) {
                setCommentFormAnchor({
                    type: 'edge',
                    id: edge.id
                });
                return;
            }
            setSelectedEdge(edge);
            setSelectedNode(null);
            const props = {
                notes: edge.data?.notes || '',
                link: edge.data?.link || ''
            };
            setEdgeProperties(props);
            lastSavedEdgePropertiesRef.current = JSON.parse(JSON.stringify(props));
            setHasUnsavedEdgeChanges(false);
            setShowEdgeProperties(true);
            setShowPropertiesPanel(false);
            // Załaduj customowe pola dla edge'a
            if (id) {
                loadEdgeCustomFields(edge.id, id);
            }
        }
    }["FunnelBuilder.useCallback[onEdgeClick]"], [
        commentMode,
        id,
        loadEdgeCustomFields
    ]);
    // Obsługa kliknięcia w pustą przestrzeń (pane) - dla komentarzy i deselekcji
    const onPaneClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FunnelBuilder.useCallback[onPaneClick]": (event)=>{
            // W trybie komentarzy: otwórz formularz dodawania komentarza w regionie
            if (commentMode && reactFlowInstance) {
                const point = reactFlowInstance.screenToFlowPosition({
                    x: event.clientX,
                    y: event.clientY
                });
                // Utwórz mały region (50x50px) wokół klikniętego punktu
                setCommentFormAnchor({
                    type: 'region',
                    coords: {
                        x: point.x,
                        y: point.y,
                        width: 50,
                        height: 50
                    }
                });
                return;
            }
            // W trybie select: deselekcja wszystkich elementów przy kliknięciu w pustą przestrzeń
            if (interactionMode === 'select') {
                setNodes({
                    "FunnelBuilder.useCallback[onPaneClick]": (nds)=>nds.map({
                            "FunnelBuilder.useCallback[onPaneClick]": (n)=>({
                                    ...n,
                                    selected: false
                                })
                        }["FunnelBuilder.useCallback[onPaneClick]"])
                }["FunnelBuilder.useCallback[onPaneClick]"]);
                setEdges({
                    "FunnelBuilder.useCallback[onPaneClick]": (eds)=>eds.map({
                            "FunnelBuilder.useCallback[onPaneClick]": (e)=>({
                                    ...e,
                                    selected: false
                                })
                        }["FunnelBuilder.useCallback[onPaneClick]"])
                }["FunnelBuilder.useCallback[onPaneClick]"]);
                setSelectedNode(null);
                setSelectedEdge(null);
                setShowPropertiesPanel(false);
                setShowEdgeProperties(false);
            }
        }
    }["FunnelBuilder.useCallback[onPaneClick]"], [
        commentMode,
        interactionMode,
        reactFlowInstance,
        setNodes,
        setEdges
    ]);
    const onLongPressDeselect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FunnelBuilder.useCallback[onLongPressDeselect]": (nodeId)=>{
        // Nie używamy już long press - funkcja pozostaje dla kompatybilności, ale nie jest używana
        // Toggle odbywa się przez onNodeClick
        }
    }["FunnelBuilder.useCallback[onLongPressDeselect]"], []);
    const wrappedOnNodesChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FunnelBuilder.useCallback[wrappedOnNodesChange]": (changes)=>{
            if (changes.some({
                "FunnelBuilder.useCallback[wrappedOnNodesChange]": (c)=>c.type === 'remove'
            }["FunnelBuilder.useCallback[wrappedOnNodesChange]"])) pushUndoHistory();
            // W trybie select: obsłuż selekcję specjalnie
            if (interactionMode === 'select') {
                const selectChanges = changes.filter({
                    "FunnelBuilder.useCallback[wrappedOnNodesChange].selectChanges": (c)=>c.type === 'select'
                }["FunnelBuilder.useCallback[wrappedOnNodesChange].selectChanges"]);
                // Jeśli ręcznie zarządzamy selekcją (pojedyncze kliknięcie w onNodeClick), CAŁKOWICIE zablokuj zmiany selekcji z React Flow
                if (isManualSelectionRef.current && selectChanges.length > 0) {
                    // onNodeClick już obsłużył selekcję ręcznie - CAŁKOWICIE zignoruj zmiany selekcji z React Flow
                    const otherChanges = changes.filter({
                        "FunnelBuilder.useCallback[wrappedOnNodesChange].otherChanges": (c)=>c.type !== 'select'
                    }["FunnelBuilder.useCallback[wrappedOnNodesChange].otherChanges"]);
                    if (otherChanges.length > 0) {
                        onNodesChange(otherChanges);
                    }
                    // Nie pozwalaj React Flow zmieniać selekcji - całkowicie zablokuj
                    return;
                }
                // Box selection: wiele zmian selekcji jednocześnie - ręcznie zastosuj selekcję
                // (React Flow nie zastosuje selekcji automatycznie, gdy elementsSelectable=false)
                if (selectChanges.length > 1) {
                    isManualSelectionRef.current = false; // Box selection nie jest ręcznym zarządzaniem
                    pendingSelectionRef.current = null;
                    previousSelectedNodeIdsRef.current = new Set();
                    // Zastosuj inne zmiany (pozycja, rozmiar itp.)
                    const otherChanges = changes.filter({
                        "FunnelBuilder.useCallback[wrappedOnNodesChange].otherChanges": (c)=>c.type !== 'select'
                    }["FunnelBuilder.useCallback[wrappedOnNodesChange].otherChanges"]);
                    if (otherChanges.length > 0) {
                        onNodesChange(otherChanges);
                    }
                    // Ręcznie zastosuj selekcję dla wszystkich nodów w zmianach
                    setNodes({
                        "FunnelBuilder.useCallback[wrappedOnNodesChange]": (nds)=>{
                            return nds.map({
                                "FunnelBuilder.useCallback[wrappedOnNodesChange]": (n)=>{
                                    const selectChange = selectChanges.find({
                                        "FunnelBuilder.useCallback[wrappedOnNodesChange].selectChange": (c)=>'id' in c && c.id === n.id
                                    }["FunnelBuilder.useCallback[wrappedOnNodesChange].selectChange"]);
                                    if (selectChange && 'selected' in selectChange) {
                                        return {
                                            ...n,
                                            selected: selectChange.selected
                                        };
                                    }
                                    return n;
                                }
                            }["FunnelBuilder.useCallback[wrappedOnNodesChange]"]);
                        }
                    }["FunnelBuilder.useCallback[wrappedOnNodesChange]"]);
                    return;
                }
            }
            // Dla wszystkich innych przypadków: normalne przetwarzanie
            onNodesChange(changes);
        }
    }["FunnelBuilder.useCallback[wrappedOnNodesChange]"], [
        interactionMode,
        onNodesChange,
        pushUndoHistory,
        setNodes
    ]);
    const wrappedOnEdgesChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FunnelBuilder.useCallback[wrappedOnEdgesChange]": (changes)=>{
            if (changes.some({
                "FunnelBuilder.useCallback[wrappedOnEdgesChange]": (c)=>c.type === 'remove'
            }["FunnelBuilder.useCallback[wrappedOnEdgesChange]"])) pushUndoHistory();
            onEdgesChange(changes);
        }
    }["FunnelBuilder.useCallback[wrappedOnEdgesChange]"], [
        onEdgesChange,
        pushUndoHistory
    ]);
    // W trybie select: obserwuj zmiany selekcji i przywracaj poprzednie selekcje, jeśli React Flow je zresetował
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FunnelBuilder.useEffect": ()=>{
            if (interactionMode !== 'select' || isRestoringSelectionRef.current || !isManualSelectionRef.current || !pendingSelectionRef.current) {
                return;
            }
            const pending = pendingSelectionRef.current;
            const previousSelected = previousSelectedNodeIdsRef.current;
            // Sprawdź, czy selekcja została nieprawidłowo zresetowana
            const currentSelectedNodeIds = new Set(nodes.filter({
                "FunnelBuilder.useEffect": (n)=>n.selected
            }["FunnelBuilder.useEffect"]).map({
                "FunnelBuilder.useEffect": (n)=>n.id
            }["FunnelBuilder.useEffect"]));
            const clickedNode = nodes.find({
                "FunnelBuilder.useEffect.clickedNode": (n)=>n.id === pending.nodeId
            }["FunnelBuilder.useEffect.clickedNode"]);
            // Jeśli kliknięty node nie ma poprawnej selekcji lub inne nody zostały odznaczone
            const shouldRestore = clickedNode && clickedNode.selected !== pending.shouldSelect || previousSelected.size > 0 && Array.from(previousSelected).some({
                "FunnelBuilder.useEffect": (id)=>id !== pending.nodeId && !currentSelectedNodeIds.has(id)
            }["FunnelBuilder.useEffect"]);
            if (shouldRestore) {
                isRestoringSelectionRef.current = true;
                setNodes({
                    "FunnelBuilder.useEffect": (nds)=>{
                        return nds.map({
                            "FunnelBuilder.useEffect": (n)=>{
                                // Zastosuj intencję dla klikniętego noda
                                if (n.id === pending.nodeId) {
                                    return {
                                        ...n,
                                        selected: pending.shouldSelect
                                    };
                                }
                                // Przywróć selekcję innych nodów, które były wcześniej zaznaczone
                                if (previousSelected.has(n.id)) {
                                    return {
                                        ...n,
                                        selected: true
                                    };
                                }
                                return n;
                            }
                        }["FunnelBuilder.useEffect"]);
                    }
                }["FunnelBuilder.useEffect"]);
                // Reset flagi po krótkim czasie
                setTimeout({
                    "FunnelBuilder.useEffect": ()=>{
                        isRestoringSelectionRef.current = false;
                    }
                }["FunnelBuilder.useEffect"], 50);
            }
        }
    }["FunnelBuilder.useEffect"], [
        nodes,
        interactionMode,
        setNodes
    ]);
    // Podgląd dynamiczny: aktualizuj selectedNode na żywo podczas edycji właściwości tekstu
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FunnelBuilder.useEffect": ()=>{
            if (selectedNode && selectedNode.type === 'text' && showPropertiesPanel) {
                setNodes({
                    "FunnelBuilder.useEffect": (nds)=>nds.map({
                            "FunnelBuilder.useEffect": (node)=>{
                                if (node.id === selectedNode.id) {
                                    return {
                                        ...node,
                                        data: {
                                            ...node.data,
                                            ...textNodeProperties
                                        }
                                    };
                                }
                                return node;
                            }
                        }["FunnelBuilder.useEffect"])
                }["FunnelBuilder.useEffect"]);
            }
        }
    }["FunnelBuilder.useEffect"], [
        textNodeProperties,
        selectedNode,
        showPropertiesPanel,
        setNodes
    ]);
    // Zapisz width i height do data dla text nodes po zmianie rozmiaru (używamy setTimeout, żeby uniknąć pętli)
    const prevNodesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(nodes);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FunnelBuilder.useEffect": ()=>{
            const hasChanged = nodes.some({
                "FunnelBuilder.useEffect.hasChanged": (node, idx)=>{
                    if (node.type === 'text') {
                        const prevNode = prevNodesRef.current[idx];
                        if (!prevNode || prevNode.id !== node.id) return false;
                        const widthChanged = node.width !== prevNode.width;
                        const heightChanged = node.height !== prevNode.height;
                        if (widthChanged || heightChanged) {
                            return true;
                        }
                    }
                    return false;
                }
            }["FunnelBuilder.useEffect.hasChanged"]);
            if (hasChanged) {
                setNodes({
                    "FunnelBuilder.useEffect": (nds)=>nds.map({
                            "FunnelBuilder.useEffect": (node)=>{
                                if (node.type === 'text' && (node.width || node.height)) {
                                    const currentWidth = node.width || node.data.width;
                                    const currentHeight = node.height || node.data.height;
                                    if (currentWidth !== node.data.width || currentHeight !== node.data.height) {
                                        return {
                                            ...node,
                                            data: {
                                                ...node.data,
                                                width: currentWidth,
                                                height: currentHeight
                                            }
                                        };
                                    }
                                }
                                return node;
                            }
                        }["FunnelBuilder.useEffect"])
                }["FunnelBuilder.useEffect"]);
            }
            prevNodesRef.current = nodes;
        }
    }["FunnelBuilder.useEffect"], [
        nodes,
        setNodes
    ]);
    // Sprawdź, czy są niezapisane zmiany w panelach właściwości
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FunnelBuilder.useEffect": ()=>{
            if (!selectedNode) {
                setHasUnsavedNodeChanges(false);
                setHasUnsavedTextNodeChanges(false);
                return;
            }
            if (selectedNode.type === 'text') {
                if (!lastSavedTextNodePropertiesRef.current) {
                    setHasUnsavedTextNodeChanges(false);
                    return;
                }
                const current = JSON.stringify(textNodeProperties);
                const saved = JSON.stringify(lastSavedTextNodePropertiesRef.current);
                setHasUnsavedTextNodeChanges(current !== saved);
            } else {
                if (!lastSavedNodePropertiesRef.current) {
                    setHasUnsavedNodeChanges(false);
                    return;
                }
                const current = JSON.stringify(nodeProperties);
                const saved = JSON.stringify(lastSavedNodePropertiesRef.current);
                setHasUnsavedNodeChanges(current !== saved);
            }
        }
    }["FunnelBuilder.useEffect"], [
        nodeProperties,
        textNodeProperties,
        selectedNode
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FunnelBuilder.useEffect": ()=>{
            if (!selectedEdge) {
                setHasUnsavedEdgeChanges(false);
                return;
            }
            if (!lastSavedEdgePropertiesRef.current) {
                setHasUnsavedEdgeChanges(false);
                return;
            }
            const current = JSON.stringify(edgeProperties);
            const saved = JSON.stringify(lastSavedEdgePropertiesRef.current);
            setHasUnsavedEdgeChanges(current !== saved);
        }
    }["FunnelBuilder.useEffect"], [
        edgeProperties,
        selectedEdge
    ]);
    const updateNodeProperties = async ()=>{
        if (!selectedNode || !id) return;
        pushUndoHistory();
        // Jeśli zaznaczamy isPinned: true, ustaw isPinned: false dla wszystkich innych nodów
        const isPinning = (selectedNode.type === 'text' ? textNodeProperties.isPinned : nodeProperties.isPinned) === true;
        setNodes((nds)=>nds.map((node)=>{
                if (node.id === selectedNode.id) {
                    if (node.type === 'text') {
                        return {
                            ...node,
                            data: {
                                ...node.data,
                                ...textNodeProperties
                            }
                        };
                    } else {
                        return {
                            ...node,
                            data: {
                                ...node.data,
                                ...nodeProperties,
                                customFields: nodeCustomFields.length > 0 ? nodeCustomFields : undefined
                            }
                        };
                    }
                } else if (isPinning) {
                    // Odznacz wszystkie inne nody, jeśli przypinamy ten
                    return {
                        ...node,
                        data: {
                            ...node.data,
                            isPinned: false
                        }
                    };
                }
                return node;
            }));
        // Zapisz customowe pola do bazy (tylko dla custom nodes) - zawsze, nawet jeśli puste (żeby usunąć stare)
        if (selectedNode.type === 'custom') {
            try {
                await saveNodeCustomFields(selectedNode.id, id, nodeCustomFields);
            } catch (error) {
                console.error('Błąd zapisywania customowych pól:', error);
            }
        }
        // Reset dirty state po zapisaniu
        if (selectedNode.type === 'text') {
            lastSavedTextNodePropertiesRef.current = JSON.parse(JSON.stringify(textNodeProperties));
            setHasUnsavedTextNodeChanges(false);
        } else {
            lastSavedNodePropertiesRef.current = JSON.parse(JSON.stringify(nodeProperties));
            setHasUnsavedNodeChanges(false);
        }
        setSelectedNode(null);
        setShowPropertiesPanel(false);
    };
    const deleteSelectedNode = ()=>{
        if (!selectedNode) return;
        pushUndoHistory();
        setNodes((nds)=>nds.filter((node)=>node.id !== selectedNode.id));
        setEdges((eds)=>eds.filter((edge)=>edge.source !== selectedNode.id && edge.target !== selectedNode.id));
        setSelectedNode(null);
        setShowPropertiesPanel(false);
    };
    const updateEdgeProperties = async ()=>{
        if (!selectedEdge || !id) return;
        pushUndoHistory();
        // Zapisz customowe pola do bazy - zawsze, nawet jeśli puste (żeby usunąć stare)
        try {
            await saveEdgeCustomFields(selectedEdge.id, id, edgeCustomFields);
        } catch (error) {
            console.error('Błąd zapisywania customowych pól dla edge:', error);
        }
        setEdges((eds)=>eds.map((edge)=>edge.id === selectedEdge.id ? {
                    ...edge,
                    data: {
                        ...edge.data,
                        ...edgeProperties,
                        customFields: edgeCustomFields.length > 0 ? edgeCustomFields : undefined
                    },
                    label: edgeProperties.notes ? edgeProperties.notes : undefined
                } : edge));
        setSelectedEdge(null);
        setShowEdgeProperties(false);
    };
    const deleteSelectedEdge = ()=>{
        if (!selectedEdge) return;
        pushUndoHistory();
        setEdges((eds)=>eds.filter((edge)=>edge.id !== selectedEdge.id));
        setSelectedEdge(null);
        setShowEdgeProperties(false);
    };
    // Wymiary nodów (używane w alignNodes i liniach pomocniczych)
    const getNodeDimensions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FunnelBuilder.useCallback[getNodeDimensions]": (node)=>{
            const width = node.width || node.measured?.width || 150;
            const height = node.height || node.measured?.height || 80;
            return {
                width,
                height
            };
        }
    }["FunnelBuilder.useCallback[getNodeDimensions]"], []);
    // Funkcje wyrównywania — np. "top" = wszystkie górne krawędzie na tej samej wysokości (min Y)
    const alignNodes = (direction)=>{
        const selectedNodes = nodes.filter((node)=>node.selected);
        if (selectedNodes.length < 2) {
            setAlertModal({
                isOpen: true,
                title: 'Wymagane zaznaczenie',
                message: 'Zaznacz co najmniej 2 elementy (Ctrl+Click lub przeciągnij myszką), aby je wyrównać.',
                type: 'info'
            });
            return;
        }
        let updatedNodes = [
            ...nodes
        ];
        if (direction === 'left') {
            const minX = Math.min(...selectedNodes.map((n)=>n.position.x));
            updatedNodes = updatedNodes.map((node)=>selectedNodes.find((sn)=>sn.id === node.id) ? {
                    ...node,
                    position: {
                        ...node.position,
                        x: minX
                    }
                } : node);
        } else if (direction === 'right') {
            const maxX = Math.max(...selectedNodes.map((n)=>{
                const dims = getNodeDimensions(n);
                return n.position.x + dims.width;
            }));
            updatedNodes = updatedNodes.map((node)=>{
                const selected = selectedNodes.find((sn)=>sn.id === node.id);
                if (selected) {
                    const dims = getNodeDimensions(node);
                    return {
                        ...node,
                        position: {
                            ...node.position,
                            x: maxX - dims.width
                        }
                    };
                }
                return node;
            });
        } else if (direction === 'top') {
            const minY = Math.min(...selectedNodes.map((n)=>n.position.y));
            updatedNodes = updatedNodes.map((node)=>selectedNodes.find((sn)=>sn.id === node.id) ? {
                    ...node,
                    position: {
                        ...node.position,
                        y: minY
                    }
                } : node);
        } else if (direction === 'bottom') {
            const maxY = Math.max(...selectedNodes.map((n)=>{
                const dims = getNodeDimensions(n);
                return n.position.y + dims.height;
            }));
            updatedNodes = updatedNodes.map((node)=>{
                const selected = selectedNodes.find((sn)=>sn.id === node.id);
                if (selected) {
                    const dims = getNodeDimensions(node);
                    return {
                        ...node,
                        position: {
                            ...node.position,
                            y: maxY - dims.height
                        }
                    };
                }
                return node;
            });
        } else if (direction === 'center-x') {
            const centerX = selectedNodes.reduce((sum, n)=>{
                const dims = getNodeDimensions(n);
                return sum + n.position.x + dims.width / 2;
            }, 0) / selectedNodes.length;
            updatedNodes = updatedNodes.map((node)=>{
                const selected = selectedNodes.find((sn)=>sn.id === node.id);
                if (selected) {
                    const dims = getNodeDimensions(node);
                    return {
                        ...node,
                        position: {
                            ...node.position,
                            x: centerX - dims.width / 2
                        }
                    };
                }
                return node;
            });
        } else if (direction === 'center-y') {
            const centerY = selectedNodes.reduce((sum, n)=>{
                const dims = getNodeDimensions(n);
                return sum + n.position.y + dims.height / 2;
            }, 0) / selectedNodes.length;
            updatedNodes = updatedNodes.map((node)=>{
                const selected = selectedNodes.find((sn)=>sn.id === node.id);
                if (selected) {
                    const dims = getNodeDimensions(node);
                    return {
                        ...node,
                        position: {
                            ...node.position,
                            y: centerY - dims.height / 2
                        }
                    };
                }
                return node;
            });
        } else if (direction === 'distribute-x') {
            const sorted = [
                ...selectedNodes
            ].sort((a, b)=>a.position.x - b.position.x);
            const firstDims = getNodeDimensions(sorted[0]);
            const lastDims = getNodeDimensions(sorted[sorted.length - 1]);
            const totalWidth = sorted[sorted.length - 1].position.x + lastDims.width - sorted[0].position.x;
            const step = totalWidth / (sorted.length - 1);
            sorted.forEach((node, idx)=>{
                if (idx > 0 && idx < sorted.length - 1) {
                    const nodeIndex = updatedNodes.findIndex((n)=>n.id === node.id);
                    if (nodeIndex !== -1) {
                        updatedNodes[nodeIndex] = {
                            ...updatedNodes[nodeIndex],
                            position: {
                                ...updatedNodes[nodeIndex].position,
                                x: sorted[0].position.x + step * idx
                            }
                        };
                    }
                }
            });
        } else if (direction === 'distribute-y') {
            const sorted = [
                ...selectedNodes
            ].sort((a, b)=>a.position.y - b.position.y);
            const firstDims = getNodeDimensions(sorted[0]);
            const lastDims = getNodeDimensions(sorted[sorted.length - 1]);
            const totalHeight = sorted[sorted.length - 1].position.y + lastDims.height - sorted[0].position.y;
            const step = totalHeight / (sorted.length - 1);
            sorted.forEach((node, idx)=>{
                if (idx > 0 && idx < sorted.length - 1) {
                    const nodeIndex = updatedNodes.findIndex((n)=>n.id === node.id);
                    if (nodeIndex !== -1) {
                        updatedNodes[nodeIndex] = {
                            ...updatedNodes[nodeIndex],
                            position: {
                                ...updatedNodes[nodeIndex].position,
                                y: sorted[0].position.y + step * idx
                            }
                        };
                    }
                }
            });
        }
        pushUndoHistory();
        setNodes(updatedNodes);
    };
    // Połącz standardowe szablony z własnymi
    const allTemplates = [
        ...nodeTemplates,
        ...customTemplates
    ];
    const groupedTemplates = allTemplates.reduce((acc, template)=>{
        if (!acc[template.category]) {
            acc[template.category] = [];
        }
        acc[template.category].push(template);
        return acc;
    }, {});
    // Sortuj elementy w każdej kategorii - "Inne" na końcu
    Object.keys(groupedTemplates).forEach((category)=>{
        groupedTemplates[category].sort((a, b)=>{
            if (a.label === 'Inne') return 1;
            if (b.label === 'Inne') return -1;
            return 0;
        });
    });
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$LoadingState$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LoadingState"], {
            variant: "fullscreen",
            label: "Ładowanie lejka…"
        }, void 0, false, {
            fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
            lineNumber: 2528,
            columnNumber: 12
        }, ("TURBOPACK compile-time value", void 0));
    }
    if (!funnel) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-screen bg-[#101820] flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center text-white",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-lg mb-4",
                        children: "Lejek nie został znaleziony"
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                        lineNumber: 2535,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>navigate('/admin/marketing'),
                        className: "px-5 py-2.5 bg-[#fee715]/10 border border-[#fee715]/50 text-[#fee715] rounded-lg font-medium hover:bg-[#fee715]/20 hover:border-[#fee715]/70 transition-all duration-200",
                        children: "Wróć do listy"
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                        lineNumber: 2536,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 2534,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
            lineNumber: 2533,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-screen bg-[#101820] flex flex-col relative",
        children: [
            !showHeader && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setShowHeader(true),
                className: "fixed top-2 left-2 z-50 p-2 bg-[#18232F]/95 border border-[#fee715]/30 text-[#fee715] rounded-lg hover:bg-[#fee715]/10 hover:border-[#fee715]/50 transition-all duration-200 shadow-lg backdrop-blur-sm",
                title: "Pokaż nagłówek",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-5 h-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M4 6h16M4 12h16M4 18h16"
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                        lineNumber: 2557,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                    lineNumber: 2556,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 2551,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#18232F] transition-all duration-300 ${showHeader ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden border-0'}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>navigate('/admin/marketing'),
                                className: "p-2 hover:bg-white/10 rounded-lg transition-all",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-6 h-6 text-white",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M10 19l-7-7m0 0l7-7m-7 7h18"
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                        lineNumber: 2570,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                    lineNumber: 2569,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                lineNumber: 2565,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1",
                                children: [
                                    !isEditingTitle ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "font-[Montserrat] text-xl font-bold text-white cursor-pointer hover:text-[#fee715] transition-colors",
                                        onClick: ()=>{
                                            setIsEditingTitle(true);
                                            setEditedTitle(funnel.project_name || '');
                                        },
                                        title: "Kliknij, aby edytować tytuł",
                                        children: [
                                            "Mapa marketingu - ",
                                            funnel.project_name || 'Bez nazwy'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                        lineNumber: 2575,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: editedTitle,
                                        onChange: (e)=>setEditedTitle(e.target.value),
                                        onBlur: async ()=>{
                                            setIsEditingTitle(false);
                                            if (editedTitle !== funnel.project_name && funnel) {
                                                try {
                                                    const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('funnel_diagrams').update({
                                                        project_name: editedTitle
                                                    }).eq('id', funnel.id);
                                                    if (error) throw error;
                                                    setFunnel({
                                                        ...funnel,
                                                        project_name: editedTitle
                                                    });
                                                } catch (error) {
                                                    console.error('Błąd zapisywania tytułu:', error);
                                                    setEditedTitle(funnel.project_name || '');
                                                }
                                            }
                                        },
                                        onKeyDown: (e)=>{
                                            if (e.key === 'Enter') {
                                                e.currentTarget.blur();
                                            }
                                            if (e.key === 'Escape') {
                                                setEditedTitle(funnel.project_name || '');
                                                setIsEditingTitle(false);
                                            }
                                        },
                                        className: "font-[Montserrat] text-xl font-bold text-white bg-white/10 border border-[#fee715]/50 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 w-full max-w-md",
                                        autoFocus: true
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                        lineNumber: 2586,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    !isEditingSubtitle ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "inline-flex items-center px-3 py-1 rounded-md bg-white/[0.04] border border-white/10 text-xs font-medium text-gray-300 cursor-pointer hover:bg-white/[0.06] hover:border-white/20 hover:text-white transition-all mt-0.5",
                                        onClick: ()=>{
                                            setIsEditingSubtitle(true);
                                            setEditedSubtitle(funnel.subtitle || '');
                                            // Ustaw tryb na podstawie aktualnego podtytułu
                                            const standardSubtitles = [
                                                'stan obecny',
                                                'docelowy',
                                                'Plan 90 dni'
                                            ];
                                            if (funnel.subtitle && standardSubtitles.includes(funnel.subtitle)) {
                                                setSubtitleMode('select');
                                            } else {
                                                setSubtitleMode('custom');
                                            }
                                        },
                                        title: "Kliknij, aby edytować podtytuł",
                                        children: funnel.subtitle || 'Kliknij, aby dodać podtytuł'
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                        lineNumber: 2620,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-1 flex items-center gap-2",
                                        children: [
                                            subtitleMode === 'select' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$CustomSelect$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CustomSelect"], {
                                                value: editedSubtitle || '',
                                                onChange: async (value)=>{
                                                    if (value === 'custom') {
                                                        setSubtitleMode('custom');
                                                        setEditedSubtitle('');
                                                    } else {
                                                        setEditedSubtitle(value);
                                                        // Automatycznie zapisz gdy wybierzesz opcję z listy
                                                        if (funnel && value !== funnel.subtitle) {
                                                            try {
                                                                const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('funnel_diagrams').update({
                                                                    subtitle: value
                                                                }).eq('id', funnel.id);
                                                                if (error) throw error;
                                                                setFunnel({
                                                                    ...funnel,
                                                                    subtitle: value
                                                                });
                                                                setIsEditingSubtitle(false);
                                                            } catch (error) {
                                                                console.error('Błąd zapisywania podtytułu:', error);
                                                            }
                                                        } else {
                                                            setIsEditingSubtitle(false);
                                                        }
                                                    }
                                                },
                                                options: [
                                                    {
                                                        value: 'stan obecny',
                                                        label: 'stan obecny'
                                                    },
                                                    {
                                                        value: 'docelowy',
                                                        label: 'docelowy'
                                                    },
                                                    {
                                                        value: 'Plan 90 dni',
                                                        label: 'Plan 90 dni'
                                                    },
                                                    {
                                                        value: 'custom',
                                                        label: 'Własny tekst...'
                                                    }
                                                ],
                                                placeholder: "Wybierz podtytuł",
                                                className: "w-48",
                                                size: "sm"
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                lineNumber: 2640,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                value: editedSubtitle,
                                                onChange: (e)=>setEditedSubtitle(e.target.value),
                                                placeholder: "Wpisz własny podtytuł",
                                                className: "text-sm bg-white/10 border border-[#fee715]/50 rounded px-2 py-1 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 w-48",
                                                autoFocus: true
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                lineNumber: 2677,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: async ()=>{
                                                    if (funnel) {
                                                        const subtitleToSave = editedSubtitle.trim() || null;
                                                        try {
                                                            const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('funnel_diagrams').update({
                                                                subtitle: subtitleToSave
                                                            }).eq('id', funnel.id);
                                                            if (error) throw error;
                                                            // Zaktualizuj stan funnel z zapisanym podtytułem
                                                            setFunnel({
                                                                ...funnel,
                                                                subtitle: subtitleToSave
                                                            });
                                                            // Jeśli wpisany tekst jest standardowy, wróć do trybu select
                                                            const standardSubtitles = [
                                                                'stan obecny',
                                                                'docelowy',
                                                                'Plan 90 dni'
                                                            ];
                                                            if (subtitleToSave && standardSubtitles.includes(subtitleToSave)) {
                                                                setSubtitleMode('select');
                                                            }
                                                            setIsEditingSubtitle(false);
                                                        } catch (error) {
                                                            console.error('Błąd zapisywania podtytułu:', error);
                                                            // W przypadku błędu, przywróć poprzednią wartość
                                                            setEditedSubtitle(funnel.subtitle || '');
                                                            setIsEditingSubtitle(false);
                                                        }
                                                    } else {
                                                        setIsEditingSubtitle(false);
                                                    }
                                                },
                                                className: "px-2 py-1 text-xs bg-[#fee715]/10 border border-[#fee715]/50 text-[#fee715] rounded hover:bg-[#fee715]/20 transition-colors",
                                                children: "✓"
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                lineNumber: 2686,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    setEditedSubtitle(funnel.subtitle || '');
                                                    setIsEditingSubtitle(false);
                                                    const standardSubtitles = [
                                                        'stan obecny',
                                                        'docelowy',
                                                        'Plan 90 dni'
                                                    ];
                                                    if (funnel.subtitle && standardSubtitles.includes(funnel.subtitle)) {
                                                        setSubtitleMode('select');
                                                    } else if (funnel.subtitle) {
                                                        setSubtitleMode('custom');
                                                    }
                                                },
                                                className: "px-2 py-1 text-xs bg-white/10 border border-white/20 text-white/70 rounded hover:bg-white/20 transition-colors",
                                                title: "Anuluj",
                                                children: "×"
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                lineNumber: 2718,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                        lineNumber: 2638,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                lineNumber: 2573,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                        lineNumber: 2564,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setShowHeader(false),
                                className: "p-1.5 hover:bg-white/10 rounded-lg transition-all text-gray-400 hover:text-white",
                                title: "Ukryj nagłówek",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-5 h-5",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M6 18L18 6M6 6l12 12"
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                        lineNumber: 2745,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                    lineNumber: 2744,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                lineNumber: 2739,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            saving && user?.email === 'stanislaw@drozniak.com' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm text-gray-400 flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "w-4 h-4 animate-spin",
                                        fill: "none",
                                        stroke: "currentColor",
                                        viewBox: "0 0 24 24",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                            d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                        }, void 0, false, {
                                            fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                            lineNumber: 2751,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                        lineNumber: 2750,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    "Zapisuję..."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                lineNumber: 2749,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleUndo,
                                disabled: undoHistory.length === 0,
                                title: "Cofnij ostatnią zmianę (Ctrl+Z)",
                                className: "px-4 py-2 bg-white/[0.06] border border-white/20 text-white/90 rounded-lg font-medium hover:bg-white/10 hover:border-white/30 transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white/[0.06] disabled:hover:border-white/20",
                                children: "Wstecz"
                            }, void 0, false, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                lineNumber: 2756,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    setShowCommentPanel(!showCommentPanel);
                                    if (!showCommentPanel) {
                                        loadCommentCounts();
                                    }
                                },
                                className: `px-4 py-2 rounded-lg font-medium transition-colors ${showCommentPanel ? 'bg-[#fee715]/10 border border-[#fee715]/50 text-[#fee715]' : 'bg-white/[0.06] border border-white/20 text-white/90 hover:bg-white/10'}`,
                                title: "Komentarze",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$ChatCircleDots$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChatCircleDots$3e$__["ChatCircleDots"], {
                                        size: 18,
                                        className: "inline-block mr-1.5"
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                        lineNumber: 2778,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    "Komentarze"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                lineNumber: 2764,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: saveFunnel,
                                className: "relative px-5 py-2 bg-[#fee715]/10 border border-[#fee715]/50 text-[#fee715] rounded-lg font-medium hover:bg-[#fee715]/20 hover:border-[#fee715]/70 transition-all duration-200",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        "Zapisz zmiany",
                                        hasUnsavedChanges && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "w-2 h-2 bg-[#fee715] rounded-full animate-pulse",
                                            title: "Masz niezapisane zmiany"
                                        }, void 0, false, {
                                            fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                            lineNumber: 2788,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                    lineNumber: 2785,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                lineNumber: 2781,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                        lineNumber: 2738,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 2563,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            !showSidebar && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setShowSidebar(true),
                className: `fixed z-50 p-2 bg-[#0a0f14]/95 border border-[#fee715]/30 text-[#fee715] rounded-lg hover:bg-[#fee715]/10 hover:border-[#fee715]/50 transition-all duration-200 shadow-lg backdrop-blur-sm ${!showHeader ? 'top-14 left-2' : 'top-2 left-2'}`,
                title: "Pokaż panel elementów",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-5 h-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M4 6h16M4 12h16M4 18h16"
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                        lineNumber: 2803,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                    lineNumber: 2802,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 2797,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex overflow-hidden relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `transition-all duration-300 overflow-hidden funnel-builder-sidebar ${showSidebar ? 'w-64 opacity-100' : 'w-0 opacity-0'}`,
                        style: {
                            backgroundColor: '#0a0f14',
                            background: '#0a0f14'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-64 h-full border-r-2 border-[#fee715]/30 overflow-y-auto p-4 shadow-2xl",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between mb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-[Montserrat] font-medium text-[#fee715] text-base tracking-tight border-b border-[#fee715]/20 pb-2.5 flex-1",
                                            children: "Elementy"
                                        }, void 0, false, {
                                            fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                            lineNumber: 2821,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setShowSidebar(false),
                                            className: "p-1.5 hover:bg-white/10 rounded-lg transition-all text-gray-400 hover:text-white ml-2",
                                            title: "Ukryj panel elementów",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "w-4 h-4",
                                                fill: "none",
                                                stroke: "currentColor",
                                                viewBox: "0 0 24 24",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M6 18L18 6M6 6l12 12"
                                                }, void 0, false, {
                                                    fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                    lineNumber: 2828,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                lineNumber: 2827,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                            lineNumber: 2822,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                    lineNumber: 2820,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-6",
                                    children: Object.entries(groupedTemplates).map(([category, templates])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    className: "text-xs font-medium text-[#fee715] uppercase mb-3 tracking-wider px-2",
                                                    children: category
                                                }, void 0, false, {
                                                    fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                    lineNumber: 2835,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-2",
                                                    children: templates.map((template, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            draggable: true,
                                                            onDragStart: (event)=>{
                                                                event.dataTransfer.setData('application/reactflow', JSON.stringify(template));
                                                            },
                                                            className: "p-3 bg-[#18232F]/90 rounded-lg border border-white/10 hover:border-[#fee715]/40 cursor-move transition-all duration-200 shadow-sm hover:shadow-lg hover:shadow-[#fee715]/10 backdrop-blur-sm relative overflow-hidden group",
                                                            style: {
                                                                background: 'linear-gradient(to bottom, rgba(24, 35, 47, 0.9), rgba(24, 35, 47, 0.9))'
                                                            },
                                                            onMouseEnter: (e)=>{
                                                                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(254, 231, 21, 0.08) 0%, rgba(24, 35, 47, 0.95) 50%, rgba(254, 231, 21, 0.05) 100%)';
                                                            },
                                                            onMouseLeave: (e)=>{
                                                                e.currentTarget.style.background = 'linear-gradient(to bottom, rgba(24, 35, 47, 0.9), rgba(24, 35, 47, 0.9))';
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2 relative z-10",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-white",
                                                                        children: renderPhosphorIcon(template.icon, 18)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                        lineNumber: 2856,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-sm text-white/95 font-medium tracking-tight",
                                                                        children: template.label
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                        lineNumber: 2859,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                lineNumber: 2855,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, idx, false, {
                                                            fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                            lineNumber: 2838,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)))
                                                }, void 0, false, {
                                                    fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                    lineNumber: 2836,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, category, true, {
                                            fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                            lineNumber: 2834,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)))
                                }, void 0, false, {
                                    fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                    lineNumber: 2832,
                                    columnNumber: 11
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                            lineNumber: 2819,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                        lineNumber: 2810,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 relative",
                        ref: reactFlowWrapper,
                        children: [
                            showLegend && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute top-4 right-4 z-20 bg-[#0a0f14]/98 border border-white/10 rounded-lg shadow-xl backdrop-blur-sm p-4 min-w-[200px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between mb-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-xs font-medium text-white/90 tracking-tight",
                                                children: "Legenda"
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                lineNumber: 2876,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setShowLegend(false),
                                                className: "p-1 hover:bg-white/10 rounded transition-all text-gray-400 hover:text-white",
                                                title: "Ukryj legendę",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    className: "w-4 h-4",
                                                    fill: "none",
                                                    stroke: "currentColor",
                                                    viewBox: "0 0 24 24",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        strokeWidth: 2,
                                                        d: "M6 18L18 6M6 6l12 12"
                                                    }, void 0, false, {
                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                        lineNumber: 2883,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                    lineNumber: 2882,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                lineNumber: 2877,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                        lineNumber: 2875,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-3 text-xs",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-start gap-2.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "relative shrink-0 mt-0.5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-6 h-6 rounded-lg flex items-center justify-center text-white",
                                                                style: {
                                                                    backgroundColor: '#4285F420'
                                                                },
                                                                children: renderPhosphorIcon('MegaphoneSimple', 14)
                                                            }, void 0, false, {
                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                lineNumber: 2890,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-[#0a0f14]",
                                                                style: {
                                                                    backgroundColor: '#4285F4'
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                lineNumber: 2893,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                        lineNumber: 2889,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-white/90 font-medium",
                                                                children: "Źródła Ruchu"
                                                            }, void 0, false, {
                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                lineNumber: 2896,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-white/50 text-[10px] mt-0.5",
                                                                children: "Facebook Ads, Google Ads, Email"
                                                            }, void 0, false, {
                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                lineNumber: 2897,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                        lineNumber: 2895,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                lineNumber: 2888,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-start gap-2.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "relative shrink-0 mt-0.5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-6 h-6 rounded-lg flex items-center justify-center text-white",
                                                                style: {
                                                                    backgroundColor: '#00C9A720'
                                                                },
                                                                children: renderPhosphorIcon('Globe', 14)
                                                            }, void 0, false, {
                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                lineNumber: 2902,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-[#0a0f14]",
                                                                style: {
                                                                    backgroundColor: '#00C9A7'
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                lineNumber: 2905,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                        lineNumber: 2901,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-white/90 font-medium",
                                                                children: "Typ Strony"
                                                            }, void 0, false, {
                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                lineNumber: 2908,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-white/50 text-[10px] mt-0.5",
                                                                children: "Landing, Sprzedażowa, Checkout"
                                                            }, void 0, false, {
                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                lineNumber: 2909,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                        lineNumber: 2907,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                lineNumber: 2900,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-start gap-2.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "relative shrink-0 mt-0.5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-6 h-6 rounded-lg flex items-center justify-center text-white",
                                                                style: {
                                                                    backgroundColor: '#fee71520'
                                                                },
                                                                children: renderPhosphorIcon('Notebook', 14)
                                                            }, void 0, false, {
                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                lineNumber: 2914,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-[#0a0f14]",
                                                                style: {
                                                                    backgroundColor: '#fee715'
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                lineNumber: 2917,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                        lineNumber: 2913,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-white/90 font-medium",
                                                                children: "Działania"
                                                            }, void 0, false, {
                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                lineNumber: 2920,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-white/50 text-[10px] mt-0.5",
                                                                children: "Lead magnet, Webinar, Chatbot"
                                                            }, void 0, false, {
                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                lineNumber: 2921,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                        lineNumber: 2919,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                lineNumber: 2912,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-start gap-2.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "relative shrink-0 mt-0.5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-6 h-6 rounded-lg flex items-center justify-center text-white",
                                                                style: {
                                                                    backgroundColor: '#10B98120'
                                                                },
                                                                children: renderPhosphorIcon('CheckCircle', 14)
                                                            }, void 0, false, {
                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                lineNumber: 2926,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-[#0a0f14]",
                                                                style: {
                                                                    backgroundColor: '#10B981'
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                lineNumber: 2929,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                        lineNumber: 2925,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-white/90 font-medium",
                                                                children: "Cel/Konwersja"
                                                            }, void 0, false, {
                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                lineNumber: 2932,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-white/50 text-[10px] mt-0.5",
                                                                children: "Lead, Rezerwacja, Telefon, Sprzedaż"
                                                            }, void 0, false, {
                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                lineNumber: 2933,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                        lineNumber: 2931,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                lineNumber: 2924,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-start gap-2.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "relative shrink-0 mt-0.5",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-6 h-6 rounded-lg flex items-center justify-center text-white bg-white/5 border border-white/10",
                                                            children: renderPhosphorIcon('FileText', 14)
                                                        }, void 0, false, {
                                                            fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                            lineNumber: 2938,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                        lineNumber: 2937,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-white/90 font-medium",
                                                                children: "Narzędzia"
                                                            }, void 0, false, {
                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                lineNumber: 2943,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-white/50 text-[10px] mt-0.5",
                                                                children: "Pola tekstowe, notatki"
                                                            }, void 0, false, {
                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                lineNumber: 2944,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                        lineNumber: 2942,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                lineNumber: 2936,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                        lineNumber: 2887,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                lineNumber: 2874,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            !showLegend && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setShowLegend(true),
                                className: "absolute top-4 right-4 z-20 p-2 bg-[#0a0f14]/95 border border-white/10 text-white/70 rounded-lg hover:bg-white/10 hover:text-white transition-all duration-200 shadow-lg backdrop-blur-sm",
                                title: "Pokaż legendę",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-4 h-4",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                        lineNumber: 2957,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                    lineNumber: 2956,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                lineNumber: 2951,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FunnelSelectModeContext.Provider, {
                                value: {
                                    isSelectMode: interactionMode === 'select',
                                    onLongPressDeselect
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f40$xyflow$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ReactFlow"], {
                                    nodes: nodes.map((node)=>{
                                        const commentInfo = nodeCommentCounts.get(node.id);
                                        if (commentInfo && commentInfo.count > 0) {
                                            const updatedNode = {
                                                ...node,
                                                data: {
                                                    ...node.data,
                                                    commentCount: commentInfo.count,
                                                    commentStatus: commentInfo.status
                                                }
                                            };
                                            // Debug: sprawdź czy dane są poprawnie przypisane
                                            if (node.id === nodes[0]?.id) {
                                                console.log('Przykładowy node z komentarzami:', {
                                                    nodeId: updatedNode.id,
                                                    commentCount: updatedNode.data.commentCount,
                                                    commentStatus: updatedNode.data.commentStatus,
                                                    hasBadge: updatedNode.data.commentCount !== undefined && updatedNode.data.commentCount > 0
                                                });
                                            }
                                            return updatedNode;
                                        }
                                        // Upewnij się, że commentCount jest undefined jeśli nie ma komentarzy
                                        return {
                                            ...node,
                                            data: {
                                                ...node.data,
                                                commentCount: undefined,
                                                commentStatus: undefined
                                            }
                                        };
                                    }),
                                    edges: edges.map((edge)=>{
                                        const commentInfo = edgeCommentCounts.get(edge.id);
                                        if (commentInfo && commentInfo.count > 0) {
                                            return {
                                                ...edge,
                                                data: {
                                                    ...edge.data,
                                                    commentCount: commentInfo.count,
                                                    commentStatus: commentInfo.status
                                                }
                                            };
                                        }
                                        // Upewnij się, że commentCount jest undefined jeśli nie ma komentarzy
                                        return {
                                            ...edge,
                                            data: {
                                                ...edge.data,
                                                commentCount: undefined,
                                                commentStatus: undefined
                                            }
                                        };
                                    }),
                                    onNodesChange: wrappedOnNodesChange,
                                    onEdgesChange: wrappedOnEdgesChange,
                                    onConnect: onConnect,
                                    onNodeDragStart: (_, node)=>{
                                        isDraggingNodeRef.current = true;
                                        pushUndoHistory();
                                    },
                                    isValidConnection: ()=>true,
                                    onInit: setReactFlowInstance,
                                    onDrop: onDrop,
                                    onDragOver: onDragOver,
                                    onNodeClick: onNodeClick,
                                    onEdgeClick: onEdgeClick,
                                    onPaneClick: onPaneClick,
                                    onSelectionChange: (params)=>{
                                        // W trybie select: ręcznie zarządzamy selekcją, więc ignorujemy ten callback
                                        // Box selection jest obsługiwane przez wrappedOnNodesChange
                                        if (interactionMode === 'select' && isManualSelectionRef.current) {
                                            return;
                                        }
                                    },
                                    onViewportChange: (vp)=>{
                                        setViewport(vp);
                                        setCurrentZoom(vp.zoom);
                                    },
                                    onNodeDrag: (_, node, allNodes)=>{
                                        const others = allNodes.filter((n)=>n.id !== node.id);
                                        if (others.length === 0) {
                                            setAlignmentGuides({
                                                vertical: [],
                                                horizontal: []
                                            });
                                            return;
                                        }
                                        const d = getNodeDimensions(node);
                                        const left = node.position.x, cX = node.position.x + d.width / 2, right = node.position.x + d.width;
                                        const top = node.position.y, cY = node.position.y + d.height / 2, bottom = node.position.y + d.height;
                                        const vSet = new Set(), hSet = new Set();
                                        const T = 5;
                                        others.forEach((o)=>{
                                            const od = getNodeDimensions(o);
                                            const oL = o.position.x, oCX = o.position.x + od.width / 2, oR = o.position.x + od.width;
                                            const oT = o.position.y, oCY = o.position.y + od.height / 2, oB = o.position.y + od.height;
                                            if (Math.abs(left - oL) <= T || Math.abs(cX - oL) <= T || Math.abs(right - oL) <= T) vSet.add(oL);
                                            if (Math.abs(left - oCX) <= T || Math.abs(cX - oCX) <= T || Math.abs(right - oCX) <= T) vSet.add(oCX);
                                            if (Math.abs(left - oR) <= T || Math.abs(cX - oR) <= T || Math.abs(right - oR) <= T) vSet.add(oR);
                                            if (Math.abs(top - oT) <= T || Math.abs(cY - oT) <= T || Math.abs(bottom - oT) <= T) hSet.add(oT);
                                            if (Math.abs(top - oCY) <= T || Math.abs(cY - oCY) <= T || Math.abs(bottom - oCY) <= T) hSet.add(oCY);
                                            if (Math.abs(top - oB) <= T || Math.abs(cY - oB) <= T || Math.abs(bottom - oB) <= T) hSet.add(oB);
                                        });
                                        setAlignmentGuides({
                                            vertical: Array.from(vSet),
                                            horizontal: Array.from(hSet)
                                        });
                                    },
                                    onNodeDragStop: (_, node)=>{
                                        const d = getNodeDimensions(node);
                                        const T = 5;
                                        let newX = node.position.x, newY = node.position.y;
                                        for (const g of alignmentGuides.vertical){
                                            const dl = Math.abs(node.position.x - g), dc = Math.abs(node.position.x + d.width / 2 - g), dr = Math.abs(node.position.x + d.width - g);
                                            if (dl <= T) {
                                                newX = g;
                                                break;
                                            }
                                            if (dc <= T) {
                                                newX = g - d.width / 2;
                                                break;
                                            }
                                            if (dr <= T) {
                                                newX = g - d.width;
                                                break;
                                            }
                                        }
                                        for (const g of alignmentGuides.horizontal){
                                            const dt = Math.abs(node.position.y - g), dc = Math.abs(node.position.y + d.height / 2 - g), db = Math.abs(node.position.y + d.height - g);
                                            if (dt <= T) {
                                                newY = g;
                                                break;
                                            }
                                            if (dc <= T) {
                                                newY = g - d.height / 2;
                                                break;
                                            }
                                            if (db <= T) {
                                                newY = g - d.height;
                                                break;
                                            }
                                        }
                                        if (newX !== node.position.x || newY !== node.position.y) {
                                            setNodes((nds)=>nds.map((n)=>n.id === node.id ? {
                                                        ...n,
                                                        position: {
                                                            x: newX,
                                                            y: newY
                                                        }
                                                    } : n));
                                        }
                                        setAlignmentGuides({
                                            vertical: [],
                                            horizontal: []
                                        });
                                    },
                                    nodeTypes: nodeTypes,
                                    edgeTypes: edgeTypes,
                                    fitView: true,
                                    fitViewOptions: {
                                        padding: 0.2,
                                        duration: 0
                                    },
                                    className: `bg-[#101820] ${interactionMode === 'select' ? 'funnel-select-mode' : ''}`,
                                    connectionLineType: "smoothstep",
                                    snapToGrid: true,
                                    snapGrid: [
                                        20,
                                        20
                                    ],
                                    connectionLineStyle: {
                                        stroke: '#fee715',
                                        strokeWidth: 2,
                                        strokeDasharray: '5,5'
                                    },
                                    defaultEdgeOptions: {
                                        type: 'custom',
                                        animated: false,
                                        style: {
                                            stroke: '#fee715',
                                            strokeWidth: 2
                                        },
                                        markerStart: undefined,
                                        markerEnd: {
                                            type: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f40$xyflow$2f$system$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MarkerType"].ArrowClosed,
                                            color: '#fee715',
                                            orient: 'auto'
                                        }
                                    },
                                    nodesDraggable: true,
                                    nodesConnectable: true,
                                    nodesFocusable: true,
                                    elementsSelectable: interactionMode !== 'select',
                                    selectNodesOnDrag: false,
                                    panOnDrag: interactionMode === 'pan' ? true : isSpacePressed ? [
                                        1,
                                        2
                                    ] : false,
                                    panOnScroll: true,
                                    zoomOnScroll: true,
                                    zoomOnPinch: true,
                                    zoomOnDoubleClick: false,
                                    preventScrolling: false,
                                    selectionOnDrag: interactionMode === 'select',
                                    selectionMode: "full",
                                    multiSelectionKeyCode: null,
                                    deleteKeyCode: [
                                        'Delete',
                                        'Backspace'
                                    ],
                                    connectionMode: "loose",
                                    connectionRadius: 80,
                                    minZoom: 0.01,
                                    maxZoom: 10,
                                    proOptions: {
                                        hideAttribution: true
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f40$xyflow$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Background"], {
                                            variant: __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f40$xyflow$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BackgroundVariant"].Dots,
                                            gap: 20,
                                            size: 1.5,
                                            color: "#ffffff25",
                                            style: {
                                                opacity: 0.6
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                            lineNumber: 3122,
                                            columnNumber: 13
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        !showBottomToolbar && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f40$xyflow$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Panel"], {
                                            position: "bottom-left",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setShowBottomToolbar(true),
                                                className: "p-2 bg-[#0a0f14]/95 border border-[#fee715]/30 text-[#fee715] rounded-lg hover:bg-[#fee715]/10 hover:border-[#fee715]/50 transition-all duration-200 shadow-lg backdrop-blur-sm",
                                                title: "Pokaż narzędzia",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    className: "w-5 h-5",
                                                    fill: "none",
                                                    stroke: "currentColor",
                                                    viewBox: "0 0 24 24",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            strokeWidth: 2,
                                                            d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                                        }, void 0, false, {
                                                            fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                            lineNumber: 3138,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            strokeWidth: 2,
                                                            d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                        }, void 0, false, {
                                                            fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                            lineNumber: 3139,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                    lineNumber: 3137,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                lineNumber: 3132,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                            lineNumber: 3131,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        showBottomToolbar && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f40$xyflow$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Panel"], {
                                            position: "bottom-left",
                                            className: "bg-[#0a0f14]/95 border border-amber-500/20 rounded-lg p-2 shadow-xl backdrop-blur-sm",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setShowBottomToolbar(false),
                                                        className: "p-1.5 hover:bg-white/10 rounded-lg transition-all text-gray-400 hover:text-white",
                                                        title: "Ukryj narzędzia",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            className: "w-4 h-4",
                                                            fill: "none",
                                                            stroke: "currentColor",
                                                            viewBox: "0 0 24 24",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                strokeLinecap: "round",
                                                                strokeLinejoin: "round",
                                                                strokeWidth: 2,
                                                                d: "M6 18L18 6M6 6l12 12"
                                                            }, void 0, false, {
                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                lineNumber: 3156,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                            lineNumber: 3155,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                        lineNumber: 3150,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-1 border-r border-[#fee715]/20 pr-2 mr-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs text-amber-400/90 font-medium mr-1",
                                                                children: "Tryb:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                lineNumber: 3162,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>setInteractionMode('pan'),
                                                                className: `p-2 rounded-lg transition-all duration-200 ${interactionMode === 'pan' ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-md shadow-amber-900/20' : 'bg-[#18232F]/80 text-white/80 hover:bg-amber-500/10 hover:text-white border border-white/10 hover:border-amber-500/50 backdrop-blur-sm'}`,
                                                                title: "Przesuwanie (Space + drag lub środkowy przycisk myszy)",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Hand$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Hand$3e$__["Hand"], {
                                                                    size: 16
                                                                }, void 0, false, {
                                                                    fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                    lineNumber: 3172,
                                                                    columnNumber: 21
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                lineNumber: 3163,
                                                                columnNumber: 19
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>setInteractionMode('select'),
                                                                className: `p-2 rounded-lg transition-all duration-200 ${interactionMode === 'select' ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-md shadow-amber-900/20' : 'bg-[#18232F]/80 text-white/80 hover:bg-amber-500/10 hover:text-white border border-white/10 hover:border-amber-500/50 backdrop-blur-sm'}`,
                                                                title: "Zaznaczanie elementów: Klikaj elementy lub przeciągnij po pustym tle (box selection)",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                    className: "w-4 h-4",
                                                                    fill: "none",
                                                                    stroke: "currentColor",
                                                                    viewBox: "0 0 24 24",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                        strokeLinecap: "round",
                                                                        strokeLinejoin: "round",
                                                                        strokeWidth: 2,
                                                                        d: "M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                        lineNumber: 3184,
                                                                        columnNumber: 23
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                    lineNumber: 3183,
                                                                    columnNumber: 21
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                lineNumber: 3174,
                                                                columnNumber: 19
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>{
                                                                    setCommentMode(!commentMode);
                                                                    setInteractionMode(commentMode ? 'pan' : 'comment');
                                                                },
                                                                className: `p-2 rounded-lg transition-all duration-200 ${commentMode ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-md shadow-amber-900/20' : 'bg-[#18232F]/80 text-white/80 hover:bg-amber-500/10 hover:text-white border border-white/10 hover:border-amber-500/50 backdrop-blur-sm'}`,
                                                                title: "Dodaj komentarz (kliknij na element)",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$ChatCircleDots$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChatCircleDots$3e$__["ChatCircleDots"], {
                                                                    size: 16
                                                                }, void 0, false, {
                                                                    fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                    lineNumber: 3199,
                                                                    columnNumber: 21
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                lineNumber: 3187,
                                                                columnNumber: 19
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                        lineNumber: 3161,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>reactFlowInstance?.zoomOut({
                                                                        duration: 300
                                                                    }),
                                                                className: "p-2 bg-[#18232F]/80 border border-white/10 hover:border-amber-500/50 hover:bg-amber-500/10 rounded-lg transition-all duration-200 text-white/80 hover:text-white backdrop-blur-sm",
                                                                title: "Oddal (Zoom Out)",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                    className: "w-4 h-4",
                                                                    fill: "none",
                                                                    stroke: "currentColor",
                                                                    viewBox: "0 0 24 24",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                        strokeLinecap: "round",
                                                                        strokeLinejoin: "round",
                                                                        strokeWidth: 2,
                                                                        d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                        lineNumber: 3211,
                                                                        columnNumber: 23
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                    lineNumber: 3210,
                                                                    columnNumber: 21
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                lineNumber: 3205,
                                                                columnNumber: 19
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>reactFlowInstance?.zoomIn({
                                                                        duration: 300
                                                                    }),
                                                                className: "p-2 bg-[#18232F]/80 border border-white/10 hover:border-amber-500/50 hover:bg-amber-500/10 rounded-lg transition-all duration-200 text-white/80 hover:text-white backdrop-blur-sm",
                                                                title: "Przybliż (Zoom In)",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                    className: "w-4 h-4",
                                                                    fill: "none",
                                                                    stroke: "currentColor",
                                                                    viewBox: "0 0 24 24",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                        strokeLinecap: "round",
                                                                        strokeLinejoin: "round",
                                                                        strokeWidth: 2,
                                                                        d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                        lineNumber: 3220,
                                                                        columnNumber: 23
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                    lineNumber: 3219,
                                                                    columnNumber: 21
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                lineNumber: 3214,
                                                                columnNumber: 19
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>reactFlowInstance?.fitView({
                                                                        duration: 300,
                                                                        padding: 0.2
                                                                    }),
                                                                className: "p-2 bg-[#18232F]/80 border border-white/10 hover:border-amber-500/50 hover:bg-amber-500/10 rounded-lg transition-all duration-200 text-white/80 hover:text-white backdrop-blur-sm",
                                                                title: "Dopasuj do widoku (Fit View)",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                    className: "w-4 h-4",
                                                                    fill: "none",
                                                                    stroke: "currentColor",
                                                                    viewBox: "0 0 24 24",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                        strokeLinecap: "round",
                                                                        strokeLinejoin: "round",
                                                                        strokeWidth: 2,
                                                                        d: "M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                        lineNumber: 3229,
                                                                        columnNumber: 23
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                    lineNumber: 3228,
                                                                    columnNumber: 21
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                lineNumber: 3223,
                                                                columnNumber: 19
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "px-2 text-xs text-amber-400/90 font-medium border-l border-amber-500/20 ml-2 pl-2",
                                                                children: [
                                                                    (currentZoom * 100).toFixed(0),
                                                                    "%"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                lineNumber: 3232,
                                                                columnNumber: 19
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                        lineNumber: 3204,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                lineNumber: 3148,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                            lineNumber: 3147,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        showMinimap && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute bottom-4 right-4 z-10",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setShowMinimap(false),
                                                        className: "absolute -top-2 -right-2 z-20 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg transition-all",
                                                        title: "Zamknij podgląd",
                                                        children: "×"
                                                    }, void 0, false, {
                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                        lineNumber: 3242,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f40$xyflow$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["MiniMap"], {
                                                        className: "bg-[#18232F] border-2 border-[#fee715] rounded-lg shadow-2xl",
                                                        nodeColor: "#fee715",
                                                        nodeStrokeColor: "#101820",
                                                        nodeStrokeWidth: 2,
                                                        maskColor: "rgba(16, 24, 32, 0.9)",
                                                        style: {
                                                            backgroundColor: '#18232F'
                                                        },
                                                        pannable: true,
                                                        zoomable: true
                                                    }, void 0, false, {
                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                        lineNumber: 3249,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                lineNumber: 3241,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                            lineNumber: 3240,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        !showMinimap && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setShowMinimap(true),
                                            className: "absolute bottom-4 right-4 z-10 px-4 py-2 bg-[#fee715]/10 border border-[#fee715]/40 text-[#fee715] rounded-lg font-medium hover:bg-[#fee715]/20 hover:border-[#fee715]/60 transition-all duration-200",
                                            title: "Pokaż podgląd",
                                            children: "↑ Podgląd"
                                        }, void 0, false, {
                                            fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                            lineNumber: 3265,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        showAlignToolbar && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f40$xyflow$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Panel"], {
                                            position: "top-center",
                                            className: "bg-transparent",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-1.5 bg-[#0a0f14]/95 border border-white/10 rounded-lg p-1.5 shadow-xl backdrop-blur-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>alignNodes('center-y'),
                                                        className: "p-1.5 bg-[#18232F]/80 border border-white/10 hover:border-[#fee715]/50 hover:bg-[#fee715]/10 rounded transition-all duration-200 text-white/80 hover:text-white",
                                                        title: "Wyrównaj w pionie (ta sama wysokość Y)",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            className: "w-4 h-4",
                                                            fill: "none",
                                                            stroke: "currentColor",
                                                            viewBox: "0 0 24 24",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                strokeLinecap: "round",
                                                                strokeLinejoin: "round",
                                                                strokeWidth: 2,
                                                                d: "M4 12h16M4 12l4-4m-4 4l4 4m12-4l-4-4m4 4l-4 4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                lineNumber: 3283,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                            lineNumber: 3282,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                        lineNumber: 3277,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>alignNodes('center-x'),
                                                        className: "p-1.5 bg-[#18232F]/80 border border-white/10 hover:border-[#fee715]/50 hover:bg-[#fee715]/10 rounded transition-all duration-200 text-white/80 hover:text-white",
                                                        title: "Wyrównaj w poziomie (ta sama pozycja X)",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            className: "w-4 h-4",
                                                            fill: "none",
                                                            stroke: "currentColor",
                                                            viewBox: "0 0 24 24",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                strokeLinecap: "round",
                                                                strokeLinejoin: "round",
                                                                strokeWidth: 2,
                                                                d: "M12 4v16M12 4l-4 4m4-4l4 4m-4 12l-4-4m4 4l4-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                lineNumber: 3292,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                            lineNumber: 3291,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                        lineNumber: 3286,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-px h-4 bg-white/10 mx-0.5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                        lineNumber: 3295,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setShowAlignToolbar(false),
                                                        className: "p-1.5 bg-[#18232F]/80 border border-white/10 hover:border-white/30 hover:bg-white/10 rounded transition-all duration-200 text-white/60 hover:text-white",
                                                        title: "Ukryj panel",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            className: "w-3.5 h-3.5",
                                                            fill: "none",
                                                            stroke: "currentColor",
                                                            viewBox: "0 0 24 24",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                strokeLinecap: "round",
                                                                strokeLinejoin: "round",
                                                                strokeWidth: 2,
                                                                d: "M6 18L18 6M6 6l12 12"
                                                            }, void 0, false, {
                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                lineNumber: 3302,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                            lineNumber: 3301,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                        lineNumber: 3296,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                lineNumber: 3276,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                            lineNumber: 3275,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        !showAlignToolbar && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f40$xyflow$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Panel"], {
                                            position: "top-center",
                                            className: "bg-transparent",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setShowAlignToolbar(true),
                                                className: "p-2 bg-[#0a0f14]/95 border border-white/10 text-white/60 rounded-lg hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-200 shadow-lg backdrop-blur-sm",
                                                title: "Pokaż wyrównywanie",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    className: "w-4 h-4",
                                                    fill: "none",
                                                    stroke: "currentColor",
                                                    viewBox: "0 0 24 24",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        strokeWidth: 2,
                                                        d: "M4 6h16M4 12h16M4 18h16"
                                                    }, void 0, false, {
                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                        lineNumber: 3317,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                    lineNumber: 3316,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                lineNumber: 3311,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                            lineNumber: 3310,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                    lineNumber: 2962,
                                    columnNumber: 11
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                lineNumber: 2961,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            (alignmentGuides.vertical.length > 0 || alignmentGuides.horizontal.length > 0) && flowContainerSize.w > 0 && flowContainerSize.h > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 0,
                                    width: '100%',
                                    height: '100%',
                                    pointerEvents: 'none',
                                    zIndex: 10
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    width: "100%",
                                    height: "100%",
                                    viewBox: `0 0 ${flowContainerSize.w} ${flowContainerSize.h}`,
                                    preserveAspectRatio: "none",
                                    children: [
                                        alignmentGuides.vertical.map((x)=>{
                                            const sx = x * viewport.zoom + viewport.x;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                x1: sx,
                                                y1: 0,
                                                x2: sx,
                                                y2: flowContainerSize.h,
                                                stroke: "#fee715",
                                                strokeOpacity: 0.8,
                                                strokeWidth: 1
                                            }, `v-${x}`, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                lineNumber: 3330,
                                                columnNumber: 26
                                            }, ("TURBOPACK compile-time value", void 0));
                                        }),
                                        alignmentGuides.horizontal.map((y)=>{
                                            const sy = y * viewport.zoom + viewport.y;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                x1: 0,
                                                y1: sy,
                                                x2: flowContainerSize.w,
                                                y2: sy,
                                                stroke: "#fee715",
                                                strokeOpacity: 0.8,
                                                strokeWidth: 1
                                            }, `h-${y}`, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                lineNumber: 3334,
                                                columnNumber: 26
                                            }, ("TURBOPACK compile-time value", void 0));
                                        })
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                    lineNumber: 3327,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                lineNumber: 3326,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                        lineNumber: 2871,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    showEdgeProperties && selectedEdge && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-72 border-l border-white/10 p-4 overflow-y-auto bg-[#0a0f14]/98 nodrag nopan",
                        onKeyDown: (e)=>{
                            if ([
                                'INPUT',
                                'TEXTAREA',
                                'SELECT'
                            ].includes(e.target?.tagName)) e.stopPropagation();
                        },
                        onKeyUp: (e)=>{
                            if ([
                                'INPUT',
                                'TEXTAREA',
                                'SELECT'
                            ].includes(e.target?.tagName)) e.stopPropagation();
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-medium text-white text-sm tracking-tight",
                                        children: "Właściwości linii"
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                        lineNumber: 3349,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            setShowEdgeProperties(false);
                                            setSelectedEdge(null);
                                        },
                                        className: "p-0.5 hover:bg-white/5 rounded text-gray-500 hover:text-gray-300 transition-colors",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "w-4 h-4",
                                            fill: "none",
                                            stroke: "currentColor",
                                            viewBox: "0 0 24 24",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: 2,
                                                d: "M6 18L18 6M6 6l12 12"
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                lineNumber: 3358,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                            lineNumber: 3357,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                        lineNumber: 3350,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                lineNumber: 3348,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-xs font-medium text-gray-400 mb-1",
                                                children: "Notatki"
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                lineNumber: 3365,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                value: edgeProperties.notes,
                                                onChange: (e)=>setEdgeProperties({
                                                        ...edgeProperties,
                                                        notes: e.target.value
                                                    }),
                                                className: "w-full bg-white/[0.04] border border-white/10 rounded px-3 py-1.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30 min-h-[72px]",
                                                placeholder: "Notatki do linii..."
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                lineNumber: 3366,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                        lineNumber: 3364,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-xs font-medium text-gray-400 mb-1",
                                                children: "Link (opcjonalnie)"
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                lineNumber: 3375,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "url",
                                                value: edgeProperties.link,
                                                onChange: (e)=>setEdgeProperties({
                                                        ...edgeProperties,
                                                        link: e.target.value
                                                    }),
                                                className: "w-full bg-white/[0.04] border border-white/10 rounded px-3 py-1.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30",
                                                placeholder: "https://..."
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                lineNumber: 3376,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                        lineNumber: 3374,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "pt-3 mt-3 border-t border-white/10",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between mb-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-xs font-medium text-gray-400",
                                                        children: "Dodatkowe pola"
                                                    }, void 0, false, {
                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                        lineNumber: 3388,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>{
                                                            setEdgeCustomFields([
                                                                ...edgeCustomFields,
                                                                {
                                                                    field_name: '',
                                                                    field_type: 'text',
                                                                    field_value: '',
                                                                    display_order: edgeCustomFields.length
                                                                }
                                                            ]);
                                                        },
                                                        className: "px-2 py-1 text-xs bg-white/[0.06] border border-white/20 text-white/90 rounded hover:bg-white/10 hover:border-white/30 transition-colors",
                                                        children: "+ Dodaj pole"
                                                    }, void 0, false, {
                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                        lineNumber: 3389,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                lineNumber: 3387,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-2 max-h-64 overflow-y-auto",
                                                children: [
                                                    edgeCustomFields.map((field, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "p-2 bg-white/[0.02] border border-white/5 rounded",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-2 mb-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                            type: "text",
                                                                            value: field.field_name,
                                                                            onChange: (e)=>{
                                                                                const updated = [
                                                                                    ...edgeCustomFields
                                                                                ];
                                                                                updated[index].field_name = e.target.value;
                                                                                setEdgeCustomFields(updated);
                                                                            },
                                                                            placeholder: "Nazwa pola",
                                                                            className: "flex-1 bg-white/[0.04] border border-white/10 rounded px-2 py-1 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                            lineNumber: 3402,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$CustomSelect$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CustomSelect"], {
                                                                            size: "sm",
                                                                            value: field.field_type,
                                                                            onChange: (value)=>{
                                                                                const updated = [
                                                                                    ...edgeCustomFields
                                                                                ];
                                                                                updated[index].field_type = value;
                                                                                updated[index].field_value = ''; // Reset value przy zmianie typu
                                                                                setEdgeCustomFields(updated);
                                                                            },
                                                                            options: [
                                                                                {
                                                                                    value: 'text',
                                                                                    label: 'Tekst'
                                                                                },
                                                                                {
                                                                                    value: 'date',
                                                                                    label: 'Data'
                                                                                },
                                                                                {
                                                                                    value: 'number',
                                                                                    label: 'Liczba'
                                                                                },
                                                                                {
                                                                                    value: 'link',
                                                                                    label: 'Link'
                                                                                }
                                                                            ],
                                                                            className: "w-24"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                            lineNumber: 3413,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: ()=>{
                                                                                const updated = edgeCustomFields.filter((_, i)=>i !== index);
                                                                                setEdgeCustomFields(updated);
                                                                            },
                                                                            className: "p-1 text-gray-400 hover:text-red-400 transition-colors",
                                                                            title: "Usuń pole",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Trash$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash$3e$__["Trash"], {
                                                                                size: 14
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                                lineNumber: 3438,
                                                                                columnNumber: 27
                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                            lineNumber: 3430,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                    lineNumber: 3401,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                field.field_type === 'text' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "text",
                                                                    value: field.field_value,
                                                                    onChange: (e)=>{
                                                                        const updated = [
                                                                            ...edgeCustomFields
                                                                        ];
                                                                        updated[index].field_value = e.target.value;
                                                                        setEdgeCustomFields(updated);
                                                                    },
                                                                    placeholder: "Wartość tekstowa",
                                                                    className: "w-full bg-white/[0.04] border border-white/10 rounded px-2 py-1 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                    lineNumber: 3442,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                field.field_type === 'date' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DatePickerField, {
                                                                    value: field.field_value,
                                                                    onChange: (value)=>{
                                                                        const updated = [
                                                                            ...edgeCustomFields
                                                                        ];
                                                                        updated[index].field_value = value;
                                                                        setEdgeCustomFields(updated);
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                    lineNumber: 3455,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                field.field_type === 'number' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "relative w-full",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                            type: "text",
                                                                            inputMode: "numeric",
                                                                            value: field.field_value,
                                                                            onChange: (e)=>{
                                                                                const value = e.target.value.replace(/[^0-9.-]/g, '');
                                                                                const updated = [
                                                                                    ...edgeCustomFields
                                                                                ];
                                                                                updated[index].field_value = value;
                                                                                setEdgeCustomFields(updated);
                                                                            },
                                                                            placeholder: "Wartość liczbowa",
                                                                            className: "w-full bg-white/[0.04] border border-white/10 rounded px-2 py-1 pr-12 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                            lineNumber: 3466,
                                                                            columnNumber: 27
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "absolute right-0.5 top-0 bottom-0 w-11 flex flex-col",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                    type: "button",
                                                                                    onClick: ()=>{
                                                                                        const current = parseFloat(field.field_value) || 0;
                                                                                        const updated = [
                                                                                            ...edgeCustomFields
                                                                                        ];
                                                                                        updated[index].field_value = String(current + 1);
                                                                                        setEdgeCustomFields(updated);
                                                                                    },
                                                                                    className: "flex-1 flex items-center justify-center text-gray-400 hover:text-white border-b border-white/10 hover:bg-white/5 rounded-t",
                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Plus$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                                                        size: 10
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                                        lineNumber: 3490,
                                                                                        columnNumber: 31
                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                                    lineNumber: 3480,
                                                                                    columnNumber: 29
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                    type: "button",
                                                                                    onClick: ()=>{
                                                                                        const current = parseFloat(field.field_value) || 0;
                                                                                        const updated = [
                                                                                            ...edgeCustomFields
                                                                                        ];
                                                                                        updated[index].field_value = String(Math.max(0, current - 1));
                                                                                        setEdgeCustomFields(updated);
                                                                                    },
                                                                                    className: "flex-1 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 rounded-b",
                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Minus$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__["Minus"], {
                                                                                        size: 10
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                                        lineNumber: 3502,
                                                                                        columnNumber: 31
                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                                    lineNumber: 3492,
                                                                                    columnNumber: 29
                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                            lineNumber: 3479,
                                                                            columnNumber: 27
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                    lineNumber: 3465,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                field.field_type === 'link' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "url",
                                                                    value: field.field_value,
                                                                    onChange: (e)=>{
                                                                        const updated = [
                                                                            ...edgeCustomFields
                                                                        ];
                                                                        updated[index].field_value = e.target.value;
                                                                        setEdgeCustomFields(updated);
                                                                    },
                                                                    placeholder: "https://example.com",
                                                                    className: "w-full bg-white/[0.04] border border-white/10 rounded px-2 py-1 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                    lineNumber: 3508,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, index, true, {
                                                            fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                            lineNumber: 3400,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))),
                                                    edgeCustomFields.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs text-gray-500 py-2 text-center",
                                                        children: "Brak dodatkowych pól"
                                                    }, void 0, false, {
                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                        lineNumber: 3523,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                lineNumber: 3398,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                        lineNumber: 3386,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                if (selectedEdge) {
                                                    // Odwróć kierunek strzałki
                                                    const newSource = selectedEdge.target;
                                                    const newTarget = selectedEdge.source;
                                                    setEdges((eds)=>eds.map((edge)=>edge.id === selectedEdge.id ? {
                                                                ...edge,
                                                                source: newSource,
                                                                target: newTarget
                                                            } : edge));
                                                    // Zaktualizuj selectedEdge
                                                    setSelectedEdge({
                                                        ...selectedEdge,
                                                        source: newSource,
                                                        target: newTarget
                                                    });
                                                }
                                            },
                                            className: "w-full px-3 py-1.5 bg-white/[0.04] border border-white/10 text-gray-300 rounded text-sm font-medium hover:bg-white/5 hover:border-[#fee715]/30 hover:text-[#fee715] transition-colors flex items-center justify-center gap-1.5",
                                            title: "Odwróć kierunek strzałki",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    className: "w-4 h-4",
                                                    fill: "none",
                                                    stroke: "currentColor",
                                                    viewBox: "0 0 24 24",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        strokeWidth: 2,
                                                        d: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                        lineNumber: 3558,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                    lineNumber: 3557,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                "Odwróć kierunek"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                            lineNumber: 3529,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                        lineNumber: 3528,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-2 pt-3 mt-3 border-t border-white/10",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: updateEdgeProperties,
                                                className: "relative flex-1 px-3 py-1.5 bg-[#fee715]/10 border border-[#fee715]/40 text-[#fee715] rounded text-sm font-medium hover:bg-[#fee715]/15 hover:border-[#fee715]/50 transition-colors",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "flex items-center justify-center gap-2",
                                                    children: [
                                                        "Zapisz zmiany",
                                                        hasUnsavedEdgeChanges && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "w-1.5 h-1.5 bg-[#fee715] rounded-full animate-pulse",
                                                            title: "Masz niezapisane zmiany"
                                                        }, void 0, false, {
                                                            fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                            lineNumber: 3572,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                    lineNumber: 3569,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                lineNumber: 3565,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: deleteSelectedEdge,
                                                title: "Delete / Backspace",
                                                className: "px-3 py-1.5 bg-white/[0.06] border border-white/20 text-white/90 rounded text-sm font-medium hover:bg-white/10 hover:border-white/30 transition-colors",
                                                children: "Usuń"
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                lineNumber: 3576,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                        lineNumber: 3564,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[11px] text-gray-500 mt-2",
                                        children: "Delete / Backspace — usuwa strzałkę."
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                        lineNumber: 3584,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                lineNumber: 3363,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                        lineNumber: 3343,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    showPropertiesPanel && selectedNode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-72 border-l border-white/10 p-4 overflow-y-auto overflow-x-visible bg-[#0a0f14]/98 nodrag nopan",
                        style: {
                            zIndex: 10
                        },
                        onKeyDown: (e)=>{
                            if ([
                                'INPUT',
                                'TEXTAREA',
                                'SELECT'
                            ].includes(e.target?.tagName)) e.stopPropagation();
                        },
                        onKeyUp: (e)=>{
                            if ([
                                'INPUT',
                                'TEXTAREA',
                                'SELECT'
                            ].includes(e.target?.tagName)) e.stopPropagation();
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-medium text-white text-sm tracking-tight",
                                        children: selectedNode.type === 'text' ? 'Właściwości tekstu' : 'Właściwości'
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                        lineNumber: 3598,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            setShowPropertiesPanel(false);
                                            setSelectedNode(null);
                                        },
                                        className: "p-0.5 hover:bg-white/5 rounded text-gray-500 hover:text-gray-300 transition-colors",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "w-4 h-4",
                                            fill: "none",
                                            stroke: "currentColor",
                                            viewBox: "0 0 24 24",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: 2,
                                                d: "M6 18L18 6M6 6l12 12"
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                lineNumber: 3609,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                            lineNumber: 3608,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                        lineNumber: 3601,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                lineNumber: 3597,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            selectedNode.type === 'text' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-xs font-medium text-gray-400 mb-1",
                                                children: "Tekst"
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                lineNumber: 3617,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                value: textNodeProperties.text,
                                                onChange: (e)=>setTextNodeProperties({
                                                        ...textNodeProperties,
                                                        text: e.target.value
                                                    }),
                                                className: "w-full bg-white/[0.04] border border-white/10 rounded px-3 py-1.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30 min-h-[72px]",
                                                placeholder: "Wpisz tekst..."
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                lineNumber: 3618,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                        lineNumber: 3616,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-xs font-medium text-gray-400 mb-1",
                                                children: "Rozmiar czcionki"
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                lineNumber: 3627,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                min: "10",
                                                max: "72",
                                                value: textNodeProperties.fontSize,
                                                onChange: (e)=>setTextNodeProperties({
                                                        ...textNodeProperties,
                                                        fontSize: parseInt(e.target.value) || 18
                                                    }),
                                                className: "w-full bg-white/[0.04] border border-white/10 rounded px-3 py-1.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30"
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                lineNumber: 3628,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                        lineNumber: 3626,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-xs font-medium text-gray-400 mb-1",
                                                children: "Waga czcionki"
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                lineNumber: 3639,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$CustomSelect$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CustomSelect"], {
                                                size: "sm",
                                                value: textNodeProperties.fontWeight || 'bold',
                                                onChange: (value)=>setTextNodeProperties({
                                                        ...textNodeProperties,
                                                        fontWeight: value
                                                    }),
                                                options: [
                                                    {
                                                        value: 'normal',
                                                        label: 'Normal'
                                                    },
                                                    {
                                                        value: 'semibold',
                                                        label: 'Semibold'
                                                    },
                                                    {
                                                        value: 'bold',
                                                        label: 'Bold'
                                                    }
                                                ],
                                                className: "w-full"
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                lineNumber: 3640,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                        lineNumber: 3638,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-xs font-medium text-gray-400 mb-1",
                                                children: "Wyrównanie poziome"
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                lineNumber: 3654,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$CustomSelect$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CustomSelect"], {
                                                size: "sm",
                                                value: textNodeProperties.textAlign || 'left',
                                                onChange: (value)=>setTextNodeProperties({
                                                        ...textNodeProperties,
                                                        textAlign: value
                                                    }),
                                                options: [
                                                    {
                                                        value: 'left',
                                                        label: 'Lewo'
                                                    },
                                                    {
                                                        value: 'center',
                                                        label: 'Środek'
                                                    },
                                                    {
                                                        value: 'right',
                                                        label: 'Prawo'
                                                    }
                                                ],
                                                className: "w-full"
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                lineNumber: 3655,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                        lineNumber: 3653,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-xs font-medium text-gray-400 mb-1",
                                                children: "Wyrównanie pionowe"
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                lineNumber: 3669,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$CustomSelect$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CustomSelect"], {
                                                size: "sm",
                                                value: textNodeProperties.verticalAlign || 'middle',
                                                onChange: (value)=>setTextNodeProperties({
                                                        ...textNodeProperties,
                                                        verticalAlign: value
                                                    }),
                                                options: [
                                                    {
                                                        value: 'top',
                                                        label: 'Góra'
                                                    },
                                                    {
                                                        value: 'middle',
                                                        label: 'Środek'
                                                    },
                                                    {
                                                        value: 'bottom',
                                                        label: 'Dół'
                                                    }
                                                ],
                                                className: "w-full"
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                lineNumber: 3670,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                        lineNumber: 3668,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "pt-0.5",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$CustomCheckbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CustomCheckbox"], {
                                            id: "showHandles",
                                            checked: textNodeProperties.showHandles,
                                            onChange: (v)=>setTextNodeProperties({
                                                    ...textNodeProperties,
                                                    showHandles: v
                                                }),
                                            label: "Punkty połączenia",
                                            size: "sm",
                                            labelClassName: "text-xs font-medium text-gray-400"
                                        }, void 0, false, {
                                            fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                            lineNumber: 3684,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                        lineNumber: 3683,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-2 pt-3 mt-3 border-t border-white/10",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: updateNodeProperties,
                                                className: "relative flex-1 px-3 py-1.5 bg-[#fee715]/10 border border-[#fee715]/40 text-[#fee715] rounded text-sm font-medium hover:bg-[#fee715]/15 hover:border-[#fee715]/50 transition-colors",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "flex items-center justify-center gap-2",
                                                    children: [
                                                        "Zapisz zmiany",
                                                        hasUnsavedTextNodeChanges && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "w-1.5 h-1.5 bg-[#fee715] rounded-full animate-pulse",
                                                            title: "Masz niezapisane zmiany"
                                                        }, void 0, false, {
                                                            fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                            lineNumber: 3702,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                    lineNumber: 3699,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                lineNumber: 3695,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: deleteSelectedNode,
                                                className: "px-3 py-1.5 bg-white/[0.06] border border-white/20 text-white/90 rounded text-sm font-medium hover:bg-white/10 hover:border-white/30 transition-colors",
                                                children: "Usuń"
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                lineNumber: 3706,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                        lineNumber: 3694,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                lineNumber: 3615,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-xs font-medium text-gray-400 mb-1",
                                                children: "Nazwa"
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                lineNumber: 3717,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                value: nodeProperties.label,
                                                onChange: (e)=>setNodeProperties({
                                                        ...nodeProperties,
                                                        label: e.target.value
                                                    }),
                                                className: "w-full bg-white/[0.04] border border-white/10 rounded px-3 py-1.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30",
                                                placeholder: "Nazwa elementu"
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                lineNumber: 3718,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                        lineNumber: 3716,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-xs font-medium text-gray-400 mb-1",
                                                children: "Ikona"
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                lineNumber: 3728,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$IconPicker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IconPicker"], {
                                                value: nodeProperties.icon,
                                                onChange: (iconName)=>setNodeProperties({
                                                        ...nodeProperties,
                                                        icon: iconName
                                                    }),
                                                className: "w-full"
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                lineNumber: 3729,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                        lineNumber: 3727,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-xs font-medium text-gray-400 mb-1",
                                                children: "Notatki"
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                lineNumber: 3737,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                value: nodeProperties.notes,
                                                onChange: (e)=>setNodeProperties({
                                                        ...nodeProperties,
                                                        notes: e.target.value
                                                    }),
                                                className: "w-full bg-white/[0.04] border border-white/10 rounded px-3 py-1.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30 min-h-[72px]",
                                                placeholder: "Notatki (np. CPC: 2 PLN)"
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                lineNumber: 3738,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                        lineNumber: 3736,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-xs font-medium text-gray-400 mb-1",
                                                children: "Link"
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                lineNumber: 3747,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "url",
                                                value: nodeProperties.link || '',
                                                onChange: (e)=>setNodeProperties({
                                                        ...nodeProperties,
                                                        link: e.target.value
                                                    }),
                                                className: "w-full bg-white/[0.04] border border-white/10 rounded px-3 py-1.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30",
                                                placeholder: "https://example.com"
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                lineNumber: 3748,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                        lineNumber: 3746,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "pt-3 mt-3 border-t border-white/10",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between mb-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-xs font-medium text-gray-400",
                                                        children: "Dodatkowe pola"
                                                    }, void 0, false, {
                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                        lineNumber: 3760,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>{
                                                            setNodeCustomFields([
                                                                ...nodeCustomFields,
                                                                {
                                                                    field_name: '',
                                                                    field_type: 'text',
                                                                    field_value: '',
                                                                    display_order: nodeCustomFields.length
                                                                }
                                                            ]);
                                                        },
                                                        className: "px-2 py-1 text-xs bg-white/[0.06] border border-white/20 text-white/90 rounded hover:bg-white/10 hover:border-white/30 transition-colors",
                                                        children: "+ Dodaj pole"
                                                    }, void 0, false, {
                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                        lineNumber: 3761,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                lineNumber: 3759,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-2 max-h-64 overflow-y-auto",
                                                children: nodeCustomFields.map((field, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "p-2 bg-white/[0.02] border border-white/5 rounded",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2 mb-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "text",
                                                                        value: field.field_name,
                                                                        onChange: (e)=>{
                                                                            const updated = [
                                                                                ...nodeCustomFields
                                                                            ];
                                                                            updated[index].field_name = e.target.value;
                                                                            setNodeCustomFields(updated);
                                                                        },
                                                                        placeholder: "Nazwa pola",
                                                                        className: "flex-1 bg-white/[0.04] border border-white/10 rounded px-2 py-1 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                        lineNumber: 3774,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$CustomSelect$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CustomSelect"], {
                                                                        size: "sm",
                                                                        value: field.field_type,
                                                                        onChange: (value)=>{
                                                                            const updated = [
                                                                                ...nodeCustomFields
                                                                            ];
                                                                            updated[index].field_type = value;
                                                                            updated[index].field_value = ''; // Reset value przy zmianie typu
                                                                            setNodeCustomFields(updated);
                                                                        },
                                                                        options: [
                                                                            {
                                                                                value: 'text',
                                                                                label: 'Tekst'
                                                                            },
                                                                            {
                                                                                value: 'date',
                                                                                label: 'Data'
                                                                            },
                                                                            {
                                                                                value: 'number',
                                                                                label: 'Liczba'
                                                                            },
                                                                            {
                                                                                value: 'link',
                                                                                label: 'Link'
                                                                            }
                                                                        ],
                                                                        className: "w-24"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                        lineNumber: 3785,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                lineNumber: 3773,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            field.field_type === 'text' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "text",
                                                                value: field.field_value,
                                                                onChange: (e)=>{
                                                                    const updated = [
                                                                        ...nodeCustomFields
                                                                    ];
                                                                    updated[index].field_value = e.target.value;
                                                                    setNodeCustomFields(updated);
                                                                },
                                                                placeholder: "Wartość tekstowa",
                                                                className: "w-full bg-white/[0.04] border border-white/10 rounded px-2 py-1 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30"
                                                            }, void 0, false, {
                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                lineNumber: 3804,
                                                                columnNumber: 27
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            field.field_type === 'date' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DatePickerField, {
                                                                value: field.field_value,
                                                                onChange: (value)=>{
                                                                    const updated = [
                                                                        ...nodeCustomFields
                                                                    ];
                                                                    updated[index].field_value = value;
                                                                    setNodeCustomFields(updated);
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                lineNumber: 3817,
                                                                columnNumber: 27
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            field.field_type === 'number' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "relative w-full",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "text",
                                                                        inputMode: "numeric",
                                                                        value: field.field_value,
                                                                        onChange: (e)=>{
                                                                            const value = e.target.value.replace(/[^0-9.-]/g, '');
                                                                            const updated = [
                                                                                ...nodeCustomFields
                                                                            ];
                                                                            updated[index].field_value = value;
                                                                            setNodeCustomFields(updated);
                                                                        },
                                                                        placeholder: "Wartość liczbowa",
                                                                        className: "w-full bg-white/[0.04] border border-white/10 rounded px-2 py-1 pr-12 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                        lineNumber: 3828,
                                                                        columnNumber: 29
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "absolute right-0.5 top-0 bottom-0 w-11 flex flex-col",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                type: "button",
                                                                                onClick: ()=>{
                                                                                    const currentValue = parseFloat(field.field_value) || 0;
                                                                                    const updated = [
                                                                                        ...nodeCustomFields
                                                                                    ];
                                                                                    updated[index].field_value = String(currentValue + 1);
                                                                                    setNodeCustomFields(updated);
                                                                                },
                                                                                className: "flex-1 px-1 bg-white/[0.08] hover:bg-white/[0.15] border-l border-white/20 rounded-tl text-white/70 hover:text-white transition-colors flex items-center justify-center",
                                                                                title: "Zwiększ",
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                                    className: "w-3 h-3",
                                                                                    fill: "none",
                                                                                    stroke: "currentColor",
                                                                                    viewBox: "0 0 24 24",
                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                        strokeLinecap: "round",
                                                                                        strokeLinejoin: "round",
                                                                                        strokeWidth: 2,
                                                                                        d: "M5 15l7-7 7 7"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                                        lineNumber: 3854,
                                                                                        columnNumber: 35
                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                                    lineNumber: 3853,
                                                                                    columnNumber: 33
                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                                lineNumber: 3842,
                                                                                columnNumber: 31
                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "h-px bg-white/20"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                                lineNumber: 3857,
                                                                                columnNumber: 31
                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                type: "button",
                                                                                onClick: ()=>{
                                                                                    const currentValue = parseFloat(field.field_value) || 0;
                                                                                    const updated = [
                                                                                        ...nodeCustomFields
                                                                                    ];
                                                                                    updated[index].field_value = String(Math.max(0, currentValue - 1));
                                                                                    setNodeCustomFields(updated);
                                                                                },
                                                                                className: "flex-1 px-1 bg-white/[0.08] hover:bg-white/[0.15] border-l border-white/20 rounded-bl text-white/70 hover:text-white transition-colors flex items-center justify-center",
                                                                                title: "Zmniejsz",
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                                    className: "w-3 h-3",
                                                                                    fill: "none",
                                                                                    stroke: "currentColor",
                                                                                    viewBox: "0 0 24 24",
                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                        strokeLinecap: "round",
                                                                                        strokeLinejoin: "round",
                                                                                        strokeWidth: 2,
                                                                                        d: "M19 9l-7 7-7-7"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                                        lineNumber: 3870,
                                                                                        columnNumber: 35
                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                                    lineNumber: 3869,
                                                                                    columnNumber: 33
                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                                lineNumber: 3858,
                                                                                columnNumber: 31
                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                        lineNumber: 3841,
                                                                        columnNumber: 29
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                lineNumber: 3827,
                                                                columnNumber: 27
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            field.field_type === 'link' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "url",
                                                                value: field.field_value,
                                                                onChange: (e)=>{
                                                                    const updated = [
                                                                        ...nodeCustomFields
                                                                    ];
                                                                    updated[index].field_value = e.target.value;
                                                                    setNodeCustomFields(updated);
                                                                },
                                                                placeholder: "https://example.com",
                                                                className: "w-full bg-white/[0.04] border border-white/10 rounded px-2 py-1 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30"
                                                            }, void 0, false, {
                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                lineNumber: 3877,
                                                                columnNumber: 27
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-end mt-2",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>{
                                                                        setNodeCustomFields(nodeCustomFields.filter((_, i)=>i !== index));
                                                                    },
                                                                    className: "px-2 py-1 text-xs text-gray-400 hover:text-red-400 transition-colors flex items-center gap-1",
                                                                    title: "Usuń pole",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Trash$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash$3e$__["Trash"], {
                                                                            size: 14,
                                                                            weight: "regular"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                            lineNumber: 3897,
                                                                            columnNumber: 29
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            children: "Usuń"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                            lineNumber: 3898,
                                                                            columnNumber: 29
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                    lineNumber: 3890,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                                lineNumber: 3889,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, index, true, {
                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                        lineNumber: 3772,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)))
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                lineNumber: 3770,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                        lineNumber: 3758,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "pt-3 mt-3 border-t border-white/10",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-xs font-medium text-gray-400 mb-2",
                                                children: "Zapisz jako własny szablon"
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                lineNumber: 3908,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$CustomSelect$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CustomSelect"], {
                                                        size: "sm",
                                                        value: nodeProperties.category || 'Działania',
                                                        onChange: (value)=>setNodeProperties({
                                                                ...nodeProperties,
                                                                category: value
                                                            }),
                                                        options: [
                                                            {
                                                                value: 'Źródła Ruchu',
                                                                label: 'Źródła Ruchu'
                                                            },
                                                            {
                                                                value: 'Typ Strony',
                                                                label: 'Typ Strony'
                                                            },
                                                            {
                                                                value: 'Działania',
                                                                label: 'Działania'
                                                            },
                                                            {
                                                                value: 'Cel/Konwersja',
                                                                label: 'Cel/Konwersja'
                                                            },
                                                            {
                                                                value: 'Narzędzia',
                                                                label: 'Narzędzia'
                                                            }
                                                        ],
                                                        className: "w-full"
                                                    }, void 0, false, {
                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                        lineNumber: 3910,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: async ()=>{
                                                            if (!nodeProperties.label || !nodeProperties.icon) {
                                                                setAlertModal({
                                                                    isOpen: true,
                                                                    title: 'Błąd',
                                                                    message: 'Wypełnij nazwę i wybierz ikonę przed zapisaniem szablonu.',
                                                                    type: 'error'
                                                                });
                                                                return;
                                                            }
                                                            const nodeColor = selectedNode?.data?.color || '#fee715';
                                                            await saveCustomTemplate(nodeProperties.label, nodeProperties.icon, nodeColor, nodeProperties.category || 'Działania');
                                                        },
                                                        className: "w-full px-3 py-1.5 bg-white/[0.06] border border-white/20 text-white/90 rounded text-sm font-medium hover:bg-white/10 hover:border-white/30 transition-colors",
                                                        children: "Zapisz jako szablon"
                                                    }, void 0, false, {
                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                        lineNumber: 3923,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                lineNumber: 3909,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                        lineNumber: 3907,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-2 pt-3 mt-3 border-t border-white/10",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: updateNodeProperties,
                                                className: "relative flex-1 px-3 py-1.5 bg-[#fee715]/10 border border-[#fee715]/40 text-[#fee715] rounded text-sm font-medium hover:bg-[#fee715]/15 hover:border-[#fee715]/50 transition-colors",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "flex items-center justify-center gap-2",
                                                    children: [
                                                        "Zapisz zmiany",
                                                        hasUnsavedNodeChanges && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "w-1.5 h-1.5 bg-[#fee715] rounded-full animate-pulse",
                                                            title: "Masz niezapisane zmiany"
                                                        }, void 0, false, {
                                                            fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                            lineNumber: 3957,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                    lineNumber: 3954,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                lineNumber: 3950,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: deleteSelectedNode,
                                                className: "px-3 py-1.5 bg-white/[0.06] border border-white/20 text-white/90 rounded text-sm font-medium hover:bg-white/10 hover:border-white/30 transition-colors",
                                                children: "Usuń"
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                                lineNumber: 3961,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                        lineNumber: 3949,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                                lineNumber: 3715,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                        lineNumber: 3591,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 2808,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$AlertModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertModal"], {
                isOpen: alertModal.isOpen,
                title: alertModal.title,
                message: alertModal.message,
                type: alertModal.type,
                onClose: ()=>setAlertModal((prev)=>({
                            ...prev,
                            isOpen: false
                        }))
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 3974,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            showCommentPanel && id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$CommentPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommentPanel"], {
                funnelId: id,
                isOpen: showCommentPanel,
                refreshTrigger: commentPanelRefreshTrigger,
                onClose: ()=>{
                    setShowCommentPanel(false);
                    setSelectedThreadId(null);
                },
                onJumpToAnchor: (anchorType, anchorId, regionCoords)=>{
                    if (anchorType === 'node' && anchorId) {
                        const node = nodes.find((n)=>n.id === anchorId);
                        if (node && reactFlowInstance) {
                            reactFlowInstance.setCenter(node.position.x, node.position.y, {
                                zoom: 1,
                                duration: 500
                            });
                            setSelectedNode(node);
                            setShowPropertiesPanel(true);
                        }
                    } else if (anchorType === 'edge' && anchorId) {
                        const edge = edges.find((e)=>e.id === anchorId);
                        if (edge && reactFlowInstance) {
                            const sourceNode = nodes.find((n)=>n.id === edge.source);
                            if (sourceNode) {
                                reactFlowInstance.setCenter(sourceNode.position.x, sourceNode.position.y, {
                                    zoom: 1,
                                    duration: 500
                                });
                                setSelectedEdge(edge);
                                setShowEdgeProperties(true);
                            }
                        }
                    } else if (anchorType === 'region' && regionCoords) {
                        if (reactFlowInstance) {
                            reactFlowInstance.setCenter(regionCoords.x, regionCoords.y, {
                                zoom: 1,
                                duration: 500
                            });
                        }
                    }
                },
                onThreadClick: (threadId)=>{
                    setSelectedThreadId(threadId);
                }
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 3984,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            selectedThreadId && id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$CommentThread$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommentThread"], {
                threadId: selectedThreadId,
                funnelId: id,
                onClose: ()=>{
                    setSelectedThreadId(null);
                    loadCommentCounts();
                },
                onUpdate: ()=>{
                    loadCommentCounts();
                }
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 4023,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            commentFormAnchor && id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$CommentForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommentForm"], {
                funnelId: id,
                anchorType: commentFormAnchor.type,
                anchorId: commentFormAnchor.id,
                regionCoords: commentFormAnchor.coords,
                onClose: ()=>{
                    setCommentFormAnchor(null);
                },
                onSuccess: ()=>{
                    setCommentFormAnchor(null);
                    loadCommentCounts();
                    // Wymuś odświeżenie panelu komentarzy
                    setCommentPanelRefreshTrigger((prev)=>prev + 1);
                    if (!showCommentPanel) {
                        setShowCommentPanel(true);
                    }
                }
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
                lineNumber: 4037,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx",
        lineNumber: 2548,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s2(FunnelBuilder, "6GEZbfMJGxKeGeylVMU+zGDvspo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$NISHYRIK$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$NISHYRIK$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNavigate"],
        __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f40$xyflow$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useNodesState"],
        __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f40$xyflow$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useEdgesState"]
    ];
});
_c4 = FunnelBuilder;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "CustomNode");
__turbopack_context__.k.register(_c1, "CustomEdge");
__turbopack_context__.k.register(_c2, "TextNode");
__turbopack_context__.k.register(_c3, "DatePickerField");
__turbopack_context__.k.register(_c4, "FunnelBuilder");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/strony_www/drozniak-landingpage/components/CommentForm.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CommentForm",
    ()=>CommentForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$X$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/X.esm.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/lib/supabase-client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$app$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/app/hooks/useAuth.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$CustomSelect$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/components/CustomSelect.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$CustomCheckbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/components/CustomCheckbox.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$FunnelBuilder$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/components/FunnelBuilder.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
;
const CommentForm = ({ funnelId, anchorType, anchorId, regionCoords, onClose, onSuccess })=>{
    _s();
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$app$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const [threadType, setThreadType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('Komentarz');
    const [content, setContent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [priority, setPriority] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('Średni');
    const [assignedTo, setAssignedTo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [dueDate, setDueDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [requiresApproval, setRequiresApproval] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleSubmit = async ()=>{
        if (!content.trim()) return;
        if (!user) {
            alert('Musisz być zalogowany, aby utworzyć komentarz');
            return;
        }
        setSaving(true);
        try {
            // Utwórz wątek
            const { data: thread, error: threadError } = await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('comment_threads').insert({
                funnel_id: funnelId,
                created_by: user.id,
                thread_type: threadType,
                status: 'Otwarte',
                priority: threadType === 'Zadanie' ? priority : null,
                assigned_to: threadType === 'Zadanie' && assignedTo ? assignedTo : null,
                due_date: threadType === 'Zadanie' && dueDate ? dueDate : null,
                requires_approval: threadType === 'Zadanie' ? requiresApproval : false
            }).select().single();
            if (threadError) throw threadError;
            // Utwórz anchor
            const anchorData = {
                thread_id: thread.id,
                anchor_type: anchorType
            };
            if (anchorType === 'region' && regionCoords) {
                anchorData.region_x = regionCoords.x;
                anchorData.region_y = regionCoords.y;
                anchorData.region_width = regionCoords.width;
                anchorData.region_height = regionCoords.height;
            } else if (anchorId) {
                anchorData.anchor_id = anchorId;
            }
            const { error: anchorError } = await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('comment_anchors').insert(anchorData);
            if (anchorError) throw anchorError;
            // Utwórz pierwszą wiadomość
            const { error: messageError } = await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('comment_messages').insert({
                thread_id: thread.id,
                created_by: user.id,
                content: content.trim()
            });
            if (messageError) throw messageError;
            onSuccess();
            onClose();
        } catch (error) {
            console.error('Błąd tworzenia wątku:', error);
            alert('Nie udało się utworzyć wątku: ' + (error.message || 'Nieznany błąd'));
        } finally{
            setSaving(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-[#0a0f14] border border-white/20 rounded-lg w-full max-w-md shadow-2xl",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-4 border-b border-white/10 flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-lg font-semibold text-white",
                            children: "Nowy wątek"
                        }, void 0, false, {
                            fileName: "[project]/strony_www/drozniak-landingpage/components/CommentForm.tsx",
                            lineNumber: 116,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "p-1.5 hover:bg-white/5 rounded transition-colors",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$X$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                size: 18,
                                className: "text-white/70"
                            }, void 0, false, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/CommentForm.tsx",
                                lineNumber: 121,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/strony_www/drozniak-landingpage/components/CommentForm.tsx",
                            lineNumber: 117,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/strony_www/drozniak-landingpage/components/CommentForm.tsx",
                    lineNumber: 115,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-4 space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-xs font-medium text-gray-400 mb-1",
                                    children: "Typ"
                                }, void 0, false, {
                                    fileName: "[project]/strony_www/drozniak-landingpage/components/CommentForm.tsx",
                                    lineNumber: 128,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$CustomSelect$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CustomSelect"], {
                                    size: "sm",
                                    value: threadType,
                                    onChange: (value)=>setThreadType(value),
                                    options: [
                                        {
                                            value: 'Komentarz',
                                            label: 'Komentarz'
                                        },
                                        {
                                            value: 'Pytanie',
                                            label: 'Pytanie'
                                        },
                                        {
                                            value: 'Zadanie',
                                            label: 'Zadanie'
                                        }
                                    ],
                                    className: "w-full"
                                }, void 0, false, {
                                    fileName: "[project]/strony_www/drozniak-landingpage/components/CommentForm.tsx",
                                    lineNumber: 129,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/strony_www/drozniak-landingpage/components/CommentForm.tsx",
                            lineNumber: 127,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-xs font-medium text-gray-400 mb-1",
                                    children: [
                                        "Treść ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-red-400",
                                            children: "*"
                                        }, void 0, false, {
                                            fileName: "[project]/strony_www/drozniak-landingpage/components/CommentForm.tsx",
                                            lineNumber: 144,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/strony_www/drozniak-landingpage/components/CommentForm.tsx",
                                    lineNumber: 143,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                    value: content,
                                    onChange: (e)=>setContent(e.target.value),
                                    placeholder: "Opisz problem, zadanie lub pytanie...",
                                    className: "w-full bg-white/[0.04] border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30 min-h-[100px] resize-none",
                                    autoFocus: true
                                }, void 0, false, {
                                    fileName: "[project]/strony_www/drozniak-landingpage/components/CommentForm.tsx",
                                    lineNumber: 146,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/strony_www/drozniak-landingpage/components/CommentForm.tsx",
                            lineNumber: 142,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        threadType === 'Zadanie' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-xs font-medium text-gray-400 mb-1",
                                            children: "Priorytet"
                                        }, void 0, false, {
                                            fileName: "[project]/strony_www/drozniak-landingpage/components/CommentForm.tsx",
                                            lineNumber: 159,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$CustomSelect$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CustomSelect"], {
                                            size: "sm",
                                            value: priority,
                                            onChange: (value)=>setPriority(value),
                                            options: [
                                                {
                                                    value: 'Niski',
                                                    label: 'Niski'
                                                },
                                                {
                                                    value: 'Średni',
                                                    label: 'Średni'
                                                },
                                                {
                                                    value: 'Wysoki',
                                                    label: 'Wysoki'
                                                }
                                            ],
                                            className: "w-full"
                                        }, void 0, false, {
                                            fileName: "[project]/strony_www/drozniak-landingpage/components/CommentForm.tsx",
                                            lineNumber: 160,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/strony_www/drozniak-landingpage/components/CommentForm.tsx",
                                    lineNumber: 158,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-xs font-medium text-gray-400 mb-1",
                                            children: "Termin (opcjonalnie)"
                                        }, void 0, false, {
                                            fileName: "[project]/strony_www/drozniak-landingpage/components/CommentForm.tsx",
                                            lineNumber: 174,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$FunnelBuilder$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DatePickerField"], {
                                            value: dueDate,
                                            onChange: setDueDate
                                        }, void 0, false, {
                                            fileName: "[project]/strony_www/drozniak-landingpage/components/CommentForm.tsx",
                                            lineNumber: 175,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/strony_www/drozniak-landingpage/components/CommentForm.tsx",
                                    lineNumber: 173,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-xs font-medium text-gray-400 mb-1",
                                            children: "Przypisz do (email, opcjonalnie)"
                                        }, void 0, false, {
                                            fileName: "[project]/strony_www/drozniak-landingpage/components/CommentForm.tsx",
                                            lineNumber: 182,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "email",
                                            value: assignedTo,
                                            onChange: (e)=>setAssignedTo(e.target.value),
                                            placeholder: "email@example.com",
                                            className: "w-full bg-white/[0.04] border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30"
                                        }, void 0, false, {
                                            fileName: "[project]/strony_www/drozniak-landingpage/components/CommentForm.tsx",
                                            lineNumber: 183,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/strony_www/drozniak-landingpage/components/CommentForm.tsx",
                                    lineNumber: 181,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$CustomCheckbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CustomCheckbox"], {
                                        checked: requiresApproval,
                                        onChange: setRequiresApproval,
                                        label: "Wymaga akceptacji",
                                        align: "start"
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/CommentForm.tsx",
                                        lineNumber: 193,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/strony_www/drozniak-landingpage/components/CommentForm.tsx",
                                    lineNumber: 192,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true)
                    ]
                }, void 0, true, {
                    fileName: "[project]/strony_www/drozniak-landingpage/components/CommentForm.tsx",
                    lineNumber: 126,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-4 border-t border-white/10 flex items-center justify-end gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "px-4 py-2 bg-white/[0.06] border border-white/20 text-white/90 rounded text-sm font-medium hover:bg-white/10 transition-colors",
                            children: "Anuluj"
                        }, void 0, false, {
                            fileName: "[project]/strony_www/drozniak-landingpage/components/CommentForm.tsx",
                            lineNumber: 206,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleSubmit,
                            disabled: !content.trim() || saving,
                            className: "px-4 py-2 bg-[#fee715]/10 border border-[#fee715]/50 text-[#fee715] rounded text-sm font-medium hover:bg-[#fee715]/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
                            children: saving ? 'Zapisywanie...' : 'Utwórz wątek'
                        }, void 0, false, {
                            fileName: "[project]/strony_www/drozniak-landingpage/components/CommentForm.tsx",
                            lineNumber: 212,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/strony_www/drozniak-landingpage/components/CommentForm.tsx",
                    lineNumber: 205,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/strony_www/drozniak-landingpage/components/CommentForm.tsx",
            lineNumber: 113,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/strony_www/drozniak-landingpage/components/CommentForm.tsx",
        lineNumber: 112,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(CommentForm, "9kO9ga8ujasnjWHW0VY9Tph1scw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$app$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = CommentForm;
var _c;
__turbopack_context__.k.register(_c, "CommentForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=strony_www_drozniak-landingpage_components_fc60babd._.js.map