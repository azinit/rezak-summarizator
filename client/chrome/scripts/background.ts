/**
 * Здесь расположены все фоновые скрипты, работающие в контексте плагина
 */
import messenger from './messengers/background-messenger'
import fetchService from './fetch'

messenger.registerHandler('NEW_STATE', (data) => {
    console.log('NEW_STATE', data);
});

function onContextActionClick(info: chrome.contextMenus.OnClickData, tab: chrome.tabs.Tab) {
    messenger.sendMessage('CONTEXT_ACTION_CLICK', info.selectionText)
        .then((response) => fetchService.reduce(response as string))
        .then((res) => res.json())
        .then((response) => messenger.sendMessage('HIGHLIGHT', response))
        .then((...args) => console.log('response', ...args))
    //.catch(console.error)
}

chrome.contextMenus.create({
    id: 'rezak-sum',
    title: 'Сократить',
    contexts: [
        'selection'
    ],
    /** @see background.content.example.ts */
    onclick: onContextActionClick
});
