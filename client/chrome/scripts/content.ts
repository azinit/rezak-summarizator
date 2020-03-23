/**
 * Здесь расположены все скрипты, имеющие доступ к контенту страницы
 */

import messenger from './messengers/content-messenger'

let firedElement: Element = null;
const colors = ["#757575", "#ccffe7", "#a1ffd3", "#4affaa", "#00ff87", "#00ff87", "#00ff87", "#00ff87"];

messenger.registerHandler('CONTEXT_ACTION_CLICK', (data, sendResponse) => {
    console.log('Clicked element is ', firedElement);
    firedElement && sendResponse(data);
});

messenger.registerHandler('HIGHLIGHT', ({text_sentences, total_selection}, sendResponse) => {
    if (!firedElement) return;
    console.log('To be highlighted', text_sentences);
    firedElement.innerHTML = text_sentences.map((sentence, index) =>
        `<span style="color: ${colors[total_selection[index]]}">${sentence}</span>`
    ).join('\n');
});

document.addEventListener('contextmenu', (event) => {
    firedElement = event.target as Element;
});
