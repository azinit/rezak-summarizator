import React from 'react'
import Fetch from '../../fetch'
import { Button } from 'react-bootstrap'

const MainPage = () => {
    const [curData, setCurData] = React.useState({})
    const onReduce = () => {
        Fetch.reduce('...')
            .then((data) => {
                console.log('[200] [REDUCE]', data)
                setCurData(data)
            })
            .catch(err => {
                console.log('[ERR] [REDUCE]', err)
            })
    }
    const onGetColors = () => {
        Fetch.getColors()
            .then((data) => {
                console.log('[200] [GET-COLORS]', data)
                setCurData(data)
            })
            .catch(err => {
                console.log('[ERR] [GET-COLORS]', err)
            })
    }
    const onSummarize = () => {
        Fetch.summarize([], [], 0)
            .then((data) => {
                console.log('[200] [SUMMARIZE]', data)
                setCurData(data)
            })
            .catch(err => {
                console.log('[ERR] [SUMMARIZE]', err)
            })
    }
    const getAccess = () => {
        const text = "XXXX"
        // @ts-ignore
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            // @ts-ignore
            chrome.tabs.sendMessage(tabs[0].id, { data: text }, function (response) {
                setCurData('success changed')
                console.log('success');
            });
        });
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
