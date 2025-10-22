(function () {
  "use strict";
  const DROPDOWN_WIDTH = "200px";
  const API_ENDPOINTS = {
    CONFIG: "/translate/config",
    TEXT_BASED: "/translate/text-based",
  };
  const SELECTORS = {
    ERROR_MESSAGE: "tl-error-message",
    DROPDOWN_CONTAINER: "tl-dropdown-container",
    DROPDOWN_STYLE: "tl-dropdown-style",
    DROPDOWN: "tl-dropdown",
    DRAG_HANDLE: "tl-drag-handle",
    RESET_HANDLE: "tl-reset-handle",
    POWERED_BY: "tl-powered-by",
  };
  const ATTRIBUTES = {
    TRANSLATED_TO: "data-tl-to",
    SOURCE_TEXT: "data-tl-src",
    SOURCE_ATTRIBUTE_PREFIX: "data-tl-src-",
    TRANSLATION_STATE: "data-tl-state",
  };
  const TRANSLATABLE_ATTRIBUTES = [
    "title",
    "alt",
    "placeholder",
    "value",
    "aria-label",
    "aria-description",
    "data-tooltip",
    "data-tip",
    "data-original-title",
    "data-hover",
    "data-after-content",
  ];
  const TIMINGS = {
    ERROR_MESSAGE_DURATION: 5e3,
    SPA_NAVIGATION_DEBOUNCE: 150,
    DYNAMIC_TRANSLATION_DEBOUNCE: 100,
    // ms
  };
  const LOCAL_STORAGE_KEYS = {
    DROPDOWN_POSITION: "tl-dropdown-position",
    SELECTED_LANGUAGE: "tl-selected-language",
    SOURCE_CACHE: "tl-source-cache",
  };
  const DROPDOWN_EXCLUDED_SELECTORS = [
    "[data-no-translate]",
    '[data-translated="true"]',
    ".notranslate",
    '[translate="no"]',
    "script",
    "style",
    "noscript",
  ];
  const EXCLUDED_RTL_SELECTORS = [
    "[data-no-rtl]",
    '[data-rtl="false"]',
    ".noRtl",
    ".no-rtl",
  ];
  const HARD_CODED_RTL = /* @__PURE__ */ new Set([
    "ar",
    // Arabic
    "he",
    // Hebrew
    "fa",
    // Persian
    "ur",
    // Urdu
    "ps",
    // Pashto
    "sd",
    // Sindhi
    "ug",
    // Uyghur
    "yi",
    // Yiddish
  ]);
  function isRtl(lang) {
    const base = lang.split("-")[0].toLowerCase();
    if (HARD_CODED_RTL.has(base)) return true;
    try {
      const script = new Intl.Locale(lang).maximize().script;
      return script === "Arab" || script === "Hebr";
    } catch {
      return false;
    }
  }
  function applyDirection(lang) {
    const direction = isRtl(lang) ? "rtl" : "ltr";
    document.documentElement.dir = direction;
    document.documentElement.lang = lang;
    const styleElementId = "translator-rtl-overrides";
    if (!document.getElementById(styleElementId)) {
      const style = document.createElement("style");
      style.id = styleElementId;
      style.type = "text/css";
      const selectorList = Array.from(EXCLUDED_RTL_SELECTORS).join(", ");
      style.textContent = `${selectorList} { direction: ltr !important; unicode-bidi: isolate !important; }`;
      document.head.appendChild(style);
    }
  }
  class ErrorHandler {
    static showErrorMessage(type, details, retryCallback) {
      const existing = document.getElementById(SELECTORS.ERROR_MESSAGE);
      if (existing) existing.remove();
      const errorDiv = document.createElement("div");
      errorDiv.id = SELECTORS.ERROR_MESSAGE;
      errorDiv.setAttribute("data-no-translate", "true");
      const errorDetail = this.getErrorDetail(type, details);
      console.error(
        `Translation Error [${type}]:`,
        errorDetail.message,
        details
      );
      const errorContent = document.createElement("div");
      errorContent.style.cssText =
        "display: flex; flex-direction: column; gap: 8px;";
      const messageDiv = document.createElement("div");
      messageDiv.textContent = errorDetail.message;
      errorContent.appendChild(messageDiv);
      if (errorDetail.retryable && retryCallback) {
        const retryButton = document.createElement("button");
        retryButton.textContent = "Retry";
        retryButton.style.cssText = `
                background: white; color: #dc2626; border: none;
                padding: 4px 12px; border-radius: 4px; cursor: pointer;
                font-size: 12px; font-weight: 500; margin-top: 4px;
            `;
        retryButton.onclick = () => {
          errorDiv.remove();
          retryCallback();
        };
        errorContent.appendChild(retryButton);
      }
      errorDiv.style.cssText = `
            position: fixed; bottom: 24px; right: 24px; z-index: 9999;
            background: #dc2626; color: white; padding: 12px 16px;
            border-radius: 8px; font: 14px/1.4 sans-serif;
            max-width: 320px; box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        `;
      errorDiv.appendChild(errorContent);
      document.body.appendChild(errorDiv);
      const duration =
        errorDetail.showDuration || TIMINGS.ERROR_MESSAGE_DURATION;
      setTimeout(() => {
        if (errorDiv.parentNode) {
          errorDiv.remove();
        }
      }, duration);
    }
    static getErrorDetail(type, customMessage) {
      const errorMap = {
        auth: {
          type: "auth",
          message:
            customMessage ||
            "🔒 Authentication failed. Please check your API key.",
          retryable: false,
          showDuration: 8e3,
        },
        server: {
          type: "server",
          message:
            customMessage ||
            "⚠️ Translation service temporarily unavailable. Please try again later.",
          retryable: true,
          showDuration: 8e3,
        },
        network: {
          type: "network",
          message:
            customMessage ||
            "🌐 Connection failed. Please check your internet connection.",
          retryable: true,
          showDuration: 8e3,
        },
        "rate-limit": {
          type: "rate-limit",
          message:
            customMessage || "⏳ Too many requests. Please try again later.",
          fallback: "Using cached translations where available.",
          retryable: true,
          showDuration: 1e4,
        },
        "unsupported-language": {
          type: "unsupported-language",
          message:
            customMessage ||
            "🌍 Language not supported. Using default language.",
          retryable: false,
          showDuration: 6e3,
        },
        "invalid-url": {
          type: "invalid-url",
          message:
            customMessage ||
            "❌ Invalid URL format. Please check the URL and try again.",
          retryable: false,
          showDuration: 8e3,
        },
        "cache-unavailable": {
          type: "cache-unavailable",
          message:
            customMessage ||
            "💾 Cache unavailable. Using direct translation service.",
          fallback: "Translations may be slower than usual.",
          retryable: false,
          showDuration: 6e3,
        },
        "config-invalid": {
          type: "config-invalid",
          message:
            customMessage ||
            "⚙️ Invalid configuration. Please contact support.",
          retryable: false,
          showDuration: 1e4,
        },
        offline: {
          type: "offline",
          message:
            customMessage ||
            "📡 You are offline. Using cached translations where available.",
          fallback: "New translations unavailable until connection restored.",
          retryable: true,
          showDuration: 6e3,
        },
      };
      return errorMap[type] || errorMap["server"];
    }
    static clearError() {
      const existing = document.getElementById(SELECTORS.ERROR_MESSAGE);
      if (existing) existing.remove();
    }
    static isOffline() {
      return !navigator.onLine;
    }
  }
  function snakeToCamelString(str) {
    return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
  }
  function camelToSnakeString(str) {
    return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
  }
  function snakeToCamelObject(obj) {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        snakeToCamelString(key),
        value,
      ])
    );
  }
  function camelToSnakeObject(obj) {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        camelToSnakeString(key),
        value,
      ])
    );
  }
  class ApiService {
    constructor(apiConfig, onCriticalError) {
      this.maxRetries = 3;
      this.apiUrl =
        (apiConfig == null ? void 0 : apiConfig.apiUrl) ||
        "https://html-translator-dev-136516919516.europe-west2.run.app";
      this.onCriticalError = onCriticalError;
    }
    getApiUrl() {
      return this.apiUrl;
    }
    setCriticalErrorHandler(handler) {
      this.onCriticalError = handler;
    }
    async checkRedisAvailability({
      textNodes = ["__health__"],
      translateConfig,
      apiConfig,
      pageContext,
      abortSignal,
    }) {
      try {
        const response = await fetch(
          `${this.apiUrl}${API_ENDPOINTS.TEXT_BASED}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${apiConfig.key}`,
              "X-Domain": apiConfig.domain,
            },
            body: JSON.stringify(
              camelToSnakeObject({
                textNodes,
                translateConfig,
                dropdownLabels: [],
                pageContext,
              })
            ),
            signal: abortSignal,
          }
        );
        if (!response.ok) {
          await this.handleTranslationError(response);
          return false;
        }
        const data = await response.json();
        if (data && data.redis_available === false) {
          return false;
        }
        return true;
      } catch (error) {
        if (
          error instanceof Error &&
          (error.message === "REDIS_UNAVAILABLE" ||
            error.message === "RATE_LIMIT")
        ) {
          return false;
        }
        throw error;
      }
    }
    async fetchConfig(apiKey, domain) {
      try {
        if (!apiKey || !domain) {
          ErrorHandler.showErrorMessage(
            "config-invalid",
            "Invalid configuration: Missing API key or domain."
          );
          throw new Error("INVALID_CONFIG");
        }
        try {
          new URL(this.apiUrl);
        } catch {
          ErrorHandler.showErrorMessage(
            "invalid-url",
            "Invalid API URL format."
          );
          throw new Error("INVALID_URL");
        }
        const response = await fetch(`${this.apiUrl}${API_ENDPOINTS.CONFIG}`, {
          method: "GET",
          credentials: "omit",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            Origin: window.location.origin,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          await this.handleConfigError(response);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const config = await response.json();
        const payload = config.payload || config;
        if (!payload.default_language) {
          ErrorHandler.showErrorMessage(
            "config-invalid",
            "Invalid configuration: Missing default language."
          );
          throw new Error("INVALID_CONFIG");
        }
        if (!payload.selected_languages) {
          ErrorHandler.showErrorMessage(
            "config-invalid",
            "Invalid configuration: No target languages specified."
          );
          throw new Error("INVALID_CONFIG");
        }
        return {
          domain,
          defaultLang: payload.default_language,
          languageLabels: payload.language_labels,
          targetLanguages: payload.selected_languages,
          websiteId: payload.website_id,
          teamId: payload.team_id,
        };
      } catch (e) {
        console.error("❌ Failed to fetch configuration:", e);
        if (e instanceof TypeError && e.message.includes("Failed to fetch")) {
          if (ErrorHandler.isOffline()) {
            ErrorHandler.showErrorMessage(
              "offline",
              "Cannot load translation configuration while offline."
            );
          } else {
            ErrorHandler.showErrorMessage(
              "network",
              "Failed to load translation configuration. Please check your connection."
            );
          }
          throw new Error("NETWORK_ERROR");
        }
        if (e instanceof Error && e.message === "RATE_LIMIT") {
          throw e;
        }
        throw e;
      }
    }
    async handleConfigError(response) {
      var _a;
      const errorData = await response.json().catch(() => ({}));
      if (response.status === 401) {
        ErrorHandler.showErrorMessage(
          "auth",
          errorData.error === "invalid_api_key" ? "Invalid API key" : void 0
        );
      } else if (response.status === 403) {
        ErrorHandler.showErrorMessage(
          "auth",
          errorData.error === "origin_not_allowed"
            ? "Domain not authorized for this API key"
            : void 0
        );
      } else if (response.status === 404) {
        ErrorHandler.showErrorMessage(
          "server",
          errorData.detail.payload.error === "website_not_found"
            ? errorData.detail.payload.message
            : "Translation configuration not found."
        );
      } else if (response.status === 429) {
        ErrorHandler.showErrorMessage(
          "rate-limit",
          errorData.message ||
            "You're sending requests too quickly. Please wait and try again."
        );
        throw new Error("RATE_LIMIT");
      } else if (response.status >= 500) {
        if (
          errorData.detail &&
          errorData.detail.includes("Redis connection failed")
        ) {
          ErrorHandler.showErrorMessage(
            "server",
            "Translation service unavailable (Redis connection failed)"
          );
          (_a = this.onCriticalError) == null ? void 0 : _a.call(this);
        } else {
          ErrorHandler.showErrorMessage("server");
        }
      } else {
        ErrorHandler.showErrorMessage("network", `HTTP ${response.status}`);
      }
    }
    async translateTextBased({
      textNodes,
      translateConfig,
      apiConfig,
      dropdownLabels,
      pageContext,
      abortSignal,
    }) {
      if (ErrorHandler.isOffline()) {
        ErrorHandler.showErrorMessage(
          "offline",
          "You are currently offline. Using cached translations where available."
        );
      }
      const makeRequest = async (retryAttempt = 0) => {
        try {
          const response = await fetch(
            `${this.apiUrl}${API_ENDPOINTS.TEXT_BASED}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${apiConfig.key}`,
                "X-Domain": apiConfig.domain,
              },
              body: JSON.stringify(
                camelToSnakeObject({
                  textNodes,
                  translateConfig,
                  dropdownLabels,
                  pageContext,
                })
              ),
              signal: abortSignal,
            }
          );
          if (!response.ok) {
            await this.handleTranslationError(response);
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          if (data.redis_available === false) {
            ErrorHandler.showErrorMessage(
              "cache-unavailable",
              "Cache service temporarily unavailable. Translations may be slower. Please refresh the browser."
            );
          }
          const responseBody = snakeToCamelObject(data);
          return responseBody;
        } catch (error) {
          if (ApiService.isAbortError(error)) {
            throw error;
          }
          if (
            error instanceof TypeError &&
            error.message.includes("Failed to fetch")
          ) {
            if (retryAttempt < this.maxRetries) {
              await new Promise((resolve) =>
                setTimeout(resolve, Math.pow(2, retryAttempt) * 1e3)
              );
              return makeRequest(retryAttempt + 1);
            }
            if (ErrorHandler.isOffline()) {
              ErrorHandler.showErrorMessage("offline");
            } else {
              ErrorHandler.showErrorMessage(
                "network",
                "Network connection failed. Please check your connection."
              );
            }
            throw new Error("NETWORK_ERROR");
          }
          if (error instanceof Error && error.message === "RATE_LIMIT") {
            if (retryAttempt < 2) {
              await new Promise((resolve) =>
                setTimeout(resolve, 5e3 * (retryAttempt + 1))
              );
              return makeRequest(retryAttempt + 1);
            }
          }
          throw error;
        }
      };
      return makeRequest();
    }
    async handleTranslationError(response) {
      const errorData = await response.json().catch(() => ({}));
      const errorDetail = errorData.detail || {};
      const errorType = errorDetail.error || "unknown";
      let errorCode = `HTTP_${response.status}`;
      switch (errorType) {
        case "unsupported_language":
          ErrorHandler.showErrorMessage(
            "unsupported-language",
            errorDetail.message
          );
          errorCode = "UNSUPPORTED_LANGUAGE";
          break;
        case "rate_limit":
          const retryMsg = errorDetail.from_cache_only
            ? "Rate limit reached. Serving cached translations."
            : "Too many requests. Please try again later.";
          ErrorHandler.showErrorMessage("rate-limit", retryMsg);
          errorCode = "RATE_LIMIT";
          break;
        case "invalid_api_key":
          ErrorHandler.showErrorMessage(
            "auth",
            "Invalid API key. Please check your configuration."
          );
          errorCode = "UNAUTHORIZED";
          break;
        case "domain_mismatch":
        case "origin_not_allowed":
          ErrorHandler.showErrorMessage(
            "auth",
            "This domain is not authorized for the provided API key."
          );
          errorCode = "FORBIDDEN";
          break;
        default:
          if (response.status === 401) {
            ErrorHandler.showErrorMessage(
              "auth",
              errorDetail.message || "Authentication failed"
            );
            errorCode = "UNAUTHORIZED";
          } else if (response.status === 403) {
            ErrorHandler.showErrorMessage(
              "auth",
              errorDetail.message || "Access forbidden"
            );
            errorCode = "FORBIDDEN";
          } else if (response.status === 404) {
            ErrorHandler.showErrorMessage(
              "server",
              errorData.error === "website_not_found"
                ? "Translation configuration not found."
                : void 0
            );
          } else if (response.status === 429) {
            ErrorHandler.showErrorMessage(
              "rate-limit",
              errorDetail.message ||
                "You’re sending requests too quickly. Please wait a moment and try again."
            );
            errorCode = "RATE_LIMIT";
          } else if (response.status >= 500) {
            if (errorDetail.message && errorDetail.message.includes("Redis")) {
              ErrorHandler.showErrorMessage(
                "server",
                "Translation service experiencing issues. Some features may be limited."
              );
              errorCode = "REDIS_UNAVAILABLE";
            } else {
              ErrorHandler.showErrorMessage(
                "server",
                errorDetail.message || "Server error"
              );
              errorCode = "SERVER_ERROR";
            }
          } else {
            ErrorHandler.showErrorMessage(
              "network",
              `HTTP ${response.status}: ${
                errorDetail.message || "Unknown error"
              }`
            );
            errorCode = "NETWORK_ERROR";
          }
      }
      throw new Error(errorCode);
    }
    static isAbortError(error) {
      return error.name === "AbortError";
    }
  }
  class StorageManager {
    static saveDropdownPosition(position) {
      try {
        localStorage.setItem(
          LOCAL_STORAGE_KEYS.DROPDOWN_POSITION,
          JSON.stringify(position)
        );
      } catch (e) {
        console.warn("Failed to save dropdown position to localStorage:", e);
      }
    }
    static loadDropdownPosition() {
      try {
        const saved = localStorage.getItem(
          LOCAL_STORAGE_KEYS.DROPDOWN_POSITION
        );
        if (saved) {
          const position = JSON.parse(saved);
          if (
            typeof position.x === "number" &&
            typeof position.y === "number"
          ) {
            return position;
          }
        }
      } catch (e) {
        console.warn("Failed to load dropdown position from localStorage:", e);
      }
      return null;
    }
    static saveSelectedLanguage(lang) {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEYS.SELECTED_LANGUAGE, lang);
      } catch (e) {
        console.warn("Failed to save selected language to localStorage:", e);
      }
    }
    static loadSelectedLanguage() {
      try {
        let value = localStorage.getItem(LOCAL_STORAGE_KEYS.SELECTED_LANGUAGE);
        if (value && value[0] === '"' && value[value.length - 1] === '"') {
          value = value.slice(1, -1);
        }
        return value;
      } catch (e) {
        console.warn("Failed to load selected language from localStorage:", e);
        return null;
      }
    }
  }
  class DomUtils {
    static getCurrentPath() {
      return window.location.pathname + window.location.search;
    }
    static getScriptConfig() {
      const tag = document.currentScript;
      const rawDomain =
        (tag == null ? void 0 : tag.dataset.domain) || window.location.host;
      const domain = DomUtils.normalizeDomain(rawDomain);
      const apiKey = (tag == null ? void 0 : tag.dataset.apiKey) || "";
      return { apiKey, domain };
    }
    static normalizeDomain(inputDomain) {
      if (!inputDomain) return "";
      let domain = inputDomain.trim().toLowerCase();
      domain = domain.replace(/^(https?:\/\/)/, "");
      if (domain.startsWith("www.")) {
        domain = domain.slice(4);
      }
      domain = domain.split("/")[0];
      return domain;
    }
    static shouldPreventTranslation(element) {
      if (!element) return false;
      let current = element;
      while (current) {
        if (current.getAttribute("translate") === "no") {
          return true;
        }
        if (current.classList && current.classList.contains("notranslate")) {
          return true;
        }
        if (current.hasAttribute("data-no-translate")) {
          return true;
        }
        current = current.parentElement;
      }
      return false;
    }
    static isNonContentElement(element) {
      const tagName = element.tagName;
      return (
        tagName === "SCRIPT" || tagName === "STYLE" || tagName === "NOSCRIPT"
      );
    }
    static escapeHtml(str) {
      const htmlEscapes = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "/": "&#x2F;",
      };
      return str.replace(/[&<>"'/]/g, (char) => htmlEscapes[char] || char);
    }
    static detectCSPViolations() {
      try {
        const testStyle = document.createElement("style");
        testStyle.textContent = ".csp-test { display: none; }";
        document.head.appendChild(testStyle);
        document.head.removeChild(testStyle);
      } catch (e) {
        console.warn(
          "⚠️ CSP may block inline styles needed for translation dropdown"
        );
      }
      document.addEventListener("securitypolicyviolation", (e) => {
        if (
          e.violatedDirective.includes("script-src") ||
          e.violatedDirective.includes("style-src") ||
          e.violatedDirective.includes("connect-src")
        ) {
          console.warn(
            `⚠️ CSP violation detected: ${e.violatedDirective} - Translation features may be limited`
          );
        }
      });
    }
    static getBrowserLanguage() {
      if (navigator.language) {
        return navigator.language.split("-")[0].toLowerCase();
      }
      if (navigator.languages && navigator.languages.length > 0) {
        return navigator.languages[0].split("-")[0].toLowerCase();
      }
      return null;
    }
    static updateCanonicalUrl(targetLang, sourceLang) {
      const canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) return;
      try {
        const url = new URL(canonical.href);
        if (targetLang !== sourceLang) {
          url.searchParams.set("lang", targetLang);
        } else {
          url.searchParams.delete("lang");
        }
        canonical.href = url.toString();
      } catch (e) {
        console.warn("Failed to update canonical URL:", e);
      }
    }
  }
  function waitForDomToSettle(root, quietMs = 250, maxWaitMs = 1e3) {
    return new Promise((resolve) => {
      let timer;
      const obs = new MutationObserver(() => {
        clearTimeout(timer);
        timer = window.setTimeout(done, quietMs);
      });
      function done() {
        obs.disconnect();
        resolve();
      }
      obs.observe(root, {
        childList: true,
        subtree: true,
        characterData: true,
      });
      const hardStop = window.setTimeout(() => {
        obs.disconnect();
        resolve();
      }, maxWaitMs);
      timer = window.setTimeout(() => {
        clearTimeout(hardStop);
        done();
      }, quietMs);
    });
  }
  class ConfigManager {
    constructor(apiService, scriptConfig) {
      this.apiService = apiService;
      this.scriptConfig = scriptConfig;
      this.state = {
        translationConfig: null,
        apiConfig: null,
        currentLang: "en",
      };
    }
    getState() {
      return { ...this.state };
    }
    updateState(updates) {
      this.state = { ...this.state, ...updates };
    }
    async initializeConfig() {
      const { apiKey, domain } = this.scriptConfig;
      if (!apiKey) {
        console.error("❌ No API key provided. Translation disabled.");
        return null;
      }
      const maxRetries = 5;
      let retryCount = 0;
      let delay = 500;
      while (retryCount < maxRetries) {
        try {
          const config = await this.apiService.fetchConfig(apiKey, domain);
          const translationConfig = {
            defaultLang: config.defaultLang,
            languageLabels: config.languageLabels,
            targetLanguages: config.targetLanguages,
            domain: config.domain,
            websiteId: config.websiteId,
            teamId: config.teamId,
          };
          const apiConfig = {
            key: apiKey,
            domain,
            apiUrl: this.apiService.getApiUrl(),
          };
          this.updateState({
            translationConfig,
            apiConfig,
          });
          let initialLang = translationConfig.defaultLang;
          const savedLang = StorageManager.loadSelectedLanguage();
          if (
            savedLang &&
            (translationConfig.targetLanguages.includes(savedLang) ||
              savedLang === translationConfig.defaultLang)
          ) {
            initialLang = savedLang;
          } else {
            const browserLang = DomUtils.getBrowserLanguage();
            if (
              browserLang &&
              browserLang !== translationConfig.defaultLang &&
              translationConfig.targetLanguages.includes(browserLang)
            ) {
              initialLang = browserLang;
            } else if (
              browserLang &&
              browserLang !== translationConfig.defaultLang
            ) {
              const matchingLang = translationConfig.targetLanguages.find(
                (lang) =>
                  browserLang.startsWith(lang) || lang.startsWith(browserLang)
              );
              if (matchingLang) {
                initialLang = matchingLang;
              }
            }
          }
          this.updateState({ currentLang: initialLang });
          return translationConfig;
        } catch (e) {
          retryCount++;
          if (e instanceof Error && e.message === "RATE_LIMIT") {
            console.error("❌ Rate limit exceeded. Stopping retries.");
            break;
          }
          console.warn(
            `⚠️ Config fetch attempt ${retryCount} failed: ${e.message}. Retrying in ${delay}ms...`
          );
          await new Promise((resolve) => setTimeout(resolve, delay));
          delay = Math.min(delay * 2, 4e3);
        }
      }
      console.error(
        "❌ Failed to initialize translation script after all retries"
      );
      this.updateState({
        translationConfig: null,
        apiConfig: null,
      });
      return null;
    }
    getCurrentLanguage() {
      return this.state.currentLang;
    }
    getTranslationConfig() {
      return this.state.translationConfig;
    }
    getApiConfig() {
      return this.state.apiConfig;
    }
    setCurrentLanguage(lang) {
      this.updateState({ currentLang: lang });
      StorageManager.saveSelectedLanguage(lang);
    }
    isInDefaultLanguage() {
      var _a;
      return (
        this.state.currentLang ===
        ((_a = this.state.translationConfig) == null ? void 0 : _a.defaultLang)
      );
    }
  }
  class LanguageDropdown {
    constructor(options) {
      this.options = options;
      this.container = null;
      this.selectElement = null;
      this.isDragging = false;
      this.dragOffsetX = 0;
      this.dragOffsetY = 0;
      this.resizeObserver = null;
      this.isCustomPosition = false;
      this.resizeTimeout = null;
      this.isDropdownOpen = false;
      this.toggleButton = null;
    }
    create() {
      const existing = document.getElementById(SELECTORS.DROPDOWN_CONTAINER);
      if (existing) existing.remove();
      const { theme = "dark", toggle = false } = this.options;
      this.createStyles(theme);
      if (toggle) {
        this.createToggleButton();
      } else {
        this.createContainer();
        this.setupResizeObserver();
      }
    }
    remove() {
      const existing = document.getElementById(SELECTORS.DROPDOWN_CONTAINER);
      if (existing) existing.remove();
      const style = document.getElementById(SELECTORS.DROPDOWN_STYLE);
      if (style) style.remove();
      if (this.resizeObserver) {
        this.resizeObserver.disconnect();
        this.resizeObserver = null;
      }
      if (this.resizeTimeout) {
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = null;
      }
      window.removeEventListener("resize", this.handleWindowResize.bind(this));
      this.container = null;
      this.selectElement = null;
    }
    update(newOptions) {
      const oldToggle = this.options.toggle;
      this.options = { ...this.options, ...newOptions };
      if (oldToggle !== this.options.toggle) {
        this.remove();
        this.create();
        return;
      }
      if (this.selectElement) {
        this.selectElement.innerHTML = "";
        this.populateSelect(this.selectElement);
        this.selectElement.disabled =
          !!this.options.isTranslating || !!this.options.disabled;
      }
      if (this.container) {
        if (this.options.isTranslating) {
          this.container.setAttribute("title", "Translation is in progress");
        } else if (this.options.disabled) {
          this.container.setAttribute(
            "title",
            "Translation service unavailable"
          );
        } else {
          this.container.removeAttribute("title");
        }
      }
    }
    setupResizeObserver() {
      if (typeof ResizeObserver === "undefined") return;
      this.resizeObserver = new ResizeObserver(() => {
        if (this.resizeTimeout) {
          clearTimeout(this.resizeTimeout);
        }
        this.resizeTimeout = window.setTimeout(() => {
          this.ensureDropdownInViewport();
        }, 100);
      });
      this.resizeObserver.observe(document.body);
    }
    ensureDropdownInViewport() {
      if (!this.container || !this.isCustomPosition) return;
      const rect = this.container.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const dropdownWidth = rect.width;
      const dropdownHeight = rect.height;
      let needsReposition = false;
      let newX = rect.left;
      let newY = rect.top;
      if (rect.right > viewportWidth) {
        newX = viewportWidth - dropdownWidth - 24;
        needsReposition = true;
      } else if (rect.left < 0) {
        newX = 24;
        needsReposition = true;
      }
      if (rect.bottom > viewportHeight) {
        newY = viewportHeight - dropdownHeight - 24;
        needsReposition = true;
      } else if (rect.top < 0) {
        newY = 24;
        needsReposition = true;
      }
      newX = Math.max(24, Math.min(newX, viewportWidth - dropdownWidth - 24));
      newY = Math.max(24, Math.min(newY, viewportHeight - dropdownHeight - 24));
      if (needsReposition) {
        this.container.style.left = newX + "px";
        this.container.style.top = newY + "px";
        this.container.style.right = "auto";
        this.container.style.bottom = "auto";
        StorageManager.saveDropdownPosition({ x: newX, y: newY });
      }
    }
    constrainToViewport(x, y) {
      if (!this.container) return { x, y };
      const dropdownWidth = this.container.offsetWidth;
      const dropdownHeight = this.container.offsetHeight;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const minMargin = 24;
      const maxX = viewportWidth - dropdownWidth - minMargin;
      const maxY = viewportHeight - dropdownHeight - minMargin;
      return {
        x: Math.max(minMargin, Math.min(x, maxX)),
        y: Math.max(minMargin, Math.min(y, maxY)),
      };
    }
    handleWindowResize() {
      if (this.resizeTimeout) {
        clearTimeout(this.resizeTimeout);
      }
      this.resizeTimeout = window.setTimeout(() => {
        this.ensureDropdownInViewport();
      }, 100);
    }
    createStyles(theme) {
      const style = document.createElement("style");
      style.id = SELECTORS.DROPDOWN_STYLE;
      style.textContent = this.generateCSS(theme);
      document.head.appendChild(style);
    }
    generateCSS(theme) {
      const baseColors = this.getBaseColors(theme);
      const themeColors = baseColors;
      const interactiveStyles = `
            #${SELECTORS.DROPDOWN}:not(:disabled):hover {
                background: var(--tl-bg-hover, ${baseColors.bgHover});
                cursor: pointer;
            }
            
            #${SELECTORS.DROPDOWN}:not(:disabled):focus {
                background: var(--tl-bg-hover, ${baseColors.bgHover});
            }

            #${SELECTORS.DROPDOWN}:disabled {
                cursor: default;
                animation: pulse 2s infinite;
            }
            
            @keyframes pulse {
                0% {
                    background: var(--tl-bg, ${baseColors.bg});
                    color: var(--tl-color, ${themeColors.color});
                    opacity: 0.8;
                }
                50% {
                    background: var(--tl-bg-hover, ${baseColors.bgHover});
                    color: var(--tl-color, ${themeColors.color});
                    opacity: 0.5;
                }
                100% {
                    background: var(--tl-bg, ${baseColors.bg});
                    color: var(--tl-color, ${themeColors.color});
                    opacity: 0.8;
                }
            }
            
            #${SELECTORS.DROPDOWN} option {
                background: var(--tl-option-bg, ${baseColors.optionBg});
                color: var(--tl-option-color, ${baseColors.optionColor});
                padding: var(--tl-option-padding, 8px 12px);
                font-size: var(--tl-option-font-size, 14px);
                font-weight: var(--tl-option-font-weight, 400);
                font-family: var(--tl-option-font-family, inherit);
                line-height: var(--tl-option-line-height, 1.3);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        `;
      const themeSpecificStyles =
        theme === "light"
          ? `
            #${SELECTORS.POWERED_BY} {
                background: rgba(0,0,0,0.03) !important;
                border-top-color: rgba(0,0,0,0.08) !important;
                color: #666 !important;
            }
            #${SELECTORS.POWERED_BY}:hover {
                background: rgba(0,0,0,0.06) !important;
            }
        `
          : `
            #${SELECTORS.POWERED_BY} {
                background: rgba(255,255,255,0.05) !important;
                border-top-color: rgba(255,255,255,0.1) !important;
                color: #ccc !important;
            }
            #${SELECTORS.POWERED_BY}:hover {
                background: rgba(255,255,255,0.08) !important;
            }
        `;
      const toggleButtonStyles = `
            #${SELECTORS.DROPDOWN_CONTAINER} button#${SELECTORS.DROPDOWN} {
                width: 48px;
                height: 48px;
                border-radius: 50%;
                background: var(--tl-bg, ${baseColors.bg});
                color: var(--tl-color, ${baseColors.color});
                border: none;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                transition: all 0.2s ease;
            }

            #${SELECTORS.DROPDOWN_CONTAINER} button#${SELECTORS.DROPDOWN}:hover {
                background: var(--tl-bg-hover, ${baseColors.bgHover});
                transform: scale(1.05);
            }

            #${SELECTORS.DROPDOWN_CONTAINER} button#${SELECTORS.DROPDOWN} svg {
                width: 24px;
                height: 24px;
            }
        `;
      return (
        toggleButtonStyles +
        `
            #${SELECTORS.DROPDOWN_CONTAINER} {
                position: var(--tl-position, fixed);
                bottom: var(--tl-bottom, 24px);
                right: var(--tl-right, 24px);
                top: var(--tl-top, auto);
                left: var(--tl-left, auto);
                z-index: var(--tl-z-index, 2147483647) !important;
                
                display: flex;
                flex-direction: column;
                align-items: stretch;
                
                background: var(--tl-bg, ${themeColors.bg});
                border: var(--tl-border, ${themeColors.border});
                border-radius: var(--tl-border-radius, 8px);
                box-shadow: var(--tl-box-shadow, ${themeColors.shadow});
                overflow: hidden;
                
                font-family: var(--tl-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
                
                width: var(--tl-width, ${DROPDOWN_WIDTH});
                min-width: var(--tl-min-width, ${DROPDOWN_WIDTH});
                max-width: var(--tl-max-width, ${DROPDOWN_WIDTH});
                
                cursor: move;
                
                direction: ltr !important;
                
                pointer-events: auto !important;
            }
            
            #${SELECTORS.DROPDOWN_CONTAINER} * {
                pointer-events: auto !important;
            }
            
            @media (max-width: 768px) {             
                #${SELECTORS.DROPDOWN} {
                    font-size: var(--tl-mobile-font-size, 14px) !important;
                    padding: var(--tl-mobile-padding, 10px 14px 10px 20px) !important;
                }
                
                #${SELECTORS.DROPDOWN} option {
                    font-size: var(--tl-mobile-option-font-size, 13px) !important;
                    padding: var(--tl-mobile-option-padding, 6px 10px) !important;
                }
                
                #${SELECTORS.POWERED_BY} {
                    font-size: var(--tl-mobile-powered-font-size, 9px) !important;
                    padding: var(--tl-mobile-powered-padding, 4px 6px) !important;
                }
                
                #${SELECTORS.DRAG_HANDLE} {
                    width: var(--tl-mobile-drag-handle-size, 14px) !important;
                    height: var(--tl-mobile-drag-handle-size, 14px) !important;
                    font-size: var(--tl-mobile-drag-handle-font-size, 10px) !important;
                }
                
                #${SELECTORS.RESET_HANDLE} {
                    width: var(--tl-mobile-reset-handle-size, 14px) !important;
                    height: var(--tl-mobile-reset-handle-size, 14px) !important;
                    font-size: var(--tl-mobile-reset-handle-font-size, 14px) !important;
                }
            }
            
            @media (max-width: 480px) {
                #${SELECTORS.DROPDOWN} {
                    font-size: var(--tl-small-mobile-font-size, 13px) !important;
                    padding: var(--tl-small-mobile-padding, 8px 12px 8px 18px) !important;
                }
                
                #${SELECTORS.DROPDOWN} option {
                    font-size: var(--tl-small-mobile-option-font-size, 14px) !important;
                    padding: var(--tl-small-mobile-option-padding, 5px 8px) !important;
                }
            }
            
            #${SELECTORS.DRAG_HANDLE} {
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
                color: var(--tl-color, ${themeColors.color});
                user-select: none;
                -webkit-user-select: none;
                -moz-user-select: none;
            }
            
            #${SELECTORS.DRAG_HANDLE}:hover {
                opacity: 1;
            }
            
            #${SELECTORS.RESET_HANDLE} {
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
                color: var(--tl-color, ${themeColors.color});
                user-select: none;
                -webkit-user-select: none;
                -moz-user-select: none;
            }
            
            #${SELECTORS.RESET_HANDLE}:hover {
                opacity: 1;
            }
            
            #${SELECTORS.DROPDOWN} {
                border: none;
                outline: none;
                appearance: none;
                -webkit-appearance: none;
                -moz-appearance: none;
                
                background: transparent;
                color: var(--tl-color, ${themeColors.color});
                
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
            
            #${SELECTORS.DROPDOWN} option {
                direction: ltr !important;
                text-align: left !important;
            }
            
            ${interactiveStyles}
            
            #${SELECTORS.POWERED_BY} {
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
            
            #${SELECTORS.POWERED_BY}:hover {
                background: var(--tl-powered-bg-hover, rgba(0,0,0,0.08)) !important;
            }
            
            ${themeSpecificStyles}
        `
      );
    }
    getBaseColors(theme) {
      return theme === "light"
        ? {
            bg: "#ffffff",
            bgHover: "#f5f5f5",
            color: "#333333",
            border: "1px solid #e0e0e0",
            shadow: "0 2px 8px rgba(0,0,0,0.1)",
            optionBg: "#ffffff",
            optionColor: "#333333",
          }
        : {
            bg: "#333333",
            bgHover: "#555555",
            color: "#ffffff",
            border: "none",
            shadow: "0 2px 8px rgba(0,0,0,0.3)",
            optionBg: "#333333",
            optionColor: "#ffffff",
          };
    }
    capitalizeLabel(label) {
      const escapedLabel = DomUtils.escapeHtml(label);
      const parts = escapedLabel.split("(");
      const beforeParen = parts[0]
        .trim()
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
      if (parts.length === 1) return beforeParen;
      const insideParen = parts[1]
        .replace(")", "")
        .trim()
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
      return `${beforeParen} (${insideParen})`;
    }
    applyStoredPosition() {
      if (!this.container) return;
      const position = StorageManager.loadDropdownPosition();
      if (position) {
        this.container.style.left = position.x + "px";
        this.container.style.top = position.y + "px";
        this.container.style.right = "auto";
        this.container.style.bottom = "auto";
        this.isCustomPosition = true;
      } else {
        this.isCustomPosition = false;
      }
    }
    createDragHandle() {
      if (!this.container) return;
      const dragHandle = document.createElement("div");
      dragHandle.id = SELECTORS.DRAG_HANDLE;
      dragHandle.setAttribute("data-no-translate", "true");
      dragHandle.innerHTML = "⋮⋮";
      dragHandle.title = "Drag to move";
      this.container.appendChild(dragHandle);
      this.container.addEventListener(
        "mousedown",
        this.handleMouseDown.bind(this)
      );
    }
    createResetHandle() {
      if (!this.container) return;
      const resetHandle = document.createElement("div");
      resetHandle.id = SELECTORS.RESET_HANDLE;
      resetHandle.setAttribute("data-no-translate", "true");
      resetHandle.innerHTML = "⟲";
      resetHandle.title = "Reset language selector position";
      this.container.appendChild(resetHandle);
      resetHandle.addEventListener(
        "click",
        this.handleResetPosition.bind(this)
      );
      resetHandle.addEventListener("touchstart", (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.handleResetPosition();
      });
    }
    handleResetPosition() {
      if (this.container) {
        localStorage.removeItem(LOCAL_STORAGE_KEYS.DROPDOWN_POSITION);
        this.container.style.left = "auto";
        this.container.style.top = "auto";
        this.container.style.right = "24px";
        this.container.style.bottom = "24px";
        this.isCustomPosition = false;
      }
    }
    createToggleButton() {
      this.container = document.createElement("div");
      this.container.id = SELECTORS.DROPDOWN_CONTAINER;
      this.container.setAttribute("data-no-translate", "true");
      this.container.style.position = "fixed";
      this.container.style.bottom = "24px";
      this.container.style.right = "24px";
      this.container.style.zIndex = "2147483647";
      this.toggleButton = document.createElement("button");
      this.toggleButton.id = SELECTORS.DROPDOWN;
      this.toggleButton.setAttribute("data-no-translate", "true");
      this.toggleButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9"/>
            </svg>
        `;
      this.toggleButton.style.cssText = `
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background: var(--tl-bg, #333333);
            color: var(--tl-color, #ffffff);
            border: none;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            transition: all 0.2s ease;
        `;
      this.toggleButton.addEventListener("click", () => {
        this.isDropdownOpen = !this.isDropdownOpen;
        if (this.isDropdownOpen) {
          this.createContainer(true);
        } else {
          const existingDropdown = document.getElementById(
            SELECTORS.DROPDOWN_CONTAINER
          );
          if (existingDropdown && existingDropdown.parentNode) {
            existingDropdown.parentNode.removeChild(existingDropdown);
          }
        }
      });
      this.container.appendChild(this.toggleButton);
      document.body.appendChild(this.container);
    }
    createContainer(fromToggle = false) {
      if (!fromToggle) {
        this.container = document.createElement("div");
        this.container.id = SELECTORS.DROPDOWN_CONTAINER;
        this.container.setAttribute("data-no-translate", "true");
        this.container.style.position = "fixed";
      }
      this.applyStoredPosition();
      this.createDragHandle();
      this.createResetHandle();
      this.createSelectElement();
      if (this.selectElement && this.container) {
        this.container.appendChild(this.selectElement);
      }
      this.populateSelect(this.selectElement);
      this.createPoweredByLink();
      if (!fromToggle && this.container) {
        document.body.appendChild(this.container);
      }
      if (this.options.isTranslating || this.options.disabled) {
        if (this.selectElement) this.selectElement.disabled = true;
        if (this.container) {
          this.container.setAttribute(
            "title",
            this.options.isTranslating
              ? "Translation is in progress"
              : "Translation service unavailable"
          );
        }
      }
      if (this.container) {
        this.container.addEventListener(
          "touchstart",
          this.handleTouchStart.bind(this),
          { passive: false }
        );
      }
      document.addEventListener("touchmove", this.handleTouchMove.bind(this), {
        passive: false,
      });
    }
    createSelectElement() {
      if (!this.container) return;
      this.selectElement = document.createElement("select");
      this.selectElement.id = SELECTORS.DROPDOWN;
      this.selectElement.setAttribute("data-no-translate", "true");
      this.selectElement.onchange = () => {
        var _a, _b;
        if (!this.selectElement) return;
        const newLang = this.selectElement.value;
        (_b = (_a = this.options).onLanguageChange) == null
          ? void 0
          : _b.call(_a, newLang);
      };
    }
    populateSelect(select) {
      const {
        config,
        currentLang,
        translatedDropdownLabels = {},
      } = this.options;
      select.innerHTML = "";
      const sourceLanguage = config.defaultLang;
      const available = new Set(
        [...config.targetLanguages, sourceLanguage].filter(Boolean)
      );
      const availableLanguages = Array.from(available).filter(
        (l) => config.languageLabels[l]
      );
      const allLanguages = [];
      if (currentLang !== sourceLanguage) {
        if (sourceLanguage && config.languageLabels[sourceLanguage]) {
          allLanguages.push(sourceLanguage, currentLang);
        }
      } else {
        if (sourceLanguage && config.languageLabels[sourceLanguage]) {
          allLanguages.push(sourceLanguage);
        }
        availableLanguages.forEach((l) => {
          if (l !== sourceLanguage) {
            allLanguages.push(l);
          }
        });
      }
      allLanguages.forEach((l) => {
        const option = document.createElement("option");
        option.value = l;
        const rawLabel =
          translatedDropdownLabels[l] || config.languageLabels[l];
        const displayName = this.capitalizeLabel(rawLabel);
        option.textContent = displayName;
        option.setAttribute("data-no-translate", "true");
        if (l === currentLang) {
          option.selected = true;
        }
        select.appendChild(option);
      });
      const rawSelectedLabel =
        translatedDropdownLabels[currentLang] ||
        config.languageLabels[currentLang];
      const selectedDisplayName = this.capitalizeLabel(rawSelectedLabel);
      select.title = selectedDisplayName;
    }
    createPoweredByLink() {
      if (!this.container) return;
      const poweredBy = document.createElement("a");
      poweredBy.id = SELECTORS.POWERED_BY;
      poweredBy.href = "https://camb.ai";
      poweredBy.target = "_blank";
      poweredBy.rel = "noopener noreferrer";
      poweredBy.setAttribute("data-no-translate", "true");
      const text = document.createElement("span");
      text.textContent = "Powered by CAMB.AI";
      text.setAttribute("data-no-translate", "true");
      poweredBy.appendChild(text);
      this.container.appendChild(poweredBy);
    }
    handleMouseDown(e) {
      if (!this.container) return;
      const target = e.target;
      const isInteractiveElement = target.closest("select, option, a") !== null;
      if (isInteractiveElement) return;
      this.isDragging = true;
      this.isCustomPosition = true;
      const rect = this.container.getBoundingClientRect();
      this.dragOffsetX = e.clientX - rect.left;
      this.dragOffsetY = e.clientY - rect.top;
      document.addEventListener("mousemove", this.handleMouseMove.bind(this));
      document.addEventListener("mouseup", this.handleMouseUp.bind(this));
      e.preventDefault();
    }
    handleMouseMove(e) {
      if (!this.isDragging || !this.container) return;
      const x = e.clientX - this.dragOffsetX;
      const y = e.clientY - this.dragOffsetY;
      const clamped = this.constrainToViewport(x, y);
      this.container.style.left = clamped.x + "px";
      this.container.style.top = clamped.y + "px";
      this.container.style.right = "auto";
      this.container.style.bottom = "auto";
      this.isCustomPosition = true;
    }
    handleMouseUp() {
      this.isDragging = false;
      document.removeEventListener(
        "mousemove",
        this.handleMouseMove.bind(this)
      );
      document.removeEventListener("mouseup", this.handleMouseUp.bind(this));
      if (this.container) {
        const rect = this.container.getBoundingClientRect();
        StorageManager.saveDropdownPosition({ x: rect.left, y: rect.top });
      }
    }
    handleTouchStart(e) {
      if (!this.container) return;
      const target = e.target;
      if (target.id === SELECTORS.RESET_HANDLE) return;
      const isInteractiveElement = target.closest("select, option, a") !== null;
      if (isInteractiveElement) return;
      this.isDragging = true;
      this.isCustomPosition = true;
      const touch = e.touches[0];
      const rect = this.container.getBoundingClientRect();
      this.dragOffsetX = touch.clientX - rect.left;
      this.dragOffsetY = touch.clientY - rect.top;
      e.preventDefault();
    }
    handleTouchMove(e) {
      if (!this.isDragging || !this.container || e.touches.length !== 1) return;
      const touch = e.touches[0];
      const x = touch.clientX - this.dragOffsetX;
      const y = touch.clientY - this.dragOffsetY;
      const clamped = this.constrainToViewport(x, y);
      this.container.style.left = clamped.x + "px";
      this.container.style.top = clamped.y + "px";
      this.container.style.right = "auto";
      this.container.style.bottom = "auto";
      this.isCustomPosition = true;
      e.preventDefault();
    }
    handleTouchEnd() {
      this.isDragging = false;
      if (this.container) {
        const rect = this.container.getBoundingClientRect();
        StorageManager.saveDropdownPosition({ x: rect.left, y: rect.top });
      }
      this.handleTouchEnd;
    }
  }
  const queued = /* @__PURE__ */ new WeakSet();
  const translated = /* @__PURE__ */ new WeakSet();
  const translatedTextStore = /* @__PURE__ */ new WeakMap();
  const translatedAttributeStore = /* @__PURE__ */ new WeakMap();
  function setTranslatedText(node, translatedText) {
    translatedTextStore.set(node, translatedText.trim());
  }
  function getTranslatedText(node) {
    return translatedTextStore.get(node);
  }
  function clearTranslatedText(node) {
    translatedTextStore.delete(node);
  }
  function setTranslatedAttribute(element, attribute, translatedValue) {
    const existing =
      translatedAttributeStore.get(element) || /* @__PURE__ */ new Map();
    existing.set(attribute, translatedValue.trim());
    translatedAttributeStore.set(element, existing);
  }
  function getTranslatedAttribute(element, attribute) {
    const map = translatedAttributeStore.get(element);
    return map == null ? void 0 : map.get(attribute);
  }
  function clearTranslatedAttribute(element, attribute) {
    if (!attribute) {
      translatedAttributeStore.delete(element);
      return;
    }
    const map = translatedAttributeStore.get(element);
    if (!map) return;
    map.delete(attribute);
    if (map.size === 0) {
      translatedAttributeStore.delete(element);
    }
  }
  class TranslationObserver {
    constructor(onUrlChange, onContentChange, configManager) {
      this.onUrlChange = onUrlChange;
      this.onContentChange = onContentChange;
      this.configManager = configManager;
      this.observer = null;
      this.currentUrl = "";
    }
    start() {
      this.stop();
      this.currentUrl = DomUtils.getCurrentPath();
      this.observer = new MutationObserver((mutations) => {
        if (window.__isTranslatingDOM) return;
        const newUrl = DomUtils.getCurrentPath();
        if (newUrl !== this.currentUrl) {
          this.currentUrl = newUrl;
          this.onUrlChange(newUrl);
          return;
        }
        this.processMutations(mutations);
      });
      const observeOptions = {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true,
        attributeFilter: [...TRANSLATABLE_ATTRIBUTES],
      };
      this.observer.observe(document.body, observeOptions);
      this.observeOpenShadowRoots(document.body, observeOptions);
      this.patchAttachShadow(observeOptions);
    }
    stop() {
      var _a;
      (_a = this.observer) == null ? void 0 : _a.disconnect();
      this.observer = null;
    }
    processMutations(mutations) {
      var _a, _b;
      for (const mutation of mutations) {
        if (mutation.type === "childList") {
          if (
            mutation.addedNodes.length > 0 &&
            mutation.removedNodes.length === 1
          ) {
            const twin = mutation.removedNodes[0];
            if (
              twin.nodeType === 1 &&
              twin.hasAttribute(ATTRIBUTES.SOURCE_TEXT)
            ) {
              mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1) {
                  const el = node;
                  if (!el.hasAttribute(ATTRIBUTES.SOURCE_TEXT)) {
                    el.setAttribute(
                      ATTRIBUTES.SOURCE_TEXT,
                      twin.getAttribute(ATTRIBUTES.SOURCE_TEXT)
                    );
                    const translatedTo = twin.getAttribute(
                      ATTRIBUTES.TRANSLATED_TO
                    );
                    if (translatedTo) {
                      el.setAttribute(ATTRIBUTES.TRANSLATED_TO, translatedTo);
                    }
                    for (let i = 0; i < twin.attributes.length; i++) {
                      const attr = twin.attributes[i];
                      if (
                        attr.name.startsWith(ATTRIBUTES.SOURCE_ATTRIBUTE_PREFIX)
                      ) {
                        if (!el.hasAttribute(attr.name)) {
                          el.setAttribute(attr.name, attr.value);
                        }
                      }
                    }
                  }
                }
              });
            }
          }
          mutation.addedNodes.forEach((node) => {
            if (
              this.isTranslatableElement(node) &&
              !queued.has(node) &&
              !translated.has(node)
            ) {
              this.onContentChange(node);
            }
          });
        } else if (mutation.type === "characterData") {
          const textNode = mutation.target;
          const parent = mutation.target.parentElement;
          if (!parent) continue;
          const translationState = parent.getAttribute(
            ATTRIBUTES.TRANSLATION_STATE
          );
          const translatedTo = parent.getAttribute(ATTRIBUTES.TRANSLATED_TO);
          const currentLang = this.configManager.getCurrentLanguage();
          if (
            translationState === "translated" ||
            translatedTo === currentLang
          ) {
            const stored = getTranslatedText(textNode);
            const current =
              ((_a = mutation.target.data) == null ? void 0 : _a.trim()) || "";
            if (stored !== void 0 && stored !== current) {
              parent.setAttribute(
                ATTRIBUTES.SOURCE_TEXT,
                mutation.target.data || ""
              );
              clearTranslatedText(textNode);
              translated.delete(textNode);
              parent.removeAttribute(ATTRIBUTES.TRANSLATION_STATE);
              parent.removeAttribute(ATTRIBUTES.TRANSLATED_TO);
              if (!queued.has(parent)) {
                this.onContentChange(parent);
              }
              continue;
            }
          }
          if (
            this.isTranslatableElement(parent) &&
            !queued.has(parent) &&
            !translated.has(parent)
          ) {
            this.onContentChange(parent);
          }
        } else if (mutation.type === "attributes") {
          const element = mutation.target;
          const attrName = mutation.attributeName || "";
          const translationState = element.getAttribute(
            ATTRIBUTES.TRANSLATION_STATE
          );
          const translatedTo = element.getAttribute(ATTRIBUTES.TRANSLATED_TO);
          const currentLang = this.configManager.getCurrentLanguage();
          if (
            (translationState === "translated" ||
              translatedTo === currentLang) &&
            attrName
          ) {
            const storedAttr = getTranslatedAttribute(element, attrName);
            const currentVal =
              ((_b = element.getAttribute(attrName)) == null
                ? void 0
                : _b.trim()) || "";
            if (storedAttr !== void 0 && storedAttr !== currentVal) {
              const sourceAttributeName = `${ATTRIBUTES.SOURCE_ATTRIBUTE_PREFIX}${attrName}`;
              element.setAttribute(
                sourceAttributeName,
                element.getAttribute(attrName) || ""
              );
              clearTranslatedAttribute(element, attrName);
              translated.delete(element);
              element.removeAttribute(ATTRIBUTES.TRANSLATION_STATE);
              element.removeAttribute(ATTRIBUTES.TRANSLATED_TO);
              if (!queued.has(element)) {
                this.onContentChange(element);
              }
              continue;
            }
          }
          if (
            element &&
            this.isTranslatableElement(element) &&
            !queued.has(element) &&
            !translated.has(element)
          ) {
            this.onContentChange(element);
          }
        }
      }
    }
    isTranslatableElement(node) {
      if (node.nodeType !== 1) return false;
      const element = node;
      if (element.tagName === "p") return true;
      if (element.tagName === "span") return true;
      const translationState = element.getAttribute(
        ATTRIBUTES.TRANSLATION_STATE
      );
      if (
        translationState === "translating" ||
        translationState === "translated"
      ) {
        return false;
      }
      if (element.matches(DROPDOWN_EXCLUDED_SELECTORS.join(", "))) return false;
      if (DomUtils.shouldPreventTranslation(element)) return false;
      if (DomUtils.isNonContentElement(element)) return false;
      const currentLang = this.configManager.getCurrentLanguage();
      if (element.getAttribute(ATTRIBUTES.TRANSLATED_TO) === currentLang) {
        element.removeAttribute(ATTRIBUTES.TRANSLATED_TO);
      }
      return true;
    }
    observeOpenShadowRoots(root, options) {
      if (!this.observer) return;
      const base = root === document ? document.body : root;
      if (root.shadowRoot) {
        const sr = root.shadowRoot;
        try {
          this.observer.observe(sr, options);
        } catch {}
      }
      const walker = document.createTreeWalker(base, NodeFilter.SHOW_ELEMENT);
      let node;
      while ((node = walker.nextNode())) {
        const el = node;
        const sr = el.shadowRoot;
        if (sr) {
          try {
            this.observer.observe(sr, options);
          } catch {}
          this.observeOpenShadowRoots(sr, options);
        }
      }
    }
    patchAttachShadow(options) {
      if (window.__tlAttachShadowPatched) return;
      const original = Element.prototype.attachShadow;
      const self = this;
      try {
        Element.prototype.attachShadow = function (init) {
          const sr = original.call(this, init);
          try {
            if (init && init.mode === "open" && self.observer) {
              self.observer.observe(sr, options);
            }
          } catch {}
          return sr;
        };
        window.__tlAttachShadowPatched = true;
      } catch {}
    }
  }
  class TextExtractor {
    static extractFromElement(root, shouldCheckUnwantedContent) {
      return this.extractWithLanguageFilter(root, shouldCheckUnwantedContent);
    }
    static extractFreshContentForLanguage(
      root,
      targetLanguage,
      shouldCheckUnwantedContent
    ) {
      return this.extractWithLanguageFilter(
        root,
        shouldCheckUnwantedContent,
        targetLanguage
      );
    }
    static extractWithLanguageFilter(
      root,
      shouldCheckUnwantedContent,
      targetLanguage
    ) {
      const textNodes = [];
      const nodeMap = /* @__PURE__ */ new Map();
      const attributeTexts = [];
      const attributeMap = /* @__PURE__ */ new Map();
      let textIndex = 0;
      let attributeIndex = 0;
      const translatableAttributeSelector = TRANSLATABLE_ATTRIBUTES.map(
        (attr) => `[${attr}]`
      ).join(",");
      const acceptTextNode = (node) => {
        var _a;
        const text = (_a = node.textContent) == null ? void 0 : _a.trim();
        const parent = node.parentNode;
        if (!text || text.length === 0) {
          return NodeFilter.FILTER_REJECT;
        }
        if (parent && DomUtils.shouldPreventTranslation(parent)) {
          return NodeFilter.FILTER_REJECT;
        }
        if (parent && DomUtils.isNonContentElement(parent)) {
          return NodeFilter.FILTER_REJECT;
        }
        if (this.isNumberLike(text)) {
          return NodeFilter.FILTER_REJECT;
        }
        if (this.isPureSpecialCharacter(text)) {
          return NodeFilter.FILTER_REJECT;
        }
        if (targetLanguage && parent) {
          const translatedTo = parent.getAttribute(ATTRIBUTES.TRANSLATED_TO);
          if (translatedTo === targetLanguage) {
            return NodeFilter.FILTER_REJECT;
          }
        }
        return NodeFilter.FILTER_ACCEPT;
      };
      const processContainer = (container) => {
        const base = container === document ? document.body : container;
        if (container.shadowRoot) {
          const sr = container.shadowRoot;
          processContainer(sr);
        }
        const walker = document.createTreeWalker(base, NodeFilter.SHOW_TEXT, {
          acceptNode: acceptTextNode,
        });
        let node;
        while ((node = walker.nextNode())) {
          const parent = node.parentElement;
          if (parent && parent.hasAttribute(ATTRIBUTES.SOURCE_TEXT)) {
            textNodes.push(parent.getAttribute(ATTRIBUTES.SOURCE_TEXT));
          } else {
            textNodes.push(node.textContent);
          }
          nodeMap.set(textIndex, node);
          textIndex++;
        }
        const elementsWithAttributes = Array.from(
          base.querySelectorAll(translatableAttributeSelector)
        );
        elementsWithAttributes.forEach((element) => {
          if (DomUtils.shouldPreventTranslation(element)) {
            return;
          }
          if (DomUtils.isNonContentElement(element)) {
            return;
          }
          if (
            targetLanguage &&
            element.getAttribute(ATTRIBUTES.TRANSLATED_TO) === targetLanguage
          ) {
            return;
          }
          TRANSLATABLE_ATTRIBUTES.forEach((attr) => {
            const value = element.getAttribute(attr);
            if (value && value.trim()) {
              const sourceAttribute = `${ATTRIBUTES.SOURCE_ATTRIBUTE_PREFIX}${attr}`;
              if (element.hasAttribute(sourceAttribute)) {
                attributeTexts.push(element.getAttribute(sourceAttribute));
              } else {
                attributeTexts.push(value);
              }
              attributeMap.set(attributeIndex, {
                element,
                attribute: attr,
              });
              attributeIndex++;
            }
          });
        });
        const elementWalker = document.createTreeWalker(
          base,
          NodeFilter.SHOW_ELEMENT
        );
        let elNode;
        while ((elNode = elementWalker.nextNode())) {
          const el = elNode;
          const sr = el.shadowRoot;
          if (sr) {
            processContainer(sr);
          }
        }
      };
      processContainer(root);
      return { textNodes, nodeMap, attributeTexts, attributeMap };
    }
    static isJsonString(text) {
      try {
        JSON.parse(text);
        return true;
      } catch {
        return false;
      }
    }
    static isUnwantedContent(text) {
      return false;
    }
    static isPureSpecialCharacter(text) {
      const specialCharsRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]+/;
      return specialCharsRegex.test(text) && !text.match(/[a-zA-Z0-9\s]/);
    }
    static isNumberLike(text) {
      const t = text.trim();
      if (!t) return false;
      if (/[A-Za-z]/.test(t)) return false;
      const allowedCharsRegex = /[0-9\s.,+\-:;/()%$€£₹]/g;
      const stripped = t.replace(allowedCharsRegex, "");
      return /[0-9]/.test(t) && stripped.length === 0;
    }
  }
  class DebouncedSender {
    constructor(sendFn, delay = 70, concurrencyLimit = 4) {
      this.sendFn = sendFn;
      this.delay = delay;
      this.concurrencyLimit = concurrencyLimit;
      this.pending = /* @__PURE__ */ new Set();
      this.requestQueue = [];
      this.activeRequests = 0;
    }
    enqueue(el) {
      if (queued.has(el) || translated.has(el)) {
        return;
      }
      this.pending.add(el);
      if (this.timerId) {
        clearTimeout(this.timerId);
      }
      this.timerId = window.setTimeout(() => this.flush(), this.delay);
    }
    flush() {
      if (this.pending.size === 0) return;
      const elems = Array.from(this.pending);
      this.pending.clear();
      this.timerId = void 0;
      const payload = collectUniqueContent(elems);
      if (payload.texts.length === 0 && payload.attributeTexts.length === 0)
        return;
      this.requestQueue.push(payload);
      this.processQueue();
    }
    processQueue() {
      if (
        this.activeRequests >= this.concurrencyLimit ||
        this.requestQueue.length === 0
      ) {
        return;
      }
      this.activeRequests++;
      const payload = this.requestQueue.shift();
      payload.textMap.forEach((n) => queued.add(n));
      payload.attributeMap.forEach(({ element }) => queued.add(element));
      this.sendFn(payload)
        .catch((err) => {
          console.error("DebouncedSender sendFn error:", err);
          payload.textMap.forEach((n) => queued.delete(n));
          payload.attributeMap.forEach(({ element }) => queued.delete(element));
        })
        .finally(() => {
          this.activeRequests--;
          this.processQueue();
        });
    }
  }
  function collectUniqueContent(elems) {
    const texts = [];
    const textMap = /* @__PURE__ */ new Map();
    const attributeTexts = [];
    const attributeMap = /* @__PURE__ */ new Map();
    let textIdx = 0;
    let attrIdx = 0;
    elems.forEach((el) => {
      const {
        textNodes,
        nodeMap,
        attributeTexts: elemAttrTexts,
        attributeMap: elemAttrMap,
      } = TextExtractor.extractFreshContentForLanguage(
        el,
        document.documentElement.lang,
        (text) =>
          TextExtractor.isJsonString(text) ||
          TextExtractor.isUnwantedContent(text)
      );
      textNodes.forEach((txt, localIdx) => {
        const node = nodeMap.get(localIdx);
        if (!node) return;
        if (queued.has(node) || translated.has(node)) return;
        texts.push(txt);
        textMap.set(textIdx++, node);
      });
      elemAttrTexts.forEach((txt, localIdx) => {
        const attrInfo = elemAttrMap.get(localIdx);
        if (!attrInfo) return;
        if (queued.has(attrInfo.element) || translated.has(attrInfo.element))
          return;
        attributeTexts.push(txt);
        attributeMap.set(attrIdx++, attrInfo);
      });
    });
    return { texts, textMap, attributeTexts, attributeMap };
  }
  class NavigationService {
    constructor() {
      this.handler = null;
      this.debounceTimer = null;
      this.isListening = false;
      this.originalPushState = null;
      this.originalReplaceState = null;
      this.onRouteChange = () => {
        this.clearDebounce();
        this.debounceTimer = window.setTimeout(() => {
          if (this.handler) {
            const currentUrl =
              window.location.pathname + window.location.search;
            this.handler(currentUrl);
          }
        }, TIMINGS.SPA_NAVIGATION_DEBOUNCE);
      };
    }
    setHandler(handler) {
      this.handler = handler;
    }
    start() {
      if (this.isListening) return;
      this.isListening = true;
      this.hookHistoryAPI();
      this.addPopstateListener();
    }
    stop() {
      if (!this.isListening) return;
      this.isListening = false;
      this.unhookHistoryAPI();
      this.removePopstateListener();
      this.clearDebounce();
    }
    hookHistoryAPI() {
      this.originalPushState = history.pushState.bind(history);
      this.originalReplaceState = history.replaceState.bind(history);
      history.pushState = (...args) => {
        const result = this.originalPushState.apply(history, args);
        this.onRouteChange();
        return result;
      };
      history.replaceState = (...args) => {
        const result = this.originalReplaceState.apply(history, args);
        this.onRouteChange();
        return result;
      };
    }
    unhookHistoryAPI() {
      if (this.originalPushState) {
        history.pushState = this.originalPushState;
        this.originalPushState = null;
      }
      if (this.originalReplaceState) {
        history.replaceState = this.originalReplaceState;
        this.originalReplaceState = null;
      }
    }
    addPopstateListener() {
      window.addEventListener("popstate", this.onRouteChange);
    }
    removePopstateListener() {
      window.removeEventListener("popstate", this.onRouteChange);
    }
    clearDebounce() {
      if (this.debounceTimer) {
        clearTimeout(this.debounceTimer);
        this.debounceTimer = null;
      }
    }
  }
  class PageContextCollector {
    static collectPageContext() {
      var _a, _b;
      const context = {};
      const title = (_a = document.title) == null ? void 0 : _a.trim();
      if (title && title.length > 0) {
        context.title = title;
      }
      const descriptionMeta = document.querySelector(
        'meta[name="description"]'
      );
      const description =
        (_b = descriptionMeta == null ? void 0 : descriptionMeta.content) ==
        null
          ? void 0
          : _b.trim();
      if (description && description.length > 0) {
        context.description = description;
      }
      context.url = window.location.pathname + window.location.search;
      return context;
    }
  }
  class MetadataUtils {
    static collectMetadata() {
      var _a, _b;
      const list = [];
      const title = (_a = document.title) == null ? void 0 : _a.trim();
      if (title) {
        list.push(["title", title]);
      }
      const desc = document.querySelector('meta[name="description"]');
      const descContent =
        (_b = desc == null ? void 0 : desc.content) == null
          ? void 0
          : _b.trim();
      if (descContent) {
        list.push(["description", descContent]);
      }
      return list;
    }
    static applyMetadata(translated2) {
      const html = document.documentElement;
      translated2.forEach(([key, val]) => {
        if (key === "title") {
          document.title = val;
          html.setAttribute(
            ATTRIBUTES.TRANSLATED_TO,
            document.documentElement.lang
          );
        } else if (key === "description") {
          const meta = document.querySelector('meta[name="description"]');
          if (meta) {
            meta.content = val;
            html.setAttribute(
              ATTRIBUTES.TRANSLATED_TO,
              document.documentElement.lang
            );
          }
        }
      });
    }
  }
  class SkeletonManager {
    static apply(node) {
      var _a;
      if (
        node.nodeType !== Node.TEXT_NODE ||
        !((_a = node.textContent) == null ? void 0 : _a.trim())
      ) {
        return null;
      }
      const parent = node.parentElement;
      if (
        !parent ||
        DomUtils.isNonContentElement(parent) ||
        DomUtils.shouldPreventTranslation(parent)
      ) {
        return null;
      }
      const wrapper = document.createElement("span");
      wrapper.className = "tl-skeleton";
      const bgColor = this.findInheritedBackgroundColor(parent);
      const hexColor = this.rgbToHex(bgColor);
      const skeletonBgColor = this.adjustColorBrightness(hexColor, -5);
      const skeletonHighlightColor = this.adjustColorBrightness(hexColor, 10);
      wrapper.style.setProperty("--skeleton-bg-color", skeletonBgColor);
      wrapper.style.setProperty(
        "--skeleton-highlight-color",
        skeletonHighlightColor
      );
      if (node.parentNode) {
        node.parentNode.insertBefore(wrapper, node);
        wrapper.appendChild(node);
      }
      return wrapper;
    }
    static remove(skeletonWrapper) {
      if (!skeletonWrapper || !skeletonWrapper.parentNode) return;
      const originalNode = skeletonWrapper.firstChild;
      if (originalNode) {
        skeletonWrapper.parentNode.insertBefore(originalNode, skeletonWrapper);
      }
      skeletonWrapper.remove();
    }
    static findInheritedBackgroundColor(element) {
      let current = element;
      while (current) {
        const color = window.getComputedStyle(current).backgroundColor;
        if (color && color !== "rgba(0, 0, 0, 0)" && color !== "transparent") {
          return color;
        }
        if (current === document.body) break;
        current = current.parentElement;
      }
      return (
        window.getComputedStyle(document.documentElement).backgroundColor ||
        "#65737e"
      );
    }
    static rgbToHex(rgb) {
      const result = rgb.match(/\d+/g);
      if (!result) return "#e0e0e0";
      return (
        "#" +
        result
          .slice(0, 3)
          .map((x) => ("0" + parseInt(x).toString(16)).slice(-2))
          .join("")
      );
    }
    static adjustColorBrightness(hex, percent) {
      const num = parseInt(hex.replace("#", ""), 16);
      const amt = Math.round(2.55 * percent);
      const R = (num >> 16) + amt;
      const G = ((num >> 8) & 255) + amt;
      const B = (num & 255) + amt;
      return (
        "#" +
        (
          16777216 +
          (this.clamp(R, 0, 255) << 16) +
          (this.clamp(G, 0, 255) << 8) +
          this.clamp(B, 0, 255)
        )
          .toString(16)
          .slice(1)
      );
    }
    static clamp(val, min, max) {
      return Math.min(Math.max(val, min), max);
    }
  }
  const BUILD_INFO = {
    version: "1.0.1",
    buildTime: /* @__PURE__ */ new Date().toISOString(),
    environment: "development",
  };
  if (typeof window !== "undefined") {
    window.__TRANSLATOR_BUILD_INFO = BUILD_INFO;
  }
  class TextTranslationEngine {
    constructor(apiService, configManager) {
      this.observer = null;
      this.currentAbortController = null;
      this.languageDropdown = null;
      this.translatedLabels = void 0;
      this.isTranslating = false;
      this.originalTitle = null;
      this.originalDescription = null;
      this.apiService = apiService;
      this.configManager = configManager;
      this.sender = new DebouncedSender(
        (payload) => this.translateBatch(payload),
        TIMINGS.DYNAMIC_TRANSLATION_DEBOUNCE
      );
      this.navigationService = new NavigationService();
      this.navigationService.setHandler(() => this.handleUrlChange());
    }
    setTranslating(isTranslating) {
      this.isTranslating = isTranslating;
      this.updateLanguageDropdown(this.translatedLabels);
    }
    updateLanguageDropdown(translatedDropdownLabels) {
      const config = this.configManager.getTranslationConfig();
      if (!config) {
        console.error("❌ Cannot update dropdown: No configuration available");
        return;
      }
      const dropdownOptions = {
        config,
        currentLang: this.configManager.getCurrentLanguage(),
        theme: SCRIPT_CONFIG.theme,
        translatedDropdownLabels,
        isTranslating: this.isTranslating,
        disabled: this.isTranslating,
        toggle: SCRIPT_CONFIG.toggle,
        // Add toggle option
      };
      if (!this.languageDropdown) {
        this.languageDropdown = new LanguageDropdown({
          ...dropdownOptions,
          onLanguageChange: (newLang) => this.switchLanguage(newLang),
        });
        this.languageDropdown.create();
      } else {
        this.languageDropdown.update(dropdownOptions);
      }
    }
    abortCurrentTranslation() {
      if (this.currentAbortController) {
        this.currentAbortController.abort();
        this.currentAbortController = null;
      }
    }
    async restoreToSourceLanguage() {
      var _a;
      (_a = this.observer) == null ? void 0 : _a.stop();
      document
        .querySelectorAll(`[${ATTRIBUTES.SOURCE_TEXT}]`)
        .forEach((element) => {
          const sourceText = element.getAttribute(ATTRIBUTES.SOURCE_TEXT);
          const childNodes = Array.from(element.childNodes);
          const textNode = childNodes.find(
            (node) => node.nodeType === Node.TEXT_NODE
          );
          if (sourceText && textNode) {
            textNode.textContent = sourceText;
            clearTranslatedText(textNode);
          }
          element.removeAttribute(ATTRIBUTES.TRANSLATED_TO);
          element.removeAttribute(ATTRIBUTES.TRANSLATION_STATE);
        });
      document
        .querySelectorAll(`[${ATTRIBUTES.TRANSLATED_TO}]`)
        .forEach((element) => {
          const attributesToRemove = [];
          for (let i = 0; i < element.attributes.length; i++) {
            const attr = element.attributes[i];
            if (attr.name.startsWith(ATTRIBUTES.SOURCE_ATTRIBUTE_PREFIX)) {
              const originalAttrName = attr.name.substring(
                ATTRIBUTES.SOURCE_ATTRIBUTE_PREFIX.length
              );
              element.setAttribute(originalAttrName, attr.value);
              attributesToRemove.push(attr.name);
            }
          }
          attributesToRemove.forEach((attrName) =>
            element.removeAttribute(attrName)
          );
          element.removeAttribute(ATTRIBUTES.TRANSLATED_TO);
          element.removeAttribute(ATTRIBUTES.TRANSLATION_STATE);
          clearTranslatedAttribute(element);
        });
      document
        .querySelectorAll(`[${ATTRIBUTES.TRANSLATION_STATE}]`)
        .forEach((element) => {
          element.removeAttribute(ATTRIBUTES.TRANSLATION_STATE);
        });
      if (this.originalTitle) {
        document.title = this.originalTitle;
      }
      const meta = document.querySelector('meta[name="description"]');
      if (meta && this.originalDescription) {
        meta.content = this.originalDescription;
      }
      this.translatedLabels = void 0;
    }
    applyTranslatedTextNodes(translatedTexts, nodeMap, targetLang) {
      translatedTexts.forEach((translatedText, index) => {
        var _a, _b;
        const originalNode = nodeMap.get(index);
        if (!originalNode || !originalNode.parentElement) return;
        const parentElement = originalNode.parentElement;
        const originalText =
          parentElement.getAttribute(ATTRIBUTES.SOURCE_TEXT) || "";
        if (!parentElement.hasAttribute(ATTRIBUTES.SOURCE_TEXT)) {
          parentElement.setAttribute(
            ATTRIBUTES.SOURCE_TEXT,
            originalNode.textContent || ""
          );
        }
        parentElement.setAttribute(ATTRIBUTES.TRANSLATION_STATE, "translated");
        parentElement.setAttribute(ATTRIBUTES.TRANSLATED_TO, targetLang);
        const currentSourceText =
          parentElement.getAttribute(ATTRIBUTES.SOURCE_TEXT) || "";
        const trimmedTranslated = translatedText.trim();
        setTranslatedText(originalNode, trimmedTranslated);
        if (currentSourceText.trim() !== trimmedTranslated) {
          const leadingWs =
            ((_a = originalText.match(/^\s+/)) == null ? void 0 : _a[0]) || "";
          const trailingWs =
            ((_b = originalText.match(/\s+$/)) == null ? void 0 : _b[0]) || "";
          originalNode.textContent = `${leadingWs}${trimmedTranslated}${trailingWs}`;
        }
      });
      const config = this.configManager.getTranslationConfig();
      if (config) {
        DomUtils.updateCanonicalUrl(targetLang, config.defaultLang);
      }
    }
    async translatePage(targetLang) {
      this.abortCurrentTranslation();
      this.setTranslating(true);
      const config = this.configManager.getTranslationConfig();
      if (!config) {
        console.error("❌ No config available for translation");
        this.setTranslating(false);
        return;
      }
      if (targetLang === config.defaultLang) {
        this.setTranslating(false);
        return this.restoreToSourceLanguage();
      }
      const { textNodes, nodeMap, attributeTexts, attributeMap } =
        TextExtractor.extractFreshContentForLanguage(
          document,
          targetLang,
          (text) =>
            TextExtractor.isJsonString(text) ||
            TextExtractor.isUnwantedContent(text)
        );
      let dropdownLabels = [];
      let dropdownLabelKeys = [];
      if (config) {
        const allLangs = /* @__PURE__ */ new Set([
          ...config.targetLanguages,
          config.defaultLang,
        ]);
        dropdownLabelKeys = Array.from(allLangs).filter(
          (key) => config.languageLabels[key]
        );
        dropdownLabels = dropdownLabelKeys.map(
          (key) => config.languageLabels[key]
        );
      }
      if (!this.originalTitle) {
        this.originalTitle = document.title;
      }
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc && !this.originalDescription) {
        this.originalDescription = metaDesc.content;
      }
      const metadata = MetadataUtils.collectMetadata();
      const metadataTexts = metadata.map(([, value]) => value);
      if (
        textNodes.length === 0 &&
        metadataTexts.length === 0 &&
        attributeTexts.length === 0
      ) {
        this.setTranslating(false);
        return;
      }
      const skeletonMap = /* @__PURE__ */ new Map();
      nodeMap.forEach((node, _key) => {
        const parentElement = node.parentElement;
        if (
          parentElement &&
          !parentElement.hasAttribute(ATTRIBUTES.SOURCE_TEXT)
        ) {
          const originalText = node.textContent || "";
          parentElement.setAttribute(ATTRIBUTES.SOURCE_TEXT, originalText);
        }
      });
      nodeMap.forEach((node, key) => {
        const skeleton = SkeletonManager.apply(node);
        if (skeleton) {
          skeletonMap.set(key, skeleton);
        }
      });
      try {
        const translationConfig = this.configManager.getTranslationConfig();
        const apiConfig = this.configManager.getApiConfig();
        if (!translationConfig || !apiConfig) {
          console.error("❌ No config available for translation");
          this.setTranslating(false);
          return;
        }
        const translateConfig = {
          targetLanguage: targetLang,
          sourceLanguage: translationConfig.defaultLang,
          websiteId: translationConfig.websiteId,
        };
        this.currentAbortController = new AbortController();
        const pageContext = PageContextCollector.collectPageContext();
        const fullTextNodes = [
          ...textNodes,
          ...attributeTexts,
          ...metadataTexts,
        ];
        const response = await this.apiService.translateTextBased({
          textNodes: fullTextNodes,
          translateConfig,
          apiConfig,
          dropdownLabels,
          pageContext,
          abortSignal: this.currentAbortController.signal,
        });
        skeletonMap.forEach((skeleton) => {
          SkeletonManager.remove(skeleton);
        });
        const translatedFullNodes = response.translatedTextNodes || [];
        const translatedDropdownLabels =
          response.translatedDropdownLabels || [];
        const translatedTextNodes = translatedFullNodes.slice(
          0,
          textNodes.length
        );
        const translatedAttributeTexts = translatedFullNodes.slice(
          textNodes.length,
          textNodes.length + attributeTexts.length
        );
        const translatedMetadataTexts = translatedFullNodes.slice(
          textNodes.length + attributeTexts.length
        );
        this.applyTranslatedTextNodes(translatedTextNodes, nodeMap, targetLang);
        this.applyTranslatedAttributes(
          translatedAttributeTexts,
          attributeMap,
          targetLang
        );
        const translatedMetadata = metadata.map(([key], i) => [
          key,
          translatedMetadataTexts[i] || "",
        ]);
        MetadataUtils.applyMetadata(translatedMetadata);
        document.documentElement.lang = targetLang;
        const translatedDropdownLabelsMap = {};
        dropdownLabelKeys.forEach((key, i) => {
          if (translatedDropdownLabels[i]) {
            translatedDropdownLabelsMap[key] = translatedDropdownLabels[i];
          }
        });
        this.translatedLabels = translatedDropdownLabelsMap;
        this.updateLanguageDropdown(translatedDropdownLabelsMap);
        this.setTranslating(false);
      } catch (error) {
        skeletonMap.forEach((skeleton) => {
          SkeletonManager.remove(skeleton);
        });
        if (ApiService.isAbortError(error)) {
          this.setTranslating(false);
          return;
        }
        console.error("❌ Text translation failed:", error);
        this.setTranslating(false);
        throw error;
      } finally {
        this.currentAbortController = null;
      }
    }
    applyTranslatedAttributes(translatedAttributes, attributeMap, targetLang) {
      translatedAttributes.forEach((translatedText, index) => {
        const attributeInfo = attributeMap.get(index);
        if (!attributeInfo) return;
        const { element, attribute } = attributeInfo;
        const sourceAttributeName = `${ATTRIBUTES.SOURCE_ATTRIBUTE_PREFIX}${attribute}`;
        const originalText = element.getAttribute(attribute) || "";
        if (!element.hasAttribute(sourceAttributeName)) {
          element.setAttribute(sourceAttributeName, originalText);
        }
        element.setAttribute(ATTRIBUTES.TRANSLATION_STATE, "translated");
        element.setAttribute(ATTRIBUTES.TRANSLATED_TO, targetLang);
        const trimmedTranslated = translatedText.trim();
        setTranslatedAttribute(element, attribute, trimmedTranslated);
        if (originalText.trim() !== trimmedTranslated) {
          element.setAttribute(attribute, trimmedTranslated);
        }
      });
    }
    async translateBatch(payload) {
      const { texts, textMap, attributeTexts, attributeMap } = payload;
      if (texts.length === 0 && attributeTexts.length === 0) return;
      textMap.forEach((node, index) => {
        const parent = node.parentElement;
        if (parent && !parent.hasAttribute(ATTRIBUTES.SOURCE_TEXT)) {
          parent.setAttribute(ATTRIBUTES.SOURCE_TEXT, texts[index]);
        }
      });
      attributeMap.forEach(({ element, attribute }, index) => {
        const sourceAttributeName = `${ATTRIBUTES.SOURCE_ATTRIBUTE_PREFIX}${attribute}`;
        if (!element.hasAttribute(sourceAttributeName)) {
          element.setAttribute(sourceAttributeName, attributeTexts[index]);
        }
      });
      textMap.forEach((node) => {
        var _a;
        (_a = node.parentElement) == null
          ? void 0
          : _a.setAttribute(ATTRIBUTES.TRANSLATION_STATE, "translating");
      });
      attributeMap.forEach(({ element }) => {
        element.setAttribute(ATTRIBUTES.TRANSLATION_STATE, "translating");
      });
      const apiConfig = this.configManager.getApiConfig();
      const translationConfig = this.configManager.getTranslationConfig();
      if (!apiConfig || !translationConfig) return;
      if (this.configManager.isInDefaultLanguage()) {
        textMap.forEach((n) => {
          queued.delete(n);
          translated.add(n);
        });
        attributeMap.forEach(({ element }) => {
          queued.delete(element);
          translated.add(element);
        });
        return;
      }
      const skeletonMap = /* @__PURE__ */ new Map();
      textMap.forEach((node, key) => {
        const skeleton = SkeletonManager.apply(node);
        if (skeleton) {
          skeletonMap.set(key, skeleton);
        }
      });
      const translateCfg = {
        targetLanguage: this.configManager.getCurrentLanguage(),
        sourceLanguage: translationConfig.defaultLang,
        websiteId: translationConfig.websiteId,
      };
      try {
        const allTexts = [...texts, ...attributeTexts];
        const resp = await this.apiService.translateTextBased({
          textNodes: allTexts,
          translateConfig: translateCfg,
          apiConfig,
          dropdownLabels: [],
          pageContext: PageContextCollector.collectPageContext(),
        });
        const allTranslated = resp.translatedTextNodes || [];
        const translatedTexts = allTranslated.slice(0, texts.length);
        const translatedAttributes = allTranslated.slice(texts.length);
        skeletonMap.forEach((skeleton) => {
          SkeletonManager.remove(skeleton);
        });
        this.applyTranslatedTextNodes(
          translatedTexts,
          textMap,
          translateCfg.targetLanguage
        );
        this.applyTranslatedAttributes(
          translatedAttributes,
          attributeMap,
          translateCfg.targetLanguage
        );
        textMap.forEach((n) => {
          queued.delete(n);
          translated.add(n);
        });
        attributeMap.forEach(({ element }) => {
          queued.delete(element);
          translated.add(element);
        });
      } catch (error) {
        console.error("❌ translateBatch failed:", error);
        textMap.forEach((node) => {
          var _a;
          (_a = node.parentElement) == null
            ? void 0
            : _a.removeAttribute(ATTRIBUTES.TRANSLATION_STATE);
        });
        attributeMap.forEach(({ element }) => {
          element.removeAttribute(ATTRIBUTES.TRANSLATION_STATE);
        });
        skeletonMap.forEach((skeleton) => SkeletonManager.remove(skeleton));
      }
    }
    async switchLanguage(newLang) {
      var _a;
      if (newLang === this.configManager.getCurrentLanguage()) return;
      const config = this.configManager.getTranslationConfig();
      if (!config) {
        console.error("❌ No configuration available");
        return;
      }
      if (newLang === config.defaultLang) {
        this.configManager.setCurrentLanguage(newLang);
        window.location.reload();
        return;
      }
      try {
        const previousLang = this.configManager.getCurrentLanguage();
        this.abortCurrentTranslation();
        (_a = this.observer) == null ? void 0 : _a.stop();
        this.configManager.setCurrentLanguage(newLang);
        this.setTranslating(true);
        await this.restoreToSourceLanguage();
        await this.translatePage(newLang);
        applyDirection(newLang);
        this.updateLanguageDropdown(this.translatedLabels);
        this.startObserver();
      } catch (e) {
        console.error("❌ Switch language failed:", e);
        if (e instanceof Error) {
          if (e.message === "NETWORK_ERROR") {
            ErrorHandler.showErrorMessage(
              "network",
              "Failed to switch language. Please check your connection."
            );
          } else if (e.message === "RATE_LIMIT") {
            ErrorHandler.showErrorMessage(
              "rate-limit",
              "Too many requests. Please try again later."
            );
          } else {
            ErrorHandler.showErrorMessage(
              "server",
              "Failed to switch language. Please try again."
            );
          }
        }
        const configAfter = this.configManager.getTranslationConfig();
        configAfter == null ? void 0 : configAfter.defaultLang;
        this.setTranslating(false);
        this.updateLanguageDropdown();
        this.startObserver();
      }
    }
    clearMetadataSourceAttributes() {
      this.originalTitle = null;
      this.originalDescription = null;
    }
    clearTranslationAttributes() {
      document
        .querySelectorAll(`[${ATTRIBUTES.TRANSLATED_TO}]`)
        .forEach((element) => {
          element.removeAttribute(ATTRIBUTES.TRANSLATED_TO);
        });
      document
        .querySelectorAll(`[${ATTRIBUTES.TRANSLATION_STATE}]`)
        .forEach((element) => {
          element.removeAttribute(ATTRIBUTES.TRANSLATION_STATE);
        });
    }
    async waitForInitialContent() {
      await waitForDomToSettle(document.body);
    }
    async initialize() {
      var _a;
      if (!SCRIPT_CONFIG.apiKey) {
        console.error("❌ No API key provided");
        ErrorHandler.showErrorMessage(
          "auth",
          "Translation service not configured. Missing API key."
        );
        return;
      }
      if (!SCRIPT_CONFIG.domain) {
        console.error("❌ No domain provided");
        ErrorHandler.showErrorMessage(
          "config-invalid",
          "Translation service not configured. Missing domain."
        );
        return;
      }
      DomUtils.detectCSPViolations();
      await this.waitForDOMReady();
      await this.waitForInitialContent();
      const config = await this.configManager.initializeConfig();
      if (!config) {
        console.error("Initialization failed: No config available");
        return;
      }
      const style = document.createElement("style");
      style.textContent = `
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
        `;
      document.head.appendChild(style);
      this.updateLanguageDropdown();
      this.startObserver();
      try {
        const apiConfig = this.configManager.getApiConfig();
        if (apiConfig) {
          const ok = await this.apiService.checkRedisAvailability({
            translateConfig: {
              targetLanguage: this.configManager.getCurrentLanguage(),
              sourceLanguage: config.defaultLang,
              websiteId: config.websiteId,
            },
            apiConfig: { key: apiConfig.key, domain: apiConfig.domain },
            pageContext: PageContextCollector.collectPageContext(),
          });
          if (!ok) {
            ErrorHandler.showErrorMessage(
              "cache-unavailable",
              "Cache service not configured/available. Translation disabled until restored."
            );
            (_a = this.languageDropdown) == null
              ? void 0
              : _a.update({ disabled: true });
          }
        }
      } catch (e) {}
      if (!this.configManager.isInDefaultLanguage()) {
        const currentLang = this.configManager.getCurrentLanguage();
        const config2 = this.configManager.getTranslationConfig();
        if (currentLang === (config2 == null ? void 0 : config2.defaultLang)) {
          await this.restoreToSourceLanguage();
        } else {
          await this.translatePage(currentLang);
        }
      }
      applyDirection(this.configManager.getCurrentLanguage());
      this.navigationService.start();
      window.addEventListener("offline", () => {
        ErrorHandler.showErrorMessage(
          "offline",
          "You are now offline. Using cached translations where available."
        );
      });
      window.addEventListener("online", () => {
        ErrorHandler.clearError();
      });
      window.addEventListener("beforeunload", () => {
        this.abortCurrentTranslation();
        this.navigationService.stop();
      });
    }
    async waitForDOMReady() {
      if (document.readyState === "loading") {
        await new Promise((resolve) => {
          document.addEventListener("DOMContentLoaded", resolve);
        });
      }
    }
    async handleUrlChange() {
      this.abortCurrentTranslation();
      this.clearTranslationAttributes();
      this.clearMetadataSourceAttributes();
      await waitForDomToSettle(document.body);
      if (!this.configManager.isInDefaultLanguage()) {
        try {
          await this.translatePage(this.configManager.getCurrentLanguage());
        } catch (err) {
          console.error("❌ Translation failed during URL change:", err);
        }
      }
    }
    enqueue(element) {
      this.sender.enqueue(element);
    }
    startObserver() {
      const config = this.configManager.getTranslationConfig();
      if (!config) return;
      this.observer = new TranslationObserver(
        () => {},
        (element) => this.enqueue(element),
        this.configManager
      );
      this.observer.start();
    }
  }
  const SCRIPT_CONFIG = (() => {
    const tag = document.currentScript;
    const rawDomain =
      (tag == null ? void 0 : tag.dataset.domain) || window.location.host;
    const domain = DomUtils.normalizeDomain(rawDomain);
    const apiKey = (tag == null ? void 0 : tag.dataset.apiKey) || "";
    const theme = (tag == null ? void 0 : tag.dataset.theme) || "dark";
    const toggle =
      (tag == null ? void 0 : tag.dataset.toggle) === "yes" ||
      (tag == null ? void 0 : tag.dataset.cambToggle) === "yes";
    return { apiKey, domain, theme, toggle };
  })();
  (async () => {
    if (window.__translateDone) {
      throw "already injected";
    }
    window.__translateDone = true;
    const apiService = new ApiService();
    const configManager = new ConfigManager(apiService, SCRIPT_CONFIG);
    const translationEngine = new TextTranslationEngine(
      apiService,
      configManager
    );
    await translationEngine.initialize();
  })();
})();
//# sourceMappingURL=translator.dev.js.map
