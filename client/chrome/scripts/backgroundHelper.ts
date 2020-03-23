const handlers = {};

function registerHandler(type: string, handler: (data: any, sendResponse?: (response: any) => void) => void) {
    if(type in handlers) {
        throw new Error(`Handler '${type}' is already registered`);
    } else {
        if(handler != null) handlers[type] = handler;
    }
}

function sendMessage(type: string, payload?: any) {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({active: true, currentWindow: true}, function([tab]) {
            if(tab) {
                chrome.tabs.sendMessage(tab.id, {type, payload}, (response: any) => resolve(response));
            } else {
                reject(new Error('Tab is currently inactive'));
            }
        });
    })
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if(message.type && message.type in handlers) {
        // console.info(`Message #${message.type} was received with data `, message.payload)
        handlers[message.type](message.payload, sendResponse);
    } else {
        console.warn(`Unknown message type ${message.type} from sender ${sender.id}`);
    }
});

export {registerHandler, sendMessage}
