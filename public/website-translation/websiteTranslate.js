(function(){"use strict";const _={CONFIG:"/translate/config",TEXT_BASED:"/translate/text-based",CHECK_EDIT_PERMISSION:"/translate/cache/check-edit-permission",CACHE_UPDATE_ON_PAGE:"/translate/cache/update-on-page"},b={ERROR_MESSAGE:"tl-error-message",DROPDOWN_CONTAINER:"tl-dropdown-container",DROPDOWN_STYLE:"tl-dropdown-style",DROPDOWN:"tl-dropdown",POWERED_BY:"tl-powered-by"},h={NO_TRANSLATE:"data-no-translate",TRANSLATED_TO:"data-tl-to",SOURCE_TEXT:"data-tl-src",SOURCE_ATTRIBUTE_PREFIX:"data-tl-src-",TRANSLATION_STATE:"data-tl-state"},z=["title","alt","placeholder","value","aria-label","aria-description","data-tooltip","data-tip","data-original-title","data-hover","data-after-content"],V={ERROR_MESSAGE_DURATION:5e3,SPA_NAVIGATION_DEBOUNCE:150,DYNAMIC_TRANSLATION_DEBOUNCE:100},B={DROPDOWN_POSITION:"tl-dropdown-position",SELECTED_LANGUAGE:"tl-selected-language",SOURCE_CACHE:"tl-source-cache"},st=["[data-no-translate]",'[data-translated="true"]',".notranslate",'[translate="no"]',"script","style","noscript"],at=["[data-no-rtl]",'[data-rtl="false"]',".noRtl",".no-rtl"],T={POPOVER:"ce-popover",POPOVER_STYLE:"ce-popover-style",EDIT_PILL:"tl-edit-pill",EDIT_PILL_STYLE:"tl-edit-pill-style"},lt={HOVER_DEBOUNCE:50},C={GAP:8,VIEWPORT_MARGIN:8},ct=new Set(["ar","he","fa","ur","ps","sd","ug","yi"]);function dt(d){const t=d.split("-")[0].toLowerCase();if(ct.has(t))return!0;try{const e=new Intl.Locale(d).maximize().script;return e==="Arab"||e==="Hebr"}catch{return!1}}function q(d){const t=dt(d)?"rtl":"ltr";document.documentElement.dir=t,document.documentElement.lang=d,document.body?(document.body.dir=t,document.body.lang=d):document.addEventListener("DOMContentLoaded",()=>{document.body&&(document.body.dir=t,document.body.lang=d)},{once:!0});const e="translator-rtl-overrides";if(!document.getElementById(e)){const i=document.createElement("style");i.id=e,i.type="text/css";const r=Array.from(at).join(", ");i.textContent=`${r} { direction: ltr !important; unicode-bidi: isolate !important; }`,document.head.appendChild(i)}const n="translator-body-direction-enforcer",o=document.getElementById(n);if(t==="ltr")if(o)o.textContent="body { direction: ltr !important; }";else{const i=document.createElement("style");i.id=n,i.type="text/css",i.textContent="body { direction: ltr !important; }",document.head.appendChild(i)}else o&&o.remove()}class f{static showErrorMessage(t,e,n){const o=document.getElementById(b.ERROR_MESSAGE);o&&o.remove();const i=document.createElement("div");i.id=b.ERROR_MESSAGE,i.setAttribute("data-no-translate","true");const r=this.getErrorDetail(t,e);console.error(`Translation Error [${t}]:`,r.message,e);const s=document.createElement("div");s.style.cssText="display: flex; flex-direction: column; gap: 8px;";const a=document.createElement("div");if(a.textContent=r.message,s.appendChild(a),r.retryable&&n){const l=document.createElement("button");l.textContent="Retry",l.style.cssText=`
                background: white; color: #dc2626; border: none;
                padding: 4px 12px; border-radius: 4px; cursor: pointer;
                font-size: 12px; font-weight: 500; margin-top: 4px;
            `,l.onclick=()=>{i.remove(),n()},s.appendChild(l)}i.style.cssText=`
            position: fixed; bottom: 24px; right: 24px; z-index: 9999;
            background: #dc2626; color: white; padding: 12px 16px;
            border-radius: 8px; font: 14px/1.4 sans-serif;
            max-width: 320px; box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        `,i.appendChild(s),document.body.appendChild(i);const c=r.showDuration||V.ERROR_MESSAGE_DURATION;setTimeout(()=>{i.parentNode&&i.remove()},c)}static getErrorDetail(t,e){const n={auth:{type:"auth",message:e||"🔒 Authentication failed. Please check your API key.",retryable:!1,showDuration:8e3},server:{type:"server",message:e||"⚠️ Translation service temporarily unavailable. Please try again later.",retryable:!0,showDuration:8e3},network:{type:"network",message:e||"🌐 Connection failed. Please check your internet connection.",retryable:!0,showDuration:8e3},"rate-limit":{type:"rate-limit",message:e||"⏳ Too many requests. Please try again later.",fallback:"Using cached translations where available.",retryable:!0,showDuration:1e4},"unsupported-language":{type:"unsupported-language",message:e||"🌍 Language not supported. Using default language.",retryable:!1,showDuration:6e3},"invalid-url":{type:"invalid-url",message:e||"❌ Invalid URL format. Please check the URL and try again.",retryable:!1,showDuration:8e3},"cache-unavailable":{type:"cache-unavailable",message:e||"💾 Cache unavailable. Using direct translation service.",fallback:"Translations may be slower than usual.",retryable:!1,showDuration:6e3},"config-invalid":{type:"config-invalid",message:e||"⚙️ Invalid configuration. Please contact support.",retryable:!1,showDuration:1e4},offline:{type:"offline",message:e||"📡 You are offline. Using cached translations where available.",fallback:"New translations unavailable until connection restored.",retryable:!0,showDuration:6e3}};return n[t]||n.server}static clearError(){const t=document.getElementById(b.ERROR_MESSAGE);t&&t.remove()}static isOffline(){return!navigator.onLine}}async function ht(d,t){const e=t??`Request failed (${d.status})`,n=await d.json().catch(()=>null);if(!n||typeof n!="object")return e;const o=n.detail;if(typeof o=="string"&&o.trim())return o.trim();if(Array.isArray(o)){const r=o.map(s=>{if(!s||typeof s!="object")return"";const a=s.msg??s.message;return typeof a=="string"?a.trim():""}).filter(Boolean);if(r.length)return r.join(" ")}if(o&&typeof o=="object"){const r=o.message;if(typeof r=="string"&&r.trim())return r.trim()}const i=n.message;return typeof i=="string"&&i.trim()?i.trim():e}function ut(d){return d.replace(/_([a-z])/g,(t,e)=>e.toUpperCase())}function gt(d){return d.replace(/[A-Z]/g,t=>`_${t.toLowerCase()}`)}function pt(d){return Object.fromEntries(Object.entries(d).map(([t,e])=>[ut(t),e]))}function K(d){return Object.fromEntries(Object.entries(d).map(([t,e])=>[gt(t),e]))}class ${constructor(t,e){this.maxRetries=3,this.apiUrl=(t==null?void 0:t.apiUrl)||"https://website-translator.camb.ai",this.onCriticalError=e}getApiUrl(){return this.apiUrl}setCriticalErrorHandler(t){this.onCriticalError=t}async checkRedisAvailability({textNodes:t=["__health__"],translateConfig:e,apiConfig:n,pageContext:o,abortSignal:i}){try{const r=await fetch(`${this.apiUrl}${_.TEXT_BASED}`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json",Authorization:`Bearer ${n.key}`,"X-Domain":n.domain},body:JSON.stringify(K({textNodes:t,translateConfig:e,dropdownLabels:[],pageContext:o})),signal:i});if(!r.ok)return await this.handleTranslationError(r),!1;const s=await r.json();return!(s&&s.redis_available===!1)}catch(r){if(r instanceof Error&&(r.message==="REDIS_UNAVAILABLE"||r.message==="RATE_LIMIT"))return!1;throw r}}async fetchConfig(t,e){try{if(!t||!e)throw f.showErrorMessage("config-invalid","Invalid configuration: Missing API key or domain."),new Error("INVALID_CONFIG");try{new URL(this.apiUrl)}catch{throw f.showErrorMessage("invalid-url","Invalid API URL format."),new Error("INVALID_URL")}const n=await fetch(`${this.apiUrl}${_.CONFIG}`,{method:"GET",credentials:"omit",headers:{Authorization:`Bearer ${t}`,Origin:window.location.origin,"Content-Type":"application/json"}});if(!n.ok)throw await this.handleConfigError(n),new Error(`HTTP error! status: ${n.status}`);const o=await n.json(),i=o.payload||o;if(!i.default_language)throw f.showErrorMessage("config-invalid","Invalid configuration: Missing default language."),new Error("INVALID_CONFIG");if(!i.selected_languages)throw f.showErrorMessage("config-invalid","Invalid configuration: No target languages specified."),new Error("INVALID_CONFIG");return{domain:e,defaultLang:i.default_language,languageLabels:i.language_labels,targetLanguages:i.selected_languages,websiteId:i.website_id,teamId:i.team_id}}catch(n){throw console.error("❌ Failed to fetch configuration:",n),n instanceof TypeError&&n.message.includes("Failed to fetch")?(f.isOffline()?f.showErrorMessage("offline","Cannot load translation configuration while offline."):f.showErrorMessage("network","Failed to load translation configuration. Please check your connection."),new Error("NETWORK_ERROR")):(n instanceof Error&&n.message==="RATE_LIMIT",n)}}async handleConfigError(t){var n,o;const e=await t.json().catch(()=>({}));if(t.status===401)f.showErrorMessage("auth",e.error==="invalid_api_key"?"Invalid API key":void 0);else if(t.status===403)f.showErrorMessage("auth",e.error==="origin_not_allowed"?"Domain not authorized for this API key":void 0);else if(t.status===404)f.showErrorMessage("server",((n=e==null?void 0:e.detail)==null?void 0:n.error)==="website_not_found"?e.detail.message:"Translation configuration not found.");else{if(t.status===429)throw f.showErrorMessage("rate-limit",e.message||"You're sending requests too quickly. Please wait and try again."),new Error("RATE_LIMIT");t.status>=500?e.detail&&e.detail.includes("Redis connection failed")?(f.showErrorMessage("server","Translation service unavailable (Redis connection failed)"),(o=this.onCriticalError)==null||o.call(this)):f.showErrorMessage("server"):f.showErrorMessage("network",`HTTP ${t.status}`)}}async translateTextBased({textNodes:t,translateConfig:e,apiConfig:n,dropdownLabels:o,pageContext:i,abortSignal:r}){f.isOffline()&&f.showErrorMessage("offline","You are currently offline. Using cached translations where available.");const s=async(a=0)=>{try{const c=await fetch(`${this.apiUrl}${_.TEXT_BASED}`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json",Authorization:`Bearer ${n.key}`,"X-Domain":n.domain},body:JSON.stringify(K({textNodes:t,translateConfig:e,dropdownLabels:o,pageContext:i})),signal:r});if(!c.ok)throw await this.handleTranslationError(c),new Error(`HTTP error! status: ${c.status}`);const l=await c.json();return l.redis_available===!1&&f.showErrorMessage("cache-unavailable","Cache service temporarily unavailable. Translations may be slower. Please refresh the browser."),pt(l)}catch(c){if($.isAbortError(c))throw c;if(c instanceof TypeError&&c.message.includes("Failed to fetch")){if(a<this.maxRetries)return await new Promise(l=>setTimeout(l,Math.pow(2,a)*1e3)),s(a+1);throw f.isOffline()?f.showErrorMessage("offline"):f.showErrorMessage("network","Network connection failed. Please check your connection."),new Error("NETWORK_ERROR")}if(c instanceof Error&&c.message==="RATE_LIMIT"&&a<2)return await new Promise(l=>setTimeout(l,5e3*(a+1))),s(a+1);throw c}};return s()}async handleTranslationError(t){const e=await t.json().catch(()=>({})),n=e.detail||{},o=n.error||"unknown";let i=`HTTP_${t.status}`;switch(o){case"unsupported_language":f.showErrorMessage("unsupported-language",n.message),i="UNSUPPORTED_LANGUAGE";break;case"rate_limit":const r=n.from_cache_only?"Rate limit reached. Serving cached translations.":"Too many requests. Please try again later.";f.showErrorMessage("rate-limit",r),i="RATE_LIMIT";break;case"invalid_api_key":f.showErrorMessage("auth","Invalid API key. Please check your configuration."),i="UNAUTHORIZED";break;case"domain_mismatch":case"origin_not_allowed":f.showErrorMessage("auth","This domain is not authorized for the provided API key."),i="FORBIDDEN";break;default:t.status===401?(f.showErrorMessage("auth",n.message||"Authentication failed"),i="UNAUTHORIZED"):t.status===403?(f.showErrorMessage("auth",n.message||"Access forbidden"),i="FORBIDDEN"):t.status===404?f.showErrorMessage("server",e.error==="website_not_found"?"Translation configuration not found.":void 0):t.status===429?(f.showErrorMessage("rate-limit",n.message||"You’re sending requests too quickly. Please wait a moment and try again."),i="RATE_LIMIT"):t.status>=500?n.message&&n.message.includes("Redis")?(f.showErrorMessage("server","Translation service experiencing issues. Some features may be limited."),i="REDIS_UNAVAILABLE"):(f.showErrorMessage("server",n.message||"Server error"),i="SERVER_ERROR"):(f.showErrorMessage("network",`HTTP ${t.status}: ${n.message||"Unknown error"}`),i="NETWORK_ERROR")}throw new Error(i)}static isAbortError(t){return t.name==="AbortError"}async shouldEnableEditSession(t){try{const e=await fetch(`${this.apiUrl}${_.CHECK_EDIT_PERMISSION}`,{method:"GET",credentials:"include",headers:{Authorization:`Bearer ${t.key}`,Origin:typeof window<"u"?window.location.origin:"","Content-Type":"application/json"}});if(!e.ok)return!1;const n=await e.json();return(n==null?void 0:n.can_edit)===!0}catch{return!1}}async updateTranslationCache(t){const e=await fetch(`${this.apiUrl}${_.CACHE_UPDATE_ON_PAGE}`,{method:"PUT",credentials:"include",headers:{Authorization:`Bearer ${t.apiConfig.key}`,Origin:typeof window<"u"?window.location.origin:"","Content-Type":"application/json"},body:JSON.stringify({source_text:t.sourceText,target_lang:t.targetLang,value:t.value})});if(!e.ok){const n=await ht(e,"Failed to save translation. Please try again.");throw new Error(n)}}}class J{static saveDropdownPosition(t){try{localStorage.setItem(B.DROPDOWN_POSITION,JSON.stringify(t))}catch(e){console.warn("Failed to save dropdown position to localStorage:",e)}}static loadDropdownPosition(){try{const t=localStorage.getItem(B.DROPDOWN_POSITION);if(t){const e=JSON.parse(t);if(typeof e.x=="number"&&typeof e.y=="number")return e}}catch(t){console.warn("Failed to load dropdown position from localStorage:",t)}return null}static saveSelectedLanguage(t){try{localStorage.setItem(B.SELECTED_LANGUAGE,t)}catch(e){console.warn("Failed to save selected language to localStorage:",e)}}static loadSelectedLanguage(){try{let t=localStorage.getItem(B.SELECTED_LANGUAGE);return t&&t[0]==='"'&&t[t.length-1]==='"'&&(t=t.slice(1,-1)),t}catch(t){return console.warn("Failed to load selected language from localStorage:",t),null}}}class E{static getCurrentPath(){return window.location.pathname+window.location.search}static getScriptConfig(){const t=document.currentScript,e=(t==null?void 0:t.dataset.domain)||window.location.host,n=E.normalizeDomain(e);return{apiKey:(t==null?void 0:t.dataset.apiKey)||"",domain:n}}static normalizeDomain(t){if(!t)return"";let e=t.trim().toLowerCase();return e=e.replace(/^(https?:\/\/)/,""),e.startsWith("www.")&&(e=e.slice(4)),e=e.split("/")[0],e}static shouldPreventTranslation(t){if(!t)return!1;let e=t;for(;e;){if(e.getAttribute("translate")==="no"||e.classList&&e.classList.contains("notranslate")||e.hasAttribute("data-no-translate"))return!0;e=e.parentElement}return!1}static isNonContentElement(t){const e=t.tagName;return e==="SCRIPT"||e==="STYLE"||e==="NOSCRIPT"}static escapeHtml(t){const e={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","/":"&#x2F;"};return t.replace(/[&<>"'/]/g,n=>e[n]||n)}static detectCSPViolations(){try{const t=document.createElement("style");t.textContent=".csp-test { display: none; }",document.head.appendChild(t),document.head.removeChild(t)}catch{console.warn("⚠️ CSP may block inline styles needed for translation dropdown")}document.addEventListener("securitypolicyviolation",t=>{(t.violatedDirective.includes("script-src")||t.violatedDirective.includes("style-src")||t.violatedDirective.includes("connect-src"))&&console.warn(`⚠️ CSP violation detected: ${t.violatedDirective} - Translation features may be limited`)})}static getBrowserLanguage(){return navigator.language?navigator.language.split("-")[0].toLowerCase():navigator.languages&&navigator.languages.length>0?navigator.languages[0].split("-")[0].toLowerCase():null}static updateCanonicalUrl(t,e){const n=document.querySelector('link[rel="canonical"]');if(n)try{const o=new URL(n.href);t!==e?o.searchParams.set("lang",t):o.searchParams.delete("lang"),n.href=o.toString()}catch(o){console.warn("Failed to update canonical URL:",o)}}}function Q(d,t=250,e=1e3){return new Promise(n=>{let o;const i=new MutationObserver(()=>{clearTimeout(o),o=window.setTimeout(r,t)});function r(){i.disconnect(),n()}i.observe(d,{childList:!0,subtree:!0,characterData:!0});const s=window.setTimeout(()=>{i.disconnect(),n()},e);o=window.setTimeout(()=>{clearTimeout(s),r()},t)})}class ft{constructor(t,e){this.apiService=t,this.scriptConfig=e,this.state={translationConfig:null,apiConfig:null,currentLang:"en"}}getState(){return{...this.state}}updateState(t){this.state={...this.state,...t}}async initializeConfig(){const{apiKey:t,domain:e}=this.scriptConfig;if(!t)return console.error("❌ No API key provided. Translation disabled."),null;const n=5;let o=0,i=500;for(;o<n;)try{const r=await this.apiService.fetchConfig(t,e),s={defaultLang:r.defaultLang,languageLabels:r.languageLabels,targetLanguages:r.targetLanguages,domain:r.domain,websiteId:r.websiteId,teamId:r.teamId},a={key:t,domain:e,apiUrl:this.apiService.getApiUrl()};this.updateState({translationConfig:s,apiConfig:a});let c=s.defaultLang;const l=J.loadSelectedLanguage(),u=this.scriptConfig.disableAutoBrowserTranslation===!0;if(l&&(s.targetLanguages.includes(l)||l===s.defaultLang))c=l;else if(!u){const g=E.getBrowserLanguage();if(g&&g!==s.defaultLang&&s.targetLanguages.includes(g))c=g;else if(g&&g!==s.defaultLang){const p=s.targetLanguages.find(m=>g.startsWith(m)||m.startsWith(g));p&&(c=p)}}return this.updateState({currentLang:c}),s}catch(r){if(o++,r instanceof Error&&r.message==="RATE_LIMIT"){console.error("❌ Rate limit exceeded. Stopping retries.");break}console.warn(`⚠️ Config fetch attempt ${o} failed: ${r.message}. Retrying in ${i}ms...`),await new Promise(s=>setTimeout(s,i)),i=Math.min(i*2,4e3)}return console.error("❌ Failed to initialize translation script after all retries"),this.updateState({translationConfig:null,apiConfig:null}),null}getCurrentLanguage(){return this.state.currentLang}getTranslationConfig(){return this.state.translationConfig}getApiConfig(){return this.state.apiConfig}setCurrentLanguage(t){this.updateState({currentLang:t}),J.saveSelectedLanguage(t)}isInDefaultLanguage(){var t;return this.state.currentLang===((t=this.state.translationConfig)==null?void 0:t.defaultLang)}}function U(d){return d==="light"?{bg:"#ffffff",bgHover:"#f5f5f5",color:"#333333",border:"1px solid #e0e0e0",shadow:"0 2px 8px rgba(0,0,0,0.1)",optionBg:"#ffffff",optionColor:"#333333"}:{bg:"#333333",bgHover:"#555555",color:"#ffffff",border:"none",shadow:"0 2px 8px rgba(0,0,0,0.3)",optionBg:"#333333",optionColor:"#ffffff"}}const mt=8,Tt="#353535",bt="#ffffff";function Z(d,t){const e=d.split(/\n/).length,n=Math.ceil(d.length/48);return Math.min(t,Math.max(3,e,n))}class vt{constructor(t,e){this.theme=t,this.actions=e,this.popover=null,this.sourceField=null,this.translationField=null,this.saveBtn=null,this.cancelBtn=null,this.closeBtn=null,this.saving=!1,this.hoveredElement=null,this.anchorElement=null,this.draftSnapshot="",this.popoverOpen=!1,this.hideTransitionTimer=null,this.themeColors=U(t),this.boundDocKeydown=n=>this.onDocumentKeydown(n),this.boundDocPointerDown=n=>this.onDocumentPointerDown(n)}create(){const t=document.getElementById(T.POPOVER_STYLE);t&&t.remove();const e=U(this.theme),n=this.theme==="dark",o=n?"rgba(255,255,255,0.06)":"#f5f5f5",i=n?"1px solid rgba(255,255,255,0.12)":"1px solid #e0e0e0",r=n?"rgba(255,255,255,0.55)":"#666666",s=n?"1px solid rgba(255,255,255,0.1)":"1px solid #e8e8e8",a=document.createElement("style");a.id=T.POPOVER_STYLE,a.textContent=`
            #${T.POPOVER} {
                position: fixed;
                z-index: 2147483647;
                width: clamp(320px, min(90vw, 560px), 90vw);
                max-width: 90vw;
                max-height: calc(100vh - 32px);
                overflow-y: auto;
                background: var(--tl-bg, ${e.bg});
                color: var(--tl-color, ${e.color});
                border: var(--tl-border, ${e.border});
                border-radius: 8px;
                box-shadow: var(--tl-box-shadow, ${e.shadow});
                padding: 14px 14px 12px;
                font-family: var(--tl-font-family, 'Inter', sans-serif);
                font-size: 13px;
                line-height: 1.45;
                box-sizing: border-box;
                pointer-events: auto;
                opacity: 0;
                transform: translateY(6px) scale(0.98);
                transition: opacity 0.18s cubic-bezier(0.16, 1, 0.3, 1),
                    transform 0.18s cubic-bezier(0.16, 1, 0.3, 1);
            }

            #${T.POPOVER}.ce-popover--visible {
                opacity: 1;
                transform: translateY(0) scale(1);
            }

            #${T.POPOVER} .ce-label {
                display: block;
                font-size: 11px;
                font-weight: 600;
                color: ${r};
                text-transform: uppercase;
                letter-spacing: 0.05em;
                margin-bottom: 6px;
            }

            #${T.POPOVER} .ce-field {
                margin-bottom: 12px;
            }

            #${T.POPOVER} .ce-footer {
                display: flex;
                justify-content: flex-end;
                gap: 8px;
                margin-top: 4px;
                padding-top: 10px;
                border-top: ${s};
            }

            #${T.POPOVER} textarea {
                width: 100%;
                box-sizing: border-box;
                border: ${i};
                border-radius: 6px;
                padding: 8px 10px;
                font-size: 13px;
                font-family: inherit;
                color: var(--tl-color, ${e.color});
                background: ${o};
                outline: none;
                line-height: 1.5;
            }

            #${T.POPOVER} textarea.ce-source {
                resize: none;
                max-height: 200px;
                overflow-y: auto;
                opacity: 0.75;
            }

            #${T.POPOVER} textarea.ce-translation {
                resize: vertical;
                min-height: 72px;
                max-height: 240px;
            }

            #${T.POPOVER} textarea.ce-translation:focus {
                box-shadow: 0 0 0 2px var(--tl-color, ${e.color});
            }

            #${T.POPOVER} .ce-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 10px;
                padding-bottom: 8px;
                border-bottom: ${s};
            }

            #${T.POPOVER} .ce-title {
                font-size: 13px;
                font-weight: 600;
                color: var(--tl-color, ${e.color});
                letter-spacing: 0.02em;
            }

            #${T.POPOVER} .ce-close {
                width: 28px;
                height: 28px;
                border: none;
                background: transparent;
                cursor: pointer;
                color: ${r};
                font-size: 18px;
                line-height: 1;
                padding: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 6px;
            }

            #${T.POPOVER} .ce-close:hover {
                background: ${n?"rgba(255,255,255,0.08)":"rgba(0,0,0,0.06)"};
                color: ${e.color};
            }

            #${T.POPOVER} .ce-btn {
                font-family: inherit;
                font-size: 13px;
                font-weight: 600;
                padding: 8px 16px;
                border-radius: 6px;
                border: none;
                cursor: pointer;
                transition: opacity 0.15s ease, filter 0.15s ease;
            }

            #${T.POPOVER} .ce-btn:disabled {
                opacity: 0.55;
                cursor: not-allowed;
            }

            #${T.POPOVER} .ce-btn-secondary {
                background: ${Tt};
                color: ${bt};
            }

            #${T.POPOVER} .ce-btn-secondary:hover:not(:disabled) {
                filter: brightness(1.08);
            }

            #${T.POPOVER} .ce-btn-primary {
                background: var(--tl-bg-hover, ${e.bgHover});
                color: var(--tl-color, ${e.color});
            }

            #${T.POPOVER} .ce-btn-primary:hover:not(:disabled) {
                filter: brightness(0.95);
            }

            #${T.POPOVER} .ce-btn-primary.ce-saving {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                min-width: 72px;
            }

            #${T.POPOVER} .ce-btn-primary.ce-saving::after {
                content: '';
                width: 14px;
                height: 14px;
                border: 2px solid currentColor;
                border-top-color: transparent;
                border-radius: 50%;
                animation: ce-spin 0.65s linear infinite;
                flex-shrink: 0;
            }

            @keyframes ce-spin {
                to { transform: rotate(360deg); }
            }

            #${T.POPOVER}.ce-popover--locked .ce-close:disabled,
            #${T.POPOVER}.ce-popover--locked textarea:disabled {
                opacity: 0.65;
                cursor: not-allowed;
            }
        `,document.head.appendChild(a)}isPopoverOpen(){return this.popoverOpen}isSaving(){return this.saving}getTranslationDraft(){var t;return((t=this.translationField)==null?void 0:t.value)??""}setSaving(t){var e;this.saving=t,this.saveBtn&&(this.saveBtn.disabled=t,this.saveBtn.classList.toggle("ce-saving",t),this.saveBtn.setAttribute("aria-busy",t?"true":"false")),this.cancelBtn&&(this.cancelBtn.disabled=t),this.closeBtn&&(this.closeBtn.disabled=t),this.translationField&&(this.translationField.disabled=t),(e=this.popover)==null||e.classList.toggle("ce-popover--locked",t)}revertDraft(){this.translationField&&(this.translationField.value=this.draftSnapshot)}applyHover(t){if(this.hoveredElement===t)return;this.clearHover(),this.hoveredElement=t;const e=`var(--tl-bg, ${this.themeColors.bg})`;t.style.setProperty("outline",`1.5px dashed ${e}`,"important"),t.style.setProperty("outline-offset","2px","important"),t.style.setProperty("cursor","text","important")}clearHover(){this.hoveredElement&&(this.hoveredElement.style.removeProperty("outline"),this.hoveredElement.style.removeProperty("outline-offset"),this.hoveredElement.style.removeProperty("cursor"),this.hoveredElement=null)}highlightElement(t){if(this.anchorElement===t)return;this.clearHighlight(),this.anchorElement=t;const e=`var(--tl-bg, ${this.themeColors.bg})`;t.style.setProperty("outline",`2px solid ${e}`,"important"),t.style.setProperty("outline-offset","2px","important")}clearHighlight(){this.anchorElement&&(this.anchorElement.style.removeProperty("outline"),this.anchorElement.style.removeProperty("outline-offset"))}showPopover(t,e){if(this.ensurePopover(),!this.popover||!this.sourceField||!this.translationField)return;const n=Array.from(t.childNodes).filter(r=>r.nodeType===Node.TEXT_NODE).map(r=>r.textContent??"").join(""),o=e.trim(),i=n.trim();this.sourceField.value=o,this.translationField.value=i,this.draftSnapshot=i,this.sourceField.rows=Z(o,14),this.translationField.rows=Math.max(3,Z(i||" ",12)),this.highlightElement(t),this.popover.style.display="block",this.popover.classList.remove("ce-popover--visible"),this.popoverOpen=!0,document.addEventListener("keydown",this.boundDocKeydown,!0),document.addEventListener("mousedown",this.boundDocPointerDown,!0),requestAnimationFrame(()=>{requestAnimationFrame(()=>{var r;this.popover&&(this.positionPopover(t),this.popover.classList.add("ce-popover--visible"),(r=this.translationField)==null||r.focus({preventScroll:!0}))})})}hidePopover(){this.popover&&(document.removeEventListener("keydown",this.boundDocKeydown,!0),document.removeEventListener("mousedown",this.boundDocPointerDown,!0),this.saving&&this.setSaving(!1),this.popover.classList.remove("ce-popover--visible"),this.popoverOpen=!1,this.clearHighlight(),this.anchorElement=null,this.hideTransitionTimer!==null&&window.clearTimeout(this.hideTransitionTimer),this.hideTransitionTimer=window.setTimeout(()=>{this.hideTransitionTimer=null,this.popover&&!this.popoverOpen&&(this.popover.style.display="none")},220))}reposition(t){this.popoverOpen&&this.positionPopover(t)}onDocumentKeydown(t){if(t.key==="Escape"){if(t.preventDefault(),t.stopPropagation(),this.saving)return;this.actions.onCancel()}}onDocumentPointerDown(t){if(this.saving)return;const e=t.target;!e||!this.popover||this.popover.contains(e)||this.actions.onCancel()}ensurePopover(){var e,n,o;if(this.popover)return;const t=document.createElement("div");t.id=T.POPOVER,t.setAttribute(h.NO_TRANSLATE,"true"),t.style.display="none",t.innerHTML=`
            <div class="ce-header">
                <span class="ce-title">Edit translation</span>
                <button type="button" class="ce-close" aria-label="Close">&#x2715;</button>
            </div>
            <div class="ce-field">
                <label class="ce-label" for="ce-source-input">Source</label>
                <textarea id="ce-source-input" class="ce-source" readonly></textarea>
            </div>
            <div class="ce-field">
                <label class="ce-label" for="ce-translation-input">Translation</label>
                <textarea id="ce-translation-input" class="ce-translation" placeholder="Translated text…"></textarea>
            </div>
            <div class="ce-footer">
                <button type="button" class="ce-btn ce-btn-secondary ce-cancel">Cancel</button>
                <button type="button" class="ce-btn ce-btn-primary ce-save">Save</button>
            </div>
        `,this.closeBtn=t.querySelector(".ce-close"),(e=this.closeBtn)==null||e.addEventListener("click",()=>{this.saving||this.actions.onCancel()}),this.cancelBtn=t.querySelector(".ce-cancel"),this.saveBtn=t.querySelector(".ce-save"),(n=this.cancelBtn)==null||n.addEventListener("click",()=>{this.saving||this.actions.onCancel()}),(o=this.saveBtn)==null||o.addEventListener("click",()=>void this.actions.onSave()),document.body.appendChild(t),this.popover=t,this.sourceField=t.querySelector(".ce-source"),this.translationField=t.querySelector(".ce-translation")}positionPopover(t){if(!this.popover)return;const e=t.getBoundingClientRect(),n=window.innerWidth,o=window.innerHeight,i=mt,r=this.popover.offsetWidth||360,s=this.popover.offsetHeight||220;let a=e.right+i,c=e.top;if(a+r>n-i&&(a=e.left-r-i),a<i&&(a=i),c+s>o-i&&(c=Math.max(i,o-s-i)),c<i&&(c=i),a<e.right+i&&a+r>e.left-i&&c<e.bottom+i&&c+s>e.top-i){const u=e.bottom+i;if(u+s<=o-i)c=u;else{const g=e.top-s-i;g>=i&&(c=g)}}this.popover.style.left=`${Math.round(a)}px`,this.popover.style.top=`${Math.round(c)}px`}}const I=50,tt=C.GAP,Et=8e3,wt=50,et=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
</svg>`,yt=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
</svg>`;class At{constructor(t){this.theme=t,this.active=!1,this.dropdownObserver=null,this.resizeObserver=null,this.pollTimer=null,this.onToggle=null,this.boundSyncPosition=()=>this.syncPosition()}mount(){document.getElementById(T.EDIT_PILL)||(this.injectStyles(),this.renderPill(),this.attachWhenDropdownReady())}unmount(){var t,e,n,o,i,r;this.pollTimer!==null&&(window.clearInterval(this.pollTimer),this.pollTimer=null),(t=this.dropdownObserver)==null||t.disconnect(),this.dropdownObserver=null,(e=this.resizeObserver)==null||e.disconnect(),this.resizeObserver=null,window.removeEventListener("resize",this.boundSyncPosition),window.removeEventListener("scroll",this.boundSyncPosition,!0),(n=window.visualViewport)==null||n.removeEventListener("resize",this.boundSyncPosition),(o=window.visualViewport)==null||o.removeEventListener("scroll",this.boundSyncPosition),(i=document.getElementById(T.EDIT_PILL_STYLE))==null||i.remove(),(r=document.getElementById(T.EDIT_PILL))==null||r.remove(),this.active=!1}injectStyles(){const t=U(this.theme),e=T.EDIT_PILL,n=document.createElement("style");n.id=T.EDIT_PILL_STYLE,n.textContent=`
            #${e} {
                position: var(--tl-position, fixed);
                z-index: var(--tl-z-index, 2147483647);
                width: ${I}px;
                height: ${I}px;
                box-sizing: border-box;
                border-radius: 50%;
                background: var(--tl-bg, ${t.bg});
                border: var(--tl-border, ${t.border});
                box-shadow: var(--tl-box-shadow, ${t.shadow});
                color: var(--tl-color, ${t.color});
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                padding: 0;
                transition: var(--tl-transition, transform 0.2s ease);
                font-family: var(--tl-font-family, 'Inter', sans-serif);
                will-change: transform;
            }

            #${e} svg {
                width: 40%;
                height: 40%;
                flex-shrink: 0;
            }

            #${e}:hover {
                transform: scale(1.05);
            }

            #${e}.${e}--active {
                background: var(--tl-bg, ${t.bg});
                border: var(--tl-border, ${t.border});
                box-shadow: var(--tl-box-shadow, ${t.shadow});
                color: var(--tl-color, ${t.color});
            }

            #${e}.${e}--active:hover {
                transform: scale(1.05);
            }
        `,document.head.appendChild(n)}renderPill(){const t=document.createElement("button");t.id=T.EDIT_PILL,t.setAttribute("type","button"),t.setAttribute("aria-label","Toggle edit mode"),t.setAttribute("aria-pressed","false"),t.setAttribute(h.NO_TRANSLATE,"true"),t.innerHTML=et,t.addEventListener("click",e=>{var n;e.stopPropagation(),this.active=!this.active,t.classList.toggle(`${T.EDIT_PILL}--active`,this.active),t.setAttribute("aria-pressed",String(this.active)),t.innerHTML=this.active?yt:et,(n=this.onToggle)==null||n.call(this,this.active)}),document.body.appendChild(t)}syncPosition(){const t=document.getElementById(T.EDIT_PILL),e=document.getElementById(b.DROPDOWN_CONTAINER);if(!t||!e)return;const n=e.getBoundingClientRect(),o=n.width>0?n.width:I,i=n.height>0?n.height:I;t.style.width=`${o}px`,t.style.height=`${i}px`;const r=window.innerWidth,s=window.innerHeight,a=C.VIEWPORT_MARGIN;let c=n.left+n.width/2-o/2;const l=n.top-tt-i,u=n.bottom+tt;let g=l>=a?l:u;c=Math.max(a,Math.min(c,r-o-a)),g=Math.max(a,Math.min(g,s-i-a)),t.style.left=`${Math.round(c)}px`,t.style.top=`${Math.round(g)}px`,t.style.right="auto",t.style.bottom="auto"}nudgeDropdownIfEditPillOverlaps(){const t=document.getElementById(b.DROPDOWN_CONTAINER);if(!t)return;const e=t.getBoundingClientRect(),n=e.height>0?e.height:I,o=C.VIEWPORT_MARGIN+C.GAP+n;if(e.top>=o)return;const i=o-e.top,r=t.style.top;if(r){const a=parseFloat(r);if(!Number.isNaN(a)){t.style.top=`${a+i}px`;return}}const s=t.style.bottom;if(s&&s!=="auto"){const a=parseFloat(s);if(!Number.isNaN(a)){t.style.bottom=`${Math.max(0,a-i)}px`;return}}t.style.top=`${o}px`,t.style.left=`${e.left}px`,t.style.right="auto",t.style.bottom="auto"}attachWhenDropdownReady(){const t=Date.now(),e=()=>{var o,i,r;const n=document.getElementById(b.DROPDOWN_CONTAINER);return n?(this.pollTimer!==null&&(window.clearInterval(this.pollTimer),this.pollTimer=null),this.nudgeDropdownIfEditPillOverlaps(),this.syncPosition(),window.addEventListener("resize",this.boundSyncPosition),window.addEventListener("scroll",this.boundSyncPosition,!0),(o=window.visualViewport)==null||o.addEventListener("resize",this.boundSyncPosition),(i=window.visualViewport)==null||i.addEventListener("scroll",this.boundSyncPosition),this.dropdownObserver=new MutationObserver(()=>this.syncPosition()),this.dropdownObserver.observe(n,{attributes:!0,attributeFilter:["style","class"]}),(r=this.resizeObserver)==null||r.disconnect(),this.resizeObserver=new ResizeObserver(()=>this.syncPosition()),this.resizeObserver.observe(n),!0):!1};e()||(this.pollTimer=window.setInterval(()=>{e()||Date.now()-t>Et&&this.pollTimer!==null&&(window.clearInterval(this.pollTimer),this.pollTimer=null)},wt))}}class X{static findTargetAt(t){let e=t;for(;e&&e!==document.body&&e!==document.documentElement;){if(E.isNonContentElement(e))return null;const n=e.getAttribute(h.TRANSLATED_TO),o=e.getAttribute(h.SOURCE_TEXT);if(n&&o)return{element:e,sourceText:o,targetLanguage:n};e=e.parentElement}return null}}const y=new WeakSet,A=new WeakSet,Y=new WeakMap,R=new WeakMap;function nt(d,t){Y.set(d,t.trim())}function xt(d){return Y.get(d)}function it(d){Y.delete(d)}function Lt(d,t,e){const n=R.get(d)||new Map;n.set(t,e.trim()),R.set(d,n)}function Ct(d,t){const e=R.get(d);return e==null?void 0:e.get(t)}function ot(d,t){if(!t){R.delete(d);return}const e=R.get(d);e&&(e.delete(t),e.size===0&&R.delete(d))}function Rt(d){return document.createTreeWalker(d,NodeFilter.SHOW_TEXT,{acceptNode:e=>{var o;return((o=e.textContent)==null?void 0:o.trim())?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}}).nextNode()}function Ot(d,t,e,n){var a,c;const o=Rt(d);if(!o)return;d.hasAttribute(h.SOURCE_TEXT)||d.setAttribute(h.SOURCE_TEXT,t),d.setAttribute(h.TRANSLATION_STATE,"translated"),d.setAttribute(h.TRANSLATED_TO,n);const i=e.trim();nt(o,i);const r=((a=t.match(/^\s+/))==null?void 0:a[0])||"",s=((c=t.match(/\s+$/))==null?void 0:c[0])||"";o.textContent=`${r}${i}${s}`}const St=24;class Nt{constructor(t,e,n){this.apiService=t,this.configManager=e,this.currentTarget=null,this.repositionTimer=null,this.hoverDebounceTimer=null,this.editModeActive=!1,this.overlay=new vt(n,{onSave:()=>this.handleSave(),onCancel:()=>this.handleCancel()}),this.pill=new At(n),this.pill.onToggle=o=>this.setEditMode(o),this.boundHandleMouseOver=o=>this.handleMouseOver(o),this.boundHandleMouseOut=o=>this.handleMouseOut(o),this.boundHandleClick=o=>this.handleClick(o),this.boundReposition=()=>this.scheduleReposition()}start(){this.overlay.create(),this.pill.mount(),document.addEventListener("mouseover",this.boundHandleMouseOver),document.addEventListener("mouseout",this.boundHandleMouseOut),document.addEventListener("click",this.boundHandleClick,!0),window.addEventListener("resize",this.boundReposition,!0),window.addEventListener("scroll",this.boundReposition,!0)}stop(){this.repositionTimer!==null&&window.clearTimeout(this.repositionTimer),this.hoverDebounceTimer!==null&&window.clearTimeout(this.hoverDebounceTimer),document.removeEventListener("mouseover",this.boundHandleMouseOver),document.removeEventListener("mouseout",this.boundHandleMouseOut),document.removeEventListener("click",this.boundHandleClick,!0),window.removeEventListener("resize",this.boundReposition,!0),window.removeEventListener("scroll",this.boundReposition,!0),this.overlay.hidePopover(),this.overlay.clearHover(),this.pill.unmount()}setEditMode(t){this.editModeActive=t,t||(this.overlay.isSaving()||this.overlay.hidePopover(),this.overlay.clearHover(),this.currentTarget=null)}handleMouseOver(t){if(!this.editModeActive)return;const e=t.target;if(!e||E.isNonContentElement(e))return;const n=T.POPOVER;if(e.id===n||e.closest(`#${n}`))return;const o=T.EDIT_PILL;if(e.id===o||e.closest(`#${o}`))return;const i=b.DROPDOWN_CONTAINER;if(e.id===i||e.closest(`#${i}`))return;const r=t.clientX,s=t.clientY;this.hoverDebounceTimer!==null&&window.clearTimeout(this.hoverDebounceTimer),this.hoverDebounceTimer=window.setTimeout(()=>{this.hoverDebounceTimer=null;const a=this.resolveTarget(e,r,s,"hover");a?this.overlay.applyHover(a.element):this.overlay.clearHover()},lt.HOVER_DEBOUNCE)}handleMouseOut(t){var n;if(!this.editModeActive)return;this.hoverDebounceTimer!==null&&(window.clearTimeout(this.hoverDebounceTimer),this.hoverDebounceTimer=null);const e=t.relatedTarget;e&&((n=t.target)!=null&&n.contains(e))||this.overlay.clearHover()}handleClick(t){var s;if(!this.editModeActive)return;const e=t.target;if(!e)return;const n=T.POPOVER;if(e.id===n||e.closest(`#${n}`))return;const o=T.EDIT_PILL;if(e.id===o||e.closest(`#${o}`))return;const i=b.DROPDOWN_CONTAINER;if(e.id===i||e.closest(`#${i}`))return;const r=this.resolveTarget(e,t.clientX,t.clientY,"click");r&&(t.preventDefault(),t.stopPropagation(),!this.overlay.isSaving()&&(this.overlay.isPopoverOpen()&&((s=this.currentTarget)==null?void 0:s.element)===r.element||(this.overlay.isPopoverOpen()&&this.overlay.hidePopover(),this.currentTarget=r,this.overlay.showPopover(r.element,r.sourceText))))}resolveTarget(t,e,n,o){let i=X.findTargetAt(t);if(i)return i;const r=document.elementsFromPoint(e,n);for(const s of r)if(i=X.findTargetAt(s),i)return i;if(o==="click"){const s=this.findPointerEventsNoneTranslatedAt(t,e,n);if(s)return X.findTargetAt(s)}return null}findPointerEventsNoneTranslatedAt(t,e,n){const o=`[${h.TRANSLATED_TO}][${h.SOURCE_TEXT}]`;for(const i of t.querySelectorAll(o)){const r=i;if(window.getComputedStyle(r).pointerEvents!=="none")continue;const s=r.getBoundingClientRect();if(e>=s.left&&e<=s.right&&n>=s.top&&n<=s.bottom)return r}return null}handleCancel(){this.overlay.isSaving()||(this.overlay.revertDraft(),this.overlay.hidePopover(),this.currentTarget=null)}async handleSave(){if(this.overlay.isSaving())return;const t=this.currentTarget;if(!t)return;const e=this.overlay.getTranslationDraft();if(!e.trim()){f.showErrorMessage("config-invalid","Translation cannot be empty.");return}const n=this.configManager.getTranslationConfig(),o=this.configManager.getApiConfig();if(!n||!o){f.showErrorMessage("config-invalid","Translation is not configured.");return}this.overlay.setSaving(!0);try{await this.apiService.updateTranslationCache({apiConfig:o,sourceText:t.sourceText,targetLang:t.targetLanguage,value:e}),Ot(t.element,t.sourceText,e,t.targetLanguage),this.overlay.hidePopover(),this.currentTarget=null}catch(i){const r=i instanceof Error?i.message:"Could not save translation.";let s="server";i instanceof TypeError&&r.includes("Failed to fetch")?s="network":(r.toLowerCase().includes("session")||r.toLowerCase().includes("forbidden")||r.toLowerCase().includes("not authorized"))&&(s="auth"),f.showErrorMessage(s,r)}finally{this.overlay.setSaving(!1)}}scheduleReposition(){!this.overlay.isPopoverOpen()||!this.currentTarget||(this.repositionTimer!==null&&window.clearTimeout(this.repositionTimer),this.repositionTimer=window.setTimeout(()=>{this.repositionTimer=null,this.currentTarget&&this.overlay.reposition(this.currentTarget.element)},St))}}class Pt{constructor(t){this.options=t,this.container=null,this.iconButton=null,this.languageList=null,this.isExpanded=!1,this.prevViewportWidth=0,this.prevViewportHeight=0,this.isDragging=!1,this.dragStartX=0,this.dragStartY=0,this.dragTimer=null,this.didDrag=!1,this.isAnchored=!1,this.usingBottomRightAnchor=!0,this.handleMouseDown=e=>{this.isExpanded||this.options.isTranslating||this.options.disabled||!this.container||e.target.closest("a")!==null||(this.dragStartX=e.clientX,this.dragStartY=e.clientY,this.didDrag=!1,this.isDragging=!1,document.addEventListener("mousemove",this.handleMouseMove),document.addEventListener("mouseup",this.handleMouseUp))},this.handleMouseMove=e=>{if(this.dragTimer&&(clearTimeout(this.dragTimer),this.dragTimer=null),!this.container)return;const n=5,o=Math.abs(e.clientX-this.dragStartX),i=Math.abs(e.clientY-this.dragStartY);if(!this.isDragging&&(o>n||i>n)&&(this.isDragging=!0,this.didDrag=!0,this.convertToPixelAnchor(),this.iconButton&&(this.iconButton.style.cursor="move"),this.container.style.transition="none"),!this.isDragging||this.isExpanded)return;const r=this.container.getBoundingClientRect(),s=e.clientX-this.dragStartX+r.left,a=e.clientY-this.dragStartY+r.top,c=this.constrainToViewport(s,a);this.container.style.left=`${c.x}px`,this.container.style.top=`${c.y}px`,this.container.style.right="auto",this.container.style.bottom="auto",this.dragStartX=e.clientX,this.dragStartY=e.clientY,e.preventDefault(),e.stopPropagation()},this.handleMouseUp=()=>{if(this.dragTimer&&(clearTimeout(this.dragTimer),this.dragTimer=null),document.removeEventListener("mousemove",this.handleMouseMove),document.removeEventListener("mouseup",this.handleMouseUp),!!this.container&&this.isDragging){this.isDragging=!1,this.iconButton&&(this.iconButton.style.cursor="pointer"),this.container.style.transition="";const e=this.container.getBoundingClientRect(),n=Math.max(24,window.innerWidth-e.right),o=Math.max(24,window.innerHeight-e.bottom);this.savePosition({anchor:"br",x:n,y:o}),this.anchorContainerToBottomRight(n,o),this.isAnchored=!0,this.usingBottomRightAnchor=!0}},this.handleTouchStart=e=>{if(this.isExpanded||this.options.isTranslating||this.options.disabled||!this.container||e.target.closest("a")!==null)return;const i=e.touches[0];this.dragStartX=i.clientX,this.dragStartY=i.clientY,this.didDrag=!1,this.isDragging=!1,this.dragTimer=window.setTimeout(()=>{this.isDragging=!0},200),document.addEventListener("touchmove",this.handleTouchMove,{passive:!1}),document.addEventListener("touchend",this.handleTouchEnd),e.preventDefault()},this.handleTouchMove=e=>{if(this.dragTimer&&(clearTimeout(this.dragTimer),this.dragTimer=null),!this.container)return;const n=e.touches[0],o=5,i=Math.abs(n.clientX-this.dragStartX),r=Math.abs(n.clientY-this.dragStartY);if(!this.isDragging&&(i>o||r>o)&&(this.isDragging=!0,this.didDrag=!0,this.convertToPixelAnchor(),this.iconButton&&(this.iconButton.style.cursor="move"),this.container.style.transition="none"),!this.isDragging||this.isExpanded)return;const s=this.container.getBoundingClientRect(),a=n.clientX-this.dragStartX+s.left,c=n.clientY-this.dragStartY+s.top,l=this.constrainToViewport(a,c);this.container.style.left=`${l.x}px`,this.container.style.top=`${l.y}px`,this.container.style.right="auto",this.container.style.bottom="auto",this.dragStartX=n.clientX,this.dragStartY=n.clientY,e.preventDefault()},this.handleTouchEnd=()=>{if(this.dragTimer&&(clearTimeout(this.dragTimer),this.dragTimer=null),document.removeEventListener("touchmove",this.handleTouchMove),document.removeEventListener("touchend",this.handleTouchEnd),!!this.container){if(!this.isDragging){this.toggleLanguageList(new MouseEvent("click"));return}if(this.isDragging=!1,this.didDrag=!1,this.iconButton&&(this.iconButton.style.cursor="pointer"),this.container.style.transition="",this.container){const e=this.container.getBoundingClientRect(),n=Math.max(24,window.innerWidth-e.right),o=Math.max(24,window.innerHeight-e.bottom);this.savePosition({anchor:"br",x:n,y:o}),this.anchorContainerToBottomRight(n,o),this.isAnchored=!0,this.usingBottomRightAnchor=!0}}},this.toggleLanguageList=e=>{if(!(!this.container||this.options.isTranslating||this.options.disabled)){if(this.isDragging){this.isDragging=!1;return}this.isExpanded=!this.isExpanded,this.container.classList.toggle("expanded",this.isExpanded),this.isExpanded&&this.container&&this.languageList&&this.positionLanguageList()}},this.closeLanguageList=()=>{this.container&&(this.isExpanded=!1,this.container.classList.remove("expanded"))},this.handleDocumentClick=e=>{if(!this.container)return;const n=e.target;this.isExpanded&&n&&!this.container.contains(n)&&this.closeLanguageList()},this.handleResize=()=>{if(!this.container)return;const e=window.innerWidth,n=window.innerHeight,o=Math.abs(e-this.prevViewportWidth)>1,i=Math.abs(n-this.prevViewportHeight),r=!o&&i>0&&i<=120;if(this.prevViewportWidth=e,this.prevViewportHeight=n,this.usingBottomRightAnchor){this.isExpanded&&this.positionLanguageList();return}if(this.isAnchored){const s=this.container.getBoundingClientRect(),a=24,c=s.left<a||s.top<a||s.right>e-a||s.bottom>n-a;if(o||c||!r){const l=this.constrainToViewport(s.left,s.top);this.anchorContainerToPixels(l.x,l.y),this.savePosition({x:l.x,y:l.y})}}this.isExpanded&&this.positionLanguageList()},this.positionLanguageList=()=>{if(!this.container||!this.languageList||!this.iconButton)return;const e=this.container.getBoundingClientRect(),n=this.iconButton.getBoundingClientRect(),o=200,i=this.languageList.offsetHeight,r=window.innerWidth,s=window.innerHeight,a=10;let c,l,u=!1;const g=r/2;if(n.left>g?(c=n.left-o-a,c>=a?u=!0:(c=n.right+a,c+o+a<=r&&(u=!0))):(c=n.right+a,c+o+a<=r?u=!0:(c=n.left-o-a,c>=a&&(u=!0))),u)l=n.top,l+i+a>s&&(l=Math.max(a,s-i-a));else{const P=n.left>g?Math.max(a,n.left-o-a):Math.min(n.right+a,r-o-a);l=n.top-i-a,l>=a||(l=n.bottom+a),c=P}c=Math.max(a,Math.min(c,r-o-a));const m=Math.max(a,Math.min(c,r-o-a))-e.left,x=Math.max(a,Math.min(l,s-i-a))-e.top;this.languageList.style.position="absolute",this.languageList.style.left=`${m}px`,this.languageList.style.top=`${x}px`}}create(){this.remove();const{theme:t="dark"}=this.options,e=document.createElement("style");e.id=b.DROPDOWN_STYLE,e.textContent=this.generateCSS(t),document.head.appendChild(e),this.createContainer()}remove(){const t=document.getElementById(b.DROPDOWN_CONTAINER);t&&t.remove();const e=document.getElementById(b.DROPDOWN_STYLE);e&&e.remove(),document.removeEventListener("click",this.handleDocumentClick),window.removeEventListener("resize",this.handleResize),this.container=null,this.iconButton=null,this.languageList=null}updateButtonLanguage(){if(!this.iconButton||!this.options.config)return;this.iconButton.innerHTML="";const t=document.createElementNS("http://www.w3.org/2000/svg","svg");t.setAttribute("width","20px"),t.setAttribute("height","20px"),t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("fill","currentColor"),t.setAttribute("stroke","currentColor"),t.innerHTML=`
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
                <defs>
                    <style>.cls-1{fill:none;stroke:currentColor;stroke-miterlimit:10;stroke-width:1.92px;}</style>
                </defs>
                <line class="cls-1" x1="0.5" y1="3.35" x2="12" y2="3.35"></line>
                <line class="cls-1" x1="6.25" y1="0.48" x2="6.25" y2="3.35"></line>
                <path class="cls-1" d="M9.12,3.35c0,3.52-3.28,8.2-7.66,10.55"></path>
                <path class="cls-1" d="M4.51,7.37A16.4,16.4,0,0,0,11,13.9"></path>
                <polyline class="cls-1" points="12.96 22.52 16.79 11.98 17.75 11.98 21.58 22.52"></polyline>
                <line class="cls-1" x1="20.43" y1="18.69" x2="15.07" y2="18.69"></line>
                <line class="cls-1" x1="11.04" y1="22.52" x2="14.88" y2="22.52"></line>
                <line class="cls-1" x1="19.67" y1="22.52" x2="23.5" y2="22.52"></line>
            </g>
        `,this.iconButton.appendChild(t)}anchorContainerToPixels(t,e){this.container&&(this.container.style.left=`${t}px`,this.container.style.top=`${e}px`,this.container.style.right="auto",this.container.style.bottom="auto")}anchorContainerToBottomRight(t,e){this.container&&(this.container.style.left="auto",this.container.style.top="auto",this.container.style.right=`calc(${t}px + env(safe-area-inset-right, 0px))`,this.container.style.bottom=`calc(${e}px + env(safe-area-inset-bottom, 0px))`)}convertToPixelAnchor(){if(this.container&&this.usingBottomRightAnchor)try{const t=this.container.getBoundingClientRect();this.anchorContainerToPixels(t.left,t.top),this.isAnchored=!0,this.usingBottomRightAnchor=!1}catch{}}update(t){this.options={...this.options,...t},this.updateButtonLanguage(),this.languageList&&this.populateLanguageList(),this.iconButton&&(this.options.isTranslating||this.options.disabled?(this.iconButton.disabled=!0,this.iconButton.setAttribute("title",this.options.isTranslating?"Translation is in progress":"Translation service unavailable"),this.positionLanguageList()):(this.iconButton.disabled=!1,this.iconButton.removeAttribute("title"),this.positionLanguageList()))}generateCSS(t){const e=U(t),n=t==="dark",o=n?"rgba(255,255,255,0.35)":"rgba(0,0,0,0.2)",i=n?"rgba(255,255,255,0.55)":"rgba(0,0,0,0.35)",r=e.bg;return`
            #${b.DROPDOWN_CONTAINER} {
                position: var(--tl-position, fixed);
                bottom: var(--tl-bottom, 24px);
                bottom: calc(var(--tl-bottom, 24px) + env(safe-area-inset-bottom, 0px));
                right: var(--tl-right, 24px);
                right: calc(var(--tl-right, 24px) + env(safe-area-inset-right, 0px));
                top: var(--tl-top, auto);
                top: calc(var(--tl-top, auto) + env(safe-area-inset-top, 0px));
                left: var(--tl-left, auto);
                left: calc(var(--tl-left, auto) + env(safe-area-inset-left, 0px));
                z-index: var(--tl-z-index, 2147483647) !important;
                width: 50px;
                height: 50px;
                display: flex;
                flex-direction: column;
                align-items: center;
                background: transparent;
                transition: none;
				cursor: default;
                font-family: var(--tl-font-family, 'Inter', sans-serif);
                will-change: transform;
            }

            #${b.DROPDOWN} {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background: var(--tl-bg, ${e.bg});
                border: var(--tl-border, ${e.border});
                box-shadow: var(--tl-box-shadow, ${e.shadow});
                display: flex;
                align-items: center;
                justify-content: center;
				cursor: pointer;
                transition: transform 0.3s ease;
                color: var(--tl-color, ${e.color});
                position: absolute;
                top: 0;
                left: 0;
				z-index: 1;
                font-family: var(--tl-font-family, 'Inter', sans-serif);
                font-size: 12px;
                font-weight: 500;
                will-change: transform;
            }

            #${b.DROPDOWN}:hover {
                transform: scale(1.05);
            }

            #${b.DROPDOWN}:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }

            #${b.DROPDOWN_CONTAINER} .language-list {
                display: none;
                width: 200px;
                max-height: 300px;
                background: var(--tl-bg, ${e.bg});
                border-radius: 8px;
                box-shadow: var(--tl-box-shadow, ${e.shadow});
                position: absolute;
                z-index: 2147483648;
                font-family: var(--tl-font-family, 'Inter', sans-serif);
                flex-direction: column;
                overflow: hidden;
            }

            #${b.DROPDOWN_CONTAINER} .language-options-scroll {
                overflow-y: auto;
                flex: 1;
                padding-top: 10px;
                min-height: 50px;
                scrollbar-width: thin;
                scrollbar-color: var(--tl-scrollbar-thumb, ${o}) var(--tl-scrollbar-track, ${r});
                --tl-scrollbar-thumb: ${o};
                --tl-scrollbar-thumb-hover: ${i};
                --tl-scrollbar-track: ${r};
            }

            #${b.DROPDOWN_CONTAINER}.expanded .language-list {
                display: flex;
            }

			/* WebKit-based browsers (Chrome, Edge, Safari) */
			#${b.DROPDOWN_CONTAINER} .language-options-scroll::-webkit-scrollbar {
				width: 8px;
			}
			#${b.DROPDOWN_CONTAINER} .language-options-scroll::-webkit-scrollbar-track {
				background: var(--tl-scrollbar-track, ${r});
			}
			#${b.DROPDOWN_CONTAINER} .language-options-scroll::-webkit-scrollbar-thumb {
				background-color: var(--tl-scrollbar-thumb, ${o});
				border-radius: 8px;
				border: 2px solid transparent;
			}
			#${b.DROPDOWN_CONTAINER} .language-options-scroll::-webkit-scrollbar-thumb:hover {
				background-color: var(--tl-scrollbar-thumb-hover, ${i});
			}

            #${b.DROPDOWN_CONTAINER} .language-list .language-option {
                padding: var(--tl-option-padding, 8px 12px);
                cursor: pointer;
                transition: background-color 0.2s ease;
                color: var(--tl-color, ${e.color});
                font-size: var(--tl-option-font-size, 12px);
				font-weight: var(--tl-option-font-weight, 400);
                font-family: var(--tl-option-font-family, var(--tl-font-family, 'Inter', sans-serif));
                line-height: var(--tl-option-line-height, 1.3);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            
            #${b.DROPDOWN_CONTAINER} .language-list .language-option:hover {
                background-color: var(--tl-bg-hover, ${e.bgHover});
            }
            
            #${b.DROPDOWN_CONTAINER} .language-list .language-option.selected {
                background-color: var(--tl-selected-bg, rgba(0,0,0,0.1));
                font-weight: bold;
            }
            
            #${b.POWERED_BY} {
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                gap: 6px !important;
                
                background: var(--tl-powered-bg, rgba(0,0,0,0.05)) !important;
                border-top: 1px solid var(--tl-powered-border, rgba(0,0,0,0.1)) !important;
                
                font-size: 10px !important;
                font-weight: 400 !important;
                color: var(--tl-powered-color, #666) !important;
                text-decoration: none !important;
                line-height: 1 !important;
                
                padding: 6px 8px !important;
                margin: 0 !important;
                
                cursor: pointer !important;
                transition: background-color 0.2s ease !important;
                
                pointer-events: auto !important;
                user-select: none !important;
                -webkit-user-select: none !important;
				-moz-user-select: none !important;
				font-family: var(--tl-font-family, 'Inter', sans-serif) !important;
                
                width: 100% !important;
                flex-shrink: 0 !important;
                box-sizing: border-box !important;
            }

            #${b.POWERED_BY}:hover {
                background: var(--tl-powered-bg-hover, rgba(0,0,0,0.08)) !important;
            }
            
            #${b.DROPDOWN_CONTAINER} .language-list .language-option.translation-status {
                text-align: center;
                font-style: italic;
                padding-top: 12px;
				color: var(--tl-color-muted, #888);
				font-family: var(--tl-font-family, 'Inter', sans-serif);
            }
        `}capitalizeLabel(t){const o=(s=>s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"))(t).split("("),i=o[0].trim().split(" ").map(s=>s.charAt(0).toUpperCase()+s.slice(1).toLowerCase()).join(" ");if(o.length===1)return i;const r=o[1].replace(")","").trim().split(" ").map(s=>s.charAt(0).toUpperCase()+s.slice(1).toLowerCase()).join(" ");return`${i} (${r})`}constrainToViewport(t,e){if(!this.container)return{x:t,y:e};const n=this.container.offsetWidth,o=this.container.offsetHeight,i=window.innerWidth,r=window.innerHeight,s=24;let a=s;document.getElementById(T.EDIT_PILL)&&(a=Math.max(a,C.VIEWPORT_MARGIN+C.GAP+o));const c=i-n-s,l=r-o-s;return{x:Math.max(s,Math.min(t,c)),y:Math.max(a,Math.min(e,l))}}restorePosition(){if(!this.container)return;const t=this.loadPosition();if(t){if(t.anchor==="br"){const e=Math.max(24,t.x??24),n=Math.max(24,t.y??24);this.anchorContainerToBottomRight(e,n),this.isAnchored=!0,this.usingBottomRightAnchor=!0,this.savePosition({anchor:"br",x:e,y:n});return}try{if(window.innerWidth<=768)return}catch{}if(typeof t.x=="number"&&typeof t.y=="number"){const e=this.constrainToViewport(t.x,t.y);this.anchorContainerToPixels(e.x,e.y),this.isAnchored=!0,this.usingBottomRightAnchor=!1,this.savePosition({x:e.x,y:e.y})}}}savePosition(t){try{localStorage.setItem("camb_dropdown_position",JSON.stringify(t))}catch(e){console.error("Failed to save dropdown position",e)}}loadPosition(){try{const t=localStorage.getItem("camb_dropdown_position");return t?JSON.parse(t):null}catch(t){return console.error("Failed to load dropdown position",t),null}}populateLanguageList(){if(!this.languageList)return;const{config:t,currentLang:e,translatedDropdownLabels:n={}}=this.options;this.languageList.innerHTML="";const o=document.createElement("div");if(o.classList.add("language-options-scroll"),this.options.isTranslating||this.options.disabled){const l=document.createElement("div");l.classList.add("language-option","translation-status"),l.setAttribute("data-no-translate","true"),l.textContent=this.options.isTranslating?"Language being translated...":"Translation service unavailable",l.style.cursor="default",l.style.opacity="0.6",l.style.pointerEvents="none",o.appendChild(l),this.languageList.appendChild(o);const u=this.createPoweredByLink();u&&this.languageList.appendChild(u);return}const i=t.defaultLang,r=new Set([...t.targetLanguages,i].filter(Boolean)),s=Array.from(r).filter(l=>t.languageLabels[l]),a=[];e!==i?i&&t.languageLabels[i]&&a.push(i,e):(i&&t.languageLabels[i]&&a.push(i),s.forEach(l=>{l!==i&&a.push(l)})),a.forEach(l=>{const u=document.createElement("div");u.classList.add("language-option"),u.setAttribute("data-lang",l),u.setAttribute("data-no-translate","true");const g=n[l]||t.languageLabels[l],p=this.capitalizeLabel(g);u.textContent=p,l===e&&u.classList.add("selected"),u.addEventListener("click",()=>{var m,v;(v=(m=this.options).onLanguageChange)==null||v.call(m,l),this.toggleLanguageList(new MouseEvent("click"))}),o.appendChild(u)}),this.languageList.appendChild(o);const c=this.createPoweredByLink();c&&this.languageList.appendChild(c)}createPoweredByLink(){const t=document.createElement("a");t.id=b.POWERED_BY,t.href="https://camb.ai",t.target="_blank",t.rel="noopener noreferrer",t.setAttribute("data-no-translate","true");const e=document.createElement("span");return e.textContent="Powered by CAMB.AI",e.setAttribute("data-no-translate","true"),t.appendChild(e),t}createContainer(){this.container=document.createElement("div"),this.container.id=b.DROPDOWN_CONTAINER,this.container.setAttribute("data-no-translate","true"),this.container.style.position="fixed",this.container.style.cursor="default",this.container.style.transition="none",this.iconButton=document.createElement("button"),this.iconButton.id=b.DROPDOWN,this.iconButton.setAttribute("data-no-translate","true"),this.iconButton.style.position="absolute",this.iconButton.style.top="0",this.iconButton.style.left="0",this.iconButton.style.width="100%",this.iconButton.style.height="100%",this.iconButton.style.background="var(--tl-bg, #333333)",this.iconButton.style.border="var(--tl-border, none)",this.iconButton.style.borderRadius="50%",this.iconButton.style.color="var(--tl-color, #ffffff)",this.iconButton.style.cursor="pointer",this.iconButton.style.display="flex",this.iconButton.style.alignItems="center",this.iconButton.style.justifyContent="center",this.iconButton.style.boxShadow="var(--tl-box-shadow, 0 2px 8px rgba(0,0,0,0.3))",this.iconButton.style.transition="transform 0.3s ease";const t=document.createElementNS("http://www.w3.org/2000/svg","svg");t.setAttribute("width","20px"),t.setAttribute("height","20px"),t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("fill","currentColor"),t.setAttribute("stroke","currentColor"),t.innerHTML=`
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
                <defs>
                    <style>.cls-1{fill:none;stroke:currentColor;stroke-miterlimit:10;stroke-width:1.92px;}</style>
                </defs>
                <line class="cls-1" x1="0.5" y1="3.35" x2="12" y2="3.35"></line>
                <line class="cls-1" x1="6.25" y1="0.48" x2="6.25" y2="3.35"></line>
                <path class="cls-1" d="M9.12,3.35c0,3.52-3.28,8.2-7.66,10.55"></path>
                <path class="cls-1" d="M4.51,7.37A16.4,16.4,0,0,0,11,13.9"></path>
                <polyline class="cls-1" points="12.96 22.52 16.79 11.98 17.75 11.98 21.58 22.52"></polyline>
                <line class="cls-1" x1="20.43" y1="18.69" x2="15.07" y2="18.69"></line>
                <line class="cls-1" x1="11.04" y1="22.52" x2="14.88" y2="22.52"></line>
                <line class="cls-1" x1="19.67" y1="22.52" x2="23.5" y2="22.52"></line>
            </g>
        `;const e=document.createElement("div");e.style.width="100%",e.style.height="100%",e.style.position="relative",e.style.display="flex",e.style.alignItems="center",e.style.justifyContent="center",this.iconButton.appendChild(t),e.appendChild(this.iconButton),this.iconButton.addEventListener("mousedown",this.handleMouseDown),this.iconButton.addEventListener("touchstart",this.handleTouchStart,{passive:!1}),this.iconButton.addEventListener("click",n=>{if(this.didDrag){n.preventDefault(),n.stopPropagation(),this.didDrag=!1;return}this.toggleLanguageList(n)}),this.languageList=document.createElement("div"),this.languageList.classList.add("language-list"),this.populateLanguageList(),this.container.appendChild(e),this.container.appendChild(this.languageList),(this.options.isTranslating||this.options.disabled)&&(this.iconButton.disabled=!0,this.iconButton.setAttribute("title",this.options.isTranslating?"Translation is in progress":"Translation service unavailable")),document.body.appendChild(this.container),this.prevViewportWidth=window.innerWidth,this.prevViewportHeight=window.innerHeight,this.restorePosition(),document.addEventListener("click",this.handleDocumentClick),window.addEventListener("resize",this.handleResize)}}class Dt{constructor(t,e,n){this.onUrlChange=t,this.onContentChange=e,this.configManager=n,this.observer=null,this.currentUrl=""}start(){this.stop(),this.currentUrl=E.getCurrentPath(),this.observer=new MutationObserver(e=>{if(window.__isTranslatingDOM)return;const n=E.getCurrentPath();if(n!==this.currentUrl){this.currentUrl=n,this.onUrlChange(n);return}this.processMutations(e)});const t={childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:[...z]};this.observer.observe(document.body,t),this.observeOpenShadowRoots(document.body,t),this.patchAttachShadow(t)}stop(){var t;(t=this.observer)==null||t.disconnect(),this.observer=null}processMutations(t){var e,n;for(const o of t)if(o.type==="childList"){if(o.addedNodes.length>0&&o.removedNodes.length===1){const i=o.removedNodes[0];i.nodeType===1&&i.hasAttribute(h.SOURCE_TEXT)&&o.addedNodes.forEach(r=>{if(r.nodeType===1){const s=r;if(!s.hasAttribute(h.SOURCE_TEXT)){s.setAttribute(h.SOURCE_TEXT,i.getAttribute(h.SOURCE_TEXT));const a=i.getAttribute(h.TRANSLATED_TO);a&&s.setAttribute(h.TRANSLATED_TO,a);for(let c=0;c<i.attributes.length;c++){const l=i.attributes[c];l.name.startsWith(h.SOURCE_ATTRIBUTE_PREFIX)&&(s.hasAttribute(l.name)||s.setAttribute(l.name,l.value))}}}})}o.addedNodes.forEach(i=>{this.isTranslatableElement(i)&&!y.has(i)&&!A.has(i)&&this.onContentChange(i)})}else if(o.type==="characterData"){const i=o.target,r=o.target.parentElement;if(!r)continue;const s=r.getAttribute(h.TRANSLATION_STATE),a=r.getAttribute(h.TRANSLATED_TO),c=this.configManager.getCurrentLanguage();if(s==="translated"||a===c){const l=xt(i),u=((e=o.target.data)==null?void 0:e.trim())||"";if(l!==void 0&&l!==u){r.setAttribute(h.SOURCE_TEXT,o.target.data||""),it(i),A.delete(i),r.removeAttribute(h.TRANSLATION_STATE),r.removeAttribute(h.TRANSLATED_TO),y.has(r)||this.onContentChange(r);continue}}this.isTranslatableElement(r)&&!y.has(r)&&!A.has(r)&&this.onContentChange(r)}else if(o.type==="attributes"){const i=o.target,r=o.attributeName||"",s=i.getAttribute(h.TRANSLATION_STATE),a=i.getAttribute(h.TRANSLATED_TO),c=this.configManager.getCurrentLanguage();if((s==="translated"||a===c)&&r){const l=Ct(i,r),u=((n=i.getAttribute(r))==null?void 0:n.trim())||"";if(l!==void 0&&l!==u){const g=`${h.SOURCE_ATTRIBUTE_PREFIX}${r}`;i.setAttribute(g,i.getAttribute(r)||""),ot(i,r),A.delete(i),i.removeAttribute(h.TRANSLATION_STATE),i.removeAttribute(h.TRANSLATED_TO),y.has(i)||this.onContentChange(i);continue}}i&&this.isTranslatableElement(i)&&!y.has(i)&&!A.has(i)&&this.onContentChange(i)}}isTranslatableElement(t){if(t.nodeType!==1)return!1;const e=t;if(e.tagName==="p"||e.tagName==="span")return!0;const n=e.getAttribute(h.TRANSLATION_STATE);if(n==="translating"||n==="translated"||e.matches(st.join(", "))||E.shouldPreventTranslation(e)||E.isNonContentElement(e))return!1;const o=this.configManager.getCurrentLanguage();return e.getAttribute(h.TRANSLATED_TO)===o&&e.removeAttribute(h.TRANSLATED_TO),!0}observeOpenShadowRoots(t,e){if(!this.observer)return;const n=t===document?document.body:t;if(t.shadowRoot){const r=t.shadowRoot;try{this.observer.observe(r,e)}catch{}}const o=document.createTreeWalker(n,NodeFilter.SHOW_ELEMENT);let i;for(;i=o.nextNode();){const s=i.shadowRoot;if(s){try{this.observer.observe(s,e)}catch{}this.observeOpenShadowRoots(s,e)}}}patchAttachShadow(t){if(window.__tlAttachShadowPatched)return;const e=Element.prototype.attachShadow,n=this;try{Element.prototype.attachShadow=function(o){const i=e.call(this,o);try{o&&o.mode==="open"&&n.observer&&n.observer.observe(i,t)}catch{}return i},window.__tlAttachShadowPatched=!0}catch{}}}class O{static extractFromElement(t,e){return this.extractWithLanguageFilter(t,e)}static extractFreshContentForLanguage(t,e,n){return this.extractWithLanguageFilter(t,n,e)}static extractWithLanguageFilter(t,e,n){const o=[],i=new Map,r=[],s=new Map;let a=0,c=0;const l=z.map(p=>`[${p}]`).join(","),u=p=>{var x;const m=(x=p.textContent)==null?void 0:x.trim(),v=p.parentNode;return!m||m.length===0||v&&E.shouldPreventTranslation(v)||v&&E.isNonContentElement(v)||this.isNumberLike(m)||this.isPureSpecialCharacter(m)||n&&v&&v.getAttribute(h.TRANSLATED_TO)===n?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT},g=p=>{const m=p===document?document.body:p;if(p.shadowRoot){const w=p.shadowRoot;g(w)}const v=document.createTreeWalker(m,NodeFilter.SHOW_TEXT,{acceptNode:u});let x;for(;x=v.nextNode();){const w=x.parentElement;if(!w)continue;const L=w.hasAttribute(h.SOURCE_TEXT)?w.getAttribute(h.SOURCE_TEXT):x.textContent;o.push(L),i.set(a,{node:x,parent:w,sourceText:L}),a++}Array.from(m.querySelectorAll(l)).forEach(w=>{E.shouldPreventTranslation(w)||E.isNonContentElement(w)||n&&w.getAttribute(h.TRANSLATED_TO)===n||z.forEach(L=>{const M=w.getAttribute(L);if(M&&M.trim()){const W=`${h.SOURCE_ATTRIBUTE_PREFIX}${L}`;w.hasAttribute(W)?r.push(w.getAttribute(W)):r.push(M),s.set(c,{element:w,attribute:L}),c++}})});const F=document.createTreeWalker(m,NodeFilter.SHOW_ELEMENT);let D;for(;D=F.nextNode();){const L=D.shadowRoot;L&&g(L)}};return g(t),{textNodes:o,nodeMap:i,attributeTexts:r,attributeMap:s}}static isJsonString(t){try{return JSON.parse(t),!0}catch{return!1}}static isUnwantedContent(t){return!1}static isPureSpecialCharacter(t){return/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]+/.test(t)&&!t.match(/[a-zA-Z0-9\s]/)}static isNumberLike(t){const e=t.trim();if(!e||/[A-Za-z]/.test(e))return!1;const n=/[0-9\s.,+\-:;/()%$€£₹]/g,o=e.replace(n,"");return/[0-9]/.test(e)&&o.length===0}}class _t{constructor(t,e=70,n=4){this.sendFn=t,this.delay=e,this.concurrencyLimit=n,this.pending=new Set,this.requestQueue=[],this.activeRequests=0}enqueue(t){y.has(t)||A.has(t)||(this.pending.add(t),this.timerId&&clearTimeout(this.timerId),this.timerId=window.setTimeout(()=>this.flush(),this.delay))}flush(){if(this.pending.size===0)return;const t=Array.from(this.pending);this.pending.clear(),this.timerId=void 0;const e=It(t);e.texts.length===0&&e.attributeTexts.length===0||(this.requestQueue.push(e),this.processQueue())}processQueue(){if(this.activeRequests>=this.concurrencyLimit||this.requestQueue.length===0)return;this.activeRequests++;const t=this.requestQueue.shift();t.textMap.forEach(e=>y.add(e.node)),t.attributeMap.forEach(({element:e})=>y.add(e)),this.sendFn(t).catch(e=>{console.error("DebouncedSender sendFn error:",e),t.textMap.forEach(n=>y.delete(n.node)),t.attributeMap.forEach(({element:n})=>y.delete(n))}).finally(()=>{this.activeRequests--,this.processQueue()})}}function It(d){const t=[],e=new Map,n=[],o=new Map;let i=0,r=0;return d.forEach(s=>{const{textNodes:a,nodeMap:c,attributeTexts:l,attributeMap:u}=O.extractFreshContentForLanguage(s,document.documentElement.lang,g=>O.isJsonString(g)||O.isUnwantedContent(g));a.forEach((g,p)=>{const m=c.get(p);m&&(y.has(m.node)||A.has(m.node)||(t.push(g),e.set(i++,m)))}),l.forEach((g,p)=>{const m=u.get(p);m&&(y.has(m.element)||A.has(m.element)||(n.push(g),o.set(r++,m)))})}),{texts:t,textMap:e,attributeTexts:n,attributeMap:o}}class Mt{constructor(){this.handler=null,this.debounceTimer=null,this.isListening=!1,this.originalPushState=null,this.originalReplaceState=null,this.onRouteChange=()=>{this.clearDebounce(),this.debounceTimer=window.setTimeout(()=>{if(this.handler){const t=window.location.pathname+window.location.search;this.handler(t)}},V.SPA_NAVIGATION_DEBOUNCE)}}setHandler(t){this.handler=t}start(){this.isListening||(this.isListening=!0,this.hookHistoryAPI(),this.addPopstateListener())}stop(){this.isListening&&(this.isListening=!1,this.unhookHistoryAPI(),this.removePopstateListener(),this.clearDebounce())}hookHistoryAPI(){this.originalPushState=history.pushState.bind(history),this.originalReplaceState=history.replaceState.bind(history),history.pushState=(...t)=>{const e=this.originalPushState.apply(history,t);return this.onRouteChange(),e},history.replaceState=(...t)=>{const e=this.originalReplaceState.apply(history,t);return this.onRouteChange(),e}}unhookHistoryAPI(){this.originalPushState&&(history.pushState=this.originalPushState,this.originalPushState=null),this.originalReplaceState&&(history.replaceState=this.originalReplaceState,this.originalReplaceState=null)}addPopstateListener(){window.addEventListener("popstate",this.onRouteChange)}removePopstateListener(){window.removeEventListener("popstate",this.onRouteChange)}clearDebounce(){this.debounceTimer&&(clearTimeout(this.debounceTimer),this.debounceTimer=null)}}class j{static collectPageContext(){var i,r;const t={},e=(i=document.title)==null?void 0:i.trim();e&&e.length>0&&(t.title=e);const n=document.querySelector('meta[name="description"]'),o=(r=n==null?void 0:n.content)==null?void 0:r.trim();return o&&o.length>0&&(t.description=o),t.url=window.location.pathname+window.location.search,t}}class rt{static collectMetadata(){var i,r;const t=[],e=(i=document.title)==null?void 0:i.trim();e&&t.push(["title",e]);const n=document.querySelector('meta[name="description"]'),o=(r=n==null?void 0:n.content)==null?void 0:r.trim();return o&&t.push(["description",o]),t}static applyMetadata(t){const e=document.documentElement;t.forEach(([n,o])=>{if(n==="title")document.title=o,e.setAttribute(h.TRANSLATED_TO,document.documentElement.lang);else if(n==="description"){const i=document.querySelector('meta[name="description"]');i&&(i.content=o,e.setAttribute(h.TRANSLATED_TO,document.documentElement.lang))}})}}class S{static apply(t){var a;if(t.nodeType!==Node.TEXT_NODE||!((a=t.textContent)!=null&&a.trim()))return null;const e=t.parentElement;if(!e||E.isNonContentElement(e)||E.shouldPreventTranslation(e))return null;const n=document.createElement("span");n.className="tl-skeleton";const o=this.findInheritedBackgroundColor(e),i=this.rgbToHex(o),r=this.adjustColorBrightness(i,-5),s=this.adjustColorBrightness(i,10);return n.style.setProperty("--skeleton-bg-color",r),n.style.setProperty("--skeleton-highlight-color",s),t.parentNode&&(t.parentNode.insertBefore(n,t),n.appendChild(t)),n}static remove(t){if(!t||!t.parentNode)return;const e=t.firstChild;e&&t.parentNode.insertBefore(e,t),t.remove()}static findInheritedBackgroundColor(t){let e=t;for(;e;){const n=window.getComputedStyle(e).backgroundColor;if(n&&n!=="rgba(0, 0, 0, 0)"&&n!=="transparent")return n;if(e===document.body)break;e=e.parentElement}return window.getComputedStyle(document.documentElement).backgroundColor||"#65737e"}static rgbToHex(t){const e=t.match(/\d+/g);return e?"#"+e.slice(0,3).map(n=>("0"+parseInt(n).toString(16)).slice(-2)).join(""):"#e0e0e0"}static adjustColorBrightness(t,e){const n=parseInt(t.replace("#",""),16),o=Math.round(2.55*e),i=(n>>16)+o,r=(n>>8&255)+o,s=(n&255)+o;return"#"+(16777216+(this.clamp(i,0,255)<<16)+(this.clamp(r,0,255)<<8)+this.clamp(s,0,255)).toString(16).slice(1)}static clamp(t,e,n){return Math.min(Math.max(t,e),n)}}const kt={version:"1.0.1",buildTime:new Date().toISOString(),environment:"production"};typeof window<"u"&&(window.__TRANSLATOR_BUILD_INFO=kt);class Bt{constructor(t,e){this.observer=null,this.currentAbortController=null,this.languageDropdown=null,this.translatedLabels=void 0,this.isTranslating=!1,this.originalTitle=null,this.originalDescription=null,this.onTranslatedPageReady=null,this.apiService=t,this.configManager=e,this.sender=new _t(n=>this.translateBatch(n),V.DYNAMIC_TRANSLATION_DEBOUNCE),this.navigationService=new Mt,this.navigationService.setHandler(()=>this.handleUrlChange())}setTranslating(t){this.isTranslating=t,this.updateLanguageDropdown(this.translatedLabels)}updateLanguageDropdown(t){const e=this.configManager.getTranslationConfig();if(!e){console.error("❌ Cannot update dropdown: No configuration available");return}const n={config:e,currentLang:this.configManager.getCurrentLanguage(),theme:N.theme,translatedDropdownLabels:t,isTranslating:this.isTranslating,disabled:this.isTranslating};this.languageDropdown?this.languageDropdown.update(n):(this.languageDropdown=new Pt({...n,onLanguageChange:o=>this.switchLanguage(o)}),this.languageDropdown.create())}abortCurrentTranslation(){this.currentAbortController&&(this.currentAbortController.abort(),this.currentAbortController=null)}async restoreToSourceLanguage(){var e;(e=this.observer)==null||e.stop(),document.querySelectorAll(`[${h.SOURCE_TEXT}]`).forEach(n=>{const o=n.getAttribute(h.SOURCE_TEXT),r=Array.from(n.childNodes).find(s=>s.nodeType===Node.TEXT_NODE);o&&r&&(r.textContent=o,it(r)),n.removeAttribute(h.TRANSLATED_TO),n.removeAttribute(h.TRANSLATION_STATE)}),document.querySelectorAll(`[${h.TRANSLATED_TO}]`).forEach(n=>{const o=[];for(let i=0;i<n.attributes.length;i++){const r=n.attributes[i];if(r.name.startsWith(h.SOURCE_ATTRIBUTE_PREFIX)){const s=r.name.substring(h.SOURCE_ATTRIBUTE_PREFIX.length);n.setAttribute(s,r.value),o.push(r.name)}}o.forEach(i=>n.removeAttribute(i)),n.removeAttribute(h.TRANSLATED_TO),n.removeAttribute(h.TRANSLATION_STATE),ot(n)}),document.querySelectorAll(`[${h.TRANSLATION_STATE}]`).forEach(n=>{n.removeAttribute(h.TRANSLATION_STATE)}),this.originalTitle&&(document.title=this.originalTitle);const t=document.querySelector('meta[name="description"]');t&&this.originalDescription&&(t.content=this.originalDescription),this.translatedLabels=void 0}applyTranslatedTextNodes(t,e,n){t.forEach((i,r)=>{var g,p;const s=e.get(r);if(!s)return;const a=this.resolveLiveTextTarget(s);if(!a||!a.parentElement)return;const c=a.parentElement,l=s.sourceText;c.hasAttribute(h.SOURCE_TEXT)||c.setAttribute(h.SOURCE_TEXT,l),c.setAttribute(h.TRANSLATION_STATE,"translated"),c.setAttribute(h.TRANSLATED_TO,n);const u=i.trim();if(nt(a,u),this.normalizeText(l)!==this.normalizeText(u)){const m=((g=l.match(/^\s+/))==null?void 0:g[0])||"",v=((p=l.match(/\s+$/))==null?void 0:p[0])||"";a.textContent=`${m}${u}${v}`}});const o=this.configManager.getTranslationConfig();o&&E.updateCanonicalUrl(n,o.defaultLang)}resolveLiveTextTarget(t){var o;if((o=t.node.parentElement)!=null&&o.isConnected)return t.node;if(!t.parent.isConnected)return null;const e=this.findFirstMeaningfulTextNode(t.parent);if(!e)return null;const n=e.textContent||"";return this.normalizeText(n)!==this.normalizeText(t.sourceText)?(t.parent.setAttribute(h.SOURCE_TEXT,n),t.parent.removeAttribute(h.TRANSLATION_STATE),t.parent.removeAttribute(h.TRANSLATED_TO),this.configManager.isInDefaultLanguage()||this.enqueue(t.parent),null):e}findFirstMeaningfulTextNode(t){return document.createTreeWalker(t,NodeFilter.SHOW_TEXT,{acceptNode:n=>{var i;return((i=n.textContent)==null?void 0:i.trim())?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}}).nextNode()}normalizeText(t){return t.replace(/\s+/g," ").trim()}async translatePage(t){this.abortCurrentTranslation(),this.setTranslating(!0);const e=this.configManager.getTranslationConfig();if(!e){console.error("❌ No config available for translation"),this.setTranslating(!1);return}if(t===e.defaultLang)return this.setTranslating(!1),this.restoreToSourceLanguage();const{textNodes:n,nodeMap:o,attributeTexts:i,attributeMap:r}=O.extractFreshContentForLanguage(document,t,p=>O.isJsonString(p)||O.isUnwantedContent(p));let s=[],a=[];if(e){const p=new Set([...e.targetLanguages,e.defaultLang]);a=Array.from(p).filter(m=>e.languageLabels[m]),s=a.map(m=>e.languageLabels[m])}this.originalTitle||(this.originalTitle=document.title);const c=document.querySelector('meta[name="description"]');c&&!this.originalDescription&&(this.originalDescription=c.content);const l=rt.collectMetadata(),u=l.map(([,p])=>p);if(n.length===0&&u.length===0&&i.length===0){this.setTranslating(!1),this.notifyTranslatedPageReady();return}const g=new Map;o.forEach((p,m)=>{p.parent.hasAttribute(h.SOURCE_TEXT)||p.parent.setAttribute(h.SOURCE_TEXT,p.sourceText)}),o.forEach((p,m)=>{const v=S.apply(p.node);v&&g.set(m,v)});try{const p=this.configManager.getTranslationConfig(),m=this.configManager.getApiConfig();if(!p||!m){console.error("❌ No config available for translation"),this.setTranslating(!1);return}const v={targetLanguage:t,sourceLanguage:p.defaultLang,websiteId:p.websiteId};this.currentAbortController=new AbortController;const x=j.collectPageContext(),P=[...n,...i,...u],F=await this.apiService.translateTextBased({textNodes:P,translateConfig:v,apiConfig:m,dropdownLabels:s,pageContext:x,abortSignal:this.currentAbortController.signal});g.forEach(k=>{S.remove(k)});const D=F.translatedTextNodes||[],w=F.translatedDropdownLabels||[],L=D.slice(0,n.length),M=D.slice(n.length,n.length+i.length),W=D.slice(n.length+i.length);this.applyTranslatedTextNodes(L,o,t),this.applyTranslatedAttributes(M,r,t);const $t=l.map(([k],H)=>[k,W[H]||""]);rt.applyMetadata($t),document.documentElement.lang=t;const G={};a.forEach((k,H)=>{w[H]&&(G[k]=w[H])}),this.translatedLabels=G,this.updateLanguageDropdown(G),this.setTranslating(!1),this.notifyTranslatedPageReady()}catch(p){if(g.forEach(m=>{S.remove(m)}),$.isAbortError(p)){this.setTranslating(!1);return}throw console.error("❌ Text translation failed:",p),this.setTranslating(!1),p}finally{this.currentAbortController=null}}applyTranslatedAttributes(t,e,n){t.forEach((o,i)=>{const r=e.get(i);if(!r)return;const{element:s,attribute:a}=r,c=`${h.SOURCE_ATTRIBUTE_PREFIX}${a}`,l=s.getAttribute(a)||"";s.hasAttribute(c)||s.setAttribute(c,l),s.setAttribute(h.TRANSLATION_STATE,"translated"),s.setAttribute(h.TRANSLATED_TO,n);const u=o.trim();Lt(s,a,u),l.trim()!==u&&s.setAttribute(a,u)})}async translateBatch(t){const{texts:e,textMap:n,attributeTexts:o,attributeMap:i}=t;if(e.length===0&&o.length===0)return;n.forEach((l,u)=>{l.parent.hasAttribute(h.SOURCE_TEXT)||l.parent.setAttribute(h.SOURCE_TEXT,e[u])}),i.forEach(({element:l,attribute:u},g)=>{const p=`${h.SOURCE_ATTRIBUTE_PREFIX}${u}`;l.hasAttribute(p)||l.setAttribute(p,o[g])}),n.forEach(l=>{l.parent.setAttribute(h.TRANSLATION_STATE,"translating")}),i.forEach(({element:l})=>{l.setAttribute(h.TRANSLATION_STATE,"translating")});const r=this.configManager.getApiConfig(),s=this.configManager.getTranslationConfig();if(!r||!s)return;if(this.configManager.isInDefaultLanguage()){n.forEach(l=>{y.delete(l.node),A.add(l.node)}),i.forEach(({element:l})=>{y.delete(l),A.add(l)});return}const a=new Map;n.forEach((l,u)=>{const g=S.apply(l.node);g&&a.set(u,g)});const c={targetLanguage:this.configManager.getCurrentLanguage(),sourceLanguage:s.defaultLang,websiteId:s.websiteId};try{const l=[...e,...o],g=(await this.apiService.translateTextBased({textNodes:l,translateConfig:c,apiConfig:r,dropdownLabels:[],pageContext:j.collectPageContext()})).translatedTextNodes||[],p=g.slice(0,e.length),m=g.slice(e.length);a.forEach(v=>{S.remove(v)}),this.applyTranslatedTextNodes(p,n,c.targetLanguage),this.applyTranslatedAttributes(m,i,c.targetLanguage),n.forEach(v=>{y.delete(v.node),A.add(v.node)}),i.forEach(({element:v})=>{y.delete(v),A.add(v)})}catch(l){console.error("❌ translateBatch failed:",l),n.forEach(u=>{u.parent.removeAttribute(h.TRANSLATION_STATE)}),i.forEach(({element:u})=>{u.removeAttribute(h.TRANSLATION_STATE)}),a.forEach(u=>S.remove(u))}}async switchLanguage(t){var n;if(t===this.configManager.getCurrentLanguage())return;const e=this.configManager.getTranslationConfig();if(!e){console.error("❌ No configuration available");return}if(t===e.defaultLang){this.configManager.setCurrentLanguage(t),window.location.reload();return}try{this.abortCurrentTranslation(),(n=this.observer)==null||n.stop(),this.configManager.setCurrentLanguage(t),this.setTranslating(!0),await this.restoreToSourceLanguage(),await this.translatePage(t),q(t),this.updateLanguageDropdown(this.translatedLabels),this.startObserver()}catch(o){console.error("❌ Switch language failed:",o),o instanceof Error&&(o.message==="NETWORK_ERROR"?f.showErrorMessage("network","Failed to switch language. Please check your connection."):o.message==="RATE_LIMIT"?f.showErrorMessage("rate-limit","Too many requests. Please try again later."):f.showErrorMessage("server","Failed to switch language. Please try again.")),this.setTranslating(!1),this.updateLanguageDropdown(),this.startObserver()}}clearMetadataSourceAttributes(){this.originalTitle=null,this.originalDescription=null}clearTranslationAttributes(){document.querySelectorAll(`[${h.TRANSLATED_TO}]`).forEach(t=>{t.removeAttribute(h.TRANSLATED_TO)}),document.querySelectorAll(`[${h.TRANSLATION_STATE}]`).forEach(t=>{t.removeAttribute(h.TRANSLATION_STATE)})}async waitForInitialContent(){await Q(document.body)}async initialize(){var n;if(!N.apiKey){console.error("❌ No API key provided"),f.showErrorMessage("auth","Translation service not configured. Missing API key.");return}if(!N.domain){console.error("❌ No domain provided"),f.showErrorMessage("config-invalid","Translation service not configured. Missing domain.");return}E.detectCSPViolations(),await this.waitForDOMReady(),await this.waitForInitialContent();const t=await this.configManager.initializeConfig();if(!t){console.error("Initialization failed: No config available");return}const e=document.createElement("style");e.textContent=`
            .tl-skeleton {
                color: transparent !important;
                background-color: var(--skeleton-bg-color, #e0e0e0) !important;
                background-image: linear-gradient(
                    90deg,
                    var(--skeleton-bg-color, #e0e0e0),
                    var(--skeleton-highlight-color, #f0f0f0),
                    var(--skeleton-bg-color, #e0e0e0)
                ) !important;
                background-size: 200% 100% !important;
                animation: skeleton-pulse 1.5s linear infinite !important;
                border-radius: 4px !important;
                user-select: none !important;
                margin-left: 1px !important;
                margin-right: 1px !important;
                -webkit-user-select: none !important;
            }

            @keyframes skeleton-pulse {
                0% {
                    background-position: 100% 0;
                }
                100% {
                    background-position: -100% 0;
                }
            }
        `,document.head.appendChild(e),this.updateLanguageDropdown(),this.startObserver();try{const o=this.configManager.getApiConfig();o&&(await this.apiService.checkRedisAvailability({translateConfig:{targetLanguage:this.configManager.getCurrentLanguage(),sourceLanguage:t.defaultLang,websiteId:t.websiteId},apiConfig:{key:o.key,domain:o.domain},pageContext:j.collectPageContext()})||(f.showErrorMessage("cache-unavailable","Cache service not configured/available. Translation disabled until restored."),(n=this.languageDropdown)==null||n.update({disabled:!0})))}catch{}if(!this.configManager.isInDefaultLanguage()){const o=this.configManager.getCurrentLanguage(),i=this.configManager.getTranslationConfig();o===(i==null?void 0:i.defaultLang)?await this.restoreToSourceLanguage():await this.translatePage(o)}q(this.configManager.getCurrentLanguage()),this.navigationService.start(),window.addEventListener("offline",()=>{f.showErrorMessage("offline","You are now offline. Using cached translations where available.")}),window.addEventListener("online",()=>{f.clearError()}),window.addEventListener("beforeunload",()=>{this.abortCurrentTranslation(),this.navigationService.stop()}),this.notifyTranslatedPageReady()}notifyTranslatedPageReady(){var t;this.configManager.isInDefaultLanguage()||(t=this.onTranslatedPageReady)==null||t.call(this)}async waitForDOMReady(){document.readyState==="loading"&&await new Promise(t=>{document.addEventListener("DOMContentLoaded",t)})}async handleUrlChange(){if(this.abortCurrentTranslation(),this.clearTranslationAttributes(),this.clearMetadataSourceAttributes(),await Q(document.body),!this.configManager.isInDefaultLanguage())try{await this.translatePage(this.configManager.getCurrentLanguage())}catch(t){console.error("❌ Translation failed during URL change:",t)}}enqueue(t){this.sender.enqueue(t)}startObserver(){this.configManager.getTranslationConfig()&&(this.observer=new Dt(()=>{},e=>this.enqueue(e),this.configManager),this.observer.start())}}const N=(()=>{const d=document.currentScript,t=(d==null?void 0:d.dataset.domain)||window.location.host,e=E.normalizeDomain(t),n=(d==null?void 0:d.dataset.apiKey)||"",o=(d==null?void 0:d.dataset.theme)||"dark",i=(d==null?void 0:d.dataset.disableAutoBrowserTranslation)==="true";return{apiKey:n,domain:e,theme:o,disableAutoBrowserTranslation:i}})();(async()=>{if(window.__translateDone)throw"already injected";window.__translateDone=!0;const d=new $,t=new ft(d,N),e=new Bt(d,t);let n=null,o=null;async function i(){n||t.isInDefaultLanguage()||(o||(o=(async()=>{try{if(!await d.shouldEnableEditSession({key:N.apiKey})||n)return;n=new Nt(d,t,N.theme),n.start(),window.addEventListener("beforeunload",()=>n==null?void 0:n.stop())}finally{o=null}})()),await o)}e.onTranslatedPageReady=()=>{i()},await e.initialize()})()})();
