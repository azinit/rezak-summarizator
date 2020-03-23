import {Messenger} from "./index";

class ContentMessenger extends Messenger {
    sendMessage(type: string, payload?: any): Promise<any> {
        return new Promise((resolve) => {
            chrome.runtime.sendMessage({type, payload}, (response: any) => resolve(response));
        })
    }
}

export default new ContentMessenger();
