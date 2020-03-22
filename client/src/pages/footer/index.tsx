import React from 'react'
import { Button } from 'react-bootstrap'
const Footer = () => {
    return (
        <div className='text-center'>
            <a href='https://github.com/martis-git/rezak-summarizator' target='_blank' className='pr-1'>
                <Button variant='outline-dark'>GitHub</Button>
            </a>
            <a href='https://github.com/max-talanov/1' target='_blank' className='pr-1'>
                <Button variant='outline-info'>AI Course</Button>
            </a>
            <a href='https://github.com/martis-git/rezak-summarizator/issues' target='_blank' className='pr-1'>
                <Button variant='outline-danger'>Issues</Button>
            </a>
        </div>
    )
}

export default Footer
