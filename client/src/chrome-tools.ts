export const getPage = () => chrome.extension.getBackgroundPage()

export const log = (...args) => getPage().console.log('[REZAK:POPUP]', ...args)