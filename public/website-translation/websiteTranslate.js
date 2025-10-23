import { SELECTORS } from '../constants';
import type { TranslationConfig, ThemeType } from '../types';

interface DropdownOptions {
    config: TranslationConfig;
    currentLang: string;
    theme?: ThemeType;
    onLanguageChange?: (lang: string) => void;
    translatedDropdownLabels?: Record<string, string>;
    disabled?: boolean;
    isTranslating?: boolean;
}

interface ThemeColors {
    bg: string;
    bgHover: string;
    color: string;
    border: string;
    shadow: string;
    optionBg: string;
    optionColor: string;
}

export class LanguageDropdown {
    private container: HTMLDivElement | null = null;
    private iconButton: HTMLButtonElement | null = null;
    private languageList: HTMLDivElement | null = null;
    private poweredByLink: HTMLAnchorElement | null = null;
    private isExpanded = false;
    private isDragging = false;
    private dragStartX = 0;
    private dragStartY = 0;

    constructor(private options: DropdownOptions) {}

    create(): void {
        // Remove existing dropdown if it exists
        this.remove();

        const { theme = 'dark' } = this.options;
        const style = document.createElement('style');
        style.id = SELECTORS.DROPDOWN_STYLE;
        style.textContent = this.generateCSS(theme);
        document.head.appendChild(style);
        this.createContainer();
    }

    remove(): void {
        const existing = document.getElementById(SELECTORS.DROPDOWN_CONTAINER);
        if (existing) existing.remove();

        const style = document.getElementById(SELECTORS.DROPDOWN_STYLE);
        if (style) style.remove();

        this.container = null;
        this.iconButton = null;
        this.languageList = null;
        this.poweredByLink = null;
    }

    public update(newOptions: Partial<DropdownOptions>): void {
        this.options = { ...this.options, ...newOptions };

        if (this.iconButton) {
            this.iconButton.disabled = !!this.options.isTranslating || !!this.options.disabled;

            if (this.options.isTranslating || this.options.disabled) {
                this.iconButton.setAttribute(
                    'title',
                    this.options.isTranslating ? 'Translation is in progress' : 'Translation service unavailable',
                );
            } else {
                this.iconButton.removeAttribute('title');
            }
        }
    }

    private generateCSS(theme: ThemeType): string {
        const baseColors = this.getBaseColors(theme);
        const themeColors = baseColors;

        return `
            #${SELECTORS.DROPDOWN_CONTAINER} {
                position: fixed;
                bottom: 24px;
                right: 24px;
                z-index: 2147483647;
                display: flex;
                flex-direction: column;
                align-items: center;
                background: transparent;
                transition: all 0.3s ease;
                cursor: move;
            }

            #${SELECTORS.DROPDOWN} {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: var(--tl-bg, ${themeColors.bg});
                border: var(--tl-border, ${themeColors.border});
                box-shadow: var(--tl-box-shadow, ${themeColors.shadow});
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: move;
                transition: all 0.3s ease;
                color: var(--tl-color, ${themeColors.color});
            }

            #${SELECTORS.DROPDOWN}:hover {
                transform: scale(1.05);
            }

            #${SELECTORS.DROPDOWN}:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }

            #${SELECTORS.DROPDOWN_CONTAINER} .language-list {
                display: none;
                width: 200px;
                max-height: 300px;
                overflow-y: auto;
                background: var(--tl-bg, ${themeColors.bg});
                border-radius: 8px;
                box-shadow: var(--tl-box-shadow, ${themeColors.shadow});
                padding: 10px 0;
                position: fixed;
                z-index: 2147483648; /* Ensure it's above other elements */
            }

            #${SELECTORS.DROPDOWN_CONTAINER}.expanded .language-list {
                display: block;
            }

            #${SELECTORS.DROPDOWN_CONTAINER} .language-list .language-option {
                padding: var(--tl-option-padding, 8px 12px);
                cursor: pointer;
                transition: background-color 0.2s ease;
                color: var(--tl-color, ${themeColors.color});
                font-size: var(--tl-option-font-size, 12px);
                font-weight: var(--tl-option-font-weight, 400);
                font-family: var(--tl-option-font-family, inherit);
                line-height: var(--tl-option-line-height, 1.3);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            #${SELECTORS.DROPDOWN_CONTAINER} .language-list .language-option:hover {
                background-color: var(--tl-bg-hover, ${themeColors.bgHover});
            }

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

            #${SELECTORS.DROPDOWN_CONTAINER}.expanded #${SELECTORS.POWERED_BY} {
                display: flex;
                padding: var(--tl-mobile-powered-padding, 4px 6px) !important;
            }

            #${SELECTORS.POWERED_BY}:hover {
                background: var(--tl-powered-bg-hover, rgba(0,0,0,0.08)) !important;
            }
        `;
    }

