(function(){"use strict";const _="200px",z={CONFIG:"/translate/config",TEXT_BASED:"/translate/text-based"},f={ERROR_MESSAGE:"tl-error-message",DROPDOWN_CONTAINER:"tl-dropdown-container",DROPDOWN_STYLE:"tl-dropdown-style",DROPDOWN:"tl-dropdown",DRAG_HANDLE:"tl-drag-handle",RESET_HANDLE:"tl-reset-handle",POWERED_BY:"tl-powered-by"},l={TRANSLATED_TO:"data-tl-to",SOURCE_TEXT:"data-tl-src",SOURCE_ATTRIBUTE_PREFIX:"data-tl-src-",TRANSLATION_STATE:"data-tl-state"},I=["title","alt","placeholder","value","aria-label","aria-description","data-tooltip","data-tip","data-original-title","data-hover","data-after-content"],P={ERROR_MESSAGE_DURATION:5e3,SPA_NAVIGATION_DEBOUNCE:150,DYNAMIC_TRANSLATION_DEBOUNCE:100},L={DROPDOWN_POSITION:"tl-dropdown-position",SELECTED_LANGUAGE:"tl-selected-language",SOURCE_CACHE:"tl-source-cache"},X=["[data-no-translate]",'[data-translated="true"]',".notranslate",'[translate="no"]',"script","style","noscript"],q=new Set(["ar","he","fa","ur","ps","sd","ug","yi"]);function Y(g){const t=g.split("-")[0].toLowerCase();if(q.has(t))return!0;try{const e=new Intl.Locale(g).maximize().script;return e==="Arab"||e==="Hebr"}catch{return!1}}function M(g){const t=Y(g)?"rtl":"ltr";document.documentElement.dir=t,document.documentElement.lang=g}class m{static showErrorMessage(t,e,n){const r=document.getElementById(f.ERROR_MESSAGE);r&&r.remove();const a=document.createElement("div");a.id=f.ERROR_MESSAGE,a.setAttribute("data-no-translate","true");const i=this.getErrorDetail(t,e);console.error(`Translation Error [${t}]:`,i.message,e);const o=document.createElement("div");o.style.cssText="display: flex; flex-direction: column; gap: 8px;";const s=document.createElement("div");if(s.textContent=i.message,o.appendChild(s),i.retryable&&n){const c=document.createElement("button");c.textContent="Retry",c.style.cssText=`
                background: white; color: #dc2626; border: none;
                padding: 4px 12px; border-radius: 4px; cursor: pointer;
                font-size: 12px; font-weight: 500; margin-top: 4px;
            `,c.onclick=()=>{a.remove(),n()},o.appendChild(c)}a.style.cssText=`
            position: fixed; bottom: 24px; right: 24px; z-index: 9999;
            background: #dc2626; color: white; padding: 12px 16px;
            border-radius: 8px; font: 14px/1.4 sans-serif;
            max-width: 320px; box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        `,a.appendChild(o),document.body.appendChild(a);const h=i.showDuration||P.ERROR_MESSAGE_DURATION;setTimeout(()=>{a.parentNode&&a.remove()},h)}static getErrorDetail(t,e){const n={auth:{type:"auth",message:e||"🔒 Authentication failed. Please check your API key.",retryable:!1,showDuration:8e3},server:{type:"server",message:e||"⚠️ Translation service temporarily unavailable. Please try again later.",retryable:!0,showDuration:8e3},network:{type:"network",message:e||"🌐 Connection failed. Please check your internet connection.",retryable:!0,showDuration:8e3},"rate-limit":{type:"rate-limit",message:e||"⏳ Too many requests. Please try again later.",fallback:"Using cached translations where available.",retryable:!0,showDuration:1e4},"unsupported-language":{type:"unsupported-language",message:e||"🌍 Language not supported. Using default language.",retryable:!1,showDuration:6e3},"invalid-url":{type:"invalid-url",message:e||"❌ Invalid URL format. Please check the URL and try again.",retryable:!1,showDuration:8e3},"cache-unavailable":{type:"cache-unavailable",message:e||"💾 Cache unavailable. Using direct translation service.",fallback:"Translations may be slower than usual.",retryable:!1,showDuration:6e3},"config-invalid":{type:"config-invalid",message:e||"⚙️ Invalid configuration. Please contact support.",retryable:!1,showDuration:1e4},offline:{type:"offline",message:e||"📡 You are offline. Using cached translations where available.",fallback:"New translations unavailable until connection restored.",retryable:!0,showDuration:6e3}};return n[t]||n.server}static clearError(){const t=document.getElementById(f.ERROR_MESSAGE);t&&t.remove()}static isOffline(){return!navigator.onLine}}function G(g){return g.replace(/_([a-z])/g,(t,e)=>e.toUpperCase())}function j(g){return g.replace(/[A-Z]/g,t=>`_${t.toLowerCase()}`)}function V(g){return Object.fromEntries(Object.entries(g).map(([t,e])=>[G(t),e]))}function J(g){return Object.fromEntries(Object.entries(g).map(([t,e])=>[j(t),e]))}class D{constructor(t,e){this.maxRetries=3,this.apiUrl=(t==null?void 0:t.apiUrl)||"https://html-translator-staging-136516919516.europe-west2.run.app",this.onCriticalError=e}getApiUrl(){return this.apiUrl}setCriticalErrorHandler(t){this.onCriticalError=t}async fetchConfig(t,e){try{if(!t||!e)throw m.showErrorMessage("config-invalid","Invalid configuration: Missing API key or domain."),new Error("INVALID_CONFIG");try{new URL(this.apiUrl)}catch{throw m.showErrorMessage("invalid-url","Invalid API URL format."),new Error("INVALID_URL")}const n=await fetch(`${this.apiUrl}${z.CONFIG}`,{method:"GET",credentials:"omit",headers:{Authorization:`Bearer ${t}`,Origin:window.location.origin,"Content-Type":"application/json"}});if(!n.ok)throw await this.handleConfigError(n),new Error(`HTTP error! status: ${n.status}`);const r=await n.json(),a=r.payload||r;if(!a.default_language)throw m.showErrorMessage("config-invalid","Invalid configuration: Missing default language."),new Error("INVALID_CONFIG");if(!a.selected_languages)throw m.showErrorMessage("config-invalid","Invalid configuration: No target languages specified."),new Error("INVALID_CONFIG");return{domain:e,defaultLang:a.default_language,languageLabels:a.language_labels,targetLanguages:a.selected_languages,websiteId:a.website_id,teamId:a.team_id}}catch(n){throw console.error("❌ Failed to fetch configuration:",n),n instanceof TypeError&&n.message.includes("Failed to fetch")?(m.isOffline()?m.showErrorMessage("offline","Cannot load translation configuration while offline."):m.showErrorMessage("network","Failed to load translation configuration. Please check your connection."),new Error("NETWORK_ERROR")):(n instanceof Error&&n.message==="RATE_LIMIT",n)}}async handleConfigError(t){var n;const e=await t.json().catch(()=>({}));if(t.status===401)m.showErrorMessage("auth",e.error==="invalid_api_key"?"Invalid API key":void 0);else if(t.status===403)m.showErrorMessage("auth",e.error==="origin_not_allowed"?"Domain not authorized for this API key":void 0);else if(t.status===404)m.showErrorMessage("server",e.detail.payload.error==="website_not_found"?e.detail.payload.message:"Translation configuration not found.");else{if(t.status===429)throw m.showErrorMessage("rate-limit",e.message||"You're sending requests too quickly. Please wait and try again."),new Error("RATE_LIMIT");t.status>=500?e.detail&&e.detail.includes("Redis connection failed")?(m.showErrorMessage("server","Translation service unavailable (Redis connection failed)"),(n=this.onCriticalError)==null||n.call(this)):m.showErrorMessage("server"):m.showErrorMessage("network",`HTTP ${t.status}`)}}async translateTextBased({textNodes:t,translateConfig:e,apiConfig:n,dropdownLabels:r,pageContext:a,abortSignal:i}){m.isOffline()&&m.showErrorMessage("offline","You are currently offline. Using cached translations where available.");const o=async(s=0)=>{try{const h=await fetch(`${this.apiUrl}${z.TEXT_BASED}`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json",Authorization:`Bearer ${n.key}`,"X-Domain":n.domain},body:JSON.stringify(J({textNodes:t,translateConfig:e,dropdownLabels:r,pageContext:a})),signal:i});if(!h.ok)throw await this.handleTranslationError(h),new Error(`HTTP error! status: ${h.status}`);const c=await h.json();return c.redis_available===!1&&m.showErrorMessage("cache-unavailable","Cache service temporarily unavailable. Translations may be slower. Please refresh the browser."),V(c)}catch(h){if(D.isAbortError(h))throw h;if(h instanceof TypeError&&h.message.includes("Failed to fetch")){if(s<this.maxRetries)return await new Promise(c=>setTimeout(c,Math.pow(2,s)*1e3)),o(s+1);throw m.isOffline()?m.showErrorMessage("offline"):m.showErrorMessage("network","Network connection failed. Please check your connection."),new Error("NETWORK_ERROR")}if(h instanceof Error&&h.message==="RATE_LIMIT"&&s<2)return await new Promise(c=>setTimeout(c,5e3*(s+1))),o(s+1);throw h}};return o()}async handleTranslationError(t){const e=await t.json().catch(()=>({})),n=e.detail||{},r=n.error||"unknown";let a=`HTTP_${t.status}`;switch(r){case"unsupported_language":m.showErrorMessage("unsupported-language",n.message),a="UNSUPPORTED_LANGUAGE";break;case"rate_limit":const i=n.from_cache_only?"Rate limit reached. Serving cached translations.":"Too many requests. Please try again later.";m.showErrorMessage("rate-limit",i),a="RATE_LIMIT";break;case"invalid_api_key":m.showErrorMessage("auth","Invalid API key. Please check your configuration."),a="UNAUTHORIZED";break;case"domain_mismatch":case"origin_not_allowed":m.showErrorMessage("auth","This domain is not authorized for the provided API key."),a="FORBIDDEN";break;default:t.status===401?(m.showErrorMessage("auth",n.message||"Authentication failed"),a="UNAUTHORIZED"):t.status===403?(m.showErrorMessage("auth",n.message||"Access forbidden"),a="FORBIDDEN"):t.status===404?m.showErrorMessage("server",e.error==="website_not_found"?"Translation configuration not found.":void 0):t.status===429?(m.showErrorMessage("rate-limit",n.message||"You’re sending requests too quickly. Please wait a moment and try again."),a="RATE_LIMIT"):t.status>=500?n.message&&n.message.includes("Redis")?(m.showErrorMessage("server","Translation service experiencing issues. Some features may be limited."),a="REDIS_UNAVAILABLE"):(m.showErrorMessage("server",n.message||"Server error"),a="SERVER_ERROR"):(m.showErrorMessage("network",`HTTP ${t.status}: ${n.message||"Unknown error"}`),a="NETWORK_ERROR")}throw new Error(a)}static isAbortError(t){return t.name==="AbortError"}}class C{static saveDropdownPosition(t){try{localStorage.setItem(L.DROPDOWN_POSITION,JSON.stringify(t))}catch(e){console.warn("Failed to save dropdown position to localStorage:",e)}}static loadDropdownPosition(){try{const t=localStorage.getItem(L.DROPDOWN_POSITION);if(t){const e=JSON.parse(t);if(typeof e.x=="number"&&typeof e.y=="number")return e}}catch(t){console.warn("Failed to load dropdown position from localStorage:",t)}return null}static saveSelectedLanguage(t){try{localStorage.setItem(L.SELECTED_LANGUAGE,t)}catch(e){console.warn("Failed to save selected language to localStorage:",e)}}static loadSelectedLanguage(){try{return localStorage.getItem(L.SELECTED_LANGUAGE)}catch(t){return console.warn("Failed to load selected language from localStorage:",t),null}}}class b{static getCurrentPath(){return window.location.pathname+window.location.search}static getScriptConfig(){const t=document.currentScript,e=(t==null?void 0:t.dataset.domain)||window.location.host;return{apiKey:"wt_8c29cf86f8b04d17_Ou5m5LI2GIiY0FzXUTp4KQ",domain:b.normalizeDomain(e)}}static normalizeDomain(t){if(!t)return"";let e=t.trim().toLowerCase();return e=e.replace(/^(https?:\/\/)/,""),e.startsWith("www.")&&(e=e.slice(4)),e=e.split("/")[0],e}static shouldPreventTranslation(t){if(!t)return!1;let e=t;for(;e;){if(e.getAttribute("translate")==="no"||e.classList&&e.classList.contains("notranslate")||e.hasAttribute("data-no-translate"))return!0;e=e.parentElement}return!1}static isNonContentElement(t){const e=t.tagName;return e==="SCRIPT"||e==="STYLE"||e==="NOSCRIPT"}static escapeHtml(t){const e={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","/":"&#x2F;"};return t.replace(/[&<>"'/]/g,n=>e[n]||n)}static detectCSPViolations(){try{const t=document.createElement("style");t.textContent=".csp-test { display: none; }",document.head.appendChild(t),document.head.removeChild(t)}catch{console.warn("⚠️ CSP may block inline styles needed for translation dropdown")}document.addEventListener("securitypolicyviolation",t=>{(t.violatedDirective.includes("script-src")||t.violatedDirective.includes("style-src")||t.violatedDirective.includes("connect-src"))&&console.warn(`⚠️ CSP violation detected: ${t.violatedDirective} - Translation features may be limited`)})}static getBrowserLanguage(){return navigator.language?navigator.language.split("-")[0].toLowerCase():navigator.languages&&navigator.languages.length>0?navigator.languages[0].split("-")[0].toLowerCase():null}static updateCanonicalUrl(t,e){const n=document.querySelector('link[rel="canonical"]');if(n)try{const r=new URL(n.href);t!==e?r.searchParams.set("lang",t):r.searchParams.delete("lang"),n.href=r.toString()}catch(r){console.warn("Failed to update canonical URL:",r)}}}function B(g,t=250,e=1e3){return new Promise(n=>{let r;const a=new MutationObserver(()=>{clearTimeout(r),r=window.setTimeout(i,t)});function i(){a.disconnect(),n()}a.observe(g,{childList:!0,subtree:!0,characterData:!0});const o=window.setTimeout(()=>{a.disconnect(),n()},e);r=window.setTimeout(()=>{clearTimeout(o),i()},t)})}class K{constructor(t,e){this.apiService=t,this.scriptConfig=e,this.state={translationConfig:null,apiConfig:null,currentLang:"en"}}getState(){return{...this.state}}updateState(t){this.state={...this.state,...t}}async initializeConfig(){const{apiKey:t,domain:e}=this.scriptConfig;if(!t)return console.error("❌ No API key provided. Translation disabled."),null;const n=5;let r=0,a=500;for(;r<n;)try{const i=await this.apiService.fetchConfig(t,e),o={defaultLang:i.defaultLang,languageLabels:i.languageLabels,targetLanguages:i.targetLanguages,domain:i.domain,websiteId:i.websiteId,teamId:i.teamId},s={key:t,domain:e,apiUrl:this.apiService.getApiUrl()};this.updateState({translationConfig:o,apiConfig:s});let h=o.defaultLang;const c=C.loadSelectedLanguage();if(c&&(o.targetLanguages.includes(c)||c===o.defaultLang))h=c;else{const u=b.getBrowserLanguage();if(u&&u!==o.defaultLang&&o.targetLanguages.includes(u))h=u;else if(u&&u!==o.defaultLang){const p=o.targetLanguages.find(T=>u.startsWith(T)||T.startsWith(u));p&&(h=p)}}return this.updateState({currentLang:h}),o}catch(i){if(r++,i instanceof Error&&i.message==="RATE_LIMIT"){console.error("❌ Rate limit exceeded. Stopping retries.");break}console.warn(`⚠️ Config fetch attempt ${r} failed: ${i.message}. Retrying in ${a}ms...`),await new Promise(o=>setTimeout(o,a)),a=Math.min(a*2,4e3)}return console.error("❌ Failed to initialize translation script after all retries"),this.updateState({translationConfig:null,apiConfig:null}),null}getCurrentLanguage(){return this.state.currentLang}getTranslationConfig(){return this.state.translationConfig}getApiConfig(){return this.state.apiConfig}setCurrentLanguage(t){this.updateState({currentLang:t}),C.saveSelectedLanguage(t)}isInDefaultLanguage(){var t;return this.state.currentLang===((t=this.state.translationConfig)==null?void 0:t.defaultLang)}}class Q{constructor(t){this.options=t,this.container=null,this.selectElement=null,this.isDragging=!1,this.dragOffsetX=0,this.dragOffsetY=0,this.resizeObserver=null,this.isCustomPosition=!1,this.resizeTimeout=null}create(){if(document.getElementById(f.DROPDOWN_CONTAINER)){this.update(this.options);return}const{theme:t="dark"}=this.options;this.createStyles(t),this.createContainer(),this.setupResizeObserver()}remove(){const t=document.getElementById(f.DROPDOWN_CONTAINER);t&&t.remove();const e=document.getElementById(f.DROPDOWN_STYLE);e&&e.remove(),this.resizeObserver&&(this.resizeObserver.disconnect(),this.resizeObserver=null),this.resizeTimeout&&(clearTimeout(this.resizeTimeout),this.resizeTimeout=null),window.removeEventListener("resize",this.handleWindowResize.bind(this)),this.container=null,this.selectElement=null}update(t){this.options={...this.options,...t},this.selectElement&&(this.selectElement.innerHTML="",this.populateSelect(this.selectElement),this.selectElement.disabled=!!this.options.isTranslating),this.container&&(this.options.isTranslating?this.container.setAttribute("title","Translation is in progress"):this.container.removeAttribute("title"))}setupResizeObserver(){typeof ResizeObserver>"u"||(this.resizeObserver=new ResizeObserver(()=>{this.resizeTimeout&&clearTimeout(this.resizeTimeout),this.resizeTimeout=window.setTimeout(()=>{this.ensureDropdownInViewport()},100)}),this.resizeObserver.observe(document.body))}ensureDropdownInViewport(){if(!this.container||!this.isCustomPosition)return;const t=this.container.getBoundingClientRect(),e=window.innerWidth,n=window.innerHeight,r=t.width,a=t.height;let i=!1,o=t.left,s=t.top;t.right>e?(o=e-r-24,i=!0):t.left<0&&(o=24,i=!0),t.bottom>n?(s=n-a-24,i=!0):t.top<0&&(s=24,i=!0),o=Math.max(24,Math.min(o,e-r-24)),s=Math.max(24,Math.min(s,n-a-24)),i&&(this.container.style.left=o+"px",this.container.style.top=s+"px",this.container.style.right="auto",this.container.style.bottom="auto",C.saveDropdownPosition({x:o,y:s}))}constrainToViewport(t,e){if(!this.container)return{x:t,y:e};const n=this.container.offsetWidth,r=this.container.offsetHeight,a=window.innerWidth,i=window.innerHeight,o=24,s=a-n-o,h=i-r-o;return{x:Math.max(o,Math.min(t,s)),y:Math.max(o,Math.min(e,h))}}handleWindowResize(){this.resizeTimeout&&clearTimeout(this.resizeTimeout),this.resizeTimeout=window.setTimeout(()=>{this.ensureDropdownInViewport()},100)}createStyles(t){const e=document.createElement("style");e.id=f.DROPDOWN_STYLE,e.textContent=this.generateCSS(t),document.head.appendChild(e)}generateCSS(t){const e=this.getBaseColors(t),n=e,r=`
            #${f.DROPDOWN}:not(:disabled):hover {
                background: var(--tl-bg-hover, ${e.bgHover});
                cursor: pointer;
            }
            
            #${f.DROPDOWN}:not(:disabled):focus {
                background: var(--tl-bg-hover, ${e.bgHover});
            }

            #${f.DROPDOWN}:disabled {
                cursor: default;
                animation: pulse 2s infinite;
            }
            
            @keyframes pulse {
                0% {
                    background: var(--tl-bg, ${e.bg});
                    color: var(--tl-color, ${n.color});
                    opacity: 0.8;
                }
                50% {
                    background: var(--tl-bg-hover, ${e.bgHover});
                    color: var(--tl-color, ${n.color});
                    opacity: 0.5;
                }
                100% {
                    background: var(--tl-bg, ${e.bg});
                    color: var(--tl-color, ${n.color});
                    opacity: 0.8;
                }
            }
            
            #${f.DROPDOWN} option {
                background: var(--tl-option-bg, ${e.optionBg});
                color: var(--tl-option-color, ${e.optionColor});
                padding: var(--tl-option-padding, 8px 12px);
                font-size: var(--tl-option-font-size, 14px);
                font-weight: var(--tl-option-font-weight, 400);
                font-family: var(--tl-option-font-family, inherit);
                line-height: var(--tl-option-line-height, 1.3);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        `,a=t==="light"?`
            #${f.POWERED_BY} {
                background: rgba(0,0,0,0.03) !important;
                border-top-color: rgba(0,0,0,0.08) !important;
                color: #666 !important;
            }
            #${f.POWERED_BY}:hover {
                background: rgba(0,0,0,0.06) !important;
            }
        `:`
            #${f.POWERED_BY} {
                background: rgba(255,255,255,0.05) !important;
                border-top-color: rgba(255,255,255,0.1) !important;
                color: #ccc !important;
            }
            #${f.POWERED_BY}:hover {
                background: rgba(255,255,255,0.08) !important;
            }
        `;return`
            #${f.DROPDOWN_CONTAINER} {
                position: var(--tl-position, fixed);
                bottom: var(--tl-bottom, 24px);
                right: var(--tl-right, 24px);
                top: var(--tl-top, auto);
                left: var(--tl-left, auto);
                z-index: var(--tl-z-index, 2147483647) !important;
                
                display: flex;
                flex-direction: column;
                align-items: stretch;
                
                background: var(--tl-bg, ${n.bg});
                border: var(--tl-border, ${n.border});
                border-radius: var(--tl-border-radius, 8px);
                box-shadow: var(--tl-box-shadow, ${n.shadow});
                overflow: hidden;
                
                font-family: var(--tl-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
                
                width: var(--tl-width, ${_});
                min-width: var(--tl-min-width, ${_});
                max-width: var(--tl-max-width, ${_});
                
                cursor: move;
                
                direction: ltr !important;
                
                pointer-events: auto !important;
            }
            
            #${f.DROPDOWN_CONTAINER} * {
                pointer-events: auto !important;
            }
            
            @media (max-width: 768px) {             
                #${f.DROPDOWN} {
                    font-size: var(--tl-mobile-font-size, 14px) !important;
                    padding: var(--tl-mobile-padding, 10px 14px 10px 20px) !important;
                }
                
                #${f.DROPDOWN} option {
                    font-size: var(--tl-mobile-option-font-size, 13px) !important;
                    padding: var(--tl-mobile-option-padding, 6px 10px) !important;
                }
                
                #${f.POWERED_BY} {
                    font-size: var(--tl-mobile-powered-font-size, 9px) !important;
                    padding: var(--tl-mobile-powered-padding, 4px 6px) !important;
                }
                
                #${f.DRAG_HANDLE} {
                    width: var(--tl-mobile-drag-handle-size, 14px) !important;
                    height: var(--tl-mobile-drag-handle-size, 14px) !important;
                    font-size: var(--tl-mobile-drag-handle-font-size, 10px) !important;
                }
                
                #${f.RESET_HANDLE} {
                    width: var(--tl-mobile-reset-handle-size, 14px) !important;
                    height: var(--tl-mobile-reset-handle-size, 14px) !important;
                    font-size: var(--tl-mobile-reset-handle-font-size, 14px) !important;
                }
            }
            
            @media (max-width: 480px) {
                #${f.DROPDOWN} {
                    font-size: var(--tl-small-mobile-font-size, 13px) !important;
                    padding: var(--tl-small-mobile-padding, 8px 12px 8px 18px) !important;
                }
                
                #${f.DROPDOWN} option {
                    font-size: var(--tl-small-mobile-option-font-size, 14px) !important;
                    padding: var(--tl-small-mobile-option-padding, 5px 8px) !important;
                }
            }
            
            #${f.DRAG_HANDLE} {
                position: absolute;
                top: 4px;
                left: 4px;
                width: 16px;
                height: 16px;
                cursor: move;
                opacity: 0.6;
                z-index: 10;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                color: var(--tl-color, ${n.color});
                user-select: none;
                -webkit-user-select: none;
                -moz-user-select: none;
            }
            
            #${f.DRAG_HANDLE}:hover {
                opacity: 1;
            }
            
            #${f.RESET_HANDLE} {
                position: absolute;
                top: 1px;
                right: 4px;
                width: 16px;
                height: 16px;
                cursor: pointer;
                opacity: 0.6;
                z-index: 10;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                color: var(--tl-color, ${n.color});
                user-select: none;
                -webkit-user-select: none;
                -moz-user-select: none;
            }
            
            #${f.RESET_HANDLE}:hover {
                opacity: 1;
            }
            
            #${f.DROPDOWN} {
                border: none;
                outline: none;
                appearance: none;
                -webkit-appearance: none;
                -moz-appearance: none;
                
                background: transparent;
                color: var(--tl-color, ${n.color});
                
                font-family: inherit;
                font-size: var(--tl-font-size, 14px);
                font-weight: var(--tl-font-weight, 500);
                line-height: var(--tl-line-height, 1.4);
                
                padding: var(--tl-padding, 12px 16px 12px 24px) !important;
                margin: 0;
                
                cursor: pointer;
                transition: var(--tl-transition, all 0.2s ease);
                
                width: 100%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                
                direction: ltr !important;
                text-align: left !important;
            }
            
            #${f.DROPDOWN} option {
                direction: ltr !important;
                text-align: left !important;
            }
            
            ${r}
            
            #${f.POWERED_BY} {
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
            }
            
            #${f.POWERED_BY}:hover {
                background: var(--tl-powered-bg-hover, rgba(0,0,0,0.08)) !important;
            }
            
            ${a}
        `}getBaseColors(t){return t==="light"?{bg:"#ffffff",bgHover:"#f5f5f5",color:"#333333",border:"1px solid #e0e0e0",shadow:"0 2px 8px rgba(0,0,0,0.1)",optionBg:"#ffffff",optionColor:"#333333"}:{bg:"#333333",bgHover:"#555555",color:"#ffffff",border:"none",shadow:"0 2px 8px rgba(0,0,0,0.3)",optionBg:"#333333",optionColor:"#ffffff"}}capitalizeLabel(t){const n=b.escapeHtml(t).split("("),r=n[0].trim().split(" ").map(i=>i.charAt(0).toUpperCase()+i.slice(1).toLowerCase()).join(" ");if(n.length===1)return r;const a=n[1].replace(")","").trim().split(" ").map(i=>i.charAt(0).toUpperCase()+i.slice(1).toLowerCase()).join(" ");return`${r} (${a})`}applyStoredPosition(){if(!this.container)return;const t=C.loadDropdownPosition();t?(this.container.style.left=t.x+"px",this.container.style.top=t.y+"px",this.container.style.right="auto",this.container.style.bottom="auto",this.isCustomPosition=!0):this.isCustomPosition=!1}createDragHandle(){if(!this.container)return;const t=document.createElement("div");t.id=f.DRAG_HANDLE,t.setAttribute("data-no-translate","true"),t.innerHTML="⋮⋮",t.title="Drag to move",this.container.appendChild(t),this.container.addEventListener("mousedown",this.handleMouseDown.bind(this))}createResetHandle(){if(!this.container)return;const t=document.createElement("div");t.id=f.RESET_HANDLE,t.setAttribute("data-no-translate","true"),t.innerHTML="⟲",t.title="Reset language selector position",this.container.appendChild(t),t.addEventListener("click",this.handleResetPosition.bind(this)),t.addEventListener("touchstart",e=>{e.preventDefault(),e.stopPropagation(),this.handleResetPosition()})}handleResetPosition(){this.container&&(localStorage.removeItem(L.DROPDOWN_POSITION),this.container.style.left="auto",this.container.style.top="auto",this.container.style.right="24px",this.container.style.bottom="24px",this.isCustomPosition=!1)}createContainer(){this.container=document.createElement("div"),this.container.id=f.DROPDOWN_CONTAINER,this.container.setAttribute("data-no-translate","true"),this.container.style.position="fixed",this.applyStoredPosition(),this.createDragHandle(),this.createResetHandle(),this.createSelectElement(),this.container.appendChild(this.selectElement),this.populateSelect(this.selectElement),this.createPoweredByLink(),document.body.appendChild(this.container),this.options.isTranslating&&(this.selectElement&&(this.selectElement.disabled=!0),this.container.setAttribute("title","Translation is in progress")),this.container.addEventListener("touchstart",this.handleTouchStart.bind(this),{passive:!1}),document.addEventListener("touchmove",this.handleTouchMove.bind(this),{passive:!1}),document.addEventListener("touchend",this.handleTouchEnd.bind(this)),window.addEventListener("resize",this.handleWindowResize.bind(this)),setTimeout(()=>{this.ensureDropdownInViewport()},0)}createSelectElement(){this.container&&(this.selectElement=document.createElement("select"),this.selectElement.id=f.DROPDOWN,this.selectElement.setAttribute("data-no-translate","true"),this.selectElement.onchange=()=>{var e,n;if(!this.selectElement)return;const t=this.selectElement.value;(n=(e=this.options).onLanguageChange)==null||n.call(e,t)})}populateSelect(t){const{config:e,currentLang:n,translatedDropdownLabels:r={}}=this.options;t.innerHTML="";const a=e.defaultLang,i=new Set([...e.targetLanguages,a].filter(Boolean)),o=Array.from(i).filter(u=>e.languageLabels[u]),s=[];a&&e.languageLabels[a]&&s.push(a),o.forEach(u=>{u!==a&&s.push(u)}),s.forEach(u=>{const p=document.createElement("option");p.value=u;const T=r[u]||e.languageLabels[u],d=this.capitalizeLabel(T);p.textContent=d,p.setAttribute("data-no-translate","true"),u===n&&(p.selected=!0),t.appendChild(p)});const h=r[n]||e.languageLabels[n],c=this.capitalizeLabel(h);t.title=c}createPoweredByLink(){if(!this.container)return;const t=document.createElement("a");t.id=f.POWERED_BY,t.href="https://camb.ai",t.target="_blank",t.rel="noopener noreferrer",t.setAttribute("data-no-translate","true");const e=document.createElement("span");e.textContent="Powered by CAMB.AI",e.setAttribute("data-no-translate","true"),t.appendChild(e),this.container.appendChild(t)}handleMouseDown(t){if(!this.container||t.target.closest("select, option, a")!==null)return;this.isDragging=!0,this.isCustomPosition=!0;const r=this.container.getBoundingClientRect();this.dragOffsetX=t.clientX-r.left,this.dragOffsetY=t.clientY-r.top,document.addEventListener("mousemove",this.handleMouseMove.bind(this)),document.addEventListener("mouseup",this.handleMouseUp.bind(this)),t.preventDefault()}handleMouseMove(t){if(!this.isDragging||!this.container)return;const e=t.clientX-this.dragOffsetX,n=t.clientY-this.dragOffsetY,r=this.constrainToViewport(e,n);this.container.style.left=r.x+"px",this.container.style.top=r.y+"px",this.container.style.right="auto",this.container.style.bottom="auto",this.isCustomPosition=!0}handleMouseUp(){if(this.isDragging=!1,document.removeEventListener("mousemove",this.handleMouseMove.bind(this)),document.removeEventListener("mouseup",this.handleMouseUp.bind(this)),this.container){const t=this.container.getBoundingClientRect();C.saveDropdownPosition({x:t.left,y:t.top})}}handleTouchStart(t){if(!this.container)return;const e=t.target;if(e.id===f.RESET_HANDLE||e.closest("select, option, a")!==null)return;this.isDragging=!0,this.isCustomPosition=!0;const r=t.touches[0],a=this.container.getBoundingClientRect();this.dragOffsetX=r.clientX-a.left,this.dragOffsetY=r.clientY-a.top,t.preventDefault()}handleTouchMove(t){if(!this.isDragging||!this.container||t.touches.length!==1)return;const e=t.touches[0],n=e.clientX-this.dragOffsetX,r=e.clientY-this.dragOffsetY,a=this.constrainToViewport(n,r);this.container.style.left=a.x+"px",this.container.style.top=a.y+"px",this.container.style.right="auto",this.container.style.bottom="auto",this.isCustomPosition=!0,t.preventDefault()}handleTouchEnd(){if(this.isDragging=!1,this.container){const t=this.container.getBoundingClientRect();C.saveDropdownPosition({x:t.left,y:t.top})}}}const w=new WeakSet,A=new WeakSet;class Z{constructor(t,e,n){this.onUrlChange=t,this.onContentChange=e,this.configManager=n,this.observer=null,this.currentUrl=""}start(){this.stop(),this.currentUrl=b.getCurrentPath(),this.observer=new MutationObserver(t=>{if(window.__isTranslatingDOM)return;const e=b.getCurrentPath();if(e!==this.currentUrl){this.currentUrl=e,this.onUrlChange(e);return}this.processMutations(t)}),this.observer.observe(document.body,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:[...I]})}stop(){var t;(t=this.observer)==null||t.disconnect(),this.observer=null}processMutations(t){for(const e of t)if(e.type==="childList"){if(e.addedNodes.length>0&&e.removedNodes.length===1){const n=e.removedNodes[0];n.nodeType===1&&n.hasAttribute(l.SOURCE_TEXT)&&e.addedNodes.forEach(r=>{if(r.nodeType===1){const a=r;if(!a.hasAttribute(l.SOURCE_TEXT)){a.setAttribute(l.SOURCE_TEXT,n.getAttribute(l.SOURCE_TEXT));const i=n.getAttribute(l.TRANSLATED_TO);i&&a.setAttribute(l.TRANSLATED_TO,i);for(let o=0;o<n.attributes.length;o++){const s=n.attributes[o];s.name.startsWith(l.SOURCE_ATTRIBUTE_PREFIX)&&(a.hasAttribute(s.name)||a.setAttribute(s.name,s.value))}}}})}e.addedNodes.forEach(n=>{this.isTranslatableElement(n)&&!w.has(n)&&!A.has(n)&&this.onContentChange(n)})}else if(e.type==="characterData"){const n=e.target.parentElement;n&&this.isTranslatableElement(n)&&!w.has(n)&&!A.has(n)&&this.onContentChange(n)}else if(e.type==="attributes"){const n=e.target;n&&this.isTranslatableElement(n)&&!w.has(n)&&!A.has(n)&&this.onContentChange(n)}}isTranslatableElement(t){if(t.nodeType!==1)return!1;const e=t,n=e.getAttribute(l.TRANSLATION_STATE);if(n==="translating"||n==="translated"||e.matches(X.join(", "))||b.shouldPreventTranslation(e)||b.isNonContentElement(e))return!1;const r=this.configManager.getCurrentLanguage();return e.getAttribute(l.TRANSLATED_TO)===r&&e.removeAttribute(l.TRANSLATED_TO),!0}}class S{static extractFromElement(t,e){return this.extractWithLanguageFilter(t,e)}static extractFreshContentForLanguage(t,e,n){return this.extractWithLanguageFilter(t,n,e)}static extractWithLanguageFilter(t,e,n){const r=[],a=new Map,i=[],o=new Map;let s=0,h=0;const c=document.createTreeWalker(t===document?document.body:t,NodeFilter.SHOW_TEXT,{acceptNode:d=>{var y;const E=(y=d.textContent)==null?void 0:y.trim(),v=d.parentNode;return!E||E.length===0||b.shouldPreventTranslation(v)||v&&b.isNonContentElement(v)||n&&v&&v.getAttribute(l.TRANSLATED_TO)===n||e&&e(E)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}});let u;for(;u=c.nextNode();){const d=u.parentElement;d&&d.hasAttribute(l.SOURCE_TEXT)?r.push(d.getAttribute(l.SOURCE_TEXT)):r.push(u.textContent),a.set(s,u),s++}const p=I.map(d=>`[${d}]`).join(",");return Array.from((t===document?document.body:t).querySelectorAll(p)).forEach(d=>{b.shouldPreventTranslation(d)||b.isNonContentElement(d)||n&&d.getAttribute(l.TRANSLATED_TO)===n||I.forEach(E=>{const v=d.getAttribute(E);if(v&&v.trim()){const y=`${l.SOURCE_ATTRIBUTE_PREFIX}${E}`;d.hasAttribute(y)?i.push(d.getAttribute(y)):i.push(v),o.set(h,{element:d,attribute:E}),h++}})}),{textNodes:r,nodeMap:a,attributeTexts:i,attributeMap:o}}static isJsonString(t){try{return JSON.parse(t),!0}catch{return!1}}static isUnwantedContent(t){return[/^\{.*\}$/,/^\[.*\]$/,/^<.*>$/,/^[0-9a-f]{8,}$/i,/^[a-zA-Z0-9+/]{20,}={0,2}$/,/^[^\w\s]+$/].some(n=>n.test(t))}}class tt{constructor(t,e=70,n=4){this.sendFn=t,this.delay=e,this.concurrencyLimit=n,this.pending=new Set,this.requestQueue=[],this.activeRequests=0}enqueue(t){w.has(t)||A.has(t)||(this.pending.add(t),this.timerId&&clearTimeout(this.timerId),this.timerId=window.setTimeout(()=>this.flush(),this.delay))}flush(){if(this.pending.size===0)return;const t=Array.from(this.pending);this.pending.clear(),this.timerId=void 0;const e=et(t);e.texts.length===0&&e.attributeTexts.length===0||(this.requestQueue.push(e),this.processQueue())}processQueue(){if(this.activeRequests>=this.concurrencyLimit||this.requestQueue.length===0)return;this.activeRequests++;const t=this.requestQueue.shift();t.textMap.forEach(e=>w.add(e)),t.attributeMap.forEach(({element:e})=>w.add(e)),this.sendFn(t).catch(e=>{console.error("DebouncedSender sendFn error:",e),t.textMap.forEach(n=>w.delete(n)),t.attributeMap.forEach(({element:n})=>w.delete(n))}).finally(()=>{this.activeRequests--,this.processQueue()})}}function et(g){const t=[],e=new Map,n=[],r=new Map;let a=0,i=0;return g.forEach(o=>{const{textNodes:s,nodeMap:h,attributeTexts:c,attributeMap:u}=S.extractFreshContentForLanguage(o,document.documentElement.lang,p=>S.isJsonString(p)||S.isUnwantedContent(p));s.forEach((p,T)=>{const d=h.get(T);d&&(w.has(d)||A.has(d)||(t.push(p),e.set(a++,d)))}),c.forEach((p,T)=>{const d=u.get(T);d&&(w.has(d.element)||A.has(d.element)||(n.push(p),r.set(i++,d)))})}),{texts:t,textMap:e,attributeTexts:n,attributeMap:r}}class nt{constructor(){this.handler=null,this.debounceTimer=null,this.isListening=!1,this.originalPushState=null,this.originalReplaceState=null,this.onRouteChange=()=>{this.clearDebounce(),this.debounceTimer=window.setTimeout(()=>{if(this.handler){const t=window.location.pathname+window.location.search;this.handler(t)}},P.SPA_NAVIGATION_DEBOUNCE)}}setHandler(t){this.handler=t}start(){this.isListening||(this.isListening=!0,this.hookHistoryAPI(),this.addPopstateListener())}stop(){this.isListening&&(this.isListening=!1,this.unhookHistoryAPI(),this.removePopstateListener(),this.clearDebounce())}hookHistoryAPI(){this.originalPushState=history.pushState.bind(history),this.originalReplaceState=history.replaceState.bind(history),history.pushState=(...t)=>{const e=this.originalPushState.apply(history,t);return this.onRouteChange(),e},history.replaceState=(...t)=>{const e=this.originalReplaceState.apply(history,t);return this.onRouteChange(),e}}unhookHistoryAPI(){this.originalPushState&&(history.pushState=this.originalPushState,this.originalPushState=null),this.originalReplaceState&&(history.replaceState=this.originalReplaceState,this.originalReplaceState=null)}addPopstateListener(){window.addEventListener("popstate",this.onRouteChange)}removePopstateListener(){window.removeEventListener("popstate",this.onRouteChange)}clearDebounce(){this.debounceTimer&&(clearTimeout(this.debounceTimer),this.debounceTimer=null)}}class F{static collectPageContext(){var a,i;const t={},e=(a=document.title)==null?void 0:a.trim();e&&e.length>0&&(t.title=e);const n=document.querySelector('meta[name="description"]'),r=(i=n==null?void 0:n.content)==null?void 0:i.trim();return r&&r.length>0&&(t.description=r),t.url=window.location.pathname+window.location.search,t}}class W{static collectMetadata(){var a,i;const t=[],e=(a=document.title)==null?void 0:a.trim();e&&t.push(["title",e]);const n=document.querySelector('meta[name="description"]'),r=(i=n==null?void 0:n.content)==null?void 0:i.trim();return r&&t.push(["description",r]),t}static applyMetadata(t){const e=document.documentElement;t.forEach(([n,r])=>{if(n==="title")document.title=r,e.setAttribute(l.TRANSLATED_TO,document.documentElement.lang);else if(n==="description"){const a=document.querySelector('meta[name="description"]');a&&(a.content=r,e.setAttribute(l.TRANSLATED_TO,document.documentElement.lang))}})}}class R{static apply(t){var s;if(t.nodeType!==Node.TEXT_NODE||!((s=t.textContent)!=null&&s.trim()))return null;const e=t.parentElement;if(!e||b.isNonContentElement(e)||b.shouldPreventTranslation(e))return null;const n=document.createElement("span");n.className="tl-skeleton";const r=this.findInheritedBackgroundColor(e),a=this.rgbToHex(r),i=this.adjustColorBrightness(a,-5),o=this.adjustColorBrightness(a,10);return n.style.setProperty("--skeleton-bg-color",i),n.style.setProperty("--skeleton-highlight-color",o),t.parentNode&&(t.parentNode.insertBefore(n,t),n.appendChild(t)),n}static remove(t){if(!t||!t.parentNode)return;const e=t.firstChild;e&&t.parentNode.insertBefore(e,t),t.remove()}static findInheritedBackgroundColor(t){let e=t;for(;e;){const n=window.getComputedStyle(e).backgroundColor;if(n&&n!=="rgba(0, 0, 0, 0)"&&n!=="transparent")return n;if(e===document.body)break;e=e.parentElement}return window.getComputedStyle(document.documentElement).backgroundColor||"#65737e"}static rgbToHex(t){const e=t.match(/\d+/g);return e?"#"+e.slice(0,3).map(n=>("0"+parseInt(n).toString(16)).slice(-2)).join(""):"#e0e0e0"}static adjustColorBrightness(t,e){const n=parseInt(t.replace("#",""),16),r=Math.round(2.55*e),a=(n>>16)+r,i=(n>>8&255)+r,o=(n&255)+r;return"#"+(16777216+(this.clamp(a,0,255)<<16)+(this.clamp(i,0,255)<<8)+this.clamp(o,0,255)).toString(16).slice(1)}static clamp(t,e,n){return Math.min(Math.max(t,e),n)}}const rt={version:"1.0.1",buildTime:new Date().toISOString(),environment:"staging"};typeof window<"u"&&(window.__TRANSLATOR_BUILD_INFO=rt);class at{constructor(t,e){this.observer=null,this.currentAbortController=null,this.languageDropdown=null,this.translatedLabels=void 0,this.isTranslating=!1,this.originalTitle=null,this.originalDescription=null,this.apiService=t,this.configManager=e,this.sender=new tt(n=>this.translateBatch(n),P.DYNAMIC_TRANSLATION_DEBOUNCE),this.navigationService=new nt,this.navigationService.setHandler(()=>this.handleUrlChange())}setTranslating(t){this.isTranslating=t,this.updateLanguageDropdown(this.translatedLabels)}updateLanguageDropdown(t){const e=this.configManager.getTranslationConfig();if(!e){console.error("❌ Cannot update dropdown: No configuration available");return}const n={config:e,currentLang:this.configManager.getCurrentLanguage(),theme:x.theme,translatedDropdownLabels:t,isTranslating:this.isTranslating,disabled:this.isTranslating};this.languageDropdown?this.languageDropdown.update(n):(this.languageDropdown=new Q({...n,onLanguageChange:r=>this.switchLanguage(r)}),this.languageDropdown.create())}abortCurrentTranslation(){this.currentAbortController&&(this.currentAbortController.abort(),this.currentAbortController=null)}async restoreToSourceLanguage(){var e;(e=this.observer)==null||e.stop(),document.querySelectorAll(`[${l.SOURCE_TEXT}]`).forEach(n=>{const r=n.getAttribute(l.SOURCE_TEXT),i=Array.from(n.childNodes).find(o=>o.nodeType===Node.TEXT_NODE);r&&i&&(i.textContent=r),n.removeAttribute(l.TRANSLATED_TO),n.removeAttribute(l.TRANSLATION_STATE)}),document.querySelectorAll(`[${l.TRANSLATED_TO}]`).forEach(n=>{const r=[];for(let a=0;a<n.attributes.length;a++){const i=n.attributes[a];if(i.name.startsWith(l.SOURCE_ATTRIBUTE_PREFIX)){const o=i.name.substring(l.SOURCE_ATTRIBUTE_PREFIX.length);n.setAttribute(o,i.value),r.push(i.name)}}r.forEach(a=>n.removeAttribute(a)),n.removeAttribute(l.TRANSLATED_TO),n.removeAttribute(l.TRANSLATION_STATE)}),document.querySelectorAll(`[${l.TRANSLATION_STATE}]`).forEach(n=>{n.removeAttribute(l.TRANSLATION_STATE)}),this.originalTitle&&(document.title=this.originalTitle);const t=document.querySelector('meta[name="description"]');t&&this.originalDescription&&(t.content=this.originalDescription),this.translatedLabels=void 0}applyTranslatedTextNodes(t,e,n){t.forEach((a,i)=>{var u,p;const o=e.get(i);if(!o||!o.parentElement)return;const s=o.parentElement,h=s.getAttribute(l.SOURCE_TEXT)||"";if(s.hasAttribute(l.SOURCE_TEXT)||s.setAttribute(l.SOURCE_TEXT,o.textContent||""),s.setAttribute(l.TRANSLATION_STATE,"translated"),s.setAttribute(l.TRANSLATED_TO,n),(s.getAttribute(l.SOURCE_TEXT)||"").trim()!==a.trim()){const T=((u=h.match(/^\s+/))==null?void 0:u[0])||"",d=((p=h.match(/\s+$/))==null?void 0:p[0])||"";o.textContent=`${T}${a}${d}`}});const r=this.configManager.getTranslationConfig();r&&b.updateCanonicalUrl(n,r.defaultLang)}async translatePage(t){this.abortCurrentTranslation(),this.setTranslating(!0);const e=this.configManager.getTranslationConfig();if(!e){console.error("❌ No config available for translation"),this.setTranslating(!1);return}if(t===e.defaultLang)return this.setTranslating(!1),this.restoreToSourceLanguage();const{textNodes:n,nodeMap:r,attributeTexts:a,attributeMap:i}=S.extractFreshContentForLanguage(document,t,T=>S.isJsonString(T)||S.isUnwantedContent(T));let o=[],s=[];if(e){const T=new Set([...e.targetLanguages,e.defaultLang]);s=Array.from(T).filter(d=>e.languageLabels[d]),o=s.map(d=>e.languageLabels[d])}this.originalTitle||(this.originalTitle=document.title);const h=document.querySelector('meta[name="description"]');h&&!this.originalDescription&&(this.originalDescription=h.content);const c=W.collectMetadata(),u=c.map(([,T])=>T);if(n.length===0&&u.length===0&&a.length===0){this.setTranslating(!1);return}const p=new Map;r.forEach((T,d)=>{const E=T.parentElement;if(E&&!E.hasAttribute(l.SOURCE_TEXT)){const v=T.textContent||"";E.setAttribute(l.SOURCE_TEXT,v)}}),r.forEach((T,d)=>{const E=R.apply(T);E&&p.set(d,E)});try{const T=this.configManager.getTranslationConfig(),d=this.configManager.getApiConfig();if(!T||!d){console.error("❌ No config available for translation"),this.setTranslating(!1);return}const E={targetLanguage:t,sourceLanguage:T.defaultLang,websiteId:T.websiteId};this.currentAbortController=new AbortController;const v=F.collectPageContext(),y=[...n,...a,...u],k=await this.apiService.translateTextBased({textNodes:y,translateConfig:E,apiConfig:d,dropdownLabels:o,pageContext:v,abortSignal:this.currentAbortController.signal});p.forEach(O=>{R.remove(O)});const U=k.translatedTextNodes||[],H=k.translatedDropdownLabels||[],it=U.slice(0,n.length),ot=U.slice(n.length,n.length+a.length),st=U.slice(n.length+a.length);this.applyTranslatedTextNodes(it,r,t),this.applyTranslatedAttributes(ot,i,t);const lt=c.map(([O],N)=>[O,st[N]||""]);W.applyMetadata(lt),document.documentElement.lang=t;const $={};s.forEach((O,N)=>{H[N]&&($[O]=H[N])}),this.translatedLabels=$,this.updateLanguageDropdown($),this.setTranslating(!1)}catch(T){if(p.forEach(d=>{R.remove(d)}),D.isAbortError(T)){this.setTranslating(!1);return}throw console.error("❌ Text translation failed:",T),this.setTranslating(!1),T}finally{this.currentAbortController=null}}applyTranslatedAttributes(t,e,n){t.forEach((r,a)=>{const i=e.get(a);if(!i)return;const{element:o,attribute:s}=i,h=`${l.SOURCE_ATTRIBUTE_PREFIX}${s}`,c=o.getAttribute(s)||"";o.hasAttribute(h)||o.setAttribute(h,c),o.setAttribute(l.TRANSLATION_STATE,"translated"),o.setAttribute(l.TRANSLATED_TO,n),c.trim()!==r.trim()&&o.setAttribute(s,r)})}async translateBatch(t){const{texts:e,textMap:n,attributeTexts:r,attributeMap:a}=t;if(e.length===0&&r.length===0)return;n.forEach((c,u)=>{const p=c.parentElement;p&&!p.hasAttribute(l.SOURCE_TEXT)&&p.setAttribute(l.SOURCE_TEXT,e[u])}),a.forEach(({element:c,attribute:u},p)=>{const T=`${l.SOURCE_ATTRIBUTE_PREFIX}${u}`;c.hasAttribute(T)||c.setAttribute(T,r[p])}),n.forEach(c=>{var u;(u=c.parentElement)==null||u.setAttribute(l.TRANSLATION_STATE,"translating")}),a.forEach(({element:c})=>{c.setAttribute(l.TRANSLATION_STATE,"translating")});const i=this.configManager.getApiConfig(),o=this.configManager.getTranslationConfig();if(!i||!o)return;if(this.configManager.isInDefaultLanguage()){n.forEach(c=>{w.delete(c),A.add(c)}),a.forEach(({element:c})=>{w.delete(c),A.add(c)});return}const s=new Map;n.forEach((c,u)=>{const p=R.apply(c);p&&s.set(u,p)});const h={targetLanguage:this.configManager.getCurrentLanguage(),sourceLanguage:o.defaultLang,websiteId:o.websiteId};try{const c=[...e,...r],p=(await this.apiService.translateTextBased({textNodes:c,translateConfig:h,apiConfig:i,dropdownLabels:[],pageContext:F.collectPageContext()})).translatedTextNodes||[],T=p.slice(0,e.length),d=p.slice(e.length);s.forEach(E=>{R.remove(E)}),this.applyTranslatedTextNodes(T,n,h.targetLanguage),this.applyTranslatedAttributes(d,a,h.targetLanguage),n.forEach(E=>{w.delete(E),A.add(E)}),a.forEach(({element:E})=>{w.delete(E),A.add(E)})}catch(c){console.error("❌ translateBatch failed:",c),n.forEach(u=>{var p;(p=u.parentElement)==null||p.removeAttribute(l.TRANSLATION_STATE)}),a.forEach(({element:u})=>{u.removeAttribute(l.TRANSLATION_STATE)}),s.forEach(u=>R.remove(u))}}async switchLanguage(t){var n;if(t===this.configManager.getCurrentLanguage())return;const e=this.configManager.getTranslationConfig();if(!e){console.error("❌ No configuration available");return}if(t===e.defaultLang){await this.restoreToSourceLanguage(),this.configManager.setCurrentLanguage(t),M(t),this.updateLanguageDropdown(),this.startObserver();return}try{this.abortCurrentTranslation(),(n=this.observer)==null||n.stop(),await this.restoreToSourceLanguage(),await this.translatePage(t),this.configManager.setCurrentLanguage(t),M(t),this.updateLanguageDropdown(this.translatedLabels),this.startObserver()}catch(r){console.error("❌ Switch language failed:",r),r instanceof Error&&(r.message==="NETWORK_ERROR"?m.showErrorMessage("network","Failed to switch language. Please check your connection."):r.message==="RATE_LIMIT"?m.showErrorMessage("rate-limit","Too many requests. Please try again later."):m.showErrorMessage("server","Failed to switch language. Please try again.")),this.updateLanguageDropdown(),this.startObserver()}}clearMetadataSourceAttributes(){this.originalTitle=null,this.originalDescription=null}clearTranslationAttributes(){document.querySelectorAll(`[${l.TRANSLATED_TO}]`).forEach(t=>{t.removeAttribute(l.TRANSLATED_TO)}),document.querySelectorAll(`[${l.TRANSLATION_STATE}]`).forEach(t=>{t.removeAttribute(l.TRANSLATION_STATE)})}async waitForInitialContent(){await B(document.body)}async initialize(){if(!x.apiKey){console.error("❌ No API key provided"),m.showErrorMessage("auth","Translation service not configured. Missing API key.");return}if(!x.domain){console.error("❌ No domain provided"),m.showErrorMessage("config-invalid","Translation service not configured. Missing domain.");return}if(b.detectCSPViolations(),await this.waitForDOMReady(),await this.waitForInitialContent(),!await this.configManager.initializeConfig()){console.error("Initialization failed: No config available");return}const e=document.createElement("style");if(e.textContent=`
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
        `,document.head.appendChild(e),this.updateLanguageDropdown(),this.startObserver(),!this.configManager.isInDefaultLanguage()){const n=this.configManager.getCurrentLanguage(),r=this.configManager.getTranslationConfig();n===(r==null?void 0:r.defaultLang)?await this.restoreToSourceLanguage():await this.translatePage(n)}M(this.configManager.getCurrentLanguage()),this.navigationService.start(),window.addEventListener("offline",()=>{m.showErrorMessage("offline","You are now offline. Using cached translations where available.")}),window.addEventListener("online",()=>{m.clearError()}),window.addEventListener("beforeunload",()=>{this.abortCurrentTranslation(),this.navigationService.stop()})}async waitForDOMReady(){document.readyState==="loading"&&await new Promise(t=>{document.addEventListener("DOMContentLoaded",t)})}async handleUrlChange(){if(this.abortCurrentTranslation(),this.clearTranslationAttributes(),this.clearMetadataSourceAttributes(),await B(document.body),!this.configManager.isInDefaultLanguage())try{await this.translatePage(this.configManager.getCurrentLanguage())}catch(t){console.error("❌ Translation failed during URL change:",t)}}enqueue(t){this.sender.enqueue(t)}startObserver(){this.configManager.getTranslationConfig()&&(this.observer=new Z(()=>{},e=>this.enqueue(e),this.configManager),this.observer.start())}}const x=(()=>{const g=document.currentScript,t=(g==null?void 0:g.dataset.domain)||window.location.host,e=b.normalizeDomain(t),n="wt_8c29cf86f8b04d17_Ou5m5LI2GIiY0FzXUTp4KQ",r=(g==null?void 0:g.dataset.theme)||"dark";return{apiKey:n,domain:e,theme:r}})();(async()=>{if(window.__translateDone)throw"already injected";window.__translateDone=!0;const g=new D,t=new K(g,x);await new at(g,t).initialize()})()})();