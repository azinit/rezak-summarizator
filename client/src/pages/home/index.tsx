import React from 'react'

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
                <div className="impls">
                    {impls.map((impl: string, index) => (
                        <li key={index}>&gt; {impl}</li>
                    ))}
                </div>
            </section>
        </>
    )
}

export default HomePage