    private getBaseColors(theme: ThemeType): ThemeColors {
        return theme === 'light'
            ? {
                  bg: '#ffffff',
                  bgHover: '#f5f5f5',
                  color: '#333333',
                  border: '1px solid #e0e0e0',
                  shadow: '0 2px 8px rgba(0,0,0,0.1)',
                  optionBg: '#ffffff',
                  optionColor: '#333333',
              }
            : {
                  bg: '#333333',
                  bgHover: '#555555',
                  color: '#ffffff',
                  border: 'none',
                  shadow: '0 2px 8px rgba(0,0,0,0.3)',
                  optionBg: '#333333',
                  optionColor: '#ffffff',
              };
    }

    private capitalizeLabel(label: string): string {
        // Simple HTML escaping function
        const escapeHtml = (unsafe: string): string => {
            return unsafe
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#039;');
        };

        const escapedLabel = escapeHtml(label);

        const parts = escapedLabel.split('(');

        const beforeParen = parts[0]
            .trim()
            .split(' ')
            .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');

        if (parts.length === 1) return beforeParen;

        const insideParen = parts[1]
            .replace(')', '')
            .trim()
            .split(' ')
            .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');

        return `${beforeParen} (${insideParen})`;
    }

    private createContainer(): void {
        this.container = document.createElement('div');
        this.container.id = SELECTORS.DROPDOWN_CONTAINER;
        this.container.setAttribute('data-no-translate', 'true');

        // Create translation icon button (language icon)
        this.iconButton = document.createElement('button');
        this.iconButton.id = SELECTORS.DROPDOWN;
        this.iconButton.setAttribute('data-no-translate', 'true');
        this.iconButton.innerHTML = `
            <svg width="20px" height="20px" viewBox="0 0 24 24" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><defs><style>.cls-1{fill:none;stroke:#ffffff;stroke-miterlimit:10;stroke-width:1.92px;}</style></defs><line class="cls-1" x1="0.5" y1="3.35" x2="12" y2="3.35"></line><line class="cls-1" x1="6.25" y1="0.48" x2="6.25" y2="3.35"></line><path class="cls-1" d="M9.12,3.35c0,3.52-3.28,8.2-7.66,10.55"></path><path class="cls-1" d="M4.51,7.37A16.4,16.4,0,0,0,11,13.9"></path><polyline class="cls-1" points="12.96 22.52 16.79 11.98 17.75 11.98 21.58 22.52"></polyline><line class="cls-1" x1="20.43" y1="18.69" x2="15.07" y2="18.69"></line><line class="cls-1" x1="11.04" y1="22.52" x2="14.88" y2="22.52"></line><line class="cls-1" x1="19.67" y1="22.52" x2="23.5" y2="22.52"></line></g></svg>
        `; // Language icon (stylized)

        // Add drag event listeners to the button itself
        this.iconButton.addEventListener('mousedown', this.handleMouseDown);
        this.iconButton.addEventListener('click', this.toggleLanguageList);

        // Create language list
        this.languageList = document.createElement('div');
        this.languageList.classList.add('language-list');

        // Create powered by link
        this.createPoweredByLink();

        // Populate language list
        this.populateLanguageList();

        // Append elements
        this.container.appendChild(this.iconButton);
        this.container.appendChild(this.languageList);

        // Apply stored position if exists
        this.restorePosition();

        // Handle disabled state
        if (this.options.isTranslating || this.options.disabled) {
            this.iconButton.disabled = true;
            this.iconButton.setAttribute(
                'title',
                this.options.isTranslating ? 'Translation is in progress' : 'Translation service unavailable',
            );
        }

        // Add global mouse event listeners for dragging
        document.addEventListener('mousemove', this.handleMouseMove);
        document.addEventListener('mouseup', this.handleMouseUp);

        // Setup resize handler
        this.setupResizeHandler();

        document.body.appendChild(this.container);
    }

    private handleMouseDown = (e: MouseEvent): void => {
        // Prevent dragging if the language list is open or if disabled
        if (this.isExpanded || this.options.isTranslating || this.options.disabled) return;

        if (!this.container) return;

        // Prevent dragging if clicking on an interactive element
        const target = e.target as HTMLElement;
        const isInteractiveElement = target.closest('svg, path') !== null;
        if (isInteractiveElement) return;

        this.isDragging = true;
        this.container.style.cursor = 'grabbing';

        // Store the initial mouse position relative to the container
        const rect = this.container.getBoundingClientRect();
        this.dragStartX = e.clientX - rect.left;
        this.dragStartY = e.clientY - rect.top;

        e.preventDefault();
    };

    private handleMouseMove = (e: MouseEvent): void => {
        // Prevent dragging if the language list is open
        if (!this.isDragging || this.isExpanded || !this.container) return;

        // Calculate new position based on mouse movement
        const x = e.clientX - this.dragStartX;
        const y = e.clientY - this.dragStartY;

        const clamped = this.constrainToViewport(x, y);

        this.container.style.left = `${clamped.x}px`;
        this.container.style.top = `${clamped.y}px`;
        this.container.style.right = 'auto';
        this.container.style.bottom = 'auto';
    };

    private handleMouseUp = (): void => {
        if (!this.isDragging) return;

        this.isDragging = false;
        if (this.container) {
            this.container.style.cursor = 'move';
            this.savePosition({
                x: parseInt(this.container.style.left, 10),
                y: parseInt(this.container.style.top, 10),
            });
        }
    };

