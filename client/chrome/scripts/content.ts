/**
 * Здесь расположены все скрипты, имеющие доступ к контенту страницы
 */

import messenger from './messengers/content-messenger'
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
    // @ts-ignore
    let modal = createModalElement(html, firedElement);
    firedElement.appendChild(modal);
    return "completed"
});

document.addEventListener('contextmenu', (event) => {
    firedElement = getSelection();
});

function getSelection(): Element | null {
    return window.getSelection().anchorNode?.parentElement
}

function createModalElement(innerHTML: string, containerEl: Element): Element {
    const modal = document.createElement('div');
    modal.className = 'rezak-modal';
    modal.style.width = `${containerEl.clientWidth}px`;
    // @ts-ignore
    modal.style.top = `${containerEl.offsetTop}px`;
    modal.innerHTML = innerHTML;
    modal.appendChild(createModalCloseButton(() => modal.style.visibility = 'hidden'));
    return modal;
}

function createModalCloseButton(close: () => void): Element {
    const closeBtn = document.createElement('div');
    closeBtn.innerHTML = '&#10006;';
    closeBtn.className = 'rezak-modal-close';
    closeBtn.title = 'Close';
    closeBtn.onclick = close;
    return closeBtn;
}
