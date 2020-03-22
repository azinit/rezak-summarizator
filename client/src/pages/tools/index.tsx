import React from 'react'
import { connect } from 'react-redux'
import Fetch from '../../fetch'
import { Button } from 'react-bootstrap'
import { log } from '../../chrome-tools'
import { text } from '../../fetch/fixtures'
import './index.scss'

type Props = {
    color: string;
};

if (chrome) {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        log('New request discovered:', request)
        sendResponse(12345)
    })
};

const ToolsPage = (props: Props) => {
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
        if (chrome) {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, { type: 'HACK_THE_PAGE', data: text }, (response) => {
                    log(response)
                    log('success hacked');
                });
            });
        }
    }
    return (
        <div className='main-page mt-3'>
            <div className="toolbar d-flex flex-column">
                <Button className='mb-1' variant="primary" onClick={() => console.log('onSaveText')} disabled>Save last text</Button>
                <Button className='mb-1' variant="primary" onClick={() => console.log('onWatchHistory')} disabled>Watch history</Button>
                <Button className='mb-1' variant="primary" onClick={() => console.log('onWatchHistory')} disabled>Feedback</Button>
                <Button className='mb-1' variant="primary" onClick={onReduce}>/reduce</Button>
                <Button className='mb-1' variant="info" onClick={getAccess}>hack the page</Button>
            </div>
            {/* <div style={{ color }} className='bg-dark'>{color}</div> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(ToolsPage)

