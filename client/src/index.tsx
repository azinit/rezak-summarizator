import React from "react";
import ReactDOM from "react-dom";
import App from "./pages";
import './index.scss'
import { log } from './chrome-tools'

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.type === "REDUCE_TEXT") {
            //  To do something
            log(request.data.subject)
            log(request.data.content)
        }
        log('tikilo')
    }
);

ReactDOM.render(
    <App />, 
    document.querySelector("#root")
);