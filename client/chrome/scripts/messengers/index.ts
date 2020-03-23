interface IMessenger {
    registerHandler(type: string, handler: (data: any, sendResponse?: (response: any) => void) => void): void

    sendMessage(type: string, payload?: any): Promise<any>
}

abstract class Messenger implements IMessenger {
    private readonly handlers;

    constructor() {
        this.handlers = {};
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (message.type && message.type in this.handlers) {
                console.info(`Message #${message.type} was received with data `, message.payload);
                this.handlers[message.type](message.payload, sendResponse);
            } else {
                console.warn(`Unknown message type ${message.type} from sender ${sender.id}`);
            }
        });
    }

    abstract sendMessage(type: string, payload?: any): Promise<any>

    registerHandler(type: string, handler: (data: any, sendResponse?: (response: any) => void) => void): void {
        if (type in this.handlers) {
            throw new Error(`Handler '${type}' is already registered`);
        } else {
            if (handler != null) this.handlers[type] = handler;
        }
    }
}

export {
    IMessenger,
    Messenger
}
