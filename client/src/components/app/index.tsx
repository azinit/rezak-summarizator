import React from 'react'
import "./index.css";

// TODO: add permissions to page
// TODO: add popup on page

class App extends React.Component {
  render() {
    return (
      <div className='rezak-app'>
        <section>
          <h1>Rezak plugin</h1>
          <p>Chrome-Extension для сокращения текста</p>
        </section>
        <section>
          <h2>Содержит реализации</h2>
          <ul>
            <li>gensim</li>
            <li>pytldr</li>
            <li>sumy</li>
            <li>summy</li>
            <li>textrank</li>
          </ul>
        </section>
      </div>
    )
  }
}
export default App