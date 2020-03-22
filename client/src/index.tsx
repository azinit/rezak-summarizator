import React from "react";
import ReactDOM from "react-dom";
import App from "./pages";
import './index.scss'
import { log } from './chrome-tools'

// FIXME: temporary
// chrome.extension.onConnect.addListener(function(port) {
//     port.onMessage.addListener(function(msg) {
//         // May be empty.
//     });
// });
// chrome.runtime.onMessage
chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
    if (request.type === "REDUCE_TEXT") {
        //  To do something
        log(request.data.subject)
        log(request.data.content)
    }
    log('tikilo')
    sendResponse(111)
});

ReactDOM.render(
    <App />,
    document.querySelector("#root")
);