    private constrainToViewport(x: number, y: number): { x: number; y: number } {
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

    private restorePosition(): void {
        if (!this.container) return;

        const position = this.loadPosition();

        if (position) {
            this.container.style.left = position.x + 'px';
            this.container.style.top = position.y + 'px';
            this.container.style.right = 'auto';
            this.container.style.bottom = 'auto';
        }
    }

    // Local storage methods
    private savePosition(position: { x: number; y: number }): void {
        try {
            localStorage.setItem('camb_dropdown_position', JSON.stringify(position));
        } catch (error) {
            console.error('Failed to save dropdown position', error);
        }
    }

    private loadPosition(): { x: number; y: number } | null {
        try {
            const positionStr = localStorage.getItem('camb_dropdown_position');
            return positionStr ? JSON.parse(positionStr) : null;
        } catch (error) {
            console.error('Failed to load dropdown position', error);
            return null;
        }
    }

    private toggleLanguageList = (_e: MouseEvent): void => {
        if (!this.container || this.options.isTranslating || this.options.disabled) return;

        // Prevent toggling if dragging
        if (this.isDragging) {
            this.isDragging = false;
            return;
        }

        this.isExpanded = !this.isExpanded;
        this.container.classList.toggle('expanded', this.isExpanded);

        if (this.isExpanded && this.container && this.languageList) {
            this.positionLanguageList();
        }
    };

    private positionLanguageList = (): void => {
        if (!this.container || !this.languageList) return;

        // Get button and list dimensions
        const buttonRect = this.container.getBoundingClientRect();
        const listWidth = 200; // Matches CSS width
        const listHeight = this.languageList.offsetHeight;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Determine horizontal positioning
        let left: number;
        const screenHalf = viewportWidth / 2;
        if (buttonRect.left > screenHalf) {
            // Button is on the right side of the screen, open list to the left
            left = buttonRect.left - listWidth - 10; // 10px margin
        } else {
            // Button is on the left side of the screen, open list to the right
            left = buttonRect.right + 10; // 10px margin
        }

        // Determine vertical positioning
        let top: number;
        const buttonCenterY = buttonRect.top + buttonRect.height / 2;
        top = buttonCenterY - listHeight / 2;

        // Ensure list stays within viewport
        left = Math.max(10, Math.min(left, viewportWidth - listWidth - 10));
        top = Math.max(10, Math.min(top, viewportHeight - listHeight - 10));

        // Apply positioning
        this.languageList.style.position = 'fixed';
        this.languageList.style.left = `${left}px`;
        this.languageList.style.top = `${top}px`;
    };

    private populateLanguageList(): void {
        if (!this.languageList) return;

        const { config, currentLang, translatedDropdownLabels = {} } = this.options;

        const sourceLanguage = config.defaultLang;
        const available = new Set([...config.targetLanguages, sourceLanguage].filter(Boolean));
        const availableLanguages = Array.from(available).filter((l) => config.languageLabels[l]);

        const allLanguages = [];
        if (currentLang !== sourceLanguage) {
            if (sourceLanguage && config.languageLabels[sourceLanguage]) {
                allLanguages.push(sourceLanguage, currentLang);
            }
        } else {
            // otherwise, show all languages (source first, then others)
            if (sourceLanguage && config.languageLabels[sourceLanguage]) {
                allLanguages.push(sourceLanguage);
            }
            availableLanguages.forEach((l) => {
                if (l !== sourceLanguage) {
                    allLanguages.push(l);
                }
            });
        }

        this.languageList.innerHTML = '';

        allLanguages.forEach((l) => {
            const option = document.createElement('div');
            option.classList.add('language-option');
            option.setAttribute('data-lang', l);
            option.setAttribute('data-no-translate', 'true');

            const rawLabel = translatedDropdownLabels[l] || config.languageLabels[l];
            const displayName = this.capitalizeLabel(rawLabel);
            option.textContent = displayName;

            if (l === currentLang) {
                option.classList.add('selected');
            }

            option.addEventListener('click', () => {
                this.options.onLanguageChange?.(l);
                this.toggleLanguageList(new MouseEvent('click'));
            });

            this.languageList?.appendChild(option);
        });

        // Add powered by link to the bottom of the language list
        if (this.poweredByLink) {
            this.languageList.appendChild(this.poweredByLink);
        }
    }

    private createPoweredByLink(): void {
        this.poweredByLink = document.createElement('a');
        this.poweredByLink.id = SELECTORS.POWERED_BY;
        this.poweredByLink.href = 'https://camb.ai';
        this.poweredByLink.target = '_blank';
        this.poweredByLink.rel = 'noopener noreferrer';
        this.poweredByLink.setAttribute('data-no-translate', 'true');

        const text = document.createElement('span');
        text.textContent = 'Powered by CAMB.AI';
        text.setAttribute('data-no-translate', 'true');

        this.poweredByLink.appendChild(text);
    }

    // Add method to handle window resize to reposition list if open
    private setupResizeHandler(): void {
        const resizeHandler = () => {
            if (this.isExpanded) {
                this.positionLanguageList();
            }
        };

        window.addEventListener('resize', resizeHandler);
    }
}
