import React from 'react'
import { connect } from 'react-redux'
import Fetch from '../../fetch'
import { Button } from 'react-bootstrap'
import { log } from '../../chrome-tools'
import { text } from '../../fetch/fixtures'
import './index.scss'

type Props = {
    color: string;
}

// FIXME: temp
/* chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    log('New request discovered:', request)
    sendResponse(12345)
}) */

const MainPage = (props: Props) => {
    const { color } = props;

    const onReduce = () => {
        Fetch.reduce(text)
            .then(r => r.json())
            .then((data: IReduceResponse) => {
                log('[200] [REDUCE]', data)
            })
            .catch(err => {
                log('[ERR] [REDUCE]', err)
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
            <div style={{ color }} className='bg-dark'>{color}</div>
            <div className="toolbar d-flex flex-column">
                <Button className='mb-1' variant="primary" onClick={onReduce}>Сохранить сокращенный текст</Button>
                <Button className='mb-1' variant="primary" onClick={onReduce}>/reduce</Button>
                <Button className='mb-1' variant="info" onClick={getAccess}>get-access</Button>
            </div>
        </div>
    )
}

const mapStateToProps = (state: IGlobalState) => {
    // FIXME: dev   
    console.log('> STATE <', state.userSettings)
    return {
        color: state.userSettings.color
    }
}

const mapDispatchToProps = (dispatch: any) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)

