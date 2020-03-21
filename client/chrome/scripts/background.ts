/**
 * Здесь расположены все фоновые скрипты, работающие в контексте плагина
 */
const bkg = chrome.extension.getBackgroundPage()
bkg.console.log("[REZAK:BACKGROUND] Background scripts loaded")

chrome.contextMenus.create({
    id: 'rezak-sum',
    title: 'Сократить',
    contexts: [
        'selection'
    ],
    onclick: (data, tab) => {
        /**
         * data
         * @example
         * {
         * "editable":false,
         * "frameId":0,
         * "menuItemId":"rezak-sum",
         * "pageUrl":"https://react-bootstrap.github.io/components/button-group/",
         * "selectionText":"butt"
         * }
         */
        /**
         * tab
         * @example 
         * {
         * "active":true,
         * "audible":false,
         * "autoDiscardable":true,
         * "discarded":false,
         * "favIconUrl":"https://react-bootstrap.github.io/favicon.ico",
         * "height":977,
         * "highlighted":true,
         * "id":200,
         * "incognito":false,
         * "index":9,
         * "mutedInfo":{"muted":false},
         * "pinned":false,
         * "selected":true,
         * "status":"complete",
         * "title":"https://react-bootstrap.github.io/components/button-group/",
         * "url":"https://react-bootstrap.github.io/components/button-group/",
         * "width":1244,
         * "windowId":18
         * }
         */
        bkg.console.log('Selected: ', data.selectionText)
        alert(`Выделен текст: ${data.selectionText}`)
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