// ========================================
// 1. ПОЛУЧАЕМ ЭЛЕМЕНТЫ ЧЕРЕЗ DOM
// ========================================

// Метод getElementById - получаем элемент по ID
const previewText = document.getElementById('previewText');
const currentThemeDisplay = document.getElementById('currentTheme');
const currentFontDisplay = document.getElementById('currentFont');

// Метод querySelector - получаем первый элемент по селектору
const app = document.querySelector('.app');

// Метод querySelectorAll - получаем все элементы по селектору
const themeButtons = document.querySelectorAll('.theme-btn');
const fontButtons = document.querySelectorAll('.font-btn');

// ========================================
// 2. НАСТРОЙКИ ПО УМОЛЧАНИЮ
// ========================================

const themes = {
    light: { name: 'Светлая', class: 'light' },
    dark: { name: 'Тёмная', class: 'dark' },
    neon: { name: 'Неоновая', class: 'neon' }
};

const fonts = {
    sans: { name: 'Sans-Serif', class: 'font-sans' },
    serif: { name: 'Serif', class: 'font-serif' },
    mono: { name: 'Monospace', class: 'font-mono' }
};

// Текущие настройки
let currentTheme = 'light';
let currentFont = 'sans';

// ========================================
// 3. РАБОТА С LOCALSTORAGE
// ========================================

// Сохраняем настройки
function saveSettings() {
    const settings = {
        theme: currentTheme,
        font: currentFont
    };
    localStorage.setItem('themeSettings', JSON.stringify(settings));
}

// Загружаем настройки
function loadSettings() {
    try {
        const saved = localStorage.getItem('themeSettings');
        if (saved) {
            const settings = JSON.parse(saved);
            currentTheme = settings.theme || 'light';
            currentFont = settings.font || 'sans';
            return true;
        }
    } catch (e) {
        console.error('Ошибка загрузки:', e);
    }
    return false;
}

// ========================================
// 4. ПРИМЕНЕНИЕ НАСТРОЕК
// ========================================

// Применяем тему
function applyTheme(theme) {
    // Удаляем все классы тем
    document.body.classList.remove('light', 'dark', 'neon');
    
    // Добавляем нужный класс
    document.body.classList.add(themes[theme].class);
    
    // Обновляем отображение
    currentThemeDisplay.textContent = themes[theme].name;
    
    // Обновляем активные кнопки
    themeButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.theme === theme) {
            btn.classList.add('active');
        }
    });
}

// Применяем шрифт
function applyFont(font) {
    // Удаляем все классы шрифтов
    document.body.classList.remove('font-sans', 'font-serif', 'font-mono');
    
    // Добавляем нужный класс
    document.body.classList.add(fonts[font].class);
    
    // Обновляем отображение
    currentFontDisplay.textContent = fonts[font].name;
    
    // Обновляем активные кнопки
    fontButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.font === font) {
            btn.classList.add('active');
        }
    });
}

// ========================================
// 5. ПРИМЕР СОЗДАНИЯ ЭЛЕМЕНТОВ
// ========================================

function showExampleOfDOMCreation() {
    // Создаём новый элемент через createElement
    const newDiv = document.createElement('div');
    newDiv.className = 'example-note';
    newDiv.style.padding = '10px';
    newDiv.style.marginTop = '15px';
    newDiv.style.borderRadius = '8px';
    newDiv.style.background = '#f0f2f5';
    newDiv.style.fontSize = '13px';
    newDiv.style.color = '#666';
    newDiv.textContent = ' Пример: этот элемент создан через createElement и добавлен через appendChild';
    
    // Находим контейнер через querySelector
    const container = document.querySelector('.current-settings');
    
    // Добавляем элемент через appendChild
    container.appendChild(newDiv);
}

// ========================================
// 6. ИНИЦИАЛИЗАЦИЯ
// ========================================

function init() {
    console.log(' Запуск переключателя темы и шрифта');
    
    // Загружаем сохранённые настройки
    const hasSaved = loadSettings();
    
    if (hasSaved) {
        console.log(' Загружены настройки из localStorage');
        console.log(`Тема: ${currentTheme}, Шрифт: ${currentFont}`);
    } else {
        console.log(' Используются настройки по умолчанию');
    }
    
    // Применяем настройки
    applyTheme(currentTheme);
    applyFont(currentFont);
    
    // === ОБРАБОТЧИКИ СОБЫТИЙ ===
    
    // Кнопки тем
    themeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const theme = this.dataset.theme;
            currentTheme = theme;
            applyTheme(theme);
            saveSettings();
            console.log(` Тема изменена на: ${themes[theme].name}`);
        });
    });
    
    // Кнопки шрифтов
    fontButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const font = this.dataset.font;
            currentFont = font;
            applyFont(font);
            saveSettings();
            console.log(` Шрифт изменён на: ${fonts[font].name}`);
        });
    });
    
    // Показываем пример работы с DOM
    showExampleOfDOMCreation();
    
    console.log(' Приложение готово!');
    console.log(` Текущие настройки: Тема = ${currentTheme}, Шрифт = ${currentFont}`);
}

// ========================================
// 7. ЗАПУСК ПРИЛОЖЕНИЯ
// ========================================

// Ждём полной загрузки DOM
document.addEventListener('DOMContentLoaded', init);