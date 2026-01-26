(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/strony_www/drozniak-landingpage/lib/supabase-client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/@supabase/supabase-js/dist/module/index.js [app-client] (ecmascript) <locals>");
'use client';
;
// W Next.js zmienne środowiskowe dla klienta MUSZĄ mieć prefix NEXT_PUBLIC_
// Dla kompatybilności wstecznej sprawdzamy też VITE_ (ale tylko jeśli są dostępne)
const supabaseUrl = ("TURBOPACK compile-time value", "https://lkygnllsgashwloxgmax.supabase.co") || typeof __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] !== 'undefined' && __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxreWdubGxzZ2FzaHdsb3hnbWF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwODEyODEsImV4cCI6MjA3OTY1NzI4MX0.i3q18pbNMmbMDRmUrWJ-Qusa3OnpqQxyQCSpMlUUuOE") || typeof __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] !== 'undefined' && __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.VITE_SUPABASE_ANON_KEY || '';
// Sprawdź czy zmienne środowiskowe są ustawione
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey);
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/strony_www/drozniak-landingpage/app/hooks/useAuth.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/lib/supabase-client.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const useAuth = ()=>{
    _s();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useAuth.useEffect": ()=>{
            // Sprawdź aktualną sesję
            __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.getSession().then({
                "useAuth.useEffect": ({ data: { session }, error })=>{
                    if (error) {
                        console.error('Błąd pobierania sesji:', error);
                    }
                    console.log('Sesja załadowana:', session?.user?.email || 'brak sesji');
                    setUser(session?.user ?? null);
                    setLoading(false);
                }
            }["useAuth.useEffect"]);
            // Nasłuchuj zmian w autentykacji
            const { data: { subscription } } = __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.onAuthStateChange({
                "useAuth.useEffect": (event, session)=>{
                    console.log('Zmiana stanu autentykacji:', event, session?.user?.email || 'brak sesji');
                    setUser(session?.user ?? null);
                    setLoading(false);
                }
            }["useAuth.useEffect"]);
            return ({
                "useAuth.useEffect": ()=>subscription.unsubscribe()
            })["useAuth.useEffect"];
        }
    }["useAuth.useEffect"], []);
    const signIn = async (email, password)=>{
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.signInWithPassword({
            email,
            password
        });
        return {
            data,
            error
        };
    };
    const updatePassword = async (newPassword)=>{
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.updateUser({
            password: newPassword
        });
        return {
            data,
            error
        };
    };
    const signOut = async ()=>{
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.signOut();
        return {
            error
        };
    };
    return {
        user,
        loading,
        signIn,
        signOut,
        updatePassword
    };
};
_s(useAuth, "NiO5z6JIqzX62LS5UWDgIqbZYyY=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/strony_www/drozniak-landingpage/components/LoadingState.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LoadingState",
    ()=>LoadingState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const Spinner = ({ size = 'md' })=>{
    const s = size === 'sm' ? 'w-5 h-5' : size === 'lg' ? 'w-10 h-10' : 'w-8 h-8';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `${s} rounded-full border-2 border-white/15 border-t-[#fee715] animate-spin`,
        role: "status",
        "aria-label": "Ładowanie"
    }, void 0, false, {
        fileName: "[project]/strony_www/drozniak-landingpage/components/LoadingState.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = Spinner;
const SkeletonBar = ({ className = '' })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `h-3 bg-white/10 rounded animate-pulse ${className}`
    }, void 0, false, {
        fileName: "[project]/strony_www/drozniak-landingpage/components/LoadingState.tsx",
        lineNumber: 24,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c1 = SkeletonBar;
const SkeletonCard = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white/5 rounded-xl p-5 border border-white/10 animate-pulse",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonBar, {
                        className: "h-4 w-32"
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/LoadingState.tsx",
                        lineNumber: 30,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonBar, {
                        className: "h-5 w-16 rounded-lg"
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/LoadingState.tsx",
                        lineNumber: 31,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/LoadingState.tsx",
                lineNumber: 29,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonBar, {
                className: "w-3/4 mb-2"
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/LoadingState.tsx",
                lineNumber: 33,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonBar, {
                className: "w-1/2 mb-4"
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/LoadingState.tsx",
                lineNumber: 34,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-2 mt-4 pt-4 border-t border-white/10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonBar, {
                        className: "h-8 flex-1 rounded-lg"
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/LoadingState.tsx",
                        lineNumber: 36,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonBar, {
                        className: "h-8 w-20 rounded-lg"
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/LoadingState.tsx",
                        lineNumber: 37,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/LoadingState.tsx",
                lineNumber: 35,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/strony_www/drozniak-landingpage/components/LoadingState.tsx",
        lineNumber: 28,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c2 = SkeletonCard;
const CardsSkeleton = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid md:grid-cols-2 lg:grid-cols-3 gap-4",
        children: [
            1,
            2,
            3,
            4,
            5,
            6
        ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonCard, {}, i, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/LoadingState.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)))
    }, void 0, false, {
        fileName: "[project]/strony_www/drozniak-landingpage/components/LoadingState.tsx",
        lineNumber: 43,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c3 = CardsSkeleton;
const RowsSkeleton = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-3",
        children: [
            1,
            2,
            3,
            4,
            5
        ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-4 py-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonBar, {
                        className: "h-4 flex-1 max-w-[200px]"
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/LoadingState.tsx",
                        lineNumber: 54,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonBar, {
                        className: "h-4 flex-1 max-w-[120px]"
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/LoadingState.tsx",
                        lineNumber: 55,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonBar, {
                        className: "h-4 w-24"
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/LoadingState.tsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, i, true, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/LoadingState.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)))
    }, void 0, false, {
        fileName: "[project]/strony_www/drozniak-landingpage/components/LoadingState.tsx",
        lineNumber: 51,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c4 = RowsSkeleton;
const TableSkeleton = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "border border-white/10 rounded-lg overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-4 px-3 py-2.5 bg-white/5 border-b border-white/10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonBar, {
                        className: "h-3.5 w-24"
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/LoadingState.tsx",
                        lineNumber: 65,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonBar, {
                        className: "h-3.5 w-20"
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/LoadingState.tsx",
                        lineNumber: 66,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonBar, {
                        className: "h-3.5 flex-1"
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/LoadingState.tsx",
                        lineNumber: 67,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonBar, {
                        className: "h-3.5 w-14"
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/LoadingState.tsx",
                        lineNumber: 68,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/LoadingState.tsx",
                lineNumber: 64,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            [
                1,
                2,
                3,
                4,
                5
            ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-4 px-3 py-2.5 border-b border-white/5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonBar, {
                            className: "h-4 flex-1 max-w-[180px]"
                        }, void 0, false, {
                            fileName: "[project]/strony_www/drozniak-landingpage/components/LoadingState.tsx",
                            lineNumber: 72,
                            columnNumber: 9
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonBar, {
                            className: "h-4 flex-1 max-w-[100px]"
                        }, void 0, false, {
                            fileName: "[project]/strony_www/drozniak-landingpage/components/LoadingState.tsx",
                            lineNumber: 73,
                            columnNumber: 9
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonBar, {
                            className: "h-4 flex-1"
                        }, void 0, false, {
                            fileName: "[project]/strony_www/drozniak-landingpage/components/LoadingState.tsx",
                            lineNumber: 74,
                            columnNumber: 9
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonBar, {
                            className: "h-4 w-12"
                        }, void 0, false, {
                            fileName: "[project]/strony_www/drozniak-landingpage/components/LoadingState.tsx",
                            lineNumber: 75,
                            columnNumber: 9
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, i, true, {
                    fileName: "[project]/strony_www/drozniak-landingpage/components/LoadingState.tsx",
                    lineNumber: 71,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)))
        ]
    }, void 0, true, {
        fileName: "[project]/strony_www/drozniak-landingpage/components/LoadingState.tsx",
        lineNumber: 63,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c5 = TableSkeleton;
const LoadingState = ({ variant = 'block', label = 'Ładowanie…', skeleton })=>{
    if (skeleton && variant === 'block') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "py-4",
            children: [
                skeleton === 'cards' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CardsSkeleton, {}, void 0, false, {
                    fileName: "[project]/strony_www/drozniak-landingpage/components/LoadingState.tsx",
                    lineNumber: 89,
                    columnNumber: 34
                }, ("TURBOPACK compile-time value", void 0)),
                skeleton === 'rows' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RowsSkeleton, {}, void 0, false, {
                    fileName: "[project]/strony_www/drozniak-landingpage/components/LoadingState.tsx",
                    lineNumber: 90,
                    columnNumber: 33
                }, ("TURBOPACK compile-time value", void 0)),
                skeleton === 'table' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TableSkeleton, {}, void 0, false, {
                    fileName: "[project]/strony_www/drozniak-landingpage/components/LoadingState.tsx",
                    lineNumber: 91,
                    columnNumber: 34
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/strony_www/drozniak-landingpage/components/LoadingState.tsx",
            lineNumber: 88,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    if (variant === 'fullscreen') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-[#101820] flex flex-col items-center justify-center gap-4 px-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Spinner, {
                    size: "lg"
                }, void 0, false, {
                    fileName: "[project]/strony_www/drozniak-landingpage/components/LoadingState.tsx",
                    lineNumber: 99,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm text-gray-400",
                    children: label
                }, void 0, false, {
                    fileName: "[project]/strony_www/drozniak-landingpage/components/LoadingState.tsx",
                    lineNumber: 100,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/strony_www/drozniak-landingpage/components/LoadingState.tsx",
            lineNumber: 98,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    if (variant === 'inline') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center gap-2 py-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Spinner, {
                    size: "sm"
                }, void 0, false, {
                    fileName: "[project]/strony_www/drozniak-landingpage/components/LoadingState.tsx",
                    lineNumber: 108,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-sm text-gray-400",
                    children: label
                }, void 0, false, {
                    fileName: "[project]/strony_www/drozniak-landingpage/components/LoadingState.tsx",
                    lineNumber: 109,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/strony_www/drozniak-landingpage/components/LoadingState.tsx",
            lineNumber: 107,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    // block
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center justify-center gap-3 py-12",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Spinner, {
                size: "md"
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/LoadingState.tsx",
                lineNumber: 117,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-gray-400",
                children: label
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/LoadingState.tsx",
                lineNumber: 118,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/strony_www/drozniak-landingpage/components/LoadingState.tsx",
        lineNumber: 116,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c6 = LoadingState;
var _c, _c1, _c2, _c3, _c4, _c5, _c6;
__turbopack_context__.k.register(_c, "Spinner");
__turbopack_context__.k.register(_c1, "SkeletonBar");
__turbopack_context__.k.register(_c2, "SkeletonCard");
__turbopack_context__.k.register(_c3, "CardsSkeleton");
__turbopack_context__.k.register(_c4, "RowsSkeleton");
__turbopack_context__.k.register(_c5, "TableSkeleton");
__turbopack_context__.k.register(_c6, "LoadingState");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/strony_www/drozniak-landingpage/app/panel/layout.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PanelLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$app$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/app/hooks/useAuth.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$LoadingState$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/components/LoadingState.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function PanelLayout({ children }) {
    _s();
    const { user, loading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$app$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PanelLayout.useEffect": ()=>{
            if (!loading && !user) {
                router.push('/login');
            }
        }
    }["PanelLayout.useEffect"], [
        user,
        loading,
        router
    ]);
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$LoadingState$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LoadingState"], {
            variant: "fullscreen",
            label: "Ładowanie panelu…"
        }, void 0, false, {
            fileName: "[project]/strony_www/drozniak-landingpage/app/panel/layout.tsx",
            lineNumber: 23,
            columnNumber: 12
        }, this);
    }
    if (!user) {
        return null; // Przekierowanie w useEffect
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
}
_s(PanelLayout, "Zr2WDa/YWeMetzDhcnOimt0LiKE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$app$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = PanelLayout;
var _c;
__turbopack_context__.k.register(_c, "PanelLayout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=strony_www_drozniak-landingpage_3444d15c._.js.map