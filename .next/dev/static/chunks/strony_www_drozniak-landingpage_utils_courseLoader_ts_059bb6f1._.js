(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/strony_www/drozniak-landingpage/utils/courseLoader.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "loadCourseModules",
    ()=>loadCourseModules
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$config$2f$trainingModules$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/config/trainingModules.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$config$2f$trainingModulesSocialBoost$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/strony_www/drozniak-landingpage/config/trainingModulesSocialBoost.ts [app-client] (ecmascript)");
;
;
const loadCourseModules = (configPath)=>{
    switch(configPath){
        case 'trainingModules':
            return __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$config$2f$trainingModules$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trainingModules"];
        case 'trainingModulesSocialBoost':
            return __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$config$2f$trainingModulesSocialBoost$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trainingModulesSocialBoost"];
        default:
            console.warn(`Unknown config path: ${configPath}, using default`);
            return __TURBOPACK__imported__module__$5b$project$5d2f$strony_www$2f$drozniak$2d$landingpage$2f$config$2f$trainingModules$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trainingModules"];
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=strony_www_drozniak-landingpage_utils_courseLoader_ts_059bb6f1._.js.map