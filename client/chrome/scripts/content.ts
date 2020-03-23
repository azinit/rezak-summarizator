/**
 * Здесь расположены все скрипты, имеющие доступ к контенту страницы
 */

import messenger from './messengers/content-messenger'
import Modal from 'modal-js/src/modal'
import './content.css'

let firedElement: Element = null;
const colors = ["#757575", "#ccffe7", "#a1ffd3", "#4affaa", "#00ff87", "#00ff87", "#00ff87", "#00ff87"];

messenger.registerHandler('CONTEXT_ACTION_CLICK', (data) => {
    console.log('Clicked element is ', firedElement);
    if (firedElement) return data;
});

messenger.registerHandler('HIGHLIGHT', ({text_sentences, total_selection}) => {
    if (!firedElement) return 'fail';
    console.log('To be highlighted', text_sentences);
    const html = text_sentences.map((sentence, index) =>
        `<span style="color: ${colors[total_selection[index]]}">${sentence}</span>`
    ).join('\n');
    let modal = new Modal(`<div class="rezak-modal" style="width: ${firedElement.clientWidth}px; top: ${firedElement.offsetTop}px">
            ${html}</div>`, {
        containerEl: firedElement,
        activeClass: 'modal-active'
    });
    modal.show();
    return "completed"
});

document.addEventListener('contextmenu', (event) => {
    firedElement = getSelection();
});

function getSelection(): Element | null {
    return window.getSelection().anchorNode?.parentElement
}
