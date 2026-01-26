module.exports = [
"[project]/strony_www/drozniak-landingpage/app/hooks/useClientPanel.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useClientPanel",
    ()=>useClientPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/lib/supabase-client.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$app$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/app/hooks/useAuth.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
const useClientPanel = ()=>{
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$app$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const [panelClient, setPanelClient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [viewGrants, setViewGrants] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!user) {
            setPanelClient(null);
            setViewGrants([]);
            setLoading(false);
            return;
        }
        load();
    }, [
        user?.id
    ]);
    const load = async ()=>{
        if (!user) return;
        setLoading(true);
        try {
            console.log('useClientPanel: loading for user', user.id, user.email);
            // Używamy funkcji SECURITY DEFINER zamiast bezpośredniego zapytania - omija RLS
            const [pcRes, grantsRes] = await Promise.all([
                __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].rpc('get_my_panel_client'),
                __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].rpc('get_my_view_grants')
            ]);
            console.log('useClientPanel: pcRes (from RPC)', pcRes);
            console.log('useClientPanel: pcRes.data', pcRes.data);
            console.log('useClientPanel: pcRes.error', pcRes.error);
            console.log('useClientPanel: grantsRes', grantsRes);
            console.log('useClientPanel: grantsRes.data', grantsRes.data);
            console.log('useClientPanel: grantsRes.error', grantsRes.error);
            if (pcRes.error) {
                console.error('useClientPanel: get_my_panel_client error', pcRes.error);
                console.error('useClientPanel: error details', JSON.stringify(pcRes.error, null, 2));
                setPanelClient(null);
                setViewGrants([]);
                return;
            }
            // get_my_panel_client zwraca TABLE, więc data to array
            const pcData = Array.isArray(pcRes.data) && pcRes.data.length > 0 ? pcRes.data[0] : null;
            setPanelClient(pcData ? {
                id: pcData.id,
                marketing_client_id: pcData.marketing_client_id
            } : null);
            // Jeśli nie ma panel_clients, nie ma też view_grants
            if (!pcData) {
                setViewGrants([]);
                return;
            }
            if (grantsRes.error) {
                console.error('useClientPanel: get_my_view_grants error', grantsRes.error);
                setViewGrants([]);
                return;
            }
            const tags = Array.isArray(grantsRes.data) ? grantsRes.data : [];
            setViewGrants(tags.filter((t)=>[
                    'documents',
                    'courses',
                    'marketing',
                    'data',
                    'projects'
                ].includes(t)));
        } catch (e) {
            console.error('useClientPanel load error:', e);
            setPanelClient(null);
            setViewGrants([]);
        } finally{
            setLoading(false);
        }
    };
    return {
        panelClient,
        viewGrants,
        loading,
        reload: load
    };
};
}),
"[project]/strony_www/drozniak-landingpage/app/components/UserMenu.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UserMenu",
    ()=>UserMenu
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$app$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/app/hooks/useAuth.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
const UserMenu = ({ onPasswordChange, onProfileClick })=>{
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const menuRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { signOut } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$app$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleClickOutside = (event)=>{
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return ()=>{
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [
        isOpen
    ]);
    const handleSignOut = async ()=>{
        await signOut();
        router.push('/login');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative",
        ref: menuRef,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setIsOpen(!isOpen),
                className: "flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-200",
                "aria-label": "Menu użytkownika",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-4 h-4 text-white",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/app/components/UserMenu.tsx",
                        lineNumber: 52,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/strony_www/drozniak-landingpage/app/components/UserMenu.tsx",
                    lineNumber: 46,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/app/components/UserMenu.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute right-0 mt-1.5 w-44 bg-[#18232F] border border-white/20 rounded-lg shadow-xl overflow-hidden z-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "py-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>{
                                onProfileClick();
                                setIsOpen(false);
                            },
                            className: "w-full px-3 py-2 text-left text-sm text-gray-200 hover:bg-white/10 transition-colors flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-4 h-4 text-[#fee715] flex-shrink-0",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/app/components/UserMenu.tsx",
                                        lineNumber: 77,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/strony_www/drozniak-landingpage/app/components/UserMenu.tsx",
                                    lineNumber: 71,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Mój profil"
                                }, void 0, false, {
                                    fileName: "[project]/strony_www/drozniak-landingpage/app/components/UserMenu.tsx",
                                    lineNumber: 84,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/strony_www/drozniak-landingpage/app/components/UserMenu.tsx",
                            lineNumber: 64,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "border-t border-white/10 my-1"
                        }, void 0, false, {
                            fileName: "[project]/strony_www/drozniak-landingpage/app/components/UserMenu.tsx",
                            lineNumber: 86,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>{
                                onPasswordChange();
                                setIsOpen(false);
                            },
                            className: "w-full px-3 py-2 text-left text-sm text-gray-200 hover:bg-white/10 transition-colors flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-4 h-4 text-[#fee715] flex-shrink-0",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/app/components/UserMenu.tsx",
                                        lineNumber: 100,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/strony_www/drozniak-landingpage/app/components/UserMenu.tsx",
                                    lineNumber: 94,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Zmień hasło"
                                }, void 0, false, {
                                    fileName: "[project]/strony_www/drozniak-landingpage/app/components/UserMenu.tsx",
                                    lineNumber: 107,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/strony_www/drozniak-landingpage/app/components/UserMenu.tsx",
                            lineNumber: 87,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "border-t border-white/10 my-1"
                        }, void 0, false, {
                            fileName: "[project]/strony_www/drozniak-landingpage/app/components/UserMenu.tsx",
                            lineNumber: 109,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleSignOut,
                            className: "w-full px-3 py-2 text-left text-sm text-gray-200 hover:bg-white/10 transition-colors flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-4 h-4 text-[#fee715] flex-shrink-0",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/app/components/UserMenu.tsx",
                                        lineNumber: 120,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/strony_www/drozniak-landingpage/app/components/UserMenu.tsx",
                                    lineNumber: 114,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Wyloguj"
                                }, void 0, false, {
                                    fileName: "[project]/strony_www/drozniak-landingpage/app/components/UserMenu.tsx",
                                    lineNumber: 127,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/strony_www/drozniak-landingpage/app/components/UserMenu.tsx",
                            lineNumber: 110,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/strony_www/drozniak-landingpage/app/components/UserMenu.tsx",
                    lineNumber: 63,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/app/components/UserMenu.tsx",
                lineNumber: 62,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/strony_www/drozniak-landingpage/app/components/UserMenu.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/strony_www/drozniak-landingpage/components/ClientDocumentsView.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ClientDocumentsView",
    ()=>ClientDocumentsView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/lib/supabase-client.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$app$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/app/hooks/useAuth.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$app$2f$hooks$2f$useClientPanel$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/app/hooks/useClientPanel.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$LoadingState$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/components/LoadingState.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$FileText$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/FileText.esm.js [app-ssr] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$CheckCircle$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/CheckCircle.esm.js [app-ssr] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Eye$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/phosphor-react/dist/icons/Eye.esm.js [app-ssr] (ecmascript) <export default as Eye>");
;
;
;
;
;
;
;
const ClientDocumentsView = ()=>{
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$app$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const { panelClient } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$app$2f$hooks$2f$useClientPanel$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useClientPanel"])();
    const [docs, setDocs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [proposals, setProposals] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!user) return;
        (async ()=>{
            setLoading(true);
            // Pobierz dokumenty
            const { data: docsData, error: docsError } = await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('client_documents').select('id, doc_type, name, file_url, created_at').order('created_at', {
                ascending: false
            });
            if (!docsError) setDocs(docsData || []);
            // Pobierz oferty (jeśli panelClient istnieje, RLS zadziała automatycznie)
            if (panelClient) {
                const { data: propsData, error: propsError } = await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('proposals').select('id, title, status, created_at, valid_until').order('created_at', {
                    ascending: false
                });
                if (!propsError && propsData) {
                    // Pobierz linki dostępu dla każdej oferty (jeśli istnieją)
                    const proposalsWithLinks = await Promise.all(propsData.map(async (prop)=>{
                        const { data: linkData } = await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('proposal_access_links').select('token').eq('proposal_id', prop.id).eq('status', 'active').single();
                        return {
                            ...prop,
                            access_link: linkData || null
                        };
                    }));
                    setProposals(proposalsWithLinks);
                }
            }
            setLoading(false);
        })();
    }, [
        user?.id,
        panelClient?.id
    ]);
    const typeLabel = {
        offer: 'Oferta',
        invoice: 'Faktura',
        contract: 'Umowa',
        other: 'Inny'
    };
    const getStatusLabel = (status)=>{
        const labels = {
            draft: 'Szkic',
            sent: 'Wysłana',
            viewed: 'Otworzona',
            accepted: 'Zaakceptowana',
            expired: 'Wygasła',
            archived: 'Zarchiwizowana'
        };
        return labels[status] || status;
    };
    const getStatusColor = (status)=>{
        const colors = {
            draft: 'text-gray-400',
            sent: 'text-blue-400',
            viewed: 'text-purple-400',
            accepted: 'text-green-400',
            expired: 'text-gray-500',
            archived: 'text-gray-500'
        };
        return colors[status] || 'text-gray-400';
    };
    const handleOpenProposal = (proposal)=>{
        if (proposal.access_link) {
            // Otwórz publiczny link w nowej karcie
            window.open(`/p/${proposal.access_link.token}`, '_blank');
        }
    };
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$LoadingState$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LoadingState"], {
            variant: "block",
            label: "Ładowanie dokumentów…"
        }, void 0, false, {
            fileName: "[project]/strony_www/drozniak-landingpage/components/ClientDocumentsView.tsx",
            lineNumber: 101,
            columnNumber: 12
        }, ("TURBOPACK compile-time value", void 0));
    }
    const hasContent = docs.length > 0 || proposals.length > 0;
    if (!hasContent) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "py-8 px-4 rounded-lg bg-white/5 border border-white/10 text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-gray-400 text-sm",
                    children: "Brak dokumentów i ofert"
                }, void 0, false, {
                    fileName: "[project]/strony_www/drozniak-landingpage/components/ClientDocumentsView.tsx",
                    lineNumber: 109,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-gray-500 text-xs mt-1",
                    children: "Oferty, faktury i umowy pojawią się tutaj po dodaniu przez administratora."
                }, void 0, false, {
                    fileName: "[project]/strony_www/drozniak-landingpage/components/ClientDocumentsView.tsx",
                    lineNumber: 110,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/strony_www/drozniak-landingpage/components/ClientDocumentsView.tsx",
            lineNumber: 108,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            proposals.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-base font-semibold text-white mb-3 flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$FileText$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                size: 18,
                                weight: "regular"
                            }, void 0, false, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/ClientDocumentsView.tsx",
                                lineNumber: 121,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            "Oferty"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/ClientDocumentsView.tsx",
                        lineNumber: 120,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "divide-y divide-white/10",
                        children: proposals.map((prop)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "py-3 flex items-center justify-between gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-white text-sm",
                                                        children: prop.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/ClientDocumentsView.tsx",
                                                        lineNumber: 129,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    prop.status === 'accepted' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$CheckCircle$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                        size: 16,
                                                        weight: "bold",
                                                        className: "text-green-400"
                                                    }, void 0, false, {
                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/ClientDocumentsView.tsx",
                                                        lineNumber: 131,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/ClientDocumentsView.tsx",
                                                lineNumber: 128,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3 mt-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `text-xs ${getStatusColor(prop.status)}`,
                                                        children: getStatusLabel(prop.status)
                                                    }, void 0, false, {
                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/ClientDocumentsView.tsx",
                                                        lineNumber: 135,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs text-gray-500",
                                                        children: new Date(prop.created_at).toLocaleDateString('pl-PL')
                                                    }, void 0, false, {
                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/ClientDocumentsView.tsx",
                                                        lineNumber: 138,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    prop.valid_until && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs text-gray-500",
                                                        children: [
                                                            "Ważna do: ",
                                                            new Date(prop.valid_until).toLocaleDateString('pl-PL')
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/strony_www/drozniak-landingpage/components/ClientDocumentsView.tsx",
                                                        lineNumber: 142,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/ClientDocumentsView.tsx",
                                                lineNumber: 134,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/ClientDocumentsView.tsx",
                                        lineNumber: 127,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    prop.access_link ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleOpenProposal(prop),
                                        className: "flex items-center gap-1 px-3 py-1.5 bg-[#fee715] text-[#101820] rounded-lg hover:bg-[#fee715]/90 text-xs font-semibold transition-all",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$phosphor$2d$react$2f$dist$2f$icons$2f$Eye$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                                size: 14,
                                                weight: "regular"
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/ClientDocumentsView.tsx",
                                                lineNumber: 153,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            "Otwórz"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/ClientDocumentsView.tsx",
                                        lineNumber: 149,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-gray-500",
                                        children: "Brak linku"
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/ClientDocumentsView.tsx",
                                        lineNumber: 157,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, prop.id, true, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/ClientDocumentsView.tsx",
                                lineNumber: 126,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/ClientDocumentsView.tsx",
                        lineNumber: 124,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/ClientDocumentsView.tsx",
                lineNumber: 119,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            docs.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-base font-semibold text-white mb-3",
                        children: "Umowy i dokumenty"
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/ClientDocumentsView.tsx",
                        lineNumber: 168,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "divide-y divide-white/10",
                        children: docs.map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "py-3 flex items-center justify-between gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-white text-sm",
                                                children: d.name
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/ClientDocumentsView.tsx",
                                                lineNumber: 173,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "ml-2 text-xs text-gray-500",
                                                children: [
                                                    "(",
                                                    typeLabel[d.doc_type] || d.doc_type,
                                                    ")"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/components/ClientDocumentsView.tsx",
                                                lineNumber: 174,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/ClientDocumentsView.tsx",
                                        lineNumber: 172,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    d.file_url && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: d.file_url,
                                        target: "_blank",
                                        rel: "noopener noreferrer",
                                        className: "text-xs text-[#00C9A7] hover:underline",
                                        children: "Pobierz"
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/ClientDocumentsView.tsx",
                                        lineNumber: 177,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, d.id, true, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/ClientDocumentsView.tsx",
                                lineNumber: 171,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/ClientDocumentsView.tsx",
                        lineNumber: 169,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/ClientDocumentsView.tsx",
                lineNumber: 167,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/strony_www/drozniak-landingpage/components/ClientDocumentsView.tsx",
        lineNumber: 116,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/strony_www/drozniak-landingpage/components/ClientMarketingView.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ClientMarketingView",
    ()=>ClientMarketingView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$react$2d$router$2d$dom$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/react-router-dom/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/lib/supabase-client.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$LoadingState$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/components/LoadingState.tsx [app-ssr] (ecmascript)");
;
;
;
;
;
const ClientMarketingView = ({ panelClient })=>{
    const navigate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$react$2d$router$2d$dom$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useNavigate"])();
    const [funnels, setFunnels] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!panelClient?.marketing_client_id) {
            setFunnels([]);
            setLoading(false);
            return;
        }
        (async ()=>{
            setLoading(true);
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('funnel_diagrams').select('id, project_name, status, updated_at').in('status', [
                'active',
                'draft'
            ]); // Pokaż również szkice (draft) dla klienta
            if (error) {
                setFunnels([]);
                setLoading(false);
                return;
            }
            const { data: access } = await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('funnel_access').select('funnel_id').eq('client_id', panelClient.marketing_client_id);
            const allowed = new Set((access || []).map((a)=>a.funnel_id));
            setFunnels((data || []).filter((f)=>allowed.has(f.id)));
            setLoading(false);
        })();
    }, [
        panelClient?.marketing_client_id
    ]);
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$LoadingState$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LoadingState"], {
            variant: "block",
            label: "Ładowanie lejków…"
        }, void 0, false, {
            fileName: "[project]/strony_www/drozniak-landingpage/components/ClientMarketingView.tsx",
            lineNumber: 51,
            columnNumber: 12
        }, ("TURBOPACK compile-time value", void 0));
    }
    if (!panelClient?.marketing_client_id || funnels.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "py-8 px-4 rounded-lg bg-white/5 border border-white/10 text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-gray-400 text-sm",
                    children: "Brak lejków"
                }, void 0, false, {
                    fileName: "[project]/strony_www/drozniak-landingpage/components/ClientMarketingView.tsx",
                    lineNumber: 57,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-gray-500 text-xs mt-1",
                    children: "Lejki marketingowe przypisane do Twojego konta pojawią się tutaj."
                }, void 0, false, {
                    fileName: "[project]/strony_www/drozniak-landingpage/components/ClientMarketingView.tsx",
                    lineNumber: 58,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/strony_www/drozniak-landingpage/components/ClientMarketingView.tsx",
            lineNumber: 56,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-base font-semibold text-white mb-3",
                children: "Lejki marketingowe"
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/ClientMarketingView.tsx",
                lineNumber: 65,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "divide-y divide-white/10",
                children: funnels.map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        className: "py-3 flex items-center justify-between gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-white text-sm",
                                children: f.project_name
                            }, void 0, false, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/ClientMarketingView.tsx",
                                lineNumber: 69,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>navigate(`/panel/marketing/${f.id}`),
                                className: "text-xs text-[#00C9A7] hover:underline",
                                children: "Otwórz"
                            }, void 0, false, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/ClientMarketingView.tsx",
                                lineNumber: 70,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, f.id, true, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/ClientMarketingView.tsx",
                        lineNumber: 68,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/ClientMarketingView.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/strony_www/drozniak-landingpage/components/ClientMarketingView.tsx",
        lineNumber: 64,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/strony_www/drozniak-landingpage/lib/supabase.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/@supabase/supabase-js/dist/module/index.js [app-ssr] (ecmascript) <locals>");
const __TURBOPACK__import$2e$meta__ = {
    get url () {
        return `file://${__turbopack_context__.P("strony_www/drozniak-landingpage/lib/supabase.ts")}`;
    }
};
;
const supabaseUrl = __TURBOPACK__import$2e$meta__.env.VITE_SUPABASE_URL;
const supabaseAnonKey = __TURBOPACK__import$2e$meta__.env.VITE_SUPABASE_ANON_KEY;
// Sprawdź czy zmienne środowiskowe są ustawione
if (!supabaseUrl || !supabaseAnonKey) {
    const errorMessage = `
╔══════════════════════════════════════════════════════════════╗
║  BŁĄD: Brakuje zmiennych środowiskowych Supabase!           ║
╠══════════════════════════════════════════════════════════════╣
║  Utwórz plik .env.local w głównym katalogu projektu i dodaj: ║
║                                                              ║
║  VITE_SUPABASE_URL=https://twoj-projekt.supabase.co          ║
║  VITE_SUPABASE_ANON_KEY=twoj-anon-key                       ║
║                                                              ║
║  Po dodaniu zmiennych zrestartuj serwer dev (Ctrl+C i npm   ║
║  run dev ponownie).                                          ║
╚══════════════════════════════════════════════════════════════╝
  `;
    console.error(errorMessage);
    throw new Error('Missing Supabase environment variables. Check console for details.');
}
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey);
}),
"[project]/strony_www/drozniak-landingpage/hooks/useAuth.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/lib/supabase.ts [app-ssr] (ecmascript)");
;
;
const useAuth = ()=>{
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Sprawdź aktualną sesję
        __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.getSession().then(({ data: { session }, error })=>{
            if (error) {
                console.error('Błąd pobierania sesji:', error);
            }
            console.log('Sesja załadowana:', session?.user?.email || 'brak sesji');
            setUser(session?.user ?? null);
            setLoading(false);
        });
        // Nasłuchuj zmian w autentykacji
        const { data: { subscription } } = __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.onAuthStateChange((event, session)=>{
            console.log('Zmiana stanu autentykacji:', event, session?.user?.email || 'brak sesji');
            setUser(session?.user ?? null);
            setLoading(false);
        });
        return ()=>subscription.unsubscribe();
    }, []);
    const signIn = async (email, password)=>{
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.signInWithPassword({
            email,
            password
        });
        return {
            data,
            error
        };
    };
    const updatePassword = async (newPassword)=>{
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.updateUser({
            password: newPassword
        });
        return {
            data,
            error
        };
    };
    const signOut = async ()=>{
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.signOut();
        return {
            error
        };
    };
    return {
        user,
        loading,
        signIn,
        updatePassword,
        signOut
    };
};
}),
"[project]/strony_www/drozniak-landingpage/components/AlertModal.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AlertModal",
    ()=>AlertModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
const AlertModal = ({ isOpen, title, message, buttonText = 'OK', onClose, type = 'info' })=>{
    if (!isOpen) return null;
    const typeStyles = {
        success: {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: "w-8 h-8 text-green-400",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: "w-8 h-8 text-red-400",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: "w-8 h-8 text-blue-400",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: "w-8 h-8 text-yellow-400",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-black/70 backdrop-blur-sm",
                onClick: onClose
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/AlertModal.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `relative bg-gradient-to-br from-[#18232F] to-[#101820] rounded-2xl border-2 ${styles.border} shadow-2xl max-w-md w-full p-6 md:p-8 transform transition-all`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start gap-4 mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-shrink-0",
                                children: styles.icon
                            }, void 0, false, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/AlertModal.tsx",
                                lineNumber: 74,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-[Montserrat] text-2xl font-bold text-white mb-2",
                                        children: title
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/AlertModal.tsx",
                                        lineNumber: 78,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-end",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
}),
"[project]/strony_www/drozniak-landingpage/components/ClientDataView.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ClientDataView",
    ()=>ClientDataView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/hooks/useAuth.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/lib/supabase-client.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$AlertModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/components/AlertModal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$LoadingState$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/components/LoadingState.tsx [app-ssr] (ecmascript)");
;
;
;
;
;
;
const ClientDataView = ()=>{
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [profileData, setProfileData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        company_name: '',
        first_name: '',
        last_name: '',
        phone: '',
        notes: '',
        email: '',
        display_name: ''
    });
    const [alert, setAlert] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        isOpen: false,
        title: '',
        message: '',
        type: 'info'
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!user) return;
        setProfileData((p)=>({
                ...p,
                email: user.email || ''
            }));
        (async ()=>{
            const [profileRes, panelClientRes] = await Promise.all([
                __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('profiles').select('*').eq('id', user.id).maybeSingle(),
                // Używamy select('*') zamiast tylko display_name - jeśli kolumna nie istnieje, zwróci błąd, ale możemy go obsłużyć
                __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('panel_clients').select('*').eq('user_id', user.id).maybeSingle()
            ]);
            if (!profileRes.error && profileRes.data) {
                setProfileData((p)=>({
                        ...p,
                        company_name: profileRes.data.company_name || '',
                        first_name: profileRes.data.first_name || '',
                        last_name: profileRes.data.last_name || '',
                        phone: profileRes.data.phone || '',
                        notes: profileRes.data.notes || '',
                        email: user.email || ''
                    }));
            }
            // Obsługa panel_clients - jeśli jest błąd 400 (kolumna nie istnieje), ignoruj
            if (!panelClientRes.error && panelClientRes.data) {
                setProfileData((p)=>({
                        ...p,
                        display_name: panelClientRes.data?.display_name || ''
                    }));
            } else if (panelClientRes.error && panelClientRes.error.code !== 'PGRST116' && panelClientRes.error.message?.includes('400')) {
                // Błąd 400 - prawdopodobnie kolumna display_name nie istnieje
                // Zignoruj błąd - display_name pozostanie pusty
                console.warn('Kolumna display_name może nie istnieć w panel_clients:', panelClientRes.error);
            }
            setLoading(false);
        })();
    }, [
        user?.id
    ]);
    const onSave = async (e)=>{
        e.preventDefault();
        if (!user) return;
        setSaving(true);
        try {
            const fullName = [
                profileData.first_name,
                profileData.last_name
            ].filter(Boolean).join(' ') || null;
            // Zapisz do profiles
            const { error: profileError } = await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('profiles').upsert({
                id: user.id,
                company_name: profileData.company_name || null,
                first_name: profileData.first_name || null,
                last_name: profileData.last_name || null,
                phone: profileData.phone || null,
                notes: profileData.notes || null,
                full_name: fullName,
                updated_at: new Date().toISOString()
            }, {
                onConflict: 'id'
            });
            if (profileError) throw profileError;
            // Zapisz display_name do panel_clients (jeśli istnieje)
            const { data: pcData } = await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('panel_clients').select('id').eq('user_id', user.id).maybeSingle();
            if (pcData) {
                const { error: pcError } = await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('panel_clients').update({
                    display_name: profileData.display_name.trim() || null
                }).eq('id', pcData.id);
                if (pcError) throw pcError;
            }
            setAlert({
                isOpen: true,
                title: 'Sukces',
                message: 'Dane zapisane.',
                type: 'success'
            });
        } catch (err) {
            setAlert({
                isOpen: true,
                title: 'Błąd',
                message: err?.message || 'Błąd zapisu.',
                type: 'error'
            });
        } finally{
            setSaving(false);
        }
    };
    if (loading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$LoadingState$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LoadingState"], {
        variant: "inline",
        label: "Ładowanie danych…"
    }, void 0, false, {
        fileName: "[project]/strony_www/drozniak-landingpage/components/ClientDataView.tsx",
        lineNumber: 109,
        columnNumber: 23
    }, ("TURBOPACK compile-time value", void 0));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-base font-semibold text-white",
                children: "Dane"
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/ClientDataView.tsx",
                lineNumber: 113,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: onSave,
                className: "bg-white/5 rounded-lg p-4 border border-white/10 space-y-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-xs font-medium text-gray-400 mb-1",
                                children: "Email"
                            }, void 0, false, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/ClientDataView.tsx",
                                lineNumber: 116,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "email",
                                value: profileData.email,
                                readOnly: true,
                                disabled: true,
                                className: "w-full bg-white/10 border border-white/10 rounded px-3 py-2 text-sm text-gray-400"
                            }, void 0, false, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/ClientDataView.tsx",
                                lineNumber: 117,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/ClientDataView.tsx",
                        lineNumber: 115,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-xs font-medium text-gray-400 mb-1",
                                children: "Nazwa firmy"
                            }, void 0, false, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/ClientDataView.tsx",
                                lineNumber: 120,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                value: profileData.company_name,
                                onChange: (e)=>setProfileData((p)=>({
                                            ...p,
                                            company_name: e.target.value
                                        })),
                                placeholder: "Nazwa firmy",
                                className: "w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:ring-1 focus:ring-[#fee715] focus:border-[#fee715]"
                            }, void 0, false, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/ClientDataView.tsx",
                                lineNumber: 121,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/ClientDataView.tsx",
                        lineNumber: 119,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-xs font-medium text-gray-400 mb-1",
                                        children: "Imię"
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/ClientDataView.tsx",
                                        lineNumber: 125,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: profileData.first_name,
                                        onChange: (e)=>setProfileData((p)=>({
                                                    ...p,
                                                    first_name: e.target.value
                                                })),
                                        placeholder: "Imię",
                                        className: "w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:ring-1 focus:ring-[#fee715] focus:border-[#fee715]"
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/ClientDataView.tsx",
                                        lineNumber: 126,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/ClientDataView.tsx",
                                lineNumber: 124,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-xs font-medium text-gray-400 mb-1",
                                        children: "Nazwisko"
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/ClientDataView.tsx",
                                        lineNumber: 129,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: profileData.last_name,
                                        onChange: (e)=>setProfileData((p)=>({
                                                    ...p,
                                                    last_name: e.target.value
                                                })),
                                        placeholder: "Nazwisko",
                                        className: "w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:ring-1 focus:ring-[#fee715] focus:border-[#fee715]"
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/ClientDataView.tsx",
                                        lineNumber: 130,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/ClientDataView.tsx",
                                lineNumber: 128,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/ClientDataView.tsx",
                        lineNumber: 123,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-xs font-medium text-gray-400 mb-1",
                                children: "Telefon"
                            }, void 0, false, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/ClientDataView.tsx",
                                lineNumber: 134,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "tel",
                                value: profileData.phone,
                                onChange: (e)=>setProfileData((p)=>({
                                            ...p,
                                            phone: e.target.value
                                        })),
                                placeholder: "Telefon",
                                className: "w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:ring-1 focus:ring-[#fee715] focus:border-[#fee715]"
                            }, void 0, false, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/ClientDataView.tsx",
                                lineNumber: 135,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/ClientDataView.tsx",
                        lineNumber: 133,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-xs font-medium text-gray-400 mb-1",
                                children: "Preferowane imię"
                            }, void 0, false, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/ClientDataView.tsx",
                                lineNumber: 138,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                value: profileData.display_name,
                                onChange: (e)=>setProfileData((p)=>({
                                            ...p,
                                            display_name: e.target.value
                                        })),
                                placeholder: "np. Franek",
                                className: "w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:ring-1 focus:ring-[#fee715] focus:border-[#fee715]"
                            }, void 0, false, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/ClientDataView.tsx",
                                lineNumber: 139,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-500 mt-1",
                                children: "Opcjonalne pole z preferowaną formą imienia."
                            }, void 0, false, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/ClientDataView.tsx",
                                lineNumber: 146,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/ClientDataView.tsx",
                        lineNumber: 137,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-xs font-medium text-gray-400 mb-1",
                                children: "Notatki / cele"
                            }, void 0, false, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/ClientDataView.tsx",
                                lineNumber: 149,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                value: profileData.notes,
                                onChange: (e)=>setProfileData((p)=>({
                                            ...p,
                                            notes: e.target.value
                                        })),
                                placeholder: "Notatki...",
                                rows: 3,
                                className: "w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:ring-1 focus:ring-[#fee715] focus:border-[#fee715] resize-none"
                            }, void 0, false, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/ClientDataView.tsx",
                                lineNumber: 150,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/ClientDataView.tsx",
                        lineNumber: 148,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pt-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "submit",
                            disabled: saving,
                            className: "px-4 py-2 bg-[#fee715] text-[#101820] text-sm font-semibold rounded-lg hover:bg-[#fee715]/90 disabled:opacity-50",
                            children: saving ? 'Zapisywanie…' : 'Zapisz'
                        }, void 0, false, {
                            fileName: "[project]/strony_www/drozniak-landingpage/components/ClientDataView.tsx",
                            lineNumber: 153,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/ClientDataView.tsx",
                        lineNumber: 152,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/ClientDataView.tsx",
                lineNumber: 114,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$AlertModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertModal"], {
                isOpen: alert.isOpen,
                title: alert.title,
                message: alert.message,
                type: alert.type,
                onClose: ()=>setAlert((a)=>({
                            ...a,
                            isOpen: false
                        }))
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/ClientDataView.tsx",
                lineNumber: 158,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/strony_www/drozniak-landingpage/components/ClientDataView.tsx",
        lineNumber: 112,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/strony_www/drozniak-landingpage/components/ClientProjectsView.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ClientProjectsView",
    ()=>ClientProjectsView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/lib/supabase-client.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/hooks/useAuth.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$LoadingState$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/components/LoadingState.tsx [app-ssr] (ecmascript)");
;
;
;
;
;
const ClientProjectsView = ()=>{
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const [projects, setProjects] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!user) return;
        (async ()=>{
            setLoading(true);
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('client_projects').select('id, project_type, name, status, updated_at').order('updated_at', {
                ascending: false
            });
            if (!error) setProjects(data || []);
            setLoading(false);
        })();
    }, [
        user?.id
    ]);
    const statusLabel = {
        draft: 'Szkic',
        in_progress: 'W trakcie',
        review: 'Do akceptacji',
        completed: 'Zakończony',
        on_hold: 'Wstrzymany'
    };
    const typeLabel = {
        website: 'Strona WWW',
        other: 'Inny'
    };
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$LoadingState$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LoadingState"], {
            variant: "block",
            label: "Ładowanie projektów…"
        }, void 0, false, {
            fileName: "[project]/strony_www/drozniak-landingpage/components/ClientProjectsView.tsx",
            lineNumber: 34,
            columnNumber: 12
        }, ("TURBOPACK compile-time value", void 0));
    }
    if (projects.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "py-8 px-4 rounded-lg bg-white/5 border border-white/10 text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-gray-400 text-sm",
                    children: "Brak projektów"
                }, void 0, false, {
                    fileName: "[project]/strony_www/drozniak-landingpage/components/ClientProjectsView.tsx",
                    lineNumber: 40,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-gray-500 text-xs mt-1",
                    children: "Projekty (np. strona www) i ich status pojawią się tutaj po dodaniu."
                }, void 0, false, {
                    fileName: "[project]/strony_www/drozniak-landingpage/components/ClientProjectsView.tsx",
                    lineNumber: 41,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/strony_www/drozniak-landingpage/components/ClientProjectsView.tsx",
            lineNumber: 39,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-base font-semibold text-white mb-3",
                children: "Projekty"
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/ClientProjectsView.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "divide-y divide-white/10",
                children: projects.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        className: "py-3 flex items-center justify-between gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-white text-sm",
                                        children: p.name
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/ClientProjectsView.tsx",
                                        lineNumber: 53,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ml-2 text-xs text-gray-500",
                                        children: [
                                            "(",
                                            typeLabel[p.project_type] || p.project_type,
                                            ")"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/components/ClientProjectsView.tsx",
                                        lineNumber: 54,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/ClientProjectsView.tsx",
                                lineNumber: 52,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-gray-400",
                                children: statusLabel[p.status] || p.status
                            }, void 0, false, {
                                fileName: "[project]/strony_www/drozniak-landingpage/components/ClientProjectsView.tsx",
                                lineNumber: 56,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, p.id, true, {
                        fileName: "[project]/strony_www/drozniak-landingpage/components/ClientProjectsView.tsx",
                        lineNumber: 51,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/components/ClientProjectsView.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/strony_www/drozniak-landingpage/components/ClientProjectsView.tsx",
        lineNumber: 47,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/strony_www/drozniak-landingpage/config/trainingModules.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Konfiguracja modułów i lekcji szkolenia
// Treści są placeholderami - będą dopracowane później
__turbopack_context__.s([
    "findLesson",
    ()=>findLesson,
    "findModule",
    ()=>findModule,
    "getNextLesson",
    ()=>getNextLesson,
    "getPreviousLesson",
    ()=>getPreviousLesson,
    "getTotalLessons",
    ()=>getTotalLessons,
    "trainingModules",
    ()=>trainingModules
]);
const trainingModules = [
    {
        id: '1',
        title: 'Podstawy marketingu online',
        icon: 'chart',
        lessons: [
            {
                id: '1.1',
                moduleId: '1',
                title: 'Wprowadzenie do marketingu cyfrowego',
                intro: `Marketing cyfrowy to wszystkie działania, które pomagają Twojej firmie zostać zauważoną, zbudować zaufanie i sprzedać swoje usługi z pomocą internetu.

Dla większości klientów pierwszy kontakt z firmą wygląda dziś tak:
• wpisują coś w Google,
• widzą stronę internetową, opinie, social media,
• dopiero później dzwonią, piszą lub rezerwują.

Jeśli nie ma Cię w tych miejscach – w praktyce nie istniejesz w świadomości dużej części rynku.`,
                whyImportant: `Marketing cyfrowy jest kluczowy, ponieważ:
• Klienci szukają w internecie – noclegu, restauracji, usług lokalnych, atrakcji.
• Porównują oferty – cena to tylko jeden element, równie ważne są opinie, zdjęcia, „wrażenie" online.
• Decyzję często podejmują jeszcze przed kontaktem z Tobą – na podstawie tego, co widzą w sieci.

Dobre podstawy marketingu online pozwalają:
• przyciągać więcej zapytań i rezerwacji bez zwiększania liczby godzin na telefonie,
• lepiej wykorzystywać sezon (i łagodzić „dziury" poza sezonem),
• bardziej świadomie decydować, w co warto inwestować, a co jest stratą czasu i pieniędzy.`,
                customerPath: `Jak wygląda ścieżka klienta w internecie (prosty schemat):

1. Zauważenie – ktoś widzi reklamę, post, opinię znajomego, wynik w Google.
2. Zainteresowanie – wchodzi na stronę, profil na Facebooku / Instagramie, czyta opinie.
3. Rozważanie – porównuje Twoją ofertę z innymi (cena, standard, opinie, dostępność).
4. Decyzja – dzwoni, pisze wiadomość, rezerwuje online.
5. Doświadczenie – korzysta z usługi (nocleg, jedzenie, zabieg, wyjazd).
6. Powrót / polecenie – zostawia opinię, wraca w kolejnym sezonie albo poleca znajomym.

Marketing online nie jest tylko „robieniem postów" – to świadome projektowanie tej ścieżki tak, żeby jak najwięcej osób dochodziło do kroku 4 i 6.`,
                keyElements: [
                    {
                        title: 'Strona internetowa (WWW)',
                        description: 'Twoja „siedziba" w internecie. To tutaj klient powinien:',
                        points: [
                            'zrozumieć, co oferujesz',
                            'zobaczyć zdjęcia i konkretne korzyści',
                            'łatwo znaleźć kontakt, cennik, sposób rezerwacji'
                        ],
                        icon: 'website'
                    },
                    {
                        title: 'Media społecznościowe (Facebook, Instagram)',
                        description: 'Miejsce do:',
                        points: [
                            'pokazywania „życia" firmy (aktualne zdjęcia, promocje, kulisy)',
                            'budowania zaufania (komentarze, reakcje, relacje)',
                            'prowadzenia płatnych kampanii do konkretnych odbiorców'
                        ],
                        icon: 'social'
                    },
                    {
                        title: 'Google (wizytówka + wyniki wyszukiwania)',
                        description: 'Kluczowe dla lokalnych biznesów:',
                        points: [
                            'wizytówka Google (opinie, zdjęcia, godziny otwarcia)',
                            'wyniki wyszukiwania typu „hotel + miejscowość", „pizzeria + miasto"'
                        ],
                        icon: 'google'
                    },
                    {
                        title: 'E-mail / newsletter',
                        description: 'Kanał do:',
                        points: [
                            'kontaktu z osobami, które już u Ciebie były',
                            'przypominania o ofercie (np. kolejny sezon, specjalne pakiety)',
                            'wysyłania ważnych informacji (potwierdzenia rezerwacji, instrukcje dojazdu)'
                        ],
                        icon: 'email'
                    },
                    {
                        title: 'Platformy zewnętrzne (Booking, Pyszne.pl, agregatory)',
                        description: 'Pomagają dotrzeć do ludzi, którzy Cię jeszcze nie znają, ale:',
                        points: [
                            'pobierają prowizje',
                            'budują też swoją markę, nie tylko Twoją'
                        ],
                        icon: 'platforms'
                    }
                ],
                practicalExamples: [
                    {
                        title: 'Przykład 1 – mały pensjonat w miejscowości turystycznej',
                        description: 'Pensjonat ma kilka pokoi, współpracuje z lokalnymi atrakcjami.\n\nJak może wykorzystać marketing cyfrowy:\n• aktualna strona WWW z prostym formularzem zapytań,\n• regularne posty na Facebooku pokazujące warunki pogodowe, widoki, dostępne terminy,\n• wizytówka Google z aktualnymi zdjęciami pokoi i prośbą o opinie od zadowolonych gości.',
                        effect: 'Efekt: więcej zapytań bez dodatkowych pośredników i lepsze obłożenie poza ścisłym sezonem.'
                    },
                    {
                        title: 'Przykład 2 – pizzeria z dostawą w średnim mieście',
                        description: 'Nowo otwarta pizzeria chce, żeby mieszkańcy w ogóle wiedzieli, że istnieje.\n\nMoże zrobić:\n• kampanię na Facebooku kierowaną tylko do osób mieszkających w okolicy (np. w promieniu 3–5 km),\n• krótkie filmy pokazujące przygotowanie pizzy, wnętrze lokalu, opinie pierwszych klientów,\n• prosty formularz lub numer do zamówień widoczny od razu po wejściu na stronę / profil.',
                        effect: 'Efekt: szybsze „wbicie się" w świadomość lokalną niż przez same ulotki.'
                    },
                    {
                        title: 'Przykład 3 – lokalny hotel / ośrodek',
                        description: 'Hotel żyje głównie z rezerwacji sezonowych, ale chciałby lepiej domknąć miejsca poza sezonem.\n\nMoże:\n• przygotować pakiety „weekendowe" i „ferie" opisane na stronie www,\n• kierować reklamy na Facebooku do rodzin z dziećmi z konkretnych regionów Polski,\n• wysyłać e-maile do osób, które były już kiedyś gośćmi, z propozycją powrotu w niższej cenie lub z dodatkowymi atrakcjami.',
                        effect: 'Efekt: bardziej równomierne obłożenie w ciągu roku, mniejsza zależność od jednego okresu.'
                    }
                ],
                quiz: [
                    {
                        id: 'q1',
                        type: 'choice',
                        question: 'Co jest głównym celem marketingu cyfrowego w małej firmie usługowej?',
                        options: [
                            'Tylko sprzedaż produktów i usług przez internet',
                            'Budowanie świadomości marki, zaufania i pozyskiwanie klientów z kanałów online',
                            'Zastąpienie całej obsługi klienta chatbotem',
                            'Wyłącznie reklamowanie się w social mediach'
                        ],
                        correctAnswer: 1,
                        feedback: 'Dokładnie tak – marketing cyfrowy to kompleksowe podejście, które obejmuje budowanie świadomości marki, relacji z klientami i prowadzenie działań promocyjnych w internecie.'
                    },
                    {
                        id: 'q2',
                        type: 'choice',
                        question: 'Które stwierdzenie najlepiej opisuje rolę strony internetowej?',
                        options: [
                            'To tylko wizytówka – i tak wszyscy siedzą na Facebooku',
                            'To centrum, w którym klient może zrozumieć ofertę, zobaczyć zdjęcia i łatwo się z Tobą skontaktować',
                            'To miejsce, gdzie wrzuca się regulamin i nic więcej',
                            'Jest potrzebna tylko dużym firmom'
                        ],
                        correctAnswer: 1,
                        feedback: 'Dokładnie tak – strona internetowa to Twoja „siedziba" w internecie, gdzie klient powinien zrozumieć ofertę, zobaczyć zdjęcia i łatwo znaleźć kontakt.'
                    },
                    {
                        id: 'q3',
                        type: 'choice',
                        question: 'Dlaczego wizytówka Google jest ważna dla lokalnego biznesu?',
                        options: [
                            'Bo bez niej nie da się prowadzić kampanii na Facebooku',
                            'Bo pozwala klientom szybko sprawdzić opinie, zdjęcia, lokalizację i dane kontaktowe',
                            'Bo zastępuje stronę internetową w 100%',
                            'Bo dzięki niej nie trzeba prowadzić social mediów'
                        ],
                        correctAnswer: 1,
                        feedback: 'Dokładnie tak – wizytówka Google jest kluczowa dla lokalnych biznesów, bo pozwala klientom szybko sprawdzić wszystkie najważniejsze informacje w jednym miejscu.'
                    },
                    {
                        id: 'q4',
                        type: 'open',
                        question: 'Napisz jednym–dwoma zdaniami: Na jakim etapie ścieżki klienta (zauważenie → zainteresowanie → rozważanie → decyzja → doświadczenie → powrót/polecenie) Twoja firma najbardziej traci potencjalnych klientów – i dlaczego tak uważasz?',
                        keywords: [
                            'zauważenie',
                            'zainteresowanie',
                            'rozważanie',
                            'decyzja',
                            'doświadczenie',
                            'powrót',
                            'polecenie',
                            'traci',
                            'klientów',
                            'etap'
                        ],
                        hint: 'Pomyśl o momencie, w którym potencjalny klient rezygnuje z kontaktu z Twoją firmą...',
                        feedback: 'Dziękuję za odpowiedź. To pytanie pomoże nam lepiej zrozumieć, gdzie Twoja firma może poprawić swoją obecność online.'
                    }
                ]
            },
            {
                id: '1.2',
                moduleId: '1',
                title: 'Rola mediów społecznościowych w strategii marketingowej',
                intro: `Media społecznościowe (głównie Facebook i Instagram) to dziś jedno z najważniejszych miejsc kontaktu firmy z klientem.

To tam:
• ludzie szukają opinii,
• sprawdzają „czy to miejsce żyje",
• podejmują decyzję: „spróbuję – nie spróbuję".

Profil w social media to nie jest „dodatek". To element strategii – obok strony WWW, Google i innych kanałów.`,
                whyImportant: [
                    {
                        title: 'Budować zaufanie',
                        description: 'Realne zdjęcia, komentarze, reakcje klientów',
                        points: [],
                        icon: 'trust'
                    },
                    {
                        title: 'Przypominać o sobie',
                        description: 'Szczególnie w branżach sezonowych',
                        points: [],
                        icon: 'remind'
                    },
                    {
                        title: 'Informować szybko',
                        description: 'O promocjach, wolnych terminach, zmianach godzin otwarcia',
                        points: [],
                        icon: 'info-fast'
                    },
                    {
                        title: 'Pokazywać „życie firmy"',
                        description: 'Co dzieje się na co dzień, jak wygląda obsługa, atmosfera',
                        points: [],
                        icon: 'life'
                    },
                    {
                        title: 'Docierać precyzyjnie',
                        description: 'Dzięki reklamom do osób z konkretnej lokalizacji i o określonych zainteresowaniach',
                        points: [],
                        icon: 'target'
                    }
                ],
                whyImportantFooter: 'Bez tego klient często widzi tylko suchy wpis w Google albo ofertę na Booking / agregatorach. Social media pozwalają zbudować emocje i przekonanie: „tam warto pojechać / zamówić / skorzystać".',
                roleDescription: `Można je potraktować jak trzy funkcje:

1. Wizytówka + dowód, że firma działa
• aktualne zdjęcia (z tego sezonu, nie sprzed 5 lat),
• bieżące informacje (np. warunki na stokach, menu dnia, promocje),
• spójny opis oferty i danych kontaktowych.

2. Kanał komunikacji z klientami
• odpowiedzi na pytania w komentarzach i wiadomościach prywatnych,
• informowanie o ważnych zmianach (remont, nowe godziny, nowa usługa),
• reagowanie na opinie (pozytywne i negatywne – w sposób spokojny i merytoryczny).

3. Kanał sprzedaży i pozyskiwania zapytań
• posty kierujące do rezerwacji, zamówień, kontaktu,
• kampanie reklamowe (np. „rezerwuj ferie", „zamów z dostawą", „weekendowy pobyt LAST MINUTE"),
• zachęcanie do powrotu (oferty dla osób, które już były klientami).`,
                keyElements: [
                    {
                        title: 'Treści informacyjne',
                        description: 'Aktualne informacje o firmie:',
                        points: [
                            'aktualne godziny otwarcia, wolne terminy, nowe usługi',
                            'zmiany w ofercie (np. nowe dania, nowe pakiety, nowy sprzęt)'
                        ],
                        icon: 'info'
                    },
                    {
                        title: 'Treści pokazujące „kulisy"',
                        description: 'Autentyczne spojrzenie za kulisy:',
                        points: [
                            'przygotowanie pokoju, sali, sprzętu, jedzenia',
                            'fragmenty pracy zespołu (bez sztucznego „udawania")'
                        ],
                        icon: 'kulisy'
                    },
                    {
                        title: 'Treści sprzedażowe',
                        description: 'Konkretne promocje i zachęty:',
                        points: [
                            'konkretne promocje, pakiety, zachęty (z jasnym wezwaniem do działania: „zadzwoń", „napisz", „zarezerwuj")',
                            'grafiki z prostym komunikatem, a nie ścianą tekstu'
                        ],
                        icon: 'sales'
                    },
                    {
                        title: 'Treści budujące relacje',
                        description: 'Budowanie zaufania i zaangażowania:',
                        points: [
                            'opinie klientów (za zgodą)',
                            'zdjęcia „z życia" – np. zadowoleni goście, pełny lokal, dobra pogoda',
                            'proste pytania do odbiorców, zachęcające do reakcji'
                        ],
                        icon: 'relacje'
                    }
                ],
                practicalExamples: [
                    {
                        title: 'Przykład 1 – pensjonat / ośrodek w miejscowości turystycznej',
                        description: 'Zamiast publikować raz na kilka miesięcy, profil może być narzędziem do:\n• pokazywania aktualnych warunków (śnieg, widoki, atrakcje w okolicy),\n• informowania o wolnych terminach: „Zwolnił się pokój na weekend – kto pierwszy, ten lepszy",\n• pokazywania pakietów: nocleg + wyjazd na stok + termy.',
                        effect: 'Efekt: osoby planujące wyjazd widzą, że obiekt żyje, jest zadbany i ma realne atuty.'
                    },
                    {
                        title: 'Przykład 2 – pizzeria / restauracja',
                        description: 'Profil na Facebooku / Instagramie może:\n• pokazywać realne zdjęcia dań, a nie tylko „stockowe" grafiki,\n• komunikować promocje czasowe (np. „środa – druga pizza -30% przy odbiorze osobistym"),\n• zachęcać do opinii i recenzji, które później zwiększają zaufanie nowych klientów,\n• dzięki reklamom docierać do osób z najbliższej okolicy.',
                        effect: 'Efekt: więcej osób przypomina sobie o lokalu, gdy myśli: „zamówmy coś na kolację".'
                    },
                    {
                        title: 'Przykład 3 – hotel / obiekt noclegowy',
                        description: '• w sezonie: pokazywanie warunków na stokach, zadowolonych gości, aktualnych atrakcji,\n• poza sezonem: promowanie pobytów weekendowych, pakietów rodzinnych, ofert specjalnych (np. „Jesienny relaks + termy"),\n• stała obecność: krótkie relacje (Stories) z codziennych działań – śniadania, widok z okna, przygotowanie pokoi.',
                        effect: 'Efekt: klient, zanim wejdzie na stronę lub zadzwoni, już ma w głowie obraz miejsca – wie, czego się spodziewać.'
                    }
                ],
                additionalInfo: `Warto jasno:

Media społecznościowe nie zastąpią:
• kiepskiej obsługi,
• braku dostępności,
• chaosu w organizacji.

One wzmacniają to, co już jest. Jeśli jakość usługi jest dobra – pomagają to pokazać.

Jeśli jest słaba – bardzo szybko to ujawnią (opinie, komentarze, brak reakcji).`,
                quiz: [
                    {
                        id: 'q1',
                        type: 'choice',
                        question: 'Jaka jest najważniejsza rola mediów społecznościowych w małej firmie usługowej?',
                        options: [
                            'Publikowanie jak największej liczby postów dziennie',
                            'Budowanie relacji, zaufania i przypominanie o marce klientom z docelowej grupy',
                            'Zastąpienie strony internetowej',
                            'Służenie wyłącznie do ogłoszeń o zamknięciu lokalu'
                        ],
                        correctAnswer: 1,
                        hint: 'Pomyśl o głównym celu social mediów – czy chodzi o ilość, czy o jakość relacji z klientami?',
                        feedback: 'Dokładnie tak – media społecznościowe służą przede wszystkim budowaniu relacji i zaufania, a nie tylko publikowaniu treści.'
                    },
                    {
                        id: 'q2',
                        type: 'choice',
                        question: 'Które z poniższych działań ma największy sens w kontekście social mediów dla lokalnego biznesu?',
                        options: [
                            'Kupowanie „lajków" z całego świata',
                            'Kierowanie reklam do osób mieszkających w promieniu kilku kilometrów od firmy',
                            'Publikowanie wyłącznie memów niezwiązanych z działalnością',
                            'Publikowanie raz w roku informacji o istnieniu firmy'
                        ],
                        correctAnswer: 1,
                        hint: 'Dla lokalnego biznesu najważniejsze jest dotarcie do osób, które mogą rzeczywiście skorzystać z usługi...',
                        feedback: 'Zgadza się – dla lokalnego biznesu kluczowe jest precyzyjne docieranie do osób z najbliższej okolicy, które mogą rzeczywiście skorzystać z oferty.'
                    },
                    {
                        id: 'q3',
                        type: 'choice',
                        question: 'Jakiego typu treści nie powinien dominować na profilu firmy?',
                        options: [
                            'Zdjęcia z życia firmy, krótkie relacje z codziennej pracy',
                            'Opinie zadowolonych klientów (za ich zgodą)',
                            'Wyłącznie grafiki z tekstem „PROMOCJA!!!" bez kontekstu i bez informacji, co dokładnie oferujesz',
                            'Informacje o nowych usługach w spokojnej, konkretnej formie'
                        ],
                        correctAnswer: 2,
                        hint: 'Pomyśl o tym, co buduje zaufanie – czy agresywne promocje bez kontekstu, czy autentyczne treści?',
                        feedback: 'Dokładnie – agresywne promocje bez kontekstu nie budują zaufania. Lepiej pokazywać autentyczne treści i konkretne informacje.'
                    },
                    {
                        id: 'q4',
                        type: 'open',
                        question: 'Na jakiej platformie Twoi klienci są najbardziej aktywni (Facebook / Instagram / inne)?',
                        keywords: [
                            'facebook',
                            'instagram',
                            'platforma',
                            'klienci',
                            'aktywni',
                            'social',
                            'media'
                        ],
                        hint: 'Pomyśl o tym, gdzie Twoi klienci spędzają najwięcej czasu online...',
                        feedback: 'Dziękuję za odpowiedź. To pomoże lepiej zrozumieć, na której platformie warto skupić najwięcej uwagi.'
                    },
                    {
                        id: 'q5',
                        type: 'open',
                        question: 'Jakiego typu post zobaczyłby Twój idealny klient i pomyślał: „To jest coś dla mnie"?',
                        keywords: [
                            'post',
                            'klient',
                            'idealny',
                            'typ',
                            'treść',
                            'zainteresowanie',
                            'reakcja'
                        ],
                        hint: 'Pomyśl o treści, która naprawdę przyciągnęłaby uwagę Twojego idealnego klienta...',
                        feedback: 'Dziękuję za odpowiedź. To pomoże lepiej zrozumieć, jakiego typu treści warto publikować, aby dotrzeć do idealnych klientów.'
                    }
                ]
            },
            {
                id: '1.3',
                moduleId: '1',
                title: 'Narzędzia i platformy marketingowe',
                intro: `Marketing online to nie tylko „bycie w internecie", ale korzystanie z konkretnych narzędzi, które pomagają:

• dotrzeć do właściwych osób,
• pokazać im ofertę,
• zmierzyć efekty działań,
• wyciągać wnioski na przyszłość.

Bez narzędzi działasz „na wyczucie". Z narzędziami – widzisz liczby i możesz podejmować decyzje na podstawie danych.`,
                whyImportant: [
                    {
                        title: 'Lepiej rozumieć, co działa',
                        description: 'Które działania marketingowe się opłacają',
                        points: [],
                        icon: 'understand'
                    },
                    {
                        title: 'Oszczędzać czas',
                        description: 'Zamiast robić wszystko ręcznie',
                        points: [],
                        icon: 'time'
                    },
                    {
                        title: 'Podejmować decyzje na danych',
                        description: 'A nie tylko intuicji',
                        points: [],
                        icon: 'data'
                    },
                    {
                        title: 'Uporządkować pracę',
                        description: 'Mieć w jednym miejscu informacje o klientach, wynikach kampanii, treściach',
                        points: [],
                        icon: 'organize'
                    }
                ],
                whyImportantFooter: 'Nie chodzi o to, żeby znać 50 programów. W małej firmie często wystarczy kilka dobrze dobranych narzędzi, używanych konsekwentnie.',
                keyElements: [
                    {
                        title: 'Narzędzia „widoczności"',
                        description: 'Żeby klienci w ogóle Cię znaleźli:',
                        points: [
                            'Strona internetowa (np. WordPress) – Twoja baza, miejsce gdzie możesz opisać ofertę, pokazać zdjęcia, dodać formularz kontaktowy',
                            'Profil firmy w Google (Google Business Profile) – wizytówka w Google: adres, godziny otwarcia, opinie, zdjęcia',
                            'Profile w social media (Facebook, Instagram) – miejsce budowania relacji, pokazywania codzienności firmy, komunikowania promocji'
                        ],
                        icon: 'visibility'
                    },
                    {
                        title: 'Narzędzia „ruchu i kampanii"',
                        description: 'Żeby ściągnąć ludzi do firmy:',
                        points: [
                            'Facebook Ads Manager / Meta Business Suite – panel do ustawiania reklam na Facebooku i Instagramie z zasięgiem lokalnym i konkretnymi celami',
                            'Google Ads – reklamy w wynikach wyszukiwania, przydatne tam, gdzie klienci wpisują konkretne frazy (np. „hotel przy stoku", „pizza na dowóz")'
                        ],
                        icon: 'campaigns'
                    },
                    {
                        title: 'Narzędzia „analityki i danych"',
                        description: 'Żeby widzieć, co się dzieje:',
                        points: [
                            'Google Analytics (GA4) – pozwala śledzić ile osób odwiedza stronę, z jakich źródeł, które podstrony są najczęściej oglądane',
                            'Proste arkusze (np. Google Sheets / Excel) – do zapisywania dat kampanii, stawek i budżetów, liczby zamówień / rezerwacji w danym okresie'
                        ],
                        icon: 'analytics'
                    },
                    {
                        title: 'Narzędzia „relacji z klientem"',
                        description: 'Żeby nie tracić kontaktu:',
                        points: [
                            'Narzędzia e-mail marketingu (np. MailerLite, Mailchimp) – umożliwiają wysyłanie newsletterów i tworzenie prostych automatyzacji',
                            'CRM lub prosta baza kontaktów – lista klientów w arkuszu z oznaczeniami (stały klient, grupa, jednorazowy)'
                        ],
                        icon: 'relationships'
                    },
                    {
                        title: 'Narzędzia „tworzenia treści"',
                        description: 'Żeby materiały wyglądały dobrze:',
                        points: [
                            'Canva – do tworzenia prostych grafik do social mediów, banerów na stronę, prostych plakatów / ulotek',
                            'Proste aplikacje do obróbki zdjęć w telefonie – lekka korekta światła, przycięcie, dopasowanie formatu do Instagrama / Facebooka'
                        ],
                        icon: 'content'
                    }
                ],
                practicalExamples: [
                    {
                        title: 'Przykład – mały hotel / pensjonat w miejscowości turystycznej',
                        description: `1. Widoczność
• Strona WWW na WordPressie: opis pokoi, zdjęcia, formularz zapytań.
• Profil Google (Google Business Profile): aktualne godziny, telefony, mapka dojazdu, opinie.

2. Ruch
• Kampania na Facebooku/Instagramie: reklama z pakietem „ferie zimowe" kierowana do rodzin z większych miast.

3. Analityka
• Google Analytics mierzy, ilu użytkowników z reklamy weszło na stronę i wysłało zapytanie.

4. Relacje
• Po sezonie – wysłanie newslettera do gości, którzy już byli: „oferta na jesienny weekend w górach".

5. Treści
• Zdjęcia aktualnych warunków, krótkie filmy z okolicy, grafiki z Canvy z prostymi komunikatami („ostatnie wolne miejsca", „pakiet rodzinny").`,
                        effect: 'Dzięki takiemu połączeniu właściciel wie, skąd się biorą rezerwacje, widzi które działania działają lepiej i może stopniowo rezygnować z mało skutecznych kanałów na rzecz tych, które dają mierzalny efekt.'
                    }
                ],
                quiz: [
                    {
                        id: 'q1',
                        type: 'choice',
                        question: 'Które narzędzie jest podstawowym wyborem do analizy ruchu na stronie internetowej?',
                        options: [
                            'Google Analytics',
                            'Facebook Ads Manager',
                            'Instagram Stories',
                            'Messenger'
                        ],
                        correctAnswer: 0,
                        hint: 'Pomyśl o narzędziu, które pokazuje szczegółowe statystyki dotyczące odwiedzin strony...',
                        feedback: 'Dokładnie tak – Google Analytics to podstawowe narzędzie do analizy ruchu na stronie internetowej.'
                    },
                    {
                        id: 'q2',
                        type: 'choice',
                        question: 'Jaką rolę pełni Facebook Ads Manager / Meta Business Suite?',
                        options: [
                            'Jest narzędziem do wysyłania newsletterów',
                            'Zastępuje stronę internetową',
                            'Umożliwia ustawianie i monitorowanie kampanii reklamowych na Facebooku i Instagramie',
                            'Służy tylko do odpowiadania na wiadomości klientów'
                        ],
                        correctAnswer: 2,
                        hint: 'Pomyśl o narzędziu do zarządzania reklamami w social media...',
                        feedback: 'Zgadza się – Facebook Ads Manager / Meta Business Suite umożliwia ustawianie i monitorowanie kampanii reklamowych na Facebooku i Instagramie.'
                    },
                    {
                        id: 'q3',
                        type: 'choice',
                        question: 'Do czego w małej firmie najbardziej przydaje się prosty arkusz (np. Google Sheets) w marketingu?',
                        options: [
                            'Do edytowania zdjęć',
                            'Do pisania wpisów na Facebooka',
                            'Do zastąpienia strony internetowej',
                            'Do śledzenia podstawowych danych: dat kampanii, budżetów, liczby zapytań / zamówień'
                        ],
                        correctAnswer: 3,
                        hint: 'Pomyśl o narzędziu, które pomaga organizować i śledzić dane...',
                        feedback: 'Dokładnie – prosty arkusz jest przydatny do śledzenia podstawowych danych marketingowych, takich jak daty kampanii, budżety i liczba zapytań.'
                    },
                    {
                        id: 'q4',
                        type: 'open',
                        question: 'Jakie narzędzia marketingowe już teraz wykorzystujesz w swojej firmie (chociażby w podstawowej formie)?',
                        keywords: [
                            'narzędzia',
                            'marketingowe',
                            'wykorzystujesz',
                            'firma',
                            'podstawowa',
                            'forma',
                            'google',
                            'facebook',
                            'instagram',
                            'strona',
                            'www'
                        ],
                        hint: 'Pomyśl o wszystkich narzędziach online, z których korzystasz w swojej firmie...',
                        feedback: 'Dziękuję za odpowiedź. To pomoże lepiej zrozumieć, jakie narzędzia już masz i które warto rozwinąć.'
                    },
                    {
                        id: 'q5',
                        type: 'open',
                        question: 'Które jedno narzędzie – jeśli nauczyłbyś się korzystać z niego lepiej – dałoby Twoim zdaniem największy efekt w najbliższych 3 miesiącach?',
                        keywords: [
                            'narzędzie',
                            'nauczyłbyś',
                            'korzystać',
                            'lepiej',
                            'największy',
                            'efekt',
                            'miesiące',
                            '3',
                            'trzy'
                        ],
                        hint: 'Pomyśl o narzędziu, które mogłoby przynieść najszybsze i najbardziej widoczne rezultaty...',
                        feedback: 'Dziękuję za odpowiedź. To pomoże lepiej zrozumieć, na którym narzędziu warto się skupić w pierwszej kolejności.'
                    }
                ]
            }
        ]
    },
    {
        id: '2',
        title: 'Content marketing i storytelling',
        icon: 'pen',
        lessons: [
            {
                id: '2.1',
                moduleId: '2',
                title: 'Tworzenie angażujących treści',
                intro: `Angażujące treści to fundament skutecznego marketingu online.

To one zatrzymują uwagę, budują zaufanie i sprawiają, że odbiorca realnie rozważa skorzystanie z oferty – zamiast tylko „przelecieć wzrokiem" po komunikacie.

W praktyce: dobra treść to taka, która jest przydatna, konkretna i napisana językiem człowieka, a nie urzędowym sloganem.`,
                whyImportant: `Dla małego hotelu, pensjonatu czy firmy usługowej:

• klienci porównują oferty głównie online,
• często widzą kilka bardzo podobnych miejsc / usług,
• decyzja zapada na podstawie:
  – zdjęć,
  – opisów,
  – tego, czy komunikat „brzmi po ludzku" i budzi zaufanie.

Jeśli treści są ogólne, suche i podobne do wszystkich innych – firma znika w tłumie.

Jeśli są konkretne, zrozumiałe i pokazują realne korzyści – klient łatwiej wybiera właśnie Ciebie.`,
                keyElements: [
                    {
                        title: 'Konkretny odbiorca',
                        description: 'Piszemy „do kogoś", a nie „do wszystkich"',
                        points: [
                            'Inaczej komunikujemy się z rodziną z dziećmi, inaczej z osobą w delegacji'
                        ],
                        icon: 'audience'
                    },
                    {
                        title: 'Jasny cel komunikatu',
                        description: 'Czy chcemy, żeby ktoś:',
                        points: [
                            'zarezerwował nocleg?',
                            'zapytał o wycenę?',
                            'zapisał się na newsletter?'
                        ],
                        icon: 'goal'
                    },
                    {
                        title: 'Korzyści, nie tylko cechy',
                        description: 'Zamiast: „pokoje z łazienką",',
                        points: [
                            'lepiej: „każdy pokój z prywatną łazienką – bez kolejek i bez dzielenia się z innymi gośćmi"'
                        ],
                        icon: 'benefits'
                    },
                    {
                        title: 'Prosty język',
                        description: 'Krótkie zdania, bez żargonu',
                        points: [
                            'Im łatwiej się to czyta, tym większa szansa, że ktoś dotrwa do końca'
                        ],
                        icon: 'language'
                    },
                    {
                        title: 'Wezwanie do działania (CTA)',
                        description: 'Konkretne działanie dla odbiorcy',
                        points: [
                            'np. „Zadzwoń", „Napisz wiadomość", „Sprawdź dostępne terminy na przyszły weekend"'
                        ],
                        icon: 'cta'
                    }
                ],
                practicalExamples: [
                    {
                        title: 'Przykład 1 – hotel / pensjonat',
                        description: `Zamiast ogólnego komunikatu:

„Zapraszamy do naszego hotelu, mamy wolne pokoje."

lepsza treść:

„Służbowo w Rzeszowie i szukasz spokojnego noclegu blisko centrum?

Nocleg ze śniadaniem od 260 zł za dobę.

Parking i szybkie Wi-Fi w cenie.

Napisz w wiadomości „REZERWACJA", wyślę dostępne terminy na najbliższy tydzień."`,
                        effect: 'Różnica: wiadomo dla kogo jest oferta (osoba w delegacji), są konkretne korzyści (śniadanie, parking, Wi-Fi), jest konkretne działanie („napisz w wiadomości…").'
                    },
                    {
                        title: 'Przykład 2 – lokalna restauracja',
                        description: `Zamiast:

„Zapraszamy na pizzę, mamy najlepszą w mieście."

lepiej:

„Masz ochotę na coś ciepłego po pracy?

Od poniedziałku do czwartku druga pizza -50% na wynos od 17:00 do 20:00.

Zamów telefonicznie lub przez Messenger – zwykle wyrabiamy się w 25–30 minut."`,
                        effect: 'Tu klient dostaje: konkretną porę, konkretną promocję, informację jak zamówić.'
                    },
                    {
                        title: 'Przykład 3 – gabinet fizjoterapii',
                        description: `Zamiast:

„Oferujemy profesjonalne zabiegi fizjoterapeutyczne."

lepiej:

„Boli Cię kręgosłup po całym dniu przy biurku?

Podczas pierwszej wizyty (60 minut) sprawdzimy przyczynę bólu i pokażę Ci 3 proste ćwiczenia, które możesz robić w domu.

Zapisz się przez formularz – zwykle mamy wolne terminy w ciągu 3–4 dni."`,
                        effect: 'Znów: konkret, problem → rozwiązanie → działanie.'
                    }
                ],
                roleDescription: `Praktyczne wskazówki – jak pisać własne treści:

1. Zacznij od jednej osoby w głowie
Wyobraź sobie konkretnego gościa / klienta:
– „rodzina z dwójką dzieci przyjeżdżająca na weekend",
– „para w delegacji na targi",
– „mieszkaniec miasta szukający miejsca na obiad w niedzielę".

2. Odpowiedz na trzy pytania:
• Z jakim problemem / potrzebą przychodzi?
• Co mu konkretnie oferujesz?
• Co ma zrobić teraz, jeśli go to interesuje?

3. Uprość tekst o 20–30%
Zawsze warto przejrzeć tekst drugi raz i usunąć:
• zbędne przymiotniki („najwyższej jakości", „fantastyczny", „wyjątkowy"),
• powtórzenia,
• zbyt długie zdania.

4. Dodaj element „tu i teraz"
Np.:
– „w najbliższy weekend",
– „w listopadzie",
– „tylko przy rezerwacji przez wiadomość prywatną".`,
                quiz: [
                    {
                        id: 'q1',
                        type: 'choice',
                        question: 'Który z poniższych elementów NAJBARDZIEJ pomaga zwiększyć zaangażowanie odbiorcy?',
                        options: [
                            'Używanie jak największej liczby przymiotników („wyjątkowy", „najlepszy", „fantastyczny")',
                            'Zastosowanie prostego języka, konkretów i jasnego wezwania do działania',
                            'Pisanie bardzo długich opisów, aby przekazać jak najwięcej informacji',
                            'Skupienie się wyłącznie na historii firmy'
                        ],
                        correctAnswer: 1,
                        hint: 'Pomyśl o tym, co sprawia, że treść jest łatwa do zrozumienia i zachęca do działania...',
                        feedback: 'Dokładnie tak – prosty język, konkretne informacje i jasne wezwanie do działania to klucz do angażujących treści.'
                    },
                    {
                        id: 'q2',
                        type: 'choice',
                        question: 'Który opis lepiej spełnia zasady tworzenia angażującej treści dla hotelu?',
                        options: [
                            '„Zapraszamy do naszego hotelu. Mamy pokoje, śniadania i miłą obsługę."',
                            '„Szukasz spokojnego noclegu blisko centrum miasta? Oferujemy pokoje ze śniadaniem od 260 zł, parking i szybkie Wi-Fi. Napisz wiadomość, sprawdzimy dostępne terminy w wybranym przez Ciebie terminie."',
                            '„Nasz hotel działa od 1998 roku i obsłużył już tysiące zadowolonych gości."',
                            '„Jesteśmy najlepszym hotelem w mieście, gwarantujemy pełną satysfakcję."'
                        ],
                        correctAnswer: 1,
                        hint: 'Pomyśl o treści, która jest konkretna, skierowana do konkretnej osoby i ma jasne wezwanie do działania...',
                        feedback: 'Zgadza się – ten opis jest konkretny, skierowany do konkretnej osoby (szukającej noclegu), zawiera konkretne korzyści i ma jasne wezwanie do działania.'
                    },
                    {
                        id: 'q3',
                        type: 'choice',
                        question: 'Co jest pierwszym krokiem przy tworzeniu angażującej treści?',
                        options: [
                            'Dodanie jak największej liczby promocji i rabatów',
                            'Skopiowanie treści z innej firmy i lekkie jej przeredagowanie',
                            'Określenie, do kogo konkretnie kierujemy komunikat i jaki ma mieć cel',
                            'Rozpisanie jak najdłuższej historii o firmie'
                        ],
                        correctAnswer: 2,
                        hint: 'Pomyśl o pierwszym kroku – zanim zaczniesz pisać, musisz wiedzieć...',
                        feedback: 'Dokładnie – pierwszym krokiem jest określenie, do kogo konkretnie kierujemy komunikat i jaki ma być jego cel. Bez tego nie można stworzyć skutecznej treści.'
                    },
                    {
                        id: 'q4',
                        type: 'open',
                        question: 'Masz pensjonat w miejscowości turystycznej. Dotychczasowy komunikat na Facebooku brzmi: „Zapraszamy do naszego pensjonatu, mamy ładne pokoje i smaczne śniadania."\n\nPrzeredaguj ten tekst tak, aby był:\n• skierowany do konkretnej grupy (np. rodziny, pary, osoby w delegacji),\n• bardziej konkretny,\n• zakończony jasnym wezwaniem do działania.\n\nNapisz swoją propozycję w 3–4 zdaniach.',
                        keywords: [
                            'pensjonat',
                            'pokoje',
                            'śniadania',
                            'rodzina',
                            'para',
                            'delegacja',
                            'zadzwoń',
                            'napisz',
                            'zarezerwuj',
                            'sprawdź',
                            'terminy'
                        ],
                        hint: 'Pomyśl o konkretnej grupie docelowej, konkretnych korzyściach i jasnym wezwaniu do działania...',
                        feedback: 'Dziękuję za odpowiedź. To ćwiczenie pomoże Ci lepiej zrozumieć, jak tworzyć angażujące treści skierowane do konkretnych odbiorców.'
                    }
                ]
            },
            {
                id: '2.2',
                moduleId: '2',
                title: 'Techniki storytellingu',
                intro: `Storytelling to świadome wykorzystywanie historii w komunikacji marketingowej.

Zamiast pisać: „mamy pokoje, śniadania i dobrą lokalizację", opowiadasz krótką scenę z perspektywy gościa – taką, którą odbiorca łatwo sobie wyobraża.

Historie są zapamiętywane znacznie lepiej niż suche listy cech.

Dlatego dobrze skonstruowana opowieść może zrobić dla Twojej marki więcej niż kolejna „profesjonalna" formułka.`,
                whyImportant: [
                    {
                        title: 'Zamienia ofertę w doświadczenie',
                        description: 'Klient widzi siebie w tej historii',
                        points: [],
                        icon: 'experience'
                    },
                    {
                        title: 'Buduje zaufanie',
                        description: 'Pokazuje ludzi, sytuacje, kulisy, a nie tylko „ładne hasła"',
                        points: [],
                        icon: 'trust-story'
                    },
                    {
                        title: 'Ułatwia decyzję',
                        description: 'Klient myśli: „to dokładnie moja sytuacja"',
                        points: [],
                        icon: 'decision'
                    }
                ],
                whyImportantFooter: `Zamiast mówić:

„Oferujemy komfortowe noclegi dla rodzin."

możesz pokazać scenę:

„W piątkowy wieczór rodzina z dwójką dzieci przyjeżdża zmęczona po 5 godzinach jazdy. Dzieci od razu wskakują do przygotowanego pokoju z dwoma osobnymi łóżkami, a rodzice siadają przy gorącej herbacie w saloniku dla gości. Następnego dnia czeka na nich śniadanie od 8:00 – bez konieczności wychodzenia z budynku."

To dalej ta sama usługa – ale zupełnie inny poziom odczuwania.`,
                keyElements: [
                    {
                        title: 'Bohater',
                        description: 'Ktoś konkretny: gość, klient, właściciel, pracownik',
                        points: [],
                        icon: 'hero'
                    },
                    {
                        title: 'Punkt wyjścia',
                        description: 'Sytuacja początkowa, problem albo potrzeba',
                        points: [
                            'np. „zmęczony po całym dniu w trasie", „szuka spokojnego miejsca do pracy"'
                        ],
                        icon: 'starting-point'
                    },
                    {
                        title: 'Konflikt / wyzwanie',
                        description: 'Co jest trudne, męczące, irytujące dla bohatera',
                        points: [
                            'np. hałaśliwy hotel, brak parkingu, brak śniadania o wczesnej porze'
                        ],
                        icon: 'challenge'
                    },
                    {
                        title: 'Rozwiązanie',
                        description: 'Miejsce, usługa, sposób działania firmy, który usuwa problem',
                        points: [],
                        icon: 'solution-story'
                    },
                    {
                        title: 'Rezultat',
                        description: 'Co się zmieniło po skorzystaniu z usługi',
                        points: [
                            'np. wyspany gość, który zdążył na ważne spotkanie; rodzina, która miała spokojny wyjazd'
                        ],
                        icon: 'result'
                    },
                    {
                        title: 'Puenta / wezwanie do działania',
                        description: 'Konkret: „Zarezerwuj termin", „Napisz wiadomość, sprawdzimy dostępność"',
                        points: [],
                        icon: 'cta-story'
                    }
                ],
                practicalExamples: [
                    {
                        title: 'Przykład 1 – pensjonat w miejscowości turystycznej',
                        description: `Suchy komunikat:

„U nas dobrze czują się rodziny z dziećmi."

Wersja storytellingowa:

„W zeszły weekend przyjechała do nas rodzina z dwójką dzieci, po raz pierwszy w tej okolicy.

W sobotę rano dzieci nie chciały wychodzić z jadalni – uznały, że naleśniki z domową konfiturą to „najlepsze śniadanie na wyjeździe".

Rodzice śmiali się, że wreszcie mają chwilę spokoju przy kawie, a nie gonitwę za maluchami.

W niedzielę przy śniadaniu zarezerwowali już kolejny termin – tym razem na dłuższy pobyt."`,
                        effect: 'Co tu działa: konkretny bohater (rodzina), konkretna scena (śniadanie, naleśniki, kawa), rezultat (chcą wrócić).'
                    },
                    {
                        title: 'Przykład 2 – hotel pod gości biznesowych',
                        description: `Suchy komunikat:

„Obsługujemy klientów biznesowych."

Wersja storytellingowa:

„Pan Marek przyjechał do miasta tylko na jedną noc – rano miał ważną prezentację.

Poprosił o śniadanie wcześniej niż zwykle, bo musiał wyjść przed 7:00.

Zorganizowaliśmy dla niego zestaw śniadaniowy „na wynos" i cichy stolik w lobby, gdzie mógł jeszcze raz przejrzeć slajdy przy kawie.

Po spotkaniu napisał, że „dzięki spokojnej nocy i porannemu ogarnięciu wszystkiego bez chaosu" podpisał kontrakt, na którym mu najbardziej zależało."`,
                        effect: 'Tu historia pokazuje: elastyczność, zrozumienie potrzeb gościa, realny efekt (kontrakt).'
                    },
                    {
                        title: 'Przykład 3 – restauracja / lokal gastronomiczny',
                        description: `Suchy komunikat:

„Nasze dania przygotowujemy z lokalnych składników."

Wersja storytellingowa:

„W każdy czwartek rano właściciel jedzie na lokalny targ po warzywa i zioła od tych samych dostawców od lat.

To od pani, która prowadzi małe gospodarstwo kilka kilometrów dalej, bierzemy pomidory do naszej zupy krem.

Goście często pytają, dlaczego „smakuje jak u babci" – odpowiedź jest prosta: używamy tych samych prostych składników, tylko podanych w trochę bardziej nowoczesny sposób."`,
                        effect: 'Historia pokazuje autentyczność, lokalne pochodzenie i prostotę składników.'
                    }
                ],
                roleDescription: `Proste ramy do wykorzystania w praktyce:

Możesz korzystać z bardzo prostych szablonów:

Schemat 1: Problem → Rozwiązanie → Efekt
• Problem: „Goście przyjeżdżają późno, są zmęczeni, nie chcą już szukać restauracji."
• Rozwiązanie: „Oferujemy późną kolację na miejscu / zestaw powitalny."
• Efekt: „Goście od razu mogą odpocząć – bez biegania po mieście."

Schemat 2: Było → Zdarzyło się → Jest
• Było: „Klient wcześniej zatrzymywał się w dużych, głośnych hotelach przy ruchliwych ulicach."
• Zdarzyło się: „Tym razem wybrał mniejszy obiekt w spokojnej okolicy i… pierwszy raz od dawna naprawdę się wyspał."
• Jest: „Od tamtej pory wraca tam przy każdej wizycie w mieście."

Praktyczne wskazówki:

1. Jedna historia = jeden główny wątek
Nie próbuj w jednej opowieści pokazać wszystkiego (ceny, pokoi, śniadania, parkingu, sali konferencyjnej).
Skup się na jednym konkretnym doświadczeniu.

2. Krótkie, konkretne sceny
Wystarczy 4–6 zdań opisujących sytuację, a nie pełna „powieść".
Dobrze działają szczegóły: godzina, pogoda, drobny dialog, konkretne danie.

3. Prawdziwość przede wszystkim
Nie koloryzuj przesadnie.
Wystarczy opisać realistyczne zdarzenie tak, by było konkretne i „żywe".

4. Zawsze zakończ wezwaniem do działania
Po historii dodaj:
– „Jeśli to brzmi jak coś dla Ciebie, napisz wiadomość – sprawdzimy dostępne terminy."
– „Zadzwoń, jeśli w delegacji też potrzebujesz spokojnego miejsca do pracy po godzinach."`,
                quiz: [
                    {
                        id: 'q1',
                        type: 'choice',
                        question: 'Co jest kluczowym elementem dobrego storytellingu w marketingu?',
                        options: [
                            'Maksymalnie dużo liczb i statystyk',
                            'Emocje, wyraźny bohater, problem i rozwiązanie',
                            'Bardzo formalny język i specjalistyczne słownictwo',
                            'Brak konkretnej struktury – historia „ma się po prostu toczyć"'
                        ],
                        correctAnswer: 1,
                        hint: 'Pomyśl o tym, co sprawia, że historia jest zapamiętywana i angażująca...',
                        feedback: 'Dokładnie tak – dobry storytelling powinien zawierać emocje, wyraźnego bohatera, problem i rozwiązanie, co tworzy angażującą narrację.'
                    },
                    {
                        id: 'q2',
                        type: 'choice',
                        question: 'Który z poniższych opisów NAJBARDZIEJ przypomina storytelling?',
                        options: [
                            '„Mamy 25 pokoi, parking i bezpłatne Wi-Fi."',
                            '„Nasz hotel działa od 15 lat i był remontowany w 2018 roku."',
                            '„W zeszłym miesiącu gościła u nas para, która przyjechała tylko na jedną noc w drodze nad morze. Prosili o cichy pokój, bo poprzednią noc spędzili przy ruchliwej ulicy. Rano powiedzieli, że pierwszy raz od dawna naprawdę się wyspali i zapisali nasz adres na przyszły rok."',
                            '„Oferujemy wysoki standard obsługi i profesjonalne podejście do klienta."'
                        ],
                        correctAnswer: 2,
                        hint: 'Pomyśl o opisie, który opowiada konkretną historię z bohaterem, sytuacją i rezultatem...',
                        feedback: 'Zgadza się – ten opis zawiera wszystkie elementy storytellingu: konkretnego bohatera (para), sytuację (zmęczenie, hałas), rozwiązanie (cichy pokój) i rezultat (wyspani, chcą wrócić).'
                    },
                    {
                        id: 'q3',
                        type: 'choice',
                        question: 'Jak najlepiej zacząć tworzenie historii dla swojej firmy?',
                        options: [
                            'Od ustalenia bohatera i jego sytuacji / problemu',
                            'Od wypisania wszystkich parametrów technicznych obiektu',
                            'Od napisania jak najdłuższego tekstu i skracania go dopiero na końcu',
                            'Od sprawdzenia, jak pisze konkurencja i skopiowania stylu'
                        ],
                        correctAnswer: 0,
                        hint: 'Pomyśl o pierwszym kroku – od czego powinna zaczynać się dobra historia...',
                        feedback: 'Dokładnie – pierwszym krokiem jest ustalenie bohatera i jego sytuacji lub problemu. To fundament każdej dobrej historii.'
                    },
                    {
                        id: 'q4',
                        type: 'open',
                        question: 'Masz obiekt noclegowy. Dotychczasowy post na Facebooku brzmi: „Dziękujemy naszym gościom za wizytę, zapraszamy ponownie."\n\nTwoje zadanie:\n• zamień to na krótką historię z jedną konkretną sytuacją,\n• pokaż, co dokładnie goście docenili,\n• zakończ wezwaniem do działania.\n\nNapisz historię w 4–6 zdaniach.',
                        keywords: [
                            'historia',
                            'goście',
                            'sytuacja',
                            'docenili',
                            'wezwanie',
                            'działanie',
                            'zarezerwuj',
                            'napisz',
                            'sprawdź',
                            'terminy'
                        ],
                        hint: 'Pomyśl o konkretnej sytuacji z gośćmi, co im się podobało i jak to opisać jako historię...',
                        feedback: 'Dziękuję za odpowiedź. To ćwiczenie pomoże Ci lepiej zrozumieć, jak przekształcać suche komunikaty w angażujące historie.'
                    }
                ]
            },
            {
                id: '2.3',
                moduleId: '2',
                title: 'Optymalizacja treści pod kątem SEO',
                intro: `SEO (Search Engine Optimization) to sposób pisania i układania treści tak, aby były zrozumiałe dla użytkowników i łatwe do odczytania przez wyszukiwarki (np. Google).

Dobrze przygotowany tekst pozwala stronie pojawiać się wyżej w wynikach wyszukiwania, gdy ktoś wpisuje konkretne hasła, np. „nocleg blisko centrum" albo „hotel ze śniadaniem".`,
                whyImportant: [
                    {
                        title: 'Zwiększyć widoczność w Google',
                        description: 'Strona pojawia się wyżej w wynikach wyszukiwania',
                        points: [],
                        icon: 'visibility-seo'
                    },
                    {
                        title: 'Przyciągnąć właściwych klientów',
                        description: 'Osoby, które już szukają dokładnie takich usług',
                        points: [
                            'np. „hotel z parkingiem i śniadaniem"'
                        ],
                        icon: 'target-seo'
                    },
                    {
                        title: 'Obniżyć koszt pozyskania klienta',
                        description: 'Ruch z wyszukiwarki jest organiczny, a nie płatny',
                        points: [],
                        icon: 'cost-seo'
                    }
                ],
                whyImportantFooter: `Możesz mieć świetną ofertę i dobrze napisaną treść, ale jeśli:

• tekst nie zawiera słów, które faktycznie wpisują klienci,
• nagłówek nic nie mówi,
• strona nie jest jasno opisana,

to duża część potencjalnych gości w ogóle na nią nie trafi.`,
                keyElements: [
                    {
                        title: 'Słowa kluczowe (keywords)',
                        description: 'Frazy, które wpisuje klient',
                        points: [
                            'np. „hotel blisko centrum miasta", „nocleg z parkingiem i śniadaniem", „weekend w górach dla par"',
                            'Naturalne wplecenie w tytuł, nagłówki, pierwszy akapit i wybrane fragmenty opisu'
                        ],
                        icon: 'keywords'
                    },
                    {
                        title: 'Tytuł i nagłówki (H1, H2, H3)',
                        description: 'Struktura treści pomagająca użytkownikowi i wyszukiwarce',
                        points: [
                            'H1 – główny tytuł strony (np. „Noclegi dla firm – spokojny hotel z parkingiem i śniadaniem")',
                            'H2 / H3 – nagłówki sekcji (np. „Dlaczego firmy wybierają nasz obiekt")'
                        ],
                        icon: 'headings'
                    },
                    {
                        title: 'Opis meta (meta description)',
                        description: 'Krótki opis wyświetlany w wynikach wyszukiwania',
                        points: [
                            'Powinien zawierać główną frazę i zachęcać do kliknięcia',
                            'np. „Kameralny hotel blisko centrum, śniadanie w cenie, bezpłatny parking. Sprawdź wolne terminy i zarezerwuj pobyt online."'
                        ],
                        icon: 'meta'
                    },
                    {
                        title: 'Treść główna (body)',
                        description: 'Tekst podzielony na sekcje, czytelny, bez „ściany tekstu"',
                        points: [
                            'Krótkie akapity, wypunktowania, podkreślenie najważniejszych korzyści'
                        ],
                        icon: 'content-seo'
                    },
                    {
                        title: 'Linki wewnętrzne',
                        description: 'Odsyłacze do innych podstron w ramach strony',
                        points: [
                            'Z bloga do oferty, z oferty do formularza kontaktowego, z „o nas" do „pokoje"',
                            'Pomagają użytkownikowi i ułatwiają robotom Google zrozumienie struktury witryny'
                        ],
                        icon: 'links'
                    },
                    {
                        title: 'Zdjęcia i opisy alternatywne (alt)',
                        description: 'Nazwy plików i teksty alt opisujące zdjęcia',
                        points: [
                            'Nazwa pliku: „pokoj-2-osobowy-z-balkonem.jpg" zamiast „IMG_1234.jpg"',
                            'Tekst alt: „Pokój dwuosobowy z balkonem i widokiem na park"'
                        ],
                        icon: 'images-seo'
                    }
                ],
                practicalExamples: [
                    {
                        title: 'Przykład 1 – podstrona „Pokoje" w hotelu',
                        description: `Zamiast krótkiego, ogólnego opisu:

„Oferujemy wygodne pokoje 1-, 2- i 3-osobowe."

lepsza wersja pod SEO i użytkownika:

„Oferujemy wygodne pokoje 1-, 2- i 3-osobowe dla gości indywidualnych, rodzin i osób podróżujących służbowo.

Wszystkie pokoje mają prywatną łazienkę, szybkie Wi-Fi oraz dostęp do śniadania w formie bufetu.

Jeśli szukasz spokojnego noclegu blisko centrum miasta, a jednocześnie blisko głównych tras dojazdowych – sprawdź nasze aktualne terminy."`,
                        effect: 'Tu pojawiają się naturalnie frazy: „nocleg blisko centrum miasta", „pokoje 1-, 2- i 3-osobowe", „śniadanie w formie bufetu", „szybkie Wi-Fi".'
                    },
                    {
                        title: 'Przykład 2 – oferta dla firm',
                        description: `Sucha wersja:

„Przyjmujemy grupy pracowników."

Wersja zoptymalizowana:

„Specjalizujemy się w noclegach dla pracowników i gości biznesowych.

Oferujemy pokoje 2- i 3-osobowe z możliwością wystawienia faktury VAT, bezpłatny parking dla busów oraz śniadania od godziny 6:30.

Jeśli szukasz stałej bazy noclegowej dla swojej firmy, skontaktuj się z nami – przygotujemy indywidualną ofertę dla grup."`,
                        effect: 'Frazy: „noclegi dla pracowników", „goście biznesowi", „baza noclegowa dla firmy".'
                    },
                    {
                        title: 'Przykład 3 – artykuł na blogu (lokalny SEO)',
                        description: `Temat: „Jak zaplanować weekend w mieście X"

Zamiast ogólnego tekstu:

„Zapraszamy na weekend, w okolicy jest dużo atrakcji."

lepsza wersja:

„Planujesz weekend w mieście X i szukasz spokojnego noclegu blisko centrum?

Z naszego obiektu dojdziesz pieszo do rynku w około 10 minut, a w okolicy znajdziesz restauracje, park i ścieżki spacerowe.

W tym artykule podpowiadamy, jak zaplanować 2 dni tak, aby zobaczyć najważniejsze miejsca i nie tracić czasu na dojazdy."`,
                        effect: 'Tutaj tekst może być dłuższy, ale od początku jasno wynika: dla kogo, gdzie, jaką korzyść daje.'
                    }
                ],
                roleDescription: `Prosta checklista SEO dla pojedynczej podstrony:

Przed publikacją treści zadaj sobie te pytania:

1. Czy w tytule i pierwszym akapicie jest konkret, a nie ogólnik?

2. Czy w treści naturalnie występują 2–3 główne frazy, które wpisuje klient w Google?

3. Czy nagłówki jasno mówią, co jest w danej sekcji?

4. Czy są linki do innych ważnych podstron (np. cennik, kontakt, rezerwacja)?

5. Czy zdjęcia mają sensowne nazwy i opisy (alt)?

Jeśli odpowiedź na większość pytań brzmi „tak" – treść jest na podstawowym poziomie przygotowana pod SEO.`,
                quiz: [
                    {
                        id: 'q1',
                        type: 'choice',
                        question: 'Co NAJBARDZIEJ pomaga wyszukiwarce zrozumieć, o czym jest konkretna podstrona?',
                        options: [
                            'Ilość zdjęć na stronie',
                            'Tylko długość tekstu',
                            'Tytuł, nagłówki i logiczna struktura treści',
                            'Kolorystyka i szata graficzna'
                        ],
                        correctAnswer: 2,
                        hint: 'Pomyśl o elementach, które pomagają wyszukiwarkom zrozumieć strukturę i tematykę treści...',
                        feedback: 'Dokładnie tak – tytuł, nagłówki i logiczna struktura treści to kluczowe elementy, które pomagają wyszukiwarce zrozumieć, o czym jest podstrona.'
                    },
                    {
                        id: 'q2',
                        type: 'choice',
                        question: 'Który opis jest lepiej przygotowany pod SEO (przy założeniu, że chcesz pozyskiwać gości biznesowych)?',
                        options: [
                            '„Zapraszamy do naszego obiektu, mamy pokoje i śniadania."',
                            '„Oferujemy noclegi dla pracowników i gości biznesowych: pokoje 2- i 3-osobowe, śniadania od 6:30, bezpłatny parking i możliwość wystawienia faktury VAT."',
                            '„U nas jest miło, spokojnie i komfortowo dla każdego."',
                            '„Nasz obiekt działa od 15 lat i znajduje się w dobrej lokalizacji."'
                        ],
                        correctAnswer: 1,
                        hint: 'Pomyśl o opisie, który zawiera konkretne frazy kluczowe i szczegóły istotne dla gości biznesowych...',
                        feedback: 'Zgadza się – ten opis zawiera konkretne frazy kluczowe („noclegi dla pracowników", „goście biznesowi") oraz szczegóły istotne dla tej grupy docelowej.'
                    },
                    {
                        id: 'q3',
                        type: 'choice',
                        question: 'Który element JEST przykładem optymalizacji SEO?',
                        options: [
                            'Zmienienie koloru przycisku „Rezerwuj" z niebieskiego na czerwony',
                            'Dodanie większej liczby zdjęć bez opisów',
                            'Skrócenie tekstu o połowę, bez zmiany treści',
                            'Uzupełnienie opisu meta i nagłówków o frazy, które wpisują klienci w Google'
                        ],
                        correctAnswer: 3,
                        hint: 'Pomyśl o elementach, które bezpośrednio wpływają na widoczność w wynikach wyszukiwania...',
                        feedback: 'Dokładnie – uzupełnienie opisu meta i nagłówków o frazy, które wpisują klienci w Google, to kluczowy element optymalizacji SEO.'
                    },
                    {
                        id: 'q4',
                        type: 'multi-task',
                        question: `Masz stronę z opisem oferty:

„Zapraszamy do naszego obiektu. Mamy pokoje i śniadania. Blisko centrum. Skontaktuj się z nami."

Twoim zadaniem jest zoptymalizować ten tekst pod SEO. Wykonaj poniższe 3 zadania:`,
                        subTasks: [
                            {
                                id: 'q4-1',
                                title: 'Zadanie 1: Główna fraza kluczowa',
                                description: 'Wymyśl główną frazę, na którą chcesz się wyświetlać w Google.\nPrzykład: „nocleg blisko centrum miasta X ze śniadaniem"',
                                keywords: [
                                    'nocleg',
                                    'hotel',
                                    'pokoje',
                                    'centrum',
                                    'miasto',
                                    'śniadanie',
                                    'fraza',
                                    'kluczowa'
                                ],
                                hint: 'Pomyśl o konkretnej frazie, którą wpisują klienci szukając Twojej oferty...'
                            },
                            {
                                id: 'q4-2',
                                title: 'Zadanie 2: Tytuł (H1)',
                                description: 'Napisz na nowo tytuł (H1) tej podstrony, używając wybranej frazy kluczowej.',
                                keywords: [
                                    'tytuł',
                                    'h1',
                                    'nagłówek',
                                    'fraza',
                                    'kluczowa'
                                ],
                                hint: 'Tytuł powinien zawierać główną frazę kluczową i być konkretny...'
                            },
                            {
                                id: 'q4-3',
                                title: 'Zadanie 3: Opis (4–6 zdań)',
                                description: `Napisz 4–6 zdań opisu, w którym:
• naturalnie użyjesz wybranej frazy kluczowej,
• dodasz 2–3 konkretne informacje (np. godziny śniadań, parking, Wi-Fi),
• zakończysz wezwaniem do działania (np. „Sprawdź dostępne terminy").`,
                                keywords: [
                                    'opis',
                                    'treść',
                                    'fraza',
                                    'kluczowa',
                                    'informacje',
                                    'parking',
                                    'wi-fi',
                                    'śniadanie',
                                    'wezwanie',
                                    'działanie',
                                    'zarezerwuj',
                                    'sprawdź',
                                    'terminy'
                                ],
                                hint: 'Pomyśl o konkretnych informacjach, które są ważne dla klientów i naturalnie wpleć frazę kluczową...'
                            }
                        ],
                        feedback: 'Dziękuję za odpowiedź. To ćwiczenie pomoże Ci lepiej zrozumieć, jak optymalizować treści pod SEO, używając konkretnych fraz kluczowych i strukturyzując treść.'
                    }
                ]
            }
        ]
    },
    {
        id: '3',
        title: 'Reklamy płatne w mediach społecznościowych',
        icon: 'megaphone',
        lessons: [
            {
                id: '3.1',
                moduleId: '3',
                title: 'Tworzenie skutecznych kampanii na Facebooku i Instagramie',
                intro: `Reklamy płatne w mediach społecznościowych (Facebook / Instagram Ads) pozwalają dotrzeć z ofertą dokładnie do osób, które są dla Ciebie najważniejsze – według lokalizacji, wieku, zainteresowań czy zachowań.

Dla obiektu noclegowego oznacza to możliwość pokazania oferty osobom, które:

• mieszkają w określonym promieniu od Twojej lokalizacji lub w konkretnych miastach,

• interesują się podróżami, noclegami, wyjazdami służbowymi, wydarzeniami w regionie,

• szukają miejsca na wyjazd weekendowy, szkolenie, konferencję lub nocleg pracowniczy.`,
                whyImportant: [
                    {
                        title: 'Szybka budowa rozpoznawalności',
                        description: 'Pomagają szybko zbudować rozpoznawalność obiektu na rynku',
                        points: [],
                        icon: 'visibility'
                    },
                    {
                        title: 'Wypełnianie konkretnych terminów',
                        description: 'Pozwalają wypełniać konkretne terminy (np. dni robocze poza sezonem)',
                        points: [],
                        icon: 'target'
                    },
                    {
                        title: 'Testowanie różnych ofert',
                        description: 'Umożliwiają testowanie różnych ofert (weekendy dla par, noclegi dla firm, pakiety rodzinne)',
                        points: [],
                        icon: 'analytics'
                    },
                    {
                        title: 'Dotarcie do nowych klientów',
                        description: 'Pozwalają dotrzeć do osób spoza Twojej miejscowości, które inaczej by o Tobie nie usłyszały',
                        points: [],
                        icon: 'traffic'
                    },
                    {
                        title: 'Kontrola nad kosztami',
                        description: 'Dają dużą kontrolę nad kosztami – możesz zacząć od małego budżetu dziennego i zwiększać go dopiero wtedy, gdy kampania przynosi efekt',
                        points: [],
                        icon: 'cost-seo'
                    }
                ],
                whyImportantFooter: `Bez płatnych kampanii jesteś w dużej mierze zależny od:

• przypadkowego ruchu organicznego,

• poleceń „z ust do ust",

• spontanicznych wyszukiwań w Google.

Z kampaniami płatnymi możesz świadomie „włączać" i „wzmacniać" widoczność wybranych ofert wtedy, kiedy najbardziej ich potrzebujesz.`,
                practicalExamples: [
                    {
                        title: 'Przykład praktyczny 1 – „Weekend dla par"',
                        description: `Obiekt noclegowy położony w pobliżu atrakcji turystycznych ma wolne miejsca w weekendy poza głównym sezonem.

Parametry kampanii:

• grupa docelowa: osoby w wieku 25–45 lat, mieszkające w promieniu do 100 km od obiektu, będące w związku,

• cel kampanii: kliknięcia w stronę z ofertą „Weekend dla par",

• treść reklamy:

• opis: „Weekendowy pobyt dla dwojga: 2 noce ze śniadaniami, parking w cenie, późne wymeldowanie",

• grafika: realne zdjęcie pokoju oraz sali śniadaniowej,

• wezwanie do działania: „Sprawdź dostępne terminy".`,
                        effect: 'Reklama trafia do osób, które realnie mogą przyjechać na krótki wyjazd i szukają odpoczynku w rozsądnej odległości od domu.'
                    },
                    {
                        title: 'Przykład praktyczny 2 – „Noclegi dla firm i pracowników"',
                        description: `Obiekt położony blisko strefy przemysłowej chce dotrzeć do firm delegujących pracowników.

Parametry kampanii:

• grupa docelowa: osoby w wieku 25–60 lat, zainteresowane tematami „zarządzanie firmą", „delegacje", „logistyka", mieszkające w wybranych miastach (siedziby firm),

• cel kampanii: pozyskanie zapytań ofertowych (kliknięcie w formularz / kontakt mailowy),

• treść reklamy:

• opis: „Noclegi dla pracowników z fakturą VAT, parkingiem i śniadaniem. Elastyczne warunki dla firm",

• grafika: zdjęcie parkingu, pokoju i sali śniadaniowej,

• wezwanie do działania: „Napisz, przygotuję ofertę dla Twojej firmy".`,
                        effect: 'Zamiast czekać, aż firma przypadkiem trafi na stronę, obiekt aktywnie wychodzi z ofertą do osób decyzyjnych.'
                    }
                ],
                keyElements: [
                    {
                        title: 'Jasno określony cel kampanii',
                        description: 'Co chcesz osiągnąć w tej konkretnej kampanii',
                        points: [
                            'więcej wejść na stronę oferty',
                            'więcej zapytań o dostępność',
                            'więcej telefonów / wiadomości',
                            'większą rozpoznawalność obiektu w danym mieście / regionie'
                        ],
                        icon: 'target'
                    },
                    {
                        title: 'Precyzyjna grupa docelowa',
                        description: 'Kto ma zobaczyć tę reklamę',
                        points: [
                            'pary szukające weekendu',
                            'rodziny z dziećmi',
                            'pracownicy w delegacji',
                            'organizatorzy szkoleń / wydarzeń'
                        ],
                        icon: 'audience'
                    },
                    {
                        title: 'Konkretna oferta i komunikat',
                        description: 'Co dokładnie proponujesz',
                        points: [
                            '„Nocleg ze śniadaniem od 260 zł / doba"',
                            '„Pakiet weekendowy dla par"',
                            '„Noclegi pracownicze z fakturą VAT"',
                            'Dlaczego ma to znaczenie dla klienta (korzyść, wygoda, oszczędność czasu / pieniędzy)'
                        ],
                        icon: 'benefits'
                    },
                    {
                        title: 'Dobra kreacja (grafika + tekst)',
                        description: 'Elementy skutecznej kreacji',
                        points: [
                            'zdjęcie pokazujące rzeczywisty standard obiektu',
                            'krótki, czytelny tekst bez żargonu',
                            'wyraźne wezwanie do działania („Sprawdź terminy", „Napisz wiadomość", „Zarezerwuj pobyt")'
                        ],
                        icon: 'content'
                    },
                    {
                        title: 'Budżet i czas trwania kampanii',
                        description: 'Planowanie budżetu',
                        points: [
                            'start od niewielkiego budżetu dziennego (np. 20–40 zł)',
                            'minimum kilka–kilkanaście dni na przetestowanie skuteczności'
                        ],
                        icon: 'cost-seo'
                    },
                    {
                        title: 'Spójność reklamy i miejsca docelowego',
                        description: 'Zapewnienie spójności',
                        points: [
                            'jeżeli reklamujesz „Weekend dla par" – użytkownik po kliknięciu powinien trafić dokładnie na stronę z opisem tego pakietu, a nie na ogólną stronę główną'
                        ],
                        icon: 'experience'
                    }
                ],
                checklist: [
                    {
                        id: 'check-1',
                        text: 'Czy cel kampanii jest jasno określony i jeden na kampanię?'
                    },
                    {
                        id: 'check-2',
                        text: 'Czy wiesz dokładnie, do kogo kierujesz tę konkretną ofertę?'
                    },
                    {
                        id: 'check-3',
                        text: 'Czy treść reklamy jasno mówi: co, dla kogo, w jakiej cenie / na jakich warunkach?'
                    },
                    {
                        id: 'check-4',
                        text: 'Czy grafika jest wyraźna, aktualna i pokazuje Twój obiekt, a nie przypadkowe zdjęcie z banku zdjęć?'
                    },
                    {
                        id: 'check-5',
                        text: 'Czy miejsce, do którego kierujesz użytkownika po kliknięciu, jest spójne z reklamą i łatwe w obsłudze (strona / formularz / wiadomość)?'
                    },
                    {
                        id: 'check-6',
                        text: 'Czy masz zaplanowane minimum kilka dni na obserwację wyników i drobne korekty (zamiast zmieniać wszystko po 1–2 dniach)?'
                    }
                ],
                quiz: [
                    {
                        id: 'q1',
                        type: 'choice',
                        question: 'Co jest fundamentem skutecznej kampanii reklamowej na Facebooku / Instagramie dla obiektu noclegowego?',
                        options: [
                            'Jak najwyższy budżet reklamowy',
                            'Precyzyjnie określony cel i grupa docelowa',
                            'Jak największa liczba różnych grafik',
                            'Publikowanie reklam wyłącznie w weekendy'
                        ],
                        correctAnswer: 1,
                        feedback: 'Dokładnie tak – fundamentem skutecznej kampanii jest precyzyjnie określony cel i dobrze zdefiniowana grupa docelowa.'
                    },
                    {
                        id: 'q2',
                        type: 'choice',
                        question: 'Który przykład najlepiej opisuje przemyślaną ofertę reklamową?',
                        options: [
                            '„Zapraszamy do naszego hotelu, mamy wolne pokoje."',
                            '„Hotel w centrum miasta, pokoje 2-osobowe, szczegóły na stronie."',
                            '„Weekend dla par: 2 noce ze śniadaniami, darmowy parking i późne wymeldowanie. Sprawdź dostępne terminy."',
                            '„Kliknij, żeby zobaczyć nasz profil na Facebooku."'
                        ],
                        correctAnswer: 2,
                        feedback: 'Dokładnie tak – przemyślana oferta reklamowa zawiera konkretne informacje (co, dla kogo, na jakich warunkach) i jasne wezwanie do działania.'
                    },
                    {
                        id: 'q3',
                        type: 'choice',
                        question: 'Dlaczego warto zaczynać kampanię od mniejszego budżetu dziennego (np. 20–40 zł)?',
                        options: [
                            'Bo niższy budżet automatycznie poprawia jakość reklamy',
                            'Bo wtedy reklama nie wyświetli się zbyt często',
                            'Bo pozwala bez dużego ryzyka przetestować grupy odbiorców i kreacje przed zwiększeniem wydatków',
                            'Bo Facebook nie pozwala na wyższe budżety dla nowych kont'
                        ],
                        correctAnswer: 2,
                        feedback: 'Dokładnie tak – zaczynanie od mniejszego budżetu pozwala na bezpieczne testowanie różnych grup docelowych i kreacji przed zwiększeniem wydatków.'
                    }
                ]
            },
            {
                id: '3.2',
                moduleId: '3',
                title: 'Analiza wyników kampanii',
                intro: `Samo uruchomienie kampanii reklamowej na Facebooku czy Instagramie to dopiero początek. Prawdziwa praca zaczyna się wtedy, gdy zaczynamy regularnie sprawdzać wyniki i na tej podstawie podejmować decyzje:

• co zostawić,

• co zmienić,

• co wyłączyć,

• w co zainwestować więcej.

Analiza wyników kampanii pozwala zamienić „strzelanie na ślepo” w świadome, oparte na danych decyzje marketingowe.`,
                whyImportant: [
                    {
                        title: 'Nie każda reklama działa tak samo',
                        description: 'Różne grupy odbiorców reagują na inne komunikaty i formy',
                        points: [
                            'to, co działa zimą, nie musi działać latem',
                            'różne cele (weekendy, pracownicy, rodziny) mają różne wyniki'
                        ],
                        icon: 'target'
                    },
                    {
                        title: 'Bez analizy tracisz budżet',
                        description: 'Płacisz za kliknięcia, które nie prowadzą do rezerwacji',
                        points: [
                            'ładne kreacje nie zawsze działają',
                            'brak danych = brak pewności, czy pieniądze pracują'
                        ],
                        icon: 'cost-seo'
                    },
                    {
                        title: 'Z analizą podejmujesz świadome decyzje',
                        description: 'Przesuwasz budżet do kampanii, które działają najlepiej',
                        points: [
                            'wyłączasz słabe kampanie',
                            'poprawiasz wyniki krok po kroku zamiast zaczynać od zera'
                        ],
                        icon: 'analytics'
                    }
                ],
                keyElements: [
                    {
                        title: 'CTR (Click-Through Rate)',
                        description: 'Pokazuje, jaki procent osób kliknął reklamę',
                        points: [
                            'niski CTR = słaba grafika lub zbyt ogólny tekst',
                            'warto porównywać CTR między kampaniami'
                        ],
                        icon: 'visibility'
                    },
                    {
                        title: 'CPC (Cost Per Click)',
                        description: 'Średni koszt jednego kliknięcia',
                        points: [
                            'pomaga porównywać kampanie',
                            'nie jest celem samym w sobie, ale sygnałem efektywności'
                        ],
                        icon: 'cost-seo'
                    },
                    {
                        title: 'Konwersje / zapytania / rezerwacje',
                        description: 'Najważniejszy wskaźnik realnych efektów',
                        points: [
                            'połącz dane z reklam z formularzem / skrzynką / systemem rezerwacji',
                            'licz nie tylko kliknięcia, ale też ile osób napisało lub zadzwoniło'
                        ],
                        icon: 'cta'
                    },
                    {
                        title: 'Koszt pozyskania zapytania (CPA)',
                        description: 'Ile realnie kosztuje Cię jedno zapytanie lub rezerwacja',
                        points: [
                            'ten wskaźnik mówi, czy kampania ma sens biznesowo',
                            'łatwiej porównywać różne kampanie i oferty'
                        ],
                        icon: 'benefits'
                    },
                    {
                        title: 'Zasięg i częstotliwość',
                        description: 'Jak szeroko i jak często widzą reklamę Twoi odbiorcy',
                        points: [
                            'wysoka częstotliwość + brak efektów = reklama męczy odbiorców',
                            'czasem wystarczy odświeżyć kreację'
                        ],
                        icon: 'traffic'
                    }
                ],
                practicalExamples: [
                    {
                        title: 'Przykład 1 – kampania „Weekend dla par”',
                        description: `Prowadzisz dwie kampanie równolegle:

• Kampania A – reklama z jednym zdjęciem pokoju,

• Kampania B – reklama z krótkim wideo pokazującym pokój, śniadanie i okolicę.

Po 10 dniach:

• Kampania A: CTR 1,2%, koszt kliknięcia 1,80 zł, 3 zapytania,

• Kampania B: CTR 2,9%, koszt kliknięcia 1,10 zł, 9 zapytań.`,
                        effect: 'Wideo działa lepiej – zwiększasz budżet Kampanii B i testujesz kolejne warianty wideo.'
                    },
                    {
                        title: 'Przykład 2 – noclegi pracownicze',
                        description: `Prowadzisz kampanię noclegów dla firm i pracowników:

• Grupa docelowa 1: osoby mieszkające w Twoim powiecie,

• Grupa docelowa 2: osoby mieszkające w innych miastach, gdzie są siedziby firm.

Po 2 tygodniach:

• Grupa 1: wysoki CTR, ale mało rezerwacji,

• Grupa 2: mniej kliknięć, ale więcej konkretnych zapytań.`,
                        effect: 'Przenosisz większą część budżetu na grupę 2, a dla grupy 1 tworzysz inną kampanię (np. wizerunkową).'
                    }
                ],
                roleDescriptionTitle: 'Prosty schemat analizy po 7–14 dniach kampanii',
                roleDescription: `1. Sprawdź, która kampania ma wyższy CTR i niższy koszt kliknięcia.
2. Zobacz, z których kampanii / zestawów reklam realnie przychodzą zapytania / rezerwacje.
3. Zadaj sobie pytania:
• Czy reklama jest spójna z ofertą na stronie?
• Czy cena, którą pokazujesz, jest jasna i zrozumiała?
• Czy kierujesz reklamę do właściwej grupy (nie za szeroko)?
4. Przesuń budżet do najlepiej działających kampanii / zestawów.
5. Wyłącz kampanie, które mają wysokie koszty i brak efektów (po przetestowaniu ich przez kilka dni).`,
                additionalInfoTitle: 'Najczęstsze błędy przy analizie wyników',
                additionalInfo: `• Wyciąganie wniosków po 1–2 dniach emisji.
• Ocenianie kampanii tylko po „polubieniach”, bez spojrzenia na zapytania i rezerwacje.
• Niewykorzystywanie danych do zmian – kampania „idzie, bo już jest włączona”.
• Porównywanie wyników kampanii o różnych celach.`,
                quiz: [
                    {
                        id: 'q1',
                        type: 'choice',
                        question: 'Który wskaźnik najlepiej pokazuje, czy reklama jest atrakcyjna dla odbiorców?',
                        options: [
                            'Liczba polubień strony',
                            'CTR (współczynnik kliknięć)',
                            'Łączny zasięg kampanii',
                            'Liczba wyświetleń reklamy'
                        ],
                        correctAnswer: 1,
                        feedback: 'CTR pokazuje, jaki procent odbiorców kliknął reklamę, więc najlepiej wskazuje atrakcyjność kreacji.'
                    },
                    {
                        id: 'q2',
                        type: 'choice',
                        question: 'Co oznacza „koszt pozyskania zapytania / rezerwacji” (CPA)?',
                        options: [
                            'Łączna kwota wydana na reklamy w danym miesiącu',
                            'Średni koszt jednego wyświetlenia reklamy',
                            'Średni koszt kampanii w ciągu jednego dnia',
                            'Ile średnio kosztuje jedno zapytanie lub rezerwacja wygenerowana przez kampanię'
                        ],
                        correctAnswer: 3,
                        feedback: 'CPA pokazuje, ile realnie płacisz za konkretne działanie klienta (zapytanie, rezerwację).'
                    },
                    {
                        id: 'q3',
                        type: 'choice',
                        question: 'Po 10 dniach kampanii widzisz, że reklama ma dużo kliknięć, ale mało zapytań. Co robisz?',
                        options: [
                            'Zostawiam kampanię bez zmian',
                            'Zwiększam budżet, aby było więcej kliknięć',
                            'Sprawdzam treść reklamy i stronę docelową, zmieniam ofertę lub grupę docelową',
                            'Wyłączam wszystkie reklamy'
                        ],
                        correctAnswer: 2,
                        feedback: 'Należy sprawdzić spójność reklamy i strony docelowej oraz dopracować ofertę lub targetowanie.'
                    },
                    {
                        id: 'q4',
                        type: 'open',
                        question: 'Jakie trzy konkretne wnioski chcesz wyciągać z wyników swoich kampanii i jak pomogą Ci podejmować decyzje?',
                        keywords: [
                            'wnioski',
                            'działa',
                            'nie działa',
                            'budżet',
                            'target',
                            'oferta',
                            'decyzje'
                        ],
                        hint: 'Pomyśl o tym, co chcesz wiedzieć po analizie: które reklamy działają, jakie grupy warto rozwijać, czego unikać.',
                        feedback: 'Świadome wnioski z kampanii pomagają inwestować w to, co działa, i unikać marnowania budżetu.'
                    }
                ]
            }
        ]
    },
    {
        id: '4',
        title: 'Budowanie relacji z klientami',
        icon: 'users',
        lessons: [
            {
                id: '4.1',
                moduleId: '4',
                title: 'Zarządzanie opiniami i recenzjami online',
                intro: `Opinie i recenzje online (Google, Booking, Facebook, portale rezerwacyjne) są dziś jednym z najważniejszych czynników wpływających na decyzje klientów. Zanim ktoś zadzwoni, napisze maila czy zarezerwuje nocleg, bardzo często najpierw sprawdza średnią ocen i kilka ostatnich komentarzy.`,
                whyImportant: [
                    {
                        title: 'Zwiększenie liczby rezerwacji',
                        description: 'Wyższa średnia ocena = większe zaufanie',
                        points: [],
                        icon: 'target'
                    },
                    {
                        title: 'Wyróżnienie się na tle konkurencji',
                        description: 'Nawet przy podobnym standardzie obiektu',
                        points: [],
                        icon: 'visibility'
                    },
                    {
                        title: 'Szybsze wyłapywanie problemów',
                        description: 'Powtarzające się problemy (np. hałas, śniadania, sprzątanie) i realna poprawa jakości usług',
                        points: [],
                        icon: 'analytics'
                    },
                    {
                        title: 'Budowanie wizerunku',
                        description: 'Firma jako miejsce, które słucha gości i reaguje na uwagi',
                        points: [],
                        icon: 'trust'
                    }
                ],
                whyImportantFooter: `Brak reakcji na opinie lub emocjonalne odpowiedzi:

• obniża zaufanie nowych klientów,

• może sprawiać wrażenie chaosu organizacyjnego lub braku profesjonalizmu,

• wzmacnia negatywne wrażenie po pojedynczym, złym doświadczeniu.`,
                practicalExamples: [
                    {
                        title: 'Przykład praktyczny 1 – obiekt noclegowy',
                        description: `Gość wystawia opinię 3/5 na Google:

„Pokój czysty, ale w nocy było dość głośno od ulicy. Śniadanie ok, ale mogłoby być bardziej urozmaicone."

Słaba reakcja: brak odpowiedzi albo krótka, defensywna wiadomość w stylu:

„Zawsze jest trochę hałasu, nic na to nie poradzimy."

Profesjonalna reakcja:

• podziękowanie za opinię,

• krótkie odniesienie się do uwag,

• zaznaczenie, co firma robi, aby poprawić sytuację,

• zaproszenie do kontaktu bezpośredniego.

Przykładowa odpowiedź:

„Dziękujemy za podzielenie się opinią. Cieszymy się, że docenił/a Pan/Pani czystość i śniadanie. Hałas od ulicy to dla nas ważna uwaga – testujemy obecnie dodatkowe uszczelnienia okien oraz rozważamy dodatkowe elementy wygłuszające. Będziemy wdzięczni za kontakt bezpośredni, żeby lepiej zrozumieć szczegóły pobytu i dobrać spokojniejszy pokój przy kolejnej rezerwacji."`,
                        effect: 'Taka odpowiedź pokazuje, że firma słucha, sygnalizuje działania naprawcze i buduje zaufanie u wszystkich, którzy czytają opinię, nie tylko u jednej osoby.'
                    },
                    {
                        title: 'Przykład praktyczny 2 – powtarzający się problem',
                        description: `Jeżeli w kilku opiniach z rzędu pojawia się motyw: „smutne śniadania", „mało świeżych warzyw", „ciągle to samo menu", to:

• nie wystarczy lepsza odpowiedź,

• konieczna jest realna zmiana (np. rotacja dań, jedno dodatkowe ciepłe danie, lepsza ekspozycja produktów).

Po wprowadzeniu zmiany warto:

• poprosić kolejnych zadowolonych gości o wystawienie opinii,

• sprawdzić, czy nowym recenzjom towarzyszy np. sformułowanie „śniadania się poprawiły", „jest większy wybór".`,
                        effect: 'Systematyczne reagowanie na powtarzające się problemy i wprowadzanie realnych zmian buduje długoterminową reputację i zaufanie klientów.'
                    }
                ],
                roleDescription: `1. Odpowiadaj na większość opinii, nie tylko na skrajnie negatywne.

2. Na negatywne opinie odpowiadaj szybko, ale spokojnie.

3. Nie przerzucaj winy na klienta w publicznej odpowiedzi.

4. Aktywnie zachęcaj zadowolonych gości do wystawiania opinii (np. przy wymeldowaniu).

5. Monitoruj średnią ocenę oraz powtarzające się motywy i traktuj je jak darmowe badanie satysfakcji.`,
                roleDescriptionTitle: 'Dobre praktyki zarządzania opiniami',
                quiz: [
                    {
                        id: 'q1',
                        type: 'choice',
                        question: 'Jak powinna reagować profesjonalna firma na negatywną opinię online?',
                        options: [
                            'Ignorować ją, żeby „nie robić szumu"',
                            'Odpowiedzieć profesjonalnie, podziękować za opinię, przeprosić i zaproponować rozwiązanie',
                            'Usunąć opinię, jeśli to możliwe',
                            'Odpowiedzieć emocjonalnie, tłumacząc, że klient przesadza'
                        ],
                        correctAnswer: 1,
                        feedback: 'Dokładnie tak – profesjonalna odpowiedź na negatywną opinię pokazuje zaangażowanie w satysfakcję klienta i może przekształcić negatywną sytuację w pozytywną.'
                    },
                    {
                        id: 'q2',
                        type: 'choice',
                        question: 'Które z poniższych działań najlepiej pomaga zwiększyć liczbę pozytywnych opinii?',
                        options: [
                            'Czekanie, aż klienci sami z siebie napiszą recenzję',
                            'Prośba o opinię tylko wtedy, gdy ktoś narzeka',
                            'Systematyczne, uprzejme proszenie zadowolonych gości o pozostawienie opinii (np. przy wymeldowaniu, w mailu po pobycie)',
                            'Oferowanie rabatu w zamian za wyłącznie 5-gwiazdkowe opinie'
                        ],
                        correctAnswer: 2,
                        feedback: 'Dokładnie tak – systematyczne, uprzejme proszenie zadowolonych gości o opinie jest najlepszą praktyką, która naturalnie zwiększa liczbę pozytywnych recenzji.'
                    },
                    {
                        id: 'q3',
                        type: 'choice',
                        question: 'Które stwierdzenie najlepiej opisuje rolę recenzji online w działalności hotelu lub pensjonatu?',
                        options: [
                            'Mają znaczenie tylko dla turystów zagranicznych',
                            'Są ważne głównie po to, żeby „ładnie wyglądały" w wyszukiwarce',
                            'Silnie wpływają na decyzje rezerwacyjne i są jednym z kluczowych źródeł informacji dla nowych gości',
                            'Są mniej istotne niż ulotki i ogłoszenia drukowane'
                        ],
                        correctAnswer: 2,
                        feedback: 'Dokładnie tak – recenzje online silnie wpływają na decyzje rezerwacyjne i są jednym z pierwszych źródeł informacji, które sprawdzają potencjalni klienci przed rezerwacją.'
                    }
                ]
            },
            {
                id: '4.2',
                moduleId: '4',
                title: 'Komunikacja z klientami w mediach społecznościowych',
                intro: `Dla wielu osób Facebook czy Instagram to pierwszy punkt kontaktu z firmą. Zanim zadzwonią lub napiszą maila, szybciej wyślą wiadomość na Messengerze albo skomentują post. To oznacza, że sposób odpowiedzi w social mediach bardzo często decyduje o tym, czy klient zrobi kolejny krok (zapytanie o ofertę, rezerwacja, wizyta), czy po prostu przejdzie dalej.`,
                whyImportant: [
                    {
                        title: 'Budowanie zaufania',
                        description: 'Firma jest „żywa", reaguje, odpowiada',
                        points: [],
                        icon: 'trust'
                    },
                    {
                        title: 'Wzmacnianie wizerunku',
                        description: 'Profesjonalne, uporządkowane miejsce',
                        points: [],
                        icon: 'visibility'
                    },
                    {
                        title: 'Zmniejszanie nieporozumień',
                        description: 'Np. źle zrozumiane godziny zameldowania, zasady rezerwacji',
                        points: [],
                        icon: 'info'
                    },
                    {
                        title: 'Szybsze domykanie sprzedaży',
                        description: 'Zapytanie → konkretna propozycja → rezerwacja',
                        points: [],
                        icon: 'sales'
                    },
                    {
                        title: 'Wpływ na postrzeganie',
                        description: 'Jak Twoją firmę postrzegają osoby, które tylko „podglądają" rozmowy pod postami, ale jeszcze się nie odezwały',
                        points: [],
                        icon: 'relations'
                    }
                ],
                whyImportantFooter: `Brak odpowiedzi lub chaotyczne, emocjonalne reakcje:

• zniechęcają do zadawania pytań,

• obniżają poczucie bezpieczeństwa („czy ktoś w ogóle tam ogarnia?"),

• mogą zniechęcić do rezerwacji nawet przy dobrych zdjęciach i ofercie.`,
                practicalExamples: [
                    {
                        title: 'Przykład praktyczny 1 – zapytanie na Messengerze',
                        description: `Klient pisze wiadomość:

„Dzień dobry, czy macie Państwo wolne pokoje 2-osobowe na przyszły weekend? Interesuje mnie nocleg z soboty na niedzielę, ze śniadaniem."

Słaba odpowiedź (zbyt ogólna, opóźniona):

• odpowiedź po 2 dniach,

• treść: „Proszę dzwonić w godzinach 9–17."

Lepsza odpowiedź:

• odpowiedź w ciągu kilku godzin w godzinach pracy,

• treść konkretna i uporządkowana:

„Dzień dobry, dziękujemy za wiadomość. W terminie sobota–niedziela mamy jeszcze dostępne pokoje 2-osobowe ze śniadaniem.

Cena: 260 zł / doba za pokój ze śniadaniem.

Możemy od razu zarezerwować miejsce – proszę o imię i nazwisko oraz przybliżoną godzinę przyjazdu. W razie pytań chętnie pomogę."`,
                        effect: 'Taka odpowiedź od razu zmniejsza liczbę kolejnych pytań, prowadzi klienta do konkretnej decyzji i pokazuje, że firma jest dostępna i zorganizowana.'
                    },
                    {
                        title: 'Przykład praktyczny 2 – komentarz publiczny',
                        description: `Pod postem pojawia się komentarz:

„Dzwoniłem wczoraj kilka razy i nikt nie odbierał. Słaby kontakt."

Możliwe reakcje:

• Ignorowanie komentarza – pozostawia wrażenie, że firma unika tematu.

• Oburzenie („Przecież nie możemy cały czas siedzieć przy telefonie") – eskaluje problem.

• Profesjonalna odpowiedź:

„Dziękujemy za sygnał. Przepraszamy za trudność z kontaktem – wczoraj w godzinach popołudniowych mieliśmy wzmożony ruch i mogliśmy nie odebrać każdej rozmowy. Prosimy o wiadomość prywatną lub numer telefonu – oddzwonimy dzisiaj i postaramy się wszystko wyjaśnić."

Dodatkowo, po takiej odpowiedzi:

• warto faktycznie oddzwonić,

• sprawdzić, czy w określonych godzinach nie warto wprowadzić prostych usprawnień (np. przekierowanie połączeń, jasna informacja w opisie profilu o godzinach odbierania telefonu).`,
                        effect: 'Profesjonalna odpowiedź na publiczny komentarz pokazuje, że firma słucha, reaguje i dba o klientów, nawet w trudnych sytuacjach.'
                    }
                ],
                roleDescription: `1. Czas reakcji – odpowiadaj możliwie szybko w godzinach pracy; dobry standard to odpowiedź w ciągu kilku godzin (maksymalnie 24 godziny).

2. Ton wypowiedzi – spokojny, uprzejmy, konkretny. Bez emocji, żalu ani ironii, nawet jeśli klient jest nerwowy.

3. Personalizacja – jeżeli to możliwe, zwracaj się po imieniu (jeśli klient je podaje) i nawiązuj do konkretnej sytuacji.

4. Klarowność – krótkie zdania, najważniejsze informacje na początku (termin, cena, dalszy krok).

5. Przenoszenie trudnych tematów do kanału prywatnego – w przypadku skarg szybko zaproponuj przejście do wiadomości prywatnych lub telefonu, ale na komentarz publiczny też odpowiedz.

6. Stałe „następne kroki" – kończ wiadomości jasnym wskazaniem, co klient może zrobić dalej (zadzwonić, wysłać dane do rezerwacji, wejść na konkretną stronę).`,
                roleDescriptionTitle: 'Proste zasady dobrej komunikacji w social mediach',
                quiz: [
                    {
                        id: 'q1',
                        type: 'choice',
                        question: 'Jaki standard czasu odpowiedzi jest rozsądny dla małej firmy (hotel, pensjonat, lokalna usługa) w mediach społecznościowych?',
                        options: [
                            'Odpowiedź raz w tygodniu, przy przeglądaniu wiadomości',
                            'Odpowiedź w ciągu kilku godzin w godzinach pracy, maksymalnie do 24 godzin',
                            'Odpowiedź tylko wtedy, gdy klient pisze drugi raz',
                            'Odpowiedź wyłącznie rano, niezależnie od godziny wysłania wiadomości'
                        ],
                        correctAnswer: 1,
                        feedback: 'Dokładnie tak – odpowiedź w ciągu kilku godzin w godzinach pracy (maksymalnie 24 godziny) to dobry standard, który pokazuje zaangażowanie i profesjonalizm.'
                    },
                    {
                        id: 'q2',
                        type: 'choice',
                        question: 'Które z poniższych zachowań najlepiej buduje zaufanie w komunikacji w mediach społecznościowych?',
                        options: [
                            'Krótkie, jednozdaniowe odpowiedzi bez szczegółów',
                            'Ignorowanie komentarzy publicznych, odpowiadanie tylko na wiadomości prywatne',
                            'Uprzejme, konkretne odpowiedzi, dopasowane do sytuacji klienta, z jasnym „co dalej"',
                            'Odpowiadanie klientom tylko wtedy, gdy pytają o cenę'
                        ],
                        correctAnswer: 2,
                        feedback: 'Dokładnie tak – uprzejme, konkretne odpowiedzi dopasowane do sytuacji klienta, z jasnym wskazaniem następnych kroków, budują zaufanie i profesjonalny wizerunek.'
                    },
                    {
                        id: 'q3',
                        type: 'open',
                        question: 'Napisz jedną konkretną zasadę komunikacji z klientami w mediach społecznościowych, którą chciałbyś wprowadzić lub poprawić w swojej firmie (np. „odpowiadamy na wszystkie wiadomości do 4 godzin w godzinach pracy").',
                        keywords: [
                            'czas',
                            'odpowiedź',
                            'godziny',
                            'standard',
                            'zasada',
                            'komunikacja',
                            'reakcja',
                            'wiadomość',
                            'messenger',
                            'facebook',
                            'instagram',
                            'kontakt',
                            'dostępność',
                            'szybko',
                            'natychmiast',
                            '24',
                            '4',
                            '6',
                            '8',
                            '12'
                        ],
                        hint: 'Pomyśl o konkretnej zasadzie, którą możesz wprowadzić w swojej firmie, np. dotyczącej czasu odpowiedzi, tonu komunikacji, personalizacji itp...',
                        feedback: 'Dziękuję za odpowiedź. Konkretne zasady komunikacji pomagają w budowaniu profesjonalnego wizerunku i zaufania klientów.'
                    }
                ]
            }
        ]
    },
    {
        id: '5',
        title: 'Email marketing',
        icon: 'mail',
        lessons: [
            {
                id: '5.1',
                moduleId: '5',
                title: 'Tworzenie skutecznych kampanii emailowych',
                intro: `Email marketing, mimo rozwoju social mediów i komunikatorów, nadal jest jednym z najbardziej efektywnych kanałów dotarcia do klientów. To bezpośrednia wiadomość do osoby, która już zostawiła kontakt i w jakimś stopniu jest zainteresowana ofertą.

Dobrze przygotowany email:

• trafia do skrzynki osoby, która zna Twoją firmę,

• może zawierać konkretną propozycję (np. termin, cena, link do rezerwacji),

• pozwala budować relację „na spokojnie", poza chaosem mediów społecznościowych.`,
                whyImportant: [
                    {
                        title: 'Docieranie do byłych klientów',
                        description: 'Możesz przypomnieć się przed kolejnym sezonem',
                        points: [],
                        icon: 'remind'
                    },
                    {
                        title: 'Informowanie o nowościach',
                        description: 'Np. nowe pokoje, pakiety rodzinne, oferta świąteczna',
                        points: [],
                        icon: 'info'
                    },
                    {
                        title: 'Kontrola nad komunikacją',
                        description: 'Nie jesteś zależny od algorytmów Facebooka czy Instagrama',
                        points: [],
                        icon: 'organize'
                    },
                    {
                        title: 'Mierzenie efektów',
                        description: 'Widzisz, kto otworzył wiadomość, kto kliknął, co było interesujące',
                        points: [],
                        icon: 'analytics'
                    }
                ],
                whyImportantFooter: `Bez email marketingu łatwo „zgubić" osoby, które były raz i… zniknęły. Z prostą listą mailingową możesz co jakiś czas przypomnieć im o sobie.`,
                practicalExamples: [
                    {
                        title: 'Przykład praktyczny 1 – hotel / pensjonat',
                        description: `Załóżmy, że prowadzisz pensjonat w mieście turystycznym. Po każdym pobycie prosisz gościa o zgodę na zapis do listy mailingowej (np. na recepcji lub w formularzu online).

Raz na kwartał możesz wysłać:

• email z informacją o nowych pakietach (np. „Weekend dla par", „Jesienny wypoczynek z termami"),

• prostą propozycję:

„Dla Gości, którzy już u nas byli – 10% rabatu na pobyt w terminach poza sezonem głównym."`,
                        effect: 'Część gości wróci szybciej, niż gdyby miała sama o Tobie pamiętać, a budujesz wrażenie, że „dbasz o stałych klientów", a nie tylko o nowych.'
                    },
                    {
                        title: 'Przykład praktyczny 2 – mały lokalny biznes usługowy',
                        description: `Firma oferująca usługi (np. gabinet fizjoterapii, studio treningowe, szkoła językowa) może:

• zbierać adresy email od klientów przy pierwszej wizycie,

• wysyłać:

• praktyczne porady (np. jak dbać o kręgosłup, jak przygotować dziecko do egzaminu),

• informacje o wolnych terminach,

• przypomnienia o sezonowych usługach.`,
                        effect: 'Dzięki temu klient nie musi sam śledzić profilu w social mediach, a wiadomości trafiają do skrzynki, którą i tak codziennie otwiera.'
                    }
                ],
                keyElements: [
                    {
                        title: 'Relewantna treść',
                        description: 'Wiadomość musi być dopasowana do odbiorcy',
                        points: [
                            'inaczej piszesz do rodziny z dziećmi',
                            'inaczej do pary szukającej weekendu tylko we dwoje'
                        ],
                        icon: 'target'
                    },
                    {
                        title: 'Personalizacja',
                        description: 'Nawet proste wstawienie imienia zwiększa szansę, że wiadomość zostanie przeczytana',
                        points: [
                            '„Panie Janie, mamy dla Pana…"'
                        ],
                        icon: 'relations'
                    },
                    {
                        title: 'Jasny cel',
                        description: 'Każdy email powinien mieć jedno główne zadanie',
                        points: [
                            'zachęcić do rezerwacji',
                            'przypomnieć o terminach',
                            'poinformować o nowości'
                        ],
                        icon: 'goal'
                    },
                    {
                        title: 'Wyraźne wezwanie do działania (CTA)',
                        description: 'Konkretne przykłady',
                        points: [
                            '„Kliknij tutaj, aby sprawdzić dostępne terminy"',
                            '„Odpowiedz na tego maila, jeśli chcesz zarezerwować pobyt w proponowanym terminie"'
                        ],
                        icon: 'cta'
                    },
                    {
                        title: 'Odpowiedni timing',
                        description: 'Wysyłanie w odpowiednim momencie',
                        points: [
                            'przypomnienie o ofercie przed długim weekendem',
                            'informacja o zimowym pakiecie na kilka tygodni przed feriami'
                        ],
                        icon: 'time'
                    }
                ],
                quiz: [
                    {
                        id: 'q1',
                        type: 'choice',
                        question: 'Co jest kluczowe w skutecznej kampanii emailowej?',
                        options: [
                            'Tylko atrakcyjny, kolorowy design',
                            'Relewantna treść, personalizacja i odpowiedni moment wysyłki',
                            'Wysyłanie jak najdłuższych wiadomości raz w roku',
                            'Wysyłanie tej samej wiadomości do wszystkich, niezależnie od potrzeb'
                        ],
                        correctAnswer: 1,
                        feedback: 'Dokładnie tak – skuteczna kampania emailowa wymaga relewantnej treści dopasowanej do odbiorcy, personalizacji oraz wysłania w odpowiednim momencie.'
                    },
                    {
                        id: 'q2',
                        type: 'choice',
                        question: 'Która z poniższych wiadomości jest lepiej zaprojektowana dla byłych gości pensjonatu poza sezonem głównym?',
                        options: [
                            '„Zapraszamy do naszego pensjonatu. Mamy wolne pokoje."',
                            '„Dzień dobry, mamy promocję. Jak coś, proszę pisać."',
                            '„Dzień dobry Panie Tomaszu, dla Gości, którzy już u nas byli, przygotowaliśmy 10% rabatu na pobyt w listopadzie i grudniu (od niedzieli do piątku). Jeśli chce Pan sprawdzić dostępne terminy, proszę kliknąć w ten link lub odpowiedzieć na tego maila."',
                            '„Witam, wysyłamy informację o ofercie. Pozdrawiamy."'
                        ],
                        correctAnswer: 2,
                        feedback: 'Dokładnie tak – najlepsza wiadomość zawiera personalizację (imię), konkretną ofertę (10% rabatu, termin), jasne warunki (od niedzieli do piątku) i wyraźne wezwanie do działania (link lub odpowiedź).'
                    },
                    {
                        id: 'q3',
                        type: 'choice',
                        question: 'Które stwierdzenie najlepiej opisuje rolę listy mailingowej w małej firmie?',
                        options: [
                            'Lista mailingowa jest potrzebna tylko dużym sklepom internetowym.',
                            'Lista mailingowa to zbędny dodatek – wystarczą social media.',
                            'Lista mailingowa to baza kontaktów do osób, które wyraziły zgodę na komunikację i którym można regularnie przypominać o ofercie.',
                            'Lista mailingowa służy wyłącznie do wysyłania świątecznych życzeń.'
                        ],
                        correctAnswer: 2,
                        feedback: 'Dokładnie tak – lista mailingowa to baza kontaktów do osób, które wyraziły zgodę na komunikację i którym można regularnie przypominać o ofercie, co jest szczególnie wartościowe dla małych firm.'
                    },
                    {
                        id: 'q4',
                        type: 'choice',
                        question: 'Co z poniższego zazwyczaj NIE jest dobrym pomysłem w email marketingu?',
                        options: [
                            'Wysyłanie wiadomości bez jasnego celu i CTA',
                            'Segmentowanie listy (np. osobno rodziny, osobno klienci biznesowi)',
                            'Testowanie różnych tematów wiadomości (A/B testy)',
                            'Sprawdzanie statystyk otwarć i kliknięć po wysyłce'
                        ],
                        correctAnswer: 0,
                        feedback: 'Dokładnie tak – wysyłanie wiadomości bez jasnego celu i wyraźnego wezwania do działania (CTA) to zły pomysł, ponieważ zmniejsza szansę na zaangażowanie odbiorcy i osiągnięcie celu kampanii.'
                    }
                ]
            },
            {
                id: '5.2',
                moduleId: '5',
                title: 'Personalizacja i automatyzacja kampanii',
                intro: `Wysyłanie „jednego, tego samego maila do wszystkich" coraz rzadziej działa. Klienci dostają dziesiątki wiadomości dziennie – zwracają uwagę głównie na te, które są dla nich.

Personalizacja (dopasowanie treści do odbiorcy) i automatyzacja (wysyłka we właściwym momencie, bez ręcznego klikania) sprawiają, że email marketing zaczyna pracować jak dobrze ułożony system, a nie przypadkowe, pojedyncze wysyłki.`,
                whyImportant: [
                    {
                        title: 'Oszczędność czasu',
                        description: 'Najważniejsze wiadomości (powitalne, przypomnienia, podziękowania) mogą wysyłać się same według ustalonych zasad',
                        points: [],
                        icon: 'time'
                    },
                    {
                        title: 'Wyższe zaangażowanie',
                        description: 'Klient dostaje to, co jest dla niego sensowne (np. informacje przed przyjazdem, nie ogólny newsletter „dla wszystkich")',
                        points: [],
                        icon: 'relations'
                    },
                    {
                        title: 'Lepsze wyniki sprzedaży',
                        description: 'Przypomnienia, oferty dopasowane do terminu i kontekstu łatwiej zamieniają się na rezerwacje, wizyty, zapytania',
                        points: [],
                        icon: 'sales'
                    },
                    {
                        title: 'Bardziej profesjonalny wizerunek',
                        description: 'Komunikacja wygląda jak dobrze zaplanowany proces, a nie pojedyncze „strzały"',
                        points: [],
                        icon: 'visibility'
                    }
                ],
                practicalExamples: [
                    {
                        title: 'Jak może wyglądać personalizacja w praktyce',
                        description: `Przykład – mały hotel / pensjonat:

Zamiast ogólnego maila:

„Dzień dobry, zapraszamy do rezerwacji noclegu u nas."

bardziej spersonalizowana wiadomość do osoby, która już była gościem:

„Dzień dobry Pani Anno,

widzimy, że ostatni raz była Pani u nas zimą zeszłego roku.

Na nadchodzący sezon przygotowaliśmy pakiet Weekend dla dwojga z późnym wymeldowaniem i śniadaniem w cenie.

Jeśli chciałaby Pani sprawdzić dostępne terminy w listopadzie lub grudniu – proszę kliknąć w przycisk poniżej lub odpowiedzieć na tego maila."

Elementy personalizacji:

• imię („Pani Anno"),

• nawiązanie do historii („ostatni raz była Pani zimą"),

• dopasowana propozycja (weekendowy pakiet, a nie przypadkowa oferta),

• jasne CTA („kliknij" / „odpowiedz na maila").`,
                        effect: 'Personalizacja zwiększa zaangażowanie i szansę na konwersję, ponieważ wiadomość jest dopasowana do konkretnego odbiorcy i jego historii z firmą.'
                    }
                ],
                automationScenariosIntro: 'Nie trzeba od razu budować skomplikowanych lejków. W małej firmie już kilka prostych, dobrze ustawionych automatyzacji może zrobić dużą różnicę.',
                automationScenarios: [
                    {
                        id: 'auto-1',
                        title: 'Seria powitalna dla nowych kontaktów',
                        description: 'Każda osoba, która zapisała się na newsletter lub zostawiła maila w formularzu.',
                        icon: 'mail',
                        timeline: 'Dzień 0, 3-5, 7-10',
                        points: [
                            'Dzień 0 – mail powitalny: podziękowanie za zapis, krótka prezentacja obiektu/usługi',
                            'Dzień 3–5 – mail z konkretną wartością: np. „Jak najlepiej zaplanować weekend w [regionie] – 3 sprawdzone pomysły"',
                            'Dzień 7–10 – mail z pierwszą, delikatną propozycją: np. informacja o pakiecie z konkretnymi terminami'
                        ]
                    },
                    {
                        id: 'auto-2',
                        title: 'Mail przed przyjazdem / wizytą',
                        description: 'Wysyłany automatycznie np. 3–5 dni przed przyjazdem.',
                        icon: 'remind',
                        timeline: '3-5 dni przed',
                        points: [
                            'Przypomnienie terminu',
                            'Praktyczne informacje (parking, godziny zameldowania, dojazd)',
                            'Możliwość dopisania usług dodatkowych (np. śniadanie, późne wymeldowanie, dodatkowe łóżko)'
                        ]
                    },
                    {
                        id: 'auto-3',
                        title: 'Mail po pobycie / wykonaniu usługi',
                        description: 'Wysyłany 1–3 dni po zakończeniu pobytu/usługi.',
                        icon: 'relations',
                        timeline: '1-3 dni po',
                        points: [
                            'Podziękowanie',
                            'Prośba o opinię (np. link do Google / Booking)',
                            'Opcjonalnie: kod rabatowy na kolejny pobyt w mniej obłożonych terminach'
                        ]
                    },
                    {
                        id: 'auto-4',
                        title: 'Reaktywacja nieaktywnych klientów',
                        description: 'Do osób, które od dłuższego czasu nie otwierają maili / nie rezerwują.',
                        icon: 'traffic',
                        timeline: 'Po okresie nieaktywności',
                        points: [
                            'Przypomnienie o marce',
                            'Zaproszenie z konkretną korzyścią (np. tańszy pobyt w tygodniu)',
                            'Wyraźny CTA: „Jeśli nie chcesz otrzymywać takich wiadomości, możesz jednym kliknięciem się wypisać"'
                        ]
                    }
                ],
                quiz: [
                    {
                        id: 'q1',
                        type: 'choice',
                        question: 'Na czym polega automatyzacja w email marketingu?',
                        options: [
                            'Na wysyłaniu jak największej liczby maili ręcznie',
                            'Na ustawieniu reguł, które wywołują wysyłkę odpowiednich wiadomości w określonym momencie (np. po zapisie, przed przyjazdem)',
                            'Na kupowaniu gotowych list mailingowych',
                            'Na wysyłaniu tej samej wiadomości do wszystkich kontaktów'
                        ],
                        correctAnswer: 1,
                        feedback: 'Dokładnie tak – automatyzacja polega na ustawieniu reguł, które automatycznie wywołują wysyłkę odpowiednich wiadomości w określonych momentach, bez konieczności ręcznego działania.'
                    },
                    {
                        id: 'q2',
                        type: 'choice',
                        question: 'Który przykład najlepiej pokazuje sensowną personalizację maila?',
                        options: [
                            '„Dzień dobry, zapraszamy wszystkich do skorzystania z naszej oferty."',
                            '„Witaj! Mamy promocję, szczegóły w załączniku."',
                            '„Dzień dobry Panie Marku, dziękujemy za Pana ostatni pobyt. Na najbliższe tygodnie przygotowaliśmy ofertę z rabatem dla stałych Gości. Jeśli chciałby Pan sprawdzić dostępność pokoi w listopadzie, proszę kliknąć w ten link."',
                            '„Szanowni Państwo, oferta ważna do odwołania."'
                        ],
                        correctAnswer: 2,
                        feedback: 'Dokładnie tak – najlepszy przykład zawiera personalizację (imię), nawiązanie do historii (ostatni pobyt), dopasowaną ofertę (rabat dla stałych Gości) i jasne wezwanie do działania (link).'
                    },
                    {
                        id: 'q3',
                        type: 'choice',
                        question: 'Jaka jest jedna z głównych korzyści automatyzacji kampanii emailowych w małej firmie?',
                        options: [
                            'Możliwość wysyłania maili bez zgody odbiorców',
                            'Brak potrzeby planowania treści',
                            'Oszczędność czasu przy zachowaniu regularnego kontaktu z klientami',
                            'Zastąpienie wszystkich innych kanałów marketingowych'
                        ],
                        correctAnswer: 2,
                        feedback: 'Dokładnie tak – automatyzacja pozwala oszczędzić czas przy jednoczesnym zachowaniu regularnego, zaplanowanego kontaktu z klientami, co jest szczególnie wartościowe dla małych firm z ograniczonymi zasobami.'
                    },
                    {
                        id: 'q4',
                        type: 'open',
                        question: 'Podaj jeden przykład wiadomości, którą w Twojej firmie można byłoby zautomatyzować (np. „mail przed przyjazdem z informacjami praktycznymi").',
                        keywords: [
                            'automatyzacja',
                            'mail',
                            'wiadomość',
                            'przed',
                            'po',
                            'powitalny',
                            'przypomnienie',
                            'podziękowanie',
                            'reaktywacja',
                            'przyjazd',
                            'wizyta',
                            'pobyt',
                            'usługa',
                            'rezerwacja',
                            'termin',
                            'informacje',
                            'praktyczne',
                            'parking',
                            'dojazd',
                            'zameldowanie',
                            'opinia',
                            'rabat',
                            'kod'
                        ],
                        hint: 'Pomyśl o sytuacjach w Twojej firmie, które powtarzają się regularnie i wymagają wysłania podobnej wiadomości – np. przed przyjazdem, po pobycie, przy zapisie na newsletter...',
                        feedback: 'Dziękuję za odpowiedź. Automatyzacja powtarzalnych wiadomości to świetny sposób na oszczędność czasu przy jednoczesnym utrzymaniu profesjonalnej komunikacji z klientami.'
                    }
                ]
            }
        ]
    },
    {
        id: '6',
        title: 'Analiza i optymalizacja',
        icon: 'analytics',
        lessons: [
            {
                id: '6.1',
                moduleId: '6',
                title: 'Narzędzia analityczne i ich zastosowanie',
                intro: `Narzędzia analityczne (takie jak Google Analytics, statystyki Meta, systemy raportowe z silnika rezerwacyjnego, narzędzia do email marketingu) pokazują, co naprawdę dzieje się z Twoim marketingiem:

kto wchodzi na stronę, skąd, co ogląda, w co klika, kiedy znika, a kiedy rezerwuje / dzwoni / pisze.

Bez tych danych decyzje podejmuje się „na wyczucie". Z danymi – możesz świadomie wzmacniać to, co działa, i odcinać to, co tylko generuje koszty.`,
                whyImportant: [
                    {
                        title: 'Widzenie źródeł zapytań i rezerwacji',
                        description: 'Z jakich źródeł faktycznie przychodzą zapytania i rezerwacje (Google, social media, polecenia, reklamy)',
                        points: [],
                        icon: 'analytics'
                    },
                    {
                        title: 'Ocena kampanii',
                        description: 'Które kampanie mają sens, a które tylko „zjadają budżet"',
                        points: [],
                        icon: 'target'
                    },
                    {
                        title: 'Analiza zachowań klientów',
                        description: 'Jak zachowują się klienci na stronie – które podstrony działają, a które trzeba poprawić',
                        points: [],
                        icon: 'data'
                    },
                    {
                        title: 'Lepsze planowanie budżetów',
                        description: 'Planowanie budżetów i sezonowość (np. jakie działania wzmacniać przed wysokim sezonem, a jakie wypełniają dołki obłożenia)',
                        points: [],
                        icon: 'organize'
                    },
                    {
                        title: 'Szybsze wychwytywanie problemów',
                        description: 'Np. nagły spadek ruchu, niedziałający formularz, kampanię z bardzo wysokim kosztem kliknięcia',
                        points: [],
                        icon: 'info'
                    }
                ],
                practicalExamples: [
                    {
                        title: 'Przykład 1 – Ruch na stronie www i strona ofertowa',
                        description: `Mały hotel w mieście turystycznym sprawdza w Google Analytics:

• ile osób miesięcznie odwiedza stronę,

• które podstrony są najczęściej oglądane (np. „Pokoje", „Cennik", „Kontakt"),

• jaki jest współczynnik wyjść ze strony ofertowej (czy ludzie po wejściu od razu zamykają kartę, czy idą dalej).`,
                        effect: 'Jeśli wiele osób wchodzi na stronę „Oferta / Pokoje", a mało przechodzi do „Rezerwacja / Kontakt", to sygnał, że treść oferty, zdjęcia lub przyciski „zadzwoń / zarezerwuj" wymagają poprawy.'
                    },
                    {
                        title: 'Przykład 2 – Skuteczność reklam w social media',
                        description: `Pensjonat uruchamia kampanię Meta Ads promującą pakiet weekendowy. Po tygodniu sprawdza w panelu reklamy:

• CTR (jaki procent osób po zobaczeniu reklamy klika),

• koszt kliknięcia (CPC),

• ile osób przeszło dalej do formularza kontaktowego,

• ile realnych zapytań / rezerwacji przyszło w tym okresie.`,
                        effect: 'Jeśli CTR jest wysoki, ale mało osób pyta o ofertę, to problem może być w stronie docelowej (treść, zdjęcia, brak jasnego telefonu / formularza).'
                    },
                    {
                        title: 'Przykład 3 – Email marketing i powroty Gości',
                        description: `Obiekt noclegowy wysyła kampanię emailową do swoich byłych gości z propozycją pobytu poza wysokim sezonem. Narzędzie do emaili pokazuje:

• ile osób otworzyło wiadomość (open rate),

• ile kliknęło w link („zobacz terminy", „napisz do nas"),

• ile finalnie zarezerwowało pobyt.`,
                        effect: 'Na tej podstawie można ocenić, czy temat wiadomości zachęca do otwarcia, czy oferta jest wystarczająco konkretna i czy warto powtórzyć podobną akcję w przyszłości.'
                    }
                ],
                quiz: [
                    {
                        id: 'q1',
                        type: 'choice',
                        question: 'Które narzędzie jest najczęściej używane do analizy ruchu na stronie internetowej?',
                        options: [
                            'Program do faktur',
                            'Google Analytics',
                            'Edytor zdjęć',
                            'Messenger'
                        ],
                        correctAnswer: 1,
                        feedback: 'Dokładnie tak – Google Analytics to najpopularniejsze i najczęściej używane narzędzie do analizy ruchu na stronie internetowej.'
                    },
                    {
                        id: 'q2',
                        type: 'choice',
                        question: 'Co mierzy współczynnik konwersji strony docelowej (np. strony z ofertą)?',
                        options: [
                            'Średni czas ładowania strony',
                            'Odsetek osób, które weszły na stronę i od razu ją zamknęły',
                            'Odsetek odwiedzających, którzy wykonali pożądane działanie (np. wysłali formularz, kliknęli „Zadzwoń", dokonali rezerwacji)',
                            'Liczbę polubień profilu w social media'
                        ],
                        correctAnswer: 2,
                        feedback: 'Dokładnie tak – współczynnik konwersji mierzy odsetek odwiedzających, którzy wykonali pożądane działanie, takie jak wysłanie formularza, kliknięcie w przycisk „Zadzwoń" lub dokonanie rezerwacji.'
                    },
                    {
                        id: 'q3',
                        type: 'choice',
                        question: 'Co powinno być pierwszym krokiem przed analizą danych z narzędzi analitycznych?',
                        options: [
                            'Zwiększenie budżetu reklamowego',
                            'Zmiana wszystkich tekstów na stronie',
                            'Jasne określenie celu (np. więcej rezerwacji bezpośrednich, więcej zapytań z formularza)',
                            'Instalacja jednocześnie kilku różnych systemów analitycznych'
                        ],
                        correctAnswer: 2,
                        feedback: 'Dokładnie tak – przed analizą danych należy jasno określić cel, co pozwala na właściwą interpretację wskaźników i podejmowanie trafnych decyzji.'
                    },
                    {
                        id: 'q4',
                        type: 'choice',
                        question: 'Który z poniższych wskaźników jest najmniej przydatny sam w sobie, jeśli nie jest powiązany z celem biznesowym?',
                        options: [
                            'Liczba rezerwacji z formularza na stronie',
                            'Liczba polubień postu na Facebooku',
                            'Współczynnik konwersji strony „Oferta"',
                            'Liczba wysłanych zapytań w miesiącu'
                        ],
                        correctAnswer: 1,
                        feedback: 'Dokładnie tak – liczba polubień postu na Facebooku sama w sobie nie przekłada się bezpośrednio na cele biznesowe, takie jak rezerwacje czy zapytania, jeśli nie jest powiązana z konkretnymi działaniami.'
                    },
                    {
                        id: 'q5',
                        type: 'choice',
                        question: 'Co w praktyce oznacza wysoki CTR reklamy (dużo kliknięć) i jednocześnie wysoki koszt pozyskania rezerwacji?',
                        options: [
                            'Reklama słabo przyciąga uwagę, ale strona świetnie zamienia odwiedzających w klientów',
                            'Reklama przyciąga uwagę, ale oferta / strona docelowa nie przekonuje do rezerwacji',
                            'Wszystko działa idealnie i nie trzeba nic zmieniać',
                            'Należy natychmiast wyłączyć wszystkie kampanie'
                        ],
                        correctAnswer: 1,
                        feedback: 'Dokładnie tak – wysoki CTR oznacza, że reklama przyciąga uwagę, ale wysoki koszt pozyskania rezerwacji sugeruje, że oferta lub strona docelowa nie przekonuje odwiedzających do rezerwacji.'
                    },
                    {
                        id: 'q6',
                        type: 'choice',
                        question: 'Jak często mała firma powinna minimum przeglądać podstawowe raporty z działań marketingowych (ruch na stronie, kampanie, maile), aby sensownie reagować?',
                        options: [
                            'Raz na rok',
                            'Raz na pół roku',
                            'Przynajmniej raz w tygodniu (lub częściej w okresach intensywnych kampanii)',
                            'W ogóle nie trzeba, jeśli są włączone reklamy'
                        ],
                        correctAnswer: 2,
                        feedback: 'Dokładnie tak – regularne przeglądanie raportów (przynajmniej raz w tygodniu, a częściej w okresach intensywnych kampanii) pozwala na szybkie reagowanie i optymalizację działań marketingowych.'
                    }
                ]
            },
            {
                id: '6.2',
                moduleId: '6',
                title: 'Optymalizacja działań marketingowych i podejmowanie decyzji na podstawie danych',
                intro: `Optymalizacja działań marketingowych to nie jednorazowe „ustawienie kampanii", ale ciągły proces:

1. Zbierasz dane.

2. Sprawdzasz, co działa, a co nie.

3. Wprowadzasz zmiany.

4. Znowu mierzysz.

Z czasem zaczynasz widzieć proste schematy: co obniża koszt pozyskania klienta, co podnosi liczbę zapytań, a co jest tylko „szumem".`,
                whyImportant: [
                    {
                        title: 'Przestajesz zgadywać',
                        description: 'Dlaczego „coś nie działa"',
                        points: [],
                        icon: 'analytics'
                    },
                    {
                        title: 'Szybciej odkrywasz problemy',
                        description: 'Gdzie faktycznie „ucieka" klient (reklama, strona, formularz, komunikacja)',
                        points: [],
                        icon: 'info'
                    },
                    {
                        title: 'Inwestujesz tam, gdzie działa',
                        description: 'Budżet tam, gdzie realnie pojawiają się zapytania i rezerwacje',
                        points: [],
                        icon: 'target'
                    },
                    {
                        title: 'Traktujesz kampanie jak testy',
                        description: 'Z konkretnym wnioskiem na przyszłość, a nie losową próbą',
                        points: [],
                        icon: 'data'
                    }
                ],
                whyImportantFooter: `Najważniejsza zasada: patrzymy na dane, nie tylko na „intuicję".

Intuicja jest potrzebna do wymyślania rozwiązań, ale decyzję – zmieniamy / zostawiamy / wzmacniamy – warto podeprzeć liczbami.`,
                problemAnalyses: [
                    {
                        id: 'problem-1',
                        title: 'Przykład 1: Mało kliknięć w reklamę',
                        icon: 'traffic',
                        data: [
                            'Dużo wyświetleń reklamy',
                            'CTR (procent osób, które kliknęły) jest niski – np. 0,8%'
                        ],
                        interpretation: [
                            'Reklama jest słabo zauważalna (grafika nie przyciąga uwagi)',
                            'Tekst jest zbyt ogólny („Zapraszamy do naszego hotelu"), nic konkretnego nie obiecuje',
                            'Oferta nie jest dopasowana do grupy docelowej (np. reklama dla rodzin, a targetowanie ustawione na wszystkich 18–65)'
                        ],
                        solutions: [
                            'Zmiana grafiki na bardziej czytelną, z jednym prostym komunikatem (np. „Weekend SPA – pakiet 2 noce + śniadania")',
                            'Dodanie konkretu i korzyści w nagłówku (lokalizacja, cena od…, śniadanie w cenie)',
                            'Zawężenie grupy docelowej (np. osoby 28–55, w promieniu X km od miasta, zainteresowane podróżami / rodzinnym wypoczynkiem)'
                        ]
                    },
                    {
                        id: 'problem-2',
                        title: 'Przykład 2: Dużo kliknięć, mało zapytań',
                        icon: 'sales',
                        data: [
                            'CTR jest dobry – np. 3–4%',
                            'Na stronę wchodzi sporo osób, ale mało kto wysyła zapytanie / dzwoni'
                        ],
                        interpretation: [
                            'Reklama obiecuje więcej niż strona – klient „czegoś szuka", ale tego nie widzi',
                            'Na stronie brakuje jasnego wezwania do działania (numer telefonu, przycisk „Wyślij zapytanie")',
                            'Teksty są zbyt ogólne, brakuje odpowiedzi na proste pytania: „Za ile?", „Gdzie dokładnie?", „Co jest w cenie?"'
                        ],
                        solutions: [
                            'Dodanie dużego, widocznego przycisku „Zadzwoń teraz" / „Zapytaj o termin"',
                            'Pokazanie konkretów w pierwszym ekranie (np. „Nocleg ze śniadaniem od 260 zł / doba, parking i Wi-Fi w cenie")',
                            'Dodanie krótkiej sekcji FAQ z odpowiedziami na 3–4 najczęstsze pytania'
                        ]
                    },
                    {
                        id: 'problem-3',
                        title: 'Przykład 3: Ruch ze smartfonów, ale wysoki współczynnik odrzuceń',
                        icon: 'experience',
                        data: [
                            '70–80% wejść jest z telefonów',
                            'Duży współczynnik odrzuceń (wiele osób wchodzi i od razu wychodzi)',
                            'Średni czas na stronie – tylko kilka sekund'
                        ],
                        interpretation: [
                            'Strona jest niewygodna na telefonie (trzeba powiększać, przewijać w bok)',
                            'Numer telefonu nie jest klikalny',
                            'Formularz jest zbyt długi na małym ekranie'
                        ],
                        solutions: [
                            'Sprawdzenie strony na swoim telefonie tak, jak robi to klient (bez trybu „dewelopera")',
                            'Ułatwienie kontaktu: klikany numer, przycisk „Zadzwoń" widoczny od razu',
                            'Skrócenie formularza – na start wystarczy imię, email / telefon, planowany termin, liczba osób'
                        ]
                    },
                    {
                        id: 'problem-4',
                        title: 'Przykład 4: Działania w social media i „martwe" posty',
                        icon: 'social',
                        data: [
                            'Część postów ma prawie zerowy zasięg',
                            'Inne – wyraźnie większy zasięg i więcej reakcji'
                        ],
                        interpretation: [
                            'Algorytm lepiej promuje posty z konkretną wartością (porady, realne zdjęcia, kulisy pracy) niż same grafiki z tekstem „Rezerwuj"',
                            'Godzina publikacji ma znaczenie – inne wyniki w dzień, inne wieczorem'
                        ],
                        solutions: [
                            'Opieranie się na 2–3 typach postów, które historycznie osiągają lepsze wyniki (np. realne zdjęcia obiektu + krótkie historie gości)',
                            'Publikowanie w różnych godzinach, a potem sprawdzenie, kiedy zasięgi są najwyższe',
                            'Dodawanie konkretnego wezwania do działania: „Napisz w wiadomości «WEEKEND», wyślę dostępne terminy"'
                        ]
                    }
                ],
                decisionSteps: [
                    {
                        id: 'step-1',
                        step: 1,
                        title: 'Ustal cel',
                        description: 'Np. więcej zapytań z formularza, więcej telefonów, więcej rezerwacji z kampanii',
                        icon: 'target'
                    },
                    {
                        id: 'step-2',
                        step: 2,
                        title: 'Wybierz wskaźnik',
                        description: 'Który najlepiej ten cel opisuje (np. liczba wysłanych formularzy, CTR, współczynnik konwersji strony)',
                        icon: 'analytics'
                    },
                    {
                        id: 'step-3',
                        step: 3,
                        title: 'Porównaj dane',
                        description: 'Jak jest teraz? Jak było miesiąc temu? Jak wygląda to dla różnych kampanii / grup docelowych?',
                        icon: 'data'
                    },
                    {
                        id: 'step-4',
                        step: 4,
                        title: 'Postaw hipotezę',
                        description: '„CTR jest niski, bo grafika nie przyciąga uwagi" lub „Ludzie klikają, ale nie wysyłają formularza, bo nie widzą ceny"',
                        icon: 'info'
                    },
                    {
                        id: 'step-5',
                        step: 5,
                        title: 'Wprowadź jedną zmianę',
                        description: 'Na raz – wtedy wiesz, co zadziałało',
                        icon: 'organize'
                    },
                    {
                        id: 'step-6',
                        step: 6,
                        title: 'Zmierz ponownie i zdecyduj',
                        description: 'Po kilku dniach / tygodniu: wzmacniam (działa), poprawiam (wymaga kolejnej zmiany), wyłączam (nie ma sensu nadal wydawać budżetu)',
                        icon: 'analytics'
                    }
                ],
                quiz: [
                    {
                        id: 'q1',
                        type: 'choice',
                        question: 'Które podejście do optymalizacji działań marketingowych jest najbardziej sensowne dla małej firmy?',
                        options: [
                            'Zmieniam wszystko naraz, żeby „coś w końcu zadziałało"',
                            'Kieruję się głównie przeczuciem – danych nie ma sensu analizować',
                            'Ustalam cel, wybieram 1–2 kluczowe wskaźniki, wprowadzam pojedynczą zmianę i sprawdzam dane po kilku dniach',
                            'Uruchamiam kampanię i zostawiam ją bez zmian przez rok'
                        ],
                        correctAnswer: 2,
                        feedback: 'Dokładnie tak – systematyczne podejście z ustaleniem celu, wyborem kluczowych wskaźników i wprowadzaniem pojedynczych zmian pozwala na skuteczną optymalizację działań marketingowych.'
                    },
                    {
                        id: 'q2',
                        type: 'open',
                        question: 'Reklama Twojego obiektu wyświetliła się 2 000 razy, a użytkownicy kliknęli ją 60 razy. Jaki jest CTR (Click-Through Rate – współczynnik kliknięć) tej reklamy?',
                        isCalculation: true,
                        correctNumericAnswer: 3.0,
                        formula: 'CTR = (liczba kliknięć / liczba wyświetleń) × 100%',
                        calculationData: [
                            {
                                label: 'Liczba wyświetleń',
                                value: 2000
                            },
                            {
                                label: 'Liczba kliknięć',
                                value: 60
                            }
                        ],
                        hint: 'CTR = (60 / 2000) × 100% = ?',
                        feedback: 'Dokładnie tak – CTR = (60 / 2000) × 100% = 3,0%. To dobry wynik, który pokazuje, że reklama przyciąga uwagę odbiorców.'
                    },
                    {
                        id: 'q3',
                        type: 'choice',
                        question: 'Masz dwie kampanie na Facebooku, obie kierują na tę samą stronę. Budżet jest ograniczony. Co jest najbardziej rozsądnym krokiem?',
                        campaignData: [
                            {
                                name: 'Kampania A',
                                ctr: '1,0%',
                                costPerClick: '1,50 zł',
                                inquiries: '2 zapytania w tygodniu'
                            },
                            {
                                name: 'Kampania B',
                                ctr: '3,5%',
                                costPerClick: '0,90 zł',
                                inquiries: '7 zapytań w tygodniu'
                            }
                        ],
                        options: [
                            'Wyłączyć Kampanię B i zostawić tylko Kampanię A',
                            'Zostawić obie kampanie bez zmian',
                            'Przenieść większą część budżetu z Kampanii A do Kampanii B i dalej ją obserwować',
                            'Wyłączyć obie kampanie i wrócić tylko do postów organicznych'
                        ],
                        correctAnswer: 2,
                        feedback: 'Dokładnie tak – Kampania B ma lepsze wyniki (wyższy CTR, niższy koszt kliknięcia, więcej zapytań), więc przeniesienie budżetu z Kampanii A do Kampanii B jest najbardziej rozsądnym krokiem.'
                    },
                    {
                        id: 'q4',
                        type: 'choice',
                        question: 'Dlaczego przy optymalizacji strony / reklamy warto zmieniać jeden ważny element na raz (np. najpierw nagłówek, potem grafikę, potem grupę docelową)?',
                        options: [
                            'Żeby mieć więcej pracy',
                            'Dzięki temu możesz lepiej zrozumieć, która konkretna zmiana poprawiła wyniki',
                            'Bo narzędzia reklamowe nie pozwalają zmienić kilku elementów',
                            'Żeby dane w raportach wyglądały bardziej skomplikowanie'
                        ],
                        correctAnswer: 1,
                        feedback: 'Dokładnie tak – wprowadzanie jednej zmiany na raz pozwala na precyzyjne określenie, która konkretna zmiana wpłynęła na poprawę wyników, co ułatwia dalszą optymalizację.'
                    }
                ]
            },
            {
                id: '6.3',
                moduleId: '6',
                title: 'Praktyczne ćwiczenia i warsztaty',
                intro: `Ta część szkolenia ma przenieść wszystko z poziomu „rozumiem w teorii" na poziom „potrafię zastosować u siebie w firmie".

Pracujemy na realnych przykładach – najlepiej z Twojej działalności – i krok po kroku:

• porządkujemy to, co robisz w marketingu,

• wyciągamy wnioski z danych,

• projektujemy konkretne działania na najbliższe tygodnie.`,
                whyImportant: [
                    {
                        title: 'Prawdziwe zrozumienie',
                        description: 'Dopiero przy pracy na własnych przykładach pojawia się prawdziwe zrozumienie („aha, u mnie to działa tak…")',
                        points: [],
                        icon: 'understand'
                    },
                    {
                        title: 'Podejmowanie decyzji',
                        description: 'Konkretne ćwiczenia zmuszają do podjęcia pierwszych decyzji (co poprawić, co wyłączyć, w co zainwestować)',
                        points: [],
                        icon: 'target'
                    },
                    {
                        title: 'Plan działania',
                        description: 'Po warsztacie masz nie tylko „wiedzę z kursu", ale zarys planu działania dopasowanego do Twojej sytuacji',
                        points: [],
                        icon: 'goal'
                    }
                ],
                whyImportantFooter: 'Teoria bez praktyki ma ograniczoną wartość. Dopiero gdy przełożysz pojęcia na własne kanały, własnych klientów i własne liczby, podejmiesz pierwsze decyzje na bazie danych i zapiszesz konkretny plan na 30 dni, zaczyna się realna zmiana w biznesie. Ta część ma Ci w tym pomóc – w prostych, wykonalnych krokach.',
                quiz: [
                    {
                        id: 'exercise1',
                        type: 'multi-task',
                        question: 'Ćwiczenie 1: Mapa działań marketingowych „tu i teraz"',
                        subTasks: [
                            {
                                id: 'ex1-1',
                                title: '1. Lista kanałów',
                                description: 'Wypisz wszystkie kanały, z których REALNIE korzystasz (nawet jeśli nieregularnie)',
                                fieldType: 'text-multiple',
                                fieldOptions: {
                                    multipleFields: [
                                        {
                                            label: 'Kanał 1',
                                            placeholder: 'np. strona internetowa'
                                        },
                                        {
                                            label: 'Kanał 2',
                                            placeholder: 'np. Facebook / Instagram'
                                        },
                                        {
                                            label: 'Kanał 3',
                                            placeholder: 'np. Google Maps'
                                        },
                                        {
                                            label: 'Kanał 4',
                                            placeholder: 'np. płatne reklamy'
                                        },
                                        {
                                            label: 'Kanał 5',
                                            placeholder: 'np. działania offline'
                                        }
                                    ]
                                }
                            },
                            {
                                id: 'ex1-2',
                                title: '2. Kanał do rozwoju',
                                description: 'Wybierz 1 kanał, który zamierzasz rozwijać (ma potencjał i sens)',
                                fieldType: 'text',
                                fieldOptions: {
                                    placeholder: 'Wpisz nazwę kanału, który zamierzasz rozwijać...'
                                }
                            },
                            {
                                id: 'ex1-3',
                                title: '3. Kanał do ograniczenia',
                                description: 'Wybierz 1 kanał do ograniczenia / przetestowania inaczej',
                                fieldType: 'text',
                                fieldOptions: {
                                    placeholder: 'Wpisz nazwę kanału, który ograniczysz...'
                                }
                            },
                            {
                                id: 'ex1-4',
                                title: '4. Kanał do odłożenia',
                                description: 'Wybierz 1 kanał, którym przestajesz się przejmować w najbliższych 30 dniach',
                                fieldType: 'text',
                                fieldOptions: {
                                    placeholder: 'Wpisz nazwę kanału, który odkładasz...'
                                }
                            }
                        ]
                    },
                    {
                        id: 'exercise2',
                        type: 'multi-task',
                        question: 'Ćwiczenie 2: Analiza przykładowej kampanii – praca na liczbach',
                        subTasks: [
                            {
                                id: 'ex2-1',
                                title: '1. Wprowadź dane kampanii',
                                description: 'Jeśli masz już jakąkolwiek kampanię (Facebook/Instagram/Google) – wpisz swoje dane. Jeśli nie – możesz użyć przykładowych liczb.',
                                fieldType: 'text-multiple',
                                fieldOptions: {
                                    multipleFields: [
                                        {
                                            label: 'Liczba wyświetleń (Impressions)',
                                            placeholder: 'np. 5000'
                                        },
                                        {
                                            label: 'Liczba kliknięć (Clicks)',
                                            placeholder: 'np. 150'
                                        },
                                        {
                                            label: 'Budżet wydany (PLN)',
                                            placeholder: 'np. 300'
                                        },
                                        {
                                            label: 'Liczba zapytań/rezerwacji (Leads)',
                                            placeholder: 'np. 10'
                                        }
                                    ]
                                }
                            },
                            {
                                id: 'ex2-2',
                                title: '2. Ocena CTR',
                                description: 'Jak oceniasz CTR tej kampanii?',
                                fieldType: 'choice',
                                fieldOptions: {
                                    choices: [
                                        'Bardzo słaby',
                                        'Przeciętny',
                                        'Dobry / bardzo dobry'
                                    ]
                                }
                            },
                            {
                                id: 'ex2-3',
                                title: '3. Ocena kosztu kliknięcia (CPC)',
                                description: 'Jak oceniasz koszt kliknięcia (CPC) w kontekście Twojej branży i lokalizacji?',
                                fieldType: 'choice',
                                fieldOptions: {
                                    choices: [
                                        'Zdecydowanie za wysoki',
                                        'Akceptowalny',
                                        'Bardzo dobry'
                                    ]
                                }
                            },
                            {
                                id: 'ex2-4',
                                title: '4. Największy problem kampanii',
                                description: 'Co jest największym problemem tej kampanii?',
                                fieldType: 'choice',
                                fieldOptions: {
                                    choices: [
                                        'Ludzie nie klikają (słaba kreacja / komunikat)',
                                        'Ludzie klikają, ale nie ma zapytań (strona docelowa / oferta)',
                                        'Trudno powiedzieć – za mało danych'
                                    ]
                                }
                            },
                            {
                                id: 'ex2-5',
                                title: '5. Podsumowanie',
                                description: 'Podsumuj: co działa, a co wymaga poprawy?',
                                fieldType: 'textarea',
                                fieldOptions: {
                                    placeholder: 'Napisz krótkie podsumowanie...'
                                }
                            },
                            {
                                id: 'ex2-6',
                                title: '6. Jedna decyzja optymalizacyjna',
                                description: 'Wybierz jedno działanie, które wdrożysz jako pierwsze:',
                                fieldType: 'choice',
                                fieldOptions: {
                                    choices: [
                                        'Zmiana kreacji (grafika / tekst)',
                                        'Zmiana grupy docelowej',
                                        'Zmiana strony docelowej',
                                        'Zmiana budżetu / harmonogramu',
                                        'Wstrzymanie tej kampanii i test innej'
                                    ]
                                }
                            },
                            {
                                id: 'ex2-7',
                                title: '7. Uzasadnienie decyzji',
                                description: 'Dlaczego właśnie to działanie?',
                                fieldType: 'textarea',
                                fieldOptions: {
                                    placeholder: 'Krótko uzasadnij swoją decyzję...'
                                }
                            }
                        ]
                    },
                    {
                        id: 'exercise3',
                        type: 'multi-task',
                        question: 'Ćwiczenie 3: Szybki audyt strony docelowej',
                        subTasks: [
                            {
                                id: 'ex3-1',
                                title: '1. Adres strony docelowej',
                                description: 'Podaj adres strony, na którą kierujesz ruch z reklam (np. podstrona z ofertą)',
                                fieldType: 'url',
                                fieldOptions: {
                                    placeholder: 'https://...'
                                }
                            },
                            {
                                id: 'ex3-2',
                                title: '2. Checklista pierwszego ekranu',
                                description: 'Zaznacz, czy na pierwszym ekranie (bez przewijania) użytkownik widzi wyraźnie:',
                                fieldType: 'multichoice',
                                fieldOptions: {
                                    choices: [
                                        'Co dokładnie oferujesz',
                                        'Dla kogo jest oferta',
                                        'Jaki jest orientacyjny zakres / cena',
                                        'Co ma zrobić dalej (zadzwonić, wypełnić formularz, sprawdzić dostępność)'
                                    ]
                                }
                            },
                            {
                                id: 'ex3-3',
                                title: '3. Elementy ułatwiające kontakt',
                                description: 'Zaznacz elementy, które są obecne na stronie:',
                                fieldType: 'multichoice',
                                fieldOptions: {
                                    choices: [
                                        'Numer telefonu jest klikalny na telefonie',
                                        'Przycisk "Zadzwoń"/"Napisz" jest widoczny bez przewijania',
                                        'Formularz nie jest przesadnie długi',
                                        'Są podstawowe informacje: lokalizacja, godziny, parking (jeśli istotne)'
                                    ]
                                }
                            },
                            {
                                id: 'ex3-4',
                                title: '4. Zmiana 1',
                                description: 'Zapisz pierwszą konkretną zmianę, którą możesz wdrożyć w ciągu tygodnia',
                                fieldType: 'text',
                                fieldOptions: {
                                    placeholder: 'np. dodanie dużego przycisku "Zadzwoń teraz"'
                                }
                            },
                            {
                                id: 'ex3-5',
                                title: '5. Zmiana 2',
                                description: 'Zapisz drugą konkretną zmianę',
                                fieldType: 'text',
                                fieldOptions: {
                                    placeholder: 'np. skrócenie formularza'
                                }
                            },
                            {
                                id: 'ex3-6',
                                title: '6. Zmiana 3',
                                description: 'Zapisz trzecią konkretną zmianę',
                                fieldType: 'text',
                                fieldOptions: {
                                    placeholder: 'np. dopisanie 3 najczęstszych pytań i odpowiedzi'
                                }
                            },
                            {
                                id: 'ex3-7',
                                title: '7. Planowany termin wdrożenia',
                                description: 'Kiedy planujesz wdrożyć te zmiany? (wybierz konkretną datę)',
                                fieldType: 'date',
                                fieldOptions: {}
                            }
                        ]
                    },
                    {
                        id: 'exercise4',
                        type: 'multi-task',
                        question: 'Ćwiczenie 4: Plan optymalizacji na 30 dni',
                        subTasks: [
                            {
                                id: 'ex4-1',
                                title: '1. Wybór priorytetów',
                                description: 'Wybierz maksymalnie 3 priorytety (zaznacz wszystkie, które dotyczą Twojej sytuacji):',
                                fieldType: 'multichoice',
                                fieldOptions: {
                                    choices: [
                                        'Poprawa wyników jednej konkretnej kampanii',
                                        'Poprawa strony docelowej',
                                        'Uporządkowanie wizytówki Google (opinie, zdjęcia, opis)',
                                        'Poprawa komunikacji w social media (czas odpowiedzi, regularność)',
                                        'Inne (napisz poniżej)'
                                    ]
                                }
                            },
                            {
                                id: 'ex4-1-other',
                                title: 'Priorytet - Inne',
                                description: 'Jeśli wybrałeś "Inne", napisz swój priorytet:',
                                fieldType: 'text',
                                fieldOptions: {
                                    placeholder: 'Opisz swój priorytet...'
                                }
                            },
                            {
                                id: 'ex4-2',
                                title: 'Priorytet 1 - Konkretne działanie',
                                description: 'Co dokładnie zrobisz? (np. "zmieniam nagłówek i grafikę w kampanii X")',
                                fieldType: 'textarea',
                                fieldOptions: {
                                    placeholder: 'Opisz konkretne działanie...'
                                }
                            },
                            {
                                id: 'ex4-3',
                                title: 'Priorytet 1 - Jak zmierzysz?',
                                description: 'Jaki wskaźnik sprawdzisz za 30 dni? (np. CTR, liczba wiadomości, liczba telefonów)',
                                fieldType: 'text',
                                fieldOptions: {
                                    placeholder: 'np. wyższy CTR, więcej wiadomości...'
                                }
                            },
                            {
                                id: 'ex4-4',
                                title: 'Priorytet 1 - Planowany termin realizacji',
                                description: 'Kiedy planujesz wdrożyć to działanie? (wybierz datę)',
                                fieldType: 'date',
                                fieldOptions: {}
                            },
                            {
                                id: 'ex4-5',
                                title: 'Priorytet 2 - Konkretne działanie',
                                description: 'Jeśli masz drugi priorytet - co dokładnie zrobisz?',
                                fieldType: 'textarea',
                                fieldOptions: {
                                    placeholder: 'Opisz konkretne działanie (lub zostaw puste, jeśli masz tylko jeden priorytet)...'
                                }
                            },
                            {
                                id: 'ex4-6',
                                title: 'Priorytet 2 - Jak zmierzysz?',
                                description: 'Jaki wskaźnik sprawdzisz za 30 dni?',
                                fieldType: 'text',
                                fieldOptions: {
                                    placeholder: 'np. więcej zapytań...'
                                }
                            },
                            {
                                id: 'ex4-7',
                                title: 'Priorytet 2 - Planowany termin realizacji',
                                description: 'Kiedy planujesz wdrożyć to działanie? (wybierz datę)',
                                fieldType: 'date',
                                fieldOptions: {}
                            },
                            {
                                id: 'ex4-8',
                                title: 'Priorytet 3 - Konkretne działanie',
                                description: 'Jeśli masz trzeci priorytet - co dokładnie zrobisz?',
                                fieldType: 'textarea',
                                fieldOptions: {
                                    placeholder: 'Opisz konkretne działanie (lub zostaw puste, jeśli masz mniej niż 3 priorytety)...'
                                }
                            },
                            {
                                id: 'ex4-9',
                                title: 'Priorytet 3 - Jak zmierzysz?',
                                description: 'Jaki wskaźnik sprawdzisz za 30 dni?',
                                fieldType: 'text',
                                fieldOptions: {
                                    placeholder: 'np. więcej opinii...'
                                }
                            },
                            {
                                id: 'ex4-10',
                                title: 'Priorytet 3 - Planowany termin realizacji',
                                description: 'Kiedy planujesz wdrożyć to działanie? (wybierz datę)',
                                fieldType: 'date',
                                fieldOptions: {}
                            },
                            {
                                id: 'ex4-11',
                                title: 'Mały "commitment"',
                                description: 'Jednym zdaniem: Co jest dla Ciebie najważniejszym celem na najbliższe 30 dni w marketingu?',
                                fieldType: 'textarea',
                                fieldOptions: {
                                    placeholder: 'Napisz swój główny cel jednym zdaniem...'
                                }
                            }
                        ]
                    },
                    {
                        id: 'summary-q1',
                        type: 'open',
                        question: 'Jakie dwa konkretne działania optymalizacyjne wdrożysz w swojej firmie w ciągu najbliższych 30 dni? Napisz, co zrobisz i w jakim kanale (np. reklama, strona, social media).',
                        keywords: [
                            'działania',
                            'optymalizacja',
                            'plan',
                            'wdrożenie',
                            '30 dni',
                            'kanał',
                            'reklama',
                            'strona',
                            'social media'
                        ],
                        hint: 'Pomyśl o ćwiczeniach, które wykonałeś/aś – które z nich możesz zastosować w swojej firmie? Co konkretnie zrobisz i gdzie?',
                        feedback: 'Dobrze! Masz już konkretny plan działań. Pamiętaj, że najważniejsze to zacząć od małych, konkretnych kroków.'
                    },
                    {
                        id: 'summary-q2',
                        type: 'open',
                        question: 'Po czym poznasz, że te działania miały sens? Jakie liczby lub sygnały będą dla Ciebie dowodem, że idziesz w dobrą stronę?',
                        keywords: [
                            'pomiar',
                            'wskaźniki',
                            'efekty',
                            'liczby',
                            'sygnały',
                            'dowód',
                            'wyniki',
                            'metryki'
                        ],
                        hint: 'Pomyśl o konkretnych wskaźnikach, które możesz zmierzyć – np. liczba zapytań, CTR, koszt pozyskania klienta, liczba telefonów.',
                        feedback: 'Świetnie! Mierzenie efektów jest kluczowe. Wróć do tego planu za miesiąc i sprawdź, co udało Ci się zrealizować i jakie są efekty.'
                    }
                ]
            }
        ]
    }
];
const findLesson = (lessonId)=>{
    for (const module of trainingModules){
        const lesson = module.lessons.find((l)=>l.id === lessonId);
        if (lesson) return lesson;
    }
    return undefined;
};
const findModule = (moduleId)=>{
    return trainingModules.find((m)=>m.id === moduleId);
};
const getTotalLessons = ()=>{
    return trainingModules.reduce((total, module)=>total + module.lessons.length, 0);
};
const getNextLesson = (currentLessonId)=>{
    const allLessons = [];
    trainingModules.forEach((module)=>{
        allLessons.push(...module.lessons);
    });
    const currentIndex = allLessons.findIndex((l)=>l.id === currentLessonId);
    if (currentIndex === -1 || currentIndex === allLessons.length - 1) {
        return null;
    }
    return allLessons[currentIndex + 1];
};
const getPreviousLesson = (currentLessonId)=>{
    const allLessons = [];
    trainingModules.forEach((module)=>{
        allLessons.push(...module.lessons);
    });
    const currentIndex = allLessons.findIndex((l)=>l.id === currentLessonId);
    if (currentIndex <= 0) {
        return null;
    }
    return allLessons[currentIndex - 1];
};
}),
"[project]/strony_www/drozniak-landingpage/config/trainingModulesSocialBoost.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Konfiguracja modułów i lekcji szkolenia
// Treści są placeholderami - będą dopracowane później
__turbopack_context__.s([
    "findLesson",
    ()=>findLesson,
    "findModule",
    ()=>findModule,
    "getNextLesson",
    ()=>getNextLesson,
    "getPreviousLesson",
    ()=>getPreviousLesson,
    "getTotalLessons",
    ()=>getTotalLessons,
    "trainingModulesSocialBoost",
    ()=>trainingModulesSocialBoost
]);
const trainingModulesSocialBoost = [
    {
        id: '1',
        title: 'Wprowadzenie do marketingu online i Strategia marketingowa',
        icon: 'chart',
        lessons: [
            {
                id: '1.1',
                moduleId: '1',
                title: 'Wprowadzenie do marketingu cyfrowego',
                intro: `Marketing cyfrowy to wszystkie działania, które pomagają Twojej firmie zostać zauważoną, zbudować zaufanie i sprzedawać ofertę z pomocą internetu.

Dla większości klientów pierwszy kontakt z firmą wygląda dziś tak:
• wpisują coś w Google,
• widzą stronę internetową, opinie, social media,
• dopiero później dzwonią, piszą lub składają zamówienie.

Jeśli nie ma Cię w tych miejscach – w praktyce nie istniejesz w świadomości dużej części rynku.`,
                whyImportant: `Marketing cyfrowy jest kluczowy, ponieważ:
• Klienci szukają w internecie – cateringu na imprezy, jedzenia z dowozem, oferty lokalu, usług lokalnych.
• Porównują oferty – cena to tylko jeden element, równie ważne są opinie, zdjęcia, „wrażenie" online.
• Decyzję często podejmują jeszcze przed kontaktem z Tobą – na podstawie tego, co widzą w sieci.

Dobre podstawy marketingu online pozwalają:
• przyciągać więcej zapytań i zamówień bez zwiększania liczby godzin na telefonie,
• lepiej wykorzystywać sezonowe skoki popytu (i łagodzić „dziury" poza sezonem),
• bardziej świadomie decydować, w co warto inwestować, a co jest stratą czasu i pieniędzy.`,
                customerPath: `Jak wygląda ścieżka klienta w internecie (prosty schemat):

1. Zauważenie – Google / social media (reklama, post, wynik w wyszukiwarce).
2. Opinie – sprawdza oceny i komentarze.
3. Menu / oferta – przegląda propozycje i zdjęcia.
4. Kontakt – dzwoni lub pisze z pytaniem o termin i szczegóły.
5. Zamówienie – składa zamówienie.
6. Realizacja / dostawa – otrzymuje usługę.
7. Opinia / powrót – zostawia opinię, wraca przy kolejnej okazji albo poleca znajomym.

Marketing online nie jest tylko „robieniem postów" – to świadome projektowanie tej ścieżki tak, żeby jak najwięcej osób dochodziło do kroku 5 i 7.`,
                keyElements: [
                    {
                        title: 'Strona internetowa (WWW)',
                        description: 'Twoja „siedziba" w internecie. To tutaj klient powinien:',
                        points: [
                            'zrozumieć, co oferujesz',
                            'zobaczyć zdjęcia i konkretne korzyści',
                            'łatwo znaleźć kontakt, cennik, sposób zamówienia'
                        ],
                        icon: 'website'
                    },
                    {
                        title: 'Media społecznościowe (Facebook, Instagram)',
                        description: 'Miejsce do:',
                        points: [
                            'pokazywania „życia" firmy (aktualne zdjęcia, promocje, kulisy)',
                            'budowania zaufania (komentarze, reakcje, relacje)',
                            'prowadzenia płatnych kampanii do konkretnych odbiorców'
                        ],
                        icon: 'social'
                    },
                    {
                        title: 'Google (wizytówka + wyniki wyszukiwania)',
                        description: 'Kluczowe dla lokalnych biznesów:',
                        points: [
                            'wizytówka Google (opinie, zdjęcia, godziny otwarcia)',
                            'wyniki wyszukiwania typu „catering + miasto", „jedzenie na wynos + okolica"'
                        ],
                        icon: 'google'
                    },
                    {
                        title: 'E-mail / newsletter',
                        description: 'Kanał do:',
                        points: [
                            'kontaktu z osobami, które już u Ciebie były',
                            'przypominania o ofercie (np. kolejne terminy, specjalne pakiety cateringowe)',
                            'wysyłania ważnych informacji (potwierdzenia zamówienia, szczegóły dostawy / odbioru)'
                        ],
                        icon: 'email'
                    },
                    {
                        title: 'Platformy zewnętrzne (Pyszne.pl, Wolt, Glovo, agregatory)',
                        description: 'Pomagają dotrzeć do ludzi, którzy Cię jeszcze nie znają, ale:',
                        points: [
                            'pobierają prowizje',
                            'budują też swoją markę, nie tylko Twoją'
                        ],
                        icon: 'platforms'
                    }
                ],
                practicalExamples: [
                    {
                        title: 'Przykład 1 – mała firma cateringowa w średnim mieście',
                        description: 'Firma realizuje catering na komunie, urodziny i małe przyjęcia oraz rozwija zamówienia do domu.\n\nJak może wykorzystać marketing cyfrowy:\n• aktualna strona WWW z menu, cennikiem i prostym formularzem zapytań,\n• regularne posty na Facebooku pokazujące realizacje, zestawy i dostępne terminy,\n• wizytówka Google z aktualnymi zdjęciami potraw i prośbą o opinie od klientów.',
                        effect: 'Efekt: więcej zapytań bez pośredników i lepsze wypełnienie terminów realizacji.'
                    },
                    {
                        title: 'Przykład 2 – pizzeria z dostawą w średnim mieście',
                        description: 'Nowo otwarta pizzeria chce, żeby mieszkańcy w ogóle wiedzieli, że istnieje.\n\nMoże zrobić:\n• kampanię na Facebooku kierowaną tylko do osób mieszkających w okolicy (np. w promieniu 3–5 km),\n• krótkie filmy pokazujące przygotowanie pizzy, wnętrze lokalu, opinie pierwszych klientów,\n• prosty formularz lub numer do zamówień widoczny od razu po wejściu na stronę / profil.',
                        effect: 'Efekt: szybsze „wbicie się" w świadomość lokalną niż przez same ulotki.'
                    },
                    {
                        title: 'Przykład 3 – lokalny lokal eventowy + catering z dostawą',
                        description: 'Firma żyje głównie z eventów w lokalu, ale chce rozwinąć catering z dostawą i zamówienia do domu.\n\nMoże:\n• przygotować pakiety cateringowe i zestawy „menu na X osób" opisane na stronie www,\n• kierować reklamy na Facebooku do rodzin z dziećmi i firm z okolicy,\n• wysyłać e-maile do osób, które zamawiały wcześniej, z propozycją powrotu przy kolejnej okazji.',
                        effect: 'Efekt: bardziej równomierny napływ zamówień w ciągu roku i mniejsza zależność od jednego kanału.'
                    }
                ],
                quiz: [
                    {
                        id: 'q1',
                        type: 'choice',
                        question: 'Co jest głównym celem marketingu cyfrowego w małej firmie usługowej?',
                        options: [
                            'Tylko sprzedaż produktów i usług przez internet',
                            'Budowanie świadomości marki, zaufania i pozyskiwanie klientów z kanałów online',
                            'Zastąpienie całej obsługi klienta chatbotem',
                            'Wyłącznie reklamowanie się w social mediach'
                        ],
                        correctAnswer: 1,
                        feedback: 'Dokładnie tak – marketing cyfrowy to kompleksowe podejście, które obejmuje budowanie świadomości marki, relacji z klientami i prowadzenie działań promocyjnych w internecie.'
                    },
                    {
                        id: 'q2',
                        type: 'choice',
                        question: 'Które stwierdzenie najlepiej opisuje rolę strony internetowej?',
                        options: [
                            'To tylko wizytówka – i tak wszyscy siedzą na Facebooku',
                            'To centrum, w którym klient może zrozumieć ofertę, zobaczyć zdjęcia i łatwo się z Tobą skontaktować',
                            'To miejsce, gdzie wrzuca się regulamin i nic więcej',
                            'Jest potrzebna tylko dużym firmom'
                        ],
                        correctAnswer: 1,
                        feedback: 'Dokładnie tak – strona internetowa to Twoja „siedziba" w internecie, gdzie klient powinien zrozumieć ofertę, zobaczyć zdjęcia i łatwo znaleźć kontakt.'
                    },
                    {
                        id: 'q3',
                        type: 'choice',
                        question: 'Dlaczego wizytówka Google jest ważna dla lokalnego biznesu?',
                        options: [
                            'Bo bez niej nie da się prowadzić kampanii na Facebooku',
                            'Bo pozwala klientom szybko sprawdzić opinie, zdjęcia, lokalizację i dane kontaktowe',
                            'Bo zastępuje stronę internetową w 100%',
                            'Bo dzięki niej nie trzeba prowadzić social mediów'
                        ],
                        correctAnswer: 1,
                        feedback: 'Dokładnie tak – wizytówka Google jest kluczowa dla lokalnych biznesów, bo pozwala klientom szybko sprawdzić wszystkie najważniejsze informacje w jednym miejscu.'
                    },
                    {
                        id: 'q4',
                        type: 'open',
                        question: 'Napisz jednym–dwoma zdaniami: Na jakim etapie ścieżki klienta (zauważenie → zainteresowanie → rozważanie → decyzja → doświadczenie → powrót/polecenie) Twoja firma najbardziej traci potencjalnych klientów – i dlaczego tak uważasz?',
                        keywords: [
                            'zauważenie',
                            'zainteresowanie',
                            'rozważanie',
                            'decyzja',
                            'doświadczenie',
                            'powrót',
                            'polecenie',
                            'traci',
                            'klientów',
                            'etap'
                        ],
                        hint: 'Pomyśl o momencie, w którym potencjalny klient rezygnuje z kontaktu z Twoją firmą...',
                        feedback: 'Dziękuję za odpowiedź. To pytanie pomoże nam lepiej zrozumieć, gdzie Twoja firma może poprawić swoją obecność online.'
                    }
                ]
            },
            {
                id: '1.2',
                moduleId: '1',
                title: 'Rola mediów społecznościowych w strategii marketingowej',
                intro: `Media społecznościowe (głównie Facebook i Instagram) to dziś jedno z najważniejszych miejsc kontaktu firmy z klientem.

To tam:
• ludzie szukają opinii,
• sprawdzają „czy to miejsce żyje",
• podejmują decyzję: „spróbuję – nie spróbuję".

Profil w social media to nie jest „dodatek". To element strategii – obok strony WWW, Google i innych kanałów.`,
                whyImportant: [
                    {
                        title: 'Budować zaufanie',
                        description: 'Realne zdjęcia, komentarze, reakcje klientów',
                        points: [],
                        icon: 'trust'
                    },
                    {
                        title: 'Przypominać o sobie',
                        description: 'Szczególnie w branżach sezonowych',
                        points: [],
                        icon: 'remind'
                    },
                    {
                        title: 'Informować szybko',
                        description: 'O promocjach, wolnych terminach, zmianach godzin otwarcia',
                        points: [],
                        icon: 'info-fast'
                    },
                    {
                        title: 'Pokazywać „życie firmy"',
                        description: 'Co dzieje się na co dzień, jak wygląda obsługa, atmosfera',
                        points: [],
                        icon: 'life'
                    },
                    {
                        title: 'Docierać precyzyjnie',
                        description: 'Dzięki reklamom do osób z konkretnej lokalizacji i o określonych zainteresowaniach',
                        points: [],
                        icon: 'target'
                    }
                ],
                whyImportantFooter: 'Bez tego klient często widzi tylko suchy wpis w Google albo ofertę na platformach zamówień / agregatorach. Social media pozwalają zbudować emocje i przekonanie: „tam warto zamówić / skorzystać".',
                roleDescription: `Można je potraktować jak trzy funkcje:

1. Wizytówka + dowód, że firma działa
• aktualne zdjęcia (z tego sezonu, nie sprzed 5 lat),
• bieżące informacje (np. menu dnia, promocje, dostępne terminy realizacji),
• spójny opis oferty i danych kontaktowych.

2. Kanał komunikacji z klientami
• odpowiedzi na pytania w komentarzach i wiadomościach prywatnych,
• informowanie o ważnych zmianach (remont, nowe godziny, nowa usługa),
• reagowanie na opinie (pozytywne i negatywne – w sposób spokojny i merytoryczny).

3. Kanał sprzedaży i pozyskiwania zapytań
• posty kierujące do zamówień, zapytań, kontaktu,
• kampanie reklamowe (np. „zamów catering na komunię", „zestawy z dostawą", „menu na weekend"),
• zachęcanie do powrotu (oferty dla osób, które już były klientami).`,
                keyElements: [
                    {
                        title: 'Treści informacyjne',
                        description: 'Aktualne informacje o firmie:',
                        points: [
                            'aktualne godziny otwarcia, wolne terminy, nowe usługi',
                            'zmiany w ofercie (np. nowe dania, nowe pakiety, nowy sprzęt)'
                        ],
                        icon: 'info'
                    },
                    {
                        title: 'Treści pokazujące „kulisy"',
                        description: 'Autentyczne spojrzenie za kulisy:',
                        points: [
                            'przygotowanie sali, sprzętu, jedzenia',
                            'fragmenty pracy zespołu (bez sztucznego „udawania")'
                        ],
                        icon: 'kulisy'
                    },
                    {
                        title: 'Treści sprzedażowe',
                        description: 'Konkretne promocje i zachęty:',
                        points: [
                            'konkretne promocje, pakiety, zachęty (z jasnym wezwaniem do działania: „zadzwoń", „napisz", „zamów")',
                            'grafiki z prostym komunikatem, a nie ścianą tekstu'
                        ],
                        icon: 'sales'
                    },
                    {
                        title: 'Treści budujące relacje',
                        description: 'Budowanie zaufania i zaangażowania:',
                        points: [
                            'opinie klientów (za zgodą)',
                            'zdjęcia „z życia" – np. zadowoleni klienci, pełny lokal, udane realizacje',
                            'proste pytania do odbiorców, zachęcające do reakcji'
                        ],
                        icon: 'relacje'
                    }
                ],
                practicalExamples: [
                    {
                        title: 'Przykład 1 – firma cateringowa i lokal eventowy',
                        description: 'Zamiast publikować raz na kilka miesięcy, profil może być narzędziem do:\n• pokazywania realizacji cateringu (komunie, urodziny, małe przyjęcia),\n• informowania o wolnych terminach: „Zwolnił się termin na przyszły weekend – kto pierwszy, ten lepszy",\n• pokazywania pakietów: menu na X osób, zestawy z dostawą, opcje dla firm.',
                        effect: 'Efekt: osoby planujące imprezę widzą, że firma działa regularnie i ma konkretne propozycje.'
                    },
                    {
                        title: 'Przykład 2 – pizzeria / restauracja',
                        description: 'Profil na Facebooku / Instagramie może:\n• pokazywać realne zdjęcia dań, a nie tylko „stockowe" grafiki,\n• komunikować promocje czasowe (np. „środa – druga pizza -30% przy odbiorze osobistym"),\n• zachęcać do opinii i recenzji, które później zwiększają zaufanie nowych klientów,\n• dzięki reklamom docierać do osób z najbliższej okolicy.',
                        effect: 'Efekt: więcej osób przypomina sobie o lokalu, gdy myśli: „zamówmy coś na kolację".'
                    },
                    {
                        title: 'Przykład 3 – lokal eventowy + catering z dostawą',
                        description: '• w sezonie: pokazywanie realizacji eventów w lokalu i zadowolonych klientów,\n• poza sezonem: promowanie cateringu na małe przyjęcia i ofert dla firm (np. „lunch dla zespołu", „przerwa kawowa"),\n• stała obecność: krótkie relacje (Stories) z codziennych działań – przygotowanie dań, pakowanie zamówień, aranżacje stołów.',
                        effect: 'Efekt: klient, zanim wejdzie na stronę lub napisze, już ma w głowie obraz oferty – wie, czego się spodziewać.'
                    }
                ],
                additionalInfo: `Warto jasno:

Media społecznościowe nie zastąpią:
• kiepskiej obsługi,
• braku dostępności,
• chaosu w organizacji.

One wzmacniają to, co już jest. Jeśli jakość usługi jest dobra – pomagają to pokazać.

Jeśli jest słaba – bardzo szybko to ujawnią (opinie, komentarze, brak reakcji).`,
                quiz: [
                    {
                        id: 'q1',
                        type: 'choice',
                        question: 'Jaka jest najważniejsza rola mediów społecznościowych w małej firmie usługowej?',
                        options: [
                            'Publikowanie jak największej liczby postów dziennie',
                            'Budowanie relacji, zaufania i przypominanie o marce klientom z docelowej grupy',
                            'Zastąpienie strony internetowej',
                            'Służenie wyłącznie do ogłoszeń o zamknięciu lokalu'
                        ],
                        correctAnswer: 1,
                        hint: 'Pomyśl o głównym celu social mediów – czy chodzi o ilość, czy o jakość relacji z klientami?',
                        feedback: 'Dokładnie tak – media społecznościowe służą przede wszystkim budowaniu relacji i zaufania, a nie tylko publikowaniu treści.'
                    },
                    {
                        id: 'q2',
                        type: 'choice',
                        question: 'Które z poniższych działań ma największy sens w kontekście social mediów dla lokalnego biznesu?',
                        options: [
                            'Kupowanie „lajków" z całego świata',
                            'Kierowanie reklam do osób mieszkających w promieniu kilku kilometrów od firmy',
                            'Publikowanie wyłącznie memów niezwiązanych z działalnością',
                            'Publikowanie raz w roku informacji o istnieniu firmy'
                        ],
                        correctAnswer: 1,
                        hint: 'Dla lokalnego biznesu najważniejsze jest dotarcie do osób, które mogą rzeczywiście skorzystać z usługi...',
                        feedback: 'Zgadza się – dla lokalnego biznesu kluczowe jest precyzyjne docieranie do osób z najbliższej okolicy, które mogą rzeczywiście skorzystać z oferty.'
                    },
                    {
                        id: 'q3',
                        type: 'choice',
                        question: 'Jakiego typu treści nie powinien dominować na profilu firmy?',
                        options: [
                            'Zdjęcia z życia firmy, krótkie relacje z codziennej pracy',
                            'Opinie zadowolonych klientów (za ich zgodą)',
                            'Wyłącznie grafiki z tekstem „PROMOCJA!!!" bez kontekstu i bez informacji, co dokładnie oferujesz',
                            'Informacje o nowych usługach w spokojnej, konkretnej formie'
                        ],
                        correctAnswer: 2,
                        hint: 'Pomyśl o tym, co buduje zaufanie – czy agresywne promocje bez kontekstu, czy autentyczne treści?',
                        feedback: 'Dokładnie – agresywne promocje bez kontekstu nie budują zaufania. Lepiej pokazywać autentyczne treści i konkretne informacje.'
                    },
                    {
                        id: 'q4',
                        type: 'open',
                        question: 'Na jakiej platformie Twoi klienci są najbardziej aktywni (Facebook / Instagram / inne)?',
                        keywords: [
                            'facebook',
                            'instagram',
                            'platforma',
                            'klienci',
                            'aktywni',
                            'social',
                            'media'
                        ],
                        hint: 'Pomyśl o tym, gdzie Twoi klienci spędzają najwięcej czasu online...',
                        feedback: 'Dziękuję za odpowiedź. To pomoże lepiej zrozumieć, na której platformie warto skupić najwięcej uwagi.'
                    },
                    {
                        id: 'q5',
                        type: 'open',
                        question: 'Jakiego typu post zobaczyłby Twój idealny klient i pomyślał: „To jest coś dla mnie"?',
                        keywords: [
                            'post',
                            'klient',
                            'idealny',
                            'typ',
                            'treść',
                            'zainteresowanie',
                            'reakcja'
                        ],
                        hint: 'Pomyśl o treści, która naprawdę przyciągnęłaby uwagę Twojego idealnego klienta...',
                        feedback: 'Dziękuję za odpowiedź. To pomoże lepiej zrozumieć, jakiego typu treści warto publikować, aby dotrzeć do idealnych klientów.'
                    }
                ]
            },
            {
                id: '1.3',
                moduleId: '1',
                title: 'Narzędzia i platformy marketingowe',
                intro: `Marketing online to nie tylko „bycie w internecie", ale korzystanie z konkretnych narzędzi, które pomagają:

• dotrzeć do właściwych osób,
• pokazać im ofertę,
• zmierzyć efekty działań,
• wyciągać wnioski na przyszłość.

Bez narzędzi działasz „na wyczucie". Z narzędziami – widzisz liczby i możesz podejmować decyzje na podstawie danych.`,
                whyImportant: [
                    {
                        title: 'Lepiej rozumieć, co działa',
                        description: 'Które działania marketingowe się opłacają',
                        points: [],
                        icon: 'understand'
                    },
                    {
                        title: 'Oszczędzać czas',
                        description: 'Zamiast robić wszystko ręcznie',
                        points: [],
                        icon: 'time'
                    },
                    {
                        title: 'Podejmować decyzje na danych',
                        description: 'A nie tylko intuicji',
                        points: [],
                        icon: 'data'
                    },
                    {
                        title: 'Uporządkować pracę',
                        description: 'Mieć w jednym miejscu informacje o klientach, wynikach kampanii, treściach',
                        points: [],
                        icon: 'organize'
                    }
                ],
                whyImportantFooter: 'Nie chodzi o to, żeby znać 50 programów. W małej firmie często wystarczy kilka dobrze dobranych narzędzi, używanych konsekwentnie.',
                keyElements: [
                    {
                        title: 'Narzędzia „widoczności"',
                        description: 'Żeby klienci w ogóle Cię znaleźli:',
                        points: [
                            'Strona internetowa (np. WordPress) – Twoja baza, miejsce gdzie możesz opisać ofertę, pokazać zdjęcia, dodać formularz kontaktowy',
                            'Profil firmy w Google (Google Business Profile) – wizytówka w Google: adres, godziny otwarcia, opinie, zdjęcia',
                            'Profile w social media (Facebook, Instagram) – miejsce budowania relacji, pokazywania codzienności firmy, komunikowania promocji'
                        ],
                        icon: 'visibility'
                    },
                    {
                        title: 'Narzędzia „ruchu i kampanii"',
                        description: 'Żeby ściągnąć ludzi do firmy:',
                        points: [
                            'Facebook Ads Manager / Meta Business Suite – panel do ustawiania reklam na Facebooku i Instagramie z zasięgiem lokalnym i konkretnymi celami',
                            'Google Ads – reklamy w wynikach wyszukiwania, przydatne tam, gdzie klienci wpisują konkretne frazy (np. „catering na komunię", „obiad z dowozem")'
                        ],
                        icon: 'campaigns'
                    },
                    {
                        title: 'Narzędzia „analityki i danych"',
                        description: 'Żeby widzieć, co się dzieje:',
                        points: [
                            'Google Analytics (GA4) – pozwala śledzić ile osób odwiedza stronę, z jakich źródeł, które podstrony są najczęściej oglądane',
                            'Proste arkusze (np. Google Sheets / Excel) – do zapisywania dat kampanii, stawek i budżetów, liczby zapytań / zamówień w danym okresie'
                        ],
                        icon: 'analytics'
                    },
                    {
                        title: 'Narzędzia „relacji z klientem"',
                        description: 'Żeby nie tracić kontaktu:',
                        points: [
                            'Narzędzia e-mail marketingu (np. MailerLite, Mailchimp) – umożliwiają wysyłanie newsletterów i tworzenie prostych automatyzacji',
                            'CRM lub prosta baza kontaktów – lista klientów w arkuszu z oznaczeniami (stały klient, grupa, jednorazowy)'
                        ],
                        icon: 'relationships'
                    },
                    {
                        title: 'Narzędzia „tworzenia treści"',
                        description: 'Żeby materiały wyglądały dobrze:',
                        points: [
                            'Canva – do tworzenia prostych grafik do social mediów, banerów na stronę, prostych plakatów / ulotek',
                            'Proste aplikacje do obróbki zdjęć w telefonie – lekka korekta światła, przycięcie, dopasowanie formatu do Instagrama / Facebooka'
                        ],
                        icon: 'content'
                    }
                ],
                practicalExamples: [
                    {
                        title: 'Przykład – mała firma cateringowa w średnim mieście',
                        description: `1. Widoczność
• Strona WWW na WordPressie: menu, zdjęcia realizacji, formularz zapytań.
• Profil Google (Google Business Profile): aktualne godziny, telefon, obszar dostaw, opinie.

2. Ruch
• Kampania na Facebooku/Instagramie: reklama pakietu „catering na komunię" kierowana do rodzin w okolicy.

3. Analityka
• Google Analytics mierzy, ilu użytkowników z reklamy weszło na stronę i wysłało zapytanie.

4. Relacje
• Po sezonie – wysłanie newslettera do klientów, którzy już zamawiali: „menu na zimowe spotkania i małe przyjęcia".

5. Treści
• Zdjęcia realizacji, krótkie filmy z przygotowań, grafiki z Canvy z prostymi komunikatami („wolne terminy", „zestaw na 10 osób").`,
                        effect: 'Dzięki takiemu połączeniu właściciel wie, skąd się biorą zapytania i zamówienia, widzi które działania działają lepiej i może stopniowo rezygnować z mało skutecznych kanałów na rzecz tych, które dają mierzalny efekt.'
                    }
                ],
                quiz: [
                    {
                        id: 'q1',
                        type: 'choice',
                        question: 'Które narzędzie jest podstawowym wyborem do analizy ruchu na stronie internetowej?',
                        options: [
                            'Google Analytics',
                            'Facebook Ads Manager',
                            'Instagram Stories',
                            'Messenger'
                        ],
                        correctAnswer: 0,
                        hint: 'Pomyśl o narzędziu, które pokazuje szczegółowe statystyki dotyczące odwiedzin strony...',
                        feedback: 'Dokładnie tak – Google Analytics to podstawowe narzędzie do analizy ruchu na stronie internetowej.'
                    },
                    {
                        id: 'q2',
                        type: 'choice',
                        question: 'Jaką rolę pełni Facebook Ads Manager / Meta Business Suite?',
                        options: [
                            'Jest narzędziem do wysyłania newsletterów',
                            'Zastępuje stronę internetową',
                            'Umożliwia ustawianie i monitorowanie kampanii reklamowych na Facebooku i Instagramie',
                            'Służy tylko do odpowiadania na wiadomości klientów'
                        ],
                        correctAnswer: 2,
                        hint: 'Pomyśl o narzędziu do zarządzania reklamami w social media...',
                        feedback: 'Zgadza się – Facebook Ads Manager / Meta Business Suite umożliwia ustawianie i monitorowanie kampanii reklamowych na Facebooku i Instagramie.'
                    },
                    {
                        id: 'q3',
                        type: 'choice',
                        question: 'Do czego w małej firmie najbardziej przydaje się prosty arkusz (np. Google Sheets) w marketingu?',
                        options: [
                            'Do edytowania zdjęć',
                            'Do pisania wpisów na Facebooka',
                            'Do zastąpienia strony internetowej',
                            'Do śledzenia podstawowych danych: dat kampanii, budżetów, liczby zapytań / zamówień'
                        ],
                        correctAnswer: 3,
                        hint: 'Pomyśl o narzędziu, które pomaga organizować i śledzić dane...',
                        feedback: 'Dokładnie – prosty arkusz jest przydatny do śledzenia podstawowych danych marketingowych, takich jak daty kampanii, budżety i liczba zapytań.'
                    },
                    {
                        id: 'q4',
                        type: 'open',
                        question: 'Jakie narzędzia marketingowe już teraz wykorzystujesz w swojej firmie (chociażby w podstawowej formie)?',
                        keywords: [
                            'narzędzia',
                            'marketingowe',
                            'wykorzystujesz',
                            'firma',
                            'podstawowa',
                            'forma',
                            'google',
                            'facebook',
                            'instagram',
                            'strona',
                            'www'
                        ],
                        hint: 'Pomyśl o wszystkich narzędziach online, z których korzystasz w swojej firmie...',
                        feedback: 'Dziękuję za odpowiedź. To pomoże lepiej zrozumieć, jakie narzędzia już masz i które warto rozwinąć.'
                    },
                    {
                        id: 'q5',
                        type: 'open',
                        question: 'Które jedno narzędzie – jeśli nauczyłbyś się korzystać z niego lepiej – dałoby Twoim zdaniem największy efekt w najbliższych 3 miesiącach?',
                        keywords: [
                            'narzędzie',
                            'nauczyłbyś',
                            'korzystać',
                            'lepiej',
                            'największy',
                            'efekt',
                            'miesiące',
                            '3',
                            'trzy'
                        ],
                        hint: 'Pomyśl o narzędziu, które mogłoby przynieść najszybsze i najbardziej widoczne rezultaty...',
                        feedback: 'Dziękuję za odpowiedź. To pomoże lepiej zrozumieć, na którym narzędziu warto się skupić w pierwszej kolejności.'
                    }
                ]
            }
        ]
    },
    {
        id: '2',
        title: 'Content marketing (storytelling)',
        icon: 'pen',
        lessons: [
            {
                id: '2.1',
                moduleId: '2',
                title: 'Tworzenie angażujących treści',
                intro: `Angażujące treści to fundament skutecznego marketingu online.

To one zatrzymują uwagę, budują zaufanie i sprawiają, że odbiorca realnie rozważa skorzystanie z oferty – zamiast tylko „przelecieć wzrokiem" po komunikacie.

W praktyce: dobra treść to taka, która jest przydatna, konkretna i napisana językiem człowieka, a nie urzędowym sloganem.`,
                whyImportant: `Dla firmy z branży gastro/event i usług lokalnych:

• klienci porównują oferty głównie online,
• często widzą kilka bardzo podobnych miejsc / usług,
• decyzja zapada na podstawie:
  – zdjęć,
  – opisów,
  – tego, czy komunikat „brzmi po ludzku" i budzi zaufanie.

Jeśli treści są ogólne, suche i podobne do wszystkich innych – firma znika w tłumie.

Jeśli są konkretne, zrozumiałe i pokazują realne korzyści – klient łatwiej wybiera właśnie Ciebie.`,
                keyElements: [
                    {
                        title: 'Konkretny odbiorca',
                        description: 'Piszemy „do kogoś", a nie „do wszystkich"',
                        points: [
                            'Inaczej komunikujemy się z rodziną z dziećmi, inaczej z firmą zamawiającą lunch'
                        ],
                        icon: 'audience'
                    },
                    {
                        title: 'Jasny cel komunikatu',
                        description: 'Czy chcemy, żeby ktoś:',
                        points: [
                            'złożył zamówienie?',
                            'zapytał o wycenę?',
                            'zapisał się na newsletter?'
                        ],
                        icon: 'goal'
                    },
                    {
                        title: 'Korzyści, nie tylko cechy',
                        description: 'Zamiast: „menu na 20 osób",',
                        points: [
                            'lepiej: „pełne menu na 20 osób – bez liczenia porcji i stresu przed imprezą"'
                        ],
                        icon: 'benefits'
                    },
                    {
                        title: 'Prosty język',
                        description: 'Krótkie zdania, bez żargonu',
                        points: [
                            'Im łatwiej się to czyta, tym większa szansa, że ktoś dotrwa do końca'
                        ],
                        icon: 'language'
                    },
                    {
                        title: 'Wezwanie do działania (CTA)',
                        description: 'Konkretne działanie dla odbiorcy',
                        points: [
                            'np. „Zadzwoń", „Napisz wiadomość", „Sprawdź termin realizacji na przyszły weekend"'
                        ],
                        icon: 'cta'
                    }
                ],
                practicalExamples: [
                    {
                        title: 'Przykład 1 – firma cateringowa',
                        description: `Zamiast ogólnego komunikatu:

„Zapraszamy do naszego cateringu, mamy dobre jedzenie."

lepsza treść:

„Organizujesz urodziny i potrzebujesz menu dla 15–20 osób?

Zestaw na przyjęcie od 49 zł/os., dostawa w wybranym terminie.

W cenie: przystawki, dania ciepłe i deser – wszystko gotowe do podania.

Napisz w wiadomości „CATERING", wyślę dostępne terminy na najbliższe tygodnie."`,
                        effect: 'Różnica: wiadomo dla kogo jest oferta, są konkretne korzyści i jasne działanie („napisz w wiadomości…").'
                    },
                    {
                        title: 'Przykład 2 – lokalna restauracja',
                        description: `Zamiast:

„Zapraszamy na pizzę, mamy najlepszą w mieście."

lepiej:

„Masz ochotę na coś ciepłego po pracy?

Od poniedziałku do czwartku druga pizza -50% na wynos od 17:00 do 20:00.

Zamów telefonicznie lub przez Messenger – zwykle wyrabiamy się w 25–30 minut."`,
                        effect: 'Tu klient dostaje: konkretną porę, konkretną promocję, informację jak zamówić.'
                    },
                    {
                        title: 'Przykład 3 – gabinet fizjoterapii',
                        description: `Zamiast:

„Oferujemy profesjonalne zabiegi fizjoterapeutyczne."

lepiej:

„Boli Cię kręgosłup po całym dniu przy biurku?

Podczas pierwszej wizyty (60 minut) sprawdzimy przyczynę bólu i pokażę Ci 3 proste ćwiczenia, które możesz robić w domu.

Zapisz się przez formularz – zwykle mamy wolne terminy w ciągu 3–4 dni."`,
                        effect: 'Znów: konkret, problem → rozwiązanie → działanie.'
                    }
                ],
                roleDescription: `Praktyczne wskazówki – jak pisać własne treści:

1. Zacznij od jednej osoby w głowie
Wyobraź sobie konkretnego klienta:
– „rodzina organizująca małe przyjęcie",
– „firma zamawiająca lunch dla zespołu",
– „mieszkaniec miasta szukający zestawu na kolację w niedzielę".

2. Odpowiedz na trzy pytania:
• Z jakim problemem / potrzebą przychodzi?
• Co mu konkretnie oferujesz?
• Co ma zrobić teraz, jeśli go to interesuje?

3. Uprość tekst o 20–30%
Zawsze warto przejrzeć tekst drugi raz i usunąć:
• zbędne przymiotniki („najwyższej jakości", „fantastyczny", „wyjątkowy"),
• powtórzenia,
• zbyt długie zdania.

4. Dodaj element „tu i teraz"
Np.:
– „w najbliższy weekend",
– „w listopadzie",
– „tylko przy zamówieniu przez wiadomość prywatną".`,
                quiz: [
                    {
                        id: 'q1',
                        type: 'choice',
                        question: 'Który z poniższych elementów NAJBARDZIEJ pomaga zwiększyć zaangażowanie odbiorcy?',
                        options: [
                            'Używanie jak największej liczby przymiotników („wyjątkowy", „najlepszy", „fantastyczny")',
                            'Zastosowanie prostego języka, konkretów i jasnego wezwania do działania',
                            'Pisanie bardzo długich opisów, aby przekazać jak najwięcej informacji',
                            'Skupienie się wyłącznie na historii firmy'
                        ],
                        correctAnswer: 1,
                        hint: 'Pomyśl o tym, co sprawia, że treść jest łatwa do zrozumienia i zachęca do działania...',
                        feedback: 'Dokładnie tak – prosty język, konkretne informacje i jasne wezwanie do działania to klucz do angażujących treści.'
                    },
                    {
                        id: 'q2',
                        type: 'choice',
                        question: 'Który opis lepiej spełnia zasady tworzenia angażującej treści dla cateringu?',
                        options: [
                            '„Zapraszamy do naszego cateringu. Mamy dobre jedzenie i miłą obsługę."',
                            '„Organizujesz małe przyjęcie? Oferujemy menu na 10–20 osób z dostawą i opcjami wege. Napisz wiadomość, sprawdzimy dostępne terminy realizacji."',
                            '„Nasz catering działa od 1998 roku i obsłużył już tysiące zadowolonych klientów."',
                            '„Jesteśmy najlepszym cateringiem w mieście, gwarantujemy pełną satysfakcję."'
                        ],
                        correctAnswer: 1,
                        hint: 'Pomyśl o treści, która jest konkretna, skierowana do konkretnej osoby i ma jasne wezwanie do działania...',
                        feedback: 'Zgadza się – ten opis jest konkretny, skierowany do konkretnej osoby, zawiera konkretne korzyści i ma jasne wezwanie do działania.'
                    },
                    {
                        id: 'q3',
                        type: 'choice',
                        question: 'Co jest pierwszym krokiem przy tworzeniu angażującej treści?',
                        options: [
                            'Dodanie jak największej liczby promocji i rabatów',
                            'Skopiowanie treści z innej firmy i lekkie jej przeredagowanie',
                            'Określenie, do kogo konkretnie kierujemy komunikat i jaki ma mieć cel',
                            'Rozpisanie jak najdłuższej historii o firmie'
                        ],
                        correctAnswer: 2,
                        hint: 'Pomyśl o pierwszym kroku – zanim zaczniesz pisać, musisz wiedzieć...',
                        feedback: 'Dokładnie – pierwszym krokiem jest określenie, do kogo konkretnie kierujemy komunikat i jaki ma być jego cel. Bez tego nie można stworzyć skutecznej treści.'
                    },
                    {
                        id: 'q4',
                        type: 'open',
                        question: 'Masz firmę cateringową. Dotychczasowy komunikat na Facebooku brzmi: „Zapraszamy do naszego cateringu, mamy smaczne jedzenie."\n\nPrzeredaguj ten tekst tak, aby był:\n• skierowany do konkretnej grupy (np. rodziny, firmy, organizatora małego przyjęcia),\n• bardziej konkretny,\n• zakończony jasnym wezwaniem do działania.\n\nNapisz swoją propozycję w 3–4 zdaniach.',
                        keywords: [
                            'catering',
                            'menu',
                            'zestawy',
                            'rodzina',
                            'firma',
                            'przyjęcie',
                            'zadzwoń',
                            'napisz',
                            'zamów',
                            'sprawdź',
                            'terminy'
                        ],
                        hint: 'Pomyśl o konkretnej grupie docelowej, konkretnych korzyściach i jasnym wezwaniu do działania...',
                        feedback: 'Dziękuję za odpowiedź. To ćwiczenie pomoże Ci lepiej zrozumieć, jak tworzyć angażujące treści skierowane do konkretnych odbiorców.'
                    }
                ]
            },
            {
                id: '2.2',
                moduleId: '2',
                title: 'Techniki storytellingu',
                intro: `Storytelling to świadome wykorzystywanie historii w komunikacji marketingowej.

Zamiast pisać: „mamy dobre jedzenie i szeroką ofertę", opowiadasz krótką scenę z perspektywy klienta – taką, którą odbiorca łatwo sobie wyobraża.

Historie są zapamiętywane znacznie lepiej niż suche listy cech.

Dlatego dobrze skonstruowana opowieść może zrobić dla Twojej marki więcej niż kolejna „profesjonalna" formułka.`,
                whyImportant: [
                    {
                        title: 'Zamienia ofertę w doświadczenie',
                        description: 'Klient widzi siebie w tej historii',
                        points: [],
                        icon: 'experience'
                    },
                    {
                        title: 'Buduje zaufanie',
                        description: 'Pokazuje ludzi, sytuacje, kulisy, a nie tylko „ładne hasła"',
                        points: [],
                        icon: 'trust-story'
                    },
                    {
                        title: 'Ułatwia decyzję',
                        description: 'Klient myśli: „to dokładnie moja sytuacja"',
                        points: [],
                        icon: 'decision'
                    }
                ],
                whyImportantFooter: `Zamiast mówić:

„Oferujemy catering na rodzinne przyjęcia."

możesz pokazać scenę:

„W piątkowy wieczór rodzina z dwójką dzieci kończy przygotowania do przyjęcia. W sobotę rano pod drzwi podjeżdża dostawa – gotowe przystawki, ciepłe dania i deser są już poporcjowane. Rodzice wreszcie mają spokój, bo wszystko jest gotowe na czas, a dzieci pomagają ustawić stoły."

To dalej ta sama usługa – ale zupełnie inny poziom odczuwania.`,
                keyElements: [
                    {
                        title: 'Bohater',
                        description: 'Ktoś konkretny: gość, klient, właściciel, pracownik',
                        points: [],
                        icon: 'hero'
                    },
                    {
                        title: 'Punkt wyjścia',
                        description: 'Sytuacja początkowa, problem albo potrzeba',
                        points: [
                            'np. „zmęczony po całym dniu w trasie", „szuka spokojnego miejsca do pracy"'
                        ],
                        icon: 'starting-point'
                    },
                    {
                        title: 'Konflikt / wyzwanie',
                        description: 'Co jest trudne, męczące, irytujące dla bohatera',
                        points: [
                            'np. spóźniona dostawa, brak opcji dla alergików, zbyt małe porcje'
                        ],
                        icon: 'challenge'
                    },
                    {
                        title: 'Rozwiązanie',
                        description: 'Miejsce, usługa, sposób działania firmy, który usuwa problem',
                        points: [],
                        icon: 'solution-story'
                    },
                    {
                        title: 'Rezultat',
                        description: 'Co się zmieniło po skorzystaniu z usługi',
                        points: [
                            'np. wyspany gość, który zdążył na ważne spotkanie; rodzina, która miała spokojny wyjazd'
                        ],
                        icon: 'result'
                    },
                    {
                        title: 'Puenta / wezwanie do działania',
                        description: 'Konkret: „Zamów catering", „Napisz wiadomość, sprawdzimy termin realizacji"',
                        points: [],
                        icon: 'cta-story'
                    }
                ],
                practicalExamples: [
                    {
                        title: 'Przykład 1 – firma cateringowa na małe przyjęcia',
                        description: `Suchy komunikat:

„Robimy catering na imprezy rodzinne."

Wersja storytellingowa:

„W zeszłą sobotę pani Ania przygotowywała komunię syna i bała się, że nie zdąży z jedzeniem.

Rano dostaliśmy informację o ostatnich poprawkach w menu i dowieźliśmy wszystko gotowe do podania.

Klienci chwalili przystawki, a ona w końcu mogła usiąść przy stole, zamiast stać w kuchni.

Po imprezie napisała, że to pierwsza uroczystość, na której naprawdę odpoczęła."`,
                        effect: 'Co tu działa: konkretny bohater, konkretna scena i rezultat, który każdy łatwo sobie wyobrazi.'
                    },
                    {
                        title: 'Przykład 2 – catering dla firm',
                        description: `Suchy komunikat:

„Obsługujemy klientów biznesowych."

Wersja storytellingowa:

„W poniedziałek o 9:00 firma organizowała szkolenie dla 25 osób i potrzebowała przerwy kawowej z czymś na szybko.

Przygotowaliśmy zestawy śniadaniowe i termosy z kawą, wszystko dostarczone 30 minut przed startem.

Po spotkaniu koordynatorka napisała, że „pierwszy raz wszystko było punktualnie i bez zamieszania".

Od tamtej pory zamawiają u nas lunch na każde szkolenie."`,
                        effect: 'Tu historia pokazuje: elastyczność, zrozumienie potrzeb klienta i realny efekt (powrót zamówień).'
                    },
                    {
                        title: 'Przykład 3 – restauracja / lokal gastronomiczny',
                        description: `Suchy komunikat:

„Nasze dania przygotowujemy z lokalnych składników."

Wersja storytellingowa:

„W każdy czwartek rano właściciel jedzie na lokalny targ po warzywa i zioła od tych samych dostawców od lat.

To od pani, która prowadzi małe gospodarstwo kilka kilometrów dalej, bierzemy pomidory do naszej zupy krem.

Klienci często pytają, dlaczego „smakuje jak u babci" – odpowiedź jest prosta: używamy tych samych prostych składników, tylko podanych w trochę bardziej nowoczesny sposób."`,
                        effect: 'Historia pokazuje autentyczność, lokalne pochodzenie i prostotę składników.'
                    }
                ],
                roleDescription: `Proste ramy do wykorzystania w praktyce:

Możesz korzystać z bardzo prostych szablonów:

Schemat 1: Problem → Rozwiązanie → Efekt
• Problem: „Klienci zamawiają na ostatnią chwilę i boją się, że jedzenia zabraknie."
• Rozwiązanie: „Mamy szybki zestaw cateringowy na 10–20 osób z dostawą."
• Efekt: „Klienci mają gotowe menu bez stresu i improwizowania."

Schemat 2: Było → Zdarzyło się → Jest
• Było: „Klient wcześniej zamawiał z przypadkowych miejsc i często dostawa była spóźniona."
• Zdarzyło się: „Tym razem trafił na menu z konkretnym terminem realizacji i czytelną ofertą."
• Jest: „Od tamtej pory wraca przy każdej okazji i poleca znajomym."

Praktyczne wskazówki:

1. Jedna historia = jeden główny wątek
Nie próbuj w jednej opowieści pokazać wszystkiego (ceny, pokoi, śniadania, parkingu, sali konferencyjnej).
Skup się na jednym konkretnym doświadczeniu.

2. Krótkie, konkretne sceny
Wystarczy 4–6 zdań opisujących sytuację, a nie pełna „powieść".
Dobrze działają szczegóły: godzina, pogoda, drobny dialog, konkretne danie.

3. Prawdziwość przede wszystkim
Nie koloryzuj przesadnie.
Wystarczy opisać realistyczne zdarzenie tak, by było konkretne i „żywe".

4. Zawsze zakończ wezwaniem do działania
Po historii dodaj:
– „Jeśli to brzmi jak coś dla Ciebie, napisz wiadomość – sprawdzimy termin realizacji."
– „Zadzwoń, jeśli potrzebujesz cateringu na spotkanie firmowe."`,
                quiz: [
                    {
                        id: 'q1',
                        type: 'choice',
                        question: 'Co jest kluczowym elementem dobrego storytellingu w marketingu?',
                        options: [
                            'Maksymalnie dużo liczb i statystyk',
                            'Emocje, wyraźny bohater, problem i rozwiązanie',
                            'Bardzo formalny język i specjalistyczne słownictwo',
                            'Brak konkretnej struktury – historia „ma się po prostu toczyć"'
                        ],
                        correctAnswer: 1,
                        hint: 'Pomyśl o tym, co sprawia, że historia jest zapamiętywana i angażująca...',
                        feedback: 'Dokładnie tak – dobry storytelling powinien zawierać emocje, wyraźnego bohatera, problem i rozwiązanie, co tworzy angażującą narrację.'
                    },
                    {
                        id: 'q2',
                        type: 'choice',
                        question: 'Który z poniższych opisów NAJBARDZIEJ przypomina storytelling?',
                        options: [
                            '„Mamy menu na 20 osób, dostawa i własne opakowania."',
                            '„Nasz catering działa od 15 lat i był odświeżony w 2018 roku."',
                            '„W zeszłym miesiącu pani Marta organizowała urodziny i bała się, że nie zdąży z jedzeniem. Dostarczyliśmy gotowe zestawy na czas, a klienci prosili o kontakt przy kolejnej okazji."',
                            '„Oferujemy wysoki standard obsługi i profesjonalne podejście do klienta."'
                        ],
                        correctAnswer: 2,
                        hint: 'Pomyśl o opisie, który opowiada konkretną historię z bohaterem, sytuacją i rezultatem...',
                        feedback: 'Zgadza się – ten opis zawiera wszystkie elementy storytellingu: konkretnego bohatera, sytuację, rozwiązanie i rezultat.'
                    },
                    {
                        id: 'q3',
                        type: 'choice',
                        question: 'Jak najlepiej zacząć tworzenie historii dla swojej firmy?',
                        options: [
                            'Od ustalenia bohatera i jego sytuacji / problemu',
                            'Od wypisania wszystkich parametrów technicznych oferty',
                            'Od napisania jak najdłuższego tekstu i skracania go dopiero na końcu',
                            'Od sprawdzenia, jak pisze konkurencja i skopiowania stylu'
                        ],
                        correctAnswer: 0,
                        hint: 'Pomyśl o pierwszym kroku – od czego powinna zaczynać się dobra historia...',
                        feedback: 'Dokładnie – pierwszym krokiem jest ustalenie bohatera i jego sytuacji lub problemu. To fundament każdej dobrej historii.'
                    },
                    {
                        id: 'q4',
                        type: 'open',
                        question: 'Masz firmę cateringową. Dotychczasowy post na Facebooku brzmi: „Dziękujemy naszym klientom za zamówienia, zapraszamy ponownie."\n\nTwoje zadanie:\n• zamień to na krótką historię z jedną konkretną sytuacją,\n• pokaż, co dokładnie klienci docenili,\n• zakończ wezwaniem do działania.\n\nNapisz historię w 4–6 zdaniach.',
                        keywords: [
                            'historia',
                            'klienci',
                            'sytuacja',
                            'docenili',
                            'wezwanie',
                            'działanie',
                            'zamów',
                            'napisz',
                            'sprawdź',
                            'terminy'
                        ],
                        hint: 'Pomyśl o konkretnej sytuacji z gośćmi, co im się podobało i jak to opisać jako historię...',
                        feedback: 'Dziękuję za odpowiedź. To ćwiczenie pomoże Ci lepiej zrozumieć, jak przekształcać suche komunikaty w angażujące historie.'
                    }
                ]
            },
            {
                id: '2.3',
                moduleId: '2',
                title: 'Optymalizacja treści pod kątem SEO',
                intro: `SEO (Search Engine Optimization) to sposób pisania i układania treści tak, aby były zrozumiałe dla użytkowników i łatwe do odczytania przez wyszukiwarki (np. Google).

Dobrze przygotowany tekst pozwala stronie pojawiać się wyżej w wynikach wyszukiwania, gdy ktoś wpisuje konkretne hasła, np. „catering na komunię" albo „lunch dla firm z dostawą".`,
                whyImportant: [
                    {
                        title: 'Zwiększyć widoczność w Google',
                        description: 'Strona pojawia się wyżej w wynikach wyszukiwania',
                        points: [],
                        icon: 'visibility-seo'
                    },
                    {
                        title: 'Przyciągnąć właściwych klientów',
                        description: 'Osoby, które już szukają dokładnie takich usług',
                        points: [
                            'np. „catering na komunię", „lunch dla firm z dostawą"'
                        ],
                        icon: 'target-seo'
                    },
                    {
                        title: 'Obniżyć koszt pozyskania klienta',
                        description: 'Ruch z wyszukiwarki jest organiczny, a nie płatny',
                        points: [],
                        icon: 'cost-seo'
                    }
                ],
                whyImportantFooter: `Możesz mieć świetną ofertę i dobrze napisaną treść, ale jeśli:

• tekst nie zawiera słów, które faktycznie wpisują klienci,
• nagłówek nic nie mówi,
• strona nie jest jasno opisana,

to duża część potencjalnych klientów w ogóle na nią nie trafi.`,
                keyElements: [
                    {
                        title: 'Słowa kluczowe (keywords)',
                        description: 'Frazy, które wpisuje klient',
                        points: [
                            'np. „catering na urodziny", „zestawy z dowozem", „menu na małe przyjęcie"',
                            'Naturalne wplecenie w tytuł, nagłówki, pierwszy akapit i wybrane fragmenty opisu'
                        ],
                        icon: 'keywords'
                    },
                    {
                        title: 'Tytuł i nagłówki (H1, H2, H3)',
                        description: 'Struktura treści pomagająca użytkownikowi i wyszukiwarce',
                        points: [
                            'H1 – główny tytuł strony (np. „Catering dla firm – lunch z dostawą w Twoim mieście")',
                            'H2 / H3 – nagłówki sekcji (np. „Dlaczego firmy wybierają nasze menu")'
                        ],
                        icon: 'headings'
                    },
                    {
                        title: 'Opis meta (meta description)',
                        description: 'Krótki opis wyświetlany w wynikach wyszukiwania',
                        points: [
                            'Powinien zawierać główną frazę i zachęcać do kliknięcia',
                            'np. „Catering na małe przyjęcia: menu na 10–30 osób, dostawa na czas, opcje wege. Sprawdź termin realizacji i złóż zapytanie."'
                        ],
                        icon: 'meta'
                    },
                    {
                        title: 'Treść główna (body)',
                        description: 'Tekst podzielony na sekcje, czytelny, bez „ściany tekstu"',
                        points: [
                            'Krótkie akapity, wypunktowania, podkreślenie najważniejszych korzyści'
                        ],
                        icon: 'content-seo'
                    },
                    {
                        title: 'Linki wewnętrzne',
                        description: 'Odsyłacze do innych podstron w ramach strony',
                        points: [
                            'Z bloga do oferty, z oferty do formularza kontaktowego, z „o nas" do „menu"',
                            'Pomagają użytkownikowi i ułatwiają robotom Google zrozumienie struktury witryny'
                        ],
                        icon: 'links'
                    },
                    {
                        title: 'Zdjęcia i opisy alternatywne (alt)',
                        description: 'Nazwy plików i teksty alt opisujące zdjęcia',
                        points: [
                            'Nazwa pliku: „zestaw-cateringowy-na-20-osob.jpg" zamiast „IMG_1234.jpg"',
                            'Tekst alt: „Zestaw cateringowy na 20 osób – przystawki i dania ciepłe"'
                        ],
                        icon: 'images-seo'
                    }
                ],
                practicalExamples: [
                    {
                        title: 'Przykład 1 – podstrona „Catering" na stronie firmy',
                        description: `Zamiast krótkiego, ogólnego opisu:

„Oferujemy catering na różne okazje."

lepsza wersja pod SEO i użytkownika:

„Oferujemy catering na komunie, urodziny i małe przyjęcia firmowe w mieście i okolicy.

W menu znajdziesz przystawki, dania ciepłe i desery w wariantach klasycznych i wege.

Jeśli szukasz cateringu na 10–30 osób z dostawą na czas – sprawdź dostępne terminy realizacji."`,
                        effect: 'Tu pojawiają się naturalnie frazy: „catering na komunie", „catering na urodziny", „menu na 10–30 osób", „dostawa na czas".'
                    },
                    {
                        title: 'Przykład 2 – oferta dla firm',
                        description: `Sucha wersja:

„Obsługujemy firmy."

Wersja zoptymalizowana:

„Specjalizujemy się w lunchach dla firm i przerwach kawowych na spotkania i szkolenia.

Oferujemy menu tygodniowe z dostawą, opcje wege oraz możliwość rozliczeń z fakturą VAT.

Jeśli szukasz stałego cateringu dla zespołu, skontaktuj się z nami – przygotujemy indywidualną ofertę."`,
                        effect: 'Frazy: „lunch dla firm", „przerwy kawowe", „catering z dostawą", „oferta dla zespołu".'
                    },
                    {
                        title: 'Przykład 3 – artykuł na blogu (lokalny SEO)',
                        description: `Temat: „Jak zaplanować przyjęcie rodzinne w domu"

Zamiast ogólnego tekstu:

„Zapraszamy do naszego cateringu, mamy smaczne jedzenie."

lepsza wersja:

„Planujesz przyjęcie w domu i szukasz sprawdzonego cateringu na 15–20 osób?

Podpowiadamy, jak dobrać menu, ile porcji zaplanować i jak zorganizować dostawę, żeby wszystko było gotowe na czas.

Na końcu znajdziesz checklistę, która ułatwia przygotowania."`,
                        effect: 'Tutaj tekst może być dłuższy, ale od początku jasno wynika: dla kogo, w jakiej sytuacji i jaką korzyść daje.'
                    }
                ],
                roleDescription: `Prosta checklista SEO dla pojedynczej podstrony:

Przed publikacją treści zadaj sobie te pytania:

1. Czy w tytule i pierwszym akapicie jest konkret, a nie ogólnik?

2. Czy w treści naturalnie występują 2–3 główne frazy, które wpisuje klient w Google?

3. Czy nagłówki jasno mówią, co jest w danej sekcji?

4. Czy są linki do innych ważnych podstron (np. cennik, kontakt, zamówienie)?

5. Czy zdjęcia mają sensowne nazwy i opisy (alt)?

Jeśli odpowiedź na większość pytań brzmi „tak" – treść jest na podstawowym poziomie przygotowana pod SEO.`,
                quiz: [
                    {
                        id: 'q1',
                        type: 'choice',
                        question: 'Co NAJBARDZIEJ pomaga wyszukiwarce zrozumieć, o czym jest konkretna podstrona?',
                        options: [
                            'Ilość zdjęć na stronie',
                            'Tylko długość tekstu',
                            'Tytuł, nagłówki i logiczna struktura treści',
                            'Kolorystyka i szata graficzna'
                        ],
                        correctAnswer: 2,
                        hint: 'Pomyśl o elementach, które pomagają wyszukiwarkom zrozumieć strukturę i tematykę treści...',
                        feedback: 'Dokładnie tak – tytuł, nagłówki i logiczna struktura treści to kluczowe elementy, które pomagają wyszukiwarce zrozumieć, o czym jest podstrona.'
                    },
                    {
                        id: 'q2',
                        type: 'choice',
                        question: 'Który opis jest lepiej przygotowany pod SEO (przy założeniu, że chcesz pozyskiwać klientów firmowych)?',
                        options: [
                            '„Zapraszamy do naszego cateringu, mamy dobre jedzenie."',
                            '„Oferujemy lunch dla firm: menu tygodniowe z dostawą, opcje wege i możliwość faktury VAT."',
                            '„U nas jest miło, spokojnie i komfortowo dla każdego."',
                            '„Nasza firma działa od 15 lat i ma wygodną lokalizację."'
                        ],
                        correctAnswer: 1,
                        hint: 'Pomyśl o opisie, który zawiera konkretne frazy kluczowe i szczegóły istotne dla firm...',
                        feedback: 'Zgadza się – ten opis zawiera konkretne frazy kluczowe oraz szczegóły istotne dla tej grupy docelowej.'
                    },
                    {
                        id: 'q3',
                        type: 'choice',
                        question: 'Który element JEST przykładem optymalizacji SEO?',
                        options: [
                            'Zmienienie koloru przycisku „Zamów" z niebieskiego na czerwony',
                            'Dodanie większej liczby zdjęć bez opisów',
                            'Skrócenie tekstu o połowę, bez zmiany treści',
                            'Uzupełnienie opisu meta i nagłówków o frazy, które wpisują klienci w Google'
                        ],
                        correctAnswer: 3,
                        hint: 'Pomyśl o elementach, które bezpośrednio wpływają na widoczność w wynikach wyszukiwania...',
                        feedback: 'Dokładnie – uzupełnienie opisu meta i nagłówków o frazy, które wpisują klienci w Google, to kluczowy element optymalizacji SEO.'
                    },
                    {
                        id: 'q4',
                        type: 'multi-task',
                        question: `Masz stronę z opisem oferty:

„Zapraszamy do naszego cateringu. Mamy menu na różne okazje. Dostawa na terenie miasta. Skontaktuj się z nami."

Twoim zadaniem jest zoptymalizować ten tekst pod SEO. Wykonaj poniższe 3 zadania:`,
                        subTasks: [
                            {
                                id: 'q4-1',
                                title: 'Zadanie 1: Główna fraza kluczowa',
                                description: 'Wymyśl główną frazę, na którą chcesz się wyświetlać w Google.\nPrzykład: „catering na komunię w mieście X"',
                                keywords: [
                                    'catering',
                                    'menu',
                                    'zestawy',
                                    'dostawa',
                                    'miasto',
                                    'przyjęcie',
                                    'fraza',
                                    'kluczowa'
                                ],
                                hint: 'Pomyśl o konkretnej frazie, którą wpisują klienci szukając Twojej oferty...'
                            },
                            {
                                id: 'q4-2',
                                title: 'Zadanie 2: Tytuł (H1)',
                                description: 'Napisz na nowo tytuł (H1) tej podstrony, używając wybranej frazy kluczowej.',
                                keywords: [
                                    'tytuł',
                                    'h1',
                                    'nagłówek',
                                    'fraza',
                                    'kluczowa'
                                ],
                                hint: 'Tytuł powinien zawierać główną frazę kluczową i być konkretny...'
                            },
                            {
                                id: 'q4-3',
                                title: 'Zadanie 3: Opis (4–6 zdań)',
                                description: `Napisz 4–6 zdań opisu, w którym:
• naturalnie użyjesz wybranej frazy kluczowej,
• dodasz 2–3 konkretne informacje (np. obszar dowozu, minimalna liczba osób, przykładowe zestawy),
• zakończysz wezwaniem do działania (np. „Sprawdź termin realizacji").`,
                                keywords: [
                                    'opis',
                                    'treść',
                                    'fraza',
                                    'kluczowa',
                                    'informacje',
                                    'dostawa',
                                    'menu',
                                    'zestawy',
                                    'wezwanie',
                                    'działanie',
                                    'zamów',
                                    'sprawdź',
                                    'terminy'
                                ],
                                hint: 'Pomyśl o konkretnych informacjach, które są ważne dla klientów i naturalnie wpleć frazę kluczową...'
                            }
                        ],
                        feedback: 'Dziękuję za odpowiedź. To ćwiczenie pomoże Ci lepiej zrozumieć, jak optymalizować treści pod SEO, używając konkretnych fraz kluczowych i strukturyzując treść.'
                    }
                ]
            }
        ]
    },
    {
        id: '3',
        title: 'Reklama online',
        icon: 'megaphone',
        lessons: [
            {
                id: '3.1',
                moduleId: '3',
                title: 'Tworzenie skutecznych kampanii na Facebooku i Instagramie',
                intro: `Reklamy płatne w mediach społecznościowych (Facebook / Instagram Ads) pozwalają dotrzeć z ofertą dokładnie do osób, które są dla Ciebie najważniejsze – według lokalizacji, wieku, zainteresowań czy zachowań.

Dla firmy z branży gastro/event oznacza to możliwość pokazania oferty osobom, które:

• mieszkają w określonym promieniu od Twojej lokalizacji lub w konkretnych miastach,

• interesują się wydarzeniami rodzinnymi, cateringiem, jedzeniem z dowozem, lokalnymi eventami,

• szukają cateringu na przyjęcie, spotkanie firmowe lub event z dostawą.`,
                whyImportant: [
                    {
                        title: 'Szybka budowa rozpoznawalności',
                        description: 'Pomagają szybko zbudować rozpoznawalność firmy na rynku',
                        points: [],
                        icon: 'visibility'
                    },
                    {
                        title: 'Wypełnianie konkretnych terminów',
                        description: 'Pozwalają wypełniać konkretne terminy realizacji (np. dni robocze poza sezonem)',
                        points: [],
                        icon: 'target'
                    },
                    {
                        title: 'Testowanie różnych ofert',
                        description: 'Umożliwiają testowanie różnych ofert (menu na X osób, zestawy, lunch dla firm)',
                        points: [],
                        icon: 'analytics'
                    },
                    {
                        title: 'Dotarcie do nowych klientów',
                        description: 'Pozwalają dotrzeć do osób spoza Twojej miejscowości, które inaczej by o Tobie nie usłyszały',
                        points: [],
                        icon: 'traffic'
                    },
                    {
                        title: 'Kontrola nad kosztami',
                        description: 'Dają dużą kontrolę nad kosztami – możesz zacząć od małego budżetu dziennego i zwiększać go dopiero wtedy, gdy kampania przynosi efekt',
                        points: [],
                        icon: 'cost-seo'
                    }
                ],
                whyImportantFooter: `Bez płatnych kampanii jesteś w dużej mierze zależny od:

• przypadkowego ruchu organicznego,

• poleceń „z ust do ust",

• spontanicznych wyszukiwań w Google.

Z kampaniami płatnymi możesz świadomie „włączać" i „wzmacniać" widoczność wybranych ofert wtedy, kiedy najbardziej ich potrzebujesz.`,
                practicalExamples: [
                    {
                        title: 'Przykład praktyczny 1 – „Catering na komunię"',
                        description: `Firma cateringowa ma wolne terminy w wybrane weekendy poza głównym sezonem.

Parametry kampanii:

• grupa docelowa: osoby w wieku 28–45 lat, mieszkające w promieniu do 30 km, zainteresowane tematami „komunia", „urodziny", „przyjęcia rodzinne",

• cel kampanii: kliknięcia w stronę z ofertą „Catering na komunię",

• treść reklamy:

• opis: „Menu na komunię dla 15–30 osób, dostawa na czas, opcje klasyczne i wege",

• grafika: realne zdjęcie stołu z gotowym zestawem,

• wezwanie do działania: „Sprawdź termin realizacji".`,
                        effect: 'Reklama trafia do osób, które realnie planują przyjęcie i szukają sprawdzonego cateringu w swojej okolicy.'
                    },
                    {
                        title: 'Przykład praktyczny 2 – „Lunch dla firm i przerwy kawowe"',
                        description: `Firma cateringowa chce dotrzeć do przedsiębiorstw organizujących szkolenia i spotkania.

Parametry kampanii:

• grupa docelowa: osoby w wieku 25–60 lat, zainteresowane tematami „zarządzanie firmą", „szkolenia", „eventy", mieszkające w wybranych miastach (siedziby firm),

• cel kampanii: pozyskanie zapytań ofertowych (kliknięcie w formularz / kontakt mailowy),

• treść reklamy:

• opis: „Lunch dla firm z dostawą, przerwy kawowe, faktura VAT. Elastyczne menu",

• grafika: zdjęcie zestawu lunchowego i przerwy kawowej,

• wezwanie do działania: „Napisz, przygotuję ofertę dla Twojej firmy".`,
                        effect: 'Zamiast czekać, aż firma przypadkiem trafi na stronę, catering aktywnie wychodzi z ofertą do osób decyzyjnych.'
                    }
                ],
                keyElements: [
                    {
                        title: 'Jasno określony cel kampanii',
                        description: 'Co chcesz osiągnąć w tej konkretnej kampanii',
                        points: [
                            'więcej wejść na stronę oferty',
                            'więcej zapytań o termin realizacji',
                            'więcej telefonów / wiadomości',
                            'większą rozpoznawalność firmy w danym mieście / regionie'
                        ],
                        icon: 'target'
                    },
                    {
                        title: 'Precyzyjna grupa docelowa',
                        description: 'Kto ma zobaczyć tę reklamę',
                        points: [
                            'pary planujące kameralne spotkanie',
                            'rodziny z dziećmi',
                            'firmy zamawiające lunch',
                            'organizatorzy szkoleń / wydarzeń'
                        ],
                        icon: 'audience'
                    },
                    {
                        title: 'Konkretna oferta i komunikat',
                        description: 'Co dokładnie proponujesz',
                        points: [
                            '„Menu na 10–20 osób z dostawą"',
                            '„Pakiet cateringowy na przyjęcie rodzinne"',
                            '„Lunch dla firm z fakturą VAT"',
                            'Dlaczego ma to znaczenie dla klienta (korzyść, wygoda, oszczędność czasu / pieniędzy)'
                        ],
                        icon: 'benefits'
                    },
                    {
                        title: 'Dobra kreacja (grafika + tekst)',
                        description: 'Elementy skutecznej kreacji',
                        points: [
                            'zdjęcie pokazujące rzeczywisty standard realizacji',
                            'krótki, czytelny tekst bez żargonu',
                            'wyraźne wezwanie do działania („Sprawdź termin realizacji", „Napisz wiadomość", „Zamów catering")'
                        ],
                        icon: 'content'
                    },
                    {
                        title: 'Budżet i czas trwania kampanii',
                        description: 'Planowanie budżetu',
                        points: [
                            'start od niewielkiego budżetu dziennego (np. 20–40 zł)',
                            'minimum kilka–kilkanaście dni na przetestowanie skuteczności'
                        ],
                        icon: 'cost-seo'
                    },
                    {
                        title: 'Spójność reklamy i miejsca docelowego',
                        description: 'Zapewnienie spójności',
                        points: [
                            'jeżeli reklamujesz „catering na komunię" – użytkownik po kliknięciu powinien trafić dokładnie na stronę z opisem tego pakietu, a nie na ogólną stronę główną'
                        ],
                        icon: 'experience'
                    }
                ],
                checklist: [
                    {
                        id: 'check-1',
                        text: 'Czy cel kampanii jest jasno określony i jeden na kampanię?'
                    },
                    {
                        id: 'check-2',
                        text: 'Czy wiesz dokładnie, do kogo kierujesz tę konkretną ofertę?'
                    },
                    {
                        id: 'check-3',
                        text: 'Czy treść reklamy jasno mówi: co, dla kogo, w jakiej cenie / na jakich warunkach?'
                    },
                    {
                        id: 'check-4',
                        text: 'Czy grafika jest wyraźna, aktualna i pokazuje Twoją ofertę, a nie przypadkowe zdjęcie z banku zdjęć?'
                    },
                    {
                        id: 'check-5',
                        text: 'Czy miejsce, do którego kierujesz użytkownika po kliknięciu, jest spójne z reklamą i łatwe w obsłudze (strona / formularz / wiadomość)?'
                    },
                    {
                        id: 'check-6',
                        text: 'Czy masz zaplanowane minimum kilka dni na obserwację wyników i drobne korekty (zamiast zmieniać wszystko po 1–2 dniach)?'
                    }
                ],
                quiz: [
                    {
                        id: 'q1',
                        type: 'choice',
                        question: 'Co jest fundamentem skutecznej kampanii reklamowej na Facebooku / Instagramie dla firmy cateringowej?',
                        options: [
                            'Jak najwyższy budżet reklamowy',
                            'Precyzyjnie określony cel i grupa docelowa',
                            'Jak największa liczba różnych grafik',
                            'Publikowanie reklam wyłącznie w weekendy'
                        ],
                        correctAnswer: 1,
                        feedback: 'Dokładnie tak – fundamentem skutecznej kampanii jest precyzyjnie określony cel i dobrze zdefiniowana grupa docelowa.'
                    },
                    {
                        id: 'q2',
                        type: 'choice',
                        question: 'Który przykład najlepiej opisuje przemyślaną ofertę reklamową?',
                        options: [
                            '„Zapraszamy do naszego cateringu, mamy wolne terminy."',
                            '„Catering w centrum miasta, zestawy 2-osobowe, szczegóły na stronie."',
                            '„Menu na 15–20 osób: dostawa na czas, opcje wege, elastyczne zestawy. Sprawdź termin realizacji."',
                            '„Kliknij, żeby zobaczyć nasz profil na Facebooku."'
                        ],
                        correctAnswer: 2,
                        feedback: 'Dokładnie tak – przemyślana oferta reklamowa zawiera konkretne informacje (co, dla kogo, na jakich warunkach) i jasne wezwanie do działania.'
                    },
                    {
                        id: 'q3',
                        type: 'choice',
                        question: 'Dlaczego warto zaczynać kampanię od mniejszego budżetu dziennego (np. 20–40 zł)?',
                        options: [
                            'Bo niższy budżet automatycznie poprawia jakość reklamy',
                            'Bo wtedy reklama nie wyświetli się zbyt często',
                            'Bo pozwala bez dużego ryzyka przetestować grupy odbiorców i kreacje przed zwiększeniem wydatków',
                            'Bo Facebook nie pozwala na wyższe budżety dla nowych kont'
                        ],
                        correctAnswer: 2,
                        feedback: 'Dokładnie tak – zaczynanie od mniejszego budżetu pozwala na bezpieczne testowanie różnych grup docelowych i kreacji przed zwiększeniem wydatków.'
                    }
                ]
            },
            {
                id: '3.2',
                moduleId: '3',
                title: 'Analiza wyników kampanii',
                intro: `Samo uruchomienie kampanii reklamowej na Facebooku czy Instagramie to dopiero początek. Prawdziwa praca zaczyna się wtedy, gdy zaczynamy regularnie sprawdzać wyniki i na tej podstawie podejmować decyzje:

• co zostawić,

• co zmienić,

• co wyłączyć,

• w co zainwestować więcej.

Analiza wyników kampanii pozwala zamienić „strzelanie na ślepo” w świadome, oparte na danych decyzje marketingowe.`,
                whyImportant: [
                    {
                        title: 'Nie każda reklama działa tak samo',
                        description: 'Różne grupy odbiorców reagują na inne komunikaty i formy',
                        points: [
                            'to, co działa zimą, nie musi działać latem',
                            'różne cele (menu na weekend, firmy, rodziny) mają różne wyniki'
                        ],
                        icon: 'target'
                    },
                    {
                        title: 'Bez analizy tracisz budżet',
                        description: 'Płacisz za kliknięcia, które nie prowadzą do zamówień',
                        points: [
                            'ładne kreacje nie zawsze działają',
                            'brak danych = brak pewności, czy pieniądze pracują'
                        ],
                        icon: 'cost-seo'
                    },
                    {
                        title: 'Z analizą podejmujesz świadome decyzje',
                        description: 'Przesuwasz budżet do kampanii, które działają najlepiej',
                        points: [
                            'wyłączasz słabe kampanie',
                            'poprawiasz wyniki krok po kroku zamiast zaczynać od zera'
                        ],
                        icon: 'analytics'
                    }
                ],
                keyElements: [
                    {
                        title: 'CTR (Click-Through Rate)',
                        description: 'Pokazuje, jaki procent osób kliknął reklamę',
                        points: [
                            'niski CTR = słaba grafika lub zbyt ogólny tekst',
                            'warto porównywać CTR między kampaniami'
                        ],
                        icon: 'visibility'
                    },
                    {
                        title: 'CPC (Cost Per Click)',
                        description: 'Średni koszt jednego kliknięcia',
                        points: [
                            'pomaga porównywać kampanie',
                            'nie jest celem samym w sobie, ale sygnałem efektywności'
                        ],
                        icon: 'cost-seo'
                    },
                    {
                        title: 'Konwersje / zapytania / zamówienia',
                        description: 'Najważniejszy wskaźnik realnych efektów',
                        points: [
                            'połącz dane z reklam z formularzem / skrzynką / systemem zamówień',
                            'licz nie tylko kliknięcia, ale też ile osób napisało lub zadzwoniło'
                        ],
                        icon: 'cta'
                    },
                    {
                        title: 'Koszt pozyskania zapytania (CPA)',
                        description: 'Ile realnie kosztuje Cię jedno zapytanie lub zamówienie',
                        points: [
                            'ten wskaźnik mówi, czy kampania ma sens biznesowo',
                            'łatwiej porównywać różne kampanie i oferty'
                        ],
                        icon: 'benefits'
                    },
                    {
                        title: 'Zasięg i częstotliwość',
                        description: 'Jak szeroko i jak często widzą reklamę Twoi odbiorcy',
                        points: [
                            'wysoka częstotliwość + brak efektów = reklama męczy odbiorców',
                            'czasem wystarczy odświeżyć kreację'
                        ],
                        icon: 'traffic'
                    }
                ],
                practicalExamples: [
                    {
                        title: 'Przykład 1 – kampania „Menu na weekend”',
                        description: `Prowadzisz dwie kampanie równolegle:

• Kampania A – reklama z jednym zdjęciem zestawu cateringowego,

• Kampania B – reklama z krótkim wideo pokazującym przygotowanie i pakowanie zamówień.

Po 10 dniach:

• Kampania A: CTR 1,2%, koszt kliknięcia 1,80 zł, 3 zapytania,

• Kampania B: CTR 2,9%, koszt kliknięcia 1,10 zł, 9 zapytań.`,
                        effect: 'Wideo działa lepiej – zwiększasz budżet Kampanii B i testujesz kolejne warianty wideo.'
                    },
                    {
                        title: 'Przykład 2 – lunch dla firm',
                        description: `Prowadzisz kampanię lunchy dla firm:

• Grupa docelowa 1: osoby mieszkające w Twoim powiecie,

• Grupa docelowa 2: osoby mieszkające w innych miastach, gdzie są siedziby firm.

Po 2 tygodniach:

• Grupa 1: wysoki CTR, ale mało zamówień,

• Grupa 2: mniej kliknięć, ale więcej konkretnych zapytań.`,
                        effect: 'Przenosisz większą część budżetu na grupę 2, a dla grupy 1 tworzysz inną kampanię (np. wizerunkową).'
                    }
                ],
                roleDescriptionTitle: 'Prosty schemat analizy po 7–14 dniach kampanii',
                roleDescription: `1. Sprawdź, która kampania ma wyższy CTR i niższy koszt kliknięcia.
2. Zobacz, z których kampanii / zestawów reklam realnie przychodzą zapytania / zamówienia.
3. Zadaj sobie pytania:
• Czy reklama jest spójna z ofertą na stronie?
• Czy cena, którą pokazujesz, jest jasna i zrozumiała?
• Czy kierujesz reklamę do właściwej grupy (nie za szeroko)?
4. Przesuń budżet do najlepiej działających kampanii / zestawów.
5. Wyłącz kampanie, które mają wysokie koszty i brak efektów (po przetestowaniu ich przez kilka dni).`,
                additionalInfoTitle: 'Najczęstsze błędy przy analizie wyników',
                additionalInfo: `• Wyciąganie wniosków po 1–2 dniach emisji.
• Ocenianie kampanii tylko po „polubieniach”, bez spojrzenia na zapytania i zamówienia.
• Niewykorzystywanie danych do zmian – kampania „idzie, bo już jest włączona”.
• Porównywanie wyników kampanii o różnych celach.`,
                quiz: [
                    {
                        id: 'q1',
                        type: 'choice',
                        question: 'Który wskaźnik najlepiej pokazuje, czy reklama jest atrakcyjna dla odbiorców?',
                        options: [
                            'Liczba polubień strony',
                            'CTR (współczynnik kliknięć)',
                            'Łączny zasięg kampanii',
                            'Liczba wyświetleń reklamy'
                        ],
                        correctAnswer: 1,
                        feedback: 'CTR pokazuje, jaki procent odbiorców kliknął reklamę, więc najlepiej wskazuje atrakcyjność kreacji.'
                    },
                    {
                        id: 'q2',
                        type: 'choice',
                        question: 'Co oznacza „koszt pozyskania zapytania / zamówienia” (CPA)?',
                        options: [
                            'Łączna kwota wydana na reklamy w danym miesiącu',
                            'Średni koszt jednego wyświetlenia reklamy',
                            'Średni koszt kampanii w ciągu jednego dnia',
                            'Ile średnio kosztuje jedno zapytanie lub zamówienie wygenerowane przez kampanię'
                        ],
                        correctAnswer: 3,
                        feedback: 'CPA pokazuje, ile realnie płacisz za konkretne działanie klienta (zapytanie, zamówienie).'
                    },
                    {
                        id: 'q3',
                        type: 'choice',
                        question: 'Po 10 dniach kampanii widzisz, że reklama ma dużo kliknięć, ale mało zapytań. Co robisz?',
                        options: [
                            'Zostawiam kampanię bez zmian',
                            'Zwiększam budżet, aby było więcej kliknięć',
                            'Sprawdzam treść reklamy i stronę docelową, zmieniam ofertę lub grupę docelową',
                            'Wyłączam wszystkie reklamy'
                        ],
                        correctAnswer: 2,
                        feedback: 'Należy sprawdzić spójność reklamy i strony docelowej oraz dopracować ofertę lub targetowanie.'
                    },
                    {
                        id: 'q4',
                        type: 'open',
                        question: 'Jakie trzy konkretne wnioski chcesz wyciągać z wyników swoich kampanii i jak pomogą Ci podejmować decyzje?',
                        keywords: [
                            'wnioski',
                            'działa',
                            'nie działa',
                            'budżet',
                            'target',
                            'oferta',
                            'decyzje'
                        ],
                        hint: 'Pomyśl o tym, co chcesz wiedzieć po analizie: które reklamy działają, jakie grupy warto rozwijać, czego unikać.',
                        feedback: 'Świadome wnioski z kampanii pomagają inwestować w to, co działa, i unikać marnowania budżetu.'
                    }
                ]
            }
        ]
    },
    {
        id: '4',
        title: 'Social media marketing i Budowanie relacji z klientami',
        icon: 'users',
        lessons: [
            {
                id: '4.1',
                moduleId: '4',
                title: 'Zarządzanie opiniami i recenzjami online',
                intro: `Opinie i recenzje online (Google, Facebook, portale zamówień) są dziś jednym z najważniejszych czynników wpływających na decyzje klientów. Zanim ktoś zadzwoni, napisze maila czy złoży zamówienie, bardzo często najpierw sprawdza średnią ocen i kilka ostatnich komentarzy.`,
                whyImportant: [
                    {
                        title: 'Zwiększenie liczby zamówień',
                        description: 'Wyższa średnia ocena = większe zaufanie',
                        points: [],
                        icon: 'target'
                    },
                    {
                        title: 'Wyróżnienie się na tle konkurencji',
                        description: 'Nawet przy podobnym standardzie obsługi',
                        points: [],
                        icon: 'visibility'
                    },
                    {
                        title: 'Szybsze wyłapywanie problemów',
                        description: 'Powtarzające się problemy (np. punktualność, kompletność zamówień, temperatura dań) i realna poprawa jakości usług',
                        points: [],
                        icon: 'analytics'
                    },
                    {
                        title: 'Budowanie wizerunku',
                        description: 'Firma jako miejsce, które słucha klientów i reaguje na uwagi',
                        points: [],
                        icon: 'trust'
                    }
                ],
                whyImportantFooter: `Brak reakcji na opinie lub emocjonalne odpowiedzi:

• obniża zaufanie nowych klientów,

• może sprawiać wrażenie chaosu organizacyjnego lub braku profesjonalizmu,

• wzmacnia negatywne wrażenie po pojedynczym, złym doświadczeniu.`,
                practicalExamples: [
                    {
                        title: 'Przykład praktyczny 1 – firma cateringowa',
                        description: `Klient wystawia opinię 3/5 na Google:

„Jedzenie smaczne, ale dostawa spóźniona o 30 minut. Część dań była już letnia."

Słaba reakcja: brak odpowiedzi albo krótka, defensywna wiadomość w stylu:

„Był korek, nic na to nie poradzimy."

Profesjonalna reakcja:

• podziękowanie za opinię,

• krótkie odniesienie się do uwag,

• zaznaczenie, co firma robi, aby poprawić sytuację,

• zaproszenie do kontaktu bezpośredniego.

Przykładowa odpowiedź:

„Dziękujemy za podzielenie się opinią. Cieszymy się, że smak był na plus. Opóźnienie i temperatura dań to dla nas ważna uwaga – wprowadzamy lepsze planowanie tras i dodatkowe termo-opakowania. Będziemy wdzięczni za kontakt bezpośredni, żeby lepiej zrozumieć szczegóły realizacji i zaproponować rekompensatę przy kolejnym zamówieniu."`,
                        effect: 'Taka odpowiedź pokazuje, że firma słucha, sygnalizuje działania naprawcze i buduje zaufanie u wszystkich, którzy czytają opinię, nie tylko u jednej osoby.'
                    },
                    {
                        title: 'Przykład praktyczny 2 – powtarzający się problem',
                        description: `Jeżeli w kilku opiniach z rzędu pojawia się motyw: „za małe porcje", „brakuje świeżych dodatków", „ciągle to samo menu", to:

• nie wystarczy lepsza odpowiedź,

• konieczna jest realna zmiana (np. rotacja dań, większe porcje, lepsze pakowanie).

Po wprowadzeniu zmiany warto:

• poprosić kolejnych zadowolonych klientów o wystawienie opinii,

• sprawdzić, czy nowym recenzjom towarzyszy np. sformułowanie „porcje się poprawiły", „jest większy wybór".`,
                        effect: 'Systematyczne reagowanie na powtarzające się problemy i wprowadzanie realnych zmian buduje długoterminową reputację i zaufanie klientów.'
                    }
                ],
                roleDescription: `1. Odpowiadaj na większość opinii, nie tylko na skrajnie negatywne.

2. Na negatywne opinie odpowiadaj szybko, ale spokojnie.

3. Nie przerzucaj winy na klienta w publicznej odpowiedzi.

4. Aktywnie zachęcaj zadowolonych klientów do wystawiania opinii (np. po realizacji lub dostawie).

5. Monitoruj średnią ocenę oraz powtarzające się motywy i traktuj je jak darmowe badanie satysfakcji.`,
                roleDescriptionTitle: 'Dobre praktyki zarządzania opiniami',
                quiz: [
                    {
                        id: 'q1',
                        type: 'choice',
                        question: 'Jak powinna reagować profesjonalna firma na negatywną opinię online?',
                        options: [
                            'Ignorować ją, żeby „nie robić szumu"',
                            'Odpowiedzieć profesjonalnie, podziękować za opinię, przeprosić i zaproponować rozwiązanie',
                            'Usunąć opinię, jeśli to możliwe',
                            'Odpowiedzieć emocjonalnie, tłumacząc, że klient przesadza'
                        ],
                        correctAnswer: 1,
                        feedback: 'Dokładnie tak – profesjonalna odpowiedź na negatywną opinię pokazuje zaangażowanie w satysfakcję klienta i może przekształcić negatywną sytuację w pozytywną.'
                    },
                    {
                        id: 'q2',
                        type: 'choice',
                        question: 'Które z poniższych działań najlepiej pomaga zwiększyć liczbę pozytywnych opinii?',
                        options: [
                            'Czekanie, aż klienci sami z siebie napiszą recenzję',
                            'Prośba o opinię tylko wtedy, gdy ktoś narzeka',
                            'Systematyczne, uprzejme proszenie zadowolonych klientów o pozostawienie opinii (np. po realizacji, w mailu po zamówieniu)',
                            'Oferowanie rabatu w zamian za wyłącznie 5-gwiazdkowe opinie'
                        ],
                        correctAnswer: 2,
                        feedback: 'Dokładnie tak – systematyczne, uprzejme proszenie zadowolonych klientów o opinie jest najlepszą praktyką, która naturalnie zwiększa liczbę pozytywnych recenzji.'
                    },
                    {
                        id: 'q3',
                        type: 'choice',
                        question: 'Które stwierdzenie najlepiej opisuje rolę recenzji online w działalności firmy cateringowej?',
                        options: [
                            'Mają znaczenie tylko dla turystów zagranicznych',
                            'Są ważne głównie po to, żeby „ładnie wyglądały" w wyszukiwarce',
                            'Silnie wpływają na decyzje zakupowe i są jednym z kluczowych źródeł informacji dla nowych klientów',
                            'Są mniej istotne niż ulotki i ogłoszenia drukowane'
                        ],
                        correctAnswer: 2,
                        feedback: 'Dokładnie tak – recenzje online silnie wpływają na decyzje zakupowe i są jednym z pierwszych źródeł informacji, które sprawdzają potencjalni klienci przed zamówieniem.'
                    }
                ]
            },
            {
                id: '4.2',
                moduleId: '4',
                title: 'Komunikacja z klientami w mediach społecznościowych',
                intro: `Dla wielu osób Facebook czy Instagram to pierwszy punkt kontaktu z firmą. Zanim zadzwonią lub napiszą maila, szybciej wyślą wiadomość na Messengerze albo skomentują post. To oznacza, że sposób odpowiedzi w social mediach bardzo często decyduje o tym, czy klient zrobi kolejny krok (zapytanie o ofertę, zamówienie, wizyta), czy po prostu przejdzie dalej.`,
                whyImportant: [
                    {
                        title: 'Budowanie zaufania',
                        description: 'Firma jest „żywa", reaguje, odpowiada',
                        points: [],
                        icon: 'trust'
                    },
                    {
                        title: 'Wzmacnianie wizerunku',
                        description: 'Profesjonalne, uporządkowane miejsce',
                        points: [],
                        icon: 'visibility'
                    },
                    {
                        title: 'Zmniejszanie nieporozumień',
                        description: 'Np. źle zrozumiane godziny dostaw, zasady zamówień',
                        points: [],
                        icon: 'info'
                    },
                    {
                        title: 'Szybsze domykanie sprzedaży',
                        description: 'Zapytanie → konkretna propozycja → zamówienie',
                        points: [],
                        icon: 'sales'
                    },
                    {
                        title: 'Wpływ na postrzeganie',
                        description: 'Jak Twoją firmę postrzegają osoby, które tylko „podglądają" rozmowy pod postami, ale jeszcze się nie odezwały',
                        points: [],
                        icon: 'relations'
                    }
                ],
                whyImportantFooter: `Brak odpowiedzi lub chaotyczne, emocjonalne reakcje:

• zniechęcają do zadawania pytań,

• obniżają poczucie bezpieczeństwa („czy ktoś w ogóle tam ogarnia?"),

• mogą zniechęcić do zamówienia nawet przy dobrych zdjęciach i ofercie.`,
                practicalExamples: [
                    {
                        title: 'Przykład praktyczny 1 – zapytanie na Messengerze',
                        description: `Klient pisze wiadomość:

„Dzień dobry, czy macie wolny termin na catering na urodziny w przyszłą sobotę? Interesuje mnie menu na 15–20 osób z dostawą."

Słaba odpowiedź (zbyt ogólna, opóźniona):

• odpowiedź po 2 dniach,

• treść: „Proszę dzwonić w godzinach 9–17."

Lepsza odpowiedź:

• odpowiedź w ciągu kilku godzin w godzinach pracy,

• treść konkretna i uporządkowana:

„Dzień dobry, dziękujemy za wiadomość. W terminie przyszła sobota mamy jeszcze dostępny slot na realizację.

Menu na 15–20 osób: od 49 zł/os., dostawa w cenie na terenie miasta.

Możemy od razu potwierdzić termin realizacji – proszę o orientacyjną liczbę osób i preferowany zakres godzin dostawy. W razie pytań chętnie pomogę."`,
                        effect: 'Taka odpowiedź od razu zmniejsza liczbę kolejnych pytań, prowadzi klienta do konkretnej decyzji i pokazuje, że firma jest dostępna i zorganizowana.'
                    },
                    {
                        title: 'Przykład praktyczny 2 – komentarz publiczny',
                        description: `Pod postem pojawia się komentarz:

„Dzwoniłem wczoraj kilka razy i nikt nie odbierał. Słaby kontakt."

Możliwe reakcje:

• Ignorowanie komentarza – pozostawia wrażenie, że firma unika tematu.

• Oburzenie („Przecież nie możemy cały czas siedzieć przy telefonie") – eskaluje problem.

• Profesjonalna odpowiedź:

„Dziękujemy za sygnał. Przepraszamy za trudność z kontaktem – wczoraj w godzinach popołudniowych mieliśmy wzmożony ruch i mogliśmy nie odebrać każdej rozmowy. Prosimy o wiadomość prywatną lub numer telefonu – oddzwonimy dzisiaj i postaramy się wszystko wyjaśnić."

Dodatkowo, po takiej odpowiedzi:

• warto faktycznie oddzwonić,

• sprawdzić, czy w określonych godzinach nie warto wprowadzić prostych usprawnień (np. przekierowanie połączeń, jasna informacja w opisie profilu o godzinach odbierania telefonu).`,
                        effect: 'Profesjonalna odpowiedź na publiczny komentarz pokazuje, że firma słucha, reaguje i dba o klientów, nawet w trudnych sytuacjach.'
                    }
                ],
                roleDescription: `1. Czas reakcji – odpowiadaj możliwie szybko w godzinach pracy; dobry standard to odpowiedź w ciągu kilku godzin (maksymalnie 24 godziny).

2. Ton wypowiedzi – spokojny, uprzejmy, konkretny. Bez emocji, żalu ani ironii, nawet jeśli klient jest nerwowy.

3. Personalizacja – jeżeli to możliwe, zwracaj się po imieniu (jeśli klient je podaje) i nawiązuj do konkretnej sytuacji.

4. Klarowność – krótkie zdania, najważniejsze informacje na początku (termin, cena, dalszy krok).

5. Przenoszenie trudnych tematów do kanału prywatnego – w przypadku skarg szybko zaproponuj przejście do wiadomości prywatnych lub telefonu, ale na komentarz publiczny też odpowiedz.

6. Stałe „następne kroki" – kończ wiadomości jasnym wskazaniem, co klient może zrobić dalej (zadzwonić, wysłać dane do zamówienia, wejść na konkretną stronę).`,
                roleDescriptionTitle: 'Proste zasady dobrej komunikacji w social mediach',
                quiz: [
                    {
                        id: 'q1',
                        type: 'choice',
                        question: 'Jaki standard czasu odpowiedzi jest rozsądny dla małej firmy (gastro, catering, lokalna usługa) w mediach społecznościowych?',
                        options: [
                            'Odpowiedź raz w tygodniu, przy przeglądaniu wiadomości',
                            'Odpowiedź w ciągu kilku godzin w godzinach pracy, maksymalnie do 24 godzin',
                            'Odpowiedź tylko wtedy, gdy klient pisze drugi raz',
                            'Odpowiedź wyłącznie rano, niezależnie od godziny wysłania wiadomości'
                        ],
                        correctAnswer: 1,
                        feedback: 'Dokładnie tak – odpowiedź w ciągu kilku godzin w godzinach pracy (maksymalnie 24 godziny) to dobry standard, który pokazuje zaangażowanie i profesjonalizm.'
                    },
                    {
                        id: 'q2',
                        type: 'choice',
                        question: 'Które z poniższych zachowań najlepiej buduje zaufanie w komunikacji w mediach społecznościowych?',
                        options: [
                            'Krótkie, jednozdaniowe odpowiedzi bez szczegółów',
                            'Ignorowanie komentarzy publicznych, odpowiadanie tylko na wiadomości prywatne',
                            'Uprzejme, konkretne odpowiedzi, dopasowane do sytuacji klienta, z jasnym „co dalej"',
                            'Odpowiadanie klientom tylko wtedy, gdy pytają o cenę'
                        ],
                        correctAnswer: 2,
                        feedback: 'Dokładnie tak – uprzejme, konkretne odpowiedzi dopasowane do sytuacji klienta, z jasnym wskazaniem następnych kroków, budują zaufanie i profesjonalny wizerunek.'
                    },
                    {
                        id: 'q3',
                        type: 'open',
                        question: 'Napisz jedną konkretną zasadę komunikacji z klientami w mediach społecznościowych, którą chciałbyś wprowadzić lub poprawić w swojej firmie (np. „odpowiadamy na wszystkie wiadomości do 4 godzin w godzinach pracy").',
                        keywords: [
                            'czas',
                            'odpowiedź',
                            'godziny',
                            'standard',
                            'zasada',
                            'komunikacja',
                            'reakcja',
                            'wiadomość',
                            'messenger',
                            'facebook',
                            'instagram',
                            'kontakt',
                            'dostępność',
                            'szybko',
                            'natychmiast',
                            '24',
                            '4',
                            '6',
                            '8',
                            '12'
                        ],
                        hint: 'Pomyśl o konkretnej zasadzie, którą możesz wprowadzić w swojej firmie, np. dotyczącej czasu odpowiedzi, tonu komunikacji, personalizacji itp...',
                        feedback: 'Dziękuję za odpowiedź. Konkretne zasady komunikacji pomagają w budowaniu profesjonalnego wizerunku i zaufania klientów.'
                    }
                ]
            }
        ]
    },
    {
        id: '5',
        title: 'E-mail marketing',
        icon: 'mail',
        lessons: [
            {
                id: '5.1',
                moduleId: '5',
                title: 'Tworzenie skutecznych kampanii emailowych',
                intro: `Email marketing, mimo rozwoju social mediów i komunikatorów, nadal jest jednym z najbardziej efektywnych kanałów dotarcia do klientów. To bezpośrednia wiadomość do osoby, która już zostawiła kontakt i w jakimś stopniu jest zainteresowana ofertą.

Dobrze przygotowany email:

• trafia do skrzynki osoby, która zna Twoją firmę,

• może zawierać konkretną propozycję (np. termin, cena, link do zamówienia),

• pozwala budować relację „na spokojnie", poza chaosem mediów społecznościowych.`,
                whyImportant: [
                    {
                        title: 'Docieranie do byłych klientów',
                        description: 'Możesz przypomnieć się przed kolejnym sezonem',
                        points: [],
                        icon: 'remind'
                    },
                    {
                        title: 'Informowanie o nowościach',
                        description: 'Np. nowe menu, pakiety cateringowe, oferta świąteczna',
                        points: [],
                        icon: 'info'
                    },
                    {
                        title: 'Kontrola nad komunikacją',
                        description: 'Nie jesteś zależny od algorytmów Facebooka czy Instagrama',
                        points: [],
                        icon: 'organize'
                    },
                    {
                        title: 'Mierzenie efektów',
                        description: 'Widzisz, kto otworzył wiadomość, kto kliknął, co było interesujące',
                        points: [],
                        icon: 'analytics'
                    }
                ],
                whyImportantFooter: `Bez email marketingu łatwo „zgubić" osoby, które były raz i… zniknęły. Z prostą listą mailingową możesz co jakiś czas przypomnieć im o sobie.`,
                practicalExamples: [
                    {
                        title: 'Przykład praktyczny 1 – firma cateringowa',
                        description: `Załóżmy, że prowadzisz catering w średnim mieście. Po każdej realizacji prosisz klienta o zgodę na zapis do listy mailingowej (np. w formularzu online).

Raz na kwartał możesz wysłać:

• email z informacją o nowych pakietach (np. „Menu na komunię", „Zestawy na spotkania firmowe"),

• prostą propozycję:

„Dla klientów, którzy już u nas zamawiali – 10% rabatu na kolejne zamówienie poza szczytem sezonu."`,
                        effect: 'Część klientów wróci szybciej, niż gdyby miała sama o Tobie pamiętać, a budujesz wrażenie, że „dbasz o stałych klientów", a nie tylko o nowych.'
                    },
                    {
                        title: 'Przykład praktyczny 2 – mały lokalny biznes usługowy',
                        description: `Firma oferująca usługi (np. gabinet fizjoterapii, studio treningowe, szkoła językowa) może:

• zbierać adresy email od klientów przy pierwszej wizycie,

• wysyłać:

• praktyczne porady (np. jak dbać o kręgosłup, jak przygotować dziecko do egzaminu),

• informacje o wolnych terminach,

• przypomnienia o sezonowych usługach.`,
                        effect: 'Dzięki temu klient nie musi sam śledzić profilu w social mediach, a wiadomości trafiają do skrzynki, którą i tak codziennie otwiera.'
                    }
                ],
                keyElements: [
                    {
                        title: 'Relewantna treść',
                        description: 'Wiadomość musi być dopasowana do odbiorcy',
                        points: [
                            'inaczej piszesz do rodziny z dziećmi',
                            'inaczej do pary planującej kameralną kolację'
                        ],
                        icon: 'target'
                    },
                    {
                        title: 'Personalizacja',
                        description: 'Nawet proste wstawienie imienia zwiększa szansę, że wiadomość zostanie przeczytana',
                        points: [
                            '„Panie Janie, mamy dla Pana…"'
                        ],
                        icon: 'relations'
                    },
                    {
                        title: 'Jasny cel',
                        description: 'Każdy email powinien mieć jedno główne zadanie',
                        points: [
                            'zachęcić do zamówienia',
                            'przypomnieć o terminach realizacji',
                            'poinformować o nowości'
                        ],
                        icon: 'goal'
                    },
                    {
                        title: 'Wyraźne wezwanie do działania (CTA)',
                        description: 'Konkretne przykłady',
                        points: [
                            '„Kliknij tutaj, aby sprawdzić dostępne terminy realizacji"',
                            '„Odpowiedz na tego maila, jeśli chcesz złożyć zamówienie w proponowanym terminie"'
                        ],
                        icon: 'cta'
                    },
                    {
                        title: 'Odpowiedni timing',
                        description: 'Wysyłanie w odpowiednim momencie',
                        points: [
                            'przypomnienie o ofercie przed długim weekendem',
                            'informacja o świątecznych zestawach na kilka tygodni przed sezonem'
                        ],
                        icon: 'time'
                    }
                ],
                quiz: [
                    {
                        id: 'q1',
                        type: 'choice',
                        question: 'Co jest kluczowe w skutecznej kampanii emailowej?',
                        options: [
                            'Tylko atrakcyjny, kolorowy design',
                            'Relewantna treść, personalizacja i odpowiedni moment wysyłki',
                            'Wysyłanie jak najdłuższych wiadomości raz w roku',
                            'Wysyłanie tej samej wiadomości do wszystkich, niezależnie od potrzeb'
                        ],
                        correctAnswer: 1,
                        feedback: 'Dokładnie tak – skuteczna kampania emailowa wymaga relewantnej treści dopasowanej do odbiorcy, personalizacji oraz wysłania w odpowiednim momencie.'
                    },
                    {
                        id: 'q2',
                        type: 'choice',
                        question: 'Która z poniższych wiadomości jest lepiej zaprojektowana dla byłych klientów cateringu poza szczytem sezonu?',
                        options: [
                            '„Zapraszamy do naszego cateringu. Mamy wolne terminy."',
                            '„Dzień dobry, mamy promocję. Jak coś, proszę pisać."',
                            '„Dzień dobry Panie Tomaszu, dla klientów, którzy już u nas zamawiali, przygotowaliśmy 10% rabatu na realizacje w listopadzie i grudniu (od poniedziałku do piątku). Jeśli chce Pan sprawdzić dostępne terminy realizacji, proszę kliknąć w ten link lub odpowiedzieć na tego maila."',
                            '„Witam, wysyłamy informację o ofercie. Pozdrawiamy."'
                        ],
                        correctAnswer: 2,
                        feedback: 'Dokładnie tak – najlepsza wiadomość zawiera personalizację (imię), konkretną ofertę (10% rabatu, termin), jasne warunki (od niedzieli do piątku) i wyraźne wezwanie do działania (link lub odpowiedź).'
                    },
                    {
                        id: 'q3',
                        type: 'choice',
                        question: 'Które stwierdzenie najlepiej opisuje rolę listy mailingowej w małej firmie?',
                        options: [
                            'Lista mailingowa jest potrzebna tylko dużym sklepom internetowym.',
                            'Lista mailingowa to zbędny dodatek – wystarczą social media.',
                            'Lista mailingowa to baza kontaktów do osób, które wyraziły zgodę na komunikację i którym można regularnie przypominać o ofercie.',
                            'Lista mailingowa służy wyłącznie do wysyłania świątecznych życzeń.'
                        ],
                        correctAnswer: 2,
                        feedback: 'Dokładnie tak – lista mailingowa to baza kontaktów do osób, które wyraziły zgodę na komunikację i którym można regularnie przypominać o ofercie, co jest szczególnie wartościowe dla małych firm.'
                    },
                    {
                        id: 'q4',
                        type: 'choice',
                        question: 'Co z poniższego zazwyczaj NIE jest dobrym pomysłem w email marketingu?',
                        options: [
                            'Wysyłanie wiadomości bez jasnego celu i CTA',
                            'Segmentowanie listy (np. osobno rodziny, osobno klienci biznesowi)',
                            'Testowanie różnych tematów wiadomości (A/B testy)',
                            'Sprawdzanie statystyk otwarć i kliknięć po wysyłce'
                        ],
                        correctAnswer: 0,
                        feedback: 'Dokładnie tak – wysyłanie wiadomości bez jasnego celu i wyraźnego wezwania do działania (CTA) to zły pomysł, ponieważ zmniejsza szansę na zaangażowanie odbiorcy i osiągnięcie celu kampanii.'
                    }
                ]
            },
            {
                id: '5.2',
                moduleId: '5',
                title: 'Personalizacja i automatyzacja kampanii',
                intro: `Wysyłanie „jednego, tego samego maila do wszystkich" coraz rzadziej działa. Klienci dostają dziesiątki wiadomości dziennie – zwracają uwagę głównie na te, które są dla nich.

Personalizacja (dopasowanie treści do odbiorcy) i automatyzacja (wysyłka we właściwym momencie, bez ręcznego klikania) sprawiają, że email marketing zaczyna pracować jak dobrze ułożony system, a nie przypadkowe, pojedyncze wysyłki.`,
                whyImportant: [
                    {
                        title: 'Oszczędność czasu',
                        description: 'Najważniejsze wiadomości (powitalne, przypomnienia, podziękowania) mogą wysyłać się same według ustalonych zasad',
                        points: [],
                        icon: 'time'
                    },
                    {
                        title: 'Wyższe zaangażowanie',
                        description: 'Klient dostaje to, co jest dla niego sensowne (np. informacje przed terminem realizacji, nie ogólny newsletter „dla wszystkich")',
                        points: [],
                        icon: 'relations'
                    },
                    {
                        title: 'Lepsze wyniki sprzedaży',
                        description: 'Przypomnienia, oferty dopasowane do terminu i kontekstu łatwiej zamieniają się na zamówienia, wizyty, zapytania',
                        points: [],
                        icon: 'sales'
                    },
                    {
                        title: 'Bardziej profesjonalny wizerunek',
                        description: 'Komunikacja wygląda jak dobrze zaplanowany proces, a nie pojedyncze „strzały"',
                        points: [],
                        icon: 'visibility'
                    }
                ],
                practicalExamples: [
                    {
                        title: 'Jak może wyglądać personalizacja w praktyce',
                        description: `Przykład – firma cateringowa:

Zamiast ogólnego maila:

„Dzień dobry, zapraszamy do zamówienia cateringu u nas."

bardziej spersonalizowana wiadomość do osoby, która już zamawiała:

„Dzień dobry Pani Anno,

widzimy, że ostatni raz zamawiała Pani u nas zimą zeszłego roku.

Na nadchodzący sezon przygotowaliśmy pakiet cateringowy na małe przyjęcia z dostawą w cenie.

Jeśli chciałaby Pani sprawdzić dostępne terminy realizacji w listopadzie lub grudniu – proszę kliknąć w przycisk poniżej lub odpowiedzieć na tego maila."

Elementy personalizacji:

• imię („Pani Anno"),

• nawiązanie do historii („ostatni raz zamawiała Pani zimą"),

• dopasowana propozycja (pakiet na przyjęcie, a nie przypadkowa oferta),

• jasne CTA („kliknij" / „odpowiedz na maila").`,
                        effect: 'Personalizacja zwiększa zaangażowanie i szansę na konwersję, ponieważ wiadomość jest dopasowana do konkretnego odbiorcy i jego historii z firmą.'
                    }
                ],
                automationScenariosIntro: 'Nie trzeba od razu budować skomplikowanych lejków. W małej firmie już kilka prostych, dobrze ustawionych automatyzacji może zrobić dużą różnicę.',
                automationScenarios: [
                    {
                        id: 'auto-1',
                        title: 'Seria powitalna dla nowych kontaktów',
                        description: 'Każda osoba, która zapisała się na newsletter lub zostawiła maila w formularzu.',
                        icon: 'mail',
                        timeline: 'Dzień 0, 3-5, 7-10',
                        points: [
                            'Dzień 0 – mail powitalny: podziękowanie za zapis, krótka prezentacja oferty/usługi',
                            'Dzień 3–5 – mail z konkretną wartością: np. „Jak zaplanować małe przyjęcie w domu – 3 sprawdzone pomysły"',
                            'Dzień 7–10 – mail z pierwszą, delikatną propozycją: np. informacja o pakiecie z konkretnymi terminami'
                        ]
                    },
                    {
                        id: 'auto-2',
                        title: 'Mail przed terminem realizacji',
                        description: 'Wysyłany automatycznie np. 3–5 dni przed realizacją.',
                        icon: 'remind',
                        timeline: '3-5 dni przed',
                        points: [
                            'Przypomnienie terminu',
                            'Praktyczne informacje (godzina dostawy, sposób odbioru, kontakt do kierowcy)',
                            'Możliwość dopisania usług dodatkowych (np. dodatkowe porcje, opcje wege, napoje)'
                        ]
                    },
                    {
                        id: 'auto-3',
                        title: 'Mail po realizacji usługi',
                        description: 'Wysyłany 1–3 dni po zakończeniu realizacji.',
                        icon: 'relations',
                        timeline: '1-3 dni po',
                        points: [
                            'Podziękowanie',
                            'Prośba o opinię (np. link do Google)',
                            'Opcjonalnie: kod rabatowy na kolejne zamówienie w mniej obłożonych terminach'
                        ]
                    },
                    {
                        id: 'auto-4',
                        title: 'Reaktywacja nieaktywnych klientów',
                        description: 'Do osób, które od dłuższego czasu nie otwierają maili / nie zamawiają.',
                        icon: 'traffic',
                        timeline: 'Po okresie nieaktywności',
                        points: [
                            'Przypomnienie o marce',
                            'Zaproszenie z konkretną korzyścią (np. tańsze menu w tygodniu)',
                            'Wyraźny CTA: „Jeśli nie chcesz otrzymywać takich wiadomości, możesz jednym kliknięciem się wypisać"'
                        ]
                    }
                ],
                quiz: [
                    {
                        id: 'q1',
                        type: 'choice',
                        question: 'Na czym polega automatyzacja w email marketingu?',
                        options: [
                            'Na wysyłaniu jak największej liczby maili ręcznie',
                            'Na ustawieniu reguł, które wywołują wysyłkę odpowiednich wiadomości w określonym momencie (np. po zapisie, przed realizacją)',
                            'Na kupowaniu gotowych list mailingowych',
                            'Na wysyłaniu tej samej wiadomości do wszystkich kontaktów'
                        ],
                        correctAnswer: 1,
                        feedback: 'Dokładnie tak – automatyzacja polega na ustawieniu reguł, które automatycznie wywołują wysyłkę odpowiednich wiadomości w określonych momentach, bez konieczności ręcznego działania.'
                    },
                    {
                        id: 'q2',
                        type: 'choice',
                        question: 'Który przykład najlepiej pokazuje sensowną personalizację maila?',
                        options: [
                            '„Dzień dobry, zapraszamy wszystkich do skorzystania z naszej oferty."',
                            '„Witaj! Mamy promocję, szczegóły w załączniku."',
                            '„Dzień dobry Panie Marku, dziękujemy za Pana ostatnie zamówienie. Na najbliższe tygodnie przygotowaliśmy ofertę z rabatem dla stałych klientów. Jeśli chciałby Pan sprawdzić dostępne terminy realizacji w listopadzie, proszę kliknąć w ten link."',
                            '„Szanowni Państwo, oferta ważna do odwołania."'
                        ],
                        correctAnswer: 2,
                        feedback: 'Dokładnie tak – najlepszy przykład zawiera personalizację (imię), nawiązanie do historii (ostatnie zamówienie), dopasowaną ofertę (rabat dla stałych klientów) i jasne wezwanie do działania (link).'
                    },
                    {
                        id: 'q3',
                        type: 'choice',
                        question: 'Jaka jest jedna z głównych korzyści automatyzacji kampanii emailowych w małej firmie?',
                        options: [
                            'Możliwość wysyłania maili bez zgody odbiorców',
                            'Brak potrzeby planowania treści',
                            'Oszczędność czasu przy zachowaniu regularnego kontaktu z klientami',
                            'Zastąpienie wszystkich innych kanałów marketingowych'
                        ],
                        correctAnswer: 2,
                        feedback: 'Dokładnie tak – automatyzacja pozwala oszczędzić czas przy jednoczesnym zachowaniu regularnego, zaplanowanego kontaktu z klientami, co jest szczególnie wartościowe dla małych firm z ograniczonymi zasobami.'
                    },
                    {
                        id: 'q4',
                        type: 'open',
                        question: 'Podaj jeden przykład wiadomości, którą w Twojej firmie można byłoby zautomatyzować (np. „mail przed realizacją z informacjami praktycznymi").',
                        keywords: [
                            'automatyzacja',
                            'mail',
                            'wiadomość',
                            'przed',
                            'po',
                            'powitalny',
                            'przypomnienie',
                            'podziękowanie',
                            'reaktywacja',
                            'realizacja',
                            'wizyta',
                            'usługa',
                            'zamówienie',
                            'termin',
                            'informacje',
                            'praktyczne',
                            'dostawa',
                            'odbiór',
                            'opinia',
                            'rabat',
                            'kod'
                        ],
                        hint: 'Pomyśl o sytuacjach w Twojej firmie, które powtarzają się regularnie i wymagają wysłania podobnej wiadomości – np. przed realizacją, po zamówieniu, przy zapisie na newsletter...',
                        feedback: 'Dziękuję za odpowiedź. Automatyzacja powtarzalnych wiadomości to świetny sposób na oszczędność czasu przy jednoczesnym utrzymaniu profesjonalnej komunikacji z klientami.'
                    }
                ]
            }
        ]
    },
    {
        id: '6',
        title: 'Analityka i optymalizacja + Warsztaty praktyczne',
        icon: 'analytics',
        lessons: [
            {
                id: '6.1',
                moduleId: '6',
                title: 'Narzędzia analityczne i ich zastosowanie',
                intro: `Narzędzia analityczne (takie jak Google Analytics, statystyki Meta, systemy raportowe z systemu zamówień, narzędzia do email marketingu) pokazują, co naprawdę dzieje się z Twoim marketingiem:

kto wchodzi na stronę, skąd, co ogląda, w co klika, kiedy znika, a kiedy zamawia / dzwoni / pisze.

Bez tych danych decyzje podejmuje się „na wyczucie". Z danymi – możesz świadomie wzmacniać to, co działa, i odcinać to, co tylko generuje koszty.`,
                whyImportant: [
                    {
                        title: 'Widzenie źródeł zapytań i zamówień',
                        description: 'Z jakich źródeł faktycznie przychodzą zapytania i zamówienia (Google, social media, polecenia, reklamy)',
                        points: [],
                        icon: 'analytics'
                    },
                    {
                        title: 'Ocena kampanii',
                        description: 'Które kampanie mają sens, a które tylko „zjadają budżet"',
                        points: [],
                        icon: 'target'
                    },
                    {
                        title: 'Analiza zachowań klientów',
                        description: 'Jak zachowują się klienci na stronie – które podstrony działają, a które trzeba poprawić',
                        points: [],
                        icon: 'data'
                    },
                    {
                        title: 'Lepsze planowanie budżetów',
                        description: 'Planowanie budżetów i sezonowość (np. jakie działania wzmacniać przed wysokim sezonem, a jakie wypełniają dołki popytu)',
                        points: [],
                        icon: 'organize'
                    },
                    {
                        title: 'Szybsze wychwytywanie problemów',
                        description: 'Np. nagły spadek ruchu, niedziałający formularz, kampanię z bardzo wysokim kosztem kliknięcia',
                        points: [],
                        icon: 'info'
                    }
                ],
                practicalExamples: [
                    {
                        title: 'Przykład 1 – Ruch na stronie www i strona ofertowa',
                        description: `Mała firma cateringowa sprawdza w Google Analytics:

• ile osób miesięcznie odwiedza stronę,

• które podstrony są najczęściej oglądane (np. „Catering", „Menu", „Kontakt"),

• jaki jest współczynnik wyjść ze strony ofertowej (czy ludzie po wejściu od razu zamykają kartę, czy idą dalej).`,
                        effect: 'Jeśli wiele osób wchodzi na stronę „Oferta / Catering", a mało przechodzi do „Zamówienie / Kontakt", to sygnał, że treść oferty, zdjęcia lub przyciski „zadzwoń / zamów" wymagają poprawy.'
                    },
                    {
                        title: 'Przykład 2 – Skuteczność reklam w social media',
                        description: `Firma cateringowa uruchamia kampanię Meta Ads promującą menu na przyjęcia. Po tygodniu sprawdza w panelu reklamy:

• CTR (jaki procent osób po zobaczeniu reklamy klika),

• koszt kliknięcia (CPC),

• ile osób przeszło dalej do formularza kontaktowego,

• ile realnych zapytań / zamówień przyszło w tym okresie.`,
                        effect: 'Jeśli CTR jest wysoki, ale mało osób pyta o ofertę, to problem może być w stronie docelowej (treść, zdjęcia, brak jasnego telefonu / formularza).'
                    },
                    {
                        title: 'Przykład 3 – Email marketing i powroty klientów',
                        description: `Firma cateringowa wysyła kampanię emailową do swoich byłych klientów z propozycją zamówień poza wysokim sezonem. Narzędzie do emaili pokazuje:

• ile osób otworzyło wiadomość (open rate),

• ile kliknęło w link („zobacz terminy", „napisz do nas"),

• ile finalnie złożyło zamówienie.`,
                        effect: 'Na tej podstawie można ocenić, czy temat wiadomości zachęca do otwarcia, czy oferta jest wystarczająco konkretna i czy warto powtórzyć podobną akcję w przyszłości.'
                    }
                ],
                quiz: [
                    {
                        id: 'q1',
                        type: 'choice',
                        question: 'Które narzędzie jest najczęściej używane do analizy ruchu na stronie internetowej?',
                        options: [
                            'Program do faktur',
                            'Google Analytics',
                            'Edytor zdjęć',
                            'Messenger'
                        ],
                        correctAnswer: 1,
                        feedback: 'Dokładnie tak – Google Analytics to najpopularniejsze i najczęściej używane narzędzie do analizy ruchu na stronie internetowej.'
                    },
                    {
                        id: 'q2',
                        type: 'choice',
                        question: 'Co mierzy współczynnik konwersji strony docelowej (np. strony z ofertą)?',
                        options: [
                            'Średni czas ładowania strony',
                            'Odsetek osób, które weszły na stronę i od razu ją zamknęły',
                            'Odsetek odwiedzających, którzy wykonali pożądane działanie (np. wysłali formularz, kliknęli „Zadzwoń", złożyli zamówienie)',
                            'Liczbę polubień profilu w social media'
                        ],
                        correctAnswer: 2,
                        feedback: 'Dokładnie tak – współczynnik konwersji mierzy odsetek odwiedzających, którzy wykonali pożądane działanie, takie jak wysłanie formularza, kliknięcie w przycisk „Zadzwoń" lub złożenie zamówienia.'
                    },
                    {
                        id: 'q3',
                        type: 'choice',
                        question: 'Co powinno być pierwszym krokiem przed analizą danych z narzędzi analitycznych?',
                        options: [
                            'Zwiększenie budżetu reklamowego',
                            'Zmiana wszystkich tekstów na stronie',
                            'Jasne określenie celu (np. więcej zamówień bezpośrednich, więcej zapytań z formularza)',
                            'Instalacja jednocześnie kilku różnych systemów analitycznych'
                        ],
                        correctAnswer: 2,
                        feedback: 'Dokładnie tak – przed analizą danych należy jasno określić cel, co pozwala na właściwą interpretację wskaźników i podejmowanie trafnych decyzji.'
                    },
                    {
                        id: 'q4',
                        type: 'choice',
                        question: 'Który z poniższych wskaźników jest najmniej przydatny sam w sobie, jeśli nie jest powiązany z celem biznesowym?',
                        options: [
                            'Liczba zamówień z formularza na stronie',
                            'Liczba polubień postu na Facebooku',
                            'Współczynnik konwersji strony „Oferta"',
                            'Liczba wysłanych zapytań w miesiącu'
                        ],
                        correctAnswer: 1,
                        feedback: 'Dokładnie tak – liczba polubień postu na Facebooku sama w sobie nie przekłada się bezpośrednio na cele biznesowe, takie jak zamówienia czy zapytania, jeśli nie jest powiązana z konkretnymi działaniami.'
                    },
                    {
                        id: 'q5',
                        type: 'choice',
                        question: 'Co w praktyce oznacza wysoki CTR reklamy (dużo kliknięć) i jednocześnie wysoki koszt pozyskania zamówienia?',
                        options: [
                            'Reklama słabo przyciąga uwagę, ale strona świetnie zamienia odwiedzających w klientów',
                            'Reklama przyciąga uwagę, ale oferta / strona docelowa nie przekonuje do zamówienia',
                            'Wszystko działa idealnie i nie trzeba nic zmieniać',
                            'Należy natychmiast wyłączyć wszystkie kampanie'
                        ],
                        correctAnswer: 1,
                        feedback: 'Dokładnie tak – wysoki CTR oznacza, że reklama przyciąga uwagę, ale wysoki koszt pozyskania zamówienia sugeruje, że oferta lub strona docelowa nie przekonuje odwiedzających do zamówienia.'
                    },
                    {
                        id: 'q6',
                        type: 'choice',
                        question: 'Jak często mała firma powinna minimum przeglądać podstawowe raporty z działań marketingowych (ruch na stronie, kampanie, maile), aby sensownie reagować?',
                        options: [
                            'Raz na rok',
                            'Raz na pół roku',
                            'Przynajmniej raz w tygodniu (lub częściej w okresach intensywnych kampanii)',
                            'W ogóle nie trzeba, jeśli są włączone reklamy'
                        ],
                        correctAnswer: 2,
                        feedback: 'Dokładnie tak – regularne przeglądanie raportów (przynajmniej raz w tygodniu, a częściej w okresach intensywnych kampanii) pozwala na szybkie reagowanie i optymalizację działań marketingowych.'
                    }
                ]
            },
            {
                id: '6.2',
                moduleId: '6',
                title: 'Optymalizacja działań marketingowych i podejmowanie decyzji na podstawie danych',
                intro: `Optymalizacja działań marketingowych to nie jednorazowe „ustawienie kampanii", ale ciągły proces:

1. Zbierasz dane.

2. Sprawdzasz, co działa, a co nie.

3. Wprowadzasz zmiany.

4. Znowu mierzysz.

Z czasem zaczynasz widzieć proste schematy: co obniża koszt pozyskania klienta, co podnosi liczbę zapytań, a co jest tylko „szumem".`,
                whyImportant: [
                    {
                        title: 'Przestajesz zgadywać',
                        description: 'Dlaczego „coś nie działa"',
                        points: [],
                        icon: 'analytics'
                    },
                    {
                        title: 'Szybciej odkrywasz problemy',
                        description: 'Gdzie faktycznie „ucieka" klient (reklama, strona, formularz, komunikacja)',
                        points: [],
                        icon: 'info'
                    },
                    {
                        title: 'Inwestujesz tam, gdzie działa',
                        description: 'Budżet tam, gdzie realnie pojawiają się zapytania i zamówienia',
                        points: [],
                        icon: 'target'
                    },
                    {
                        title: 'Traktujesz kampanie jak testy',
                        description: 'Z konkretnym wnioskiem na przyszłość, a nie losową próbą',
                        points: [],
                        icon: 'data'
                    }
                ],
                whyImportantFooter: `Najważniejsza zasada: patrzymy na dane, nie tylko na „intuicję".

Intuicja jest potrzebna do wymyślania rozwiązań, ale decyzję – zmieniamy / zostawiamy / wzmacniamy – warto podeprzeć liczbami.`,
                problemAnalyses: [
                    {
                        id: 'problem-1',
                        title: 'Przykład 1: Mało kliknięć w reklamę',
                        icon: 'traffic',
                        data: [
                            'Dużo wyświetleń reklamy',
                            'CTR (procent osób, które kliknęły) jest niski – np. 0,8%'
                        ],
                        interpretation: [
                            'Reklama jest słabo zauważalna (grafika nie przyciąga uwagi)',
                            'Tekst jest zbyt ogólny („Zapraszamy do naszego cateringu"), nic konkretnego nie obiecuje',
                            'Oferta nie jest dopasowana do grupy docelowej (np. reklama dla rodzin, a targetowanie ustawione na wszystkich 18–65)'
                        ],
                        solutions: [
                            'Zmiana grafiki na bardziej czytelną, z jednym prostym komunikatem (np. „Menu na 20 osób – dostawa w cenie")',
                            'Dodanie konkretu i korzyści w nagłówku (obszar dowozu, cena od…, menu w zestawie)',
                            'Zawężenie grupy docelowej (np. osoby 28–55, w promieniu X km od miasta, zainteresowane przyjęciami / cateringiem)'
                        ]
                    },
                    {
                        id: 'problem-2',
                        title: 'Przykład 2: Dużo kliknięć, mało zapytań',
                        icon: 'sales',
                        data: [
                            'CTR jest dobry – np. 3–4%',
                            'Na stronę wchodzi sporo osób, ale mało kto wysyła zapytanie / dzwoni'
                        ],
                        interpretation: [
                            'Reklama obiecuje więcej niż strona – klient „czegoś szuka", ale tego nie widzi',
                            'Na stronie brakuje jasnego wezwania do działania (numer telefonu, przycisk „Wyślij zapytanie")',
                            'Teksty są zbyt ogólne, brakuje odpowiedzi na proste pytania: „Za ile?", „Gdzie dokładnie?", „Co jest w cenie?"'
                        ],
                        solutions: [
                            'Dodanie dużego, widocznego przycisku „Zadzwoń teraz" / „Zapytaj o termin"',
                            'Pokazanie konkretów w pierwszym ekranie (np. „Menu na 15–20 osób od 49 zł/os., dostawa w cenie")',
                            'Dodanie krótkiej sekcji FAQ z odpowiedziami na 3–4 najczęstsze pytania'
                        ]
                    },
                    {
                        id: 'problem-3',
                        title: 'Przykład 3: Ruch ze smartfonów, ale wysoki współczynnik odrzuceń',
                        icon: 'experience',
                        data: [
                            '70–80% wejść jest z telefonów',
                            'Duży współczynnik odrzuceń (wiele osób wchodzi i od razu wychodzi)',
                            'Średni czas na stronie – tylko kilka sekund'
                        ],
                        interpretation: [
                            'Strona jest niewygodna na telefonie (trzeba powiększać, przewijać w bok)',
                            'Numer telefonu nie jest klikalny',
                            'Formularz jest zbyt długi na małym ekranie'
                        ],
                        solutions: [
                            'Sprawdzenie strony na swoim telefonie tak, jak robi to klient (bez trybu „dewelopera")',
                            'Ułatwienie kontaktu: klikany numer, przycisk „Zadzwoń" widoczny od razu',
                            'Skrócenie formularza – na start wystarczy imię, email / telefon, planowany termin, liczba osób'
                        ]
                    },
                    {
                        id: 'problem-4',
                        title: 'Przykład 4: Działania w social media i „martwe" posty',
                        icon: 'social',
                        data: [
                            'Część postów ma prawie zerowy zasięg',
                            'Inne – wyraźnie większy zasięg i więcej reakcji'
                        ],
                        interpretation: [
                            'Algorytm lepiej promuje posty z konkretną wartością (porady, realne zdjęcia, kulisy pracy) niż same grafiki z tekstem „Zamów"',
                            'Godzina publikacji ma znaczenie – inne wyniki w dzień, inne wieczorem'
                        ],
                        solutions: [
                            'Opieranie się na 2–3 typach postów, które historycznie osiągają lepsze wyniki (np. realne zdjęcia realizacji + krótkie historie klientów)',
                            'Publikowanie w różnych godzinach, a potem sprawdzenie, kiedy zasięgi są najwyższe',
                            'Dodawanie konkretnego wezwania do działania: „Napisz w wiadomości «CATERING», wyślę dostępne terminy realizacji"'
                        ]
                    }
                ],
                decisionSteps: [
                    {
                        id: 'step-1',
                        step: 1,
                        title: 'Ustal cel',
                        description: 'Np. więcej zapytań z formularza, więcej telefonów, więcej zamówień z kampanii',
                        icon: 'target'
                    },
                    {
                        id: 'step-2',
                        step: 2,
                        title: 'Wybierz wskaźnik',
                        description: 'Który najlepiej ten cel opisuje (np. liczba wysłanych formularzy, CTR, współczynnik konwersji strony)',
                        icon: 'analytics'
                    },
                    {
                        id: 'step-3',
                        step: 3,
                        title: 'Porównaj dane',
                        description: 'Jak jest teraz? Jak było miesiąc temu? Jak wygląda to dla różnych kampanii / grup docelowych?',
                        icon: 'data'
                    },
                    {
                        id: 'step-4',
                        step: 4,
                        title: 'Postaw hipotezę',
                        description: '„CTR jest niski, bo grafika nie przyciąga uwagi" lub „Ludzie klikają, ale nie wysyłają formularza, bo nie widzą ceny"',
                        icon: 'info'
                    },
                    {
                        id: 'step-5',
                        step: 5,
                        title: 'Wprowadź jedną zmianę',
                        description: 'Na raz – wtedy wiesz, co zadziałało',
                        icon: 'organize'
                    },
                    {
                        id: 'step-6',
                        step: 6,
                        title: 'Zmierz ponownie i zdecyduj',
                        description: 'Po kilku dniach / tygodniu: wzmacniam (działa), poprawiam (wymaga kolejnej zmiany), wyłączam (nie ma sensu nadal wydawać budżetu)',
                        icon: 'analytics'
                    }
                ],
                quiz: [
                    {
                        id: 'q1',
                        type: 'choice',
                        question: 'Które podejście do optymalizacji działań marketingowych jest najbardziej sensowne dla małej firmy?',
                        options: [
                            'Zmieniam wszystko naraz, żeby „coś w końcu zadziałało"',
                            'Kieruję się głównie przeczuciem – danych nie ma sensu analizować',
                            'Ustalam cel, wybieram 1–2 kluczowe wskaźniki, wprowadzam pojedynczą zmianę i sprawdzam dane po kilku dniach',
                            'Uruchamiam kampanię i zostawiam ją bez zmian przez rok'
                        ],
                        correctAnswer: 2,
                        feedback: 'Dokładnie tak – systematyczne podejście z ustaleniem celu, wyborem kluczowych wskaźników i wprowadzaniem pojedynczych zmian pozwala na skuteczną optymalizację działań marketingowych.'
                    },
                    {
                        id: 'q2',
                        type: 'open',
                        question: 'Reklama Twojej firmy wyświetliła się 2 000 razy, a użytkownicy kliknęli ją 60 razy. Jaki jest CTR (Click-Through Rate – współczynnik kliknięć) tej reklamy?',
                        isCalculation: true,
                        correctNumericAnswer: 3.0,
                        formula: 'CTR = (liczba kliknięć / liczba wyświetleń) × 100%',
                        calculationData: [
                            {
                                label: 'Liczba wyświetleń',
                                value: 2000
                            },
                            {
                                label: 'Liczba kliknięć',
                                value: 60
                            }
                        ],
                        hint: 'CTR = (60 / 2000) × 100% = ?',
                        feedback: 'Dokładnie tak – CTR = (60 / 2000) × 100% = 3,0%. To dobry wynik, który pokazuje, że reklama przyciąga uwagę odbiorców.'
                    },
                    {
                        id: 'q3',
                        type: 'choice',
                        question: 'Masz dwie kampanie na Facebooku, obie kierują na tę samą stronę. Budżet jest ograniczony. Co jest najbardziej rozsądnym krokiem?',
                        campaignData: [
                            {
                                name: 'Kampania A',
                                ctr: '1,0%',
                                costPerClick: '1,50 zł',
                                inquiries: '2 zapytania w tygodniu'
                            },
                            {
                                name: 'Kampania B',
                                ctr: '3,5%',
                                costPerClick: '0,90 zł',
                                inquiries: '7 zapytań w tygodniu'
                            }
                        ],
                        options: [
                            'Wyłączyć Kampanię B i zostawić tylko Kampanię A',
                            'Zostawić obie kampanie bez zmian',
                            'Przenieść większą część budżetu z Kampanii A do Kampanii B i dalej ją obserwować',
                            'Wyłączyć obie kampanie i wrócić tylko do postów organicznych'
                        ],
                        correctAnswer: 2,
                        feedback: 'Dokładnie tak – Kampania B ma lepsze wyniki (wyższy CTR, niższy koszt kliknięcia, więcej zapytań), więc przeniesienie budżetu z Kampanii A do Kampanii B jest najbardziej rozsądnym krokiem.'
                    },
                    {
                        id: 'q4',
                        type: 'choice',
                        question: 'Dlaczego przy optymalizacji strony / reklamy warto zmieniać jeden ważny element na raz (np. najpierw nagłówek, potem grafikę, potem grupę docelową)?',
                        options: [
                            'Żeby mieć więcej pracy',
                            'Dzięki temu możesz lepiej zrozumieć, która konkretna zmiana poprawiła wyniki',
                            'Bo narzędzia reklamowe nie pozwalają zmienić kilku elementów',
                            'Żeby dane w raportach wyglądały bardziej skomplikowanie'
                        ],
                        correctAnswer: 1,
                        feedback: 'Dokładnie tak – wprowadzanie jednej zmiany na raz pozwala na precyzyjne określenie, która konkretna zmiana wpłynęła na poprawę wyników, co ułatwia dalszą optymalizację.'
                    }
                ]
            },
            {
                id: '6.3',
                moduleId: '6',
                title: 'Praktyczne ćwiczenia i warsztaty',
                intro: `Ta część szkolenia ma przenieść wszystko z poziomu „rozumiem w teorii" na poziom „potrafię zastosować u siebie w firmie".

Pracujemy na realnych przykładach – najlepiej z Twojej działalności – i krok po kroku:

• porządkujemy to, co robisz w marketingu,

• wyciągamy wnioski z danych,

• projektujemy konkretne działania na najbliższe tygodnie.`,
                whyImportant: [
                    {
                        title: 'Prawdziwe zrozumienie',
                        description: 'Dopiero przy pracy na własnych przykładach pojawia się prawdziwe zrozumienie („aha, u mnie to działa tak…")',
                        points: [],
                        icon: 'understand'
                    },
                    {
                        title: 'Podejmowanie decyzji',
                        description: 'Konkretne ćwiczenia zmuszają do podjęcia pierwszych decyzji (co poprawić, co wyłączyć, w co zainwestować)',
                        points: [],
                        icon: 'target'
                    },
                    {
                        title: 'Plan działania',
                        description: 'Po warsztacie masz nie tylko „wiedzę z kursu", ale zarys planu działania dopasowanego do Twojej sytuacji',
                        points: [],
                        icon: 'goal'
                    }
                ],
                whyImportantFooter: 'Teoria bez praktyki ma ograniczoną wartość. Dopiero gdy przełożysz pojęcia na własne kanały, własnych klientów i własne liczby, podejmiesz pierwsze decyzje na bazie danych i zapiszesz konkretny plan na 30 dni, zaczyna się realna zmiana w biznesie. Ta część ma Ci w tym pomóc – w prostych, wykonalnych krokach.',
                quiz: [
                    {
                        id: 'exercise1',
                        type: 'multi-task',
                        question: 'Ćwiczenie 1: Mapa działań marketingowych „tu i teraz"',
                        subTasks: [
                            {
                                id: 'ex1-1',
                                title: '1. Lista kanałów',
                                description: 'Wypisz wszystkie kanały, z których REALNIE korzystasz (nawet jeśli nieregularnie)',
                                fieldType: 'text-multiple',
                                fieldOptions: {
                                    multipleFields: [
                                        {
                                            label: 'Kanał 1',
                                            placeholder: 'np. strona internetowa'
                                        },
                                        {
                                            label: 'Kanał 2',
                                            placeholder: 'np. Facebook / Instagram'
                                        },
                                        {
                                            label: 'Kanał 3',
                                            placeholder: 'np. Google Maps'
                                        },
                                        {
                                            label: 'Kanał 4',
                                            placeholder: 'np. płatne reklamy'
                                        },
                                        {
                                            label: 'Kanał 5',
                                            placeholder: 'np. działania offline'
                                        }
                                    ]
                                }
                            },
                            {
                                id: 'ex1-2',
                                title: '2. Kanał do rozwoju',
                                description: 'Wybierz 1 kanał, który zamierzasz rozwijać (ma potencjał i sens)',
                                fieldType: 'text',
                                fieldOptions: {
                                    placeholder: 'Wpisz nazwę kanału, który zamierzasz rozwijać...'
                                }
                            },
                            {
                                id: 'ex1-3',
                                title: '3. Kanał do ograniczenia',
                                description: 'Wybierz 1 kanał do ograniczenia / przetestowania inaczej',
                                fieldType: 'text',
                                fieldOptions: {
                                    placeholder: 'Wpisz nazwę kanału, który ograniczysz...'
                                }
                            },
                            {
                                id: 'ex1-4',
                                title: '4. Kanał do odłożenia',
                                description: 'Wybierz 1 kanał, którym przestajesz się przejmować w najbliższych 30 dniach',
                                fieldType: 'text',
                                fieldOptions: {
                                    placeholder: 'Wpisz nazwę kanału, który odkładasz...'
                                }
                            }
                        ]
                    },
                    {
                        id: 'exercise2',
                        type: 'multi-task',
                        question: 'Ćwiczenie 2: Analiza przykładowej kampanii – praca na liczbach',
                        subTasks: [
                            {
                                id: 'ex2-1',
                                title: '1. Wprowadź dane kampanii',
                                description: 'Jeśli masz już jakąkolwiek kampanię (Facebook/Instagram/Google) – wpisz swoje dane. Jeśli nie – możesz użyć przykładowych liczb.',
                                fieldType: 'text-multiple',
                                fieldOptions: {
                                    multipleFields: [
                                        {
                                            label: 'Liczba wyświetleń (Impressions)',
                                            placeholder: 'np. 5000'
                                        },
                                        {
                                            label: 'Liczba kliknięć (Clicks)',
                                            placeholder: 'np. 150'
                                        },
                                        {
                                            label: 'Budżet wydany (PLN)',
                                            placeholder: 'np. 300'
                                        },
                                        {
                                            label: 'Liczba zapytań/zamówień (Leads)',
                                            placeholder: 'np. 10'
                                        }
                                    ]
                                }
                            },
                            {
                                id: 'ex2-2',
                                title: '2. Ocena CTR',
                                description: 'Jak oceniasz CTR tej kampanii?',
                                fieldType: 'choice',
                                fieldOptions: {
                                    choices: [
                                        'Bardzo słaby',
                                        'Przeciętny',
                                        'Dobry / bardzo dobry'
                                    ]
                                }
                            },
                            {
                                id: 'ex2-3',
                                title: '3. Ocena kosztu kliknięcia (CPC)',
                                description: 'Jak oceniasz koszt kliknięcia (CPC) w kontekście Twojej branży i lokalizacji?',
                                fieldType: 'choice',
                                fieldOptions: {
                                    choices: [
                                        'Zdecydowanie za wysoki',
                                        'Akceptowalny',
                                        'Bardzo dobry'
                                    ]
                                }
                            },
                            {
                                id: 'ex2-4',
                                title: '4. Największy problem kampanii',
                                description: 'Co jest największym problemem tej kampanii?',
                                fieldType: 'choice',
                                fieldOptions: {
                                    choices: [
                                        'Ludzie nie klikają (słaba kreacja / komunikat)',
                                        'Ludzie klikają, ale nie ma zapytań (strona docelowa / oferta)',
                                        'Trudno powiedzieć – za mało danych'
                                    ]
                                }
                            },
                            {
                                id: 'ex2-5',
                                title: '5. Podsumowanie',
                                description: 'Podsumuj: co działa, a co wymaga poprawy?',
                                fieldType: 'textarea',
                                fieldOptions: {
                                    placeholder: 'Napisz krótkie podsumowanie...'
                                }
                            },
                            {
                                id: 'ex2-6',
                                title: '6. Jedna decyzja optymalizacyjna',
                                description: 'Wybierz jedno działanie, które wdrożysz jako pierwsze:',
                                fieldType: 'choice',
                                fieldOptions: {
                                    choices: [
                                        'Zmiana kreacji (grafika / tekst)',
                                        'Zmiana grupy docelowej',
                                        'Zmiana strony docelowej',
                                        'Zmiana budżetu / harmonogramu',
                                        'Wstrzymanie tej kampanii i test innej'
                                    ]
                                }
                            },
                            {
                                id: 'ex2-7',
                                title: '7. Uzasadnienie decyzji',
                                description: 'Dlaczego właśnie to działanie?',
                                fieldType: 'textarea',
                                fieldOptions: {
                                    placeholder: 'Krótko uzasadnij swoją decyzję...'
                                }
                            }
                        ]
                    },
                    {
                        id: 'exercise3',
                        type: 'multi-task',
                        question: 'Ćwiczenie 3: Szybki audyt strony docelowej',
                        subTasks: [
                            {
                                id: 'ex3-1',
                                title: '1. Adres strony docelowej',
                                description: 'Podaj adres strony, na którą kierujesz ruch z reklam (np. podstrona z ofertą)',
                                fieldType: 'url',
                                fieldOptions: {
                                    placeholder: 'https://...'
                                }
                            },
                            {
                                id: 'ex3-2',
                                title: '2. Checklista pierwszego ekranu',
                                description: 'Zaznacz, czy na pierwszym ekranie (bez przewijania) użytkownik widzi wyraźnie:',
                                fieldType: 'multichoice',
                                fieldOptions: {
                                    choices: [
                                        'Co dokładnie oferujesz',
                                        'Dla kogo jest oferta',
                                        'Jaki jest orientacyjny zakres / cena',
                                        'Co ma zrobić dalej (zadzwonić, wypełnić formularz, sprawdzić dostępność)'
                                    ]
                                }
                            },
                            {
                                id: 'ex3-3',
                                title: '3. Elementy ułatwiające kontakt',
                                description: 'Zaznacz elementy, które są obecne na stronie:',
                                fieldType: 'multichoice',
                                fieldOptions: {
                                    choices: [
                                        'Numer telefonu jest klikalny na telefonie',
                                        'Przycisk "Zadzwoń"/"Napisz" jest widoczny bez przewijania',
                                        'Formularz nie jest przesadnie długi',
                                        'Są podstawowe informacje: lokalizacja, godziny, parking (jeśli istotne)'
                                    ]
                                }
                            },
                            {
                                id: 'ex3-4',
                                title: '4. Zmiana 1',
                                description: 'Zapisz pierwszą konkretną zmianę, którą możesz wdrożyć w ciągu tygodnia',
                                fieldType: 'text',
                                fieldOptions: {
                                    placeholder: 'np. dodanie dużego przycisku "Zadzwoń teraz"'
                                }
                            },
                            {
                                id: 'ex3-5',
                                title: '5. Zmiana 2',
                                description: 'Zapisz drugą konkretną zmianę',
                                fieldType: 'text',
                                fieldOptions: {
                                    placeholder: 'np. skrócenie formularza'
                                }
                            },
                            {
                                id: 'ex3-6',
                                title: '6. Zmiana 3',
                                description: 'Zapisz trzecią konkretną zmianę',
                                fieldType: 'text',
                                fieldOptions: {
                                    placeholder: 'np. dopisanie 3 najczęstszych pytań i odpowiedzi'
                                }
                            },
                            {
                                id: 'ex3-7',
                                title: '7. Planowany termin wdrożenia',
                                description: 'Kiedy planujesz wdrożyć te zmiany? (wybierz konkretną datę)',
                                fieldType: 'date',
                                fieldOptions: {}
                            }
                        ]
                    },
                    {
                        id: 'exercise4',
                        type: 'multi-task',
                        question: 'Ćwiczenie 4: Plan optymalizacji na 30 dni',
                        subTasks: [
                            {
                                id: 'ex4-1',
                                title: '1. Wybór priorytetów',
                                description: 'Wybierz maksymalnie 3 priorytety (zaznacz wszystkie, które dotyczą Twojej sytuacji):',
                                fieldType: 'multichoice',
                                fieldOptions: {
                                    choices: [
                                        'Poprawa wyników jednej konkretnej kampanii',
                                        'Poprawa strony docelowej',
                                        'Uporządkowanie wizytówki Google (opinie, zdjęcia, opis)',
                                        'Poprawa komunikacji w social media (czas odpowiedzi, regularność)',
                                        'Inne (napisz poniżej)'
                                    ]
                                }
                            },
                            {
                                id: 'ex4-1-other',
                                title: 'Priorytet - Inne',
                                description: 'Jeśli wybrałeś "Inne", napisz swój priorytet:',
                                fieldType: 'text',
                                fieldOptions: {
                                    placeholder: 'Opisz swój priorytet...'
                                }
                            },
                            {
                                id: 'ex4-2',
                                title: 'Priorytet 1 - Konkretne działanie',
                                description: 'Co dokładnie zrobisz? (np. "zmieniam nagłówek i grafikę w kampanii X")',
                                fieldType: 'textarea',
                                fieldOptions: {
                                    placeholder: 'Opisz konkretne działanie...'
                                }
                            },
                            {
                                id: 'ex4-3',
                                title: 'Priorytet 1 - Jak zmierzysz?',
                                description: 'Jaki wskaźnik sprawdzisz za 30 dni? (np. CTR, liczba wiadomości, liczba telefonów)',
                                fieldType: 'text',
                                fieldOptions: {
                                    placeholder: 'np. wyższy CTR, więcej wiadomości...'
                                }
                            },
                            {
                                id: 'ex4-4',
                                title: 'Priorytet 1 - Planowany termin realizacji',
                                description: 'Kiedy planujesz wdrożyć to działanie? (wybierz datę)',
                                fieldType: 'date',
                                fieldOptions: {}
                            },
                            {
                                id: 'ex4-5',
                                title: 'Priorytet 2 - Konkretne działanie',
                                description: 'Jeśli masz drugi priorytet - co dokładnie zrobisz?',
                                fieldType: 'textarea',
                                fieldOptions: {
                                    placeholder: 'Opisz konkretne działanie (lub zostaw puste, jeśli masz tylko jeden priorytet)...'
                                }
                            },
                            {
                                id: 'ex4-6',
                                title: 'Priorytet 2 - Jak zmierzysz?',
                                description: 'Jaki wskaźnik sprawdzisz za 30 dni?',
                                fieldType: 'text',
                                fieldOptions: {
                                    placeholder: 'np. więcej zapytań...'
                                }
                            },
                            {
                                id: 'ex4-7',
                                title: 'Priorytet 2 - Planowany termin realizacji',
                                description: 'Kiedy planujesz wdrożyć to działanie? (wybierz datę)',
                                fieldType: 'date',
                                fieldOptions: {}
                            },
                            {
                                id: 'ex4-8',
                                title: 'Priorytet 3 - Konkretne działanie',
                                description: 'Jeśli masz trzeci priorytet - co dokładnie zrobisz?',
                                fieldType: 'textarea',
                                fieldOptions: {
                                    placeholder: 'Opisz konkretne działanie (lub zostaw puste, jeśli masz mniej niż 3 priorytety)...'
                                }
                            },
                            {
                                id: 'ex4-9',
                                title: 'Priorytet 3 - Jak zmierzysz?',
                                description: 'Jaki wskaźnik sprawdzisz za 30 dni?',
                                fieldType: 'text',
                                fieldOptions: {
                                    placeholder: 'np. więcej opinii...'
                                }
                            },
                            {
                                id: 'ex4-10',
                                title: 'Priorytet 3 - Planowany termin realizacji',
                                description: 'Kiedy planujesz wdrożyć to działanie? (wybierz datę)',
                                fieldType: 'date',
                                fieldOptions: {}
                            },
                            {
                                id: 'ex4-11',
                                title: 'Mały "commitment"',
                                description: 'Jednym zdaniem: Co jest dla Ciebie najważniejszym celem na najbliższe 30 dni w marketingu?',
                                fieldType: 'textarea',
                                fieldOptions: {
                                    placeholder: 'Napisz swój główny cel jednym zdaniem...'
                                }
                            }
                        ]
                    },
                    {
                        id: 'summary-q1',
                        type: 'open',
                        question: 'Jakie dwa konkretne działania optymalizacyjne wdrożysz w swojej firmie w ciągu najbliższych 30 dni? Napisz, co zrobisz i w jakim kanale (np. reklama, strona, social media).',
                        keywords: [
                            'działania',
                            'optymalizacja',
                            'plan',
                            'wdrożenie',
                            '30 dni',
                            'kanał',
                            'reklama',
                            'strona',
                            'social media'
                        ],
                        hint: 'Pomyśl o ćwiczeniach, które wykonałeś/aś – które z nich możesz zastosować w swojej firmie? Co konkretnie zrobisz i gdzie?',
                        feedback: 'Dobrze! Masz już konkretny plan działań. Pamiętaj, że najważniejsze to zacząć od małych, konkretnych kroków.'
                    },
                    {
                        id: 'summary-q2',
                        type: 'open',
                        question: 'Po czym poznasz, że te działania miały sens? Jakie liczby lub sygnały będą dla Ciebie dowodem, że idziesz w dobrą stronę?',
                        keywords: [
                            'pomiar',
                            'wskaźniki',
                            'efekty',
                            'liczby',
                            'sygnały',
                            'dowód',
                            'wyniki',
                            'metryki'
                        ],
                        hint: 'Pomyśl o konkretnych wskaźnikach, które możesz zmierzyć – np. liczba zapytań, CTR, koszt pozyskania klienta, liczba telefonów.',
                        feedback: 'Świetnie! Mierzenie efektów jest kluczowe. Wróć do tego planu za miesiąc i sprawdź, co udało Ci się zrealizować i jakie są efekty.'
                    }
                ]
            }
        ]
    }
];
const findLesson = (lessonId)=>{
    for (const module of trainingModulesSocialBoost){
        const lesson = module.lessons.find((l)=>l.id === lessonId);
        if (lesson) return lesson;
    }
    return undefined;
};
const findModule = (moduleId)=>{
    return trainingModulesSocialBoost.find((m)=>m.id === moduleId);
};
const getTotalLessons = ()=>{
    return trainingModulesSocialBoost.reduce((total, module)=>total + module.lessons.length, 0);
};
const getNextLesson = (currentLessonId)=>{
    const allLessons = [];
    trainingModulesSocialBoost.forEach((module)=>{
        allLessons.push(...module.lessons);
    });
    const currentIndex = allLessons.findIndex((l)=>l.id === currentLessonId);
    if (currentIndex === -1 || currentIndex === allLessons.length - 1) {
        return null;
    }
    return allLessons[currentIndex + 1];
};
const getPreviousLesson = (currentLessonId)=>{
    const allLessons = [];
    trainingModulesSocialBoost.forEach((module)=>{
        allLessons.push(...module.lessons);
    });
    const currentIndex = allLessons.findIndex((l)=>l.id === currentLessonId);
    if (currentIndex <= 0) {
        return null;
    }
    return allLessons[currentIndex - 1];
};
}),
"[project]/strony_www/drozniak-landingpage/utils/courseLoader.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "loadCourseModules",
    ()=>loadCourseModules
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$config$2f$trainingModules$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/config/trainingModules.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$config$2f$trainingModulesSocialBoost$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/config/trainingModulesSocialBoost.ts [app-ssr] (ecmascript)");
;
;
const loadCourseModules = (configPath)=>{
    switch(configPath){
        case 'trainingModules':
            return __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$config$2f$trainingModules$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["trainingModules"];
        case 'trainingModulesSocialBoost':
            return __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$config$2f$trainingModulesSocialBoost$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["trainingModulesSocialBoost"];
        default:
            console.warn(`Unknown config path: ${configPath}, using default`);
            return __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$config$2f$trainingModules$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["trainingModules"];
    }
};
}),
"[project]/strony_www/drozniak-landingpage/app/hooks/useUserCourses.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useUserCourses",
    ()=>useUserCourses
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/lib/supabase-client.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$app$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/app/hooks/useAuth.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$utils$2f$courseLoader$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/utils/courseLoader.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
const useUserCourses = ()=>{
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$app$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const [courses, setCourses] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!user) {
            setCourses([]);
            setLoading(false);
            return;
        }
        load();
    }, [
        user?.id
    ]);
    const load = async ()=>{
        if (!user) return;
        setLoading(true);
        try {
            const { data: userCourses, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('user_courses').select(`
          course_id,
          courses (
            id,
            code,
            name,
            description,
            config_path,
            active
          )
        `).eq('user_id', user.id).eq('active', true).order('assigned_at', {
                ascending: false
            });
            if (error) throw error;
            const courseList = (userCourses || []).map((uc)=>uc.courses).filter(Boolean);
            if (courseList.length === 0) {
                setCourses([]);
                setLoading(false);
                return;
            }
            const { data: progressRows, error: progErr } = await __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$lib$2f$supabase$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('training_progress').select('course_id, module_code, percentage, module_completed').eq('user_id', user.id).in('course_id', courseList.map((c)=>c.id));
            if (progErr) throw progErr;
            const withPercent = courseList.map((c)=>{
                const modules = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$utils$2f$courseLoader$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["loadCourseModules"])(c.config_path);
                const totalLessons = modules.reduce((s, m)=>s + m.lessons.length, 0);
                let completedEquivalent = 0;
                modules.forEach((m)=>{
                    const moduleCode = `modul_${m.id}`;
                    const tp = (progressRows || []).find((p)=>p.course_id === c.id && p.module_code === moduleCode);
                    const pct = tp?.module_completed ? 100 : tp?.percentage ?? 0;
                    completedEquivalent += m.lessons.length * pct / 100;
                });
                const completionPercent = totalLessons > 0 ? Math.round(completedEquivalent / totalLessons * 100) : 0;
                return {
                    id: c.id,
                    code: c.code,
                    name: c.name,
                    description: c.description,
                    config_path: c.config_path,
                    completionPercent
                };
            });
            setCourses(withPercent);
        } catch (e) {
            console.error('useUserCourses:', e);
            setCourses([]);
        } finally{
            setLoading(false);
        }
    };
    return {
        courses,
        loading,
        reload: load
    };
};
}),
"[project]/strony_www/drozniak-landingpage/app/components/ClientCoursesView.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ClientCoursesView",
    ()=>ClientCoursesView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$app$2f$hooks$2f$useUserCourses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/app/hooks/useUserCourses.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$LoadingState$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/components/LoadingState.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
const ClientCoursesView = ()=>{
    const { courses, loading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$app$2f$hooks$2f$useUserCourses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useUserCourses"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$LoadingState$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LoadingState"], {
            variant: "block",
            label: "Ładowanie kursów…",
            skeleton: "cards"
        }, void 0, false, {
            fileName: "[project]/strony_www/drozniak-landingpage/app/components/ClientCoursesView.tsx",
            lineNumber: 13,
            columnNumber: 12
        }, ("TURBOPACK compile-time value", void 0));
    }
    if (courses.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "py-8 text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-gray-400 text-sm",
                    children: "Brak przypisanych kursów."
                }, void 0, false, {
                    fileName: "[project]/strony_www/drozniak-landingpage/app/components/ClientCoursesView.tsx",
                    lineNumber: 19,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-gray-500 text-xs mt-1",
                    children: "Skontaktuj się z administratorem."
                }, void 0, false, {
                    fileName: "[project]/strony_www/drozniak-landingpage/app/components/ClientCoursesView.tsx",
                    lineNumber: 20,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/strony_www/drozniak-landingpage/app/components/ClientCoursesView.tsx",
            lineNumber: 18,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-base font-semibold text-white mb-4",
                children: "Twoje kursy"
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/app/components/ClientCoursesView.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-3 sm:grid-cols-2",
                children: courses.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CourseCard, {
                        course: c,
                        onOpen: ()=>router.push(`/panel/courses/${c.id}`)
                    }, c.id, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/app/components/ClientCoursesView.tsx",
                        lineNumber: 30,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/app/components/ClientCoursesView.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/strony_www/drozniak-landingpage/app/components/ClientCoursesView.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const CourseCard = ({ course, onOpen })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-xl border border-white/10 bg-white/[0.03] p-4 hover:bg-white/[0.05] transition-colors",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-start justify-between gap-3",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "min-w-0 flex-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "font-semibold text-white text-sm truncate",
                            children: course.name
                        }, void 0, false, {
                            fileName: "[project]/strony_www/drozniak-landingpage/app/components/ClientCoursesView.tsx",
                            lineNumber: 42,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-2 flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-full bg-gradient-to-r from-[#fee715] to-[#00C9A7] rounded-full transition-all",
                                        style: {
                                            width: `${Math.min(100, course.completionPercent)}%`
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/app/components/ClientCoursesView.tsx",
                                        lineNumber: 45,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/strony_www/drozniak-landingpage/app/components/ClientCoursesView.tsx",
                                    lineNumber: 44,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-gray-400 tabular-nums flex-shrink-0",
                                    children: [
                                        course.completionPercent,
                                        "%"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/strony_www/drozniak-landingpage/app/components/ClientCoursesView.tsx",
                                    lineNumber: 50,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/strony_www/drozniak-landingpage/app/components/ClientCoursesView.tsx",
                            lineNumber: 43,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/strony_www/drozniak-landingpage/app/components/ClientCoursesView.tsx",
                    lineNumber: 41,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onOpen,
                    className: "flex-shrink-0 px-3 py-1.5 rounded-lg bg-[#fee715] text-[#101820] text-xs font-semibold hover:bg-[#fee715]/90 transition-colors",
                    title: "Otwórz w trybie pełnoekranowym",
                    children: "Otwórz"
                }, void 0, false, {
                    fileName: "[project]/strony_www/drozniak-landingpage/app/components/ClientCoursesView.tsx",
                    lineNumber: 53,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/strony_www/drozniak-landingpage/app/components/ClientCoursesView.tsx",
            lineNumber: 40,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/strony_www/drozniak-landingpage/app/components/ClientCoursesView.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/strony_www/drozniak-landingpage/app/panel/[...slug]/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ClientPanelPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$app$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/app/hooks/useAuth.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$app$2f$hooks$2f$useClientPanel$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/app/hooks/useClientPanel.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$app$2f$components$2f$UserMenu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/app/components/UserMenu.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$ClientDocumentsView$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/components/ClientDocumentsView.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$ClientMarketingView$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/components/ClientMarketingView.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$ClientDataView$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/components/ClientDataView.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$ClientProjectsView$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/components/ClientProjectsView.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$app$2f$components$2f$ClientCoursesView$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/app/components/ClientCoursesView.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$LoadingState$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/components/LoadingState.tsx [app-ssr] (ecmascript)");
'use client';
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
const TAB = {
    documents: {
        path: 'documents',
        label: 'Umowy i dokumenty'
    },
    courses: {
        path: 'courses',
        label: 'Kursy'
    },
    marketing: {
        path: 'marketing',
        label: 'Marketing'
    },
    data: {
        path: 'data',
        label: 'Dane'
    },
    projects: {
        path: 'projects',
        label: 'Projekty'
    }
};
/** Kolejność widoków w menu: najpierw Dane, potem reszta */ const TAB_ORDER = [
    'data',
    'documents',
    'courses',
    'marketing',
    'projects'
];
const sortViewGrants = (grants)=>TAB_ORDER.filter((t)=>grants.includes(t));
function ClientPanelPage({ params }) {
    const [resolvedParams, setResolvedParams] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const { user, loading: authLoading, updatePassword } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$app$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const { panelClient, viewGrants, loading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$app$2f$hooks$2f$useClientPanel$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useClientPanel"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const [showPasswordModal, setShowPasswordModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [newPassword, setNewPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [confirmNewPassword, setConfirmNewPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [passwordError, setPasswordError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [passwordSuccess, setPasswordSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [passwordLoading, setPasswordLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Resolve params (Next.js 15+)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        params.then(setResolvedParams);
    }, [
        params
    ]);
    // Resolve active tab from pathname
    const seg = pathname.replace(/^\/panel\/?/, '') || '';
    const activeTab = seg.split('/')[0] || '';
    const orderedGrants = sortViewGrants(viewGrants);
    // Redirect /panel or /panel/ do pierwszego widoku (Dane, jeśli ma; inaczej pierwszy z listy)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!loading && !authLoading && orderedGrants.length > 0 && (!seg || seg === '')) {
            const first = TAB[orderedGrants[0]];
            if (first) {
                router.replace(`/panel/${first.path}`);
            }
        }
    }, [
        loading,
        authLoading,
        orderedGrants,
        seg,
        router
    ]);
    if (authLoading || loading || !resolvedParams) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$LoadingState$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LoadingState"], {
            variant: "fullscreen",
            label: "Ładowanie panelu…"
        }, void 0, false, {
            fileName: "[project]/strony_www/drozniak-landingpage/app/panel/[...slug]/page.tsx",
            lineNumber: 64,
            columnNumber: 12
        }, this);
    }
    if (!user) {
        router.push('/login');
        return null;
    }
    if (!panelClient) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-[#101820] flex items-center justify-center px-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center max-w-md",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-400 text-sm mb-2",
                        children: "Nie masz przypisanego konta klienta."
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/app/panel/[...slug]/page.tsx",
                        lineNumber: 76,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-500 text-xs",
                        children: "Skontaktuj się z administratorem."
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/app/panel/[...slug]/page.tsx",
                        lineNumber: 77,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/strony_www/drozniak-landingpage/app/panel/[...slug]/page.tsx",
                lineNumber: 75,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/strony_www/drozniak-landingpage/app/panel/[...slug]/page.tsx",
            lineNumber: 74,
            columnNumber: 7
        }, this);
    }
    if (viewGrants.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-[#101820] flex items-center justify-center px-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center max-w-md",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-400 text-sm mb-2",
                        children: "Brak przypisanych modułów."
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/app/panel/[...slug]/page.tsx",
                        lineNumber: 87,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-500 text-xs",
                        children: "Skontaktuj się z administratorem."
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/app/panel/[...slug]/page.tsx",
                        lineNumber: 88,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/strony_www/drozniak-landingpage/app/panel/[...slug]/page.tsx",
                lineNumber: 86,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/strony_www/drozniak-landingpage/app/panel/[...slug]/page.tsx",
            lineNumber: 85,
            columnNumber: 7
        }, this);
    }
    // Show loading while redirecting
    if (!seg || seg === '') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$LoadingState$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LoadingState"], {
            variant: "fullscreen",
            label: "Ładowanie…"
        }, void 0, false, {
            fileName: "[project]/strony_www/drozniak-landingpage/app/panel/[...slug]/page.tsx",
            lineNumber: 96,
            columnNumber: 12
        }, this);
    }
    const handleChangePassword = async (e)=>{
        e.preventDefault();
        setPasswordError(null);
        setPasswordSuccess(null);
        setPasswordLoading(true);
        // Walidacja
        if (newPassword.length < 6) {
            setPasswordError('Hasło musi mieć co najmniej 6 znaków.');
            setPasswordLoading(false);
            return;
        }
        if (newPassword !== confirmNewPassword) {
            setPasswordError('Hasła nie są identyczne.');
            setPasswordLoading(false);
            return;
        }
        // Zmiana hasła
        const { error } = await updatePassword(newPassword);
        if (error) {
            const errorMessage = error.message.toLowerCase();
            if (errorMessage.includes('same') || errorMessage.includes('identical')) {
                setPasswordError('Nowe hasło musi być inne niż obecne.');
            } else if (errorMessage.includes('weak')) {
                setPasswordError('Hasło jest zbyt słabe. Użyj silniejszego hasła.');
            } else {
                setPasswordError(`Wystąpił błąd: ${error.message}. Spróbuj ponownie.`);
            }
            setPasswordLoading(false);
        } else {
            setPasswordSuccess('Hasło zostało zmienione pomyślnie!');
            setNewPassword('');
            setConfirmNewPassword('');
            setPasswordLoading(false);
            setTimeout(()=>{
                setShowPasswordModal(false);
                setPasswordSuccess(null);
            }, 2000);
        }
    };
    const onPasswordChange = ()=>setShowPasswordModal(true);
    const onProfileClick = ()=>router.push('/panel/data');
    const renderContent = ()=>{
        if (activeTab === 'documents') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$ClientDocumentsView$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ClientDocumentsView"], {}, void 0, false, {
            fileName: "[project]/strony_www/drozniak-landingpage/app/panel/[...slug]/page.tsx",
            lineNumber: 147,
            columnNumber: 43
        }, this);
        if (activeTab === 'courses') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$app$2f$components$2f$ClientCoursesView$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ClientCoursesView"], {}, void 0, false, {
            fileName: "[project]/strony_www/drozniak-landingpage/app/panel/[...slug]/page.tsx",
            lineNumber: 148,
            columnNumber: 41
        }, this);
        if (activeTab === 'marketing') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$ClientMarketingView$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ClientMarketingView"], {
            panelClient: panelClient
        }, void 0, false, {
            fileName: "[project]/strony_www/drozniak-landingpage/app/panel/[...slug]/page.tsx",
            lineNumber: 149,
            columnNumber: 43
        }, this);
        if (activeTab === 'data') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$ClientDataView$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ClientDataView"], {}, void 0, false, {
            fileName: "[project]/strony_www/drozniak-landingpage/app/panel/[...slug]/page.tsx",
            lineNumber: 150,
            columnNumber: 38
        }, this);
        if (activeTab === 'projects') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$ClientProjectsView$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ClientProjectsView"], {}, void 0, false, {
            fileName: "[project]/strony_www/drozniak-landingpage/app/panel/[...slug]/page.tsx",
            lineNumber: 151,
            columnNumber: 42
        }, this);
        return null;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-[#101820] text-white flex flex-col",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "flex-shrink-0 flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#101820]/95",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "font-[Montserrat] text-base font-semibold text-white",
                        children: "Panel klienta"
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/app/panel/[...slug]/page.tsx",
                        lineNumber: 158,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$app$2f$components$2f$UserMenu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UserMenu"], {
                        onPasswordChange: onPasswordChange,
                        onProfileClick: onProfileClick
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/app/panel/[...slug]/page.tsx",
                        lineNumber: 159,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/strony_www/drozniak-landingpage/app/panel/[...slug]/page.tsx",
                lineNumber: 157,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-1 min-h-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                        className: "flex-shrink-0 w-48 border-r border-white/10 bg-white/[0.02] py-3",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                            className: "px-2 space-y-0.5",
                            children: orderedGrants.map((t)=>{
                                const { path, label } = TAB[t];
                                const href = `/panel/${path}`;
                                const isActive = activeTab === t;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: href,
                                    className: `block px-3 py-2 rounded-lg text-sm transition-colors ${isActive ? 'bg-[#fee715]/20 text-[#fee715]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`,
                                    children: label
                                }, t, false, {
                                    fileName: "[project]/strony_www/drozniak-landingpage/app/panel/[...slug]/page.tsx",
                                    lineNumber: 170,
                                    columnNumber: 17
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/strony_www/drozniak-landingpage/app/panel/[...slug]/page.tsx",
                            lineNumber: 164,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/app/panel/[...slug]/page.tsx",
                        lineNumber: 163,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        className: "flex-1 overflow-auto px-4 py-4",
                        children: renderContent()
                    }, void 0, false, {
                        fileName: "[project]/strony_www/drozniak-landingpage/app/panel/[...slug]/page.tsx",
                        lineNumber: 184,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/strony_www/drozniak-landingpage/app/panel/[...slug]/page.tsx",
                lineNumber: 162,
                columnNumber: 7
            }, this),
            showPasswordModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center px-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-[#18232F] border border-white/10 rounded-xl p-6 md:p-8 max-w-md w-full shadow-2xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between items-center mb-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "font-[Montserrat] text-base font-bold text-white",
                                    children: "Zmień hasło"
                                }, void 0, false, {
                                    fileName: "[project]/strony_www/drozniak-landingpage/app/panel/[...slug]/page.tsx",
                                    lineNumber: 194,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setShowPasswordModal(false);
                                        setPasswordError(null);
                                        setPasswordSuccess(null);
                                        setNewPassword('');
                                        setConfirmNewPassword('');
                                    },
                                    className: "text-gray-400 hover:text-white transition-colors",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "w-6 h-6",
                                        fill: "none",
                                        stroke: "currentColor",
                                        viewBox: "0 0 24 24",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                            d: "M6 18L18 6M6 6l12 12"
                                        }, void 0, false, {
                                            fileName: "[project]/strony_www/drozniak-landingpage/app/panel/[...slug]/page.tsx",
                                            lineNumber: 208,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/strony_www/drozniak-landingpage/app/panel/[...slug]/page.tsx",
                                        lineNumber: 207,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/strony_www/drozniak-landingpage/app/panel/[...slug]/page.tsx",
                                    lineNumber: 197,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/strony_www/drozniak-landingpage/app/panel/[...slug]/page.tsx",
                            lineNumber: 193,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: handleChangePassword,
                            className: "space-y-5",
                            children: [
                                passwordSuccess && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-green-500/20 border border-green-500/50 rounded-lg p-4 text-green-200 text-sm flex items-start gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "w-5 h-5 flex-shrink-0 mt-0.5",
                                            fill: "none",
                                            stroke: "currentColor",
                                            viewBox: "0 0 24 24",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: 2,
                                                d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/app/panel/[...slug]/page.tsx",
                                                lineNumber: 218,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/strony_www/drozniak-landingpage/app/panel/[...slug]/page.tsx",
                                            lineNumber: 217,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1",
                                            children: passwordSuccess
                                        }, void 0, false, {
                                            fileName: "[project]/strony_www/drozniak-landingpage/app/panel/[...slug]/page.tsx",
                                            lineNumber: 220,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/strony_www/drozniak-landingpage/app/panel/[...slug]/page.tsx",
                                    lineNumber: 216,
                                    columnNumber: 17
                                }, this),
                                passwordError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-red-200 text-sm flex items-start gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "w-5 h-5 flex-shrink-0 mt-0.5",
                                            fill: "none",
                                            stroke: "currentColor",
                                            viewBox: "0 0 24 24",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: 2,
                                                d: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            }, void 0, false, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/app/panel/[...slug]/page.tsx",
                                                lineNumber: 228,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/strony_www/drozniak-landingpage/app/panel/[...slug]/page.tsx",
                                            lineNumber: 227,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1",
                                            children: passwordError
                                        }, void 0, false, {
                                            fileName: "[project]/strony_www/drozniak-landingpage/app/panel/[...slug]/page.tsx",
                                            lineNumber: 230,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/strony_www/drozniak-landingpage/app/panel/[...slug]/page.tsx",
                                    lineNumber: 226,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "newPassword",
                                            className: "block text-sm font-medium text-gray-300 mb-2",
                                            children: [
                                                "Nowe hasło",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-gray-500 text-xs ml-2",
                                                    children: "(min. 6 znaków)"
                                                }, void 0, false, {
                                                    fileName: "[project]/strony_www/drozniak-landingpage/app/panel/[...slug]/page.tsx",
                                                    lineNumber: 237,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/strony_www/drozniak-landingpage/app/panel/[...slug]/page.tsx",
                                            lineNumber: 235,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            id: "newPassword",
                                            type: "password",
                                            value: newPassword,
                                            onChange: (e)=>setNewPassword(e.target.value),
                                            required: true,
                                            minLength: 6,
                                            className: "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#fee715] focus:border-transparent transition-all",
                                            placeholder: "••••••••"
                                        }, void 0, false, {
                                            fileName: "[project]/strony_www/drozniak-landingpage/app/panel/[...slug]/page.tsx",
                                            lineNumber: 239,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/strony_www/drozniak-landingpage/app/panel/[...slug]/page.tsx",
                                    lineNumber: 234,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "confirmNewPassword",
                                            className: "block text-sm font-medium text-gray-300 mb-2",
                                            children: "Potwierdź nowe hasło"
                                        }, void 0, false, {
                                            fileName: "[project]/strony_www/drozniak-landingpage/app/panel/[...slug]/page.tsx",
                                            lineNumber: 252,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            id: "confirmNewPassword",
                                            type: "password",
                                            value: confirmNewPassword,
                                            onChange: (e)=>setConfirmNewPassword(e.target.value),
                                            required: true,
                                            minLength: 6,
                                            className: "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#fee715] focus:border-transparent transition-all",
                                            placeholder: "••••••••"
                                        }, void 0, false, {
                                            fileName: "[project]/strony_www/drozniak-landingpage/app/panel/[...slug]/page.tsx",
                                            lineNumber: 255,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/strony_www/drozniak-landingpage/app/panel/[...slug]/page.tsx",
                                    lineNumber: 251,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-3 pt-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>{
                                                setShowPasswordModal(false);
                                                setPasswordError(null);
                                                setPasswordSuccess(null);
                                                setNewPassword('');
                                                setConfirmNewPassword('');
                                            },
                                            className: "flex-1 bg-white/10 text-white font-[Montserrat] font-bold py-3 px-6 rounded-lg hover:bg-white/20 transition-all duration-300",
                                            children: "Anuluj"
                                        }, void 0, false, {
                                            fileName: "[project]/strony_www/drozniak-landingpage/app/panel/[...slug]/page.tsx",
                                            lineNumber: 268,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "submit",
                                            disabled: passwordLoading,
                                            className: "flex-1 bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] font-[Montserrat] font-bold py-3 px-6 rounded-lg hover:shadow-2xl hover:shadow-[#fee715]/40 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
                                            children: passwordLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "flex items-center justify-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        className: "animate-spin h-5 w-5",
                                                        xmlns: "http://www.w3.org/2000/svg",
                                                        fill: "none",
                                                        viewBox: "0 0 24 24",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                                className: "opacity-25",
                                                                cx: "12",
                                                                cy: "12",
                                                                r: "10",
                                                                stroke: "currentColor",
                                                                strokeWidth: "4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/strony_www/drozniak-landingpage/app/panel/[...slug]/page.tsx",
                                                                lineNumber: 289,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                className: "opacity-75",
                                                                fill: "currentColor",
                                                                d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                            }, void 0, false, {
                                                                fileName: "[project]/strony_www/drozniak-landingpage/app/panel/[...slug]/page.tsx",
                                                                lineNumber: 290,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/strony_www/drozniak-landingpage/app/panel/[...slug]/page.tsx",
                                                        lineNumber: 288,
                                                        columnNumber: 23
                                                    }, this),
                                                    "Zmienianie..."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/strony_www/drozniak-landingpage/app/panel/[...slug]/page.tsx",
                                                lineNumber: 287,
                                                columnNumber: 21
                                            }, this) : 'Zmień hasło'
                                        }, void 0, false, {
                                            fileName: "[project]/strony_www/drozniak-landingpage/app/panel/[...slug]/page.tsx",
                                            lineNumber: 281,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/strony_www/drozniak-landingpage/app/panel/[...slug]/page.tsx",
                                    lineNumber: 267,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/strony_www/drozniak-landingpage/app/panel/[...slug]/page.tsx",
                            lineNumber: 213,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/strony_www/drozniak-landingpage/app/panel/[...slug]/page.tsx",
                    lineNumber: 192,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/strony_www/drozniak-landingpage/app/panel/[...slug]/page.tsx",
                lineNumber: 191,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/strony_www/drozniak-landingpage/app/panel/[...slug]/page.tsx",
        lineNumber: 156,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=strony_www_drozniak-landingpage_2f36ab78._.js.map