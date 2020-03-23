/**
 * Здесь расположены все фоновые скрипты, работающие в контексте плагина
 */
import messenger from './messengers/background-messenger'
import fetchService from './fetch'

/**
 * Обработчик обновления конфига пользователя
 * @handler UPDATE_USER_SETTINGS
 */
messenger.registerHandler('UPDATE_USER_SETTINGS', (data) => {
    console.log('[REZAK-BACK] Update config', data);
    // FIXME: Да да, куда без него ;(
    chrome.storage.sync.set({ "rezak-user-settings": data }, () => {
        //  A data saved callback omg so fancy
        // FIXME: recall highlight?
    });
});

/**
 * Обработчик клика пункта КМ
 * @handler CONTEXT_MENU_ON_CLICK
 */
function onContextActionClick(info: chrome.contextMenus.OnClickData, tab: chrome.tabs.Tab) {
    messenger.sendMessage('CONTEXT_ACTION_CLICK', info.selectionText)
        .then((response) => fetchService.reduce(response as string))
        .then((res) => res.json())
        .then((response: HiglightProps) => messenger.sendMessage('HIGHLIGHT', response))
        .then((...args) => console.log('[REZAK-BACK] onContext (response)', ...args))
    //.catch(console.error)
}

/**
 * Создание КМ
 */
chrome.contextMenus.create({
    id: 'rezak-sum',
    title: 'Сократить',
    contexts: [
        'selection'
    ],
    /** @see background.content.example.ts */
    onclick: onContextActionClick
});
