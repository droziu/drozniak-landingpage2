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
"[project]/strony_www/drozniak-landingpage/app/panel/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PanelRootPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$app$2f$hooks$2f$useClientPanel$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/app/hooks/useClientPanel.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$LoadingState$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/components/LoadingState.tsx [app-ssr] (ecmascript)");
'use client';
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
const TAB_ORDER = [
    'data',
    'documents',
    'courses',
    'marketing',
    'projects'
];
function PanelRootPage() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { panelClient, viewGrants, loading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$app$2f$hooks$2f$useClientPanel$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useClientPanel"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!loading) {
            // Jeśli nie ma panelu klienta, przekieruj do widoku z komunikatem
            if (!panelClient) {
                // Użyj catch-all route, który obsłuży brak panelu
                router.replace('/panel/data');
                return;
            }
            // Jeśli nie ma uprawnień, przekieruj do widoku z komunikatem
            if (viewGrants.length === 0) {
                router.replace('/panel/data');
                return;
            }
            // Jeśli są uprawnienia, przekieruj do pierwszego dostępnego widoku
            if (viewGrants.length > 0) {
                const orderedGrants = TAB_ORDER.filter((t)=>viewGrants.includes(t));
                const first = TAB[orderedGrants[0]];
                if (first) {
                    router.replace(`/panel/${first.path}`);
                }
            }
        }
    }, [
        loading,
        panelClient,
        viewGrants,
        router
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$components$2f$LoadingState$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LoadingState"], {
        variant: "fullscreen",
        label: "Ładowanie panelu…"
    }, void 0, false, {
        fileName: "[project]/strony_www/drozniak-landingpage/app/panel/page.tsx",
        lineNumber: 48,
        columnNumber: 10
    }, this);
}
}),
];

//# sourceMappingURL=strony_www_drozniak-landingpage_app_0eb3e588._.js.map