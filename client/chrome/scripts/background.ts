/**
 * Здесь расположены все фоновые скрипты, работающие в контексте плагина
 */
const bkg = chrome.extension.getBackgroundPage()
const log = (...args) => bkg.console.log('[REZAK:BACK]', ...args)

log("Background scripts loaded")

chrome.contextMenus.create({
    id: 'rezak-sum',
    title: 'Сократить',
    contexts: [
        'selection'
    ],
    /** @see background.content.example.ts */
    onclick: (data, tab) => {
        log('Selected: ', data.selectionText)
        chrome.runtime.sendMessage({
            type: 'REDUCE_TEXT',
            payload: data.selectionText
        }, (response) => {
            log('You did it!', response)
        })
        // chrome.tabs.create({  
        //   url: "http://www.google.com/search?q=" + data.selectionText
        // });
    }
})


// chrome.contextMenus.onClicked.addListener((data) => {
//     switch(data.menuItemId) {
//         case 'rezak-sum':
//             console.log('REZAK!!!', data)
//             break;
//         default:
//             console.log('Oops', data)
//     }
// })