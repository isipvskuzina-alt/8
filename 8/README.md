1. ИСПОЛЬЗОВАНИЕ ТЕГА <script> В HTML
📌 Где размещать <script>
html
<!DOCTYPE html>
<html>
<head>
    <!-- ❌ ПЛОХО: в head (блокирует загрузку страницы) -->
    <script src="script.js"></script>
</head>
<body>
    <!-- Контент -->
    
    <!-- ✅ ХОРОШО: перед закрытием body -->
    <script src="script.js"></script>
    
    <!-- ✅ ЛУЧШЕ: с атрибутом defer -->
    <script src="script.js" defer></script>
</body>
</html>
📌 Атрибуты тега <script>
Атрибут	Что делает
src	Путь к внешнему JS файлу
defer	Загружается параллельно, выполняется после загрузки DOM
async	Загружается параллельно, выполняется сразу после загрузки
type	Тип скрипта (по умолчанию text/javascript)
html
<!-- Внешний скрипт -->
<script src="script.js"></script>

<!-- С отложенным выполнением -->
<script src="script.js" defer></script>

<!-- Асинхронный -->
<script src="script.js" async></script>

<!-- Встроенный скрипт -->
<script>
    console.log('Привет!');
</script>

<!-- Модуль (ES6) -->
<script type="module" src="app.js"></script>
📌 Зачем нужен <script>
Добавляет интерактивность - обработка кликов, ввода

Работает с DOM - меняет содержимое страницы

Валидирует формы - проверяет ввод

Отправляет запросы - fetch, AJAX

Создаёт анимации - движение элементов

Хранит данные - localStorage, cookies

📌 Лучшие практики
html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Страница</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- Содержимое страницы -->
    
    <!-- 1. Скрипты в конце body -->
    <script src="script.js"></script>
    
    <!-- 2. Или с defer -->
    <script src="script.js" defer></script>
    
    <!-- 3. Встроенный скрипт (если нужно) -->
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            console.log('DOM загружен!');
        });
    </script>
</body>
</html>

2. РАБОТА С DOM
📌 getElementById - поиск по ID
javascript
// Получаем элемент по уникальному ID
const title = document.getElementById('main-title');
const input = document.getElementById('user-input');

// Изменяем содержимое
title.textContent = 'Новый заголовок';
input.value = 'Привет!';
Особенности:

❗ ID должен быть уникальным на странице

Возвращает один элемент

Быстрый поиск

📌 querySelector - поиск по CSS селектору
javascript
// По классу (первый элемент)
const card = document.querySelector('.card');

// По ID
const header = document.querySelector('#header');

// По тегу (первый)
const firstButton = document.querySelector('button');

// По атрибуту
const themeBtn = document.querySelector('[data-theme="dark"]');

// Вложенный селектор
const input = document.querySelector('form input');
Особенности:

Возвращает первый подходящий элемент

Использует CSS селекторы

Очень гибкий

📌 querySelectorAll - поиск всех элементов
javascript
// Все элементы с классом
const cards = document.querySelectorAll('.card');

// Все кнопки
const buttons = document.querySelectorAll('button');

// Все элементы с атрибутом
const themeBtns = document.querySelectorAll('[data-theme]');

// Перебор всех элементов
cards.forEach(card => {
    card.style.background = 'blue';
});

// Превращаем в массив
const array = Array.from(cards);
Особенности:

Возвращает все подходящие элементы

Результат - NodeList (можно перебирать через forEach)

Использует CSS селекторы

📌 createElement - создание элемента
javascript
// Создаём новый элемент
const div = document.createElement('div');
const p = document.createElement('p');
const button = document.createElement('button');

// Настраиваем
div.className = 'container';
p.textContent = 'Новый текст';
button.textContent = 'Нажми меня';

// Добавляем атрибуты
button.setAttribute('data-id', '123');
button.style.color = 'red';
Особенности:

Создаёт элемент в памяти (не на странице)

Нужно добавить через appendChild

Можно настраивать перед добавлением

📌 appendChild - добавление элемента
javascript
// Находим родителя
const parent = document.querySelector('.container');

// Создаём дочерний элемент
const child = document.createElement('p');
child.textContent = 'Новый параграф';

// Добавляем в конец родителя
parent.appendChild(child);

// Добавляем несколько элементов
const list = document.getElementById('list');
['Пункт 1', 'Пункт 2', 'Пункт 3'].forEach(text => {
    const li = document.createElement('li');
    li.textContent = text;
    list.appendChild(li);
});
Особенности:

Добавляет элемент в конец родителя

Если элемент уже есть - перемещает

Возвращает добавленный элемент

📋 Шпаргалка по методам DOM
Метод	Что делает	Возвращает
getElementById('id')	Поиск по ID	Один элемент
querySelector('.class')	Поиск по селектору	Один элемент
querySelectorAll('.class')	Поиск по селектору	Все элементы
createElement('div')	Создание элемента	Новый элемент
appendChild(element)	Добавление элемента	Добавленный элемент
📋 Полный пример
javascript
// ===== 1. ПОИСК ЭЛЕМЕНТОВ =====
// По ID
const app = document.getElementById('app');

// По классу (первый)
const title = document.querySelector('.title');

// Все карточки
const cards = document.querySelectorAll('.card');

// ===== 2. СОЗДАНИЕ ЭЛЕМЕНТОВ =====
const newCard = document.createElement('div');
const newTitle = document.createElement('h3');
const newText = document.createElement('p');

// ===== 3. НАСТРОЙКА =====
newCard.className = 'card';
newTitle.textContent = 'Заголовок';
newText.textContent = 'Текст карточки';

// ===== 4. ДОБАВЛЕНИЕ =====
newCard.appendChild(newTitle);
newCard.appendChild(newText);
app.appendChild(newCard);

// ===== 5. ИЗМЕНЕНИЕ СУЩЕСТВУЮЩИХ =====
cards.forEach(card => {
    card.style.background = '#f0f2f5';
    card.style.padding = '20px';
});
📋 Правила хорошего тона
javascript
// ✅ ХОРОШО: используем querySelector
const btn = document.querySelector('.btn');

// ✅ ХОРОШО: используем getElementById для ID
const header = document.getElementById('header');

// ❌ ПЛОХО: используем document.write (перезаписывает страницу)
document.write('Текст');

// ✅ ХОРОШО: создаём через DOM
const div = document.createElement('div');
div.textContent = 'Текст';
document.body.appendChild(div);

// ✅ ХОРОШО: сохраняем ссылки на элементы
const container = document.querySelector('.container');
const items = container.querySelectorAll('.item');
🎯 Краткий итог
<script> в HTML
Ставьте перед </body>

Используйте defer

Подключайте внешние файлы через src

DOM методы
getElementById - для ID (быстрый)

querySelector - для первого элемента

querySelectorAll - для всех элементов

createElement - создать элемент

appendChild - добавить элемент