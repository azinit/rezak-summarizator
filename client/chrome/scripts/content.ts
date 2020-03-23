/**
 * Здесь расположены все скрипты, имеющие доступ к контенту страницы
 */

import { registerHandler, sendMessage } from './contentHelper'
import BLService from '../../src/service/bl';

let firedElement: Element = null;

registerHandler('CONTEXT_ACTION_CLICK', (data, sendResponse) => {
   console.log('Clicked element is ', firedElement);
   firedElement && sendResponse(data);
});

registerHandler('HIGHLIGHT', (props: HiglightProps, sendResponse) => {
   const { text_sentences, total_selection } = props
   if (!firedElement) return;
   /** get config */
   // FIXME: temp
   chrome.storage.sync.get("rezak-user-settings", (item) => {
      const initialConfig: IUserSettingsState = { color: "#ff0000", weight: 3, isColorMode: true, isSummarizeMode: true }
      const config: IUserSettingsState = { ...initialConfig, ...item['rezak-user-settings'] }
      console.log('[REZAK:CONTENT] Config:', config)
      const maxWeight = Math.max(...total_selection)
      /** get colors */
      const { color, weight } = config;
      // FIXME: weight => ratio
      const colors = BLService.getPalette(color, maxWeight)
      const threshold = ( weight / 100 ) * maxWeight;
      /** reducing */
      const reducedSentences = BLService.reduceSentences(text_sentences, total_selection, threshold)
      /** highlighting */
      console.log('To be highlighted', text_sentences);
      firedElement.innerHTML = reducedSentences.map((sentence, index) =>
         `<span style="color: ${colors[total_selection[index]]}">${sentence}</span>`
      ).join('\n');
   });

});

document.addEventListener('contextmenu', (event) => {
   firedElement = event.target as Element;
});
