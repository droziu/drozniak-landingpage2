module.exports = [
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
];

//# sourceMappingURL=strony_www_drozniak-landingpage_e672dbea._.js.map