// script.js - Toggle Dark/Light Mode

// Verifica se há preferência salva no localStorage
const savedTheme = localStorage.getItem('theme');
const body = document.body;

// Aplica o tema salvo ou padrão (dark)
if (savedTheme === 'light') {
    body.classList.add('light-mode');
}

// Função para alternar o tema
function toggleTheme() {
    body.classList.toggle('light-mode');
    const currentTheme = body.classList.contains('light-mode') ? 'light' : 'dark';
    localStorage.setItem('theme', currentTheme);
    updateButtonText();
}

// Função para atualizar o texto do botão
function updateButtonText() {
    const toggleButton = document.getElementById('theme-toggle');
    if (toggleButton) {
        const isLight = body.classList.contains('light-mode');
        toggleButton.textContent = isLight ? '☀️' : '🌙';
    }
}

const supportedLanguages = ['en', 'pt', 'es', 'fr'];

const translations = {
    pt: {
        pageTitle: 'Netflix Brasil - assistir a séries e filmes online',
        langToggleText: '🌐 PT',
        langToggleAriaLabel: 'Selecionar idioma',
        home: {
            whoIsWatching: 'Quem está assistindo?',
            manageProfiles: 'Gerenciar perfis'
        },
        language: {
            english: 'Inglês',
            portuguese: 'Português'
        }
    },
    en: {
        pageTitle: 'Netflix Brazil - watch TV shows and movies online',
        langToggleText: '🌐 EN',
        langToggleAriaLabel: 'Select language',
        home: {
            whoIsWatching: 'Who is watching?',
            manageProfiles: 'Manage profiles'
        },
        language: {
            english: 'English',
            portuguese: 'Portuguese'
        }
    }
};

function getTextByKey(language, key) {
    return key.split('.').reduce((value, currentPart) => {
        if (value && Object.prototype.hasOwnProperty.call(value, currentPart)) {
            return value[currentPart];
        }

        return null;
    }, translations[language]);
}

function renderTranslations(language) {
    const fallbackLanguage = translations[language] ? language : 'pt';

    document.title = translations[fallbackLanguage].pageTitle;

    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.textContent = translations[fallbackLanguage].langToggleText;
        langToggle.setAttribute('aria-label', translations[fallbackLanguage].langToggleAriaLabel);
    }

    const translatableElements = document.querySelectorAll('[data-i18n]');
    translatableElements.forEach((element) => {
        const key = element.getAttribute('data-i18n');
        const translatedText = getTextByKey(fallbackLanguage, key);

        if (translatedText) {
            element.textContent = translatedText;
        }
    });
}

function applyLanguage(langCode) {
    const normalizedLanguage = langCode === 'en' ? 'en' : 'pt';
    const language = supportedLanguages.includes(normalizedLanguage) ? normalizedLanguage : 'pt';
    document.documentElement.lang = language;
    localStorage.setItem('language', language);

    renderTranslations(language);

    const langButtons = document.querySelectorAll('#lang-menu button[data-lang]');
    langButtons.forEach((button) => {
        const isActive = button.dataset.lang === language;
        button.classList.toggle('active', isActive);
        button.setAttribute('aria-checked', String(isActive));
    });
}

function closeLanguageMenu() {
    const langToggle = document.getElementById('lang-toggle');
    const langMenu = document.getElementById('lang-menu');
    if (!langToggle || !langMenu) return;

    langMenu.hidden = true;
    langToggle.setAttribute('aria-expanded', 'false');
}

function openLanguageMenu() {
    const langToggle = document.getElementById('lang-toggle');
    const langMenu = document.getElementById('lang-menu');
    if (!langToggle || !langMenu) return;

    langMenu.hidden = false;
    langToggle.setAttribute('aria-expanded', 'true');
}

// Adiciona event listener ao botão de toggle
document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('theme-toggle');
    if (toggleButton) {
        toggleButton.addEventListener('click', toggleTheme);
        updateButtonText(); // Atualiza o texto inicial
    }

    const langToggle = document.getElementById('lang-toggle');
    const langMenu = document.getElementById('lang-menu');
    const langButtons = document.querySelectorAll('#lang-menu button[data-lang]');
    const savedLanguage = localStorage.getItem('language') || 'pt';

    applyLanguage(savedLanguage);

    if (langToggle && langMenu) {
        langToggle.addEventListener('click', (event) => {
            event.stopPropagation();
            const isOpen = !langMenu.hidden;

            if (isOpen) {
                closeLanguageMenu();
            } else {
                openLanguageMenu();
            }
        });

        langButtons.forEach((button) => {
            button.addEventListener('click', (event) => {
                event.stopPropagation();
                applyLanguage(button.dataset.lang);
                closeLanguageMenu();
            });
        });

        document.addEventListener('click', (event) => {
            if (!langMenu.contains(event.target) && event.target !== langToggle) {
                closeLanguageMenu();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeLanguageMenu();
            }
        });
    }
});