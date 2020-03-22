export const getPage = () => chrome?.extension?.getBackgroundPage() || { console }

export const log = (...args) => getPage().console.log('[REZAK:POPUP]', ...args)
