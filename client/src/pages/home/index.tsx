import React from 'react'
import { Card, CardGroup, CardDeck, CardColumns } from 'react-bootstrap'

const HomePage = () => {
    const impls = [
        'gensim',
        'pytldr',
        'sumy',
        'summa',
        'textrank'
    ]

    return (
        <>
            <section>
                <h3 className='title'>Rezak plugin</h3>
                <p>Chrome-Extension для сокращения текста</p>
            </section>
            <section>
                <h2>Содержит реализации</h2>
                <CardGroup className='list-unstyled flex'>
                    {impls.map((impl: string, index) => (
                        <li key={index}>
                            <Card className='border-0 mb-1'>
                                <Card.Body className='bg-dark text-secondary'>
                                    <Card.Title>
                                        &gt; {impl}
                                    </Card.Title>
                                </Card.Body>
                            </Card>
                        </li>
                    ))}
                </CardGroup>
            </section>
        </>
    )
}

export default HomePage
