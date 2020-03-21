/**
 * Здесь расположены все скрипты, имеющие доступ к контенту страницы
 */
console.log("[REZAK:CONTENT] Плагин имеет доступ к странице")

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("something happening from the extension");
    var data = request.data || {};

    var linksList = document.querySelectorAll('a');
    [].forEach.call(linksList, (header) => {
        header.innerHTML = request.data;
    });
    sendResponse({data: data, success: true});
});

