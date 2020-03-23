import {Messenger} from "./index";

class BackgroundMessenger extends Messenger {
    sendMessage(type: string, payload?: any): Promise<any> {
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
}

export default new BackgroundMessenger();
