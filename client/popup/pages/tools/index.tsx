import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import { log } from '../../chrome-tools'
import './index.scss'

const ToolsPage = () => {
    const getAccess = () => {
        const text = ">>>>"
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
                <Button className='mb-1' variant="primary" disabled>Save last text</Button>
                <Button className='mb-1' variant="primary" disabled>Watch history</Button>
                <Button className='mb-1' variant="primary" disabled>Feedback</Button>
                <Button className='mb-1' variant="info" onClick={getAccess}>Manual</Button>
            </div>
        </div>
    )
}

const mapStateToProps = (state: IGlobalState) => ({
})

const mapDispatchToProps = (dispatch: any) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(ToolsPage)

