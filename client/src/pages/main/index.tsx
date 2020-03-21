import React from 'react'
import Fetch from '../../fetch'
import { Button } from 'react-bootstrap'

const MainPage = () => {
    const onReduce = () => {
        Fetch.reduce('...')
            .then((data) => {
                console.log('[200] [REDUCE]', data)
            })
            .catch(err => {
                console.log('[ERR] [REDUCE]', err)
            })
    }
    const onGetColors = () => {
        Fetch.getColors()
            .then((data) => {
                console.log('[200] [GET-COLORS]', data)
            })
            .catch(err => {
                console.log('[ERR] [GET-COLORS]', err)
            })
    }
    const onSummarize = () => {
        Fetch.summarize([], [], 0)
            .then((data) => {
                console.log('[200] [SUMMARIZE]', data)
            })
            .catch(err => {
                console.log('[ERR] [SUMMARIZE]', err)
            })
    }
    
    return (
        <div className='d-flex flex-column'>
            <Button className='mb-1' variant="primary" onClick={onReduce}>/reduce</Button>
            <Button className='mb-1' variant="primary" onClick={onGetColors}>/get-colors</Button>
            <Button className='mb-1' variant="primary" onClick={onSummarize}>/summarize</Button>
        </div>
    )
}

export default MainPage
