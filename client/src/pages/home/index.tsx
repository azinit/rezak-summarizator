import React from 'react'
import { Button, CardDeck } from 'react-bootstrap'
import { impls } from './fixtures'

const HomePage = () => {
    return (
        <>
            <section className="methods py-3">
                <div className="text-center">
                    Основан на <a href="https://github.com/scionoftech/Text_Summarization#extractive-summarization">экстрактивных алгоритмах</a>
                </div>
            </section>
            <section className="impls py-3 border-top">
                <div className="text-center h6">Содержит реализации</div>
                <div className="impls list-unstyled">
                    <CardDeck className='d-flex justify-content-center'>
                        {impls.map(({ name, url }, index) => (
                            <a href={url} target='_blank' className='m-1'>
                                <Button variant='outline-secondary'>{name}</Button>
                            </a>
                        ))}
                    </CardDeck>
                </div>
            </section>
            <section className="copyright py-3 border-top">
                <div className="text-center">
                    <blockquote className="blockquote">
                        {/* <p className="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p> */}
                        <footer className="blockquote-footer">created by <cite title="Chao Group">Chao Group</cite></footer>
                    </blockquote>
                </div>
            </section>
        </>
    )
}

export default HomePage
