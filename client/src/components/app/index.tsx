import React from 'react'
import { Card, CardGroup, CardDeck, CardColumns } from 'react-bootstrap'
import "./index.scss";
// TODO: add permissions to page
// TODO: add popup on page

const App = () => {
  const impls = [
    'gensim',
    'pytldr',
    'sumy',
    'summa',
    'textrank'
  ]
  return (
    <div className='rezak-app'>
      <section>
        <h1 className='title'>Rezak plugin</h1>
        <p>Chrome-Extension для сокращения текста</p>
      </section>
      <section>
        <h2>Содержит реализации</h2>
        <CardGroup className='list-unstyled flex'>
          {impls.map((impl: string) => (
            <li>
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
    </div>
  )
}
export default App