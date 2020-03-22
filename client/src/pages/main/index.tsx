import React from 'react'
import Fetch from '../../fetch'
import { Button } from 'react-bootstrap'
import { log } from '../../chrome-tools'

// FIXME: temp
/* chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    log('New request discovered:', request)
    sendResponse(12345)
}) */

const MainPage = () => {
    const [curData, setCurData] = React.useState({})
    const onReduce = () => {
        Fetch.reduce('...')
            .then((data) => {
                log('[200] [REDUCE]', data)
                setCurData(data)
            })
            .catch(err => {
                log('[ERR] [REDUCE]', err)
            })
    }
    const onGetColors = () => {
        Fetch.getColors()
            .then((data) => {
                log('[200] [GET-COLORS]', data)
                setCurData(data)
            })
            .catch(err => {
                log('[ERR] [GET-COLORS]', err)
            })
    }
    const onSummarize = () => {
        Fetch.summarize([], [], 0)
            .then((data) => {
                log('[200] [SUMMARIZE]', data)
                setCurData(data)
            })
            .catch(err => {
                log('[ERR] [SUMMARIZE]', err)
            })
    }
    const getAccess = () => {
        const text = ">>>>"
        // TODO: without tabs iter?
        // FIXME: temporary
        // chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        //     chrome.tabs.sendMessage(tabs[0].id, { type: 'HACK_THE_PAGE', data: text }, (response) => {
        //         setCurData('page_was_hacked')
        //         log(response)
        //         log('success hacked');
        //     });
        // });
    }
    return (
        <div className='main-page'>
            <div className="toolbar d-flex flex-column">
                <Button className='mb-1' variant="primary" onClick={onReduce}>/reduce</Button>
                <Button className='mb-1' variant="primary" onClick={onGetColors}>/get-colors</Button>
                <Button className='mb-1' variant="primary" onClick={onSummarize}>/summarize</Button>
                <Button className='mb-1' variant="info" onClick={getAccess}>get-access</Button>
            </div>
            <div className="content">
                {JSON.stringify(curData)}
            </div>
        </div>
    )
}

export default MainPage
