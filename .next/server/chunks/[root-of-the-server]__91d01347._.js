module.exports=[18622,(e,t,r)=>{t.exports=e.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},56704,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},32319,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},24725,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/after-task-async-storage.external.js",()=>require("next/dist/server/app-render/after-task-async-storage.external.js"))},70406,(e,t,r)=>{t.exports=e.x("next/dist/compiled/@opentelemetry/api",()=>require("next/dist/compiled/@opentelemetry/api"))},93695,(e,t,r)=>{t.exports=e.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},55830,e=>{"use strict";var t=e.i(26400),r=e.i(80546),o=e.i(57935),a=e.i(1475),n=e.i(33650),i=e.i(45791),s=e.i(79044),l=e.i(33935),d=e.i(11397),p=e.i(88514),c=e.i(7787),u=e.i(78342),x=e.i(37821),g=e.i(60844),h=e.i(26829),m=e.i(93695);e.i(99331);var f=e.i(57555),y=e.i(25826);async function v(e){try{let{fullName:t,companyName:r,email:o,phone:a,completionDate:n,additionalQuestion:i}=await e.json();if(!t||!r||!o||!n)return y.NextResponse.json({error:"Missing required fields"},{status:400});if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(o))return y.NextResponse.json({error:"Invalid email format"},{status:400});let s=process.env.RESEND_API_KEY;if(!s)return console.error("RESEND_API_KEY is not set"),y.NextResponse.json({error:"Email service not configured"},{status:500});let l=`Ukończenie szkolenia - ${t} (${r})`,d=`
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
        <div style="background-color: #101820; color: white; padding: 30px; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 24px; color: #fee715;">Ukończenie szkolenia</h1>
          <p style="margin: 10px 0 0 0; color: #00C9A7; font-size: 14px;">Social Boost: Sztuka Marketingu Online</p>
        </div>
        <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; border-left: 4px solid #fee715; margin-bottom: 20px;">
            <p style="margin: 0; color: #666; font-size: 14px; line-height: 1.6;">
              Użytkownik ukończył szkolenie i przesłał dane do przygotowania zaświadczenia.
            </p>
          </div>
          
          <div style="background-color: #fafafa; padding: 25px; border-radius: 8px; border: 1px solid #e0e0e0; margin-bottom: 20px;">
            <h2 style="margin: 0 0 20px 0; font-size: 18px; color: #101820; border-bottom: 2px solid #fee715; padding-bottom: 10px;">
              Dane do zaświadczenia
            </h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: bold; width: 200px;">Imię i nazwisko:</td>
                <td style="padding: 8px 0; color: #333;">${t}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: bold;">Nazwa firmy:</td>
                <td style="padding: 8px 0; color: #333;">${r}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: bold;">Email:</td>
                <td style="padding: 8px 0; color: #333;">${o}</td>
              </tr>
              ${a?`
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: bold;">Telefon:</td>
                <td style="padding: 8px 0; color: #333;">${a}</td>
              </tr>
              `:""}
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: bold;">Data ukończenia:</td>
                <td style="padding: 8px 0; color: #333;">${new Date(n).toLocaleDateString("pl-PL",{day:"numeric",month:"long",year:"numeric"})}</td>
              </tr>
            </table>
          </div>

          ${i?`
          <div style="background-color: #fafafa; padding: 25px; border-radius: 8px; border: 1px solid #e0e0e0; margin-bottom: 20px;">
            <h2 style="margin: 0 0 15px 0; font-size: 18px; color: #101820; border-bottom: 2px solid #fee715; padding-bottom: 10px;">
              Pytanie do prowadzącego
            </h2>
            <p style="margin: 0; color: #333; line-height: 1.6; white-space: pre-wrap;">${i}</p>
          </div>
          `:""}

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
            <p style="margin: 0; color: #999; font-size: 12px; text-align: center;">
              Email wysłany automatycznie z formularza zakończenia szkolenia
            </p>
          </div>
        </div>
      </div>
    `,p=await fetch("https://api.resend.com/emails",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${s}`},body:JSON.stringify({from:"Kontakt <noreply@drozniak.com>",to:["stanislaw@drozniak.com"],reply_to:o,subject:l,html:d})});if(!p.ok){let e=await p.json();return console.error("Resend API error:",e),y.NextResponse.json({error:"Failed to send email"},{status:500})}return y.NextResponse.json({success:!0},{status:200})}catch(e){return console.error("Course completion email error:",e),y.NextResponse.json({error:"Internal server error"},{status:500})}}e.s(["POST",()=>v],88225);var w=e.i(88225);let R=new t.AppRouteRouteModule({definition:{kind:r.RouteKind.APP_ROUTE,page:"/api/course-completion-email/route",pathname:"/api/course-completion-email",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/strony_www/drozniak-landingpage/app/api/course-completion-email/route.ts",nextConfigOutput:"",userland:w}),{workAsyncStorage:b,workUnitAsyncStorage:E,serverHooks:k}=R;function C(){return(0,o.patchFetch)({workAsyncStorage:b,workUnitAsyncStorage:E})}async function A(e,t,o){R.isDev&&(0,a.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let y="/api/course-completion-email/route";y=y.replace(/\/index$/,"")||"/";let v=await R.prepare(e,t,{srcPage:y,multiZoneDraftMode:!1});if(!v)return t.statusCode=400,t.end("Bad Request"),null==o.waitUntil||o.waitUntil.call(o,Promise.resolve()),null;let{buildId:w,params:b,nextConfig:E,parsedUrl:k,isDraftMode:C,prerenderManifest:A,routerServerContext:z,isOnDemandRevalidate:N,revalidateOnlyGenerated:P,resolvedPathname:T,clientReferenceManifest:j,serverActionsManifest:S}=v,_=(0,s.normalizeAppPath)(y),O=!!(A.dynamicRoutes[_]||A.routes[T]),q=async()=>((null==z?void 0:z.render404)?await z.render404(e,t,k,!1):t.end("This page could not be found"),null);if(O&&!C){let e=!!A.routes[T],t=A.dynamicRoutes[_];if(t&&!1===t.fallback&&!e){if(E.experimental.adapterPath)return await q();throw new m.NoFallbackError}}let I=null;!O||R.isDev||C||(I="/index"===(I=T)?"/":I);let $=!0===R.isDev||!O,D=O&&!$;S&&j&&(0,i.setManifestsSingleton)({page:y,clientReferenceManifest:j,serverActionsManifest:S});let U=e.method||"GET",H=(0,n.getTracer)(),M=H.getActiveScopeSpan(),K={params:b,prerenderManifest:A,renderOpts:{experimental:{authInterrupts:!!E.experimental.authInterrupts},cacheComponents:!!E.cacheComponents,supportsDynamicResponse:$,incrementalCache:(0,a.getRequestMeta)(e,"incrementalCache"),cacheLifeProfiles:E.cacheLife,waitUntil:o.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,r,o,a)=>R.onRequestError(e,t,o,a,z)},sharedContext:{buildId:w}},F=new l.NodeNextRequest(e),B=new l.NodeNextResponse(t),L=d.NextRequestAdapter.fromNodeNextRequest(F,(0,d.signalFromNodeResponse)(t));try{let i=async e=>R.handle(L,K).finally(()=>{if(!e)return;e.setAttributes({"http.status_code":t.statusCode,"next.rsc":!1});let r=H.getRootSpanAttributes();if(!r)return;if(r.get("next.span_type")!==p.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${r.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let o=r.get("next.route");if(o){let t=`${U} ${o}`;e.setAttributes({"next.route":o,"http.route":o,"next.span_name":t}),e.updateName(t)}else e.updateName(`${U} ${y}`)}),s=!!(0,a.getRequestMeta)(e,"minimalMode"),l=async a=>{var n,l;let d=async({previousCacheEntry:r})=>{try{if(!s&&N&&P&&!r)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let n=await i(a);e.fetchMetrics=K.renderOpts.fetchMetrics;let l=K.renderOpts.pendingWaitUntil;l&&o.waitUntil&&(o.waitUntil(l),l=void 0);let d=K.renderOpts.collectedTags;if(!O)return await (0,u.sendResponse)(F,B,n,K.renderOpts.pendingWaitUntil),null;{let e=await n.blob(),t=(0,x.toNodeOutgoingHttpHeaders)(n.headers);d&&(t[h.NEXT_CACHE_TAGS_HEADER]=d),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let r=void 0!==K.renderOpts.collectedRevalidate&&!(K.renderOpts.collectedRevalidate>=h.INFINITE_CACHE)&&K.renderOpts.collectedRevalidate,o=void 0===K.renderOpts.collectedExpire||K.renderOpts.collectedExpire>=h.INFINITE_CACHE?void 0:K.renderOpts.collectedExpire;return{value:{kind:f.CachedRouteKind.APP_ROUTE,status:n.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:r,expire:o}}}}catch(t){throw(null==r?void 0:r.isStale)&&await R.onRequestError(e,t,{routerKind:"App Router",routePath:y,routeType:"route",revalidateReason:(0,c.getRevalidateReason)({isStaticGeneration:D,isOnDemandRevalidate:N})},!1,z),t}},p=await R.handleResponse({req:e,nextConfig:E,cacheKey:I,routeKind:r.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:A,isRoutePPREnabled:!1,isOnDemandRevalidate:N,revalidateOnlyGenerated:P,responseGenerator:d,waitUntil:o.waitUntil,isMinimalMode:s});if(!O)return null;if((null==p||null==(n=p.value)?void 0:n.kind)!==f.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==p||null==(l=p.value)?void 0:l.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});s||t.setHeader("x-nextjs-cache",N?"REVALIDATED":p.isMiss?"MISS":p.isStale?"STALE":"HIT"),C&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let m=(0,x.fromNodeOutgoingHttpHeaders)(p.value.headers);return s&&O||m.delete(h.NEXT_CACHE_TAGS_HEADER),!p.cacheControl||t.getHeader("Cache-Control")||m.get("Cache-Control")||m.set("Cache-Control",(0,g.getCacheControlHeader)(p.cacheControl)),await (0,u.sendResponse)(F,B,new Response(p.value.body,{headers:m,status:p.value.status||200})),null};M?await l(M):await H.withPropagatedContext(e.headers,()=>H.trace(p.BaseServerSpan.handleRequest,{spanName:`${U} ${y}`,kind:n.SpanKind.SERVER,attributes:{"http.method":U,"http.target":e.url}},l))}catch(t){if(t instanceof m.NoFallbackError||await R.onRequestError(e,t,{routerKind:"App Router",routePath:_,routeType:"route",revalidateReason:(0,c.getRevalidateReason)({isStaticGeneration:D,isOnDemandRevalidate:N})},!1,z),O)throw t;return await (0,u.sendResponse)(F,B,new Response(null,{status:500})),null}}e.s(["handler",()=>A,"patchFetch",()=>C,"routeModule",()=>R,"serverHooks",()=>k,"workAsyncStorage",()=>b,"workUnitAsyncStorage",()=>E],55830)}];

//# sourceMappingURL=%5Broot-of-the-server%5D__91d01347._.js.map