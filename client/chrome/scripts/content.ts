/**
 * Здесь расположены все скрипты, имеющие доступ к контенту страницы
 */
console.log("[REZAK:CONTENT] Плагин имеет доступ к странице")

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('>>', request, sender);
    switch (request.type) {
        case 'HACK_THE_PAGE':
            console.log('HACK.THE.PAGE.')
            var data = request.data || {};

            var linksList = document.querySelectorAll('a');
            [].forEach.call(linksList, (header) => {
                header.innerHTML = request.data;
            });
            sendResponse({ data: data, success: true, type: 'RESPONSE_TO_HACK' });
            break;
        default:
            console.log('Unknown message', request.type, request.data)
    }
    sendResponse(2222)
});
