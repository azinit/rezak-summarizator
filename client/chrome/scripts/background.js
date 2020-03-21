/**
 * Здесь расположены все фоновые скрипты, работающие в контексте плагина
 */
console.log("[REZAK:BACK] Фоновые скрипты подгружены")

chrome.contextMenus.create({
    id: 'rezak-sum',
    title: '[Rezak] Сократить',
    contexts: [
        'selection'
    ]
})