/**
 * Здесь расположены все фоновые скрипты, работающие в контексте плагина
 */
import {registerHandler, sendMessage} from './backgroundHelper'
import fetchService from './fetch'

 
registerHandler('NEW_STATE', (data, sendResponse) => {
    console.log(data);
})

function onContextActionClick(info: chrome.contextMenus.OnClickData, tab: chrome.tabs.Tab) {
    sendMessage('CONTEXT_ACTION_CLICK', info.selectionText)
        .then((response) => fetchService.reduce(response as string))
        .then((res) => res.json())
        .then((response) => sendMessage('HIGHLIGHT', response))
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
