/**
 * Здесь расположены все фоновые скрипты, работающие в контексте плагина
 */
import {registerHandler, sendMessage} from './backgroundHelper'
import fetchService from './fetch'
 
registerHandler('UPDATE_USER_SETTINGS', (data: IUserSettingsState, sendResponse) => {
    console.log('[REZAK-BACK] Update config', data);
    // FIXME: Да да, куда без него ;(
    chrome.storage.sync.set({ "rezak-user-settings": data }, () => {
        //  A data saved callback omg so fancy
        // FIXME: recall highlight?
    });
})

function onContextActionClick(info: chrome.contextMenus.OnClickData, tab: chrome.tabs.Tab) {
    sendMessage('CONTEXT_ACTION_CLICK', info.selectionText)
        // FIXME:
        .then((response) => fetchService.reduce(info.selectionText as string))
        .then((res) => res.json())
        .then((response: HiglightProps) => sendMessage('HIGHLIGHT', response))
        .then(console.log)
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
})
